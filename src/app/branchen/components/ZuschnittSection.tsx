'use client'

import Link from 'next/link'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './branchen.module.css'

/**
 * „Der Zuschnitt“ — im Fluss, auf dunkler Karte.
 *
 * Die Abgrenzung dieser Seite, und eine ungewöhnliche: Sie erklärt, warum es
 * **nur zwei** Branchenseiten gibt. Die frühere Fassung hat das in einem
 * Nebensatz unter den Karten abgehandelt („Ihre Branche ist nicht dabei?“) —
 * dabei ist es die interessanteste Aussage der Seite. Eine Agentur, die nicht
 * für jede Branche eine Landingpage baut, sagt damit etwas über ihre Arbeit.
 *
 * Zugleich beantwortet der Abschnitt die Frage, die jeder stellt, dessen
 * Branche fehlt: Wird für mich genauso gearbeitet? Ja — nur ohne Etikett.
 *
 * Keine Bühne: Die drei Blöcke gehören zum Vergleich nebeneinander.
 */
const BLOECKE = [
  {
    label: 'Was wir sonst bearbeiten',
    text: 'Unternehmensberatungen, SaaS-Anbieter, Agenturen und technische Dienstleister – ohne eigene Seite, mit demselben Ablauf.',
  },
  {
    label: 'Warum keine Seite',
    text: 'Eine Branchenseite ohne eigene Erfahrung ist eine Textvariante. Genau daran ist der frühere Blog gescheitert, und dieselbe Falle gilt für Landingpages.',
  },
  {
    label: 'Wo es trotzdem steht',
    text: 'Der Fachbeitrag zum Branchenvergleich ordnet ein, was sich zwischen den Dienstleistungsarten unterscheidet – auch für Märkte ohne eigene Seite.',
  },
]

export default function ZuschnittSection() {
  const { ref, isIn } = useReveal<HTMLElement>()

  return (
    <section id="zuschnitt" ref={ref} className={styles.section} aria-labelledby="zuschnitt-title">
      <div
        className={`${styles.zuschnittCard} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '28px' } as React.CSSProperties}
      >
        <div className={styles.zuschnittHead}>
          <div
            className={`${styles.eyebrow} ${styles.zuschnittEyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.1s' } as React.CSSProperties}
          >
            Der Zuschnitt
          </div>

          <h2
            id="zuschnitt-title"
            className={`${styles.zuschnittTitle} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.16s' } as React.CSSProperties}
          >
            Zwei Branchenseiten. Nicht zwanzig.
          </h2>

          <p
            className={`${styles.zuschnittText} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.22s' } as React.CSSProperties}
          >
            Eine Branchenseite entsteht erst, wenn wir in diesem Markt genug Gespräche geführt
            haben, um etwas zu sagen, das nicht für jeden gilt. Für zwei Märkte ist das der Fall.
            Alle anderen bekommen keine eigene Seite, sondern dasselbe Vorgehen ohne Etikett.
          </p>
        </div>

        <div
          className={`${styles.zuschnittGrid} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--ry': '22px', '--rd': '0.3s' } as React.CSSProperties}
        >
          {BLOECKE.map((block) => (
            <div key={block.label} className={styles.zuschnittBlock}>
              <span className={styles.zuschnittBlockLabel}>{block.label}</span>
              <p className={styles.zuschnittBlockText}>{block.text}</p>
            </div>
          ))}
        </div>

        <div
          className={`${styles.zuschnittFoot} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.38s' } as React.CSSProperties}
        >
          <Link
            href="/blog/akquise-nach-branche-b2b-dienstleister"
            className={`${styles.textLink} ${styles.zuschnittLink}`}
          >
            Branchenvergleich im Fachbeitrag
          </Link>
          <Link href="/leistungen" className={`${styles.textLink} ${styles.zuschnittLink}`}>
            Was wir grundsätzlich übernehmen
          </Link>
        </div>
      </div>
    </section>
  )
}
