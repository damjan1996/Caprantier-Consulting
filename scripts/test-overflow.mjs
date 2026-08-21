#!/usr/bin/env node

// ESM Script - läuft mit: node scripts/test-overflow.mjs
// Verwendet globale playwright Installation via npx

import { exec } from 'child_process'
import { promisify } from 'util'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const execAsync = promisify(exec)

const pages = [
  { path: '/', name: 'Homepage' },
  { path: '/leistungen', name: 'Leistungen' },
  { path: '/leistungen/koeln', name: 'Leistungen-Koeln' },
  { path: '/leistungen/duesseldorf', name: 'Leistungen-Duesseldorf' },
  { path: '/leistungen/berlin', name: 'Leistungen-Berlin' },
  { path: '/leistungen/muenchen', name: 'Leistungen-Muenchen' },
  { path: '/leistungen/hamburg', name: 'Leistungen-Hamburg' },
  { path: '/leistungen/frankfurt', name: 'Leistungen-Frankfurt' },
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

const BASE_URL = process.argv[2] || 'https://carpantier-consulting.de'

// Generiere ein einzelnes Test-Script für npx playwright
function generateTestScript(pageConfig, viewport) {
  return `
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: ${viewport.width}, height: ${viewport.height} },
  });
  const page = await context.newPage();

  try {
    await page.goto('${BASE_URL}${pageConfig.path}', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(500);

    const result = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const hasOverflow = scrollWidth > docWidth;

      let elements = [];
      if (hasOverflow) {
        document.querySelectorAll('*').forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.right > docWidth + 2 || rect.left < -2) {
            const cn = el.className ? String(el.className).split(' ').slice(0,3).join('.') : '';
            elements.push({
              tag: el.tagName,
              id: el.id || '',
              class: cn,
              right: Math.round(rect.right),
              width: Math.round(rect.width)
            });
          }
        });
      }

      return { hasOverflow, scrollWidth, docWidth, elements: elements.slice(0, 8) };
    });

    console.log(JSON.stringify({
      page: '${pageConfig.name}',
      path: '${pageConfig.path}',
      viewport: '${viewport.name}',
      viewportWidth: ${viewport.width},
      ...result
    }));

    await page.screenshot({ path: 'tests/screenshots/${pageConfig.name}-${viewport.name}.png', fullPage: true });

  } catch (e) {
    console.log(JSON.stringify({ page: '${pageConfig.name}', viewport: '${viewport.name}', error: e.message }));
  }

  await browser.close();
})();
`
}

async function runTests() {
  console.log('\n🧪 RESPONSIVE OVERFLOW TESTS')
  console.log('=' .repeat(60))
  console.log(`Base URL: ${BASE_URL}\n`)

  // Erstelle Screenshots-Ordner
  const screenshotDir = join(process.cwd(), 'tests', 'screenshots')
  if (!existsSync(screenshotDir)) {
    mkdirSync(screenshotDir, { recursive: true })
  }

  const issues = []

  for (const viewport of viewports) {
    console.log(`\n📱 ${viewport.name} (${viewport.width}x${viewport.height})`)
    console.log('-'.repeat(50))

    for (const pageConfig of pages) {
      const script = generateTestScript(pageConfig, viewport)
      const scriptPath = join(process.cwd(), 'tests', '_temp_test.cjs')
      writeFileSync(scriptPath, script)

      try {
        const { stdout, stderr } = await execAsync(`npx playwright test --config=playwright.config.ts 2>/dev/null || node "${scriptPath}"`, {
          timeout: 60000,
          cwd: process.cwd()
        })

        if (stdout.trim()) {
          try {
            const result = JSON.parse(stdout.trim())

            if (result.error) {
              console.log(`  ⚠️ ${pageConfig.name}: ${result.error}`)
            } else if (result.hasOverflow) {
              console.log(`  ❌ ${pageConfig.name}: OVERFLOW (${result.scrollWidth}px > ${result.docWidth}px)`)
              result.elements.forEach(el => {
                console.log(`     → ${el.tag}${el.id ? '#'+el.id : ''}${el.class ? '.'+el.class : ''} (right: ${el.right}px)`)
              })
              issues.push(result)
            } else {
              console.log(`  ✅ ${pageConfig.name}`)
            }
          } catch (e) {
            console.log(`  ⚠️ ${pageConfig.name}: Parse error`)
          }
        }
      } catch (e) {
        console.log(`  ⚠️ ${pageConfig.name}: ${e.message?.slice(0, 50)}`)
      }
    }
  }

  // Zusammenfassung
  console.log('\n' + '='.repeat(60))
  console.log('📊 ERGEBNIS')
  console.log('='.repeat(60))

  if (issues.length === 0) {
    console.log('\n✅ Keine horizontalen Overflow-Probleme gefunden!')
  } else {
    console.log(`\n❌ ${issues.length} Overflow-Probleme gefunden:\n`)
    issues.forEach((issue, i) => {
      console.log(`${i + 1}. ${issue.page} @ ${issue.viewport} (${issue.viewportWidth}px)`)
      console.log(`   Overflow: ${issue.scrollWidth - issue.docWidth}px`)
      issue.elements?.slice(0, 3).forEach(el => {
        console.log(`   - ${el.tag}${el.id ? '#'+el.id : ''}${el.class ? '.'+el.class : ''}`)
      })
    })
  }

  console.log('\n')
  return issues
}

runTests().catch(console.error)
