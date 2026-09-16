/**
 * Sperrliste: Seiten, die gewinnbar aussehen und es nicht sind.
 *
 * Hintergrund (AP-B6 der Gesamt-Roadmap, 12.09.2026): Die Suchraum-Erhebung hat
 * 157 Anfragen geprüft. Ein Teil der Begriffe sieht auf dem Papier offen aus --
 * weiche Trefferliste, kein Wettbewerber mit eigener Seite -- und ist trotzdem
 * wertlos oder schädlich. Diese Begründungen gehen verloren, sobald jemand in
 * sechs Monaten dieselbe Trefferliste noch einmal ansieht und denselben Schluss
 * zieht. Deshalb stehen sie hier als Gate und nicht nur in einem Dokument.
 *
 * Drei Kategorien, drei verschiedene Schäden:
 *
 * 1. **Intent-Fallen.** Google löst den Begriff anders auf, als er gemeint ist.
 *    "Terminvereinbarung Anlagenbau" liefert Projektterminplanung, "Telefon-
 *    akquise Cloud Anbieter" liefert Telefonanlagen. Die Seite rankt dann gegen
 *    die falsche Absicht und konvertiert nie.
 *
 * 2. **B2C im B2B-Kostüm.** Wärmepumpe, GaLaBau und unqualifizierte Photovoltaik
 *    werden von Lead-Brokern gehalten, die Hausbesitzer-Leads verkaufen. Eine
 *    Kampagne dort ruft Privathaushalte an -- nach § 7 Abs. 2 Nr. 1 UWG ohne
 *    ausdrückliche Einwilligung unzulässig. Das ist keine SEO-Frage.
 *
 * 3. **Jobsuche-Kontamination.** "Vertriebsmitarbeiter auf Zeit mieten" und
 *    "Vertriebspartner gesucht" bedienen Menschen, die Arbeit suchen. Die Seite
 *    zieht Bewerber an, keine Kunden.
 *
 * Dazu die vierte, strukturelle Regel: **kein Kreuzprodukt Branche x Stadt.**
 * John Mueller, September 2026, zu genau diesem Muster: "Programmatic SEO like
 * this often leads to a site that's either spam, borderline spam, or low
 * quality. ... Our systems have possibly lost faith in your site providing good
 * value to users based on the old pages." Der Schaden ist seitenweit und
 * dauerhaft, nicht seitenbezogen. `/branchen/[branche]` und `/kaltakquise/
 * [stadt]` bleiben getrennte Achsen.
 *
 * Geprüft werden **Slugs, Titel und Überschriften** -- nicht der Fliesstext.
 * Über die Sperrliste zu schreiben ist ausdrücklich erlaubt und sogar nützlich;
 * verboten ist, eine Seite darauf auszurichten.
 *
 * Aufruf: node scripts/check-forbidden-targets.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { loadTsModule } from './lib/load-ts-module.mjs'

const ROOT = path.resolve(import.meta.dirname, '..')
const APP_DIR = path.join(ROOT, 'src', 'app')

const { industryPages } = await loadTsModule('src/lib/industries.ts')

/**
 * Gesperrte Begriffe.
 *
 * `muster` trifft auf normalisierten Text (klein, ohne Umlaute, Bindestriche
 * zu Leerzeichen). `ausnahme` hebt die Sperre auf, wenn der Begriff in einer
 * zulässigen Engführung auftaucht -- "Photovoltaik" allein ist B2C, "Photovoltaik
 * Gewerbedach" nicht.
 */
