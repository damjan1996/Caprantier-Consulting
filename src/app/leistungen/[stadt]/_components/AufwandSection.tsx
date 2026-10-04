'use client'

import { useReveal } from '@/components/seite/useReveal'
import styles from './stadt.module.css'

/**
 * „Was es kostet“ — im Fluss, auf dunkler Karte.
 *
 * Die Abgrenzung dieser Seite. Auf der Schwesterseite `/kaltakquise/[stadt]`
 * steht an dieser Stelle der Rechtsrahmen; für die Frage „Vertrieb auslagern“
 * ist die ehrliche Gegenrede eine andere: was es an Zeit, an Geduld und an
 * Mindestgröße kostet. Wer sich hier nicht wiederfindet, bucht kein Gespräch,
 * das ohnehin zu nichts führt (Textleitfaden § 1).
 *
 * Die drei Angaben stehen so auch auf der Startseite und in den häufigen
 * Fragen — 14 Tage bis zu den ersten Terminvereinbarungen, drei Monate als
 * empfohlene Mindestdauer, rund 10.000 € Mindestwert je Kunde. Dieselbe Zahl heißt überall gleich
 * (Textleitfaden § 6.2).
 *
 * Keine Bühne: Die drei gehören zum Vergleich nebeneinander.
 */
const POSTEN = [
  {
    zahl: '14 Tage',
    label: 'Bis zu ersten Terminvereinbarungen',
    text: 'Kick-off, Liste und Gesprächsgerüst brauchen Zeit. Die ersten Anrufe laufen in der Regel nach 10–14 Tagen.',
  },
  {
    zahl: '3 Monate',
    label: 'Empfohlene Mindestdauer',
    text: 'Ein Pilot lässt sich oft erst nach etwa zwei Monaten bewerten, weil nicht alle Termine innerhalb der ersten 30 Tage stattfinden. Eine feste Quote versprechen wir nicht.',
  },
  {
    zahl: '10.000 €',
    label: 'Mindestwert je Kunde',
    text: 'Darunter rechnet sich laufende Akquise selten. Liegt Ihr Kundenwert niedriger, sagen wir das im Erstgespräch.',
  },
]

export default function AufwandSection() {
  const { ref, isIn } = useReveal<HTMLElement>()

  return (
    <section id="aufwand" ref={ref} className={styles.section} aria-labelledby="aufwand-title">
      <div
        className={`${styles.aufwandCard} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '28px' } as React.CSSProperties}
      >
        <div className={styles.aufwandHead}>
          <div
            className={`${styles.eyebrow} ${styles.aufwandEyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.1s' } as React.CSSProperties}
          >
            Was es kostet
          </div>

          <h2
            id="aufwand-title"
            className={`${styles.aufwandTitle} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.16s' } as React.CSSProperties}
          >
            Setup braucht 14 Tage, die Bewertung eines Piloten oft zwei Monate.
          </h2>

          <p
            className={`${styles.aufwandText} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.22s' } as React.CSSProperties}
          >
            Die ersten Wochen jeder Kampagne kalibrieren Liste, Einstieg und Einwandbehandlung –
            erst danach sagen die Zahlen etwas. Wer nach vier Wochen aufhört, hat die Lernphase
            bezahlt und nichts davon gehabt.
          </p>
        </div>

        <div
          className={`${styles.aufwandGrid} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--ry': '22px', '--rd': '0.3s' } as React.CSSProperties}
        >
          {POSTEN.map((posten) => (
            <div key={posten.label} className={styles.aufwandBlock}>
              <span className={styles.aufwandZahl}>{posten.zahl}</span>
              <span className={styles.aufwandBlockLabel}>{posten.label}</span>
              <p className={styles.aufwandBlockText}>{posten.text}</p>
            </div>
          ))}
        </div>

        <p
          className={`${styles.aufwandNote} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.38s' } as React.CSSProperties}
        >
          Beträge stehen bewusst nicht auf dieser Seite: Wir verkaufen keine Standardpakete,
          deshalb variiert der Preis. Im Erstgespräch nennen wir Ihnen nach kurzer Analyse eine
          transparente Hausnummer.
        </p>
      </div>
    </section>
  )
}
