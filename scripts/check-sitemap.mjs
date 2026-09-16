/**
 * Prüft die Sitemap gegen den tatsächlichen Seitenbestand.
 *
 * §7.1 des Auftrags "Sichtbarkeit" verlangt: Jede URL der Sitemap liefert 200,
 * kein Eintrag zeigt auf eine umgeleitete oder entfernte Seite. Ein Live-Test
 * gegen die ausgelieferte Domain ist erst nach dem Deployment möglich -- was
 * sich vorher prüfen lässt, ist, ob jede Adresse überhaupt einer Route
 * entspricht. Genau dort entstehen die Fehler: beim Umbenennen eines Slugs
 * oder beim Zusammenführen von Beiträgen.
 *
 * Geprüft wird:
 * - Jede Adresse gehört zu einer bekannten Route (Beitrag, Stadt, Branche
 *   oder statische Seite mit `page.tsx`).
 * - Keine Adresse ist Quelle einer 301 aus `config/blog-redirects.js`.
 * - Keine Adresse doppelt.
 * - `/referenzen` steht nur drin, wenn die Seite indexierbar ist.
 * - `lastModified` steht nur an Adressen, hinter denen ein echtes
 *   Inhaltsdatum liegt (AP-1.4). Siehe Begründung in `src/app/sitemap.ts`.
 *
 * Aufruf: node scripts/check-sitemap.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { loadTsModule } from './lib/load-ts-module.mjs'

const require = createRequire(import.meta.url)
const ROOT = path.resolve(import.meta.dirname, '..')
const APP_DIR = path.join(ROOT, 'src', 'app')

const { blogRedirects } = require('../config/blog-redirects.js')
const { default: sitemap } = await loadTsModule('src/app/sitemap.ts')
const { blogPosts } = await loadTsModule('src/lib/blog.ts')
const { cities } = await loadTsModule('src/lib/cities.ts')
const { industryPages } = await loadTsModule('src/lib/industries.ts')
const { enthaeltBeispiele } = await loadTsModule('src/lib/case-studies.ts')
const { businessInfo } = await loadTsModule('src/lib/local-seo.ts')

const eintraege = sitemap()
const basis = businessInfo.website

const blogSlugs = new Set(blogPosts.map((post) => post.slug))
const stadtSlugs = new Set(cities.map((city) => city.slug))
const brancheSlugs = new Set(industryPages.map((industry) => industry.slug))
const umgeleitet = new Set(blogRedirects.map((r) => `/blog/${r.from}`))

/** Existiert für einen statischen Pfad eine `page.tsx`? */
function hatSeitenvorlage(pfad) {
  const segmente = pfad.split('/').filter(Boolean)
  const verzeichnis = path.join(APP_DIR, ...segmente)
  return fs.existsSync(path.join(verzeichnis, 'page.tsx'))
}

const beanstandungen = []
const gesehen = new Set()

for (const eintrag of eintraege) {
  const url = eintrag.url

  if (!url.startsWith(basis)) {
    beanstandungen.push(`${url}: liegt nicht unter ${basis}.`)
    continue
  }
  if (gesehen.has(url)) {
    beanstandungen.push(`${url}: steht mehrfach in der Sitemap.`)
    continue
  }
  gesehen.add(url)

  const pfad = url.slice(basis.length) || '/'

  if (umgeleitet.has(pfad)) {
    beanstandungen.push(`${pfad}: wird per 301 umgeleitet und gehört nicht in die Sitemap.`)
    continue
  }

  if (pfad === '/') continue

  const blogTreffer = pfad.match(/^\/blog\/([a-z0-9-]+)$/)
  if (blogTreffer) {
    if (!blogSlugs.has(blogTreffer[1])) {
      beanstandungen.push(`${pfad}: kein Beitrag mit diesem Slug.`)
    }
    continue
  }

  const stadtTreffer = pfad.match(/^\/(leistungen|kaltakquise)\/([a-z0-9-]+)$/)
  if (stadtTreffer) {
    if (!stadtSlugs.has(stadtTreffer[2])) {
      beanstandungen.push(`${pfad}: keine Stadt mit diesem Slug.`)
    }
    continue
  }

  const brancheTreffer = pfad.match(/^\/branchen\/([a-z0-9-]+)$/)
  if (brancheTreffer) {
    if (!brancheSlugs.has(brancheTreffer[1])) {
      beanstandungen.push(`${pfad}: keine Branchenseite mit diesem Slug.`)
    }
    continue
  }

  if (!hatSeitenvorlage(pfad)) {
    beanstandungen.push(`${pfad}: keine page.tsx unter src/app${pfad}.`)
  }
}

