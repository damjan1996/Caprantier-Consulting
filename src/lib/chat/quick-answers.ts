// Vordefinierte Antworten für häufige Fragen (kein API-Call nötig)

interface QuickAnswer {
  triggers: string[]
  answer: string
}

const QUICK_ANSWERS: QuickAnswer[] = [
  {
    triggers: ['was kostet', 'kosten', 'preis', 'wie teuer', 'preise'],
    answer: `Die Preise sind individuell und hängen von Ihrem Projekt ab. Wir erstellen Ihnen gerne ein maßgeschneidertes Angebot.

Am besten sprechen wir kurz persönlich:

+49 157 38186221
nico@carpantier-consulting.de
calendly.com/nico-carpantier-consulting/30min`,
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
    answer: `Gerne! Hier können Sie ein kostenloses 30-Min Strategiegespräch buchen:

calendly.com/nico-carpantier-consulting/30min

Oder direkt: nico@carpantier-consulting.de | +49 157 38186221`,
  },
  {
    triggers: ['für wen', 'zielgruppe', 'geeignet', 'passt das'],
    answer: `Wir arbeiten mit B2B-Dienstleistern und inhabergeführten Unternehmen (5-50 Mitarbeiter, Deal-Wert ab 5.000 €):

• Personalvermittler
• IT-Systemhäuser
• Unternehmensberater
• SaaS-Anbieter
• Web- & Software-Agenturen

Voraussetzung: Gutes Angebot, zufriedene Kunden - es fehlt nur der konstante Zustrom qualifizierter Gespräche. Nicht geeignet für: B2C, MLM, Dropshipping.`,
  },
  {
    triggers: ['wie schnell', 'erste ergebnisse', 'wann'],
    // Bewusst ohne Zahlen zu Ergebnissen oder Amortisation: unbelegte
    // Erfolgsversprechen sind irreführend im Sinne des § 5 UWG — erst recht,
    // wenn ein KI-Assistent sie automatisiert ausgibt.
    answer: `So läuft der Start ab:

• Woche 1: Onboarding, Zielgruppe und Gesprächsleitfaden
• Ab Woche 2: aktive Akquise und erste Terminvereinbarungen

Wie schnell sich das rechnet, hängt von Zielgruppe, Angebot und Deal-Wert ab. Das sehen wir uns im Strategiegespräch konkret für Ihren Fall an.`,
  },
  {
    triggers: ['was macht ihr', 'was bietet', 'leistungen', 'services', 'dienstleistung'],
    answer: `Wir übernehmen Ihren B2B-Vertrieb:

• Telefonakquise – Professionelle Kaltakquise
• Leadgenerierung – Zielgruppen-Recherche
• Terminqualifizierung – Nur Entscheider mit echtem Interesse

Sie fokussieren sich aufs Kerngeschäft, wir füllen Ihren Kalender.`,
  },
  {
    triggers: ['qualifiziert', 'qualifizierung'],
    answer: `Unsere Qualifizierung ist klar und direkt:

• Entscheider – Wir sprechen nur mit der richtigen Person
• Interesse – Grundsätzliches Interesse am Angebot Ihres Kunden
• Termin – Erst dann wird ein Termin vereinbart

Keine komplizierten Frameworks, sondern effektive Praxis.`,
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
