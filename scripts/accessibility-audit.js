#!/usr/bin/env node

/**
 * Accessibility Audit Script
 * Ruft detaillierte Accessibility-Informationen von PageSpeed Insights ab
 */

const API_KEY = 'AIzaSyA4qo0LfLy_ps-SyTQTQpFrFRjDnAUn_K4';
const API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
const DEFAULT_URL = 'https://caprantier-consulting.vercel.app';

async function runAccessibilityAudit(url, strategy = 'desktop') {
  const apiUrl = `${API_URL}?url=${encodeURIComponent(url)}&key=${API_KEY}&strategy=${strategy}&category=accessibility`;

  console.log(`\n🔍 Accessibility-Audit: ${url}`);
  console.log(`📱 Strategie: ${strategy.toUpperCase()}`);
  console.log('⏳ Bitte warten...\n');

  const response = await fetch(apiUrl);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || `HTTP ${response.status}`);
  }

  return await response.json();
}

function displayResults(data) {
  const lighthouse = data.lighthouseResult;
  const audits = lighthouse.audits;
  const score = Math.round(lighthouse.categories.accessibility.score * 100);

  console.log('═'.repeat(60));
  console.log(`📊 ACCESSIBILITY SCORE: ${score}/100`);
  console.log('═'.repeat(60));

  // Gruppiere Audits nach Status
  const failed = [];
  const passed = [];
  const notApplicable = [];

  for (const [id, audit] of Object.entries(audits)) {
    if (audit.scoreDisplayMode === 'notApplicable') {
      notApplicable.push(audit);
    } else if (audit.score === 1) {
      passed.push(audit);
    } else if (audit.score !== null && audit.score < 1) {
      failed.push({ id, ...audit });
    }
  }

  // Fehlgeschlagene Audits anzeigen (wichtig für Fixes)
  if (failed.length > 0) {
    console.log('\n❌ PROBLEME ZU BEHEBEN:\n');
    failed.forEach((audit, index) => {
      console.log(`${index + 1}. ${audit.title}`);
      console.log(`   ID: ${audit.id}`);
      console.log(`   ${audit.description}`);

      // Details anzeigen wenn vorhanden
      if (audit.details?.items?.length > 0) {
        console.log('   Betroffene Elemente:');
        audit.details.items.slice(0, 5).forEach(item => {
          if (item.node?.snippet) {
            console.log(`   → ${item.node.snippet.substring(0, 100)}...`);
          } else if (item.node?.selector) {
            console.log(`   → ${item.node.selector}`);
          }
        });
        if (audit.details.items.length > 5) {
          console.log(`   ... und ${audit.details.items.length - 5} weitere`);
        }
      }
      console.log('');
    });
  } else {
    console.log('\n✅ Keine kritischen Accessibility-Probleme gefunden!\n');
  }

  // Zusammenfassung
  console.log('─'.repeat(60));
  console.log(`✅ Bestanden: ${passed.length} Checks`);
  console.log(`❌ Fehlgeschlagen: ${failed.length} Checks`);
  console.log(`➖ Nicht anwendbar: ${notApplicable.length} Checks`);
  console.log('─'.repeat(60));

  return failed;
}

async function main() {
  const args = process.argv.slice(2);
  const url = args[0] || DEFAULT_URL;

  try {
    // Desktop Audit (zeigt mehr Details)
    console.log('\n' + '='.repeat(60));
    console.log('DESKTOP AUDIT');
    console.log('='.repeat(60));
    const desktopData = await runAccessibilityAudit(url, 'desktop');
    const desktopFailed = displayResults(desktopData);

    // Mobile Audit
    console.log('\n' + '='.repeat(60));
    console.log('MOBILE AUDIT');
    console.log('='.repeat(60));
    const mobileData = await runAccessibilityAudit(url, 'mobile');
    const mobileFailed = displayResults(mobileData);

    // JSON Output für weitere Analyse
    const outputPath = './accessibility-report.json';
    const report = {
      url,
      timestamp: new Date().toISOString(),
      desktop: {
        score: Math.round(desktopData.lighthouseResult.categories.accessibility.score * 100),
        issues: desktopFailed
      },
      mobile: {
        score: Math.round(mobileData.lighthouseResult.categories.accessibility.score * 100),
        issues: mobileFailed
      }
    };

    require('fs').writeFileSync(outputPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Detaillierter Report gespeichert: ${outputPath}`);

  } catch (error) {
    console.error('\n❌ Fehler:', error.message);
    process.exit(1);
  }
}

main();
