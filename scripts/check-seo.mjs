/**
 * SEO- und Geo-Audit gegen einen antwortenden Server.
 *
 * Prüft die Signale, die sich nur am gerenderten Dokument feststellen lassen
 * und die bei einer Seitenfamilie besonders leicht auseinanderlaufen: Titel,
 * Beschreibung, Canonical, Überschriftenstruktur, strukturierte Daten und die
 * Geo-Angaben.
 *
 * Warum eigenständig und nicht in `check-sitemap.mjs`: Dort geht es um den
 * Bestand -- welche Adresse existiert. Hier geht es um die Qualität jeder
 * einzelnen Antwort. Beides bricht unabhängig voneinander.
 *
 * Geprüft wird je Adresse:
 *
 * - **Titel** vorhanden, 15-65 Zeichen, vault-weit eindeutig. Doppelte Titel
 *   sind das klassische Symptom einer Seitenfamilie, die aus einer Vorlage
 *   entsteht, ohne dass der Titel mitvariiert.
 * - **Meta-Description** vorhanden, 70-165 Zeichen, eindeutig.
 * - **Canonical** vorhanden, absolut und selbstreferenzierend.
 * - **Genau eine `h1`.** Keine, mehrere oder eine leere h1 sind
 *   Strukturfehler, die Google und Screenreader gleichermaßen treffen.
 * - **`html lang`** gesetzt.
 * - **Open Graph**: `og:title`, `og:description`, `og:url`.
 * - **JSON-LD** parst fehlerfrei. Ein Syntaxfehler macht den gesamten Block
 *   wertlos, ohne dass es im Browser auffällt.
 * - **Geo** auf den Stadtseiten: `LocalBusiness` mit `address` und
 *   `geo`, und beides stimmt mit `businessInfo` überein. Eine abweichende
 *   Koordinate im Markup ist der Fehler, der lokale Signale still zerlegt.
 * - **`noindex`** steht nur dort, wo es hingehört.
 *
 * Aufruf:
 *   node scripts/check-seo.mjs                        gegen localhost:3000
 *   node scripts/check-seo.mjs https://carpantier-consulting.de
 */

import { loadTsModule } from './lib/load-ts-module.mjs'

const basis = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '')

const { default: sitemap } = await loadTsModule('src/app/sitemap.ts')
const { businessInfo } = await loadTsModule('src/lib/local-seo.ts')

const TITEL_MIN = 15
const TITEL_MAX = 65
const BESCHREIBUNG_MIN = 70
const BESCHREIBUNG_MAX = 165

/** Adressen, die bewusst auf noindex stehen dürfen. */
const NOINDEX_ERLAUBT = new Set(['/referenzen'])

const produktion = businessInfo.website.replace(/\/$/, '')
const eintraege = sitemap()
const beanstandungen = []
const hinweise = []
const titel = new Map()
const beschreibungen = new Map()

function ersteGruppe(html, muster) {
  const treffer = html.match(muster)
  return treffer ? treffer[1].trim() : null
}

function metaInhalt(html, name) {
  const muster = new RegExp(
    `<meta[^>]+(?:name|property)=["']${name}["'][^>]*content=["']([^"']*)["']`,
    'i'
  )
  const umgekehrt = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]*(?:name|property)=["']${name}["']`,
    'i'
  )
  return ersteGruppe(html, muster) ?? ersteGruppe(html, umgekehrt)
}

function entities(text) {
  return String(text)
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&auml;/g, 'ä').replace(/&ouml;/g, 'ö').replace(/&uuml;/g, 'ü')
    .replace(/&szlig;/g, 'ß').replace(/&nbsp;/g, ' ')
}

/** Alle JSON-LD-Blöcke einer Seite, geparst. */
function strukturierteDaten(html) {
  const bloecke = []
  const fehler = []
  const muster = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  for (const treffer of html.matchAll(muster)) {
    try {
      bloecke.push(JSON.parse(treffer[1].trim()))
    } catch (f) {
      fehler.push(f.message)
    }
  }
  return { bloecke, fehler }
}

