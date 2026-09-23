import type { TerminInhalt } from '@/components/seite/TerminScene'

/**
 * Rechts steht, was wir vor dem Gespräch wissen wollen. Das passt zur Frage
 * dieser Seite: Wer hier ankommt, sucht seine Branche und findet sie
 * womöglich nicht — dann ist die nützlichste Auskunft, woran wir überhaupt
 * erkennen, ob wir in einem Markt etwas beitragen können.
 *
 * Bewusst nicht die Tagesordnung des Erstgesprächs (die trägt `/leistungen`),
 * nicht die Voraussetzungen (die trägt `/kaltakquise`) und nicht der
 * Zwei-Wochen-Ablauf (der trägt `/kaltakquise/[stadt]`).
 */
const VORHER = [
  {
    when: 'Ihr Angebot',
    what: 'In einem Satz',
    detail: 'Was verkaufen Sie, und woran merkt der Kunde selbst, dass er es braucht?',
  },
  {
    when: 'Ihre Zielkunden',
    what: 'Branche, Größe, Rolle',
    detail: 'Je enger, desto besser. Eine Liste mit tausend Namen hilft niemandem.',
  },
  {
    when: 'Ihr Anlass',
    what: 'Warum gerade jetzt',
    detail: 'Gibt es ein Ereignis beim Zielkunden, das den Anruf rechtfertigt? Wenn nicht, suchen wir eines.',
  },
]

/** Inhalt der Abschluss-Bühne; gerendert von `@/components/seite/TerminScene`. */
export const TERMIN: TerminInhalt = {
  title: 'Sagen Sie uns Ihre Branche. Wir sagen, ob wir sie kennen.',
  text: 'Kein Pitch. 15 Minuten, in denen Sie Ihr Angebot und Ihre Zielkunden schildern – und wir sagen, ob wir in diesem Markt etwas beitragen können.',
  planHead: 'Was wir vorher wissen wollen',
  items: VORHER,
  planNote: 'Fehlt der dritte Punkt, ist das kein Ausschluss – das ist unsere Arbeit.',
}
