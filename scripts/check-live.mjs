/**
 * Live-Prüfung gegen einen laufenden Server.
 *
 * §7.1 des Auftrags "Sichtbarkeit" verlangt zwei Dinge, die sich nur am
 * antwortenden Server prüfen lassen und nicht am Quelltext:
 *
 * - Jede URL der Sitemap liefert 200. Kein Eintrag zeigt auf eine umgeleitete
 *   oder entfernte Seite.
 * - Jeder entfernte Blog-Slug antwortet mit 301 auf ein sinnvolles Ziel --
 *   nicht pauschal auf /blog.
 *
 * `scripts/check-sitemap.mjs` prüft dieselben Zusammenhänge gegen die
 * Datenmodule und läuft deshalb in `pnpm verify` mit. Dieses Skript hier
 * braucht einen Server und gehört daher nicht ins Gate, sondern vor ein
 * Deployment -- lokal gegen `pnpm dev` oder `pnpm start`, nach dem Ausrollen
 * gegen die echte Domain.
 *
 * Aufruf:
 *   node scripts/check-live.mjs                        gegen localhost:3000
 *   node scripts/check-live.mjs https://carpantier-consulting.de
 */

import { createRequire } from 'node:module'
import { loadTsModule } from './lib/load-ts-module.mjs'

const require = createRequire(import.meta.url)
const { blogRedirects } = require('../config/blog-redirects.js')
const { default: sitemap } = await loadTsModule('src/app/sitemap.ts')
const { businessInfo } = await loadTsModule('src/lib/local-seo.ts')

const ziel = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '')
const quelle = businessInfo.website

/** Ein einzelner Abruf ohne Folgen der Umleitung. */
async function abrufen(pfad) {
  const antwort = await fetch(`${ziel}${pfad}`, { redirect: 'manual' })
  return {
    status: antwort.status,
    ziel: antwort.headers.get('location'),
    typ: antwort.headers.get('content-type'),
  }
}

const beanstandungen = []
let geprueft = 0

console.log(`Prüfe gegen ${ziel}\n`)

// --- 1) Sitemap: alles muss 200 liefern -------------------------------
const sitemapPfade = sitemap().map((eintrag) => eintrag.url.slice(quelle.length) || '/')

for (const pfad of sitemapPfade) {
  const { status } = await abrufen(pfad)
  geprueft += 1
  if (status !== 200) {
    beanstandungen.push(`Sitemap: ${pfad} antwortet mit ${status}, erwartet 200.`)
  }
}
console.log(`Sitemap: ${sitemapPfade.length} Adressen geprüft`)

// --- 2) Umleitungen: 301 auf das hinterlegte Ziel ----------------------
for (const { from, to } of blogRedirects) {
  const { status, ziel: weiterleitung } = await abrufen(`/blog/${from}`)
  geprueft += 1

  if (status !== 301) {
    beanstandungen.push(`Umleitung: /blog/${from} antwortet mit ${status}, erwartet 301.`)
    continue
  }

  const erwartet = `/blog/${to}`
  if (!weiterleitung?.endsWith(erwartet)) {
    beanstandungen.push(
      `Umleitung: /blog/${from} zeigt auf ${weiterleitung}, erwartet ${erwartet}.`
    )
  }
  if (weiterleitung?.replace(/^https?:\/\/[^/]+/, '') === '/blog') {
    beanstandungen.push(
      `Umleitung: /blog/${from} zeigt pauschal auf /blog. Google wertet das als Soft-404.`
    )
  }
}
console.log(`Umleitungen: ${blogRedirects.length} geprüft`)

// --- 3) Die beiden Textdateien ----------------------------------------
for (const [pfad, erwarteterTyp] of [
  ['/llms.txt', 'text/plain'],
  ['/robots.txt', 'text/plain'],
]) {
  const { status, typ } = await abrufen(pfad)
  geprueft += 1
  if (status !== 200) {
    beanstandungen.push(`${pfad} antwortet mit ${status}, erwartet 200.`)
  } else if (!typ?.includes(erwarteterTyp)) {
    beanstandungen.push(`${pfad} liefert Content-Type "${typ}", erwartet ${erwarteterTyp}.`)
  }
}
console.log(`Textdateien: 2 geprüft`)

console.log(`\nInsgesamt ${geprueft} Abrufe.`)

if (beanstandungen.length === 0) {
  console.log('Live-Prüfung: keine Beanstandungen.')
  process.exit(0)
}

console.error(`\nLive-Prüfung: ${beanstandungen.length} Beanstandung(en).\n`)
for (const beanstandung of beanstandungen) {
  console.error(`  ${beanstandung}`)
}
process.exit(1)
