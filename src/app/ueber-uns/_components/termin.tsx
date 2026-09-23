import type { TerminInhalt } from '@/components/seite/TerminScene'

/**
 * Rechts steht, was der Besucher aus dem Gespräch **mitnimmt**, nicht was wir
 * darin abfragen. Das ist der Unterschied zu `/branchen` („Was wir vorher
 * wissen wollen“) und zu `/leistungen` (die Tagesordnung nach Minuten): Wer
 * auf dieser Seite ankommt, prüft uns. Die passende Zusage ist deshalb, was
 * er über uns erfährt — und dass eine Absage ein mögliches Ergebnis ist.
 */
const MITNAHME = [
  {
    when: 'Besetzung',
    what: 'Wer bei Ihnen telefoniert',
    detail: 'Wer am Hörer ist, wie der Einstieg klingt und woran wir Ihre Liste aufbauen würden.',
  },
  {
    when: 'Grenzen',
    what: 'Wo wir an Grenzen stoßen',
    detail: 'Die Stellen, an denen es in Ihrem Markt schwierig wird – bevor Sie dafür bezahlen.',
  },
  {
    when: 'Zeitpunkt',
    what: 'Wann es losgehen könnte',
    detail: 'Ob im laufenden Monat noch Kapazität frei ist und was der Kick-off von Ihnen braucht.',
  },
]

/** Inhalt der Abschluss-Bühne; gerendert von `@/components/seite/TerminScene`. */
export const TERMIN: TerminInhalt = {
  title: '15 Minuten. Danach wissen Sie, mit wem Sie es zu tun hätten.',
  text: 'Kein Pitch, keine Unterlagen. Sie schildern Ihr Angebot und Ihre Zielkunden, wir sagen, ob wir liefern können – und wenn nicht, warum.',
  planHead: 'Was Sie daraus mitnehmen',
  items: MITNAHME,
  planNote: 'Eine Absage ist ein mögliches Ergebnis dieses Gesprächs – und kein schlechtes.',
  tallItems: true,
}
