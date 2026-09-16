'use client'

import { useRef } from 'react'
import { useReveal } from '@/app/components/seite/useReveal'
import { useScrollScene } from '@/app/components/seite/useScrollScene'
import { abschnittsFortschritt, eintragsAnteil } from './fortschritt'
import styles from './referenzen.module.css'

/**
 * „Der Maßstab“ — das Register, auf dunkler Karte.
 *
 * Zwei Spalten, getrennt durch eine senkrechte Linie: was veröffentlicht wird
 * und was nicht. Dieses Bauteil gibt es sonst nirgends auf der Website, und es
 * ist hier kein Schmuck — es **ist** der Inhalt der Seite. Solange keine
 * freigegebene Fallstudie vorliegt, ist die einzige belastbare Auskunft, nach
 * welchem Maßstab hier veröffentlicht würde.
 *
 * Die rechte Spalte ist die wichtigere. Sie nennt, was auf Referenzseiten
 * üblich ist und hier trotzdem nicht steht — und der letzte Punkt darin ist
 * der Grund, aus dem die Vorgängerseite unter `/case-studies` entfernt werden
 * musste. `scripts/check-compliance.mjs` hält diesen Pfad bis heute gesperrt.
 *
 * Keine Bühne: zwei Listen zum Vergleich gehören nebeneinander
 * (Designleitfaden § 5.2). Die dunkle Karte steht weit vorn und nicht
 * unmittelbar vor dem Abschluss — zwei dunkle Flächen dürfen nicht
 * aneinandergrenzen (§ 2.2).
 *
 * ## Die Scroll-Bindung
 *
 * Das Register **schreibt sich**, während der Abschnitt vorbeiläuft: acht
 * Zeilen, erst die linke Spalte von oben nach unten, dann die rechte, und die
 * Trennlinie zieht sich dabei mit. Der Reihenfolge nach DOM-Position und nicht
 * abwechselnd — gestapelt unter 860px stünden die Spalten sonst untereinander,
 * und die Zeilen erschienen im Zickzack.
 *
 * Das ist bewusst **keine** Bühne: Nichts klebt, nichts wird an Ort und Stelle
 * ausgetauscht, der Abschnitt scrollt normal vorbei. Die Zeilen überlappen
 * beim Erscheinen, damit es wie eine geschriebene Liste aussieht und nicht wie
 * acht Schaltvorgänge.
 *
 * Geschrieben wird je Frame direkt ins DOM, nicht über `setState` — ein
 * Zustandswechsel pro Frame würde den Abschnitt sechzigmal je Sekunde neu
 * rendern (Baukasten § 5.2).
 */
const VEROEFFENTLICHT = [
  'Zahlen aus dem Projektverlauf, nicht aus der Erinnerung',
  'Die schriftliche Freigabe des Kunden, mit Datum',
  'Branche, Größe und Region statt eines Firmennamens',
  'Auch das, was im Projekt nicht funktioniert hat',
]

const NICHT_VEROEFFENTLICHT = [
  'Kumulierte Abschlusssummen ohne nachprüfbare Quelle',
  'Kundenstimmen, die so niemand gesagt hat',
  'Sternebewertungen und Bewertungs-Markup',
  'Ein Firmenname neben einer Zahl, die er nicht freigegeben hat',
]

export default function MassstabSection() {
  const { ref: einblendRef, isIn } = useReveal<HTMLElement>()

  const sectionRef = useRef<HTMLElement | null>(null)
  const zeilenRef = useRef<HTMLLIElement[]>([])
  const trennerRef = useRef<HTMLSpanElement>(null)

  /* Beide Haken brauchen dasselbe Element: `useReveal` blendet die Karte ein,
     `useScrollScene` treibt die Zeilen darin. */
  const setzeAbschnitt = (element: HTMLElement | null) => {
    sectionRef.current = element
    einblendRef.current = element
  }

  const merkeZeile = (index: number) => (element: HTMLLIElement | null) => {
    if (element) zeilenRef.current[index] = element
  }

  const anzahl = VEROEFFENTLICHT.length + NICHT_VEROEFFENTLICHT.length

  useScrollScene(sectionRef, {
    measure: () => abschnittsFortschritt(sectionRef.current),
    apply: (fortschritt) => {
      if (trennerRef.current) {
        trennerRef.current.style.transform = `scaleY(${fortschritt.toFixed(3)})`
      }
      zeilenRef.current.forEach((zeile, index) => {
        if (!zeile) return
        const anteil = eintragsAnteil(fortschritt, index, anzahl)
        zeile.style.opacity = anteil.toFixed(3)
        zeile.style.transform = `translateY(${((1 - anteil) * 8).toFixed(2)}px)`
      })
    },
  })

  return (
    <section
      id="massstab"
      ref={setzeAbschnitt}
      className={styles.section}
      aria-labelledby="massstab-title"
    >
      <div
        className={`${styles.registerCard} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '28px' } as React.CSSProperties}
      >
        <div className={styles.registerHead}>
          <div
            className={`${styles.eyebrow} ${styles.registerEyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.1s' } as React.CSSProperties}
          >
            Der Maßstab
          </div>

          <h2
            id="massstab-title"
            className={`${styles.registerTitle} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.16s' } as React.CSSProperties}
          >
            Was hier steht – und was nie hier stehen wird.
          </h2>

          <p
            className={`${styles.registerText} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.22s' } as React.CSSProperties}
          >
            Zwei Listen, und die rechte ist die wichtigere. Sie nennt, was auf Referenzseiten
            üblich ist und was wir trotzdem nicht schreiben.
          </p>
        </div>

        {/* Keine Einblendung auf dem Gitter: Die Zeilen darin hängen am
            Scrollstand, und zwei Tempi übereinander ziehen nach. `data-fade-in`
            steht an den Zeilen selbst — ohne JavaScript sind sie damit
            sichtbar (noscript-Regel im Layout). */}
        <div className={styles.registerGrid}>
          <span ref={trennerRef} className={styles.registerTrenner} aria-hidden="true" />

          <div className={styles.registerSpalte}>
            <span className={styles.registerSpaltenTitel}>Wird veröffentlicht</span>
            <ul className={styles.registerListe}>
              {VEROEFFENTLICHT.map((punkt, index) => (
                <li key={punkt} ref={merkeZeile(index)} data-fade-in="">
                  {punkt}
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles.registerSpalte} ${styles.registerSpalteNein}`}>
            <span className={styles.registerSpaltenTitel}>Wird nicht veröffentlicht</span>
            <ul className={styles.registerListe}>
              {NICHT_VEROEFFENTLICHT.map((punkt, index) => (
                <li
                  key={punkt}
                  ref={merkeZeile(VEROEFFENTLICHT.length + index)}
                  data-fade-in=""
                >
                  {punkt}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          className={`${styles.registerNote} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.38s' } as React.CSSProperties}
        >
          Der letzte Punkt rechts ist keine Stilfrage, sondern § 5 UWG. An genau ihm ist die
          frühere Fallstudienseite dieses Projekts gescheitert – sie stand mit erfundenen
          Firmennamen und Kennzahlen im Suchindex und wurde entfernt.
        </p>
      </div>
    </section>
  )
}
