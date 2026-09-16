'use client'

import Link from 'next/link'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './kontakt.module.css'

/**
 * „Wofür nicht“ — im Fluss, auf dunkler Karte.
 *
 * Die Abgrenzung dieser Seite, und sie geht auf eigene Kosten: Eine Agentur,
 * die Kaltakquise verkauft, bittet darum, nicht kalt angeschrieben zu werden.
 * Das ist kein Widerspruch, sondern dieselbe Regel in beide Richtungen —
 * Werbe-E-Mails brauchen die vorherige ausdrückliche Einwilligung des
 * Adressaten (§ 7 Abs. 2 Nr. 2 UWG), während ein Anruf gegenüber Unternehmen
 * schon mit einer mutmaßlichen Einwilligung zulässig sein kann
 * (§ 7 Abs. 2 Nr. 1 UWG). Der Unterschied ist der Grund, warum diese Agentur
 * telefoniert und nicht mailt.
 *
 * Der Abschnitt steht **vor** dem Formular, nicht dahinter: Wer sich hier
 * wiedererkennt, soll nicht erst tippen. Zugleich trennt er die dunkle Karte
 * vom dunklen Abschluss (Designleitfaden § 2.2).
 *
 * Keine Bühne: Die drei Blöcke gehören zum Vergleich nebeneinander.
 */
const BLOECKE = [
  {
    label: 'Vertriebs- und Agenturangebote',
    text: 'Werden nicht beantwortet. Werbung per E-Mail ohne vorherige ausdrückliche Einwilligung ist unzulässig – gegenüber uns genauso wie gegenüber Ihren Zielkunden.',
  },
  {
    label: 'Bewerbungen',
    text: 'Offene Stellen schreiben wir aus, sobald es welche gibt. Im selben Postfach wie Kundenanfragen geht eine Initiativbewerbung unter, und das ist niemandem geholfen.',
  },
  {
    label: 'Anfragen von Privatpersonen',
    text: 'Wir arbeiten ausschließlich zwischen Unternehmen. Privatpersonen rufen wir nicht an und haben ihnen auch nichts anzubieten.',
  },
]

export default function AbgrenzungSection() {
  const { ref, isIn } = useReveal<HTMLElement>()

  return (
    <section
      id="abgrenzung"
      ref={ref}
      className={styles.section}
      aria-labelledby="abgrenzung-title"
    >
      <div
        className={`${styles.abgrenzungCard} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '28px' } as React.CSSProperties}
      >
        <div className={styles.abgrenzungHead}>
          <div
            className={`${styles.eyebrow} ${styles.abgrenzungEyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.1s' } as React.CSSProperties}
          >
            Wofür nicht
          </div>

          <h2
            id="abgrenzung-title"
            className={`${styles.abgrenzungTitle} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.16s' } as React.CSSProperties}
          >
            Auch wir bekommen Kaltakquise. Über dieses Formular bitte nicht.
          </h2>

          <p
            className={`${styles.abgrenzungText} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.22s' } as React.CSSProperties}
          >
            Das ist kein Witz auf eigene Kosten, sondern dieselbe Regel in beide Richtungen:
            Werbung per E-Mail setzt die vorherige ausdrückliche Einwilligung des Adressaten
            voraus (§ 7 Abs. 2 Nr. 2 UWG). Beim Telefonanruf gegenüber einem Unternehmen kann
            eine mutmaßliche Einwilligung genügen (§ 7 Abs. 2 Nr. 1 UWG). Genau dieser
            Unterschied ist der Grund, warum wir telefonieren und nicht mailen.
          </p>
        </div>

        <div
          className={`${styles.abgrenzungGrid} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--ry': '22px', '--rd': '0.3s' } as React.CSSProperties}
        >
          {BLOECKE.map((block) => (
            <div key={block.label} className={styles.abgrenzungBlock}>
              <span className={styles.abgrenzungBlockLabel}>{block.label}</span>
              <p className={styles.abgrenzungBlockText}>{block.text}</p>
            </div>
          ))}
        </div>

        <p
          className={`${styles.abgrenzungNote} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.38s' } as React.CSSProperties}
        >
          Allgemeine Einordnung, keine Rechtsberatung. Die ausführliche Fassung mit Quellen steht
          im Beitrag zu den rechtlichen Grundlagen.
        </p>

        <div
          className={`${styles.actionRow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.44s' } as React.CSSProperties}
        >
          <Link
            href="/blog/kaltakquise-rechtliche-grundlagen"
            className={`${styles.textLink} ${styles.closeMailLink}`}
          >
            Rechtliche Grundlagen im Detail
          </Link>
          <Link href="/leistungen" className={`${styles.textLink} ${styles.closeMailLink}`}>
            Was wir übernehmen
          </Link>
        </div>
      </div>
    </section>
  )
}
