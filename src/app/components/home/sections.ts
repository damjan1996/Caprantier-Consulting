/**
 * Die Abschnitte der Startseite in ihrer Reihenfolge.
 *
 * Einzige Quelle für zwei Dinge, die sonst auseinanderlaufen: die Sprungmarke
 * am `<section>`-Element und die Beschriftung in der Fortschrittsleiste
 * (`SectionRail`). Wer hier einen Eintrag ergänzt, muss dieselbe `id` am
 * zugehörigen Abschnitt setzen — die Leiste überspringt still, was sie im
 * Dokument nicht findet.
 *
 * Die Beschriftungen sind bewusst kurz. Sie stehen in einer schmalen Leiste am
 * rechten Rand; alles über etwa zwölf Zeichen drängt sich dort über den
 * Seiteninhalt.
 *
 * Nicht enthalten ist die Logo-Zeile: Sie ist gut dreihundert Pixel hoch und
 * wäre als eigener Punkt ein Strich, der im Vorbeiscrollen aufleuchtet und
 * sofort wieder erlischt. Sie zählt zum Einstieg.
 */
import type { RailSection } from '../seite/SectionRail'

export const HOME_SECTIONS: RailSection[] = [
  { id: 'einstieg', label: 'Einstieg' },
  { id: 'problem', label: 'Problem' },
  { id: 'ablauf', label: 'Ablauf' },
  { id: 'telefon', label: 'Am Telefon' },
  { id: 'prozess', label: 'Prozess' },
  { id: 'passt-das', label: 'Passt das?' },
  { id: 'ergebnisse', label: 'Ergebnisse' },
  { id: 'gruender', label: 'Über Nico' },
  { id: 'fragen', label: 'Fragen' },
  { id: 'termin', label: 'Termin' },
]
