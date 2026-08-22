import { NextResponse } from 'next/server'
import { isValidVideoId, upstreamThumbnailUrl } from '@/lib/youtube'

/**
 * Liefert das Vorschaubild eines YouTube-Videos über den eigenen Server aus.
 *
 * Warum der Umweg: Die Video-Übersicht zeigt Vorschaubilder, bevor irgendjemand
 * eingewilligt hat. Läge das Bild direkt bei Google (`i.ytimg.com`), würde der
 * Browser des Besuchers es dort abrufen und dabei IP-Adresse, User-Agent und
 * Referer übertragen — ohne Einwilligung und in ein Drittland (§ 25 Abs. 1
 * TDDDG, Art. 44 ff. DSGVO). Genau deshalb steht in `next.config.js` bewusst
 * kein `images.remotePatterns`-Eintrag.
 *
 * Hier holt stattdessen der Server das Bild und reicht es weiter. Google sieht
 * nur die Server-IP und erfährt nichts über die Besucher.
 */

/** Vorschaubilder ändern sich praktisch nie. Ein Tag Cache genügt vollauf. */
const CACHE_SECONDS = 60 * 60 * 24

/** Bricht ab, falls YouTube nicht antwortet — sonst hinge die Anfrage. */
const UPSTREAM_TIMEOUT_MS = 5000

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // Die Kennung fließt in eine URL, die der Server selbst abruft. Ungeprüft
  // wäre das eine offene Weiterleitung (SSRF).
  if (!isValidVideoId(id)) {
    return NextResponse.json({ error: 'Ungültige Video-Kennung' }, { status: 400 })
  }

  try {
    const upstream = await fetch(upstreamThumbnailUrl(id), {
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      next: { revalidate: CACHE_SECONDS },
    })

    if (!upstream.ok) {
      return NextResponse.json({ error: 'Vorschaubild nicht gefunden' }, { status: 404 })
    }

    return new NextResponse(await upstream.arrayBuffer(), {
      status: 200,
      headers: {
        'Content-Type': upstream.headers.get('content-type') ?? 'image/jpeg',
        'Cache-Control': `public, max-age=${CACHE_SECONDS}, s-maxage=${CACHE_SECONDS}`,
        // Das Bild ist ein Bild. Ohne diesen Header könnte ein manipulierter
        // Upstream-Content-Type den Browser zu etwas anderem verleiten.
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Vorschaubild nicht erreichbar' }, { status: 502 })
  }
}
