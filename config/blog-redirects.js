/**
 * Dauerhafte Umleitungen der am 10.09.2026 zusammengeführten Blogbeiträge.
 *
 * Ausgangslage: 52 Beiträge mit einem Median von 429 Wörtern, von denen vier
 * im Google-Index standen. Die Zusammenführung auf 13 belastbare Beiträge
 * entfernt 39 URLs -- keine davon darf ins Leere laufen. Jeder alte Slug zeigt
 * deshalb per 301 auf den Beitrag, der sein Thema aufgenommen hat, und nicht
 * pauschal auf `/blog`: Eine Sammelumleitung auf die Übersicht wertet Google
 * als Soft-404 und behandelt sie wie eine gelöschte Seite.
 *
 * Diese Datei ist bewusst CommonJS und liegt außerhalb von `src/`: Sie wird
 * von `next.config.js` geladen, und das ist eine `.js`-Datei ohne
 * TypeScript-Übersetzung. Eine zweite Fassung in `src/lib/` würde
 * auseinanderlaufen.
 *
 * `scripts/check-blog-redirects.mjs` prüft bei jedem `pnpm verify`, dass jedes
 * Ziel existiert, dass kein aktiver Beitrag umgeleitet wird und dass es keine
 * Ketten gibt.
 */

/** @type {Array<{ from: string, to: string }>} */
const blogRedirects = [
  // -> b2b-kaltakquise-leitfaden (Gesprächsführung am Telefon)
  { from: 'telefonakquise-skript-erstellen', to: 'b2b-kaltakquise-leitfaden' },
  { from: 'kaltakquise-beste-uhrzeit', to: 'b2b-kaltakquise-leitfaden' },
  { from: 'gatekeeper-ueberwinden', to: 'b2b-kaltakquise-leitfaden' },
  { from: 'kaltakquise-warmakquise-unterschied', to: 'b2b-kaltakquise-leitfaden' },
  { from: 'voicemail-vertrieb-tipps', to: 'b2b-kaltakquise-leitfaden' },
  { from: 'gespraechseinstieg-kaltakquise', to: 'b2b-kaltakquise-leitfaden' },

  // -> einwandbehandlung-vertrieb (Einwände und Nachfassen)
  { from: 'follow-up-strategien-vertrieb', to: 'einwandbehandlung-vertrieb' },

  // -> vertrieb-auslagern-kosten-vorteile (Kosten und Modelle)
  { from: 'sdr-as-a-service', to: 'vertrieb-auslagern-kosten-vorteile' },
  { from: 'inhouse-team-vs-vertriebsagentur', to: 'vertrieb-auslagern-kosten-vorteile' },
  { from: 'hybrid-vertrieb-modell', to: 'vertrieb-auslagern-kosten-vorteile' },

  // -> vertriebsagentur-finden-checkliste (Auswahl und Steuerung)
  { from: 'vertriebsagentur-steuern-kpis', to: 'vertriebsagentur-finden-checkliste' },

  // -> b2b-leadgenerierung-kanaele (Kanalvergleich)
  { from: 'linkedin-b2b-leadgenerierung', to: 'b2b-leadgenerierung-kanaele' },
  { from: 'sales-navigator-anleitung', to: 'b2b-leadgenerierung-kanaele' },
  { from: 'cold-email-b2b-marketing', to: 'b2b-leadgenerierung-kanaele' },
  { from: 'content-marketing-leadgenerierung', to: 'b2b-leadgenerierung-kanaele' },
  { from: 'webinare-leadgenerierung-guide', to: 'b2b-leadgenerierung-kanaele' },
  { from: 'messen-events-leadgenerierung', to: 'b2b-leadgenerierung-kanaele' },
  { from: 'inbound-outbound-leadstrategie', to: 'b2b-leadgenerierung-kanaele' },
  { from: 'account-based-marketing-strategie', to: 'b2b-leadgenerierung-kanaele' },
  { from: 'social-selling-beziehungsaufbau', to: 'b2b-leadgenerierung-kanaele' },
  { from: 'video-prospecting-vertrieb', to: 'b2b-leadgenerierung-kanaele' },
  { from: 'linkedin-vs-kaltakquise', to: 'b2b-leadgenerierung-kanaele' },

  // -> bant-methode-erklaert (Qualifizierung)
  { from: 'lead-scoring-priorisierung', to: 'bant-methode-erklaert' },
  { from: 'buying-center-stakeholder', to: 'bant-methode-erklaert' },
  { from: 'discovery-call-leitfaden', to: 'bant-methode-erklaert' },
  { from: 'remote-selling-video-call', to: 'bant-methode-erklaert' },

  // -> vertriebssteuerung-kpis-pipeline (Steuerung)
  { from: 'vertriebsstrategie-entwickeln', to: 'vertriebssteuerung-kpis-pipeline' },
  { from: 'vertriebsziele-smart-methode', to: 'vertriebssteuerung-kpis-pipeline' },
  { from: 'vertriebskennzahlen-kpis', to: 'vertriebssteuerung-kpis-pipeline' },
  { from: 'vertriebspipeline-aufbauen', to: 'vertriebssteuerung-kpis-pipeline' },
  { from: 'sales-funnel-optimierung', to: 'vertriebssteuerung-kpis-pipeline' },
  { from: 'crm-system-vergleich-mittelstand', to: 'vertriebssteuerung-kpis-pipeline' },

  // -> angebot-verhandlung-abschluss-b2b (Angebot bis Abschluss)
  { from: 'angebote-schreiben-b2b', to: 'angebot-verhandlung-abschluss-b2b' },
  { from: 'preisverhandlung-b2b-vertrieb', to: 'angebot-verhandlung-abschluss-b2b' },
  { from: 'closing-techniken-vertrieb', to: 'angebot-verhandlung-abschluss-b2b' },

  // -> ki-im-b2b-vertrieb (KI und Automatisierung)
  { from: 'chatgpt-ki-vertrieb', to: 'ki-im-b2b-vertrieb' },
  { from: 'sales-automation-workflow', to: 'ki-im-b2b-vertrieb' },

  // -> leadgenerierung-it-dienstleister (IT, MSP, SaaS)
  { from: 'saas-vertrieb-strategie', to: 'leadgenerierung-it-dienstleister' },

  // -> akquise-nach-branche-b2b-dienstleister (Branchenvergleich)
  { from: 'agentur-vertrieb-akquise', to: 'akquise-nach-branche-b2b-dienstleister' },
  { from: 'vertrieb-agenturen-kunden-gewinnen', to: 'akquise-nach-branche-b2b-dienstleister' },
  { from: 'beratung-consulting-vertrieb', to: 'akquise-nach-branche-b2b-dienstleister' },
  { from: 'maschinenbau-technischer-vertrieb', to: 'akquise-nach-branche-b2b-dienstleister' },
  { from: 'startup-vertrieb-bootstrap', to: 'akquise-nach-branche-b2b-dienstleister' },
]

module.exports = { blogRedirects }
