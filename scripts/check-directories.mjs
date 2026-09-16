/**
 * Prüft, dass `localDirectories` den tatsächlichen Stand abbildet.
 *
 * Die Liste war bis zum 10.09.2026 ein Aufgabenzettel im Datenformat: 15
 * Einträge, alle auf "pending", seit Monaten unverändert. Damit das nicht
 * zurückkommt, ist der Status hier an Belege gebunden:
 *
 * - `submitted` verlangt ein `submittedAt`. Ohne Datum ist "angemeldet" eine
 *   Behauptung, die niemand nachvollziehen kann.
 * - `verified` verlangt zusätzlich eine `profileUrl`. Ein bestätigter Eintrag,
 *   den man nicht aufrufen kann, ist nicht bestätigt.
 * - Ein Datum in der Zukunft ist ein Tippfehler.
 *
 * Aufruf: node scripts/check-directories.mjs
 */

import { loadTsModule } from './lib/load-ts-module.mjs'

const { localDirectories } = await loadTsModule('src/lib/local-seo.ts')

const heute = new Date().toISOString().slice(0, 10)
const beanstandungen = []

for (const eintrag of localDirectories) {
  const { name, status, submittedAt, profileUrl } = eintrag

  if (status !== 'pending' && !submittedAt) {
    beanstandungen.push(`${name}: Status "${status}" ohne submittedAt.`)
  }
  if (status === 'verified' && !profileUrl) {
    beanstandungen.push(`${name}: Status "verified" ohne profileUrl.`)
  }
  if (status === 'pending' && (submittedAt || profileUrl)) {
    beanstandungen.push(
      `${name}: Status "pending", trägt aber schon submittedAt oder profileUrl. ` +
        'Status nachziehen.'
    )
  }
  if (submittedAt && !/^\d{4}-\d{2}-\d{2}$/.test(submittedAt)) {
    beanstandungen.push(`${name}: submittedAt "${submittedAt}" ist kein Datum im Format JJJJ-MM-TT.`)
  }
  if (submittedAt && submittedAt > heute) {
    beanstandungen.push(`${name}: submittedAt "${submittedAt}" liegt in der Zukunft.`)
  }
  if (profileUrl && !/^https:\/\//.test(profileUrl)) {
    beanstandungen.push(`${name}: profileUrl "${profileUrl}" ist keine https-Adresse.`)
  }
}

const zaehlung = { pending: 0, submitted: 0, verified: 0 }
for (const eintrag of localDirectories) zaehlung[eintrag.status] += 1

console.log(
  `Verzeichnisse: ${localDirectories.length} · offen: ${zaehlung.pending} · ` +
    `angemeldet: ${zaehlung.submitted} · bestätigt: ${zaehlung.verified}`
)

const offeneHoch = localDirectories.filter(
  (eintrag) => eintrag.status === 'pending' && eintrag.priority === 'high'
)
if (offeneHoch.length > 0) {
  console.log(`Offen mit hoher Priorität: ${offeneHoch.map((e) => e.name).join(', ')}`)
}

if (beanstandungen.length === 0) {
  console.log('Verzeichnisprüfung: keine Beanstandungen.')
  process.exit(0)
}

console.error(`\nVerzeichnisprüfung: ${beanstandungen.length} Beanstandung(en).\n`)
for (const beanstandung of beanstandungen) {
  console.error(`  ${beanstandung}`)
}
process.exit(1)
