import type { City } from '@/content/cities'
import type { TerminInhalt } from '@/components/seite/TerminScene'

/**
 * Rechts steht nicht die Tagesordnung des Erstgesprächs (die trägt
 * `/leistungen`) und nicht der Zwei-Wochen-Ablauf (den trägt
 * `/kaltakquise/[stadt]`), sondern das, was im Gespräch für diese
 * Seitenfamilie zählt: was ein Termin wert ist, was bei Ihnen bleibt und
 * woran sich zeigt, ob es passt.
 *
 * Über Liste, Notizen und Gesprächsgerüst nach dem Ende der Zusammenarbeit
 * steht hier nichts: Das richtet sich nach der Vereinbarung.
 */
const GEKLAERT = [
  {
    when: 'Der Wert',
    what: 'Was ein Termin für Sie zählt',
    detail: 'Welche Rolle, welcher Bedarf und welcher Kundenwert einen Termin für Sie qualifizieren.',
  },
  {
    when: 'Die Abgabe',
    what: 'Was bei Ihnen bleibt',
    detail: 'Verkaufsgespräch, Preis und Entscheidung bleiben bei Ihnen. Alles bis zum Termin übernehmen wir.',
  },
  {
    when: 'Die Passung',
    what: 'Ob wir zusammenpassen',
    detail: 'Passt es nicht, sagen wir das im Gespräch und nicht erst in einem Angebot.',
  },
]

/** Inhalt der Abschluss-Bühne; gerendert von `@/components/seite/TerminScene`. */
export function termin(city: City): TerminInhalt {
  return {
    title: 'Am Ende des Gesprächs wissen Sie, ob das für Sie passt.',
    text: <>15 Minuten, in denen Sie schildern, wen Sie in {city.name} erreichen wollen, und wir sagen, ob wir das können. Kein Pitch, keine Präsentation.</>,
    planHead: 'Was in den 15 Minuten geklärt wird',
    items: GEKLAERT,
    planNote: 'Unverbindlich und kostenlos.',
  }
}
