'use client'

import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './referenzen.module.css'

/**
 * Einstieg der Referenzseite.
 *
 * Ein Aussage-Einstieg, kein Verkaufs-Einstieg: kein Aufruf zum Buchen hier
 * oben. Wer auf dieser Seite ankommt, sucht Belege und will zuerst wissen,
 * woran er ist. Der eine Aufruf der Seite steht im Abschluss.
 *
 * Statt der Merkmalszeile der anderen Seiten — dort steht eine Zusage — trägt
 * dieser Einstieg einen Kontostand: freigegebene Fälle, Blindmuster,
 * Indexierung. Alle drei Angaben werden übergeben und nicht abgetippt; sie
 * stammen aus `src/lib/case-studies.ts` und ändern sich mit dem Bestand.
 */
export default function ReferenzenIntro({
  freigegeben,
  beispiele,
  imIndex,
}: {
  freigegeben: number
  beispiele: number
  imIndex: boolean
}) {
  const { ref, isIn } = useReveal<HTMLElement>()

  const posten = [
    { wert: String(freigegeben), label: 'freigegebene Fallstudien' },
    { wert: String(beispiele), label: 'Blindmuster' },
    { wert: imIndex ? 'ja' : 'nein', label: 'im Suchindex' },
  ]

  return (
    <section id="einstieg" ref={ref} className={styles.intro} aria-labelledby="intro-title">
      <Breadcrumbs items={[{ label: 'Referenzen' }]} />

      <div
        className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
      >
        Referenzen
      </div>

      <h1
        id="intro-title"
        className={`${styles.introTitle} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--rd': '0.08s' } as React.CSSProperties}
      >
        Hier steht nur, was ein Kunde schriftlich freigegeben hat.
      </h1>

      <p
        className={`${styles.introText} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--rd': '0.16s' } as React.CSSProperties}
      >
        Das ist der Grund, warum diese Seite kürzer ist als bei Wettbewerbern, die kumulierte
        Abschlusssummen und Zufriedenheitsquoten ohne Quelle nennen.
      </p>

      <div
        className={`${styles.zaehler} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '14px', '--rd': '0.24s' } as React.CSSProperties}
      >
        {posten.map((eintrag) => (
          <div key={eintrag.label} className={styles.zaehlerPosten}>
            <span className={styles.zaehlerWert}>{eintrag.wert}</span>
            <span className={styles.zaehlerLabel}>{eintrag.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
