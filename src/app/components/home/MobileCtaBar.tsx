'use client'

import { useEffect, useState } from 'react'
import { useCalendly } from '@/hooks/useCalendly'
import styles from './home.module.css'

/**
 * Buchungsleiste am unteren Rand, nur auf schmalen Bildschirmen.
 *
 * Auf dem Telefon ist die Schaltfläche aus der Kopfzeile eingeklappt, und der
 * nächste Aufruf zum Handeln liegt oft mehrere Bildschirmhöhen entfernt. Die
 * Leiste fährt deshalb ein, sobald der Einstieg durchgescrollt ist — nicht
 * vorher, sonst verdeckt sie die Hauptschaltfläche, die ohnehin sichtbar ist.
 *
 * Ob sie überhaupt angezeigt wird, entscheidet CSS (ab 860px aufwärts
 * `display: none`). Das Skript kennt nur den Scrollstand.
 */

/** Ab diesem Anteil der Fensterhöhe gilt der Einstieg als durchgescrollt. */
const REVEAL_AFTER_VIEWPORTS = 0.9

export default function MobileCtaBar() {
  const { openCalendly, onHover } = useCalendly()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    let shown = false

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const next = window.scrollY > window.innerHeight * REVEAL_AFTER_VIEWPORTS
        if (next === shown) return
        shown = next
        setIsVisible(next)
        // Erst wenn die Leiste wirklich steht, weicht die Chat-Blase nach oben
        // aus. Vorher säße sie unnötig hoch und läge auf der Hauptschaltfläche
        // des Einstiegs.
        document.body.classList.toggle('has-mobile-cta-visible', next)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // Platz am Seitenende, damit die Leiste nichts verdeckt. Die Regel steht
    // in `globals.css`, weil sie den Seitenkörper betrifft und nicht dieses
    // Element.
    document.body.classList.add('has-mobile-cta')

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
      document.body.classList.remove('has-mobile-cta', 'has-mobile-cta-visible')
    }
  }, [])

  return (
    <div className={`${styles.mobileBar} ${isVisible ? styles.mobileBarOn : ''}`}>
      <span className={styles.mobileBarText}>15 Minuten, kostenlos</span>
      <button
        type="button"
        className={`${styles.btnPrimary} ${styles.mobileBarBtn}`}
        onClick={openCalendly}
        onMouseEnter={onHover}
      >
        Erstgespräch buchen
      </button>
    </div>
  )
}
