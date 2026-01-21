// Vordefinierte Antworten für häufige Fragen (kein API-Call nötig)

interface QuickAnswer {
  triggers: string[]
  answer: string
}

const QUICK_ANSWERS: QuickAnswer[] = [
  {
    triggers: ['was kostet', 'kosten', 'preis', 'wie teuer', 'preise'],
    answer: `Unsere Preise sind maßgeschneidert:

• Pay-per-Lead: 150-500€ pro qualifiziertem Lead
• Monatspauschale: ab 2.000€/Monat
• Vollservice: 5.000-15.000€/Monat

Details klären wir gerne im Gespräch: calendly.com/nico-carpantier-consulting/30min`,
  },
  {
    triggers: ['wie läuft', 'wie funktioniert', 'ablauf', 'prozess'],
    answer: `So läuft die Zusammenarbeit:

1. Erstgespräch – Analyse Ihres Angebots & Zielgruppe
2. Setup – Wir erstellen Gesprächsleitfäden
3. Start – Akquise beginnt, Termine in Ihren Kalender
4. Optimierung – Kontinuierliche Verbesserung

Starten wir? calendly.com/nico-carpantier-consulting/30min`,
  },
  {
    triggers: ['termin', 'gespräch', 'buchen', 'calendly', 'kontakt'],
    answer: `Gerne! Hier kannst du ein kostenloses 30-Min Strategiegespräch buchen:

calendly.com/nico-carpantier-consulting/30min

Oder direkt: nico@carpantier-consulting.de | +49 157 38186221`,
  },
  {
    triggers: ['für wen', 'zielgruppe', 'geeignet', 'passt das'],
    answer: `Wir arbeiten mit B2B-Dienstleistern:

• Agenturen (Marketing, Web, Design)
• IT-Dienstleister & Softwarefirmen
• Beratungsunternehmen
• SaaS-Anbieter

Nicht geeignet für: B2C, MLM, Dropshipping.`,
  },
  {
    triggers: ['wie schnell', 'erste ergebnisse', 'wann'],
    answer: `Typischer Zeitplan:

• Woche 1: Onboarding & Setup
• Woche 2: Erste Termine
• Monat 2-3: ROI erreicht

Die meisten Kunden sehen erste Termine schon in der ersten Akquise-Woche.`,
  },
  {
    triggers: ['was macht ihr', 'was bietet', 'leistungen', 'services', 'dienstleistung'],
    answer: `Wir übernehmen Ihren B2B-Vertrieb:

• Telefonakquise – Professionelle Kaltakquise
• Leadgenerierung – Zielgruppen-Recherche
• Terminqualifizierung – BANT-qualifizierte Termine

Sie fokussieren sich aufs Kerngeschäft, wir füllen Ihren Kalender.`,
  },
  {
    triggers: ['bant', 'qualifiziert', 'qualifizierung'],
    answer: `Wir nutzen die BANT-Methode:

• Budget – Hat der Lead Budget?
• Authority – Ist es der Entscheider?
• Need – Gibt es echten Bedarf?
• Timing – Passt der Zeitpunkt?

Nur wenn alle Kriterien erfüllt sind, wird ein Termin gebucht.`,
  },
]

export function findQuickAnswer(message: string): string | null {
  const lowerMsg = message.toLowerCase()

  for (const qa of QUICK_ANSWERS) {
    if (qa.triggers.some((trigger) => lowerMsg.includes(trigger))) {
      return qa.answer
    }
  }

  return null
}
