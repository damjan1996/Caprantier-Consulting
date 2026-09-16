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
    let buehneOben = 0
    let buehneReise = 0
    let buehneAbstand = 0

    const smoothing = optionsRef.current.smoothing ?? 0.12

    /*
     * Woher der Zielwert kommt.
     *
     * Auf der Telefon-Bühne aus der Klebestrecke des Kastens, sonst aus der
     * Messung des Abschnitts. Die Szenen liefern beide Fälle nicht selbst: Ihr
     * `measure` kennt nur „Bühne über 1100px" und „gestapelt darunter" — die
     * dritte Lage wäre sonst zweiundzwanzigmal dieselbe Rechnung.
     */
    const zielWert = () => (buehneAktiv ? buehneFortschritt() : optionsRef.current.measure())

    /*
     * Wohin der geglättete Wert geht.
     *
     * Zusätzlich zur Szene bekommt der Abschnitt ihn als `--buehne-fortschritt`.
     * Daran hängt die Leiste unter dem klebenden Kasten: Auf dem Telefon ist
     * die Leiste aus der Textspalte längst aus dem Bild gescrollt, wenn der
     * Kasten zu arbeiten anfängt.
     */
    const umsetzen = (wert: number) => {
      if (buehneAktiv) element.style.setProperty('--buehne-fortschritt', wert.toFixed(3))
      optionsRef.current.apply(wert)
    }

    const runLoop = () => {
      loopFrame = 0
      const distance = target - current
      if (Math.abs(distance) < 0.0008) {
        if (current !== target) {
          current = target
          umsetzen(current)
        }
        return
      }
      current += distance * smoothing
      umsetzen(current)
      loopFrame = requestAnimationFrame(runLoop)
    }

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
      umsetzen(1)
    }

    /*
     * Gestapelt: jeder Eintrag blendet beim Hereinscrollen einzeln ein.
     *
     * Unter `STACK_BREAKPOINT` gibt es keine Klebe-Bühne — die Einträge stehen
     * untereinander im Fluss. Bis zum 16.09.2026 standen sie damit auch alle
     * sofort sichtbar da: Auf dem Telefon war von der scrollgebundenen
     * Bewegung, die diese Website ausmacht, nichts mehr übrig.
     *
     * Das hier ist seit dem 16.09.2026 der **Rückfall**, nicht mehr der
     * Regelfall: Passt der höchste Eintrag zwischen Kopfzeile und
     * Fensterunterkante, klebt stattdessen der Kasten (siehe „Telefon-Bühne“
     * weiter unten). Passt er nicht — schmales Fenster, hohe Karte —, bleibt es
     * bei dieser Einblendung. Ein Eintrag wird sichtbar, wenn er an der Reihe
     * ist.
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
     * Was auf dem Desktop der ganze Abschnitt tut, tut auf dem Telefon der
     * Kasten mit den Einträgen: Er bleibt stehen, während man scrollt, und die
     * Einträge wechseln darin.
     *
     * **Warum nicht die Desktop-Bühne.** Dort klebt `.sceneStage` über 100vh
     * und nimmt Textspalte *und* Kasten mit. Auf einem Telefon passt das nicht.
     * Gemessen über sieben Seiten und vier Telefongrössen braucht allein die
     * Textspalte — Auszeichnung, Überschrift, Fliesstext, Schaltfläche —
     * zwischen 300 und 620px. Zusammen mit dem höchsten Eintrag stehen 14 von
     * 22 Szenen auf einem 390x844-Fenster über der Fensterhöhe, die schlimmste
     * um 450px. Einrichten liesse sich das nur, indem auf dem Telefon der
     * Fliesstext verschwindet.
     *
     * Also klebt hier nur der Kasten. Die Textspalte scrollt normal vorbei,
     * dann bleibt der Kasten stehen und arbeitet seine Einträge ab. Passen
     * muss damit nur noch der höchste Eintrag.
     *
     * **Und wenn der nicht passt.** Dann bleibt es bei der gestapelten
     * Einblendung darüber. Die Entscheidung fällt aus der Messung, nicht aus
     * einer gepflegten Liste von Ausnahmen: Auf einem kleinen Telefon fallen
     * die hohen Karten von selbst zurück, auf einem grossen bekommen sie die
     * Bühne. Abgeschnitten wird nie etwas.
     *
     * **Abschalten je Szene** über `--buehne-mobil: aus` im Stylesheet der
     * Seite — gedacht für Szenen, deren Kasten in einer Karte steckt.
     */

    /** Mindestluft zwischen Kopfzeile und Kasten. */
    const BUEHNE_OBEN = 12
    /** Fortschrittsleiste unter dem Kasten, samt Abstand davor. */
    const BUEHNE_LEISTE = 18
    /** Klebestrecke je Eintrag, als Anteil der Fensterhöhe. */
    const REISE_JE_EINTRAG = 0.62
    /*
     * Untergrenze je Eintrag.
     *
     * Ein quer gehaltenes Telefon ist rund 390px hoch; 0,62 davon sind 242px
     * Scrollstrecke je Eintrag. Die Überblendung dauert eine halbe Sekunde —
     * die Karten liefen ineinander, statt sich abzulösen. Im Hochformat
     * greift die Grenze nicht.
     */
    const REISE_MIN_JE_EINTRAG = 300
    /** Deckel für die gesamte Klebestrecke, in Fensterhöhen. */
    const REISE_DECKEL = 4.2

    /*
     * Die Klebestrecke steht als `:has(> .sceneSlot)::after` im Stylesheet.
     * Ein Browser ohne `:has()` bekommt sie nicht — der Kasten hätte dann
     * nichts, worin er kleben könnte, würde aber trotzdem nur einen Eintrag
     * zeigen. Solche Browser bekommen deshalb gleich die gestapelte Fassung.
     */
    const kannHas =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('selector(:has(*))')

    const buehneKasten = () => element.querySelector<HTMLElement>('[class*="sceneSlot"]')

    /**
     * Steckt der Kasten in einem Elternteil, der ihn beschneidet?
     *
     * Ein klebender Kasten darf den Inhaltskasten seines Elternteils nicht
     * verlassen. Beschneidet einer der Elternteile — `overflow` alles ausser
     * `visible` —, klebt er entweder gar nicht oder wird beim Kleben
     * abgeschnitten. Die Terminszenen aller sieben Seiten sind genau dieser
     * Fall: Ihr Kasten liegt in der dunklen Karte, und die hat
     * `overflow: hidden`, damit ihre Rundung greift.
     *
     * Solche Szenen bleiben bei der gestapelten Einblendung. Gemessen statt
     * gepflegt: Eine Liste von Ausnahmen wäre beim nächsten Umbau falsch.
     */
    const buehneBeschnitten = () => {
      let knoten = buehneKasten()?.parentElement ?? null
      while (knoten) {
        const stil = getComputedStyle(knoten)
        if (stil.overflowX !== 'visible' || stil.overflowY !== 'visible') return true
        if (knoten === element) return false
        knoten = knoten.parentElement
      }
      return false
    }

    const buehneAus = () => {
      if (!buehneAktiv) return
      buehneAktiv = false
      buehneReise = 0
      element.removeAttribute('data-buehne')
      element.style.removeProperty('--buehne-oben')
      element.style.removeProperty('--buehne-slot')
      element.style.removeProperty('--buehne-reise')
      element.style.removeProperty('--buehne-fortschritt')
    }

    /**
     * Misst im Fluss und richtet die Bühne ein, wenn sie passt.
     *
     * Muss im Fluss messen: Steht die Bühne bereits, liegen die Einträge
     * übereinander und geben ihre Höhe nicht mehr her. Der Aufrufer räumt
     * deshalb vorher ab.
     */
    const buehneVersuchen = () => {
      if (!kannHas) return false

      const kasten = buehneKasten()
      if (!kasten || kasten.children.length < 2) return false

      const stil = getComputedStyle(element)
      if (stil.getPropertyValue('--buehne-mobil').trim() === 'aus') return false
      if (buehneBeschnitten()) return false

      const kopfhoehe = parseFloat(stil.getPropertyValue('--header-h')) || 72
      // Was am unteren Rand belegt ist. Auf der Startseite steht dort ab dem
      // ersten Scrollen die Buchungsleiste; die Seite meldet ihre Höhe über
      // `--buehne-unten`, weil sie zum Zeitpunkt dieser Messung noch gar nicht
      // eingeblendet ist und sich deshalb nicht messen lässt.
      const untenLuft = parseFloat(stil.getPropertyValue('--buehne-unten')) || 0

      let hoechster = 0
      for (const eintrag of kasten.children) {
        const hoehe = eintrag.getBoundingClientRect().height
        if (hoehe > hoechster) hoechster = hoehe
      }
      if (hoechster < 1) return false

      const verfuegbar = window.innerHeight - kopfhoehe - untenLuft
      const rest = verfuegbar - hoechster - BUEHNE_LEISTE
      if (rest < BUEHNE_OBEN * 2) return false

      // Mittig zwischen Kopfzeile und belegtem Rand: Der Kasten oben
      // festgenagelt liesse bei kurzen Einträgen ein halbes Fenster leer.
      buehneOben = kopfhoehe + Math.round(rest / 2)
      const jeEintrag = Math.max(REISE_MIN_JE_EINTRAG, window.innerHeight * REISE_JE_EINTRAG)
      buehneReise = Math.min(
        window.innerHeight * REISE_DECKEL,
        jeEintrag * kasten.children.length
      )
      element.style.setProperty('--buehne-oben', buehneOben + 'px')
      element.style.setProperty('--buehne-slot', Math.ceil(hoechster) + 'px')
      element.style.setProperty('--buehne-reise', Math.round(buehneReise) + 'px')
      element.setAttribute('data-buehne', 'mobil')
      buehneAktiv = true

      /*
       * Die Oberkante des Kastens, bevor er klebt — gemessen vom Abschnitt
       * aus, weil dessen Rechteck vom Kleben unberührt bleibt.
       *
       * Zwei Fallen stecken in diesen zwei Zeilen, beide gemessen:
       *
       * 1. **Erst jetzt, nicht vorher.** Gestapelt steht der Kasten über der
       *    Überschrift (`order: -1`), auf der Bühne darunter. Vor dem Attribut
       *    gemessen, gehört der Wert zur falschen Reihenfolge — der
       *    Fortschritt stand dann schon bei 0,15, als der Kasten die
       *    Klebekante erst erreichte.
       * 2. **Kurz losgelöst.** Steht die Bühne bereits und wird mitten im
       *    Abschnitt neu gemessen, liefert das Rechteck die *klebende* Lage.
       *    `position: static` für die Dauer einer Messung gibt die
       *    natürliche zurück.
       */
      const klebend = kasten.style.position
      kasten.style.position = 'static'
      buehneAbstand =
        kasten.getBoundingClientRect().top - element.getBoundingClientRect().top
      if (klebend) kasten.style.position = klebend
      else kasten.style.removeProperty('position')

      return true
    }

    /** 0 bei Klebebeginn, 1 am Ende der Strecke. */
    const buehneFortschritt = () => {
      if (buehneReise <= 0) return 0
      const natuerlichOben = element.getBoundingClientRect().top + buehneAbstand
      return (buehneOben - natuerlichOben) / buehneReise
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
      // Höhen, aus denen die Entscheidung gefällt wird.
      buehneAus()
      if (buehneVersuchen()) {
        stapelAus()
        onScroll()
        return
      }
      stapelAn()
    }

    /*
     * Neu entscheiden, aber nicht bei jedem `resize`.
     *
     * Auf Telefonen feuert `resize` jedes Mal, wenn die Browserleiste ein- oder
     * ausfährt — das sind gut zehn Prozent Fensterhöhe. Hinge die Bühne daran,
     * könnte eine Szene im Scrollen zwischen beiden Fassungen hin- und
     * herspringen. Die Messung beim Laden ist die vorsichtige, weil die Leiste
     * dann steht; es zählt deshalb nur, was wirklich eine andere Lage ist: eine
     * andere Breite oder ein Sprung in der Höhe, wie beim Drehen.
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

    /*
     * Einmal nachmessen, wenn alles geladen ist.
     *
     * Die Bühne merkt sich, wo der Kasten ohne Kleben stünde. Verschiebt sich
     * darüber noch etwas — eine nachgeladene Schrift, ein Bild ohne feste
     * Grösse —, zeigt der gemerkte Wert daneben, und der Fortschritt läuft
     * dem Scrollen um genau diesen Betrag voraus oder hinterher.
     */
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
