/**
 * Fortschritt eines Abschnitts, während er durchs Fenster läuft.
 *
 * Liefert 0, wenn die Oberkante des Abschnitts bei 85 % der Fensterhöhe steht,
 * und 1, wenn seine Unterkante 15 % erreicht hat. Dazwischen linear.
 *
 * Das ist die Alternative zur Klebe-Bühne: Dort misst man die Scrollstrecke
 * einer Hülle, die `100vh` lang klebt, und die Szene steht still, während der
 * Fortschritt läuft. Hier scrollt der Abschnitt ganz normal vorbei, und der
 * Fortschritt sagt nur, wie weit er dabei ist. Nichts klebt, nichts wird
 * ausgetauscht — deshalb funktioniert die Formel auch für Abschnitte, die
 * kürzer sind als das Fenster.
 *
 * Gedacht für `useScrollScene`, das den Wert auf 0–1 begrenzt und glättet.
 *
 * Liegt bewusst neben der Seite und nicht in `seite/`: Bisher benutzen sie
 * zwei Abschnitte einer einzigen Seite. Wer die dritte Verwendung baut, zieht
 * sie in die Grundlage — dieselbe Schwelle wie beim Aufklappbereich
 * (Baukasten § 4.5).
 */
export function abschnittsFortschritt(element: HTMLElement | null): number {
  if (!element) return 0

  const rect = element.getBoundingClientRect()
  const start = window.innerHeight * 0.85
  const ende = window.innerHeight * 0.15
  const spanne = rect.height + (start - ende)

  return spanne > 4 ? (start - rect.top) / spanne : 1
}

/**
 * Der Anteil, den ein einzelner Eintrag vom Gesamtfortschritt hat.
 *
 * Die Einträge überlappen: Der nächste beginnt, bevor der vorige fertig ist.
 * Ohne Überlappung sieht die Folge aus wie acht einzelne Schaltvorgänge —
 * mit Überlappung wie eine Zeile, die geschrieben wird.
 */
export function eintragsAnteil(fortschritt: number, index: number, anzahl: number): number {
  const beginn = (index / Math.max(1, anzahl)) * 0.74
  const dauer = 0.26
  return Math.min(1, Math.max(0, (fortschritt - beginn) / dauer))
}
