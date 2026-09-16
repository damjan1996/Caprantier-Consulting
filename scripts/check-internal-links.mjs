/**
 * Prüft die interne Verlinkung der Fachbeiträge.
 *
 * §7.1 des Auftrags "Sichtbarkeit" verlangt: **kein verwaister Artikel.**
 * Jeder verbliebene Beitrag muss von mindestens zwei anderen Seiten intern
 * verlinkt sein.
 *
 * Warum das ein eigenes Skript wert ist: Am 10.09.2026 hatten 40 von 52
 * Beiträgen keinen einzigen crawlbaren internen Link -- die Übersicht `/blog`
 * paginierte clientseitig und zeigte im HTML nur zwölf Verweise. Keiner dieser
 * 40 Beiträge war indexiert, alle vier indexierten waren verlinkt. Das ist die
 * am besten belegte Ursache im ganzen Befund, und sie schleicht sich lautlos
 * wieder ein, sobald jemand eine Übersicht umbaut.
 *
 * Gezählt werden:
 * - Verweise aus anderen Beiträgen (Markdown-Links im Text),
 * - Verweise aus dem Quelltext der Seitenvorlagen (`/blog/<slug>` im JSX),
 * - die Übersicht `/blog`, aber nur, wenn sie wirklich alle Beiträge rendert.
 *
 * Seit AP-1.3 (12.09.2026) werden zusaetzlich die **dynamischen Seitenfamilien**
 * geprueft: Stadt- und Branchenseiten koennen genauso verwaisen wie Beitraege,
 * nur faellt es dort spaeter auf, weil sie ueber die Sitemap noch gefunden
 * werden. Sie entstehen aus einer Schleife ueber ein Datenmodul, deshalb sucht
 * der Scan nicht nach einzelnen Adressen, sondern nach der Schleife selbst --
 * `/leistungen/${...}` in einer Vorlage verlinkt alle Staedte auf einmal.
 *
 * Den vollstaendigen Linkgraph vom Startpunkt aus laeuft `check-live.mjs`
 * gegen einen antwortenden Server ab. Dieses Skript hier bleibt statisch, damit
 * es ohne Server in `pnpm verify` laufen kann.
 *
 * Aufruf: node scripts/check-internal-links.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { loadTsModule } from './lib/load-ts-module.mjs'

const ROOT = path.resolve(import.meta.dirname, '..')
const APP_DIR = path.join(ROOT, 'src', 'app')
const COMPONENTS_DIR = path.join(ROOT, 'src', 'components')

const MINDEST_EINGEHENDE_LINKS = 2

const { blogPosts } = await loadTsModule('src/lib/blog.ts')
const { industryPages } = await loadTsModule('src/lib/industries.ts')
const { cities } = await loadTsModule('src/lib/cities.ts')
const slugs = blogPosts.map((post) => post.slug)

/** {slug -> Set<Quelle>} */
const eingehend = new Map(slugs.map((slug) => [slug, new Set()]))

function vermerken(slug, quelle) {
  eingehend.get(slug)?.add(quelle)
}

// 1) Verweise aus anderen Beiträgen
for (const post of blogPosts) {
  for (const treffer of post.content.matchAll(/\]\(\/blog\/([a-z0-9-]+)\)/g)) {
    if (treffer[1] !== post.slug) {
      vermerken(treffer[1], `Beitrag ${post.slug}`)
    }
  }
}

// 2) Verweise aus den Branchenseiten.
//
// `relatedPosts` wird auf /branchen/[branche] als echter Link gerendert. Die
// Slugs stehen aber in einem Datenmodul unter src/lib/, das der Dateiscan
// unten bewusst nicht durchsucht -- dort liegen auch Umleitungsziele und
// Bildzuordnungen, die keine Verlinkung sind.
for (const industry of industryPages) {
  for (const slug of industry.relatedPosts) {
    vermerken(slug, `Branchenseite /branchen/${industry.slug}`)
  }
}

// 3) Verweise aus Seitenvorlagen und Komponenten
function* quelldateien(dir) {
  for (const eintrag of fs.readdirSync(dir, { withFileTypes: true })) {
    const voll = path.join(dir, eintrag.name)
    if (eintrag.isDirectory()) yield* quelldateien(voll)
    else if (/\.(tsx?|ts)$/.test(eintrag.name)) yield voll
  }
}

for (const datei of [...quelldateien(APP_DIR), ...quelldateien(COMPONENTS_DIR)]) {
  const relativ = path.relative(ROOT, datei).split(path.sep).join('/')
  const inhalt = fs.readFileSync(datei, 'utf8')
  for (const treffer of inhalt.matchAll(/\/blog\/([a-z0-9-]+)/g)) {
    vermerken(treffer[1], relativ)
  }
}

