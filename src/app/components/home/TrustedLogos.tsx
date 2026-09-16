'use client'

import { useReveal } from '../seite/useReveal'
import styles from './home.module.css'

/**
 * Kundenlogos direkt unter dem Einstieg.
 *
 * Bewusst ein ruhiges Raster statt des früheren Laufbands: Vier Logos, die
 * endlos vorbeiziehen, lesen sich wie eine Platzhalter-Animation. Stehend
 * kann man sie zählen — und vier echte Namen sind ein besseres Signal als
 * eine Endlosschleife, die Menge vortäuscht.
 */

/*
 * Breite und Höhe geben das tatsächliche Seitenverhältnis der Datei wieder
 * (Lixt 794×305, Jungwild 500×125, Syntriq 836×246, SMYCO 1000×240). Ohne sie
 * rechnet der Browser bis zum Laden mit einem falschen Verhältnis und die
 * Zeile springt.
 */
const LOGO_HEIGHT = 28

const LOGOS = [
  { name: 'Lixt AG', src: '/logo/lixt.svg', href: 'https://www.lixt.ch', ratio: 794 / 305 },
  { name: 'Jungwild', src: '/logo/jungwild.svg', href: 'https://jungwild.io', ratio: 500 / 125 },
  { name: 'Syntriq', src: '/logo/syntriq.png', href: 'https://syntriq.de', ratio: 836 / 246 },
  { name: 'SMYCO', src: '/logo/smyco.svg', href: 'https://www.smyco.de', ratio: 1000 / 240 },
]

export default function TrustedLogos() {
  const { ref, isIn } = useReveal<HTMLElement>()

  return (
    <section ref={ref} className={styles.logos} aria-label="Unternehmen, die uns vertrauen">
      <p
        className={`${styles.logosLabel} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '12px' } as React.CSSProperties}
      >
        Unternehmen, die uns vertrauen
      </p>

      <div className={styles.logoGrid}>
        {LOGOS.map((logo, index) => (
          <a
            key={logo.name}
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${logo.name} — Website öffnen`}
            className={`${styles.logoLink} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--ry': '12px', '--rd': `${0.1 + index * 0.08}s` } as React.CSSProperties}
          >
            {/* Kein next/image: Drei der vier Dateien sind SVG, die der
                Bildoptimierer ohnehin unverändert durchreicht. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={`Logo ${logo.name}`}
              width={Math.round(LOGO_HEIGHT * logo.ratio)}
              height={LOGO_HEIGHT}
              loading="lazy"
              decoding="async"
            />
          </a>
        ))}
      </div>
    </section>
  )
}
