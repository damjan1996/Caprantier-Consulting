'use client'

import type { CaseStudy } from '@/lib/case-studies'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './referenzen.module.css'

/**
 * „Die Vorlage“ — die Anatomie eines Eintrags, gestrichelt.
 *
 * Die frühere Fassung zeigte das Blindmuster als fertig aussehende Karte mit
 * einem Warnkasten darüber. Das ist die falsche Reihenfolge: Erst sieht man
 * eine Fallstudie, dann liest man, dass sie keine ist. Hier ist es umgekehrt —
 * die Darstellung selbst sagt es. Gestrichelte Linien kommen auf dieser
 * Website ausschließlich in diesem Abschnitt vor und bedeuten genau eines:
 * noch nicht echt.
 *
 * Der Designleitfaden § 7.5 nennt den Grundsatz dahinter: „Ein leerer Zustand
 * ist auch ein Zustand.“ Ein sichtbares Formular erklärt sich selbst; ein
 * leerer Abschnitt sieht aus wie ein Fehler.
 *
 * Die Felder kommen aus dem Blindmuster in `src/lib/case-studies.ts`. Solange
 * dort `istBeispiel: true` steht, ist die ganze Seite `noindex` — die Kopplung
 * erzwingt `scripts/check-compliance.mjs`, sie wird hier nicht nachgebaut.
 */
export default function VorlageSection({ beispiel }: { beispiel: CaseStudy | undefined }) {
  const { ref, isIn } = useReveal<HTMLElement>()

  if (!beispiel) return null

  return (
    <section id="vorlage" ref={ref} className={styles.section} aria-labelledby="vorlage-title">
      <div className={styles.vorlageHead}>
        <div
          className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
        >
          Die Vorlage
        </div>

        <h2
          id="vorlage-title"
          className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.08s' } as React.CSSProperties}
        >
          So sieht ein Eintrag aus, sobald es einen gibt.
        </h2>

        <p
          className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Sechs Felder, jedes einzeln belegbar. Was Sie unten sehen, ist ein Blindmuster ohne
          realen Hintergrund – deshalb ist diese Seite von der Suchindexierung ausgenommen.
        </p>
      </div>

      <div
        className={`${styles.vorlage} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '20px', '--rd': '0.22s' } as React.CSSProperties}
      >
        <span className={styles.vorlageMarke}>Blindmuster – kein reales Projekt</span>

        <div className={styles.vorlageFeld}>
          <span className={styles.vorlageLabel}>Einordnung</span>
          <p className={styles.vorlageWert}>
            {beispiel.branche} · {beispiel.unternehmensgroesse} · {beispiel.region}
          </p>
        </div>

        <div className={styles.vorlageFeld}>
          <span className={styles.vorlageLabel}>Ausgangslage</span>
          <p className={styles.vorlageWert}>{beispiel.ausgangslage}</p>
        </div>

        <div className={styles.vorlageFeld}>
          <span className={styles.vorlageLabel}>Zeitraum</span>
          <p className={styles.vorlageWert}>{beispiel.zeitraum}</p>
        </div>

        <div className={styles.vorlageFeld}>
          <span className={styles.vorlageLabel}>Vorgehen</span>
          <ul className={styles.vorlageListe}>
            {beispiel.massnahme.map((schritt) => (
              <li key={schritt}>{schritt}</li>
            ))}
          </ul>
        </div>

        <div className={styles.vorlageFeld}>
          <span className={styles.vorlageLabel}>Ergebnis</span>
          <div className={styles.vorlageZahlen}>
            {beispiel.ergebnisse.map((ergebnis) => (
              <div key={ergebnis.label} className={styles.vorlageZahl}>
                <span className={styles.vorlageZahlWert}>{ergebnis.wert}</span>
                <span className={styles.vorlageZahlLabel}>{ergebnis.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.vorlageFeld}>
          <span className={styles.vorlageLabel}>Erkenntnis</span>
          <p className={styles.vorlageWert}>{beispiel.erkenntnis}</p>
        </div>

        {/* Die Freigabezeile steht offen: Sie ist der Grund, warum es den
            Eintrag noch nicht gibt. */}
        <div className={styles.vorlageFreigabe}>
          <span>Schriftlich freigegeben am</span>
          <span className={styles.vorlagePlatz} aria-hidden="true" />
          <span>ausstehend</span>
        </div>
      </div>

      <p
        className={`${styles.vorlageNote} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--rd': '0.3s' } as React.CSSProperties}
      >
        Zwei bis drei anonymisierte, aber reale Fälle mit Zahlen aus abgeschlossenen Projekten
        sind der stärkste einzelne Vertrauensbeleg, den diese Website bekommen kann. Bis es ihn
        gibt, bleibt dieser Platz leer statt gefüllt.
      </p>
    </section>
  )
}
