import type { RailSection } from '@/app/components/seite/SectionRail'

/**
 * Die Abschnitte der Branchenübersicht für die Fortschrittsleiste.
 *
 * Wer hier einen Eintrag ergänzt, muss dieselbe `id` am zugehörigen
 * `<section>` setzen — die Leiste überspringt still, was sie im Dokument
 * nicht findet.
 */
export const BRANCHEN_SECTIONS: RailSection[] = [
  { id: 'einstieg', label: 'Einstieg' },
  { id: 'branchen', label: 'Branchen' },
  { id: 'zuschnitt', label: 'Zuschnitt' },
  { id: 'unterschied', label: 'Unterschied' },
  { id: 'termin', label: 'Termin' },
]
