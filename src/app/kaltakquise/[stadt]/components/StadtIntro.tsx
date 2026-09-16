'use client'

import Breadcrumbs from '@/components/ui/Breadcrumbs'
import type { City } from '@/lib/cities'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './kaltakquise.module.css'

/**
 * Einstieg der Kaltakquise-Stadtseiten.
 *
 * Bewusst **keine** Klebe-Bühne. Wer hier ankommt, sucht „Kaltakquise Agentur
 * <Stadt>“ und will zwei Dinge wissen: ob das hier stattfindet und ob es
 * zulässig ist. Der Einstieg beantwortet das Erste auf gut zwei Dritteln der
 * Bildschirmhöhe und gibt den Weg nach unten frei.
 *
 * Rechts steht kein Porträt und kein Stadtbild, sondern das Schaubild des
 * Abschnitts: die vier Angaben, die zu jedem Kontakt festgehalten werden. Die
 * Seite behauptet, dass jeder Anruf einen dokumentierten Anlass hat — dann
 * soll sie die Dokumentation zeigen (Designleitfaden § 7).
 *
 * Die Merkmalszeile nennt dieselben Zahlen wie Startseite und Leistungsseite:
 * fünf Kunden pro Monat, erste Termine in vierzehn Tagen. Zwei Fassungen
 * derselben Zusage, die auseinanderlaufen, wären schlimmer als keine.
 */

/**
 * Was zu jedem Kontakt festgehalten wird.
 *
 * Bewusst ohne Beispielzahlen und ohne Beispielquote: Vier Protokollzeilen mit
 * einem Termin darin behaupten eine Trefferquote, die niemand zugesagt hat.
 * Die Liste zeigt stattdessen, **was** dokumentiert wird — das ist die
 * Aussage, an der die Rechtmäßigkeit des Anrufs hängt.
 */
const DOKUMENTATION = [
  {
    label: 'Auswahlkriterium',
    text: 'Warum dieses Unternehmen und warum jetzt – festgehalten vor dem ersten Wählversuch.',
  },
  {
    label: 'Rolle',
    text: 'Wer entscheidet, wird vorab geprüft und nicht aus dem Impressum geraten.',
  },
  {
    label: 'Wählversuch',
    text: 'Uhrzeit und Ergebnis, jeder einzelne – auch die, bei denen niemand abnimmt.',
  },
  {
    label: 'Widerspruch',
    text: 'Wird gesperrt und gesperrt gehalten, nicht gelöscht. Gelöschte Kontakte ruft man erneut an.',
  },
]

export default function StadtIntro({ city }: { city: City }) {
  const { openCalendly, onHover } = useCalendly()
  const { ref, isIn } = useReveal<HTMLDivElement>()

  return (
    <section id="einstieg" className={styles.intro} aria-labelledby="intro-title">
      <div ref={ref} className={styles.introGrid}>
        <div className={styles.introCopy}>
          <Breadcrumbs
            items={[{ label: 'Kaltakquise', href: '/kaltakquise' }, { label: city.name }]}
          />

          <div
            className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
          >
            B2B-Telefonakquise
          </div>

          <h1
            id="intro-title"
            className={`${styles.introTitle} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.08s' } as React.CSSProperties}
          >
            Kaltakquise in {city.name} – jeder Anruf hat einen Anlass.
          </h1>

          <p
            className={`${styles.introText} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.16s' } as React.CSSProperties}
          >
            Wir übernehmen die telefonische Erstansprache Ihrer Zielkunden und liefern Termine, bei
            denen Bedarf, Zuständigkeit und Zeitpunkt vorher geklärt sind.
          </p>

          <div
            className={`${styles.actionRow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--ry': '14px', '--rd': '0.24s' } as React.CSSProperties}
          >
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={openCalendly}
              onMouseEnter={onHover}
            >
              <span>Erstgespräch buchen</span>
              <span className={styles.btnHint}>15 Min.</span>
            </button>
            <span className={styles.metaNote}>Kostenlos, direkt mit dem Gründer</span>
          </div>

          <div
            className={`${styles.introMeta} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.32s' } as React.CSSProperties}
          >
            <span>Unverbindlich</span>
            <span className={styles.dot} aria-hidden="true" />
            <span>Nur 5 Kunden pro Monat</span>
            <span className={styles.dot} aria-hidden="true" />
            <span>Erste Termine in 14 Tagen</span>
          </div>
        </div>

        <div
          className={`${styles.introDoc} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--ry': '28px', '--rd': '0.2s' } as React.CSSProperties}
        >
          {/* Kein Symbol daneben: Ein Symbol gibt es nur als Marke einer
              Karte, nicht neben einer Beschriftung (Designleitfaden § 7). */}
          <span className={styles.introDocHead}>Zu jedem Kontakt festgehalten</span>

          <ul className={styles.introDocList}>
            {DOKUMENTATION.map((zeile) => (
              <li key={zeile.label}>
                <span className={styles.introDocLabel}>{zeile.label}</span>
                <span className={styles.introDocText}>{zeile.text}</span>
              </li>
            ))}
          </ul>

          <span className={styles.introDocNote}>
            Die Beweislast für die mutmaßliche Einwilligung liegt beim werbenden Unternehmen.
            Deshalb ist das kein Zusatz, sondern die Grundlage.
          </span>
        </div>
      </div>
    </section>
  )
}
