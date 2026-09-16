'use client'

import Link from 'next/link'
import type { City } from '@/lib/cities'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './kaltakquise.module.css'

/**
 * Der rechtliche Rahmen — im Fluss, auf dunkler Karte.
 *
 * Auf dieser Seitenfamilie ist der Rechtsrahmen das, was auf der Startseite
 * „Dafür nicht“ ist: die Stelle, an der die Seite absagt. Deshalb bekommt er
 * dieselbe Behandlung — eine dunkle Fläche, volles Gewicht, nicht kleingedruckt
 * unter den Aufruf geschoben.
 *
 * Keine Bühne: Die drei Fälle (Unternehmen, Verbraucher, Werbe-E-Mail) gehören
 * zum Vergleich nebeneinander, und genau dafür sagt der Designleitfaden § 5.2
 * „lass es“.
 *
 * Die Formulierungen folgen dem Textleitfaden § 7.1: nie ohne Paragraphen, nie
 * verkürzt auf „Kaltakquise ist im B2B erlaubt“, und **immer** mit dem Hinweis,
 * dass das keine Rechtsberatung ist.
 */

/** Die drei Fälle, die § 7 Abs. 2 Nr. 1 UWG auseinanderhält. */
const FAELLE = [
  {
    label: 'Unternehmen',
    text: 'Der Anruf ist ohne vorherige Einwilligung zulässig, wenn das Angebot einen sachlichen Bezug zur Geschäftstätigkeit des Angerufenen hat.',
  },
  {
    label: 'Verbraucher',
    text: 'Hier braucht es eine vorherige ausdrückliche Einwilligung. Privatpersonen rufen wir deshalb grundsätzlich nicht an.',
  },
  {
    label: 'Werbe-E-Mail',
    text: 'Die Erleichterung gilt allein für den Anruf. Für Werbung per elektronischer Post gibt es sie auch im B2B nicht.',
  },
]

export default function RechtSection({ city }: { city: City }) {
  const { ref, isIn } = useReveal<HTMLElement>()

  return (
    <section id="recht" ref={ref} className={styles.section} aria-labelledby="recht-title">
      <div
        className={`${styles.rechtCard} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '28px' } as React.CSSProperties}
      >
        <div className={styles.rechtHead}>
          <div
            className={`${styles.eyebrow} ${styles.rechtEyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.1s' } as React.CSSProperties}
          >
            Rechtlicher Rahmen
          </div>

          <h2
            id="recht-title"
            className={`${styles.rechtTitle} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.16s' } as React.CSSProperties}
          >
            Der Anruf ist zulässig. Die Werbe-E-Mail daneben ist es nicht.
          </h2>

          <p
            className={`${styles.rechtText} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.22s' } as React.CSSProperties}
          >
            § 7 Abs. 2 Nr. 1 UWG unterscheidet ausdrücklich zwischen Verbrauchern und sonstigen
            Marktteilnehmern: Gegenüber einem Unternehmen genügt eine{' '}
            <b>zumindest mutmaßliche Einwilligung</b>, gegenüber Verbrauchern braucht es eine
            vorherige ausdrückliche. Datenschutzrechtlich stützen wir uns auf das berechtigte
            Interesse nach Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </div>

        <div
          className={`${styles.rechtGrid} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--ry': '22px', '--rd': '0.3s' } as React.CSSProperties}
        >
          {FAELLE.map((fall) => (
            <div key={fall.label} className={styles.rechtBlock}>
              <span className={styles.rechtBlockLabel}>{fall.label}</span>
              <p className={styles.rechtBlockText}>{fall.text}</p>
            </div>
          ))}
        </div>

        <p
          className={`${styles.rechtText} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.38s' } as React.CSSProperties}
        >
          Die Beweislast liegt beim werbenden Unternehmen. Deshalb trägt jeder Kontakt in{' '}
          {city.name} ein dokumentiertes Auswahlkriterium, wir rufen mit korrekt übermittelter
          Rufnummer an – eine manipulierte Vorwahl ist ein eigener Verstoß – und ein Widerspruch
          wird sofort gesperrt statt gelöscht.
        </p>

        <div
          className={`${styles.rechtFoot} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.46s' } as React.CSSProperties}
        >
          <p className={styles.rechtNote}>
            Allgemeine Einordnung, keine Rechtsberatung. Die ausführliche Fassung mit Quellen steht
            im Beitrag zu den rechtlichen Grundlagen.
          </p>
          <Link
            href="/blog/kaltakquise-rechtliche-grundlagen"
            className={`${styles.textLink} ${styles.rechtLink}`}
          >
            Rechtliche Grundlagen im Detail
          </Link>
        </div>
      </div>
    </section>
  )
}
