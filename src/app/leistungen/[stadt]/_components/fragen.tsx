import type { City } from '@/lib/cities'
import { getCityFAQs } from '@/lib/schemas'
import type { FragenInhalt } from '@/components/seite/FragenSection'

/**
 * Die Fragen kommen aus `getCityFAQs` in `src/lib/schemas.ts`, derselben
 * Quelle wie das FAQPage-Markup der Seite.
 */
export function fragen(city: City): FragenInhalt {
  return {
    title: 'Was Geschäftsführer fragen, bevor sie den Vertrieb abgeben.',
    lead: 'Sechs Antworten, die auch das enthalten, was gegen eine Zusammenarbeit spricht. Was danach offen bleibt, klären wir in 15 Minuten am Telefon.',
    faqs: getCityFAQs(city),
  }
}
