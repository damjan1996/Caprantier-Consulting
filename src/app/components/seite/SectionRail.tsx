'use client'

import { useEffect, useRef, useState } from 'react'
import { clamp01 } from './useScrollScene'
import styles from './basis.module.css'

/**
 * Fortschrittsleiste am rechten Rand.
 *
 * Ein Strich je Abschnitt. Der Strich des Abschnitts, in dem man steht, füllt
 * sich von links nach rechts, während man ihn durchscrollt; die darüber stehen
 * voll, die darunter leer. Daneben steht der Name — aber nur beim aktiven
 * Punkt, sonst wäre die Leiste eine zweite Navigation.
 *
 * Der Zweck ist Orientierung, nicht Schmuck: Die Startseite ist gut zehn
 * Bildschirmhöhen lang und ihre Abschnitte sehen einander ähnlich. Ohne Anzeige
 * weiß man beim Scrollen weder, wie viel noch kommt, noch wo man gerade ist.
 *
 * Der Fortschritt wird pro Frame direkt ins DOM geschrieben — `transform` auf
 * einem Element ohne Layout-Einfluss, das kostet den Compositor fast nichts.
 * React-State wechselt nur, wenn ein anderer Abschnitt aktiv wird; das
 * passiert beim Scrollen über die ganze Seite zehnmal, nicht sechzigmal pro
 * Sekunde.
 */

/**
 * Bezugslinie im Fenster, an der abgelesen wird, in welchem Abschnitt man
 * steht — etwas oberhalb der Mitte. Genau die Mitte fühlt sich zu träge an:
 * Der neue Abschnitt füllt dann schon das halbe Bild, bevor die Leiste
 * umspringt.
 */
const FOCUS_RATIO = 0.42

/** Ein Punkt der Leiste: Sprungmarke plus kurze Beschriftung. */
export type RailSection = {
  /** Sprungmarke am `<section>`; zugleich Ziel des Verweises in der Leiste. */
  id: string
  /** Kurzform für die Leiste — mehr als etwa zwölf Zeichen drängen sich dort. */
  label: string
}

/**
 * Die Abschnitte kommen von der Seite, nicht aus dieser Datei. Die Leiste ist
 * allgemein; welche Punkte sie zeigt, weiß nur die Seite, die sie einsetzt.
 */
export default function SectionRail({ sections }: { sections: RailSection[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const fillRefs = useRef<(HTMLSpanElement | null)[]>([])
  const activeRef = useRef(0)

  useEffect(() => {
    const elements = sections.map((section) => document.getElementById(section.id))
    // Ohne auffindbare Abschnitte bleibt die Leiste weg, statt leer zu stehen.
    if (!elements.some(Boolean)) return

    let frame = 0

    const update = () => {
      frame = 0
      const focus = window.scrollY + window.innerHeight * FOCUS_RATIO
      let current = 0

      for (let i = 0; i < elements.length; i += 1) {
        const element = elements[i]
        const fill = fillRefs.current[i]
        if (!element) continue

        const top = element.offsetTop
        const height = element.offsetHeight || 1
        const progress = clamp01((focus - top) / height)

        if (fill) fill.style.transform = `scaleX(${progress})`
        // Der letzte Abschnitt, dessen Anfang die Bezugslinie passiert hat.
        if (progress > 0) current = i
      }

      if (current !== activeRef.current) {
        activeRef.current = current
        setActiveIndex(current)
      }
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    // Erst einblenden, wenn der Einstieg durchgescrollt ist. Über der ersten
    // Bildschirmhöhe steht die Leiste sonst neben einer Seite, von der man
    // noch gar nichts gesehen hat.
    const onVisibility = () => setIsVisible(window.scrollY > window.innerHeight * 0.6)

    const onAny = () => {
      onScroll()
      onVisibility()
    }

    window.addEventListener('scroll', onAny, { passive: true })
    window.addEventListener('resize', onAny)
    onAny()

    return () => {
      window.removeEventListener('scroll', onAny)
      window.removeEventListener('resize', onAny)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [sections])

  return (
    <nav
      className={`${styles.rail} ${isVisible ? styles.railOn : ''}`}
      aria-label="Abschnitte dieser Seite"
    >
      <ol className={styles.railList}>
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`${styles.railItem} ${index === activeIndex ? styles.railItemOn : ''}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            >
              <span className={styles.railLabel}>{section.label}</span>
              <span className={styles.railTrack} aria-hidden="true">
                <span
                  ref={(element) => {
                    fillRefs.current[index] = element
                  }}
                  className={styles.railFill}
                />
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