// 4) Die Übersicht /blog zählt nur, wenn sie alle Beiträge rendert.
//
// Steht dort wieder eine clientseitige Paginierung mit `slice`, sieht ein
// Crawler nur einen Teil der Liste -- dann darf sie nicht als Verlinkung für
// alle Beiträge gelten.
const grid = fs.readFileSync(path.join(APP_DIR, 'blog', 'components', 'BlogGrid.tsx'), 'utf8')
const uebersichtVollstaendig = !/\.slice\(\s*startIndex/.test(grid) && /filteredPosts\.map\(/.test(grid)

if (uebersichtVollstaendig) {
  for (const slug of slugs) vermerken(slug, 'Übersicht /blog')
}

// 5) Dynamische Seitenfamilien: Stadt- und Branchenseiten.
//
// Diese Adressen entstehen aus einer Schleife ueber ein Datenmodul. Ein Scan
// nach der einzelnen Adresse ginge deshalb ins Leere -- gesucht wird die
// Schleife: Ein Template-Literal wie `/kaltakquise/${stadt.slug}` in einer
// Vorlage verlinkt die ganze Familie auf einmal.
const FAMILIEN = [
  { praefix: '/leistungen', anzahl: cities.length, bezeichnung: 'Stadtseiten (Vertrieb)' },
  { praefix: '/kaltakquise', anzahl: cities.length, bezeichnung: 'Stadtseiten (Kaltakquise)' },
  { praefix: '/branchen', anzahl: industryPages.length, bezeichnung: 'Branchenseiten' },
]

const familienQuellen = new Map(FAMILIEN.map((f) => [f.praefix, new Set()]))

for (const datei of [...quelldateien(APP_DIR), ...quelldateien(COMPONENTS_DIR)]) {
  const relativ = path.relative(ROOT, datei).split(path.sep).join('/')
  const inhalt = fs.readFileSync(datei, 'utf8')

  for (const familie of FAMILIEN) {
    // Zwei zulaessige Formen, beide als Zeichenkette geprueft statt als
    // RegExp: `${` ist in einem RegExp-Literal kein harmloses Zeichenpaar,
    // und beim Umweg ueber `new RegExp` verschluckt die Template-Literal-
    // Ebene die Maskierung. Das hat hier bereits einen Fehlalarm ueber drei
    // vollstaendig verlinkte Familien erzeugt.
    //
    // 1) Schleife: `/praefix/${...}` -- verlinkt die ganze Familie auf einmal.
    if (inhalt.includes(`${familie.praefix}/` + '${')) {
      familienQuellen.get(familie.praefix).add(`${relativ} (Schleife)`)
    }
    // 2) Einzelne, fest notierte Adressen der Familie.
    for (const treffer of inhalt.matchAll(
      new RegExp(`${familie.praefix}/([a-z0-9-]+)`, 'g')
    )) {
      familienQuellen.get(familie.praefix).add(`${relativ} (${treffer[1]})`)
    }
  }
}

const beanstandungen = []

if (!uebersichtVollstaendig) {
  beanstandungen.push(
    'BlogGrid.tsx rendert nicht mehr alle Beiträge. Eine clientseitig ' +
      'paginierte Übersicht liefert im HTML nur die erste Seite -- genau daran ' +
      'sind am 10.09.2026 40 von 52 Beiträgen gescheitert. Entweder alle ' +
      'Beiträge rendern oder echte, serverseitig gerenderte Seitenadressen anlegen.'
  )
}

for (const familie of FAMILIEN) {
  const quellen = familienQuellen.get(familie.praefix)
  if (familie.anzahl > 0 && quellen.size === 0) {
    beanstandungen.push(
      `${familie.praefix}/*: ${familie.anzahl} ${familie.bezeichnung} haben keine ` +
        'erkennbare Verlinkung aus einer Seitenvorlage. Ohne sie haengen sie nur ' +
        'in der Sitemap -- derselbe Fehler wie bei den 40 Beitraegen am 10.09.2026.'
    )
  }
}

for (const slug of slugs) {
  const quellen = eingehend.get(slug)
  if (quellen.size < MINDEST_EINGEHENDE_LINKS) {
    beanstandungen.push(
      `/blog/${slug}: nur ${quellen.size} eingehende(r) interne(r) Link ` +
        `(${[...quellen].join(', ') || 'keiner'}), gefordert sind ${MINDEST_EINGEHENDE_LINKS}.`
    )
  }
}

console.log(`Beiträge: ${slugs.length} · Übersicht rendert alle: ${uebersichtVollstaendig ? 'ja' : 'nein'}`)
for (const familie of FAMILIEN) {
  const quellen = familienQuellen.get(familie.praefix)
  console.log(
    `  ${(familie.praefix + '/*').padEnd(42)} ${String(familie.anzahl).padStart(2)} Seiten, ` +
      `verlinkt aus ${quellen.size} Vorlage(n)`
  )
}
for (const slug of slugs) {
  console.log(`  ${slug.padEnd(42)} ${String(eingehend.get(slug).size).padStart(2)} eingehende Links`)
}

if (beanstandungen.length === 0) {
  console.log('\nVerlinkungsprüfung: keine Beanstandungen.')
  process.exit(0)
}

console.error(`\nVerlinkungsprüfung: ${beanstandungen.length} Beanstandung(en).\n`)
for (const beanstandung of beanstandungen) {
  console.error(`  ${beanstandung}`)
}
process.exit(1)