// AP-1.4: `lastModified` ist eine Tatsachenbehauptung, kein Platzhalter.
// Bis zum 12.09.2026 trug jede Adresse hier das Build-Datum -- Google führt
// genau das unter den Warnzeichen ("changing the date of pages to make them
// seem fresh when the content has not substantially changed"). Erlaubt ist das
// Feld deshalb nur, wo ein gepflegtes Inhaltsdatum dahintersteht: derzeit
// ausschliesslich die Fachbeitraege ueber `post.updatedAt`.
const updatedAtJeSlug = new Map(blogPosts.map((post) => [post.slug, post.updatedAt]))

for (const eintrag of eintraege) {
  if (eintrag.lastModified === undefined) continue

  const pfad = eintrag.url.startsWith(basis) ? eintrag.url.slice(basis.length) || '/' : eintrag.url
  const blogTreffer = pfad.match(/^\/blog\/([a-z0-9-]+)$/)

  if (!blogTreffer) {
    beanstandungen.push(
      `${pfad}: traegt ein lastModified, obwohl kein echtes Inhaltsdatum dahintersteht. ` +
        'Feld weglassen oder ein gepflegtes Datum im Datenmodul ergaenzen.'
    )
    continue
  }

  const erwartet = updatedAtJeSlug.get(blogTreffer[1])
  const gesetzt =
    eintrag.lastModified instanceof Date
      ? eintrag.lastModified.toISOString()
      : String(eintrag.lastModified)

  if (erwartet !== undefined && gesetzt !== String(erwartet)) {
    beanstandungen.push(
      `${pfad}: lastModified ist "${gesetzt}", im Beitrag steht aber "${erwartet}".`
    )
  }
}

// `/referenzen` darf nur in die Sitemap, wenn die Seite auch indexierbar ist.
const referenzenDrin = gesehen.has(`${basis}/referenzen`)
if (referenzenDrin && enthaeltBeispiele()) {
  beanstandungen.push(
    '/referenzen steht in der Sitemap, obwohl die Seite wegen eines ' +
      'Blindmusters auf noindex steht. Eine Adresse anzubieten und gleichzeitig ' +
      'zu verbieten, ist ein Widerspruch im eigenen Signal.'
  )
}

// Jeder Beitrag und jede Stadt gehört auch tatsächlich hinein.
for (const slug of blogSlugs) {
  if (!gesehen.has(`${basis}/blog/${slug}`)) {
    beanstandungen.push(`/blog/${slug}: fehlt in der Sitemap.`)
  }
}
for (const slug of stadtSlugs) {
  for (const familie of ['leistungen', 'kaltakquise']) {
    if (!gesehen.has(`${basis}/${familie}/${slug}`)) {
      beanstandungen.push(`/${familie}/${slug}: fehlt in der Sitemap.`)
    }
  }
}
for (const slug of brancheSlugs) {
  if (!gesehen.has(`${basis}/branchen/${slug}`)) {
    beanstandungen.push(`/branchen/${slug}: fehlt in der Sitemap.`)
  }
}

const mitDatum = eintraege.filter((e) => e.lastModified !== undefined).length

console.log(
  `Sitemap: ${eintraege.length} Adressen · ${mitDatum} mit lastModified · ${blogSlugs.size} Beiträge · ` +
    `${stadtSlugs.size} Städte x 2 Familien · ${brancheSlugs.size} Branchenseiten · ` +
    `${umgeleitet.size} Umleitungen geprüft`
)

if (beanstandungen.length === 0) {
  console.log('Sitemap-Prüfung: keine Beanstandungen.')
  process.exit(0)
}

console.error(`\nSitemap-Prüfung: ${beanstandungen.length} Beanstandung(en).\n`)
for (const beanstandung of beanstandungen) {
  console.error(`  ${beanstandung}`)
}
process.exit(1)
