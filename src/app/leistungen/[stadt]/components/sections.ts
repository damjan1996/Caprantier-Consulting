import type { RailSection } from '@/app/components/seite/SectionRail'

/**
 * Die Abschnitte der Vertriebs-Stadtseiten für die Fortschrittsleiste.
 *
 * Wer hier einen Eintrag ergänzt, muss dieselbe `id` am zugehörigen
 * `<section>` setzen — die Leiste überspringt still, was sie im Dokument
 * nicht findet.
 */
export const STADT_SECTIONS: RailSection[] = [
  { id: 'einstieg', label: 'Einstieg' },
  { id: 'uebergabe', label: 'Übergabe' },
  { id: 'region', label: 'Region' },
  { id: 'aufwand', label: 'Aufwand' },
  { id: 'fragen', label: 'Fragen' },
  { id: 'termin', label: 'Termin' },
]
