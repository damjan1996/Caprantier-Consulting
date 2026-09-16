'use client'

import { useEffect, useRef, type RefObject } from 'react'

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

/**
 * Expo-out. Dieselbe Kurve wie die Einblende-Animationen, damit ein Element,
 * das erst einblendet und dann am Scrollen hängt, nicht zwei Tempi mischt.
 */
export const easeOut = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))

type SceneOptions = {
  /**
   * Liefert den Zielwert 0–1 aus der Position im Fenster. Läuft in einem
   * rAF-Durchlauf, darf also messen (`getBoundingClientRect`), aber nichts
   * schreiben — sonst erzwingt jeder Frame ein zusätzliches Layout.
   */
  measure: () => number
  /**
   * Setzt den geglätteten Wert um. Hier wird direkt ins DOM geschrieben, nicht
   * über React-State: Ein `setState` pro Frame würde den gesamten Abschnitt
   * sechzigmal pro Sekunde neu rendern. Diskrete Zustände (welcher Schritt ist
   * aktiv) dürfen von hier aus gesetzt werden, aber nur bei echter Änderung.
   */
  apply: (progress: number) => void
  /** Anteil der Restdistanz pro Frame. Kleiner = träger, weicher. */
  smoothing?: number
}

/**
 * Scroll-gesteuerte Szene mit Federglättung.
 *
 * Der Scroll-Zeiger setzt ein Ziel, eine rAF-Schleife zieht den dargestellten
 * Wert daran heran und hält an, sobald beide zusammenliegen. Das entkoppelt die
 * Darstellung von der Ereignisrate des Browsers — auf Windows feuert das
 * Mausrad in groben Sprüngen, ohne Glättung springt die Animation mit.
 *
 * Die Schleife läuft nur, während der Abschnitt im Bild ist. Vier solcher
 * Szenen auf einer Seite, die alle dauerhaft rechnen, wären sonst genau die
 * Art von Scroll-Ruckeln, die diese Seite vermeiden soll.
 *
 * Bei `prefers-reduced-motion: reduce` wird der Endzustand einmal gesetzt und
 * nichts weiter registriert.
 */
