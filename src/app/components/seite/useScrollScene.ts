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

    /* Telefon-Bühne — die Funktionen dazu stehen weiter unten. */
    let buehneAktiv = false

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

    /*
     * Woher der Zielwert kommt.
     *
     * Klebt der Abschnitt auf dem Telefon, ist es dieselbe Rechnung wie auf
     * dem Desktop: der zurückgelegte Anteil der Klebestrecke. Die Szenen
     * liefern das nicht selbst — ihr `measure` kennt nur „Bühne über 1100px"
     * und „gestapelt darunter".
     */
    const zielWert = () => (buehneAktiv ? buehneFortschritt() : optionsRef.current.measure())

    const onScroll = () => {
      if (measureFrame) return
      measureFrame = requestAnimationFrame(() => {
        measureFrame = 0
        target = clamp01(zielWert())
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
     * Das hier ist der **Rückfall**, nicht der Regelfall: Passt die ganze
     * Komposition — Überschrift, Fliesstext und der höchste Eintrag — in ein
     * Fenster, klebt stattdessen der Abschnitt (siehe „Telefon-Bühne" weiter
     * unten). Passt sie nicht, übernimmt ein Beobachter, was sonst die Bühne
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

    /* ----------------------------------------------------- Telefon-Bühne */

    /*
     * Auf dem Telefon klebt derselbe Abschnitt wie auf dem Desktop — nur
     * einspaltig und enger gesetzt: Überschrift oben, Karte darunter, und die
     * Karte wechselt, während man scrollt.
     *
     * **Warum nicht nur der Kasten klebt.** Am 16.09.2026 stand hier eine
     * Fassung, die die Textspalte vorbeiscrollen liess und allein den Kasten
     * anhielt. Passt immer — sieht aber schlechter aus als gar keine Bewegung:
     * Der Kasten ist so hoch wie sein höchster Eintrag, bei den kurzen Szenen
     * 128px. Übrig bleibt ein schmaler Streifen mitten in einem leeren
     * Bildschirm, und das über die ganze Klebestrecke.
     *
     * **Passen muss sie trotzdem.** Deshalb wird nicht geschätzt, sondern
     * nachgemessen: Bühne einrichten, Höhe des Gitters gegen die freie Höhe
     * halten, und bei Überlänge wieder abräumen. Der Abschnitt fällt dann auf
     * die gestapelte Einblendung zurück. Abgeschnitten wird nie etwas.
     *
     * **Abschalten je Szene** über `--buehne-mobil: aus` im Stylesheet der
     * Seite.
     */

    /** Luft, die unter der Bühne frei bleibt. */
    const BUEHNE_LUFT = 12
    /** Klebestrecke je Eintrag, als Anteil der Fensterhöhe. */
    const REISE_JE_EINTRAG = 0.55
    /** Untergrenze je Eintrag — quer gehaltene Telefone sind knapp 400px hoch. */
    const REISE_MIN_JE_EINTRAG = 280
    /** Deckel für die gesamte Klebestrecke, in Fensterhöhen. */
    const REISE_DECKEL = 4.5

    const buehneWrap = () => element.querySelector<HTMLElement>('[class*="sceneWrap"]')
    const buehneGitter = () => element.querySelector<HTMLElement>('[class*="sceneGrid"]')
    const buehneKasten = () => element.querySelector<HTMLElement>('[class*="sceneSlot"]')

    const buehneAus = () => {
      if (!buehneAktiv) return
      buehneAktiv = false
      element.removeAttribute('data-buehne')
      element.style.removeProperty('--buehne-slot')
      element.style.removeProperty('--buehne-reise')
    }

    /**
     * Richtet die Bühne ein und räumt sie wieder ab, wenn sie nicht passt.
     *
     * Die Höhe des höchsten Eintrags muss im Fluss gemessen werden: Steht die
     * Bühne, liegen die Einträge übereinander und geben nichts mehr her. Der
     * Aufrufer räumt deshalb vorher ab.
     */
    const buehneVersuchen = () => {
      const kasten = buehneKasten()
      const gitter = buehneGitter()
      const wrap = buehneWrap()
      if (!kasten || !gitter || !wrap || kasten.children.length < 2) return false

      const stil = getComputedStyle(element)
      if (stil.getPropertyValue('--buehne-mobil').trim() === 'aus') return false

      /*
       * Erst stauchen, dann messen.
       *
       * `messen` schaltet die enge Fassung ein und lässt die Einträge im
       * Fluss. Würde die Höhe vorher genommen, stünde die *ungestauchte*
       * Karte als `min-height` im Kasten — die Karten würden schmaler, der
       * Kasten bliebe hoch, und die Stauchung brächte nichts.
       */
      element.setAttribute('data-buehne', 'messen')

      let hoechster = 0
      for (const eintrag of kasten.children) {
        const hoehe = eintrag.getBoundingClientRect().height
        if (hoehe > hoechster) hoechster = hoehe
      }
      if (hoechster < 1) {
        element.removeAttribute('data-buehne')
        return false
      }

      const anzahl = kasten.children.length
      const jeEintrag = Math.max(REISE_MIN_JE_EINTRAG, window.innerHeight * REISE_JE_EINTRAG)
      const reise = Math.min(window.innerHeight * REISE_DECKEL, jeEintrag * anzahl)

      element.style.setProperty('--buehne-slot', Math.ceil(hoechster) + 'px')
      element.style.setProperty('--buehne-reise', Math.round(reise) + 'px')
      element.setAttribute('data-buehne', 'mobil')
      buehneAktiv = true

      /*
       * Jetzt erst die Probe. Nicht rechnen, sondern messen: Was das Gitter
       * in der gestauchten Fassung tatsächlich braucht, steht in seinem
       * Rechteck — samt aller Abstände, die auf dem Weg noch dazukommen.
       */
      const kopfhoehe = parseFloat(stil.getPropertyValue('--header-h')) || 72
      const untenLuft = parseFloat(stil.getPropertyValue('--buehne-unten')) || 0
      const frei = window.innerHeight - kopfhoehe - untenLuft - BUEHNE_LUFT
      if (gitter.getBoundingClientRect().height > frei) {
        buehneAus()
        return false
      }
      return true
    }

    /** 0 am Anfang der Klebestrecke, 1 an ihrem Ende. */
    const buehneFortschritt = () => {
      const wrap = buehneWrap()
      if (!wrap) return 0
      const strecke = wrap.offsetHeight - window.innerHeight
      return strecke > 4 ? -wrap.getBoundingClientRect().top / strecke : 1
    }

    /* ------------------------------------------------------ Lage bestimmen */

    const modusPruefen = () => {
      if (reducedMotion.matches) return

      if (!isStacked()) {
        buehneAus()
        stapelAus()
        return
      }

      // Erst abräumen, dann messen: Beide Fassungen verstellen genau die
      // Höhen, aus denen die Entscheidung fällt.
      buehneAus()
      stapelAus()
      if (buehneVersuchen()) {
        onScroll()
        return
      }
      stapelAn()
    }

    /*
     * Neu entscheiden, aber nicht bei jedem `resize`.
     *
     * Auf Telefonen feuert `resize` jedes Mal, wenn die Browserleiste ein- oder
     * ausfährt — gut zehn Prozent Fensterhöhe. Hinge die Bühne daran, könnte
     * eine Szene im Scrollen zwischen beiden Fassungen hin- und herspringen.
     * Die Messung beim Laden ist die vorsichtige, weil die Leiste dann steht.
     */
    let letzteBreite = window.innerWidth
    let letzteHoehe = window.innerHeight
    let masseFrame = 0

    const aufGroessenwechsel = () => {
      const breite = window.innerWidth
      const hoehe = window.innerHeight
      const sprung = Math.abs(hoehe - letzteHoehe) > letzteHoehe * 0.2
      if (breite === letzteBreite && !sprung) return
      letzteBreite = breite
      letzteHoehe = hoehe
      if (masseFrame) cancelAnimationFrame(masseFrame)
      masseFrame = requestAnimationFrame(() => {
        masseFrame = 0
        modusPruefen()
      })
    }

    if (reducedMotion.matches) {
      applyFinalState()
      return
    }

    modusPruefen()
    window.addEventListener('resize', aufGroessenwechsel)

    /* Einmal nachmessen, wenn Schriften und Bilder stehen — vorher kann die
       gemessene Höhe zu einer anderen Seite gehören als die spätere. */
    const nachLaden = () => modusPruefen()
    if (document.readyState !== 'complete') {
      window.addEventListener('load', nachLaden, { once: true })
    }

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
      buehneAus()
      applyFinalState()
    }
    reducedMotion.addEventListener('change', onMotionPreferenceChange)

    return () => {
      observer?.disconnect()
      stop()
      stapelAus()
      buehneAus()
      window.removeEventListener('resize', aufGroessenwechsel)
      window.removeEventListener('load', nachLaden)
      reducedMotion.removeEventListener('change', onMotionPreferenceChange)
      if (measureFrame) cancelAnimationFrame(measureFrame)
      if (loopFrame) cancelAnimationFrame(loopFrame)
      if (masseFrame) cancelAnimationFrame(masseFrame)
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
