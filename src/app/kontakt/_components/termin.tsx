import type { TerminInhalt } from '@/components/seite/TerminScene'

/**
 * Rechts steht, was für den Termin nötig ist. Das ist die passende Zusage
 * ausgerechnet am Ende einer Kontaktseite: Wer bis hierher gescrollt hat, hat
 * das Formular gesehen und sich dagegen entschieden — meistens, weil er nicht
 * weiß, was von ihm erwartet wird. Die Antwort lautet: fast nichts.
 *
 * Bewusst nicht die Tagesordnung des Erstgesprächs (die trägt `/leistungen`),
 * nicht „Was wir vorher wissen wollen“ (`/branchen`) und nicht „Was Sie daraus
 * mitnehmen“ (`/ueber-uns`).
 */
const BRAUCHT = [
  {
    when: 'Vorbereitung',
    what: 'Keine Unterlagen',
    detail: 'Kein Foliensatz, keine Zahlen, keine fertige Liste. Was fehlt, fragen wir im Gespräch.',
  },
  {
    when: 'Zehn Sekunden',
    what: 'Einen freien Platz',
    detail: 'Der Kalender zeigt nur Zeiten, die tatsächlich frei sind. Aussuchen, bestätigen, fertig.',
  },
  {
    when: 'Eine Angabe',
    what: 'Ihre E-Mail-Adresse',
    detail: 'Für die Einladung. Mehr wird nicht abgefragt, und ein Newsletter folgt daraus nicht.',
  },
]

/** Inhalt der Abschluss-Bühne; gerendert von `@/components/seite/TerminScene`. */
export const TERMIN: TerminInhalt = {
  title: 'Der kürzeste Weg bleibt der, bei dem Sie nichts tippen müssen.',
  text: 'Ein freier Platz im Kalender, 15 Minuten, keine Vorbereitung. Was wir wissen müssen, fragen wir im Gespräch – das geht schneller, als es aufzuschreiben.',
  planHead: 'Was Sie dafür brauchen',
  items: BRAUCHT,
  planNote: 'Kommt etwas dazwischen, sagen Sie ab – der Platz geht dann an jemand anderen.',
  tallItems: true,
}
