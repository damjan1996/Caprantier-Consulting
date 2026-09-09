/**
 * Zugriff auf die Videos des YouTube-Kanals von Carpantier Consulting.
 *
 * Gelesen wird der öffentliche RSS-Feed des Kanals, nicht die YouTube Data API.
 * Der Feed braucht keinen API-Schlüssel, kein Google-Cloud-Projekt und hat kein
 * Kontingent, das im Betrieb aufgebraucht sein kann. Er liefert die letzten 15
 * Videos — mehr braucht die Übersichtsseite nicht.
 *
 * Wichtig: Dieses Modul läuft ausschließlich auf dem Server. Der Browser des
 * Besuchers stellt zu keinem Zeitpunkt eine Verbindung zu YouTube her, solange
 * keine Einwilligung vorliegt (§ 25 Abs. 1 TDDDG). Auch die Vorschaubilder
 * kommen deshalb nicht direkt von Google, sondern über
 * `/api/youtube/thumbnail/[id]` vom eigenen Server.
 */

export const YOUTUBE_CHANNEL_ID = 'UCgD_0ner1biCooDW6smcZRA'
export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@nico_carpantier'

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`

/** Wie lange eine gelesene Feed-Antwort wiederverwendet wird. */
const REVALIDATE_SECONDS = 3600

export type YouTubeVideo = {
  /** Die elfstellige Video-Kennung, z. B. `FHfhaN-SG3Q`. */
  id: string
  title: string
  /** Erster Absatz der Videobeschreibung, gekürzt. */
  description: string
  /** ISO-Zeitstempel der Veröffentlichung. */
  published: string
  /** Öffentliche YouTube-Adresse, für den Fall ohne Einwilligung. */
  watchUrl: string
  /** Vorschaubild über den eigenen Server — niemals direkt von Google. */
  thumbnailUrl: string
}

/**
 * Die Video-Kennung ist Teil einer URL, die der Server selbst abruft. Ohne
 * Prüfung wäre das eine offene Weiterleitung in Googles Netz (SSRF). YouTube
 * vergibt ausschließlich elf Zeichen aus diesem Alphabet.
 */
export function isValidVideoId(id: string): boolean {
  return /^[A-Za-z0-9_-]{11}$/.test(id)
}

/** Die Adresse, unter der das Vorschaubild bei Google liegt. Nur serverseitig verwenden. */
export function upstreamThumbnailUrl(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

const ENTITIES: Record<string, string> = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
}

function decodeEntities(value: string): string {
  return value
    .replace(/&(?:lt|gt|quot|#39|apos);/g, (match) => ENTITIES[match] ?? match)
    // `&amp;` zuletzt, sonst würde aus `&amp;lt;` fälschlich `<`.
    .replace(/&amp;/g, '&')
}

function readTag(entry: string, tag: string): string {
  const match = entry.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`))
  return match ? decodeEntities(match[1]).trim() : ''
}

/**
 * Aus der Videobeschreibung wird nur der erste Absatz übernommen.
 *
 * Danach folgen im Kanal regelmäßig Kapitelmarken, Hashtags und Links. Auf der
 * Website wäre das Rauschen — und in einem `VideoObject`-Snippet bei Google
 * sähe es wie abgeschnittener Text aus.
 */
function firstParagraph(description: string, maxLength = 220): string {
  const paragraph = description.split(/\n\s*\n/)[0]?.replace(/\s+/g, ' ').trim() ?? ''
  if (paragraph.length <= maxLength) return paragraph

  const cut = paragraph.slice(0, maxLength)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`
}

/**
 * Manuell ergänzte Videos.
 *
 * Der RSS-Feed von YouTube wird über mehrere Caches ausgeliefert und braucht
 * nach einem Upload teils Stunden, bis ihn alle Knoten kennen. In dieser Zeit
 * kann ein frisches Video je nach Abruf mal da sein und mal nicht — auf der
 * Seite würde es flackern. Ein Eintrag hier hält es stabil sichtbar.
 *
 * Doppelte Einträge sind unkritisch: Sobald der Feed das Video führt, gewinnt
 * die Fassung aus dem Feed (mit Beschreibung), der Eintrag hier fällt weg.
 * Er kann dann ersatzlos gelöscht werden, muss aber nicht.
 */
const PINNED: Array<Pick<YouTubeVideo, 'id' | 'title' | 'published'> & { description?: string }> = []

function fromPinned(entry: (typeof PINNED)[number]): YouTubeVideo {
  return {
    id: entry.id,
    title: entry.title,
    description: entry.description ?? '',
    published: entry.published,
    watchUrl: `https://www.youtube.com/watch?v=${entry.id}`,
    thumbnailUrl: `/api/youtube/thumbnail/${entry.id}`,
  }
}

/** Feed und manuelle Liste zusammenführen, neueste zuerst. */
function merge(fromFeed: YouTubeVideo[]): YouTubeVideo[] {
  const known = new Set(fromFeed.map((video) => video.id))
  const extra = PINNED.filter((entry) => isValidVideoId(entry.id) && !known.has(entry.id))

  return [...fromFeed, ...extra.map(fromPinned)].sort(
    (a, b) => Date.parse(b.published) - Date.parse(a.published)
  )
}

function parseFeed(xml: string, limit: number): YouTubeVideo[] {
  const entries = xml.split('<entry>').slice(1)

  return entries
    .map((entry): YouTubeVideo | null => {
      const id = readTag(entry, 'yt:videoId')
      if (!isValidVideoId(id)) return null

      return {
        id,
        title: readTag(entry, 'title'),
        description: firstParagraph(readTag(entry, 'media:description')),
        published: readTag(entry, 'published'),
        watchUrl: `https://www.youtube.com/watch?v=${id}`,
        thumbnailUrl: `/api/youtube/thumbnail/${id}`,
      }
    })
    .filter((video): video is YouTubeVideo => video !== null)
    .slice(0, limit)
}

/**
 * Liest die neuesten Videos des Kanals.
 *
 * Ist der Feed nicht erreichbar, kommt eine leere Liste zurück statt einer
 * Ausnahme: Eine Störung bei YouTube darf die eigene Seite nicht mit einem
 * Fehler beantworten. Die Video-Übersicht zeigt dann einen Hinweis und den
 * Link zum Kanal.
 */
export async function getVideos(limit = 12): Promise<YouTubeVideo[]> {
  let fromFeed: YouTubeVideo[] = []

  try {
    const response = await fetch(FEED_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (response.ok) {
      fromFeed = parseFeed(await response.text(), limit)
    }
  } catch {
    // Störung bei YouTube: Es bleibt bei den manuell gepflegten Videos.
  }

  return merge(fromFeed).slice(0, limit)
}
