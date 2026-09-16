'use client'

import Link from 'next/link'
import type { City } from '@/lib/cities'
import { getNearbyCities } from '@/lib/cities'
import { industryPages } from '@/lib/industries'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './kaltakquise.module.css'

/**
 * Umgebung, Branchen, Weiterlesen — die interne Verlinkung der Seitenfamilie.
 *
 * Im Fluss, nicht auf einer Bühne: Verweise sind kein Ablauf. Man sucht den
 * eigenen Ort, statt ihn durchzuscrollen (Designleitfaden § 5.2).
 *
 * Bewusst ohne Symbole vor den Verweisen. Die frühere Fassung setzte grüne
 * Haken vor die Branchen und Ortsmarken vor die Städte; § 7 des
 * Designleitfadens nennt das einen Symbolteppich — er trägt nichts und wird
 * zur Tapete. Ein Symbol gibt es nur als Marke einer Karte.
 *
 * Die Verweise entstehen aus `cities` und `industryPages` als Schleife;
 * `scripts/check-internal-links.mjs` sucht genau diese Form, um die
 * Seitenfamilien als verlinkt zu zählen.
 */

/** Drei Beiträge, die zur Frage dieser Seite passen. */
const BEITRAEGE = [
  { slug: 'b2b-kaltakquise-leitfaden', label: 'Leitfaden B2B-Kaltakquise' },
  { slug: 'einwandbehandlung-vertrieb', label: 'Einwandbehandlung im B2B' },
  { slug: 'vertriebsagentur-finden-checkliste', label: 'Vertriebsagentur auswählen' },
]

export default function UmgebungSection({ city }: { city: City }) {
  const { ref, isIn } = useReveal<HTMLElement>()

  /*
   * `getNearbyCities` füllt auf, wenn die genannten Nachbarn keine eigene
   * Seite haben. Ohne das ständen Frankfurt und Stuttgart hier ohne einen
   * einzigen Verweis in die Umgebung — ihre drei Nachbarorte gibt es alle
   * nicht als Seite. Die Begründung steht in `src/lib/cities.ts`.
   */
  const nachbarn = getNearbyCities(city)

  return (
    <section id="umgebung" ref={ref} className={styles.section} aria-labelledby="umgebung-title">
      <div className={styles.umgebungHead}>
        <div
          className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
        >
          In der Nähe
        </div>

        <h2
          id="umgebung-title"
          className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.08s' } as React.CSSProperties}
        >
          Wer in {city.name} anruft, ruft selten nur in {city.name} an.
        </h2>

        <p
          className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Die Nachbarorte bearbeiten wir mit derselben Liste und demselben Gesprächsgerüst. Was
          sich ändert, ist die Branchenstruktur – und damit der Anlass für den Anruf.
        </p>
      </div>

      <div
        className={`${styles.umgebungGrid} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '20px', '--rd': '0.22s' } as React.CSSProperties}
      >
        <div className={styles.umgebungCol}>
          <span className={styles.umgebungColTitle}>Umgebung</span>
          <div className={styles.umgebungLinks}>
            {nachbarn.map((nachbar) => (
              <Link
                key={nachbar.slug}
                href={`/kaltakquise/${nachbar.slug}`}
                className={styles.umgebungLink}
              >
                Kaltakquise {nachbar.name}
              </Link>
            ))}
            <Link href={`/leistungen/${city.slug}`} className={styles.umgebungLink}>
              Vertrieb auslagern in {city.name}
            </Link>
            <Link href="/kaltakquise" className={styles.umgebungLink}>
              Alle Standorte
            </Link>
          </div>
        </div>

        <div className={styles.umgebungCol}>
          <span className={styles.umgebungColTitle}>Branchen</span>
          <div className={styles.umgebungLinks}>
            {industryPages.map((industry) => (
              <Link
                key={industry.slug}
                href={`/branchen/${industry.slug}`}
                className={styles.umgebungLink}
              >
                {industry.shortTitle}
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.umgebungCol}>
          <span className={styles.umgebungColTitle}>Zum Weiterlesen</span>
          <div className={styles.umgebungLinks}>
            {BEITRAEGE.map((beitrag) => (
              <Link
                key={beitrag.slug}
                href={`/blog/${beitrag.slug}`}
                className={styles.umgebungLink}
              >
                {beitrag.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <p
        className={`${styles.umgebungNote} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--rd': '0.3s' } as React.CSSProperties}
      >
        Ihr Ort ist nicht dabei? Am Telefon spielt die Entfernung keine Rolle – sprechen Sie uns an.
      </p>
    </section>
  )
}
