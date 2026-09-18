'use client'

import { useReveal } from '../seite/useReveal'
import styles from './home.module.css'

/**
 * Kundenlogos direkt unter dem Einstieg.
 *
 * Bewusst ein ruhiges Raster statt des früheren Laufbands: Logos, die endlos
 * vorbeiziehen, lesen sich wie eine Platzhalter-Animation. Stehend kann man
 * sie zählen — und eine zählbare Handvoll echter Namen ist ein besseres
 * Signal als eine Endlosschleife, die Menge vortäuscht.
 *
 * Dies ist die einzige Stelle der Website, an der Kundenlogos stehen. Weder
 * `/referenzen` noch der Referenzabschnitt der Startseite zeigen Namen: Dort
 * gilt die Freigaberegel aus `src/lib/case-studies.ts`, weil dort Zahlen
 * danebenstehen. Ein Logo ohne Kennzahl ist davon nicht betroffen.
 */

/*
 * Breite und Höhe geben das tatsächliche Seitenverhältnis der Datei wieder
 * (Lixt 794×305, Jungwild 500×125, Syntriq 836×246, SMYCO 1000×240,
 * Roth & Gutenkunst 311×88, JUKE Talents 95×141). Ohne sie rechnet der
 * Browser bis zum Laden mit einem falschen Verhältnis und die Zeile springt.
 */
const LOGO_HEIGHT = 28

/*
 * `height` nur dort setzen, wo die Einheitshöhe nicht trägt.
 *
 * Vier der Logos sind einzeilige Wortmarken und vertragen die 28px. Zwei
 * nicht: Roth & Gutenkunst ist ein gestapelter Block aus Signet, zwei
 * Textzeilen und Zusatz — auf 28px wäre der Zusatz keine drei Pixel hoch.
 * JUKE Talents steht sogar hochkant (schmaler als hoch); auf 28px gebracht
 * wäre die Marke nur 19px breit und verschwände zwischen den Wortmarken.
 * Beide bekommen deshalb mehr Höhe, damit die Reihe optisch gleich gewichtet
 * bleibt — gleiche Pixelhöhe wäre hier gerade nicht gleiche Wirkung.
 */
const LOGOS: { name: string; src: string; href: string; ratio: number; height?: number }[] = [
  { name: 'Lixt AG', src: '/logo/lixt.svg', href: 'https://www.lixt.ch', ratio: 794 / 305 },
  { name: 'Jungwild', src: '/logo/jungwild.svg', href: 'https://jungwild.io', ratio: 500 / 125 },
  { name: 'Syntriq', src: '/logo/syntriq.png', href: 'https://syntriq.de', ratio: 836 / 246 },
  { name: 'SMYCO', src: '/logo/smyco.svg', href: 'https://www.smyco.de', ratio: 1000 / 240 },
  {
    name: 'Roth & Gutenkunst',
    src: '/logo/roth-gutenkunst.png',
    href: 'https://roth-gutenkunst.de',
    ratio: 311 / 88,
    height: 36,
  },
  {
    name: 'JUKE Talents',
    src: '/logo/juke-talents.svg',
    href: 'https://juke-talents.de',
    ratio: 95.466 / 141.231,
    height: 48,
  },
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
              width={Math.round((logo.height ?? LOGO_HEIGHT) * logo.ratio)}
              height={logo.height ?? LOGO_HEIGHT}
              style={logo.height ? { height: `${logo.height}px` } : undefined}
              loading="lazy"
              decoding="async"
            />
          </a>
        ))}
      </div>
    </section>
  )
}
