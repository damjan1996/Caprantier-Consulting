/**
 * Sammelt den vollständigen Seitenbestand als JSON für den Prüfbericht.
 *
 * Kein Gate, sondern eine Bestandsaufnahme: Jede Adresse der Sitemap wird
 * abgerufen und vermessen -- Titel, Beschreibung, Canonical, Überschrift,
 * strukturierte Daten, Wortzahl, Gewicht. Dazu jede der 43 Umleitungen.
 *
 * Aufruf: node scripts/report-data.mjs http://localhost:3100 > bericht.json
 */

import { createRequire } from 'node:module'
import { loadTsModule } from './lib/load-ts-module.mjs'

const require = createRequire(import.meta.url)
const basis = (process.argv[2] || 'http://localhost:3100').replace(/\/$/, '')

const { blogRedirects } = require('../config/blog-redirects.js')
const { default: sitemap } = await loadTsModule('src/app/sitemap.ts')
const { businessInfo } = await loadTsModule('src/lib/local-seo.ts')
const { blogPosts } = await loadTsModule('src/lib/blog.ts')
const { cities } = await loadTsModule('src/lib/cities.ts')
const { industryPages } = await loadTsModule('src/lib/industries.ts')

const produktion = businessInfo.website.replace(/\/$/, '')

function ersteGruppe(html, muster) {
  const t = html.match(muster)
  return t ? t[1].trim() : null
}
function meta(html, name) {
  return (
    ersteGruppe(html, new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]*content=["']([^"']*)["']`, 'i')) ??
    ersteGruppe(html, new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:name|property)=["']${name}["']`, 'i'))
  )
}
function ent(t) {
  return String(t)
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&auml;/g, 'ä').replace(/&ouml;/g, 'ö').replace(/&uuml;/g, 'ü')
    .replace(/&Auml;/g, 'Ä').replace(/&Ouml;/g, 'Ö').replace(/&Uuml;/g, 'Ü')
    .replace(/&szlig;/g, 'ß').replace(/&nbsp;/g, ' ').replace(/&#8211;/g, '–')
}
function typen(k, s = new Set()) {
  if (Array.isArray(k)) k.forEach((x) => typen(x, s))
  else if (k && typeof k === 'object') {
    const t = k['@type']
    if (typeof t === 'string') s.add(t)
    if (Array.isArray(t)) t.forEach((x) => s.add(x))
    Object.values(k).forEach((v) => typen(v, s))
  }
  return s
}

function familie(pfad) {
  if (pfad === '/') return 'Einstieg'
  if (['/leistungen', '/kaltakquise', '/branchen', '/kontakt'].includes(pfad)) return 'Einstieg'
  if (/^\/leistungen\//.test(pfad)) return 'Stadt · Vertrieb'
  if (/^\/kaltakquise\//.test(pfad)) return 'Stadt · Kaltakquise'
  if (/^\/branchen\//.test(pfad)) return 'Branche'
  if (pfad === '/blog') return 'Fachbeiträge'
  if (/^\/blog\//.test(pfad)) return 'Fachbeiträge'
  if (['/impressum', '/datenschutz', '/ki-transparenz'].includes(pfad)) return 'Rechtliches'
  return 'Übrige'
}

const seiten = []

for (const e of sitemap()) {
  const pfad = e.url.startsWith(produktion) ? e.url.slice(produktion.length) || '/' : e.url
  const antwort = await fetch(`${basis}${pfad === '/' ? '/' : pfad}`, { redirect: 'manual' })
  const html = await antwort.text()
  const kopf = html.slice(0, (html.indexOf('</head>') + 7) || html.length)

  const titel = ent(ersteGruppe(kopf, /<title[^>]*>([\s\S]*?)<\/title>/i) ?? '')
  const beschreibung = ent(meta(kopf, 'description') ?? '')
  const canonical = ersteGruppe(kopf, /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
  const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)]
    .map((t) => ent(t[1].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim())
    .filter(Boolean)

  const ld = []
  for (const t of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { ld.push(JSON.parse(t[1].trim())) } catch { /* im Gate abgedeckt */ }
  }

  const rumpf = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
  const woerter = ent(rumpf).split(/\s+/).filter((w) => w.length > 1).length

  seiten.push({
    pfad,
    familie: familie(pfad),
    status: antwort.status,
    prioritaet: e.priority ?? null,
    frequenz: e.changeFrequency ?? null,
    lastmod: e.lastModified ? String(e.lastModified).slice(0, 10) : null,
    titel,
    titelLaenge: titel.length,
    beschreibungLaenge: beschreibung.length,
    canonicalOk: canonical === `${produktion}${pfad === '/' ? '' : pfad}`,
    h1: h1[0] ?? null,
    h1Anzahl: h1.length,
    ldTypen: [...typen(ld)].sort(),
    ldBloecke: ld.length,
    woerter,
    bytes: Buffer.byteLength(html),
  })
}

const umleitungen = []
for (const r of blogRedirects) {
  const antwort = await fetch(`${basis}/blog/${r.from}`, { redirect: 'manual' })
  umleitungen.push({
    von: `/blog/${r.from}`,
    nach: antwort.headers.get('location') ?? r.to,
    status: antwort.status,
  })
}

console.log(JSON.stringify({
  erhoben: new Date().toISOString(),
  basis,
  produktion,
  bestand: {
    sitemap: seiten.length,
    umleitungen: umleitungen.length,
    beitraege: blogPosts.length,
    staedte: cities.length,
    branchen: industryPages.length,
  },
  seiten,
  umleitungen,
}, null, 2))
