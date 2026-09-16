'use client'

import { useEffect, useRef, useState } from 'react'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '../seite/useReveal'
import { STACK_BREAKPOINT, clamp01, isStacked, useScrollScene } from '../seite/useScrollScene'
import styles from './home.module.css'

/**
 * Der nächste Schritt — klebende Bühne wie die neun Abschnitte davor.
 *
 * Rechts füllt sich dieselbe Woche wie im Einstieg, nur diesmal als Ergebnis
 * statt als Versprechen: Termin für Termin am Scrollstand, nicht auf einer
 * eigenen Zeitachse. Der Bogen von oben nach unten ist Absicht — wer bis
 * hierher gescrollt hat, soll die Woche wiedererkennen.
 *
 * Links bleibt der Aufruf dabei die ganze Zeit stehen. Das ist der eigentliche
 * Grund für die Bühne: Vorher war der Abschluss mit anderthalb Bildschirmhöhen
 * der kürzeste Abschnitt der Seite — die Schaltfläche, auf die alles zuläuft,
 * war nach einem Wischen wieder weg.
 *
 * Ab 1100px abwärts fällt die Klebe-Mechanik weg. Dann stehen Karte, Woche und
 * Zeitpunkte untereinander, und die Woche füllt sich beim Einblenden: Es gibt
 * dort keinen Scrollweg mehr, an dem sie hängen könnte.
 */

/**
 * Termine je Wochentag. Die Zahl ist die Reihenfolge, in der sie erscheinen —
 * über die Woche verteilt, nicht Tag für Tag von links nach rechts.
 */
const WEEK = [
  { day: 'Mo', slots: [0, 4] },
  { day: 'Di', slots: [1] },
  { day: 'Mi', slots: [2, 5] },
  { day: 'Do', slots: [3] },
  { day: 'Fr', slots: [6] },
]

const TOTAL_SLOTS = WEEK.reduce((sum, day) => sum + day.slots.length, 0)

/** Einblendverzögerung der gestapelten Fassung, in derselben Reihenfolge. */
const stapelVerzoegerung = (order: number) => `${(0.7 + order * 0.15).toFixed(2)}s`

/**
 * Was nach dem Klick passiert.
 *
 * Bewusst dieselben Zeiträume wie im Abschnitt „Der Prozess“ — dort stehen sie
 * ausführlich, hier als Erinnerung neben der Schaltfläche. Zwei Fassungen
 * derselben Zusage, die auseinanderlaufen, wären schlimmer als keine.
 */
const TIMELINE = [
  {
    when: 'Heute · 15 Minuten',
    what: 'Das Erstgespräch',
    text: 'Sie schildern Ihre Situation, wir sagen ehrlich, ob und wie wir helfen können.',
  },
  {
    when: 'Woche 1–2 · Aufbau',
    what: 'Kick-off, Zielgruppe, Leitfaden',
    text: 'Eine Stunde Ihrer Zeit. Danach übernehmen wir – Recherche, Ansprache, Ihre Freigabe.',
  },
  {
    when: 'Ab Woche 2 · Termine',
    what: 'Gespräche in Ihrem Kalender',
    text: 'Qualifizierte Entscheider, Einladung aus Ihrem Kalender, Notiz zur Vorbereitung.',
  },
]

/**
 * Anteil der Bühne, über den sich die Woche füllt.
 *
 * Nicht von Anfang an: Der erste Zeitpunkt ist das Gespräch, da steht noch
 * nichts im Kalender. Und nicht bis zum Schluss — die volle Woche soll einen
 * Moment stehen bleiben, bevor der Abschnitt endet.
 */
const FILL_FROM = 0.3
const FILL_TO = 0.92

type Stand = {
  /** Sichtbarer Zeitpunkt. */
  aktiv: number
  /** Bereits eingetragene Termine. */
  gefuellt: number
}

const START: Stand = { aktiv: 0, gefuellt: 0 }

