import type { RailSection } from '@/app/components/seite/SectionRail'

/**
 * Die Abschnitte der Kaltakquise-Stadtseiten für die Fortschrittsleiste.
 *
 * Wer hier einen Eintrag ergänzt, muss dieselbe `id` am zugehörigen
 * `<section>` setzen — die Leiste überspringt still, was sie im Dokument
 * nicht findet.
 *
 * Sechs Einträge über gut dreizehn Bildschirmhöhen: beide Bedingungen der
 * Faustregel im Baukasten § 7 sind erfüllt.
 */
export const KALTAKQUISE_SECTIONS: RailSection[] = [
  { id: 'einstieg', label: 'Einstieg' },
  { id: 'markt', label: 'Markt' },
  { id: 'recht', label: 'Recht' },
  { id: 'fragen', label: 'Fragen' },
  { id: 'umgebung', label: 'Umgebung' },
  { id: 'termin', label: 'Termin' },
]
