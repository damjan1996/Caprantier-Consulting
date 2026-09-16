/**
 * Datenmodell und Bestand der Fallstudien.
 *
 * ## Vorgeschichte, die den Zuschnitt erklärt
 *
 * Unter `src/app/case-studies/` gab es schon einmal eine Fallstudienseite. Sie
 * wurde entfernt, weil Firmennamen, Zitate und Kennzahlen erfunden waren --
 * irreführend im Sinne des § 5 UWG. `scripts/check-compliance.mjs` bricht den
 * Build bis heute ab, wenn dieses Verzeichnis wieder auftaucht. Diese Sperre
 * bleibt bestehen und wird hier nicht umgangen: Die neue Route heißt
 * `/referenzen`, und sie ist an eine eigene Regel gebunden (siehe unten).
 *
 * ## Was hier zulässig ist
 *
 * - `istBeispiel: true` -- eine Fallstudie, die ausschließlich das Layout
 *   demonstriert. Sie trägt keinen Kundennamen, ist auf der Seite deutlich als
 *   Beispiel markiert, und solange auch nur eine davon im Bestand ist, steht
 *   die gesamte Route auf `noindex`. Das erzwingt `scripts/check-compliance.mjs`.
 * - `istBeispiel: false` -- eine echte Fallstudie. Sie darf nur aufgenommen
 *   werden, wenn `freigegebenAm` gesetzt ist, also eine schriftliche Freigabe
 *   des Kunden vorliegt.
 *
 * ## Was hier niemals zulässig ist
 *
 * Kein `aggregateRating`, kein `Review`-Markup, keine Sternebewertung -- auch
 * nicht auskommentiert. Das Compliance-Skript prüft den Quelltext, nicht das
 * Rendering. Bewertungs-Markup darf erst zurückkehren, wenn es echte,
 * freigegebene und auf der Seite sichtbare Kundenstimmen gibt.
 *
 * ## Was fehlt
 *
 * Echte Inhalte. Zwei bis drei anonymisierte, aber reale Fälle mit Zahlen aus
 * abgeschlossenen Projekten sind der stärkste einzelne Vertrauenshebel, den
 * diese Website bekommen kann -- siehe `docs/aufgaben-nico.md`, Punkt 4.
 */

export interface CaseStudyErgebnis {
  label: string
  wert: string
}

export interface CaseStudy {
  slug: string
  /** Branche des Kunden, anonymisiert ausreichend. */
  branche: string
  /** Etwa "45 Mitarbeiter". */
  unternehmensgroesse: string
  /** Region, damit der Fall lokal einzuordnen ist. */
  region: string
  /** Die Lage vor Projektbeginn. */
  ausgangslage: string
  /** Etwa "8 Wochen Pilotprojekt". */
  zeitraum: string
  /** Was konkret gemacht wurde. */
  massnahme: string[]
  /** Messbare Ergebnisse. */
  ergebnisse: CaseStudyErgebnis[]
  /** Was der Fall über die Zahlen hinaus gezeigt hat. */
  erkenntnis: string
  /** Darf der Kundenname genannt werden? Nur mit schriftlicher Freigabe. */
  kundeNennbar: boolean
  /** Kundenname -- ausschließlich, wenn `kundeNennbar` gesetzt ist. */
  kundenname?: string
  /** Datum der schriftlichen Freigabe. Pflicht für jede echte Fallstudie. */
  freigegebenAm?: string
  /**
   * Kennzeichnet eine reine Layout-Demonstration ohne realen Hintergrund.
   *
   * Solange auch nur eine Fallstudie dieses Merkmal trägt, steht `/referenzen`
   * auf `noindex`. Das ist keine Empfehlung, sondern eine Regel im
   * Compliance-Gate.
   */
  istBeispiel: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'beispiel-it-systemhaus',
    branche: 'IT-Systemhaus',
    unternehmensgroesse: 'Beispielwert',
    region: 'Beispielwert',
    ausgangslage:
      'Diese Fallstudie ist ein Blindmuster und beschreibt kein reales Projekt. Sie steht hier, damit Aufbau, Felder und Darstellung geprüft werden können, bevor echte Inhalte vorliegen. Alle Angaben sind Platzhalter.',
    zeitraum: 'Beispielwert',
    massnahme: [
      'Hier stehen später die tatsächlich durchgeführten Schritte.',
      'Zielgruppenzuschnitt, Auswahlkriterium, Ansprache, Qualifizierung.',
      'Jeder Punkt belegbar aus dem Projektverlauf.',
    ],
    ergebnisse: [
      { label: 'Entscheidertermine', wert: 'Beispielwert' },
      { label: 'Zeitraum', wert: 'Beispielwert' },
      { label: 'Wahrnehmungsquote', wert: 'Beispielwert' },
    ],
    erkenntnis:
      'An dieser Stelle steht später, was das Projekt über die Zielgruppe gezeigt hat – der Teil, der einem Leser mehr sagt als jede Ergebniszahl.',
    kundeNennbar: false,
    istBeispiel: true,
  },
]

/** Fallstudien, die veröffentlicht werden dürfen: real und schriftlich freigegeben. */
export function getEchteFallstudien(): CaseStudy[] {
  return caseStudies.filter((fall) => !fall.istBeispiel && Boolean(fall.freigegebenAm))
}

export function getBeispielFallstudien(): CaseStudy[] {
  return caseStudies.filter((fall) => fall.istBeispiel)
}

/**
 * Steht mindestens ein Blindmuster im Bestand, darf die Seite nicht in den
 * Index. Diese Funktion ist die einzige Quelle für diese Entscheidung --
 * Route und Compliance-Skript lesen beide von hier.
 */
export function enthaeltBeispiele(): boolean {
  return caseStudies.some((fall) => fall.istBeispiel)
}

export function getFallstudieBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((fall) => fall.slug === slug)
}
