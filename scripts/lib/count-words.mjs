/**
 * Schnellzähler für einzelne Beitragsdateien während des Schreibens.
 *
 * Aufruf: node scripts/lib/count-words.mjs src/content/blog/<datei>.ts …
 *
 * Das eigentliche Gate ist `scripts/blog-audit.mjs`. Dieses Skript existiert,
 * weil es beim Schreiben eines Beitrags nützlich ist, die Länge zu kennen,
 * bevor der Index alle Beiträge zusammenzieht.
 */

import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..', '..')

function zaehlen(dateiPfad) {
  const quelle = fs.readFileSync(path.join(ROOT, dateiPfad), 'utf8')
  const markdown = quelle.split('content: `')[1]?.split('`.trim()')[0]

  if (!markdown) {
    return { fehler: 'kein content-Feld gefunden' }
  }

  const text = markdown
    .replace(/^\s*\|[\s:|-]+\|\s*$/gm, ' ')
    .replace(/\[([^\]]*)\]\([^)\s]+\)/g, '$1')
    .replace(/[#>*_`|]/g, ' ')
    .replace(/^\s*[-+]\s+/gm, ' ')
    .replace(/^\s*\d+\.\s+/gm, ' ')

  return {
    woerter: text.split(/\s+/).filter((wort) => /[\p{L}\p{N}]/u.test(wort)).length,
    extern: [...markdown.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].filter(
      ([, url]) => !url.includes('carpantier-consulting.de')
    ).length,
    intern: [...markdown.matchAll(/\]\((\/[^)\s]+)\)/g)].length,
    faqs: (quelle.match(/^\s{6}question:/gm) ?? []).length,
  }
}

for (const datei of process.argv.slice(2)) {
  const ergebnis = zaehlen(datei.replace(/\\/g, '/'))
  const name = path.basename(datei).replace(/\.ts$/, '')
  if (ergebnis.fehler) {
    console.log(`${name.padEnd(42)}  ${ergebnis.fehler}`)
  } else {
    console.log(
      `${name.padEnd(42)}  ${String(ergebnis.woerter).padStart(5)} Wörter  ` +
        `${ergebnis.faqs} FAQ  ${ergebnis.extern} extern  ${ergebnis.intern} intern`
    )
  }
}
