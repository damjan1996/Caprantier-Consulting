'use client'

import type { City } from '@/content/cities'
import { useReveal } from '@/components/seite/useReveal'
import styles from './stadt.module.css'

/**
 * „Neukundengewinnung in <Stadt>“ — Ortswissen, im Fluss.
 *
 * Der einzige Abschnitt der Vorlage, der nur auf einer Seite so steht. Er liest
 * `city.lokal` und erscheint nur, wenn dort etwas Belegtes eingetragen ist
 * (`hatOrtswissen` in `src/content/cities.ts`); ein leerer Abschnitt oder ein
 * allgemeiner Platzhaltertext wäre genau das Vorlagenmuster, gegen das er
 * gebaut ist. Seit dem 01.10.2026, nach dem Search-Console-Abgleich: Die
 * Vertriebs-Stadtseiten waren nach Tausch des Stadtnamens zu 84 % gleich.
 *
 * Steht vor „Ihr Markt vor Ort“, weil er dieselbe Frage beantwortet — kennt
 * ihr meinen Markt —, aber mit dem, was nur für diese Stadt gilt.
 *
 * Keine Bühne: Absätze und kurze Angaben sind kein Ablauf
 * (Designleitfaden § 5.2). Die Spaltentitel sind `.eyebrow` (`--ink-3`) statt
 * `.regionColTitle` (`--ink-4`): Neuer Code nimmt für Etiketten die Stufe, die
 * den Kontrast besteht (Designleitfaden § 2.3).
 */
export default function OrtSection({ city }: { city: City }) {
  const { ref, isIn } = useReveal<HTMLElement>()
  const lokal = city.lokal ?? {}
  const titel =
    lokal.neukundengewinnung?.titel ?? `Was die Akquise in ${city.name} anders macht.`

  const bloecke = [
    lokal.branchen?.length
      ? {
          titel: 'Branchen, für die wir hier arbeiten',
          inhalt: (
            <ul className={styles.ortListe}>
              {lokal.branchen.map((branche) => (
                <li key={branche.name} className={styles.ortBlockText}>
                  <b>{branche.name}</b> – {branche.text}
                </li>
              ))}
            </ul>
          ),
        }
      : null,
    lokal.einzugsgebiet
      ? {
          titel: 'Einzugsgebiet',
          inhalt: <p className={styles.ortBlockText}>{lokal.einzugsgebiet}</p>,
        }
      : null,
    lokal.projekt
      ? {
          titel: `Aus einem Projekt in ${city.name}`,
          inhalt: <p className={styles.ortBlockText}>{lokal.projekt.text}</p>,
        }
      : null,
  ].filter((block) => block !== null)

  return (
    <section id="vor-ort" ref={ref} className={styles.section} aria-labelledby="vor-ort-title">
      <div className={styles.regionHead}>
        <div
          className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
        >
          Neukundengewinnung in {city.name}
        </div>

        <h2
          id="vor-ort-title"
          className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.08s' } as React.CSSProperties}
        >
          {titel}
        </h2>
      </div>

      {lokal.neukundengewinnung && (
        <div
          className={`${styles.ortText} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--ry': '20px', '--rd': '0.16s' } as React.CSSProperties}
        >
          {lokal.neukundengewinnung.absaetze.map((absatz) => (
            <p key={absatz} className={styles.ortAbsatz}>
              {absatz}
            </p>
          ))}
        </div>
      )}

      {bloecke.length > 0 && (
        <div
          className={`${styles.ortBloecke} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--ry': '20px', '--rd': '0.24s' } as React.CSSProperties}
        >
          {bloecke.map((block) => (
            <div key={block.titel} className={styles.regionCol}>
              <span className={styles.eyebrow}>{block.titel}</span>
              {block.inhalt}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
