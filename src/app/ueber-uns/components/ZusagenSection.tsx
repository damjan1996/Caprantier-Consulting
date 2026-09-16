'use client'

import Link from 'next/link'
import { YOUTUBE_CHANNEL_URL } from '@/lib/youtube'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './ueber-uns.module.css'

/**
 * „Woran Sie uns messen“ — vier Zusagen, jede mit ihrer Gegenprobe.
 *
 * Hier stand vorher eine Werteliste: „Ergebnisorientiert“,
 * „Partnerschaftlich“, „Kontinuierlich“, „Professionell“ — vier Symbolkarten,
 * vier Sätze, die jeder Wettbewerber unverändert übernehmen könnte. Das ist
 * die Prüffrage aus Textleitfaden § 1, und sie ist dort viermal
 * durchgefallen.
 *
 * Das Bauteil dieser Seite dreht das um: Zu jeder Zusage steht der
 * beobachtbare Fall, in dem sie gebrochen ist. Eine Zusage, die sich nicht
 * widerlegen lässt, ist keine Zusage — sie ist eine Floskel. Die Gegenprobe
 * sitzt deshalb nicht im Text, sondern in einem eigenen Fuß auf grauer
 * Fläche: Sie ist der Teil, an dem man uns festhalten kann.
 *
 * Keine Bühne: Vier Zusagen gehören zum Vergleich nebeneinander, sie haben
 * keine Reihenfolge (Designleitfaden § 5.2).
 *
 * Die vier Punkte sind keine neuen Versprechen. Sie fassen zusammen, was auf
 * der Startseite („Über Nico“) und in `leistungen-content.ts` bereits
 * zugesagt ist — mit der Gegenprobe als dem, was dort fehlt.
 */
const ZUSAGEN = [
  {
    titel: 'Ihr Erstgespräch und Ihren Kick-off führt der Gründer selbst.',
    text: 'Sie sprechen von der ersten Minute mit dem, der die Verantwortung trägt. Telefoniert wird danach im Team – wer das ist und wie der Einstieg klingt, legen wir im Kick-off gemeinsam fest.',
    probe: 'Sie sitzen im Erstgespräch jemandem gegenüber, der Sie anschließend weiterreicht.',
  },
  {
    titel: 'Wir melden uns mit Ihrem Firmennamen, nicht mit unserem.',
    text: 'Für die Gegenseite sind wir Ihr Vertrieb und sprechen in der Wir-Form. Das ist keine Verkleidung, sondern der Auftrag: Ein Anruf im Namen einer fremden Agentur muss sich erst erklären, bevor er zur Sache kommt.',
    probe: 'Ein Zielkunde fragt Sie, wer denn diese Agentur gewesen sei, die da angerufen hat.',
  },
  {
    titel: 'Absagegründe stehen im Wortlaut im Bericht.',
    text: 'Nicht als Kategorie, nicht zusammengefasst. Dazu vier Kennzahlen statt zwanzig und Wiedervorlagen mit Datum und Anlass, damit ein Nein auf später nicht verloren geht.',
    probe: 'Im Bericht steht „kein Bedarf“ statt des Satzes, den der Angerufene gesagt hat.',
  },
  {
    titel: 'Wir sagen im Erstgespräch ab, wenn wir nicht liefern können.',
    text: 'Die letzten fünf der 15 Minuten sind für die ehrliche Einschätzung reserviert. Trägt die Zielgruppe nicht oder ist der Kundenwert zu klein, sagen wir das im Gespräch und nicht im Angebot.',
    probe: 'Nach dem Gespräch kommt trotzdem ein Angebot, obwohl im Gespräch Zweifel standen.',
  },
]

export default function ZusagenSection() {
  const { ref, isIn } = useReveal<HTMLElement>()

  return (
    <section id="zusagen" ref={ref} className={styles.section} aria-labelledby="zusagen-title">
      <div className={styles.zusagenHead}>
        <div
          className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
        >
          Woran Sie uns messen
        </div>

        <h2
          id="zusagen-title"
          className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.08s' } as React.CSSProperties}
        >
          Vier Zusagen – und woran Sie merken, wenn wir sie brechen.
        </h2>

        <p
          className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Eine Zusage, die sich nicht widerlegen lässt, ist eine Floskel. Zu jeder steht deshalb
          der Fall, in dem wir sie nicht eingehalten haben.
        </p>
      </div>

      <div className={styles.zusagenGrid}>
        {ZUSAGEN.map((zusage, index) => (
          <article
            key={zusage.titel}
            className={`${styles.zusageCard} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={
              { '--ry': '22px', '--rd': `${0.22 + index * 0.08}s` } as React.CSSProperties
            }
          >
            <div className={styles.zusageBody}>
              <span className={styles.zusageNr} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.zusageTitel}>{zusage.titel}</h3>
              <p className={styles.zusageText}>{zusage.text}</p>
            </div>

            <div className={styles.zusageProbe}>
              <span className={styles.zusageProbeLabel}>Gebrochen, wenn</span>
              <span className={styles.zusageProbeText}>{zusage.probe}</span>
            </div>
          </article>
        ))}
      </div>

      <div
        className={`${styles.zusagenFoot} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--rd': '0.56s' } as React.CSSProperties}
      >
        <Link href="/leistungen" className={styles.textLink}>
          Was wir übernehmen
        </Link>
        <a
          href={YOUTUBE_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.textLink} ${styles.textLinkMuted}`}
        >
          Wie das am Telefon klingt
        </a>
      </div>
    </section>
  )
}
