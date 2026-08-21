const { chromium } = require('playwright')

const pages = [
  { path: '/', name: 'Homepage' },
  { path: '/leistungen', name: 'Leistungen' },
  { path: '/leistungen/koeln', name: 'Leistungen-Koeln' },
  { path: '/leistungen/duesseldorf', name: 'Leistungen-Duesseldorf' },
  { path: '/leistungen/berlin', name: 'Leistungen-Berlin' },
  { path: '/kontakt', name: 'Kontakt' },
  { path: '/ueber-uns', name: 'Ueber-uns' },
  { path: '/impressum', name: 'Impressum' },
  { path: '/datenschutz', name: 'Datenschutz' },
]

const viewports = [
  { name: 'Mobile-375', width: 375, height: 667 },
  { name: 'Mobile-414', width: 414, height: 896 },
  { name: 'Tablet-768', width: 768, height: 1024 },
  { name: 'Desktop-1280', width: 1280, height: 800 },
  { name: 'Desktop-1920', width: 1920, height: 1080 },
]

const BASE_URL = process.argv[2] || 'http://localhost:3000'

async function runTests() {
  console.log('\n🧪 RESPONSIVE TESTS STARTEN\n')
  console.log(`Base URL: ${BASE_URL}\n`)

  const browser = await chromium.launch({ headless: true })
  const issues = []

  for (const viewport of viewports) {
    console.log(`\n📱 Testing ${viewport.name} (${viewport.width}x${viewport.height})`)
    console.log('─'.repeat(50))

    for (const pageConfig of pages) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
      })
      const page = await context.newPage()

      try {
        await page.goto(`${BASE_URL}${pageConfig.path}`, {
          waitUntil: 'networkidle',
          timeout: 30000,
        })

        // Warte kurz auf Animationen
        await page.waitForTimeout(500)

        // Check horizontal overflow
        const overflowData = await page.evaluate(() => {
          const docWidth = document.documentElement.clientWidth
          const scrollWidth = document.documentElement.scrollWidth
          const hasOverflow = scrollWidth > docWidth

          let overflowingElements = []
          if (hasOverflow) {
            document.querySelectorAll('*').forEach((el) => {
              const rect = el.getBoundingClientRect()
              if (rect.right > docWidth + 5 || rect.left < -5) {
                const classes = el.className
                  ? `.${el.className.toString().replace(/\s+/g, '.').slice(0, 50)}`
                  : ''
                const id = el.id ? `#${el.id}` : ''
                overflowingElements.push({
                  tag: el.tagName,
                  id: id,
                  classes: classes,
                  right: Math.round(rect.right),
                  left: Math.round(rect.left),
                  width: Math.round(rect.width),
                  docWidth: docWidth,
                })
              }
            })
          }

          return {
            hasOverflow,
            scrollWidth,
            docWidth,
            overflowingElements: overflowingElements.slice(0, 5),
          }
        })

        if (overflowData.hasOverflow) {
          console.log(`  ❌ ${pageConfig.name}: OVERFLOW (scroll: ${overflowData.scrollWidth}px > doc: ${overflowData.docWidth}px)`)

          overflowData.overflowingElements.forEach((el) => {
            console.log(`     → ${el.tag}${el.id}${el.classes}`)
            console.log(`       (right: ${el.right}px, width: ${el.width}px, docWidth: ${el.docWidth}px)`)
          })

          issues.push({
            page: pageConfig.name,
            path: pageConfig.path,
            viewport: viewport.name,
            viewportWidth: viewport.width,
            scrollWidth: overflowData.scrollWidth,
            elements: overflowData.overflowingElements,
          })

          // Screenshot erstellen
          await page.screenshot({
            path: `tests/screenshots/OVERFLOW-${pageConfig.name}-${viewport.name}.png`,
            fullPage: true,
          })
        } else {
          console.log(`  ✅ ${pageConfig.name}: OK`)
        }

        // Normale Screenshots
        await page.screenshot({
          path: `tests/screenshots/${pageConfig.name}-${viewport.name}.png`,
          fullPage: true,
        })

      } catch (error) {
        console.log(`  ⚠️ ${pageConfig.name}: ERROR - ${error.message}`)
      }

      await context.close()
    }
  }

  await browser.close()

  // Zusammenfassung
  console.log('\n' + '═'.repeat(60))
  console.log('📊 ZUSAMMENFASSUNG')
  console.log('═'.repeat(60))

  if (issues.length === 0) {
    console.log('\n✅ Keine Overflow-Probleme gefunden!')
  } else {
    console.log(`\n❌ ${issues.length} Overflow-Probleme gefunden:\n`)

    issues.forEach((issue, i) => {
      console.log(`${i + 1}. ${issue.page} @ ${issue.viewport}`)
      console.log(`   Path: ${issue.path}`)
      console.log(`   Viewport: ${issue.viewportWidth}px, Scroll: ${issue.scrollWidth}px`)
      console.log(`   Elemente:`)
      issue.elements.forEach((el) => {
        console.log(`   - ${el.tag}${el.id}${el.classes}`)
      })
      console.log('')
    })
  }

  console.log('\n📸 Screenshots gespeichert in: tests/screenshots/')
  console.log('\n')

  return issues
}

runTests().catch(console.error)
