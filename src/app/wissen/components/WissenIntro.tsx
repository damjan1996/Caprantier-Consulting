'use client'

import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './wissen.module.css'

/**
 * Einstieg der Wissensseite.
 *
 * Kein Schaubild — hier gibt es nichts vorzuführen, was die Seite selbst
 * behauptet; die Belege sind die Texte eine Ebene tiefer. Statt eines Bildes,
 * das nichts zeigt, trägt der Einstieg das Abschnittsgerüst der Grundlage
 * (Designleitfaden § 9.1, Familien-Einstieg).
 *
 * Auch **kein Aufruf zum Buchen.** Wer auf dieser Seite ankommt, will lesen,
 * nicht kaufen; ein Terminknopf über der Beitragsliste stünde im Weg. Der eine
 * Aufruf der Seite steht im Abschluss, dort wo er hingehört.
 *
 * Die Zahlen in der Merkmalszeile werden übergeben, nicht abgetippt: Sie
 * ändern sich mit jedem neuen Beitrag und jedem neuen Begriff.
 */
export default function WissenIntro({
  beitraege,
  begriffe,
}: {
  beitraege: number
  begriffe: number
}) {
  const { ref, isIn } = useReveal<HTMLElement>()

  return (
    <section id="einstieg" ref={ref} className={styles.intro} aria-labelledby="intro-title">
      <Breadcrumbs items={[{ label: 'Wissen' }]} />

      <div className={styles.sectionHead}>
        <div className={styles.sectionHeadCopy}>
          <div
            className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
          >
            Beiträge, Videos, Begriffe
          </div>

          <h1
            id="intro-title"
            className={`${styles.introTitle} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.08s' } as React.CSSProperties}
          >
            Was wir über Kaltakquise wissen, steht hier – nicht hinter einem Formular.
          </h1>
        </div>

        <p
          className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Alles zu B2B-Vertrieb, Telefonakquise und Leadgenerierung an einer Stelle. Ohne
          Registrierung, ohne Newsletter-Zwang, ohne Download.
        </p>
      </div>

      <div
        className={`${styles.introMeta} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--rd': '0.24s' } as React.CSSProperties}
      >
        <span>{beitraege} Beiträge</span>
        <span className={styles.dot} aria-hidden="true" />
        <span>{begriffe} Begriffe</span>
        <span className={styles.dot} aria-hidden="true" />
        <span>Videos aus der laufenden Arbeit</span>
      </div>
    </section>
  )
}
