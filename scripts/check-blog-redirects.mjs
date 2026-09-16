/**
 * Prüft die Umleitungen der zusammengeführten Blogbeiträge.
 *
 * Vier Fehler sollen hier auffallen, bevor sie live gehen:
 *
 * 1. Eine Umleitung zeigt auf einen Beitrag, den es nicht (mehr) gibt.
 *    Ergebnis wäre eine 301 auf eine 404 -- schlechter als gar keine Umleitung.
 * 2. Ein aktiver Beitrag steht als Umleitungsquelle. Die Umleitung greift dann
 *    vor der Seite, und der Beitrag ist unerreichbar.
 * 3. Eine Kette: Ziel A leitet weiter auf B. Jeder Sprung kostet Zeit, und
 *    Google folgt Ketten nur begrenzt.
 * 4. Ein Beitrag aus der Sitemap ist zugleich umgeleitet -- damit stünde eine
 *    umgeleitete Adresse in der Sitemap, was §7.1 des Auftrags ausschließt.
 *
 * Aufruf: node scripts/check-blog-redirects.mjs
 */

import { createRequire } from 'node:module'
import { loadTsModule } from './lib/load-ts-module.mjs'

const require = createRequire(import.meta.url)
const { blogRedirects } = require('../config/blog-redirects.js')
const { blogPosts } = await loadTsModule('src/lib/blog.ts')

const aktiveSlugs = new Set(blogPosts.map((post) => post.slug))
const quellen = blogRedirects.map(({ from }) => from)
const beanstandungen = []

for (const { from, to } of blogRedirects) {
  if (!aktiveSlugs.has(to)) {
    beanstandungen.push(`/blog/${from} leitet auf /blog/${to} -- diesen Beitrag gibt es nicht.`)
  }
  if (aktiveSlugs.has(from)) {
    beanstandungen.push(`/blog/${from} ist ein aktiver Beitrag und darf nicht umgeleitet werden.`)
  }
  if (quellen.includes(to)) {
    beanstandungen.push(`/blog/${from} -> /blog/${to} bildet eine Kette; ${to} wird selbst umgeleitet.`)
  }
  if (from === to) {
    beanstandungen.push(`/blog/${from} leitet auf sich selbst.`)
  }
}

const doppelt = quellen.filter((slug, index) => quellen.indexOf(slug) !== index)
for (const slug of new Set(doppelt)) {
  beanstandungen.push(`/blog/${slug} hat mehr als eine Umleitung.`)
}

console.log(
  `Umleitungen: ${blogRedirects.length} · aktive Beiträge: ${aktiveSlugs.size} · ` +
    `Ziele: ${new Set(blogRedirects.map((r) => r.to)).size}`
)

if (beanstandungen.length === 0) {
  console.log('Umleitungsprüfung: keine Beanstandungen.')
  process.exit(0)
}

console.error(`\nUmleitungsprüfung: ${beanstandungen.length} Beanstandung(en).\n`)
for (const beanstandung of beanstandungen) {
  console.error(`  ${beanstandung}`)
}
process.exit(1)
