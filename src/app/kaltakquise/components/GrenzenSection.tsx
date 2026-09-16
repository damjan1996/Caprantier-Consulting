'use client'

import Link from 'next/link'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './uebersicht.module.css'

/**
 * „Wo wir aufhören“ — im Fluss, auf dunkler Karte.
 *
 * Jede Seite dieser Familie braucht eine Abgrenzung (Baukasten § 2.3). Auf den
 * Stadtseiten ist das der Rechtsrahmen nach § 7 Abs. 2 Nr. 1 UWG; hier auf der
 * Übersicht wäre eine sechzehnte Fassung desselben Textes Füllmaterial.
 *
 * Deshalb steht hier die **Praxisseite** derselben Sache: drei Dinge, die wir
 * nicht tun. Jede der drei trägt ihre Rechtsgrundlage in einem Halbsatz mit —
 * nie ohne Paragraphen, nie verkürzt auf „Kaltakquise ist im B2B erlaubt“
 * (Textleitfaden § 7.1). Die ausführliche Fassung steht im Beitrag, die
 * ortsbezogene auf der jeweiligen Stadtseite.
 *
 * Keine Bühne: Die drei gehören zum Vergleich nebeneinander
 * (Designleitfaden § 5.2).
 */
const GRENZEN = [
  {
    label: 'Privatpersonen',
    text: 'Wir rufen ausschließlich Unternehmen an. Gegenüber Verbrauchern verlangt § 7 Abs. 2 Nr. 1 UWG eine vorherige ausdrückliche Einwilligung – die haben wir nicht.',
  },
  {
    label: 'Gekaufte Adressen',
    text: 'Keine Liste ohne dokumentierten Anlass je Kontakt. Die Beweislast für die mutmaßliche Einwilligung liegt beim werbenden Unternehmen, nicht beim Adresshändler.',
  },
  {
    label: 'Vorgetäuschte Vorwahl',
    text: 'Wir rufen mit korrekt übermittelter Rufnummer an. Eine manipulierte Rufnummer ist ein eigenständiger Verstoß, den die Bundesnetzagentur verfolgt.',
  },
]

export default function GrenzenSection() {
  const { ref, isIn } = useReveal<HTMLElement>()

  return (
    <section id="grenzen" ref={ref} className={styles.section} aria-labelledby="grenzen-title">
      <div
        className={`${styles.grenzCard} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '28px' } as React.CSSProperties}
      >
        <div className={styles.grenzHead}>
          <div
            className={`${styles.eyebrow} ${styles.grenzEyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.1s' } as React.CSSProperties}
          >
            Wo wir aufhören
          </div>

          <h2
            id="grenzen-title"
            className={`${styles.grenzTitle} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.16s' } as React.CSSProperties}
          >
            Drei Dinge tun wir nicht – auch nicht auf Wunsch.
          </h2>

          <p
            className={`${styles.grenzText} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.22s' } as React.CSSProperties}
          >
            Kaltakquise ist gegenüber Unternehmen zulässig, wenn der Anruf einen sachlichen Bezug
            zu deren Geschäftstätigkeit hat. Drei Wege, auf denen sie es nicht mehr ist, kommen in
            Anfragen immer wieder vor – deshalb stehen sie hier und nicht im Kleingedruckten.
          </p>
        </div>

        <div
          className={`${styles.grenzGrid} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--ry': '22px', '--rd': '0.3s' } as React.CSSProperties}
        >
          {GRENZEN.map((grenze) => (
            <div key={grenze.label} className={styles.grenzBlock}>
              <span className={styles.grenzBlockLabel}>{grenze.label}</span>
              <p className={styles.grenzBlockText}>{grenze.text}</p>
            </div>
          ))}
        </div>

        <div
          className={`${styles.grenzFoot} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.38s' } as React.CSSProperties}
        >
          <p className={styles.grenzNote}>
            Allgemeine Einordnung, keine Rechtsberatung. Die ausführliche Fassung mit Quellen steht
            im Beitrag zu den rechtlichen Grundlagen.
          </p>
          <Link
            href="/blog/kaltakquise-rechtliche-grundlagen"
            className={`${styles.textLink} ${styles.grenzLink}`}
          >
            Rechtliche Grundlagen im Detail
          </Link>
        </div>
      </div>
    </section>
  )
}
