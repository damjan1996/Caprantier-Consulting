import type { RailSection } from '@/app/components/seite/SectionRail'

/**
 * Die Abschnitte der Kaltakquise-Übersicht für die Fortschrittsleiste.
 *
 * Wer hier einen Eintrag ergänzt, muss dieselbe `id` am zugehörigen
 * `<section>` setzen — die Leiste überspringt still, was sie im Dokument
 * nicht findet.
 *
 * Fünf Einträge über gut zwölf Bildschirmhöhen: die Längenbedingung der
 * Faustregel im Baukasten § 7 ist erfüllt, die Abschnittszahl nicht.
 */
export const KALTAKQUISE_START_SECTIONS: RailSection[] = [
  { id: 'einstieg', label: 'Einstieg' },
  { id: 'maerkte', label: 'Märkte' },
  { id: 'grenzen', label: 'Grenzen' },
  { id: 'unterschied', label: 'Unterschied' },
  { id: 'termin', label: 'Termin' },
]
