'use client'

import Link from 'next/link'
import { industryPages } from '@/lib/industries'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './branchen.module.css'

/**
 * Die beiden Branchenseiten — der Wegweiser.
 *
 * Ohne diese Übersicht hätten die Branchenseiten kaum eingehende interne
 * Verweise. Genau dieser Zustand ist im Blog die belegte Ursache dafür
 * gewesen, dass 40 von 52 Beiträgen nie indexiert wurden
 * (`docs/ap1-indexierung-befund.md`).
 *
 * Zwei Karten statt fünfzehn wie auf `/kaltakquise`: Der Wegweiser darf hier
 * kurz sein, dafür sagen die Karten mehr als einen Namen. Kein Kachelfeld,
 * keine Bühne — man wählt hier zwischen zwei Dingen, das geht nebeneinander
 * (Designleitfaden § 5.2).
 *
 * Die Karten entstehen als Schleife über `industryPages`;
 * `scripts/check-internal-links.mjs` sucht genau diese Form.
 */
export default function WegweiserSection() {
  const { ref, isIn } = useReveal<HTMLElement>()

  return (
    <section id="branchen" ref={ref} className={styles.section} aria-labelledby="branchen-title">
      <div className={styles.wegHead}>
        <div
          className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
        >
          Die Branchen
        </div>

        <h2
          id="branchen-title"
          className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.08s' } as React.CSSProperties}
        >
          Zwei Märkte, für die wir ein eigenes Gesprächsgerüst haben.
        </h2>

        <p
          className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Personaldienstleistung und IT-Dienstleistung. Beide verkaufen an Entscheider, die
          täglich angerufen werden – und beide brauchen dafür einen anderen ersten Satz.
        </p>
      </div>

      <div
        className={`${styles.wegGrid} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '20px', '--rd': '0.22s' } as React.CSSProperties}
      >
        {industryPages.map((industry) => (
          <Link
            key={industry.slug}
            href={`/branchen/${industry.slug}`}
            className={styles.wegCard}
          >
            <span className={styles.wegKicker}>{industry.kicker}</span>
            <h3 className={styles.wegTitel}>{industry.headline}</h3>
            <p className={styles.wegText}>{industry.summary}</p>
            <span className={styles.wegMehr}>Zur Branchenseite</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
