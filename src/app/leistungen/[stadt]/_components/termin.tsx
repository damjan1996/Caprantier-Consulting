import type { City } from '@/lib/cities'
import type { TerminInhalt } from '@/components/seite/TerminScene'

/**
 * Die Überschrift ist die stärkste Zusage dieser Seitenfamilie und zugleich
 * die, die man von einer Agentur am wenigsten erwartet: Was entsteht, gehört
 * dem Kunden — auch danach. Wer überlegt, den Vertrieb abzugeben, fürchtet
 * genau das Gegenteil.
 *
 * Rechts steht deshalb nicht die Tagesordnung des Erstgesprächs
 * (die trägt `/leistungen`) und nicht der Zwei-Wochen-Ablauf (den trägt
 * `/kaltakquise/[stadt]`), sondern was am Ende übrig bleibt.
 */
const BLEIBT = [
  {
    when: 'Die Liste',
    what: 'Mit ihren Auswahlkriterien',
    detail: 'Warum ein Unternehmen daraufsteht, ist festgehalten – nicht nur, dass es daraufsteht.',
  },
  {
    when: 'Die Notizen',
    what: 'In Ihrem CRM',
    detail: 'Gesprächsnotizen und Absagegründe im Wortlaut, von Anfang an bei Ihnen statt in einer Tabelle bei uns.',
  },
  {
    when: 'Das Gerüst',
    what: 'An echten Anrufen erarbeitet',
    detail: 'Wer die Akquise danach selbst weiterführt, fängt nicht bei null an.',
  },
]

/** Inhalt der Abschluss-Bühne; gerendert von `@/components/seite/TerminScene`. */
export function termin(city: City): TerminInhalt {
  return {
    title: 'Am Ende gehört Ihnen die Liste. Auch wenn wir aufhören.',
    text: <>15 Minuten, in denen Sie schildern, wen Sie in {city.name} erreichen wollen, und wir sagen, ob wir das können. Kein Pitch, keine Präsentation.</>,
    planHead: 'Was am Ende Ihnen gehört',
    items: BLEIBT,
    planNote: 'Nichts davon bleibt bei uns zurück.',
  }
}