const GESPERRT = [
  // --- 1. Intent-Fallen ---------------------------------------------------
  {
    muster: /terminvereinbarung.{0,12}anlagenbau/,
    grund: 'Google löst das als Projektterminplanung auf (Gantt, PMO, Bauzeitenplan).',
    stattdessen: '"Entscheider-Termine im Anlagenbau"',
  },
  {
    muster: /leadgenerierung.{0,12}automatisierungstechnik/,
    grund: 'Google löst das als *automatisierte* Leadgenerierung auf (KI-Werkzeuge).',
    stattdessen: '"Kaltakquise Automatisierungstechnik", mit SPS/Robotik/Steuerungstechnik im Text',
  },
  {
    muster: /terminvereinbarung.{0,12}facility/,
    grund: 'Trefferliste besteht aus Buchungssoftware und TÜV-Seminaren.',
    stattdessen: 'Facility Management ohne das Wort "Terminvereinbarung" im Titel',
  },
  {
    muster: /telefonakquise.{0,12}cloud/,
    grund: 'Trefferliste besteht aus Cloud-Telefonanlagen (fonial, comdesk, NFON).',
    stattdessen: null,
  },
  {
    muster: /terminvereinbarung.{0,12}(it.?systemhaus|systemhaeuser)/,
    grund: 'Trefferliste besteht aus den Buchungsseiten der Systemhäuser selbst.',
    stattdessen: '"Kaltakquise für IT-Systemhäuser"',
  },
  {
    muster: /kaltakquise.{0,12}crm.?berater/,
    grund: 'Google löst "Kaltakquise CRM" als CRM-Software für Kaltakquise auf.',
    stattdessen: null,
  },
  {
    muster: /bueroausstattung|buerobedarf/,
    grund: 'Trefferliste besteht aus Händlern (Kaiserkraft, Bechtle, IKEA). Der Suchende kauft Bürostühle.',
    stattdessen: null,
  },
  {
    muster: /werbemittel|werbeartikel/,
    grund:
      'Absicht ist invertiert: Jede rankende Seite empfiehlt, Werbeartikel zur Kundengewinnung einzusetzen. Der Suchende kauft Giveaways.',
    stattdessen: null,
  },

  // --- 2. B2C im B2B-Kostüm -----------------------------------------------
  {
    muster: /waermepumpe/,
    grund:
      'Der deutsche Markt ist Einfamilienhaus. Anrufe gingen an Privathaushalte -- ohne ausdrückliche Einwilligung nach § 7 Abs. 2 Nr. 1 UWG unzulässig.',
    stattdessen: null,
  },
  {
    muster: /galabau|garten.?und.?landschaftsbau/,
    grund:
      'Keyword ist von Lead-Brokern für Poolbau und Wellness-Handwerk besetzt -- Hausbesitzer-Leads, nicht B2B.',
    stattdessen: '"Grünpflege für die Wohnungswirtschaft", falls überhaupt',
  },
  {
    muster: /photovoltaik|solar/,
    ausnahme: /gewerbedach|industriehalle|freiflaeche|kommune|gewerbe/,
    grund:
      'Unqualifiziert ist Photovoltaik Privatkundengeschäft. Nur mit Engführung auf Gewerbedach, Industriehallen, Freiflächen oder Kommunen -- und selbst dann eine harte Trefferliste, in der PATT sitzt.',
    stattdessen: null,
  },
  {
    muster: /pflegedienst|ambulante.?pflege/,
    grund:
      'Weiche Trefferliste, schwacher Käufer: Es ranken Seminare, Coaching und Verlagswerbung. Dazu Heilmittelwerberecht.',
    stattdessen: null,
  },

  // --- 3. Jobsuche-Kontamination ------------------------------------------
  {
    muster: /vertriebsmitarbeiter.{0,16}(auf.?zeit|mieten)/,
    grund: 'Trefferliste ist eine Jobbörse (Indeed, StepStone, TIMEPARTNER).',
    stattdessen: null,
  },
  {
    muster: /vertriebspartner.{0,20}gesucht/,
    grund:
      '"gesucht" invertiert die Richtung. Die Seite zöge Provisionsvertriebler an, keine Kunden.',
    stattdessen: null,
  },
  {
    muster: /rent.?a.?salesman/,
    grund: 'Eingetragene Marke eines Wettbewerbers.',
    stattdessen: null,
  },
  {
    muster: /interim.?sales.?manager/,
    grund: 'Fremde Branche (Interim-Vermittlung) und angebotsseitige Absicht.',
    stattdessen: null,
  },
  {
    muster: /technischer.?vertrieb.{0,16}maschinenbau/,
    ausnahme: /auslagern|outsourc/,
    grund: 'Ohne "auslagern" ist das eine Stellensuche.',
    stattdessen: '"Technischen Vertrieb im Maschinenbau auslagern"',
  },
]

