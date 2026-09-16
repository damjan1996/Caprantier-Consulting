import { test, expect } from '@playwright/test'

// Alle Seiten die getestet werden sollen
const pages = [
  // Einstiege
  { path: '/', name: 'Homepage' },
  { path: '/leistungen', name: 'Leistungen' },
  { path: '/kaltakquise', name: 'Kaltakquise' },
  { path: '/branchen', name: 'Branchen' },
  // Stadtfamilie 1 -- /leistungen/[stadt]
  { path: '/leistungen/koeln', name: 'Leistungen Köln' },
  { path: '/leistungen/duesseldorf', name: 'Leistungen Düsseldorf' },
  { path: '/leistungen/berlin', name: 'Leistungen Berlin' },
  { path: '/leistungen/muenchen', name: 'Leistungen München' },
  { path: '/leistungen/hamburg', name: 'Leistungen Hamburg' },
  { path: '/leistungen/frankfurt', name: 'Leistungen Frankfurt' },
  // Stadtfamilie 2 -- /kaltakquise/[stadt], seit 12.09.2026
  { path: '/kaltakquise/koeln', name: 'Kaltakquise Köln' },
  { path: '/kaltakquise/muenchen', name: 'Kaltakquise München' },
  { path: '/kaltakquise/hamburg', name: 'Kaltakquise Hamburg' },
  // Branchenseiten -- Tabellen und Aufzaehlungen, der haeufigste Overflow-Ort
  { path: '/branchen/personaldienstleister', name: 'Branche Personaldienstleister' },
  { path: '/branchen/it-systemhaeuser', name: 'Branche IT-Systemhäuser' },
  // Inhalte
  { path: '/blog', name: 'Blog' },
  { path: '/blog/b2b-kaltakquise-leitfaden', name: 'Blogbeitrag' },
  { path: '/wissen', name: 'Wissen' },
  { path: '/wissen/videos', name: 'Wissen Videos' },
  { path: '/glossar', name: 'Glossar' },
  { path: '/referenzen', name: 'Referenzen' },
  // Uebrige
  { path: '/kontakt', name: 'Kontakt' },
  { path: '/ueber-uns', name: 'Über uns' },
  { path: '/impressum', name: 'Impressum' },
  { path: '/datenschutz', name: 'Datenschutz' },
  { path: '/ki-transparenz', name: 'KI-Transparenz' },
]

// Viewport-Konfigurationen
const viewports = [
  { name: 'Mobile-Small', width: 320, height: 568 },
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Mobile-Large', width: 414, height: 896 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Tablet-Landscape', width: 1024, height: 768 },
  { name: 'Desktop', width: 1280, height: 800 },
  { name: 'Desktop-Large', width: 1920, height: 1080 },
]

// Gegen die Produktion pruefbar: BASE_URL=http://localhost:3100 pnpm exec playwright test
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000'

// Test für horizontales Overflow-Problem
test.describe('Horizontal Overflow Tests', () => {
  for (const viewport of viewports) {
    for (const page of pages) {
      test(`${page.name} - ${viewport.name} (${viewport.width}x${viewport.height}) - No horizontal scroll`, async ({ browser }) => {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
        })
        const browserPage = await context.newPage()

        await browserPage.goto(`${BASE_URL}${page.path}`, { waitUntil: 'networkidle' })

        // Prüfe auf horizontales Scrolling
        const hasHorizontalScroll = await browserPage.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth
        })

        // Wenn Overflow gefunden, identifiziere das Element
        if (hasHorizontalScroll) {
          const overflowingElements = await browserPage.evaluate(() => {
            const docWidth = document.documentElement.clientWidth
            const elements: string[] = []

            document.querySelectorAll('*').forEach((el) => {
              const rect = el.getBoundingClientRect()
              if (rect.right > docWidth || rect.left < 0) {
                const classes = el.className ? `.${el.className.toString().split(' ').join('.')}` : ''
                const id = el.id ? `#${el.id}` : ''
                elements.push(`${el.tagName}${id}${classes} (right: ${rect.right}, left: ${rect.left}, width: ${rect.width})`)
              }
            })

            return elements.slice(0, 10) // Nur erste 10
          })

          console.log(`\n❌ OVERFLOW auf ${page.name} (${viewport.name}):`)
          console.log('Elemente die überlaufen:')
          overflowingElements.forEach(el => console.log(`  - ${el}`))
        }

        // Screenshot erstellen bei Overflow
        if (hasHorizontalScroll) {
          await browserPage.screenshot({
            path: `tests/screenshots/overflow-${page.name.toLowerCase().replace(/\s+/g, '-')}-${viewport.name.toLowerCase()}.png`,
            fullPage: true,
          })
        }

        expect(hasHorizontalScroll, `Horizontal overflow detected on ${page.name} at ${viewport.name}`).toBe(false)

        await context.close()
      })
    }
  }
})

