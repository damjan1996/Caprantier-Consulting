/**
 * Prüft, ob die tragenden Inhalte im ausgelieferten HTML stehen.
 *
 * Hintergrund (AP-1.2 der Gesamt-Roadmap): Die drei wichtigsten Abruf-Bots für
 * generative Antworten -- ClaudeBot, GPTBot und PerplexityBot -- **führen kein
 * JavaScript aus**. Was erst im Browser gerendert wird, existiert für sie
 * nicht. Bei Next.js ist das der eine technische Punkt, der jede Inhaltsarbeit
 * stillschweigend wertlos machen kann: Die Seite sieht im Browser vollständig
 * aus, liefert dem Bot aber eine leere Hülle.
 *
 * Deshalb wird hier nicht geprüft, ob die Seite "funktioniert", sondern ob
 * **bestimmte, inhaltlich tragende Textstellen** im rohen Server-HTML stehen --
 * also ohne eine Zeile JavaScript auszuführen.
 *
 * Die Prüftexte werden **aus den Datenmodulen gezogen, nicht abgetippt**. Ein
 * abgetippter Prüftext veraltet beim ersten Redigieren und der Test wird
 * stillschweigend wertlos. Gesucht wird jeweils ein Ausschnitt aus der Mitte
 * eines echten Absatzes -- Überschriften allein genügen nicht, weil die oft
 * auch in einer leeren Hülle stehen.
 *
 * **Seit dem 01.10.2026 zählt nur, was in `<main>` steht.** Vorher reichte es,
 * wenn der Text irgendwo im HTML vorkam -- und genau so ist durchgerutscht,
 * dass ein `src/app/loading.tsx` jede Seite hinter eine Suspense-Grenze
 * gelegt hatte: In `<main>` stand nur „Wird geladen…“, der Inhalt samt h1 lag
 * als `<div hidden id="S:0">` hinter der Fußzeile und wurde erst per
 * JavaScript eingesetzt. Diese Prüfung meldete grün, weil der Text ja im HTML
 * stand. Textauszieher wie Readability verwerfen `hidden` vollständig.
 *
 * Das Skript braucht einen antwortenden Server und gehört deshalb nicht in
 * `pnpm verify`, sondern vor das Deployment -- wie `check-live.mjs`.
 *
 * Aufruf:
 *   node scripts/check-ssr.mjs                        gegen localhost:3000
 *   node scripts/check-ssr.mjs https://carpantier-consulting.de
 */

import { loadTsModule } from './lib/load-ts-module.mjs'

const basis = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '')

const { cities } = await loadTsModule('src/content/cities.ts')
const { industryPages } = await loadTsModule('src/content/industries.ts')
const { blogPosts } = await loadTsModule('src/lib/blog.ts')
const { cityAcquisition } = await loadTsModule('src/content/city-acquisition.ts')
const { priceModels, PREISE_FREIGEGEBEN } = await loadTsModule('src/content/pricing.ts')
const { homeFaqs } = await loadTsModule('src/content/home.ts')
const { businessInfo } = await loadTsModule('src/content/local-seo.ts')
const { default: sitemap } = await loadTsModule('src/app/sitemap.ts')

/**
 * Schneidet einen Prüfausschnitt aus einem längeren Text.
 *
 * Nicht der Anfang: Der steht oft zusätzlich in einer Meta-Beschreibung und
 * wäre dann auch in einer leeren Hülle zu finden. Genommen wird ein Stück aus
 * der Mitte, lang genug, um eindeutig zu sein.
 */
function ausschnitt(text, laenge = 60) {
  const sauber = String(text).replace(/\s+/g, ' ').trim()
  if (sauber.length <= laenge) return sauber
  const start = Math.floor(sauber.length / 3)
  return sauber.slice(start, start + laenge).trim()
}

/** HTML-Entities zurückübersetzen und Markup entfernen. */
function nurText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&auml;/g, 'ä').replace(/&ouml;/g, 'ö').replace(/&uuml;/g, 'ü')
    .replace(/&Auml;/g, 'Ä').replace(/&Ouml;/g, 'Ö').replace(/&Uuml;/g, 'Ü')
    .replace(/&szlig;/g, 'ß').replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
}

