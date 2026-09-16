'use client'

import Link from 'next/link'
import { cities } from '@/lib/cities'
import { getCityAcquisition } from '@/lib/city-acquisition'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './uebersicht.module.css'

/**
 * Die fünfzehn Märkte — die Hauptsache dieser Seite.
 *
 * Ohne diese Übersicht wären die Stadtseiten nur über die Sitemap und über die
 * drei Nachbarorte der jeweils anderen Seiten erreichbar. Genau dieser Zustand
 * — Seiten ohne eingehende Verweise — ist im Blog die belegte Ursache dafür
 * gewesen, dass 40 von 52 Beiträgen nie in den Index kamen.
 *
 * Keine Bühne: Man sucht hier seinen Ort, statt ihn durchzuscrollen
 * (Designleitfaden § 5.2). Und keine Ortsmarke je Karte — fünfzehnmal dasselbe
 * Symbol ist ein Teppich und trägt nichts (§ 7).
 *
 * Die Karten entstehen als Schleife über `cities`;
 * `scripts/check-internal-links.mjs` sucht genau diese Form, um die
 * Seitenfamilie als verlinkt zu zählen.
 */
export default function MaerkteSection() {
  const { ref, isIn } = useReveal<HTMLElement>()

  return (
    <section id="maerkte" ref={ref} className={styles.section} aria-labelledby="maerkte-title">
      <div className={styles.marktHead}>
        <div
          className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
        >
          Die Märkte
        </div>

        <h2
          id="maerkte-title"
          className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.08s' } as React.CSSProperties}
        >
          Fünfzehn Wirtschaftsräume, fünfzehn eigene Einschätzungen.
        </h2>

        <p
          className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Jede Seite nennt die führenden Branchen vor Ort, wen wir dort anrufen und wann diese
          Rollen erreichbar sind. Telefoniert wird von Köln aus, bundesweit.
        </p>
      </div>

      <div
        className={`${styles.marktGrid} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '20px', '--rd': '0.22s' } as React.CSSProperties}
      >
        {cities.map((city) => {
          const acquisition = getCityAcquisition(city.slug)
          return (
            <Link
              key={city.slug}
              href={`/kaltakquise/${city.slug}`}
              className={styles.marktCard}
            >
              <span className={styles.marktTop}>
                <h3 className={styles.marktName}>{city.name}</h3>
                <span className={styles.marktLand}>{city.regionShort}</span>
              </span>
              {acquisition && (
                <p className={styles.marktBranchen}>
                  {acquisition.leitbranchen.slice(0, 3).join(' · ')}
                </p>
              )}
            </Link>
          )
        })}
      </div>

      <p
        className={`${styles.marktNote} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--rd': '0.3s' } as React.CSSProperties}
      >
        Ihr Ort ist nicht dabei? Die Seiten bilden nur die Märkte ab, zu denen wir eine eigene
        Einschätzung haben – gearbeitet wird deutschlandweit. Was wir dabei übernehmen, steht
        unter <Link href="/leistungen">Leistungen</Link>; wie ein Akquisegespräch aufgebaut ist,
        im <Link href="/blog/b2b-kaltakquise-leitfaden">Leitfaden zur B2B-Kaltakquise</Link>.
      </p>
    </section>
  )
}
