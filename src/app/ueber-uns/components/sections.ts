import type { RailSection } from '@/app/components/seite/SectionRail'

/**
 * Die Abschnitte der Seite „Über uns“ für die Fortschrittsleiste.
 *
 * Wer hier einen Eintrag ergänzt, muss dieselbe `id` am zugehörigen
 * `<section>` setzen — die Leiste überspringt still, was sie im Dokument
 * nicht findet.
 */
export const UEBER_UNS_SECTIONS: RailSection[] = [
  { id: 'einstieg', label: 'Einstieg' },
  { id: 'herkunft', label: 'Herkunft' },
  { id: 'zusagen', label: 'Zusagen' },
  { id: 'grenze', label: 'Grenze' },
  { id: 'haus', label: 'Unternehmen' },
  { id: 'termin', label: 'Termin' },
]