/**
 * Das HTML zwischen `<main …>` und `</main>`. Gestreamte Teilstücke
 * (`<div hidden id="S:…">`) stehen hinter `</main>` und zählen damit nicht.
 */
function hauptinhalt(html) {
  const start = html.search(/<main[\s>]/i)
  const ende = html.lastIndexOf('</main>')
  return start >= 0 && ende > start ? html.slice(start, ende) : ''
}

/** Was auf welcher Adresse im HTML stehen muss. */
const pruefungen = []

// Die Startseite: eine FAQ-Antwort aus dem Datenmodul, das auch das Markup speist.
const startseitenAntwort = homeFaqs?.find((faq) => faq.answer.length > 120)?.answer
if (startseitenAntwort) {
  pruefungen.push({
    pfad: '/',
    erwartet: [{ was: 'FAQ-Antwort', text: ausschnitt(startseitenAntwort) }],
  })
}

// Eine Stadtseite je Familie -- Köln, weil dort der längste eigene Ortstext liegt.
const koeln = cities.find((c) => c.slug === 'koeln')
const koelnAkquise = cityAcquisition?.koeln ?? cityAcquisition?.['koeln']

if (koeln) {
  pruefungen.push({
    pfad: `/leistungen/${koeln.slug}`,
    erwartet: [
      { was: 'Ortstext (regionalText)', text: ausschnitt(koeln.regionalText) },
    ],
  })
}

if (koelnAkquise) {
  const felder = ['marktText', 'zielgruppenText']
    .filter((f) => typeof koelnAkquise[f] === 'string' && koelnAkquise[f].length > 80)
    .map((f) => ({ was: `Ortstext (${f})`, text: ausschnitt(koelnAkquise[f]) }))

  pruefungen.push({ pfad: `/kaltakquise/${koeln.slug}`, erwartet: felder })
}

// Beide Branchenseiten: Fliesstext und eine FAQ-Antwort.
for (const branche of industryPages) {
  const erwartet = []

  if (typeof branche.intro === 'string' && branche.intro.length > 120) {
    erwartet.push({ was: 'Einleitung', text: ausschnitt(branche.intro) })
  }

  const ersterSchmerz = branche.painPoints?.[0]?.text
  if (ersterSchmerz) erwartet.push({ was: 'Schmerzpunkt 1', text: ausschnitt(ersterSchmerz) })

  const ersteAntwort = branche.faqs?.[0]?.answer
  if (ersteAntwort) erwartet.push({ was: 'FAQ-Antwort 1', text: ausschnitt(ersteAntwort) })

  if (erwartet.length > 0) {
    pruefungen.push({ pfad: `/branchen/${branche.slug}`, erwartet })
  }
}

// Ein Fachbeitrag: Fliesstext aus der Mitte des Artikels.
//
// Der Prueftext muss aus **reiner Prosa** stammen. Markdown-Konstrukte
// ueberleben das Rendern nicht wortgleich und erzeugen sonst Fehlalarme:
// Eine Tabellenzeile "07:00-08:00 Uhr | vor Schichtbeginn" wird zu <td>-Zellen,
// ein Link "[Text](https://...)" verliert die Adresse aus dem Textfluss. Beides
// hat hier bereits einen Fehlalarm ueber eine Seite erzeugt, die vollstaendig
// serverseitig gerendert war.
function prosaZeile(markdown) {
  return String(markdown)
    .split(String.fromCharCode(10))
    .map((zeile) => zeile.trim())
    .find(
      (zeile) =>
        zeile.length > 140 &&
        !zeile.includes('|') &&      // Tabelle
        !zeile.includes('](') &&     // Link
        !zeile.startsWith('#') &&
        !zeile.startsWith('-') &&
        !zeile.startsWith('>') &&
        !zeile.startsWith('!')
    )
}

