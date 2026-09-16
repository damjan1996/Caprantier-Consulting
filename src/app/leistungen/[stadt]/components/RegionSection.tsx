'use client'

import Link from 'next/link'
import type { City } from '@/lib/cities'
import { getNearbyCities } from '@/lib/cities'
import { industryPages } from '@/lib/industries'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './stadt.module.css'

/**
 * Der Markt vor Ort — im Fluss.
 *
 * Trägt `city.regionalText`, den ortsbezogenen Text **dieser** Familie.
 * `scripts/check-content-duplication.mjs` prüft, dass er sich nicht mit
 * `marktText` aus `city-acquisition.ts` überschneidet — dem Text, den die
 * Schwesterseite `/kaltakquise/[stadt]` zeigt. Zwei Stadtseiten je Ort
 * funktionieren nur, solange sie Verschiedenes sagen.
 *
 * Keine Bühne: ein Absatz und eine Verweisliste sind kein Ablauf
 * (Designleitfaden § 5.2).
 *
 * Die Nachbarorte kommen aus `getNearbyCities` — `nearbyAreas` nennt die
 * geografischen Nachbarn, nicht die vorhandenen Seiten; die Begründung steht
 * in `src/lib/cities.ts`.
 */
export default function RegionSection({ city }: { city: City }) {
  const { ref, isIn } = useReveal<HTMLElement>()
  const nachbarn = getNearbyCities(city)

  return (
    <section id="region" ref={ref} className={styles.section} aria-labelledby="region-title">
      <div className={styles.regionHead}>
        <div
          className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
        >
          Ihr Markt vor Ort
        </div>

        <h2
          id="region-title"
          className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.08s' } as React.CSSProperties}
        >
          Was in {city.name} zählt, steht nicht in einer Vorlage.
        </h2>

        <p
          className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Zielgruppe, Anlass und Ansprache entstehen an Ihrem Markt – nicht an einem allgemeinen
          Vertriebshandbuch. Das gilt für die Liste genauso wie für den ersten Satz am Telefon.
        </p>
      </div>

      <div
        className={`${styles.regionCard} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '20px', '--rd': '0.22s' } as React.CSSProperties}
      >
        <span className={styles.regionCardLabel}>{city.name} im Überblick</span>
        <p className={styles.regionText}>
          {city.regionalText} Unsere Gespräche führen wir {city.businessContext}.
        </p>
      </div>

      <div
        className={`${styles.regionCols} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '20px', '--rd': '0.28s' } as React.CSSProperties}
      >
        <div className={styles.regionCol}>
          <span className={styles.regionColTitle}>In der Nähe</span>
          <div className={styles.regionLinks}>
            {nachbarn.map((nachbar) => (
              <Link
                key={nachbar.slug}
                href={`/leistungen/${nachbar.slug}`}
                className={styles.regionLink}
              >
                Vertrieb {nachbar.name}
              </Link>
            ))}
            <Link href="/leistungen" className={styles.regionLink}>
              Alle Leistungen im Überblick
            </Link>
          </div>
        </div>

        <div className={styles.regionCol}>
          <span className={styles.regionColTitle}>Passend dazu</span>
          <div className={styles.regionLinks}>
            {/* Die Schwesterseite zum selben Ort: dort geht es um den Anruf
                selbst und um seine Zulässigkeit, hier um die Zusammenarbeit. */}
            <Link href={`/kaltakquise/${city.slug}`} className={styles.regionLink}>
              Kaltakquise in {city.name}
            </Link>
            {industryPages.map((industry) => (
              <Link
                key={industry.slug}
                href={`/branchen/${industry.slug}`}
                className={styles.regionLink}
              >
                {industry.shortTitle}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
