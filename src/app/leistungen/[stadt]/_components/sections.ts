import type { RailSection } from '@/components/seite/SectionRail'

/**
 * Die Abschnitte der Vertriebs-Stadtseiten für die Fortschrittsleiste.
 *
 * Wer hier einen Eintrag ergänzt, muss dieselbe `id` am zugehörigen
 * `<section>` setzen — die Leiste überspringt still, was sie im Dokument
 * nicht findet. Darauf verlässt sich „Vor Ort“: Der Abschnitt steht nur auf
 * Seiten mit Ortswissen und fehlt auf den übrigen ohne Lücke in der Leiste.
 */
export const STADT_SECTIONS: RailSection[] = [
  { id: 'einstieg', label: 'Einstieg' },
  { id: 'uebergabe', label: 'Übergabe' },
  { id: 'vor-ort', label: 'Vor Ort' },
  { id: 'region', label: 'Region' },
  { id: 'aufwand', label: 'Aufwand' },
  { id: 'fragen', label: 'Fragen' },
  { id: 'termin', label: 'Termin' },
]
