/**
 * Regressionsschutz für die rechtlich heiklen Stellen der Website.
 *
 * Jeder Punkt hier stand schon einmal live und war beanstandet. Ein Kommentar
 * im Code hält das nicht auf — ein fehlschlagender Lauf schon. Das Skript
 * gehört deshalb in `verify` und damit vor jedes Deployment.
 *
 * Aufruf: node scripts/check-compliance.mjs
 */

import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const SOURCE_DIR = path.join(ROOT, 'src')

/** Dateien, die geprüft werden. Alles andere landet nie im Auslieferungsstand. */
const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.mjs', '.json'])

const rules = [
  {
    name: 'Erfundene Bewertungen',
    pattern: /aggregateRating\s*:/,
    reason:
      'Bewertungs-Markup darf nur zurückkehren, wenn es echte, freigegebene und ' +
      'auf der Seite sichtbare Kundenstimmen gibt (§ 5 UWG).',
  },
  {
    name: 'Veraltete Rechtsgrundlage TMG',
    pattern: /§\s*5\s*TMG/,
    reason: 'Das TMG ist durch das DDG abgelöst. Im Impressum gehört § 5 DDG.',
  },
  {
    name: 'Abgeschaltete EU-Plattform zur Online-Streitbeilegung',
    pattern: /ec\.europa\.eu\/consumers\/odr/,
    reason:
      'Die OS-Plattform ist seit dem 20.07.2025 abgeschaltet. Ein Link darauf ' +
      'geht ins Leere und gilt als irreführend.',
  },
  {
    name: 'Platzhalter statt Umsatzsteuer-Identifikationsnummer',
    pattern: /DE_USTIDNR_EINTRAGEN/,
    reason:
      'Für dieses Einzelunternehmen ist keine USt-IdNr. erteilt, die Angabe ' +
      'entfällt deshalb. Sollte später eine erteilt werden, gehört die echte ' +
      'Nummer ins Impressum — niemals ein Platzhalter.',
  },
  {
    name: 'NAP-Angabe ausserhalb von businessInfo',
    // Strasse, Postleitzahl und Rufnummer der Firma. Wer sie irgendwo sonst
    // abtippt, erzeugt eine zweite Quelle -- und die laeuft irgendwann
    // auseinander.
    pattern: /Stammheimer\s+Stra|50935|50735|\+?49\s*\(?0?\)?\s*15738186221|4915738186221/,
    allow: ['src/lib/local-seo.ts'],
    reason:
      'Name, Anschrift und Rufnummer stehen ausschliesslich in ' +
      '`businessInfo` (src/lib/local-seo.ts) und werden von dort importiert. ' +
      'Am 10.09.2026 waren zwei verschiedene Postleitzahlen im Umlauf -- 50935 ' +
      'in Impressum, Datenschutzerklaerung und JSON-LD, 50735 in businessInfo ' +
      'und in den strukturierten Daten. Abweichende NAP-Angaben schwaechen jedes lokale Signal, ' +
      'und im Impressum sind sie zusaetzlich abmahnfaehig.',
  },
]

function* sourceFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* sourceFiles(full)
    } else if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      yield full
    }
  }
}

const findings = []

for (const file of sourceFiles(SOURCE_DIR)) {
  const relative = path.relative(ROOT, file).split(path.sep).join('/')
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/)

  for (const rule of rules) {
    if (rule.allow?.includes(relative)) continue

    lines.forEach((line, index) => {
      // Kommentarzeilen erklären meist gerade, warum etwas NICHT mehr da ist.
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return
      if (rule.pattern.test(line)) {
        findings.push({ rule, file: relative, line: index + 1, text: line.trim() })
      }
    })
  }
}

