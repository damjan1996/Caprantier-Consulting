import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  // Ohne BASE_URL wird ein Entwicklungsserver gestartet. Mit BASE_URL wird
  // gegen einen bereits laufenden Server geprueft -- noetig, um den
  // Produktionsstand zu messen: Tailwind entfernt dort ungenutzte Klassen,
  // das Layout ist also nicht zwingend identisch mit dem Entwicklungsstand.
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'pnpm dev',
        url: 'http://localhost:3000',
        reuseExistingServer: true,
        timeout: 120000,
      },
  outputDir: 'tests/results',
})