export default function ClosingCta() {
  const { openCalendly, onHover } = useCalendly()
  const { ref, isIn } = useReveal<HTMLDivElement>()

  const sectionRef = useRef<HTMLElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLSpanElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)

  const [stand, setStand] = useState<Stand>(START)
  const standRef = useRef<Stand>(START)

  useScrollScene(sectionRef, {
    measure: () => {
      if (isStacked()) {
        const section = sectionRef.current
        if (!section) return 0
        const rect = section.getBoundingClientRect()
        const lead = window.innerHeight * 0.5
        return (lead - rect.top) / Math.max(1, rect.height - window.innerHeight + lead)
      }

      const wrap = wrapRef.current
      if (!wrap) return 0
      const travel = wrap.offsetHeight - window.innerHeight
      return travel > 4 ? -wrap.getBoundingClientRect().top / travel : 1
    },

    apply: (progress) => {
      if (railRef.current) railRef.current.style.transform = `scaleX(${progress.toFixed(3)})`

      const aktiv = Math.min(TIMELINE.length - 1, Math.floor(progress * TIMELINE.length))
      const anteil = clamp01((progress - FILL_FROM) / (FILL_TO - FILL_FROM))
      const gefuellt = Math.round(anteil * TOTAL_SLOTS)

      // Der Zähler hängt am Scrollstand und wird deshalb direkt geschrieben,
      // nicht über den Zustand. Gestapelt zählt er beim Einblenden hoch.
      if (countRef.current && !isStacked()) countRef.current.textContent = String(gefuellt)

      const vorher = standRef.current
      if (aktiv !== vorher.aktiv || gefuellt !== vorher.gefuellt) {
        standRef.current = { aktiv, gefuellt }
        setStand({ aktiv, gefuellt })
      }
    },
  })

  /*
   * Gestapelt steht die ganze Karte auf einmal da — dann muss auch die Woche
   * auf einmal erscheinen. Der Zustand wird im Effekt gesetzt, nicht beim
   * Rendern: Auf dem Server gibt es keine Fensterbreite, und ein Lesen im
   * Render ergäbe eine Hydration-Abweichung.
   */
  const [stacked, setStacked] = useState(false)

  useEffect(() => {
    const abfrage = window.matchMedia(`(max-width: ${STACK_BREAKPOINT}px)`)
    const uebernehmen = () => setStacked(abfrage.matches)
    uebernehmen()
    abfrage.addEventListener('change', uebernehmen)
    return () => abfrage.removeEventListener('change', uebernehmen)
  }, [])

  /** Steht dieser Termin schon im Kalender? */
  const eingetragen = (order: number) => (stacked ? isIn : order < stand.gefuellt)

  /*
   * Der Zähler der gestapelten Fassung: Dort gibt es keinen Scrollstand, an
   * dem er hängen könnte, also läuft er einmal beim Einblenden hoch.
   */
  useEffect(() => {
    if (!stacked || !isIn) return
    const element = countRef.current
    if (!element) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.textContent = String(TOTAL_SLOTS)
      return
    }

    const start = performance.now() + 300
    let frame = 0

    const step = (now: number) => {
      const t = clamp01((now - start) / 800)
      element.textContent = String(Math.round(TOTAL_SLOTS * t))
      if (t < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [stacked, isIn])

  return (
    <section id="termin" ref={sectionRef} className={styles.sceneClose} aria-labelledby="cta-title">
      <div ref={wrapRef} className={styles.sceneWrap}>
        <div className={styles.sceneStage}>
          {/* Die dunkle Karte ist hier das Gitter der Bühne. */}
          <div
            ref={ref}
            className={`${styles.sceneGrid} ${styles.ctaCard} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--ry': '32px' } as React.CSSProperties}
          >
            <div className={styles.sceneCopy}>
              <div
                className={`${styles.eyebrow} ${styles.ctaEyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.15s' } as React.CSSProperties}
              >
                Der nächste Schritt
              </div>

              <h2
                id="cta-title"
                className={`${styles.ctaTitle} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.22s' } as React.CSSProperties}
              >
                In 15 Minuten wissen Sie, ob wir Ihren Kalender füllen können.
              </h2>

              <p
                className={`${styles.ctaText} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.3s' } as React.CSSProperties}
              >
                Ein kurzes Gespräch mit Nico – kein Pitch, keine Präsentation. Sie schildern Ihre
                Situation, wir sagen ehrlich, ob und wie wir helfen können.
              </p>

              <div
                className={`${styles.actionRow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.4s' } as React.CSSProperties}
              >
                <button
                  type="button"
                  className={`${styles.btnPrimary} ${styles.ctaBtn}`}
                  onClick={openCalendly}
                  onMouseEnter={onHover}
                >
                  <span>Erstgespräch buchen</span>
                  <span className={styles.btnHint}>15 Min.</span>
                </button>
                <a
                  href="mailto:info@carpantier-consulting.de"
                  className={`${styles.textLink} ${styles.ctaMailLink}`}
                >
                  Lieber schreiben? info@carpantier-consulting.de
                </a>
              </div>

              <div
                className={`${styles.ctaMeta} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.5s' } as React.CSSProperties}
              >
                <span>Unverbindlich &amp; kostenlos</span>
                <span className={styles.dot} aria-hidden="true" />
                <span>Direkt mit dem Gründer</span>
                <span className={styles.dot} aria-hidden="true" />
                <span>Nur 5 Kunden pro Monat</span>
              </div>

              <span className={styles.sceneRail} aria-hidden="true">
                <span ref={railRef} className={styles.sceneRailFill} />
              </span>
            </div>

            <div
              className={`${styles.ctaVisual} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
              data-fade-in=""
              style={{ '--ry': '28px', '--rd': '0.35s' } as React.CSSProperties}
            >
              {/* Nur der Kalender ist Bild. Die Zeitpunkte darunter sind Text
                  und stehen deshalb ausserhalb dieses Elements: Was in einem
                  `role="img"` liegt, liest eine Vorlesehilfe nicht mehr vor. */}
              <div
                className={styles.ctaWeekBox}
                role="img"
                aria-label="Beispielhafte Woche zwei Wochen nach dem Start: sieben Termine, verteilt von Montag bis Freitag."
              >
                <div className={styles.ctaVisualHead}>
                  <b>Ihre Woche in 14 Tagen</b>
                  <span className={styles.ctaCount}>
                    <span ref={countRef} className={styles.ctaCountValue}>
                      {TOTAL_SLOTS}
                    </span>
                    <span className={styles.ctaCountLabel}>Termine</span>
                  </span>
                </div>

                <div className={styles.ctaWeek}>
                  {WEEK.map((entry) => (
                    <div key={entry.day} className={styles.ctaDay}>
                      <span className={styles.ctaDayLabel}>{entry.day}</span>
                      <div className={styles.ctaDaySlots}>
                        {entry.slots.map((order) => (
                          <span
                            key={order}
                            className={`${styles.ctaBlock} ${eingetragen(order) ? styles.ctaBlockOn : ''}`}
                            data-fade-in=""
                            /* Stehend hängt jeder Block am Scrollstand; eine
                               Verzögerung liesse ihn dem Rad hinterherlaufen.
                               Gestapelt staffelt sie die Woche. */
                            style={
                              {
                                '--rd': stacked ? stapelVerzoegerung(order) : '0s',
                              } as React.CSSProperties
                            }
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/*
                Drei Zeitpunkte, einer nach dem anderen. Bewusst kein
                `aria-hidden` auf den nicht sichtbaren: Sie sind ein
                zusammenhängender Ablauf, den eine Vorlesehilfe am Stück
                durchgehen soll — wie bei den häufigen Fragen.
              */}
              <ol className={`${styles.sceneSlot} ${styles.closeTimeline}`}>
                {TIMELINE.map((entry, index) => (
                  <li
                    key={entry.when}
                    className={`${styles.sceneItem} ${
                      index === stand.aktiv
                        ? styles.sceneItemOn
                        : index < stand.aktiv
                          ? styles.sceneItemDone
                          : ''
                    }`}
                  >
                    <span className={styles.closeWhen}>{entry.when}</span>
                    <b className={styles.closeWhat}>{entry.what}</b>
                    <span className={styles.closeText}>{entry.text}</span>
                  </li>
                ))}
              </ol>

              <span aria-hidden="true" className={styles.ctaVisualNote}>
                Beispielhafte Woche, keine echten Kundendaten
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
