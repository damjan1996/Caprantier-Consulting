'use client'

import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { cities } from '@/content/cities'
import { useReveal } from '@/components/seite/useReveal'
import styles from './leistungen.module.css'

/**
 * Einzugsgebiet — bewusst im Fluss, nicht als Bühne.
 *
 * Fünfzehn Verweise sind kein Ablauf und keine Reihenfolge; sie gehören
 * nebeneinander, damit man den eigenen Ort findet, statt ihn durchzuscrollen.
 * Genau der Fall, für den der Designleitfaden § 5.2 „keine Bühne" sagt.
 *
 * Die Verweise entstehen aus `cities` — als Schleife über die Vorlage, nicht
 * als fünfzehn einzelne Zeilen. `scripts/check-internal-links.mjs` sucht diese
 * Schleife, um die Seitenfamilie als verlinkt zu zählen.
 *
 * Der Hinweis darunter verweist seit dem 01.10.2026 auf die beiden anderen
 * Familien-Einstiege — Vorbild ist derselbe Hinweis auf `/kaltakquise`. Vorher
 * führte von dieser Seite kein einziger Verweis zu `/kaltakquise` oder
 * `/branchen`; `/branchen` hatte aus Seiteninhalten genau zwei. Die beiden
 * Branchenseiten selbst sind seit dem Search-Console-Abgleich vom 01.10.2026
 * dabei — Google kannte sie zu dem Zeitpunkt nicht.
 */
export default function RegionsSection() {
  const { ref, isIn } = useReveal<HTMLElement>()

  return (
    <section id="regionen" ref={ref} className={styles.section} aria-labelledby="regions-title">
      <div className={styles.regionHead}>
        <div
          className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
        >
          Einzugsgebiet
        </div>

        <h2
          id="regions-title"
          className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.08s' } as React.CSSProperties}
        >
          Von Köln aus – telefoniert wird bundesweit.
        </h2>

        <p
          className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Akquise am Telefon braucht keine Anfahrt. Für fünfzehn Wirtschaftsregionen steht,
          welche Branchen dort sitzen und wie die Ansprache dort aussieht.
        </p>
      </div>

      <div
        className={`${styles.regionGrid} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '20px', '--rd': '0.22s' } as React.CSSProperties}
      >
        {cities.map((city) => (
          <Link key={city.slug} href={`/leistungen/${city.slug}`} className={styles.regionCard}>
            <span className={styles.regionMark} aria-hidden="true">
              <MapPin />
            </span>
            <span className={styles.regionName}>
              <b>{city.name}</b>
              <span>{city.regionShort}</span>
            </span>
          </Link>
        ))}
      </div>

      <p
        className={`${styles.regionNote} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--rd': '0.3s' } as React.CSSProperties}
      >
        Ihr Standort ist nicht dabei? Das ändert nichts am Ablauf –{' '}
        <Link href="/kontakt">sprechen Sie uns an</Link>. Wie der Anruf selbst je Standort aussieht,
        steht unter <Link href="/kaltakquise">Kaltakquise nach Standort</Link>; was in einzelnen
        Branchen anders läuft, unter <Link href="/branchen">Branchenlösungen</Link> – ausführlich
        für <Link href="/branchen/personaldienstleister">Personaldienstleister</Link> und{' '}
        <Link href="/branchen/it-systemhaeuser">IT-Systemhäuser</Link>.
      </p>
    </section>
  )
}
