'use client'

import Link from 'next/link'
import { businessInfo } from '@/lib/local-seo'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './ueber-uns.module.css'

/**
 * „Das Unternehmen“ — die nachprüfbaren Angaben, im Fluss.
 *
 * Der Abschnitt steht zwischen der dunklen Grenzkarte und dem dunklen
 * Abschluss und trennt sie: Zwei dunkle Flächen dürfen nicht aneinandergrenzen
 * (Designleitfaden § 2.2). Er ist deshalb aber kein Füllmaterial — wer auf
 * einer „Über uns“-Seite landet, sucht genau diese Angaben, und sie stehen
 * sonst nur im Impressum, wo niemand sie als Auskunft liest.
 *
 * ## Eine Quelle für Name, Anschrift und Rufnummer
 *
 * Alle Werte kommen aus `businessInfo` (`src/lib/local-seo.ts`). Abgetippt
 * wären sie die zweite Quelle, und genau das ist hier schon einmal
 * passiert: Bis zum 10.09.2026 standen zwei verschiedene Postleitzahlen im
 * Umlauf. Im Quelltext fällt so etwas nicht auf.
 *
 * Die beiden Hinweise darunter beantworten die zwei Fragen, die man einem
 * Dienstleister mit Zugriff auf Kontaktdaten zu Recht vorher stellt — und
 * sie verweisen dorthin, wo die ausführliche Antwort steht, statt sie hier
 * ein zweites Mal zu formulieren.
 */
const OEFFNUNGSZEIT = businessInfo.openingHours.monday.replace('-', '–')

export default function HausSection() {
  const { ref, isIn } = useReveal<HTMLElement>()

  const angaben = [
    { label: 'Firma', wert: businessInfo.name },
    {
      label: 'Inhaber',
      wert: `${businessInfo.owner.name}, ${businessInfo.owner.title}`,
    },
    {
      label: 'Sitz',
      wert: `${businessInfo.address.street}, ${businessInfo.address.postalCode} ${businessInfo.address.city}`,
    },
    { label: 'Tätigkeitsgebiet', wert: `Bundesweit, Schwerpunkt ${businessInfo.address.region}` },
    { label: 'Erreichbar', wert: `Montag bis Freitag, ${OEFFNUNGSZEIT} Uhr` },
    {
      label: 'Telefon',
      wert: <a href={`tel:${businessInfo.phoneInternational}`}>{businessInfo.phoneFormatted}</a>,
    },
    {
      label: 'E-Mail',
      wert: <a href={`mailto:${businessInfo.emailGeneral}`}>{businessInfo.emailGeneral}</a>,
    },
    {
      label: 'LinkedIn',
      wert: (
        <a href={businessInfo.social.linkedin} target="_blank" rel="noopener noreferrer">
          {businessInfo.name}
        </a>
      ),
    },
  ]

  return (
    <section id="haus" ref={ref} className={styles.section} aria-labelledby="haus-title">
      <div className={styles.hausHead}>
        <div
          className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
        >
          Das Unternehmen
        </div>

        <h2
          id="haus-title"
          className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.08s' } as React.CSSProperties}
        >
          Alles, was sich nachprüfen lässt, steht hier oder im Impressum.
        </h2>

        <p
          className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Sitz, Inhaber und Erreichbarkeit – dazu die beiden Punkte, die man einer
          Vertriebsagentur zu Recht vorher stellt: Datenschutz und der Umgang mit KI.
        </p>
      </div>

      <dl
        className={`${styles.hausGrid} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '20px', '--rd': '0.24s' } as React.CSSProperties}
      >
        {angaben.map((angabe) => (
          <div key={angabe.label} className={styles.hausZeile}>
            <dt className={styles.hausLabel}>{angabe.label}</dt>
            <dd className={styles.hausWert}>{angabe.wert}</dd>
          </div>
        ))}
      </dl>

      <div
        className={`${styles.hausNotes} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '20px', '--rd': '0.34s' } as React.CSSProperties}
      >
        <div className={styles.hausNote}>
          <h3 className={styles.hausNoteTitel}>Bevor der erste Anruf rausgeht</h3>
          <p className={styles.hausNoteText}>
            Wir verarbeiten Kontaktdaten in Ihrem Auftrag. Dafür steht vor Projektbeginn ein
            Auftragsverarbeitungsvertrag nach Art. 28 DSGVO. Welche Daten dabei anfallen und wie
            lange sie bleiben, steht in der Datenschutzerklärung.
          </p>
          <Link href="/datenschutz" className={styles.textLink}>
            Zur Datenschutzerklärung
          </Link>
        </div>

        <div className={styles.hausNote}>
          <h3 className={styles.hausNoteTitel}>Die Bilder sind KI-erzeugt</h3>
          <p className={styles.hausNoteText}>
            Die Porträts auf dieser Website sind mit künstlicher Intelligenz erzeugt und am Bild
            selbst gekennzeichnet, wie es Art. 50 Abs. 4 KI-VO verlangt. Wo sonst KI im Einsatz
            ist – und wo ausdrücklich nicht –, steht in der Transparenzerklärung.
          </p>
          <Link href="/ki-transparenz" className={styles.textLink}>
            Zur KI-Transparenz
          </Link>
        </div>
      </div>

      <div
        className={`${styles.hausFoot} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--rd': '0.44s' } as React.CSSProperties}
      >
        <Link href="/impressum" className={styles.textLink}>
          Impressum
        </Link>
        <Link href="/referenzen" className={`${styles.textLink} ${styles.textLinkMuted}`}>
          Woran Sie uns ohne Referenzen prüfen
        </Link>
      </div>
    </section>
  )
}
