'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Einmaliges Einblenden, sobald ein Abschnitt ins Bild kommt.
 *
 * Bewusst ein eigener Haken statt `FadeIn`: Die Abschnitte der Startseite
 * blenden nicht als Block ein, sondern gestaffelt über viele Kindelemente.
 * Ein Beobachter pro Abschnitt reicht dafür — ein `FadeIn` pro Element wären
 * bei dieser Seite über sechzig Beobachter.
 *
 * Der Beobachter trennt sich nach dem ersten Treffer selbst. Rückwärts
 * ausblenden würde beim Hochscrollen flackern und kostet nur Rechenzeit.
 */

/*
 * Ausgelöst wird über den Rand, nicht über einen Sichtbarkeitsanteil.
 *
 * Vorher lief das über `threshold`: Ein Abschnitt musste zu 15 bis 30 Prozent
 * im Bild stehen, bevor er zu blenden begann. Bei Abschnitten, die anderthalb
 * Bildschirmhöhen hoch sind, heißt das mehrere hundert Pixel Scrollweg — wer
 * zügig scrollt, ist am Inhalt vorbei, bevor er überhaupt sichtbar wird.
 *
 * Der untere Rand kehrt das um, und zwar mit Vorlauf: Der Beobachtungsbereich
 * reicht deutlich unter die Bildkante hinaus. Gemeldet wird also,
 * bevor der Abschnitt überhaupt sichtbar ist — unabhängig davon, wie hoch er
 * ist. Die halbe Sekunde Einblendung läuft damit ab, während der Abschnitt
 * noch heranscrollt, und er steht fertig da, wenn man ihn erreicht.
 */
const REVEAL_MARGIN = '0px 0px 60% 0px'

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [isIn, setIsIn] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Ohne IntersectionObserver (sehr alte Browser) wird sofort angezeigt.
    // Unsichtbarer Inhalt ist der schlechtere Ausgang von beiden. Der Zustand
    // steht auf dem Server nicht zur Verfügung — ihn im Render zu lesen würde
    // eine Hydration-Abweichung erzeugen, deshalb bleibt es beim Setzen im
    // Effekt. Der Zweig läuft einmal und nur ohne Beobachter-Unterstützung.
    if (typeof IntersectionObserver === 'undefined') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsIn(true)
      return
    }

    // Bereits sichtbare Abschnitte beim Laden: Der Beobachter meldet sich
    // ohnehin sofort, deshalb kein Sonderweg.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsIn(true)
          observer.disconnect()
        }
      },
      { rootMargin: REVEAL_MARGIN, threshold: 0 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { ref, isIn }
}
