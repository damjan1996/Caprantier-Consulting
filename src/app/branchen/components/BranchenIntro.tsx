'use client'

import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './branchen.module.css'

/**
 * Einstieg der Branchenübersicht.
 *
 * Die Überschrift war vorher „Akquise mit Branchenschärfe“ — ein Schlagwort
 * im Nominalstil, das nichts behauptet. Der Satz, der die Seite trägt, stand
 * schon da, nur eine Zeile tiefer im Beschreibungstext: „Wer in jeder Branche
 * dasselbe sagt, klingt in jeder Branche gleich.“ Der gehört nach oben.
 *
 * Kein Schaubild daneben, wie auf den anderen Familien-Einstiegen: Die Belege
 * stehen eine Ebene tiefer, auf den Branchenseiten selbst.
 */
export default function BranchenIntro() {
  const { openCalendly, onHover } = useCalendly()
  const { ref, isIn } = useReveal<HTMLElement>()

  return (
    <section id="einstieg" ref={ref} className={styles.intro} aria-labelledby="intro-title">
      <Breadcrumbs items={[{ label: 'Branchen' }]} />

      <div className={styles.sectionHead}>
        <div className={styles.sectionHeadCopy}>
          <div
            className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
          >
            Branchenlösungen
          </div>

          <h1
            id="intro-title"
            className={`${styles.introTitle} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.08s' } as React.CSSProperties}
          >
            Wer in jeder Branche dasselbe sagt, klingt in jeder Branche gleich.
          </h1>
        </div>

        <p
          className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Für zwei Märkte, die wir besonders gut kennen, gibt es ein eigenes Vorgehen – von der
          Auswahl der Zielunternehmen bis zu den Fragen, die vor einem Termin geklärt sind.
        </p>
      </div>

      <div
        className={`${styles.actionRow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '14px', '--rd': '0.24s' } as React.CSSProperties}
      >
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={openCalendly}
          onMouseEnter={onHover}
        >
          <span>Erstgespräch buchen</span>
          <span className={styles.btnHint}>15 Min.</span>
        </button>
        <span className={styles.metaNote}>Kostenlos, direkt mit dem Gründer</span>
      </div>

      <div
        className={`${styles.introMeta} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--rd': '0.32s' } as React.CSSProperties}
      >
        <span>Unverbindlich</span>
        <span className={styles.dot} aria-hidden="true" />
        <span>Nur 5 Kunden pro Monat</span>
        <span className={styles.dot} aria-hidden="true" />
        <span>Erste Termine in 14 Tagen</span>
      </div>
    </section>
  )
}
