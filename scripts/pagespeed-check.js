#!/usr/bin/env node

/**
 * PageSpeed Insights API Check Script
 * Prüft die Performance einer Domain mit der Google PageSpeed Insights API
 */

const API_KEY = 'AIzaSyA4qo0LfLy_ps-SyTQTQpFrFRjDnAUn_K4';
const API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

// Standard-URL zum Testen (kann als Argument übergeben werden)
const DEFAULT_URL = 'https://caprantier-consulting.vercel.app';

async function runPageSpeedTest(url, strategy = 'mobile') {
  const params = new URLSearchParams({
    url: url,
    key: API_KEY,
    strategy: strategy,
    category: ['performance', 'accessibility', 'best-practices', 'seo'].join('&category=')
  });

  // Korrektur für multiple categories
  const apiUrl = `${API_URL}?url=${encodeURIComponent(url)}&key=${API_KEY}&strategy=${strategy}&category=performance&category=accessibility&category=best-practices&category=seo`;

  console.log(`\n🔍 Analysiere: ${url}`);
  console.log(`📱 Strategie: ${strategy.toUpperCase()}`);
  console.log('⏳ Bitte warten...\n');

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Fehler beim API-Aufruf:', error.message);
    throw error;
  }
}

function formatScore(score) {
  const percentage = Math.round(score * 100);
  let emoji = '🔴';
  if (percentage >= 90) emoji = '🟢';
  else if (percentage >= 50) emoji = '🟡';
  return `${emoji} ${percentage}/100`;
}

function displayResults(data) {
  const lighthouse = data.lighthouseResult;
  const categories = lighthouse.categories;

  console.log('═'.repeat(50));
  console.log('📊 PAGESPEED INSIGHTS ERGEBNISSE');
  console.log('═'.repeat(50));
  console.log(`🌐 URL: ${lighthouse.finalUrl}`);
  console.log(`📅 Zeitpunkt: ${new Date(lighthouse.fetchTime).toLocaleString('de-DE')}`);
  console.log('─'.repeat(50));

  // Kategorien anzeigen
  console.log('\n📈 SCORES:\n');

  if (categories.performance) {
    console.log(`  Performance:     ${formatScore(categories.performance.score)}`);
  }
  if (categories.accessibility) {
    console.log(`  Barrierefreiheit: ${formatScore(categories.accessibility.score)}`);
  }
  if (categories['best-practices']) {
    console.log(`  Best Practices:  ${formatScore(categories['best-practices'].score)}`);
  }
  if (categories.seo) {
    console.log(`  SEO:             ${formatScore(categories.seo.score)}`);
  }

  // Core Web Vitals anzeigen
  const audits = lighthouse.audits;
  console.log('\n⚡ CORE WEB VITALS:\n');

  if (audits['largest-contentful-paint']) {
    const lcp = audits['largest-contentful-paint'];
    console.log(`  LCP (Largest Contentful Paint): ${lcp.displayValue}`);
  }
  if (audits['first-contentful-paint']) {
    const fcp = audits['first-contentful-paint'];
    console.log(`  FCP (First Contentful Paint):   ${fcp.displayValue}`);
  }
  if (audits['total-blocking-time']) {
    const tbt = audits['total-blocking-time'];
    console.log(`  TBT (Total Blocking Time):      ${tbt.displayValue}`);
  }
  if (audits['cumulative-layout-shift']) {
    const cls = audits['cumulative-layout-shift'];
    console.log(`  CLS (Cumulative Layout Shift):  ${cls.displayValue}`);
  }
  if (audits['speed-index']) {
    const si = audits['speed-index'];
    console.log(`  Speed Index:                    ${si.displayValue}`);
  }

  // Verbesserungsvorschläge
  console.log('\n💡 TOP VERBESSERUNGSVORSCHLÄGE:\n');

  const opportunities = Object.values(audits)
    .filter(audit => audit.details?.type === 'opportunity' && audit.score !== null && audit.score < 1)
    .sort((a, b) => (a.score || 0) - (b.score || 0))
    .slice(0, 5);

  if (opportunities.length > 0) {
    opportunities.forEach((opp, index) => {
      console.log(`  ${index + 1}. ${opp.title}`);
      if (opp.displayValue) {
        console.log(`     → Einsparung: ${opp.displayValue}`);
      }
    });
  } else {
    console.log('  Keine signifikanten Verbesserungsvorschläge gefunden.');
  }

  console.log('\n' + '═'.repeat(50));
}

async function main() {
  const args = process.argv.slice(2);
  const url = args[0] || DEFAULT_URL;
  const strategy = args[1] || 'mobile'; // 'mobile' oder 'desktop'

  // URL validieren
  try {
    new URL(url);
  } catch {
    console.error('❌ Ungültige URL. Bitte eine vollständige URL angeben (z.B. https://example.com)');
    process.exit(1);
  }

  try {
    // Mobile Test
    if (strategy === 'both' || strategy === 'mobile') {
      const mobileData = await runPageSpeedTest(url, 'mobile');
      displayResults(mobileData);
    }

    // Desktop Test
    if (strategy === 'both' || strategy === 'desktop') {
      const desktopData = await runPageSpeedTest(url, 'desktop');
      displayResults(desktopData);
    }

  } catch (error) {
    console.error('\n❌ Test fehlgeschlagen:', error.message);
    process.exit(1);
  }
}

// Script ausführen
main();
