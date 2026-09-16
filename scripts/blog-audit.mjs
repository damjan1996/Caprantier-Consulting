/**
 * Qualitätsgate für die Fachbeiträge unter /blog.
 *
 * Hintergrund: Von 52 Beiträgen waren am 10.09.2026 nur vier im Google-Index.
 * Der Median lag bei 457 Wörtern, kein einziger Beitrag über 900, fünf hatten
 * einen FAQ-Block, keiner verwies auf eine externe Quelle. Google hatte die
 * Seiten gecrawlt und nicht aufgenommen -- ein Qualitätsurteil, kein
 * Crawling-Problem.
 *
 * Dieses Skript hält den Zustand fest, in den der Blog danach gebracht wurde.
 * Es zählt, was ein Beitrag tatsächlich enthält, statt zu glauben, was im
 * Datensatz behauptet wird.
 *
 * Aufruf:
 *   node scripts/blog-audit.mjs           Gate: bricht bei Unterschreitung ab
 *   node scripts/blog-audit.mjs --inventar  Bestandsaufnahme, bricht nie ab
 */

import { loadTsModule } from './lib/load-ts-module.mjs'

/** Untergrenzen aus dem Auftrag "Sichtbarkeit" (Abschnitt 5, Zielbild). */
const MINDESTWOERTER = 1200
const MINDEST_FAQ = 3
const MINDEST_EXTERNE_QUELLEN = 1

const EIGENE_DOMAIN = 'carpantier-consulting.de'

const nurInventar = process.argv.includes('--inventar')

const { blogPosts } = await loadTsModule('src/lib/blog.ts')

/** Alle Markdown-Links eines Textes als {text, ziel}. */
function linksAus(markdown) {
  return [...markdown.matchAll(/\[([^\]]*)\]\(([^)\s]+)\)/g)].map((treffer) => ({
    text: treffer[1],
    ziel: treffer[2],
  }))
}

/**
 * Wörter des sichtbaren Textes.
 *
 * Markdown-Auszeichnung zählt nicht mit: Rautenzeichen, Tabellenstriche,
 * Listenpunkte und Link-Ziele sind Syntax, keine gelesenen Wörter. Der
 * Linktext dagegen wird gelesen und zählt.
 */
function woerterZaehlen(markdown) {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^\s*\|[\s:|-]+\|\s*$/gm, ' ')
    .replace(/\[([^\]]*)\]\([^)\s]+\)/g, '$1')
    .replace(/[#>*_`|]/g, ' ')
    .replace(/^\s*[-+]\s+/gm, ' ')
    .replace(/^\s*\d+\.\s+/gm, ' ')

  return text.split(/\s+/).filter((wort) => /[\p{L}\p{N}]/u.test(wort)).length
}

function pruefe(post) {
  const links = linksAus(post.content)
  const externeQuellen = links.filter(
    ({ ziel }) => /^https?:\/\//i.test(ziel) && !ziel.includes(EIGENE_DOMAIN)
  )
  const interneLinks = links.filter(({ ziel }) => ziel.startsWith('/'))

  return {
    slug: post.slug,
    woerter: woerterZaehlen(post.content),
    faqs: post.faqs?.length ?? 0,
    externeQuellen: externeQuellen.length,
    interneLinks: interneLinks.length,
    verlinktLeistungen: interneLinks.some(({ ziel }) => ziel.startsWith('/leistungen')),
    verlinktStadt: interneLinks.some(
      ({ ziel }) => ziel.startsWith('/leistungen/') || ziel.startsWith('/kaltakquise/')
    ),
  }
}

const berichte = blogPosts.map(pruefe)

const spalten = [
  ['Slug', (b) => b.slug, 46, 'links'],
  ['Wörter', (b) => b.woerter, 7, 'rechts'],
  ['FAQ', (b) => b.faqs, 4, 'rechts'],
  ['Extern', (b) => b.externeQuellen, 7, 'rechts'],
  ['Intern', (b) => b.interneLinks, 7, 'rechts'],
  ['Stadt', (b) => (b.verlinktStadt ? 'ja' : '--'), 6, 'rechts'],
]

function zeile(werte) {
  return werte
    .map(([wert, breite, richtung]) =>
      richtung === 'links' ? String(wert).padEnd(breite) : String(wert).padStart(breite)
    )
    .join('  ')
}

console.log(zeile(spalten.map(([kopf, , breite, richtung]) => [kopf, breite, richtung])))
console.log('-'.repeat(spalten.reduce((summe, [, , breite]) => summe + breite + 2, -2)))

for (const bericht of berichte) {
  console.log(zeile(spalten.map(([, lesen, breite, richtung]) => [lesen(bericht), breite, richtung])))
}

const woerter = berichte.map((b) => b.woerter).sort((a, b) => a - b)
const median = woerter.length % 2
  ? woerter[(woerter.length - 1) / 2]
  : Math.round((woerter[woerter.length / 2 - 1] + woerter[woerter.length / 2]) / 2)
const mittel = Math.round(woerter.reduce((summe, wert) => summe + wert, 0) / woerter.length)

console.log('')
console.log(
  `${berichte.length} Beiträge · Median ${median} Wörter · Mittel ${mittel} · ` +
    `Minimum ${woerter[0]} · Maximum ${woerter[woerter.length - 1]}`
)
console.log(
  `Mit FAQ-Block: ${berichte.filter((b) => b.faqs >= MINDEST_FAQ).length}/${berichte.length} · ` +
    `mit externer Quelle: ${berichte.filter((b) => b.externeQuellen >= MINDEST_EXTERNE_QUELLEN).length}/${berichte.length} · ` +
    `mit Stadt- oder Leistungslink: ${berichte.filter((b) => b.verlinktStadt).length}/${berichte.length}`
)

if (nurInventar) {
  process.exit(0)
}

const beanstandungen = []
for (const bericht of berichte) {
  if (bericht.woerter < MINDESTWOERTER) {
    beanstandungen.push(`${bericht.slug}: ${bericht.woerter} Wörter, gefordert sind ${MINDESTWOERTER}.`)
  }
  if (bericht.faqs < MINDEST_FAQ) {
    beanstandungen.push(`${bericht.slug}: ${bericht.faqs} FAQ-Einträge, gefordert sind ${MINDEST_FAQ}.`)
  }
  if (bericht.externeQuellen < MINDEST_EXTERNE_QUELLEN) {
    beanstandungen.push(
      `${bericht.slug}: keine externe Quelle verlinkt, gefordert ist ${MINDEST_EXTERNE_QUELLEN}.`
    )
  }
  if (!bericht.verlinktLeistungen) {
    beanstandungen.push(`${bericht.slug}: kein interner Link auf /leistungen.`)
  }
}

if (beanstandungen.length === 0) {
  console.log('')
  console.log('Blog-Audit: keine Beanstandungen.')
  process.exit(0)
}

console.error('')
console.error(`Blog-Audit: ${beanstandungen.length} Beanstandung(en).\n`)
for (const beanstandung of beanstandungen) {
  console.error(`  ${beanstandung}`)
}
process.exit(1)
