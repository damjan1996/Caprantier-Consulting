import type { RailSection } from '@/app/components/seite/SectionRail'

/**
 * Die Abschnitte der Leistungsseite für die Fortschrittsleiste.
 *
 * Wer hier einen Eintrag ergänzt, muss dieselbe `id` am zugehörigen
 * `<section>` setzen — die Leiste überspringt still, was sie im Dokument
 * nicht findet.
 *
 * Fünf Einträge, also einer weniger als die Faustregel im Baukasten (§ 7)
 * nennt. Ausschlaggebend war nicht die Zahl, sondern die Länge: Die Seite
 * misst knapp sechzehn Bildschirmhöhen, davon drei Klebe-Bühnen, die
 * einander ähnlich sehen. Genau dort hilft die Leiste.
 */
export const LEISTUNGEN_SECTIONS: RailSection[] = [
  { id: 'einstieg', label: 'Einstieg' },
  { id: 'leistungen', label: 'Leistungen' },
  { id: 'preise', label: 'Modelle' },
  { id: 'regionen', label: 'Regionen' },
  { id: 'termin', label: 'Termin' },
]
