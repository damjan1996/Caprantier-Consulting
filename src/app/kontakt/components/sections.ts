import type { RailSection } from '@/app/components/seite/SectionRail'

/**
 * Die Abschnitte der Kontaktseite für die Fortschrittsleiste.
 *
 * Wer hier einen Eintrag ergänzt, muss dieselbe `id` am zugehörigen
 * `<section>` setzen — die Leiste überspringt still, was sie im Dokument
 * nicht findet.
 */
export const KONTAKT_SECTIONS: RailSection[] = [
  { id: 'einstieg', label: 'Einstieg' },
  { id: 'wege', label: 'Drei Wege' },
  { id: 'abgrenzung', label: 'Wofür nicht' },
  { id: 'formular', label: 'Formular' },
  { id: 'danach', label: 'Danach' },
  { id: 'termin', label: 'Termin' },
]
