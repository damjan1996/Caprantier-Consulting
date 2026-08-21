/**
 * Erzeugt das Vorschaubild für soziale Netzwerke (public/images/og-image.jpg).
 *
 * Zwei Gründe für dieses Skript:
 *
 * 1. Das Porträt ist KI-generiert. Art. 50 Abs. 4 KI-VO verlangt eine
 *    erkennbare Kennzeichnung. In einer geteilten Vorschau gibt es kein
 *    umgebendes HTML, in dem ein Hinweis stehen könnte — der Hinweis muss
 *    deshalb im Bild selbst stehen.
 * 2. Die Metadaten geben 1200x630 an. Die zuvor ausgelieferte Datei war
 *    1200x1600 und wurde von den Netzwerken beschnitten.
 *
 * Aufruf: node scripts/generate-og-image.mjs
 * Danach das Ergebnis prüfen und mit einchecken.
 */

import fs from 'node:fs'
import path from 'node:path'
import puppeteer from 'puppeteer'

const ROOT = path.resolve(import.meta.dirname, '..')
const PORTRAIT = path.join(ROOT, 'public', 'images', 'nico-portrait-new.jpg')
const TARGET = path.join(ROOT, 'public', 'images', 'og-image.jpg')

const WIDTH = 1200
const HEIGHT = 630

const portraitDataUri = `data:image/jpeg;base64,${fs.readFileSync(PORTRAIT).toString('base64')}`

const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    display: flex;
    font-family: 'Segoe UI', Inter, system-ui, sans-serif;
    background: #0d1b3e;
    color: #ffffff;
    overflow: hidden;
  }
  .text {
    flex: 1 1 58%;
    padding: 64px 56px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }
  .eyebrow {
    font-size: 20px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #7ea6ff;
    font-weight: 600;
  }
  h1 { font-size: 56px; line-height: 1.1; font-weight: 700; }
  h1 em { font-style: normal; color: #7ea6ff; }
  p { font-size: 24px; line-height: 1.45; color: #c7d2e8; }
  .meta {
    margin-top: 8px;
    font-size: 20px;
    color: #9fb4d8;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .dot { width: 6px; height: 6px; border-radius: 50%; background: #1a56db; }
  .portrait { position: relative; flex: 1 1 42%; }
  .portrait img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 22%; }
  .portrait::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, #0d1b3e 0%, rgba(13, 27, 62, 0) 28%);
  }
  .ai-label {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 24px;
    z-index: 2;
    background: rgba(9, 18, 42, 0.92);
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 999px;
    padding: 10px 20px;
    font-size: 19px;
    font-weight: 600;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }
</style>
</head>
<body>
  <div class="text">
    <span class="eyebrow">Carpantier Consulting</span>
    <h1>B2B-Vertrieb,<br><em>der Termine liefert</em></h1>
    <p>Telefonakquise, Leadgenerierung und Terminvereinbarung f&uuml;r B2B-Dienstleister.</p>
    <div class="meta"><span class="dot"></span> K&ouml;ln &mdash; bundesweit t&auml;tig</div>
  </div>
  <div class="portrait">
    <img src="${portraitDataUri}" alt="">
    <span class="ai-label">KI-generiertes Bild</span>
  </div>
</body>
</html>`

const browser = await puppeteer.launch({ headless: true })
try {
  const page = await browser.newPage()
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 })
  await page.setContent(html, { waitUntil: 'load' })
  await page.screenshot({ path: TARGET, type: 'jpeg', quality: 88 })
  console.log(`Geschrieben: ${path.relative(ROOT, TARGET)} (${WIDTH}x${HEIGHT})`)
} finally {
  await browser.close()
}
