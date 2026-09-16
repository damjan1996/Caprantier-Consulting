/**
 * Ladeverhalten und Core Web Vitals gegen einen antwortenden Server.
 *
 * Warum nicht `pagespeed-check.js`: Das Skript fragt Googles PageSpeed-API, und
 * die erreicht keinen lokalen Server. Vor dem Deployment lässt sich die
 * Feldmessung also nicht nachholen -- die Laborwerte hier schon, und sie fangen
 * genau die Fehler ab, die man selbst verursacht: ein zu grosses Bild, ein
 * blockierendes Skript, ein Layout, das nachspringt.
 *
 * Gemessen wird je Adresse im gedrosselten Mobilprofil:
 *
 * - **TTFB** -- Antwortzeit des Servers.
 * - **LCP** (Largest Contentful Paint) -- wann der groesste sichtbare Inhalt
 *   steht. Googles Schwelle fuer "gut" liegt bei 2,5 s.
 * - **CLS** (Cumulative Layout Shift) -- wie stark das Layout nachspringt.
 *   Schwelle 0,1. Der haeufigste Verursacher ist ein Bild ohne feste Groesse.
 * - **Long Tasks** -- Hauptthread-Blockaden ueber 50 ms, der Laborersatz fuer
 *   INP. Ein Wert nahe null heisst: Die Seite reagiert sofort.
 * - **Uebertragungsgewicht** und **DOM-Knoten**.
 *
 * Die Laborwerte sind kein Ersatz fuer Felddaten (CrUX), aber ein Regressions-
 * netz: Wer ein 2-MB-Bild einbaut, sieht es hier sofort.
 *
 * Aufruf:
 *   node scripts/check-performance.mjs                 gegen localhost:3000
 *   node scripts/check-performance.mjs https://carpantier-consulting.de
 */

import { chromium } from '@playwright/test'

const basis = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '')

/** Ein Vertreter je Seitentyp -- mehr misst nur laenger, nicht besser. */
const ADRESSEN = [
  { pfad: '/', name: 'Startseite' },
  { pfad: '/leistungen', name: 'Leistungen' },
  { pfad: '/kaltakquise', name: 'Kaltakquise' },
  { pfad: '/kaltakquise/koeln', name: 'Stadtseite (Kaltakquise)' },
  { pfad: '/leistungen/koeln', name: 'Stadtseite (Vertrieb)' },
  { pfad: '/branchen/personaldienstleister', name: 'Branchenseite' },
  { pfad: '/blog/b2b-kaltakquise-leitfaden', name: 'Fachbeitrag' },
  { pfad: '/kontakt', name: 'Kontakt' },
]

const SCHWELLEN = { lcp: 2500, cls: 0.1, ttfb: 800, longTasks: 4 }

const browser = await chromium.launch()
const ergebnisse = []

