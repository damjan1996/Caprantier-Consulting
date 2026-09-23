import type { City } from '@/lib/cities'
import type { CityAcquisition } from '@/lib/city-acquisition'
import { getKaltakquiseFAQs } from '@/lib/schemas'
import type { FragenInhalt } from '@/components/seite/FragenSection'

/**
 * Bewusst **keine** Klebe-Bühne, obwohl die Startseite ihre neun Fragen auf
 * eine stellt. Zwei Gründe, beide inhaltlich:
 *
 * 1. Wer hier ankommt, kommt aus der Suche mit **einer** Frage. Eine Liste zum
 *    Nachschlagen findet man, eine Bühne muss man durchscrollen — der
 *    Designleitfaden § 5.2 nennt genau diesen Fall.
 * 2. Drei der sechs Antworten geben den Ortstext wieder, den der Abschnitt
 *    „Der Markt vor Ort“ oben bereits sichtbar zeigt. Eingeklappt ist diese
 *    Überschneidung harmlos: Wer die Frage öffnet, hat sie gestellt. Offen auf
 *    einer Bühne wäre sie derselbe Absatz ein zweites Mal, nur langsamer.
 *
 * Die Fragen kommen aus `getKaltakquiseFAQs` in `src/lib/schemas.ts` — aus
 * derselben Quelle wie das FAQPage-Markup der Seite. Zwei Textstände zwischen
 * sichtbarem Inhalt und Markup sind ein Verstoß, den man der Seite nicht
 * ansieht (Baukasten § 8.3).
 */
export function fragen(city: City, acquisition: CityAcquisition): FragenInhalt {
  return {
    title: 'Sechs Fragen, die vor dem ersten Anruf geklärt sein sollten.',
    lead: <>Die Antworten gelten für {city.name}, nicht allgemein für Deutschland. Was danach offen bleibt, klären wir in 15 Minuten am Telefon.</>,
    faqs: getKaltakquiseFAQs(city, acquisition),
  }
}
