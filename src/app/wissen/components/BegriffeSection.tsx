'use client'

import Link from 'next/link'
import { glossarBegriffe } from '@/lib/glossar-content'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './wissen.module.css'

/**
 * Die Begriffe des Glossars — dichtes Kartenfeld.
 *
 * Alle Begriffe, nicht nur eine Auswahl: Wer hierherkommt, sucht ein
 * bestimmtes Wort, und eine Auswahl von fünf hilft genau dann nicht, wenn man
 * das sechste sucht. Fünfzehn Kurzkarten sind dafür kurz genug.
 *
 * Keine Bühne — Nachschlagewerk, kein Ablauf (Designleitfaden § 5.2).
 *
 * Die Begriffe kommen aus `src/lib/glossar-content.ts`, derselben Quelle wie
 * die Glossarseite und ihr `DefinedTermSet`-Markup. Bis zum 15.09.2026 standen
 * sie als Feld in `src/app/glossar/page.tsx`; ein zweiter Textstand hier wäre
 * beim ersten Redigieren still auseinandergelaufen (Baukasten § 8.3).
 */
export default function BegriffeSection() {
  const { ref, isIn } = useReveal<HTMLElement>()

  return (
    <section id="begriffe" ref={ref} className={styles.section} aria-labelledby="begriffe-title">
      <div className={styles.listHead}>
        <div
          className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
        >
          Begriffe
        </div>

        <h2
          id="begriffe-title"
          className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.08s' } as React.CSSProperties}
        >
          Die Abkürzungen des B2B-Vertriebs, in je zwei Sätzen erklärt.
        </h2>

        <p
          className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Von BANT über SDR bis Warmakquise. Im Glossar steht zu jedem Begriff die ausführliche
          Erklärung, bei einigen dazu der passende Beitrag.
        </p>
      </div>

      <div
        className={`${styles.begriffGrid} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '20px', '--rd': '0.22s' } as React.CSSProperties}
      >
        {glossarBegriffe.map((begriff) => (
          <Link
            key={begriff.id}
            href={`/glossar#${begriff.id}`}
            className={styles.begriffCard}
          >
            <span className={styles.begriffTop}>
              <h3 className={styles.begriffName}>{begriff.term}</h3>
              <span className={styles.begriffFach}>{begriff.category}</span>
            </span>
            <p className={styles.begriffText}>{begriff.shortDescription}</p>
          </Link>
        ))}
      </div>

      <div
        className={`${styles.listFoot} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--rd': '0.3s' } as React.CSSProperties}
      >
        <Link href="/glossar" className={styles.textLink}>
          Zum vollständigen Glossar
        </Link>
      </div>
    </section>
  )
}
