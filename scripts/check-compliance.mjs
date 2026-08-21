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