// Die Fallstudienseite darf keine benannten Unternehmen, Personen oder ihnen
// zugeschriebene Zitate enthalten.
const caseStudies = path.join(SOURCE_DIR, 'app', 'case-studies')
if (fs.existsSync(caseStudies)) {
  findings.push({
    rule: {
      name: 'Fallstudienseite ist zurück',
      reason:
        'Die Seite wurde entfernt, weil Firmen, Zitate und Kennzahlen erfunden ' +
        'waren. Sie darf erst mit belegbaren und schriftlich freigegebenen ' +
        'Fällen zurückkehren (§ 5 UWG).',
    },
    file: 'src/app/case-studies',
    line: 0,
    text: 'Verzeichnis existiert wieder',
  })
}

// Fallstudien: Blindmuster duerfen niemals indexierbar sein.
//
// Die Vorgaengerseite unter /case-studies wurde entfernt, weil erfundene
// Firmen und Kennzahlen im Index standen. Der Nachfolger unter /referenzen
// darf ein Blindmuster zur Demonstration enthalten -- aber nur, solange die
// Route auf `noindex` steht. Diese Kopplung wird hier geprueft, weil sie sonst
// beim naechsten Umbau der Metadaten still verloren geht.
const fallstudienDatei = path.join(SOURCE_DIR, 'lib', 'case-studies.ts')
const referenzenLayout = path.join(SOURCE_DIR, 'app', 'referenzen', 'layout.tsx')

if (fs.existsSync(fallstudienDatei)) {
  const fallstudien = fs.readFileSync(fallstudienDatei, 'utf8')
  const hatBeispiel = /istBeispiel:\s*true/.test(fallstudien)

  if (hatBeispiel) {
    const layout = fs.existsSync(referenzenLayout)
      ? fs.readFileSync(referenzenLayout, 'utf8')
      : ''
    const koppeltNoindex = /enthaeltBeispiele\(\)/.test(layout) && /index:\s*false/.test(layout)

    if (!koppeltNoindex) {
      findings.push({
        rule: {
          name: 'Beispiel-Fallstudie ohne noindex',
          reason:
            'In src/lib/case-studies.ts steht mindestens ein Eintrag mit ' +
            '`istBeispiel: true`. Solange das so ist, muss ' +
            'src/app/referenzen/layout.tsx die robots-Angabe an ' +
            '`enthaeltBeispiele()` koppeln und `index: false` setzen. Eine ' +
            'Seite mit Blindmuster-Kennzahlen im Suchindex ist irrefuehrend ' +
            '(§ 5 UWG) -- genau daran ist die Vorgaengerseite gescheitert.',
        },
        file: 'src/app/referenzen/layout.tsx',
        line: 0,
        text: 'robots-Angabe nicht an enthaeltBeispiele() gekoppelt',
      })
    }
  }

  // Eine echte Fallstudie ohne schriftliche Freigabe darf nicht ausgeliefert
  // werden. Geprueft wird der einfache Fall: `kundeNennbar: true` ohne
  // `freigegebenAm` im selben Eintrag.
  const eintraege = fallstudien.split(/^\s{2}\{$/m).slice(1)
  for (const eintrag of eintraege) {
    if (/kundeNennbar:\s*true/.test(eintrag) && !/freigegebenAm:/.test(eintrag)) {
      findings.push({
        rule: {
          name: 'Kundenname ohne dokumentierte Freigabe',
          reason:
            'Ein Kundenname darf nur genannt werden, wenn `freigegebenAm` das ' +
            'Datum der schriftlichen Freigabe traegt (§ 5 UWG, Persoenlichkeits- ' +
            'und Unternehmenspersoenlichkeitsrecht).',
        },
        file: 'src/lib/case-studies.ts',
        line: 0,
        text: 'kundeNennbar: true ohne freigegebenAm',
      })
    }
  }
}

if (findings.length === 0) {
  console.log('Compliance-Prüfung: keine Beanstandungen.')
  process.exit(0)
}

console.error(`Compliance-Prüfung: ${findings.length} Beanstandung(en).\n`)
for (const finding of findings) {
  console.error(`  ${finding.rule.name}`)
  console.error(`    ${finding.file}${finding.line ? `:${finding.line}` : ''}`)
  console.error(`    ${finding.text}`)
  console.error(`    ${finding.rule.reason}\n`)
}
process.exit(1)
