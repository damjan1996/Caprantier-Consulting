'use client'

import { businessInfo } from '@/lib/local-seo'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './referenzen.module.css'

/**
 * Abschluss — dunkle Karte, aber **im Fluss statt auf einer Bühne**.
 *
 * Als einzige der umgestellten Seiten. Eine Klebe-Bühne über vier
 * Bildschirmhöhen wäre auf einer Seite von knapp sieben mehr als die halbe
 * Strecke — und es gibt hier nichts, was sich beim Scrollen entwickelt. Der
 * Designleitfaden § 5.2 nennt genau das als Bedingung: Ohne Einträge, die
 * nacheinander ihren Moment bekommen, ist die Bühne Mechanik ohne Anlass.
 *
 * Der Aufruf selbst bleibt der des Hauses: „Erstgespräch buchen“, 15 Minuten,
 * über `useCalendly()`. Die frühere Fassung verwies auf `/kontakt` — ein
 * Umweg, der auf jeder anderen Seite nicht gegangen wird.
 */
export default function AbschlussSection() {
  const { openCalendly, onHover } = useCalendly()
  const { ref, isIn } = useReveal<HTMLElement>()

  return (
    <section id="termin" ref={ref} className={styles.section} aria-labelledby="termin-title">
      <div
        className={`${styles.abschlussCard} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '28px' } as React.CSSProperties}
      >
        <div
          className={`${styles.eyebrow} ${styles.abschlussEyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.1s' } as React.CSSProperties}
        >
          Der nächste Schritt
        </div>

        <h2
          id="termin-title"
          className={`${styles.abschlussTitle} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Das Erstgespräch ist die ehrlichere Auskunft.
        </h2>

        <p
          className={`${styles.abschlussText} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.22s' } as React.CSSProperties}
        >
          Dort erfahren Sie, für welche Zielgruppen wir funktionieren und für welche nicht –
          konkreter, als eine Fallstudie es je sein könnte.
        </p>

        <div
          className={`${styles.actionRow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.3s' } as React.CSSProperties}
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
          <a
            href={`mailto:${businessInfo.emailGeneral}`}
            className={`${styles.textLink} ${styles.abschlussMailLink}`}
          >
            Lieber schreiben? {businessInfo.emailGeneral}
          </a>
        </div>

        <div
          className={`${styles.abschlussMeta} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.38s' } as React.CSSProperties}
        >
          <span>Unverbindlich &amp; kostenlos</span>
          <span className={styles.dot} aria-hidden="true" />
          <span>Direkt mit dem Gründer</span>
          <span className={styles.dot} aria-hidden="true" />
          <span>Nur 5 Kunden pro Monat</span>
        </div>
      </div>
    </section>
  )
}
