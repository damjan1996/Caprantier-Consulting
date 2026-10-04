import type { City } from '@/content/cities'
import type { TerminInhalt } from '@/components/seite/TerminScene'

/**
 * Rechts läuft **nicht** die Tagesordnung des Erstgesprächs, die auf
 * `/leistungen` steht, sondern was danach passiert: die ersten zwei Wochen bis
 * zum ersten Termin. Dieselbe Darstellung ein zweites Mal wäre kein
 * Wiedererkennen, sondern Füllmaterial — und der Leser ist hier eine Frage
 * weiter. Er weiß aus dem Abschnitt „Der Markt vor Ort“ schon, wie gearbeitet
 * wird, und will wissen, wann es losgeht.
 *
 * Zusammen mit der Rechtskarte sind das zwei dunkle Flächen auf der Seite —
 * das Budget des Designleitfadens § 2.2 erlaubt drei, davon ist der Abschluss
 * immer eine.
 */

/**
 * Die ersten zwei Wochen. Die Zahl ist dieselbe wie überall sonst auf der
 * Website („Erste Termine in 14 Tagen“) — der Ablauf zeigt, woraus sie sich
 * zusammensetzt, statt sie ein zweites Mal zu behaupten.
 */
const ERSTE_WOCHEN = [
  {
    when: 'Tag 1–3',
    what: 'Zielgruppe und Liste',
    detail: 'Wir legen mit Ihnen fest, wen wir anrufen – und woran wir es festmachen.',
  },
  {
    when: 'Tag 4–10',
    what: 'Gesprächsgerüst und erste Anrufe',
    detail: 'Die ersten Einwände kommen aus echten Gesprächen, nicht aus einem Workshop.',
  },
  {
    when: 'Ab Tag 14',
    what: 'Die ersten Termine',
    detail: 'Einladungen aus Ihrem Kalender, dazu ein erster Bericht.',
  },
]

/** Inhalt der Abschluss-Bühne; gerendert von `@/components/seite/TerminScene`. */
export function termin(city: City): TerminInhalt {
  return {
    title: <>Ob sich eine Kampagne in {city.name} lohnt, sagen wir Ihnen in 15 Minuten.</>,
    text: 'Kein Pitch, keine Präsentation. Sie schildern Ihre Zielgruppe, wir schätzen ein, wie groß der erreichbare Teil davon vor Ort ist – und ob sich die Liste überhaupt rechnet.',
    planHead: 'Die ersten zwei Wochen',
    items: ERSTE_WOCHEN,
    planNote: 'In der Regel. Bei sehr kleinen Zielgruppen dauert der Listenaufbau länger.',
  }
}
