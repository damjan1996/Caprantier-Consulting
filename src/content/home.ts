/**
 * Redaktioneller Inhalt der Startseite.
 *
 * Die Fragen und die Prozessschritte stehen hier und nicht in der jeweiligen
 * Komponente, weil `src/lib/schemas.ts` dieselben Texte als FAQPage- und
 * HowTo-Markup ausliefert. Google verlangt, dass strukturierte Daten den
 * sichtbaren Inhalt der Seite wiedergeben — zwei getrennte Textstände laufen
 * beim ersten Umformulieren auseinander, und der Verstoß fällt niemandem auf,
 * der die Seite ansieht.
 */

export interface HomeFaq {
  question: string
  answer: string
  /** Kleine Auszeichnung über der Frage, etwa für einen neuen Abschnitt. */
  tag?: string
  /** Einordnung unter der Antwort. Kein Bestandteil des FAQ-Markups. */
  note?: string
}

/**
 * Die Antwort zur Rechtslage gibt die Einordnung wieder, die im
 * Wissensbereich ausführlich belegt ist (`/blog/kaltakquise-rechtliche-grundlagen`
 * und `/blog/b2b-kaltakquise-leitfaden`). Der Hinweis darunter ist Pflicht:
 * Die Darstellung ist eine allgemeine Einordnung und keine Rechtsberatung.
 */
export const homeFaqs: HomeFaq[] = [
  {
    question: 'Wie viele Termine kann ich pro Woche erwarten?',
    answer:
      'Im Durchschnitt liefern wir 3–8 qualifizierte Termine pro Woche, je nach Branche und Zielgruppe. Die genaue Zahl besprechen wir im Erstgespräch – sie hängt von Marktgröße und Komplexität Ihres Angebots ab.',
  },
  {
    tag: 'Rechtliches',
    question: 'Ist telefonische Kaltakquise im B2B überhaupt erlaubt?',
    answer:
      'Ja – unter klaren Bedingungen. Gegenüber Unternehmen ist ein Anruf ohne vorherige Einwilligung zulässig, wenn eine sogenannte mutmaßliche Einwilligung vorliegt: Das angerufene Unternehmen muss aufgrund seines Geschäfts ein sachliches Interesse an Ihrem Angebot haben können (§ 7 Abs. 2 Nr. 1 UWG). Genau deshalb recherchieren wir vor jedem Anruf und rufen nur Unternehmen an, für die Ihr Angebot fachlich passt. Datenschutzrechtlich stützen wir uns auf das berechtigte Interesse (Art. 6 Abs. 1 lit. f DSGVO), informieren transparent und dokumentieren jeden Widerspruch – wer nicht angerufen werden möchte, wird nicht mehr angerufen. Privatpersonen rufen wir grundsätzlich nicht an.',
    note: 'Allgemeine Einordnung, keine Rechtsberatung. Die ausführliche Fassung mit Quellen steht im Beitrag zu den rechtlichen Grundlagen.',
  },
  {
    question: 'Telefonieren Sie in unserem Namen?',
    answer:
      'Ja. Wir treten als Teil Ihres Teams auf – wie ein eigener Mitarbeiter. Wir verwenden Ihren Firmennamen, Ihre E-Mail-Signatur und sprechen im Wir-Format. Ihre Gesprächspartner merken keinen Unterschied.',
  },
  {
    question: 'Wie qualifizieren Sie die Leads?',
    answer:
      'Wir stellen sicher, dass wir mit dem Entscheider sprechen und ein konkretes Interesse am Angebot besteht. Kein „Kaffeetrinken“-Termin – nur Gespräche mit echter Auftragschance landen in Ihrem Kalender.',
  },
  {
    question: 'Wie schnell kann ich mit den ersten Terminen rechnen?',
    answer:
      'Nach Kick-off und Setup starten wir in der Regel innerhalb von 10–14 Tagen mit den ersten Gesprächen. Die ersten qualifizierten Termine stehen oft schon in der zweiten Woche in Ihrem Kalender.',
  },
  {
    question: 'Welche Branchen funktionieren besonders gut?',
    answer:
      'B2B-Dienstleister mit erklärungsbedürftigem Angebot: Personalvermittler, IT-Systemhäuser, Unternehmensberatungen, SaaS-Anbieter, Web- und Software-Agenturen sowie Industriezulieferer. Entscheidend ist ein Kundenwert ab 10.000\u00A0€.',
  },
  {
    question: 'Was kostet die Zusammenarbeit?',
    answer:
      'Wir verkaufen keine Standardpakete, deshalb variiert der Preis. Im Erstgespräch nennen wir Ihnen nach kurzer Analyse eine transparente Hausnummer. Unsere Kunden sehen uns als Investment, nicht als Kostenstelle.',
  },
  {
    question: 'Gibt es eine Mindestlaufzeit?',
    answer:
      'Wir empfehlen mindestens drei Monate, damit der Prozess seine Wirkung entfaltet. Versteckte Kündigungsfristen gibt es nicht – wir überzeugen durch Ergebnisse, nicht durch Verträge.',
  },
  {
    question: 'Warum nur fünf Kunden pro Monat?',
    answer:
      'Qualität vor Quantität. Wir arbeiten bewusst mit maximal fünf Kunden gleichzeitig, um jedem die volle Aufmerksamkeit und Schlagzahl zu geben. Das ist der Grund, warum die Ergebnisse stimmen.',
  },
]

export interface HomeProcessStep {
  /** „TAG 0“, „WOCHE 1“ — der Zeitpunkt, nicht die Nummer. */
  phase: string
  /** Aufwand auf Kundenseite, als Kennzeichnung neben der Phase. */
  effort: string
  /** Steht `effort` für „kein Eigenaufwand“? Dann wird er blau ausgezeichnet. */
  effortIsFree?: boolean
  title: string
  description: string
  /** Balkenbreite des Aufwands in Prozent, 0–100. */
  effortShare: number
  /** Beschriftung unter dem Balken. */
  effortLabel: string
}

export const homeProcessSteps: HomeProcessStep[] = [
  {
    phase: 'Tag 0',
    effort: '15 Minuten',
    title: 'Erstgespräch',
    description:
      'Kurz und unverbindlich: Wir lernen Ihr Unternehmen, Ihr Angebot und Ihre Zielgruppe kennen – und sagen ehrlich, ob wir helfen können.',
    effortShare: 18,
    effortLabel: 'gering',
  },
  {
    phase: 'Woche 1',
    effort: '45–60 Minuten',
    title: 'Kick-off',
    description:
      'Gemeinsam definieren wir Ihre ideale Zielgruppe, die Gesprächsstrategie – und was für Sie einen qualifizierten Termin ausmacht.',
    effortShare: 60,
    effortLabel: 'eine Stunde',
  },
  {
    phase: 'Woche 1–2',
    effort: 'Kein Eigenaufwand',
    effortIsFree: true,
    title: 'Strategie & Setup',
    description:
      'Wir bauen Ihre Akquise-Infrastruktur: Recherche, Gesprächsleitfaden, Einwandbehandlung, CRM-Anbindung. Sie lesen nur gegen.',
    effortShare: 0,
    effortLabel: 'keiner',
  },
  {
    phase: 'Ab Woche 2',
    effort: 'Kein Eigenaufwand',
    effortIsFree: true,
    title: 'Wöchentlich neue Termine',
    description:
      'Ab jetzt telefonieren wir in Ihrem Namen. Qualifizierte Entscheider-Termine landen direkt in Ihrem Kalender – Woche für Woche.',
    effortShare: 0,
    effortLabel: 'keiner',
  },
]
