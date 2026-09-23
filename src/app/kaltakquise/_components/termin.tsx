import type { TerminInhalt } from '@/components/seite/TerminScene'

/**
 * Rechts steht weder die Tagesordnung des Erstgesprächs (die trägt
 * `/leistungen`) noch der Zwei-Wochen-Ablauf (den tragen die Stadtseiten),
 * sondern die dritte Frage, die an dieser Stelle offen ist: **Was muss ich
 * mitbringen?** Diese Seite spricht jemanden an, der noch gar nicht weiß, ob
 * er für laufende Akquise überhaupt in Frage kommt.
 *
 * Damit ist der Abschluss zugleich die zweite Abgrenzung der Seite: Wer keine
 * Zielgruppe, kein erklärbares Angebot und keine Kapazität hat, bucht besser
 * kein Gespräch. Das ist die Haltung des Hauses — die Seite gewinnt, indem sie
 * absagt (Textleitfaden § 1).
 */

/**
 * Was ein Erstgespräch voraussetzt. Die Spanne „3–8 Termine“ ist dieselbe wie
 * auf Startseite und Leistungsseite — dort als Zusage, hier als Anforderung.
 * Eine Zahl, eine Schreibweise (Textleitfaden § 6.2).
 */
const VORAUSSETZUNGEN = [
  {
    when: 'Erstens',
    what: 'Eine Zielgruppe',
    detail: 'Branche, Größe, Rolle – eine Beschreibung genügt. Wie viele davon erreichbar sind, prüfen wir.',
  },
  {
    when: 'Zweitens',
    what: 'Ein erklärbares Angebot',
    detail: 'Etwas, das sich in einem Satz sagen lässt. Am Telefon gibt es für mehr keine Zeit.',
  },
  {
    when: 'Drittens',
    what: 'Kapazität für Termine',
    detail: '3–8 Gespräche pro Woche wollen geführt werden. Wer die nicht führen kann, braucht keine Akquise.',
  },
]

/** Inhalt der Abschluss-Bühne; gerendert von `@/components/seite/TerminScene`. */
export const TERMIN: TerminInhalt = {
  title: 'Bringen Sie Ihre Zielgruppe mit. Den Rest klären wir in 15 Minuten.',
  text: 'Kein Pitch, keine Präsentation. Sie schildern, wen Sie erreichen wollen, und hören danach, ob wir das können – oder warum nicht.',
  planHead: 'Was Sie mitbringen sollten',
  items: VORAUSSETZUNGEN,
  planNote: 'Fehlt eines davon, sagen wir das im Gespräch – und Sie sparen sich die Kampagne.',
}
