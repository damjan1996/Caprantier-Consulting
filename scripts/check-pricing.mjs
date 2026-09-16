/**
 * Prüft den Freigabestand der Preismodelle.
 *
 * Zwei Fehler soll dieses Skript verhindern:
 *
 * 1. `PREISE_FREIGEGEBEN` steht auf `true`, ein Modell trägt aber keinen
 *    Betrag. Dann stünde auf `/leistungen` ein Preisblock mit Lücken.
 * 2. Ein Modell trägt einen Betrag, der offensichtlich ein Platzhalter ist
 *    (0 oder negativ). Eine Null als Preis ist eine Aussage, und eine falsche.
 *
 * Der umgekehrte Fall -- Beträge eingetragen, Freigabe noch nicht erteilt --
 * ist ausdrücklich kein Fehler: So sieht der Zustand aus, in dem Nico die
 * Zahlen hinterlegt hat und die Veröffentlichung noch aussteht.
 *
 * Aufruf: node scripts/check-pricing.mjs
 */

import { loadTsModule } from './lib/load-ts-module.mjs'

const { PREISE_FREIGEGEBEN, priceModels } = await loadTsModule('src/lib/pricing.ts')

const beanstandungen = []

for (const modell of priceModels) {
  if (PREISE_FREIGEGEBEN && modell.preis === null) {
    beanstandungen.push(
      `Modell "${modell.name}" ist freigegeben, trägt aber keinen Betrag. ` +
        'Entweder Betrag eintragen oder PREISE_FREIGEGEBEN zurücksetzen.'
    )
  }
  if (typeof modell.preis === 'number' && modell.preis <= 0) {
    beanstandungen.push(`Modell "${modell.name}" hat den Betrag ${modell.preis}. Das ist kein Preis.`)
  }
}

const mitBetrag = priceModels.filter((modell) => typeof modell.preis === 'number').length
console.log(
  `Preismodelle: ${priceModels.length} · mit Betrag: ${mitBetrag} · ` +
    `Freigabe: ${PREISE_FREIGEGEBEN ? 'erteilt' : 'ausstehend'}`
)

if (beanstandungen.length === 0) {
  console.log('Preisprüfung: keine Beanstandungen.')
  process.exit(0)
}

console.error(`\nPreisprüfung: ${beanstandungen.length} Beanstandung(en).\n`)
for (const beanstandung of beanstandungen) {
  console.error(`  ${beanstandung}`)
}
process.exit(1)
