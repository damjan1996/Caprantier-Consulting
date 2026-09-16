/**
 * Prüft, dass sich Textblöcke nicht über Seiten hinweg wiederholen.
 *
 * Der Auftrag "Sichtbarkeit" verlangt für die zweite Stadt-Seitenfamilie
 * (`/kaltakquise/[stadt]`) und für die Branchenseiten ausdrücklich: **keine
 * Kopie der Texte.** Der Grund steht in `docs/ap1-indexierung-befund.md` --
 * 52 thematisch überlappende Kurztexte haben den Blog aus dem Index
 * gehalten. Zwei Seitenfamilien mit identischen Absätzen würden denselben
 * Fehler eine Ebene höher wiederholen, nur mit 30 statt 52 Seiten.
 *
 * Geprüft werden die redaktionellen Felder der Datenmodule, nicht das
 * gerenderte HTML: Gemeinsame Bausteine wie Kopfzeile, Fußzeile oder
 * Aufrufe zum Handeln sollen sich wiederholen -- inhaltliche Absätze nicht.
 *
 * Aufruf: node scripts/check-content-duplication.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { loadTsModule } from './lib/load-ts-module.mjs'

const ROOT = path.resolve(import.meta.dirname, '..')

const { cities } = await loadTsModule('src/lib/cities.ts')
const { cityAcquisition } = await loadTsModule('src/lib/city-acquisition.ts')
const { industryPages } = await loadTsModule('src/lib/industries.ts')

/** Ab dieser Länge gilt ein wiederholter Satz als Dopplung, nicht als Floskel. */
const MINDESTLAENGE = 60

/** Sammelt {text -> [Herkunft]} über alle geprüften Felder. */
const bloecke = new Map()

function erfassen(text, herkunft) {
  if (typeof text !== 'string') return
  for (const satz of text.split(/(?<=[.!?])\s+/)) {
    const normalisiert = satz.trim().replace(/\s+/g, ' ')
    if (normalisiert.length < MINDESTLAENGE) continue
    const vorhanden = bloecke.get(normalisiert) ?? []
    vorhanden.push(herkunft)
    bloecke.set(normalisiert, vorhanden)
  }
}

for (const city of cities) {
  erfassen(city.regionalText, `cities.ts/${city.slug}/regionalText`)
}

for (const [slug, eintrag] of Object.entries(cityAcquisition)) {
  erfassen(eintrag.marktText, `city-acquisition/${slug}/marktText`)
  erfassen(eintrag.zielgruppenText, `city-acquisition/${slug}/zielgruppenText`)
  erfassen(eintrag.erreichbarkeit, `city-acquisition/${slug}/erreichbarkeit`)
}

for (const industry of industryPages) {
  erfassen(industry.intro, `industries/${industry.slug}/intro`)
  erfassen(industry.summary, `industries/${industry.slug}/summary`)
  for (const punkt of industry.painPoints) {
    erfassen(punkt.text, `industries/${industry.slug}/painPoint`)
  }
  for (const schritt of industry.approach) {
    erfassen(schritt.text, `industries/${industry.slug}/approach`)
  }
  for (const faq of industry.faqs) {
    erfassen(faq.answer, `industries/${industry.slug}/faq`)
  }
}

// --- Typografie: kein ASCII-Doppelbindestrich in sichtbarem Text ----------
//
// Beim Umbau am 10.09.2026 wurde ` -- ` als Platzhalter für den
// Halbgeviertstrich geschrieben und anschließend nur in `src/content/blog/`
// ersetzt. In `schemas.ts`, `pricing.ts` und `case-studies.ts` blieb er stehen
// und war live sichtbar -- im FAQ jeder der 15 Kaltakquise-Stadtseiten und im
// dazugehörigen FAQPage-Markup. Im Quelltext fällt das nicht auf, im Rendering
// sofort.
//
// Geprüft werden nur Nicht-Kommentarzeilen: In Kommentaren ist `--` als
// Gedankenstrich-Ersatz unbedenklich, weil er nie ausgeliefert wird.
const TEXTQUELLEN = [
  'src/lib/schemas.ts',
  'src/lib/industries.ts',
  'src/lib/city-acquisition.ts',
  'src/lib/case-studies.ts',
  'src/lib/pricing.ts',
  'src/lib/local-seo.ts',
]

function istKommentarzeile(zeile) {
  return /^\s*(\*|\/\/|\/\*)/.test(zeile)
}

const typografie = []
for (const relativerPfad of TEXTQUELLEN) {
  const voll = path.join(ROOT, relativerPfad)
  if (!fs.existsSync(voll)) continue
  fs.readFileSync(voll, 'utf8')
    .split(/\r?\n/)
    .forEach((zeile, index) => {
      if (!istKommentarzeile(zeile) && zeile.includes(' -- ')) {
        typografie.push(`${relativerPfad}:${index + 1} enthält " -- " in sichtbarem Text.`)
      }
    })
}

const beanstandungen = [...typografie]
for (const [satz, herkuenfte] of bloecke) {
  if (herkuenfte.length > 1) {
    beanstandungen.push(
      `Wortgleich an ${herkuenfte.length} Stellen (${herkuenfte.join(', ')}):\n      "${satz.slice(0, 110)}…"`
    )
  }
}

// Jede Stadt muss ueberhaupt einen eigenen Text haben.
for (const city of cities) {
  if (!cityAcquisition[city.slug]) {
    beanstandungen.push(
      `${city.slug} hat keinen Eintrag in city-acquisition.ts. ` +
        'Ohne eigenen Ortstext ist /kaltakquise/' + city.slug + ' eine Kopie.'
    )
  }
}

console.log(
  `Geprüft: ${cities.length} Städte · ${Object.keys(cityAcquisition).length} Ortstexte · ` +
    `${industryPages.length} Branchenseiten · ${bloecke.size} Sätze ab ${MINDESTLAENGE} Zeichen`
)

if (beanstandungen.length === 0) {
  console.log('Dopplungsprüfung: keine Beanstandungen.')
  process.exit(0)
}

console.error(`\nDopplungsprüfung: ${beanstandungen.length} Beanstandung(en).\n`)
for (const beanstandung of beanstandungen) {
  console.error(`  ${beanstandung}`)
}
process.exit(1)