// Visuelle Tests - Screenshots für alle Viewports
test.describe('Visual Screenshots', () => {
  for (const viewport of viewports) {
    for (const page of pages) {
      test(`Screenshot: ${page.name} - ${viewport.name}`, async ({ browser }) => {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
        })
        const browserPage = await context.newPage()

        await browserPage.goto(`${BASE_URL}${page.path}`, { waitUntil: 'networkidle' })

        // Warte auf Animationen
        await browserPage.waitForTimeout(500)

        await browserPage.screenshot({
          path: `tests/screenshots/${page.name.toLowerCase().replace(/\s+/g, '-')}-${viewport.name.toLowerCase()}.png`,
          fullPage: true,
        })

        await context.close()
      })
    }
  }
})

// UI-Element Tests
test.describe('UI Elements', () => {
  test('Header ist auf Mobile korrekt', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
    })
    const page = await context.newPage()
    await page.goto(BASE_URL, { waitUntil: 'networkidle' })


    // Header sollte nicht überlaufen
    const header = page.locator('header')
    const headerBox = await header.boundingBox()
    expect(headerBox?.width).toBeLessThanOrEqual(375)

    await context.close()
  })

  test('Buttons sind auf Mobile touch-freundlich', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
    })
    const page = await context.newPage()
    await page.goto(BASE_URL, { waitUntil: 'networkidle' })

    // Alle Buttons prüfen (min 44px für Touch)
    const buttons = await page.locator('button, a[href]').all()

    for (const button of buttons.slice(0, 20)) { // Erste 20 prüfen
      const box = await button.boundingBox()
      if (box) {
        // Touch targets sollten mindestens 44x44 sein
        if (box.height < 44 || box.width < 44) {
          const text = await button.textContent()
          console.log(`⚠️ Button zu klein: "${text?.trim()}" (${box.width}x${box.height})`)
        }
      }
    }

    await context.close()
  })

  test('Text ist auf Mobile lesbar (Font-Größe)', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
    })
    const page = await context.newPage()
    await page.goto(BASE_URL, { waitUntil: 'networkidle' })

    // Prüfe Mindest-Fontgröße (12px)
    const smallTexts = await page.evaluate(() => {
      const results: string[] = []
      document.querySelectorAll('p, span, a, li, td, th').forEach((el) => {
        const style = window.getComputedStyle(el)
        const fontSize = parseFloat(style.fontSize)
        if (fontSize < 12 && el.textContent?.trim()) {
          results.push(`${el.tagName}: "${el.textContent?.trim().slice(0, 30)}" - ${fontSize}px`)
        }
      })
      return results.slice(0, 10)
    })

    if (smallTexts.length > 0) {
      console.log('⚠️ Text zu klein:')
      smallTexts.forEach(t => console.log(`  - ${t}`))
    }

    await context.close()
  })
})

// Performance und Ladezeit
test.describe('Performance', () => {
  test('Seite lädt in unter 3 Sekunden', async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    const startTime = Date.now()
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' })
    const loadTime = Date.now() - startTime

    console.log(`⏱️ Ladezeit: ${loadTime}ms`)
    expect(loadTime).toBeLessThan(3000)

    await context.close()
  })
})
