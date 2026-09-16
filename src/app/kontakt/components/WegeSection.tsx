'use client'

import { businessInfo } from '@/lib/local-seo'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './kontakt.module.css'

/**
 * „Die drei Wege“ — drei Karten nebeneinander, im Fluss.
 *
 * **Keine Bühne, und zwar aus der Regel heraus.** Drei gleichrangige Einträge
 * mit einer Ordnung wären der Anlass für eine — aber § 5.2 nennt den
 * Gegenfall ausdrücklich: „die Einträge gehören zum Vergleich nebeneinander".
 * Drei Kontaktwege liest man nicht nacheinander, man wählt einen aus. Dafür
 * müssen alle drei gleichzeitig im Bild stehen.
 *
 * Die Antwortzeit steht als Auszeichnung oben in jeder Karte. Sie ist die
 * Angabe, nach der ausgewählt wird — und die einzige Stelle der Seite, an der
 * eine Zusage farbig ausgezeichnet ist (§ 2.1).
 *
 * Die Vorgängerfassung hatte an dieser Stelle drei Symbolkarten mit
 * „E-Mail“, „Standort“, „Erreichbarkeit“ und einen vierten Kasten „Schnelle
 * Antwort garantiert“. Das Wort „garantiert“ steht auf der Liste der Dinge,
 * die nie geschrieben werden (Textleitfaden § 10) — eine Zusage, die niemand
 * halten kann. Geblieben ist die Angabe selbst: ein Werktag.
 */
export default function WegeSection() {
  const { openCalendly, onHover } = useCalendly()
  const { ref, isIn } = useReveal<HTMLElement>()

  return (
    <section id="wege" ref={ref} className={styles.section} aria-labelledby="wege-title">
      <div className={styles.wegeHead}>
        <div
          className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
        >
          Die drei Wege
        </div>

        <h2
          id="wege-title"
          className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.08s' } as React.CSSProperties}
        >
          Der schnellste Weg ist nicht für jeden der beste.
        </h2>

        <p
          className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Wer noch prüft, schreibt lieber. Wer sich entschieden hat, spart sich das Formular.
          Beides ist in Ordnung – deshalb stehen alle drei nebeneinander.
        </p>
      </div>

      <div className={styles.wegeGrid}>
        <article
          className={`${styles.wegCard} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--ry': '22px', '--rd': '0.24s' } as React.CSSProperties}
        >
          <span className={styles.wegZeit}>Sofort buchbar</span>
          <h3 className={styles.wegTitel}>Erstgespräch, 15 Minuten</h3>
          <p className={styles.wegText}>
            Der kürzeste Weg. Sie wählen einen freien Termin, wir sprechen über Ihre Zielgruppe,
            das passende Modell und ob wir liefern können. Wenn nicht, sagen wir das im Gespräch
            und nicht im Angebot.
          </p>
          <div className={styles.wegAktion}>
            {/* Dunkel statt blau: Der blaue Hauptaufruf steht im Einstieg
                darüber, und zwei blaue Knöpfe in einem Bild heben einander
                auf (Designleitfaden § 2.1). */}
            <button
              type="button"
              className={`${styles.btnDark} ${styles.btnSmall}`}
              onClick={openCalendly}
              onMouseEnter={onHover}
            >
              <span>Termin wählen</span>
              <span className={styles.btnHint}>15 Min.</span>
            </button>
          </div>
        </article>

        <article
          className={`${styles.wegCard} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--ry': '22px', '--rd': '0.32s' } as React.CSSProperties}
        >
          <span className={styles.wegZeit}>Antwort in einem Werktag</span>
          <h3 className={styles.wegTitel}>Nachricht über das Formular</h3>
          <p className={styles.wegText}>
            Wenn Sie erst schreiben wollen. Fünf Felder, eines davon freiwillig. Was mit der
            Nachricht danach passiert, steht weiter unten auf dieser Seite – einschließlich der
            Frage, wann sie wieder gelöscht wird.
          </p>
          <div className={styles.wegAktion}>
            <a href="#formular" className={styles.textLink}>
              Zum Formular <span aria-hidden="true">↓</span>
            </a>
          </div>
        </article>

        <article
          className={`${styles.wegCard} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--ry': '22px', '--rd': '0.4s' } as React.CSSProperties}
        >
          <span className={styles.wegZeit}>Montag bis Freitag, 9–18 Uhr</span>
          <h3 className={styles.wegTitel}>Direkt, ohne Formular</h3>
          <p className={styles.wegText}>
            Wenn Sie schon wissen, worum es geht. Am Telefon erreichen Sie uns während der
            Geschäftszeiten; außerhalb davon ist die E-Mail der schnellere Weg.
          </p>
          <div className={styles.wegDaten}>
            <a href={`mailto:${businessInfo.emailGeneral}`}>{businessInfo.emailGeneral}</a>
            <a href={`tel:${businessInfo.phoneInternational}`}>{businessInfo.phoneFormatted}</a>
            <span className={styles.wegDatenNote}>
              {businessInfo.address.street}, {businessInfo.address.postalCode}{' '}
              {businessInfo.address.city}
            </span>
          </div>
        </article>
      </div>
    </section>
  )
}
