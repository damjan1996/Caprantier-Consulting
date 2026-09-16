'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { cities } from '@/lib/cities'
import styles from './footer.module.css'

/**
 * „Standorte & Regionen“ — die Stadt-Seiten, eingeklappt.
 *
 * Vorher standen dreißig Stadt-Verweise offen in der Fußzeile. Auf dem Telefon
 * war das eine Bildschirmhöhe Linkliste vor dem Impressum; der Entwurf klappt
 * sie deshalb hinter eine Zeile.
 *
 * Eingeklappt heißt nicht ausgelassen: Die Verweise stehen vollständig im
 * ausgelieferten HTML und sind nur über `grid-template-rows: 0fr` verborgen.
 * Die interne Verlinkung der Stadt-Seiten bleibt damit unverändert — genau
 * daran hing, dass sie überhaupt indexiert werden.
 */

/** Wie viele Städte in der Vorschauzeile genannt werden. */
const PREVIEW_COUNT = 6

/*
 * Nur eine Seitenfamilie.
 *
 * Der Entwurf sieht hier drei Stadt-Spalten vor — Kaltakquise,
 * Neukundengewinnung und Vertriebsagentur. Davon bleibt eine:
 *
 * — `/neukundengewinnung/[stadt]` existiert nicht; der Entwurf führt die Route
 *   selbst unter „Offene Punkte“.
 * — Die Kaltakquise-Stadtseiten bleiben bestehen und behalten ihre Verweise
 *   aus den Leistungs- und Blogseiten (fünf Vorlagen, gefordert sind zwei).
 *   In der Fußzeile standen sie doppelt: dieselben fünfzehn Städte, nur mit
 *   einem längeren Vorsatz — und genau der brach die Zeilen um.
 *
 * Bleibt „Vertriebsagentur in Ihrer Stadt“ als eine Liste, die auch in einer
 * schmalen Spalte ohne Umbruch steht.
 */
const CITY_PREFIX = '/leistungen'

export default function FooterRegions() {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = useId()

  const preview = cities.slice(0, PREVIEW_COUNT).map((city) => city.name).join(', ')
  const remaining = cities.length - PREVIEW_COUNT

  return (
    <div className={styles.regions}>
      <button
        type="button"
        className={styles.regionsToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={styles.regionsLabel}>
          <b>Standorte &amp; Regionen</b>
          <span>
            {preview}
            {remaining > 0 ? ` und ${remaining} weitere` : ''}
          </span>
        </span>
        <span className={styles.regionsIcon} aria-hidden="true">
          <span className={styles.regionsGlyph} />
        </span>
      </button>

      {/* `inert` im zugeklappten Zustand: Die Liste ist über `overflow: hidden`
          nur optisch weg — ohne diese Angabe tabbt man sich durch dreißig
          unsichtbare Verweise, bevor man beim Impressum ankommt. Die Verweise
          bleiben dabei im HTML und für Suchmaschinen lesbar. */}
      <div
        id={panelId}
        className={`${styles.regionsPanel} ${isOpen ? styles.regionsPanelOpen : ''}`}
        inert={!isOpen}
      >
        <div className={styles.regionsPanelInner}>
          <div className={styles.regionsColumn}>
            <span className={styles.columnTitle}>Vertriebsagentur in Ihrer Stadt</span>
            <div className={styles.cityList}>
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`${CITY_PREFIX}/${city.slug}`}
                  className={styles.cityLink}
                >
                  Vertrieb {city.name}
                </Link>
              ))}
            </div>
          </div>

          <p className={styles.regionsNote}>
            Auch in weiteren Städten und Regionen.{' '}
            <Link href="/kontakt">Kontaktieren Sie uns</Link> für Ihre Region.
          </p>
        </div>
      </div>
    </div>
  )
}
