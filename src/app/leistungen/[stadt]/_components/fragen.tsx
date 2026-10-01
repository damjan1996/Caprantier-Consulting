import type { City } from '@/content/cities'
import { getCityFAQs } from '@/lib/schemas'
import type { FragenInhalt } from '@/components/seite/FragenSection'

/** Zahlen bis zwölf im Fliesstext ausgeschrieben (Textleitfaden § 9). */
const ZAHLWORT = ['Null', 'Eine', 'Zwei', 'Drei', 'Vier', 'Fünf', 'Sechs', 'Sieben', 'Acht', 'Neun', 'Zehn', 'Elf', 'Zwölf']

/**
 * Die Fragen kommen aus `getCityFAQs` in `src/lib/schemas.ts`, derselben
 * Quelle wie das FAQPage-Markup der Seite.
 *
 * Die Zahl im Vorspann wird gezählt: Städte mit eigenen Fragen
 * (`lokal.fragen` in `cities.ts`) haben mehr als die sechs der Vorlage.
 */
export function fragen(city: City): FragenInhalt {
  const faqs = getCityFAQs(city)
  const anzahl = ZAHLWORT[faqs.length] ?? String(faqs.length)

  return {
    title: 'Was Geschäftsführer fragen, bevor sie den Vertrieb abgeben.',
    lead: `${anzahl} Antworten, die auch das enthalten, was gegen eine Zusammenarbeit spricht. Was danach offen bleibt, klären wir in 15 Minuten am Telefon.`,
    faqs,
  }
}