export function useScrollScene<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: SceneOptions
) {
  const optionsRef = useRef(options)
  optionsRef.current = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let target = 0
    let current = 0
    let measureFrame = 0
    let loopFrame = 0
    let active = false

    const smoothing = optionsRef.current.smoothing ?? 0.12

    const runLoop = () => {
      loopFrame = 0
      const distance = target - current
      if (Math.abs(distance) < 0.0008) {
        if (current !== target) {
          current = target
          optionsRef.current.apply(current)
        }
        return
      }
      current += distance * smoothing
      optionsRef.current.apply(current)
      loopFrame = requestAnimationFrame(runLoop)
    }

    const onScroll = () => {
      if (measureFrame) return
      measureFrame = requestAnimationFrame(() => {
        measureFrame = 0
        target = clamp01(optionsRef.current.measure())
        if (!loopFrame) loopFrame = requestAnimationFrame(runLoop)
      })
    }

    const start = () => {
      if (active) return
      active = true
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
      onScroll()
    }

    const stop = () => {
      if (!active) return
      active = false
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }

    const applyFinalState = () => {
      target = 1
      current = 1
      optionsRef.current.apply(1)
    }

    /*
     * Gestapelt: jeder Eintrag blendet beim Hereinscrollen einzeln ein.
     *
     * Unter `STACK_BREAKPOINT` gibt es keine Klebe-Bühne — die Einträge stehen
     * untereinander im Fluss. Bis zum 16.09.2026 standen sie damit auch alle
     * sofort sichtbar da: Auf dem Telefon war von der scrollgebundenen
     * Bewegung, die diese Website ausmacht, nichts mehr übrig.
     *
     * Die Bühne zurückzuholen ist keine Option. 100vh-Kleben kämpft auf
     * Telefonen mit der ein- und ausfahrenden Browserleiste, und 420vh
     * Scrollstrecke je Abschnitt sind auf einem Daumen kein Vergnügen.
     * Stattdessen übernimmt hier ein Beobachter, was auf dem Desktop die Bühne
     * tut: Ein Eintrag wird sichtbar, wenn er an der Reihe ist.
     *
     * **Warum kein `IntersectionObserver`.** Der erste Entwurf nutzte einen.
     * Er meldet aber nichts, wenn ein Element in einem einzigen Frame von
     * unterhalb des Fensters nach oberhalb springt — `isIntersecting` bleibt
     * dabei durchgehend `false`. Nach einem Ankersprung (`#formular`), einer
     * wiederhergestellten Scrollposition oder einem schnellen Wisch blieben
     * sämtliche Einträge dauerhaft auf `opacity: 0.25` stehen. Gemessen auf
     * `/` waren das 38 von 38.
     *
     * Die Messung gegen die Auslöselinie hat den Fall nicht: Ein Eintrag weit
     * oberhalb des Fensters hat eine stark negative `top` und liegt damit
     * ebenfalls über der Linie.
     *
     * Ein Zuhörer je Abschnitt, über `requestAnimationFrame` gedrosselt, und
     * er hängt sich selbst aus, sobald alle Einträge sichtbar sind.
     *
     * **`data-stapel` setzt das Skript, nicht der Server.** Nur unter diesem
     * Attribut versteckt das Stylesheet die Einträge. Ohne JavaScript wird es
     * nie gesetzt, und alles steht da — dieselbe Absicherung wie
     * `data-fade-in` bei den Einblendungen.
     */
    let stapelFrame = 0
    let stapelAktiv = false

    /** Die Linie, ab der ein Eintrag als „an der Reihe" gilt. */
    const AUSLOESELINIE = 0.88

    const stapelEintraege = () =>
      element.querySelectorAll('li[class*="sceneItem"]:not([data-sichtbar])')

    const stapelMessen = () => {
      stapelFrame = 0
      const offen = stapelEintraege()
      if (offen.length === 0) {
        // Fertig, nicht abgeschaltet: Der Zuhörer geht, die Markierungen
        // bleiben. Sie abzuräumen würde die Einträge beim nächsten
        // Grössenwechsel grundlos noch einmal einblenden lassen.
        stapelZuhoererAus()
        return
      }
      const linie = window.innerHeight * AUSLOESELINIE
      for (const eintrag of offen) {
        if (eintrag.getBoundingClientRect().top <= linie) {
          eintrag.setAttribute('data-sichtbar', '')
        }
      }
    }

    const aufStapelScroll = () => {
      if (stapelFrame) return
      stapelFrame = requestAnimationFrame(stapelMessen)
    }

    /** Nur den Zuhörer lösen — die Markierungen bleiben stehen. */
    const stapelZuhoererAus = () => {
      window.removeEventListener('scroll', aufStapelScroll)
      if (stapelFrame) {
        cancelAnimationFrame(stapelFrame)
        stapelFrame = 0
      }
    }

    /** Vollständig zurückbauen: Desktop, reduzierte Bewegung, Abbau. */
    const stapelAus = () => {
      if (!stapelAktiv) return
      stapelAktiv = false
      stapelZuhoererAus()
      element.removeAttribute('data-stapel')
      for (const eintrag of element.querySelectorAll('li[class*="sceneItem"]')) {
        eintrag.removeAttribute('data-sichtbar')
      }
    }

    const stapelAn = () => {
      if (stapelAktiv) return
      if (element.querySelectorAll('li[class*="sceneItem"]').length === 0) return

      stapelAktiv = true
      element.setAttribute('data-stapel', 'an')
      window.addEventListener('scroll', aufStapelScroll, { passive: true })
      // Einmal sofort: Die Seite kann bereits gescrollt geladen worden sein
      // (Ankersprung, wiederhergestellte Position).
      stapelMessen()
    }

    const stapelPruefen = () => {
      if (reducedMotion.matches) return
      if (isStacked()) stapelAn()
      else stapelAus()
    }

    if (reducedMotion.matches) {
      applyFinalState()
      return
    }

    stapelPruefen()
    window.addEventListener('resize', stapelPruefen)

    // Startzustand setzen, bevor der erste Frame gemessen wird: Die Elemente
    // liegen per CSS auf `opacity: 0`, das Skript übernimmt ab hier.
    optionsRef.current.apply(0)

    let observer: IntersectionObserver | null = null

    if (typeof IntersectionObserver === 'undefined') {
      start()
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) start()
          else stop()
        },
        // Etwas Vorlauf, damit die Szene beim Hereinscrollen nicht erst
        // anspringt, wenn sie schon zur Hälfte im Bild steht.
        { rootMargin: '25% 0px 25% 0px' }
      )
      observer.observe(element)
    }

    const onMotionPreferenceChange = () => {
      if (!reducedMotion.matches) return
      observer?.disconnect()
      observer = null
      stop()
      stapelAus()
      applyFinalState()
    }
    reducedMotion.addEventListener('change', onMotionPreferenceChange)

    return () => {
      observer?.disconnect()
      stop()
      stapelAus()
      window.removeEventListener('resize', stapelPruefen)
      reducedMotion.removeEventListener('change', onMotionPreferenceChange)
      if (measureFrame) cancelAnimationFrame(measureFrame)
      if (loopFrame) cancelAnimationFrame(loopFrame)
    }
    // `ref` ist über die Lebensdauer der Komponente stabil und steht deshalb
    // bewusst nicht in der Abhängigkeitsliste — sonst würde jeder Renderdurchlauf
    // die Beobachter neu aufsetzen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

/**
 * Breite, ab der die zweispaltigen Abschnitte untereinander stehen.
 *
 * Der Wert steht doppelt — hier und als Medienabfrage in `basis.module.css`.
 * Die Aufteilung selbst macht CSS; das Skript braucht die Zahl nur, weil der
 * Fortschritt im gestapelten Fall aus einer anderen Größe gemessen wird.
 */
export const STACK_BREAKPOINT = 1100

export const isStacked = () => window.innerWidth <= STACK_BREAKPOINT