/** klein, ohne Umlaute, Bindestriche und Unterstriche zu Leerzeichen */
function normalisieren(text) {
  return String(text)
    .toLowerCase()
    .replaceAll('ä', 'ae')
    .replaceAll('ö', 'oe')
    .replaceAll('ü', 'ue')
    .replaceAll('ß', 'ss')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const beanstandungen = []

/** Prüft einen einzelnen Bezeichner gegen die Sperrliste. */
function pruefen(text, herkunft) {
  const normal = normalisieren(text)
  for (const eintrag of GESPERRT) {
    if (!eintrag.muster.test(normal)) continue
    if (eintrag.ausnahme && eintrag.ausnahme.test(normal)) continue

    const hinweis = eintrag.stattdessen ? ` Stattdessen: ${eintrag.stattdessen}.` : ''
    beanstandungen.push(`${herkunft}\n      "${text}"\n      ${eintrag.grund}${hinweis}`)
  }
}

// --- 1) Branchenseiten: Slug, Titel, Überschriften -------------------------
for (const branche of industryPages) {
  pruefen(branche.slug, `Branchenseite /branchen/${branche.slug} (Slug)`)
  for (const feld of ['shortTitle', 'title', 'h1', 'metaTitle', 'name']) {
    if (typeof branche[feld] === 'string') {
      pruefen(branche[feld], `Branchenseite /branchen/${branche.slug} (${feld})`)
    }
  }
}

// --- 2) Routen unter src/app ----------------------------------------------
function routenSammeln(verzeichnis, praefix = '') {
  const gefunden = []
  for (const eintrag of fs.readdirSync(verzeichnis, { withFileTypes: true })) {
    if (!eintrag.isDirectory()) continue
    if (eintrag.name.startsWith('_') || eintrag.name.startsWith('.')) continue
    if (eintrag.name === 'components' || eintrag.name === 'api') continue

    const pfad = `${praefix}/${eintrag.name}`
    gefunden.push(pfad)
    gefunden.push(...routenSammeln(path.join(verzeichnis, eintrag.name), pfad))
  }
  return gefunden
}

const routen = routenSammeln(APP_DIR)
for (const route of routen) {
  const letztesSegment = route.split('/').filter(Boolean).pop() ?? ''
  if (letztesSegment.startsWith('[')) continue // dynamische Segmente tragen keinen Begriff
  pruefen(letztesSegment, `Route ${route}`)
}

// --- 3) Kreuzprodukt Branche x Stadt --------------------------------------
// Strukturregel, nicht Begriffsregel: Zwei verschachtelte dynamische Segmente
// unter /branchen oder /kaltakquise ergeben das Kreuzprodukt, vor dem Mueller
// im September 2026 ausdrücklich gewarnt hat.
for (const route of routen) {
  const segmente = route.split('/').filter(Boolean)
  const dynamische = segmente.filter((s) => s.startsWith('['))
  const istAchse = segmente[0] === 'branchen' || segmente[0] === 'kaltakquise' || segmente[0] === 'leistungen'

  if (istAchse && dynamische.length >= 2) {
    beanstandungen.push(
      `Route /${segmente.join('/')}\n` +
        '      Kreuzprodukt aus zwei Achsen. Google adressiert genau dieses Muster\n' +
        '      ("iterate through a large list ... finding all possible combinations"),\n' +
        '      und der Schaden ist seitenweit und dauerhaft, nicht seitenbezogen.\n' +
        '      Regionale Stärke einer Branche gehört als Absatz IN die Branchenseite.'
    )
  }
}

// --- Ergebnis --------------------------------------------------------------
console.log(
  `Sperrliste: ${GESPERRT.length} Begriffe · ${industryPages.length} Branchenseiten · ` +
    `${routen.length} Routen geprüft`
)

if (beanstandungen.length === 0) {
  console.log('Sperrlisten-Prüfung: keine Beanstandungen.')
  process.exit(0)
}

console.error(`\nSperrlisten-Prüfung: ${beanstandungen.length} Beanstandung(en).\n`)
for (const beanstandung of beanstandungen) {
  console.error(`  ${beanstandung}\n`)
}
process.exit(1)