for (const adresse of ADRESSEN) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    userAgent:
      'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36',
  })
  const page = await context.newPage()

  // Uebertragungsgewicht mitzaehlen.
  let bytes = 0
  page.on('response', async (antwort) => {
    try {
      const laenge = antwort.headers()['content-length']
      if (laenge) bytes += Number(laenge)
      else {
        const koerper = await antwort.body().catch(() => null)
        if (koerper) bytes += koerper.length
      }
    } catch {
      /* Antworten ohne Koerper ignorieren */
    }
  })

  // Messung vor dem Laden registrieren, sonst entgehen frueh gemeldete Eintraege.
  await page.addInitScript(() => {
    window.__vitals = { lcp: 0, cls: 0, longTasks: 0, longTaskZeit: 0 }
    new PerformanceObserver((liste) => {
      for (const e of liste.getEntries()) window.__vitals.lcp = e.startTime
    }).observe({ type: 'largest-contentful-paint', buffered: true })
    new PerformanceObserver((liste) => {
      for (const e of liste.getEntries()) {
        if (!e.hadRecentInput) window.__vitals.cls += e.value
      }
    }).observe({ type: 'layout-shift', buffered: true })
    new PerformanceObserver((liste) => {
      for (const e of liste.getEntries()) {
        window.__vitals.longTasks++
        window.__vitals.longTaskZeit += e.duration
      }
    }).observe({ type: 'longtask', buffered: true })
  })

  await page.goto(`${basis}${adresse.pfad}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200) // LCP und spaete Verschiebungen einsammeln

  const messung = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0]
    return {
      ...window.__vitals,
      ttfb: nav ? nav.responseStart : 0,
      domKnoten: document.querySelectorAll('*').length,
      bilderOhneMasse: [...document.querySelectorAll('img')].filter(
        (b) => !b.getAttribute('width') && !b.style.aspectRatio && !b.height
      ).length,
    }
  })

  ergebnisse.push({ ...adresse, ...messung, kb: Math.round(bytes / 1024) })
  await context.close()
}

await browser.close()

// --- Ausgabe ---------------------------------------------------------------
const spalte = (t, n) => String(t).padEnd(n)
const zahl = (t, n) => String(t).padStart(n)

console.log(`Performance gegen ${basis} (Mobilprofil 390x844)\n`)
console.log(
  `  ${spalte('Seite', 26)} ${zahl('TTFB', 6)} ${zahl('LCP', 7)} ${zahl('CLS', 6)} ` +
    `${zahl('LongT', 6)} ${zahl('KB', 7)} ${zahl('DOM', 6)}`
)
console.log('  ' + '-'.repeat(72))

const beanstandungen = []

for (const e of ergebnisse) {
  console.log(
    `  ${spalte(e.name, 26)} ${zahl(Math.round(e.ttfb) + 'ms', 6)} ${zahl(Math.round(e.lcp) + 'ms', 7)} ` +
      `${zahl(e.cls.toFixed(3), 6)} ${zahl(e.longTasks, 6)} ${zahl(e.kb, 7)} ${zahl(e.domKnoten, 6)}`
  )

  if (e.lcp > SCHWELLEN.lcp) beanstandungen.push(`${e.pfad}: LCP ${Math.round(e.lcp)} ms (Schwelle ${SCHWELLEN.lcp} ms).`)
  if (e.cls > SCHWELLEN.cls) beanstandungen.push(`${e.pfad}: CLS ${e.cls.toFixed(3)} (Schwelle ${SCHWELLEN.cls}).`)
  if (e.ttfb > SCHWELLEN.ttfb) beanstandungen.push(`${e.pfad}: TTFB ${Math.round(e.ttfb)} ms (Schwelle ${SCHWELLEN.ttfb} ms).`)
  if (e.longTasks > SCHWELLEN.longTasks) {
    beanstandungen.push(
      `${e.pfad}: ${e.longTasks} Long Tasks (${Math.round(e.longTaskZeit)} ms gesamt, Schwelle ${SCHWELLEN.longTasks}).`
    )
  }
  if (e.bilderOhneMasse > 0) {
    beanstandungen.push(`${e.pfad}: ${e.bilderOhneMasse} Bild(er) ohne feste Masse -- haeufigste CLS-Ursache.`)
  }
}

const schnitt = (feld) => ergebnisse.reduce((s, e) => s + e[feld], 0) / ergebnisse.length
console.log(
  `\n  Mittelwert: LCP ${Math.round(schnitt('lcp'))} ms · CLS ${schnitt('cls').toFixed(3)} · ` +
    `TTFB ${Math.round(schnitt('ttfb'))} ms · ${Math.round(schnitt('kb'))} KB`
)

if (beanstandungen.length === 0) {
  console.log('\nPerformance-Prüfung: keine Beanstandungen.')
  process.exit(0)
}

console.error(`\nPerformance-Prüfung: ${beanstandungen.length} Beanstandung(en).\n`)
for (const b of beanstandungen) console.error(`  ${b}`)
process.exit(1)