const beitrag = blogPosts[0]
const prosa = beitrag && prosaZeile(beitrag.content)
if (prosa) {
  const rumpf = prosa.replace(/[*_`]/g, '')
  pruefungen.push({
    pfad: `/blog/${beitrag.slug}`,
    erwartet: [{ was: 'Artikeltext', text: ausschnitt(rumpf, 50) }],
  })
}

// Preise -- nur wenn sie freigegeben sind. Vorher gibt es nichts zu finden.
if (PREISE_FREIGEGEBEN && Array.isArray(priceModels)) {
  const mitBetrag = priceModels.find((m) => m.preis != null)
  if (mitBetrag) {
    pruefungen.push({
      pfad: '/leistungen',
      erwartet: [{ was: 'Preisangabe', text: String(mitBetrag.preis) }],
    })
  }
}

// --- Abrufen ---------------------------------------------------------------
// Mit der Kennung eines Bots, der kein JavaScript ausführt. Manche Setups
// liefern Bots anderes HTML -- genau das soll hier auffallen.
const KOPF = {
  'User-Agent': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot',
  Accept: 'text/html',
}

const beanstandungen = []
let geprueft = 0

for (const pruefung of pruefungen) {
  const url = `${basis}${pruefung.pfad}`
  let html

  try {
    const antwort = await fetch(url, { headers: KOPF, redirect: 'manual' })
    if (antwort.status !== 200) {
      beanstandungen.push(`${pruefung.pfad}: Statuscode ${antwort.status}, erwartet 200.`)
      continue
    }
    html = await antwort.text()
  } catch (fehler) {
    beanstandungen.push(`${pruefung.pfad}: nicht erreichbar (${fehler.message}).`)
    continue
  }

  if (/<div hidden id="S:\d+"/.test(html)) {
    beanstandungen.push(
      `${pruefung.pfad}: Inhalt wird gestreamt (<div hidden id="S:…"> hinter </main>).\n` +
        '      Meist liegt ein loading.tsx über der Seite. Ohne JavaScript steht in <main> ' +
        'dann nur der Platzhalter.'
    )
  }

  const text = nurText(hauptinhalt(html))

  for (const { was, text: erwartet } of pruefung.erwartet) {
    geprueft++
    if (!text.includes(erwartet)) {
      beanstandungen.push(
        `${pruefung.pfad}: ${was} fehlt im Server-HTML.\n` +
          `      gesucht: "${erwartet}"\n` +
          '      Der Text steht nicht in <main> -- er wird erst im Browser gerendert ' +
          'oder eingesetzt. Fuer ClaudeBot, GPTBot und PerplexityBot existiert er damit nicht.'
      )
    }
  }
}

// --- Alle Adressen der Sitemap: kein gestreamter Inhalt ----------------------
// Die Stichproben oben prüfen Text, dieser Durchlauf nur das Muster — dafür auf
// jeder Adresse. So ist am 01.10.2026 aufgefallen, dass auch Impressum,
// Datenschutz und die Branchenseiten Teile als `<div hidden>` nachreichten.
const produktion = businessInfo.website.replace(/\/$/, '')
const geprueftePfade = new Set(pruefungen.map((pruefung) => pruefung.pfad))
let durchlaufen = 0

for (const { url } of sitemap()) {
  const pfad = url.startsWith(produktion) ? url.slice(produktion.length) || '/' : url
  if (geprueftePfade.has(pfad)) continue
  try {
    const antwort = await fetch(`${basis}${pfad}`, { headers: KOPF, redirect: 'manual' })
    durchlaufen++
    // Ohne diese Zeile galt eine 404 oder eine leere Umleitung als „nicht gestreamt“.
    if (antwort.status !== 200) {
      beanstandungen.push(`${pfad}: Statuscode ${antwort.status}, erwartet 200.`)
      continue
    }
    if (/<div hidden id="S:\d+"/.test(await antwort.text())) {
      beanstandungen.push(`${pfad}: Inhalt wird gestreamt (<div hidden id="S:…"> hinter </main>).`)
    }
  } catch (fehler) {
    beanstandungen.push(`${pfad}: nicht erreichbar (${fehler.message}).`)
  }
}

console.log(
  `SSR-Prüfung gegen ${basis}: ${pruefungen.length} Adressen · ${geprueft} Textstellen geprüft · ` +
    `${durchlaufen} weitere Adressen auf gestreamten Inhalt`
)

if (beanstandungen.length === 0) {
  console.log('SSR-Prüfung: keine Beanstandungen.')
  process.exit(0)
}

console.error(`\nSSR-Prüfung: ${beanstandungen.length} Beanstandung(en).\n`)
for (const beanstandung of beanstandungen) {
  console.error(`  ${beanstandung}\n`)
}
process.exit(1)