/** Rekursiv alle @type-Werte einsammeln. */
function typen(knoten, gesammelt = new Set()) {
  if (Array.isArray(knoten)) {
    for (const k of knoten) typen(k, gesammelt)
  } else if (knoten && typeof knoten === 'object') {
    if (typeof knoten['@type'] === 'string') gesammelt.add(knoten['@type'])
    if (Array.isArray(knoten['@type'])) knoten['@type'].forEach((t) => gesammelt.add(t))
    for (const wert of Object.values(knoten)) typen(wert, gesammelt)
  }
  return gesammelt
}

/** Ersten Knoten eines Typs finden. */
function knotenMitTyp(knoten, typ) {
  if (Array.isArray(knoten)) {
    for (const k of knoten) {
      const t = knotenMitTyp(k, typ)
      if (t) return t
    }
  } else if (knoten && typeof knoten === 'object') {
    const eigen = knoten['@type']
    if (eigen === typ || (Array.isArray(eigen) && eigen.includes(typ))) return knoten
    for (const wert of Object.values(knoten)) {
      const t = knotenMitTyp(wert, typ)
      if (t) return t
    }
  }
  return null
}

let geprueft = 0
let mitLocalBusiness = 0

for (const eintrag of eintraege) {
  // Die Sitemap traegt immer die Produktionsadresse. Geprueft wird aber gegen
  // `basis` -- lokal oder live. Also erst den Produktions-Praefix abschneiden.
  const pfad = eintrag.url.startsWith(produktion)
    ? eintrag.url.slice(produktion.length) || '/'
    : eintrag.url
  const url = `${basis}${pfad === '/' ? '/' : pfad}`

  let html
  try {
    const antwort = await fetch(url, { redirect: 'manual' })
    if (antwort.status !== 200) {
      beanstandungen.push(`${pfad}: Statuscode ${antwort.status}.`)
      continue
    }
    html = await antwort.text()
  } catch (fehler) {
    beanstandungen.push(`${pfad}: nicht erreichbar (${fehler.message}).`)
    continue
  }

  geprueft++
  const kopf = html.slice(0, html.indexOf('</head>') + 7 || html.length)

  // --- Titel ---
  const seitentitel = entities(ersteGruppe(kopf, /<title[^>]*>([\s\S]*?)<\/title>/i) ?? '')
  if (!seitentitel) {
    beanstandungen.push(`${pfad}: kein <title>.`)
  } else {
    if (seitentitel.length < TITEL_MIN || seitentitel.length > TITEL_MAX) {
      hinweise.push(`${pfad}: Titel ${seitentitel.length} Zeichen (Zielband ${TITEL_MIN}-${TITEL_MAX}).`)
    }
    const schon = titel.get(seitentitel)
    if (schon) beanstandungen.push(`${pfad}: Titel identisch mit ${schon}.`)
    else titel.set(seitentitel, pfad)
  }

  // --- Beschreibung ---
  const beschreibung = entities(metaInhalt(kopf, 'description') ?? '')
  if (!beschreibung) {
    beanstandungen.push(`${pfad}: keine Meta-Description.`)
  } else {
    if (beschreibung.length < BESCHREIBUNG_MIN || beschreibung.length > BESCHREIBUNG_MAX) {
      hinweise.push(
        `${pfad}: Description ${beschreibung.length} Zeichen (Zielband ${BESCHREIBUNG_MIN}-${BESCHREIBUNG_MAX}).`
      )
    }
    const schon = beschreibungen.get(beschreibung)
    if (schon) beanstandungen.push(`${pfad}: Description identisch mit ${schon}.`)
    else beschreibungen.set(beschreibung, pfad)
  }

  // --- Canonical ---
  const canonical = ersteGruppe(kopf, /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
  if (!canonical) {
    beanstandungen.push(`${pfad}: kein Canonical.`)
  } else {
    const erwartet = `${businessInfo.website}${pfad === '/' ? '' : pfad}`
    const normal = canonical.replace(/\/$/, '')
    if (normal !== erwartet.replace(/\/$/, '')) {
      beanstandungen.push(`${pfad}: Canonical zeigt auf "${canonical}", erwartet "${erwartet}".`)
    }
  }

  // --- lang ---
  if (!/<html[^>]+lang=["'][a-z]{2}/i.test(html)) {
    beanstandungen.push(`${pfad}: <html> ohne lang-Attribut.`)
  }

  // --- genau eine h1 ---
  const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)]
  const h1Text = h1.map((t) => entities(t[1].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim())
  const h1Gefuellt = h1Text.filter((t) => t.length > 0)
  if (h1Gefuellt.length === 0) beanstandungen.push(`${pfad}: keine gefüllte h1.`)
  else if (h1Gefuellt.length > 1) {
    beanstandungen.push(`${pfad}: ${h1Gefuellt.length} h1-Elemente ("${h1Gefuellt.join('" / "')}").`)
  }

  // --- Open Graph ---
  for (const feld of ['og:title', 'og:description', 'og:url']) {
    if (!metaInhalt(kopf, feld)) hinweise.push(`${pfad}: ${feld} fehlt.`)
  }

  // --- noindex ---
  const robots = (metaInhalt(kopf, 'robots') ?? '').toLowerCase()
  if (robots.includes('noindex') && !NOINDEX_ERLAUBT.has(pfad)) {
    beanstandungen.push(`${pfad}: steht auf noindex, obwohl die Adresse in der Sitemap gemeldet wird.`)
  }

  // --- JSON-LD ---
  const { bloecke, fehler } = strukturierteDaten(html)
  for (const f of fehler) beanstandungen.push(`${pfad}: JSON-LD nicht parsebar (${f}).`)

  // --- Geo auf den Stadtseiten ---
  if (/^\/(leistungen|kaltakquise)\/[a-z-]+$/.test(pfad)) {
    const lb = knotenMitTyp(bloecke, 'LocalBusiness')
    if (!lb) {
      beanstandungen.push(`${pfad}: kein LocalBusiness-JSON-LD auf einer Stadtseite.`)
    } else {
      mitLocalBusiness++
      const plz = lb.address?.postalCode
      if (plz && String(plz) !== String(businessInfo.address.postalCode)) {
        beanstandungen.push(
          `${pfad}: LocalBusiness nennt PLZ ${plz}, businessInfo sagt ${businessInfo.address.postalCode}.`
        )
      }
      const lat = lb.geo?.latitude
      const lon = lb.geo?.longitude
      if (lat != null && Number(lat) !== Number(businessInfo.geo.latitude)) {
        beanstandungen.push(`${pfad}: Breitengrad ${lat} weicht von businessInfo (${businessInfo.geo.latitude}) ab.`)
      }
      if (lon != null && Number(lon) !== Number(businessInfo.geo.longitude)) {
        beanstandungen.push(`${pfad}: Längengrad ${lon} weicht von businessInfo (${businessInfo.geo.longitude}) ab.`)
      }
    }
  }
}

// --- Ergebnis --------------------------------------------------------------
console.log(
  `SEO-Prüfung gegen ${basis}: ${geprueft} Adressen · ${titel.size} eindeutige Titel · ` +
    `${beschreibungen.size} eindeutige Descriptions · ${mitLocalBusiness} Stadtseiten mit LocalBusiness`
)

if (hinweise.length > 0) {
  console.log(`\nHinweise (kein Abbruch): ${hinweise.length}`)
  for (const hinweis of hinweise.slice(0, 30)) console.log(`  ${hinweis}`)
  if (hinweise.length > 30) console.log(`  ... und ${hinweise.length - 30} weitere`)
}

if (beanstandungen.length === 0) {
  console.log('\nSEO-Prüfung: keine Beanstandungen.')
  process.exit(0)
}

console.error(`\nSEO-Prüfung: ${beanstandungen.length} Beanstandung(en).\n`)
for (const beanstandung of beanstandungen) console.error(`  ${beanstandung}`)
process.exit(1)
