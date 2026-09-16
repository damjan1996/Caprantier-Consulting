'use client'

import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { businessInfo } from '@/lib/local-seo'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './kontakt.module.css'

/**
 * Einstieg der Kontaktseite.
 *
 * Kein Schaubild — hier gilt § 7 rückwärts, wie auf den Familien-Einstiegen:
 * Es gibt nichts vorzuführen, was die Seite behauptet, und die drei Wege
 * stehen unmittelbar darunter. Ein Bild dazwischen würde sie nur nach unten
 * schieben.
 *
 * Der blaue Knopf steht hier und **nicht** ein zweites Mal in der
 * Wege-Karte. Wer auf dieser Seite ankommt, will Kontakt aufnehmen; der
 * schnellste Weg gehört deshalb nach oben. Die Karte darunter wiederholt ihn
 * in dunkel, damit im selben Bild nicht zwei blaue Knöpfe stehen
 * (Designleitfaden § 2.1).
 */
export default function KontaktIntro() {
  const { openCalendly, onHover } = useCalendly()
  const { ref, isIn } = useReveal<HTMLElement>()

  return (
    <section id="einstieg" ref={ref} className={styles.intro} aria-labelledby="intro-title">
      <Breadcrumbs items={[{ label: 'Kontakt' }]} />

      <div className={styles.sectionHead}>
        <div className={styles.sectionHeadCopy}>
          <div
            className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
          >
            Kontakt
          </div>

          <h1
            id="intro-title"
            className={`${styles.introTitle} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.08s' } as React.CSSProperties}
          >
            Drei Wege zu uns – und zu jedem steht, wie schnell eine Antwort kommt.
          </h1>
        </div>

        <p
          className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Erstgespräch, Nachricht oder Anruf. Welcher Weg der richtige ist, hängt davon ab, wie
          weit Sie sind – nicht davon, welchen wir lieber hätten.
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
        <span>Antwort innerhalb eines Werktags</span>
        <span className={styles.dot} aria-hidden="true" />
        <span>Montag bis Freitag, 9 bis 18 Uhr</span>
        <span className={styles.dot} aria-hidden="true" />
        <span>{businessInfo.address.city}, bundesweit</span>
      </div>
    </section>
  )
}
