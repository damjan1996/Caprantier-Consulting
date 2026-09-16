import type { RailSection } from '@/app/components/seite/SectionRail'

/**
 * Die Abschnitte der Wissensseite für die Fortschrittsleiste.
 *
 * Wer hier einen Eintrag ergänzt, muss dieselbe `id` am zugehörigen
 * `<section>` setzen — die Leiste überspringt still, was sie im Dokument
 * nicht findet.
 *
 * Sechs Einträge über gut dreizehn Bildschirmhöhen: beide Bedingungen der
 * Faustregel im Baukasten § 7 sind erfüllt.
 */
export const WISSEN_SECTIONS: RailSection[] = [
  { id: 'einstieg', label: 'Einstieg' },
  { id: 'beitraege', label: 'Beiträge' },
  { id: 'videos', label: 'Videos' },
  { id: 'begriffe', label: 'Begriffe' },
  { id: 'haltung', label: 'Haltung' },
  { id: 'termin', label: 'Termin' },
]
