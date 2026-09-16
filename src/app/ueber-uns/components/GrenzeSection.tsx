'use client'

import Link from 'next/link'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './ueber-uns.module.css'

/**
 * „Die Grenze“ — im Fluss, auf dunkler Karte.
 *
 * Die Abgrenzung dieser Seite. Die Vorgängerfassung führte „max. 5 Kunden
 * gleichzeitig“ als Auszeichnung im Abschnitt „Unsere Mission“ — eine Zahl,
 * die dort wie ein Gütesiegel wirkte. Sie ist aber keine Auszeichnung,
 * sondern eine Einschränkung, und als solche gehört sie erklärt: Fünf ist
 * die Zahl, bei der die Einarbeitung noch gründlich ist.
 *
 * Damit steht sie auch nicht als künstliche Dringlichkeit da. Die Seite hat
 * an dieser Stelle einen echten Grund, und der wird genannt
 * (Textleitfaden § 10).
 *
 * Keine Bühne: Die drei Blöcke gehören zum Vergleich nebeneinander. Die
 * dunkle Karte steht zwei Abschnitte vor dem Abschluss, nicht unmittelbar
 * davor — zwei dunkle Flächen dürfen nicht aneinandergrenzen
 * (Designleitfaden § 2.2).
 */
const BLOECKE = [
  {
    label: 'Wofür wir nicht die Richtigen sind',
    text: 'Endkundengeschäft, Kundenwerte unter 10.000 € und alles, was auf Menge statt auf Qualifizierung zielt. Für Masse gibt es Call-Center, und die arbeiten günstiger.',
  },
  {
    label: 'Was das für Sie heißt',
    text: 'Ein Start ist nicht zu jedem Zeitpunkt möglich. Ist der Monat voll, nennen wir einen Termin – statt anzufangen und Sie warten zu lassen.',
  },
  {
    label: 'Woran wir das prüfen',
    text: 'Im Erstgespräch, vor jedem Angebot, in beide Richtungen. Denselben Test gibt es auf der Startseite zum Selbstausfüllen.',
  },
]

export default function GrenzeSection() {
  const { ref, isIn } = useReveal<HTMLElement>()

  return (
    <section id="grenze" ref={ref} className={styles.section} aria-labelledby="grenze-title">
      <div
        className={`${styles.grenzeCard} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '28px' } as React.CSSProperties}
      >
        <div className={styles.grenzeHead}>
          <div
            className={`${styles.eyebrow} ${styles.grenzeEyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.1s' } as React.CSSProperties}
          >
            Die Grenze
          </div>

          <h2
            id="grenze-title"
            className={`${styles.grenzeTitle} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.16s' } as React.CSSProperties}
          >
            Fünf Kunden im Monat. Das ist die Kapazität, nicht die Dringlichkeit.
          </h2>

          <p
            className={`${styles.grenzeText} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.22s' } as React.CSSProperties}
          >
            Wer unter fremdem Namen telefoniert, muss das Angebot verstanden haben: Zielgruppe,
            typische Einwände, die Frage, ab der ein Termin ein Termin ist. Diese Einarbeitung
            lässt sich nicht beliebig oft gleichzeitig leisten. Fünf ist die Zahl, bei der sie
            noch gründlich ist.
          </p>
        </div>

        <div
          className={`${styles.grenzeGrid} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--ry': '22px', '--rd': '0.3s' } as React.CSSProperties}
        >
          {BLOECKE.map((block) => (
            <div key={block.label} className={styles.grenzeBlock}>
              <span className={styles.grenzeBlockLabel}>{block.label}</span>
              <p className={styles.grenzeBlockText}>{block.text}</p>
            </div>
          ))}
        </div>

        <div
          className={`${styles.grenzeFoot} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.38s' } as React.CSSProperties}
        >
          <Link href="/#passt-das" className={`${styles.textLink} ${styles.grenzeLink}`}>
            Der Selbsttest in zehn Sekunden
          </Link>
          <Link href="/leistungen" className={`${styles.textLink} ${styles.grenzeLink}`}>
            Die Modelle der Zusammenarbeit
          </Link>
        </div>
      </div>
    </section>
  )
}
