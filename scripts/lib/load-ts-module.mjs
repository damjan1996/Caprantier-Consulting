/**
 * Lädt ein TypeScript-Modul aus `src/` in ein Node-Skript.
 *
 * Die Prüfskripte dieses Projekts laufen als `node scripts/…mjs`, ohne Loader
 * und ohne Buildschritt. Die Daten, die sie prüfen sollen -- Artikel, Städte,
 * Branchen -- liegen aber in `.ts`-Dateien. Statt sie ein zweites Mal als JSON
 * zu pflegen (und damit auseinanderlaufen zu lassen), wird der Modulbaum hier
 * zur Laufzeit übersetzt und als Daten-URL geladen.
 *
 * Aufgelöst werden relative Pfade und der `@/`-Alias aus `tsconfig.json`.
 * Nicht aufgelöst werden Pakete aus `node_modules` -- die Datenmodule dieses
 * Projekts kommen ohne aus, und ein Import daraus wäre ein Hinweis darauf,
 * dass in einer Datendatei Laufzeitlogik gelandet ist.
 */

import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const ROOT = path.resolve(import.meta.dirname, '..', '..')
const ALIAS_PREFIX = '@/'
const ALIAS_ZIEL = path.join(ROOT, 'src')

const ENDUNGEN = ['.ts', '.tsx', '.mts', '.js', '.mjs']

/** `from '…'` und `import '…'` -- der Spezifizierer steht immer in Gruppe 2. */
const SPEZIFIZIERER = /(\bfrom\s*|\bimport\s*)(['"])([^'"]+)\2/g

function aufloesen(spezifizierer, vonDatei) {
  const basis = spezifizierer.startsWith(ALIAS_PREFIX)
    ? path.join(ALIAS_ZIEL, spezifizierer.slice(ALIAS_PREFIX.length))
    : path.resolve(path.dirname(vonDatei), spezifizierer)

  const kandidaten = [
    basis,
    ...ENDUNGEN.map((endung) => basis + endung),
    ...ENDUNGEN.map((endung) => path.join(basis, `index${endung}`)),
  ]

  const treffer = kandidaten.find((kandidat) => {
    try {
      return fs.statSync(kandidat).isFile()
    } catch {
      return false
    }
  })

  if (!treffer) {
    throw new Error(
      `${path.relative(ROOT, vonDatei)} importiert '${spezifizierer}'. Dieser Lader löst nur ` +
        'relative Pfade und den @/-Alias auf. Pakete aus node_modules gehören nicht in eine ' +
        'Datendatei -- entweder den Import entfernen oder das Skript auf einen echten ' +
        'TypeScript-Loader umstellen.'
    )
  }

  return treffer
}

function alsDatenUrl(quelltext) {
  const übersetzt = ts.transpileModule(quelltext, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText

  return `data:text/javascript;base64,${Buffer.from(übersetzt, 'utf8').toString('base64')}`
}

/**
 * Übersetzt eine Datei und alle ihre Importe zu einer einzigen Daten-URL.
 *
 * `bereitsGesehen` bricht Importzyklen ab: Eine Datei, die schon im aktuellen
 * Pfad liegt, würde sonst endlos weiterübersetzt.
 */
function uebersetzen(dateiPfad, cache, bereitsGesehen = new Set()) {
  const gecacht = cache.get(dateiPfad)
  if (gecacht) return gecacht

  if (bereitsGesehen.has(dateiPfad)) {
    throw new Error(
      `Importzyklus über ${path.relative(ROOT, dateiPfad)}. Datenmodule dürfen sich nicht ` +
        'gegenseitig importieren.'
    )
  }

  const quelltext = fs.readFileSync(dateiPfad, 'utf8')
  const pfadMitDieser = new Set(bereitsGesehen).add(dateiPfad)

  const ersetzt = quelltext.replace(SPEZIFIZIERER, (treffer, schluessel, anfuehrung, spezifizierer) => {
    if (!spezifizierer.startsWith('.') && !spezifizierer.startsWith(ALIAS_PREFIX)) {
      return treffer
    }
    const ziel = aufloesen(spezifizierer, dateiPfad)
    return `${schluessel}${anfuehrung}${uebersetzen(ziel, cache, pfadMitDieser)}${anfuehrung}`
  })

  const datenUrl = alsDatenUrl(ersetzt)
  cache.set(dateiPfad, datenUrl)
  return datenUrl
}

export async function loadTsModule(relativerPfad) {
  const vollerPfad = path.join(ROOT, relativerPfad)
  return import(uebersetzen(vollerPfad, new Map()))
}
