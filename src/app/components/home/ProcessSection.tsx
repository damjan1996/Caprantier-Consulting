'use client'

import { useEffect, useRef, useState } from 'react'
import { homeProcessSteps } from '@/lib/home-content'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '../seite/useReveal'
import { STACK_BREAKPOINT, clamp01, easeOut, isStacked, useScrollScene } from '../seite/useScrollScene'
import styles from './home.module.css'

/**
 * „Der Prozess“ — klebende Bühne wie Einstieg, Problem, Ablauf und Telefon.
 *
 * Die Aufwandsbalken sind der eigentliche Inhalt: Der häufigste stille Einwand
 * lautet nicht „zu teuer“, sondern „dafür habe ich keine Zeit“. Zwei Gespräche,
 * danach null Eigenaufwand — das steht als Balken in jeder Karte, und der
 * Balken läuft erst an, wenn seine Karte vorne steht.
 *
 * Die Schritte kommen aus `src/lib/home-content.ts`, weil dieselben Angaben als
 * HowTo-Markup ausgeliefert werden.
 *
 * Ab 1100px abwärts fällt die Klebe-Mechanik weg: Die Karten stehen dann
 * untereinander, und alle Balken laufen — sonst blieben drei von vier leer.
 */

export default function ProcessSection() {
  const { openCalendly, onHover } = useCalendly()
  const { ref: revealRef, isIn } = useReveal<HTMLDivElement>()

  const sectionRef = useRef<HTMLElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLSpanElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)

  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  const letzter = homeProcessSteps.length - 1

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

      const next = Math.min(letzter, Math.floor(progress * homeProcessSteps.length))
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
    },
  })

  /*
   * Gestapelt stehen alle vier Karten gleichzeitig da — dann müssen auch alle
   * Balken laufen. Der Zustand wird im Effekt gesetzt, nicht beim Rendern: Auf
   * dem Server gibt es keine Fensterbreite, und ein Lesen im Render ergäbe eine
   * Hydration-Abweichung.
   */
  const [stacked, setStacked] = useState(false)

  useEffect(() => {
    const abfrage = window.matchMedia(`(max-width: ${STACK_BREAKPOINT}px)`)
    const uebernehmen = () => setStacked(abfrage.matches)
    uebernehmen()
    abfrage.addEventListener('change', uebernehmen)
    return () => abfrage.removeEventListener('change', uebernehmen)
  }, [])

  /** Läuft die Darstellung dieser Karte? Gestapelt: alle. */
  const laeuft = (index: number) => stacked || index === active

  /*
   * Zählt von 3 auf 8 und bleibt dann auf der Spanne „3–8“ stehen — dieselbe
   * Zahl, die oben im Einstieg versprochen wird. Anlass ist die letzte Karte,
   * nicht das Einblenden des Abschnitts: Vorher lief der Zähler ab, während
   * man noch beim ersten Schritt stand.
   */
  const zaehlerLaeuft = stacked ? isIn : active === letzter

  useEffect(() => {
    if (!zaehlerLaeuft) return
    const element = countRef.current
    if (!element) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.textContent = '3–8'
      return
    }

    const start = performance.now() + 350
    let frame = 0

    const step = (now: number) => {
      const t = easeOut(clamp01((now - start) / 900))
      element.textContent = t >= 1 ? '3–8' : String(Math.round(3 + 5 * t))
      if (t < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [zaehlerLaeuft])

  return (
    <section
      id="prozess"
      ref={sectionRef}
      className={styles.sceneProcess}
      aria-labelledby="process-title"
    >
      <div ref={wrapRef} className={styles.sceneWrap}>
        <div className={styles.sceneStage}>
          <div ref={revealRef} className={styles.sceneGrid}>
            <div className={styles.sceneCopy}>
              <div
                className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
              >
                Der Prozess
              </div>
              <h2
                id="process-title"
                className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.08s' } as React.CSSProperties}
              >
                Vier Schritte. Weniger als 90 Minuten Ihrer Zeit.
              </h2>
              <p
                className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.16s' } as React.CSSProperties}
              >
                Zwei Gespräche mit Ihnen, dann übernehmen wir. Die ersten qualifizierten Termine
                stehen in der Regel innerhalb von 14 Tagen in Ihrem Kalender.
              </p>

              {/* Der Satz beantwortet den stillen Einwand „worauf lasse ich
                  mich ein?“ und steht deshalb unmittelbar vor dem Aufruf.
                  Vorher lag er hinter der Bühne — dort stand er ohne Bezug
                  zwischen zwei Abschnitten. */}
              <p
                className={`${styles.procNote} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.2s' } as React.CSSProperties}
              >
                Keine Mindestlaufzeit-Falle, keine versteckten Fristen. Wir empfehlen drei Monate,
                damit der Prozess seine Wirkung entfaltet – und überzeugen mit Ergebnissen, nicht
                mit Verträgen.
              </p>

              <div
                className={`${styles.pinAction} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--ry': '14px', '--rd': '0.28s' } as React.CSSProperties}
              >
                <button
                  type="button"
                  className={`${styles.btnDark} ${styles.btnSmall}`}
                  onClick={openCalendly}
                  onMouseEnter={onHover}
                >
                  <span>Schritt 1 starten</span>
                  <span className={styles.btnHint}>15 Min.</span>
                </button>
              </div>

              <span className={styles.sceneRail} aria-hidden="true">
                <span ref={railRef} className={styles.sceneRailFill} />
              </span>
            </div>

            <div
              className={`${styles.sceneAside} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
              data-fade-in=""
              style={{ '--ry': '32px', '--rd': '0.22s' } as React.CSSProperties}
            >
              <ol className={styles.sceneSlot}>
                {homeProcessSteps.map((step, index) => {
                  const isLast = index === letzter
                  return (
                    <li
                      key={step.title}
                      className={`${styles.sceneItem} ${
                        index === active
                          ? styles.sceneItemOn
                          : index < active
                            ? styles.sceneItemDone
                            : ''
                      }`}
                      aria-hidden={index === active ? undefined : true}
                    >
                      <article
                        className={`${styles.procCard} ${isLast ? styles.procCardAccent : ''}`}
                      >
                        <div className={styles.procCardTop}>
                          <span className={styles.procPhase}>{step.phase}</span>
                          <span
                            className={`${styles.procEffort} ${step.effortIsFree ? styles.procEffortFree : ''}`}
                          >
                            {step.effort}
                          </span>
                        </div>

                        <div>
                          <h3 className={styles.procCardTitle}>{step.title}</h3>
                          <p className={styles.procCardText} style={{ marginTop: '10px' }}>
                            {step.description}
                          </p>
                        </div>

                        {isLast ? (
                          <div className={styles.procCount}>
                            <span ref={countRef} className={styles.procCountValue}>
                              3
                            </span>
                            <span className={styles.procCountLabel}>Termine pro Woche</span>
                          </div>
                        ) : (
                          <div className={styles.procEffortMeter}>
                            <div>
                              <span>Ihr Aufwand</span>
                              <b>{step.effortLabel}</b>
                            </div>
                            <div className={styles.procEffortTrack}>
                              <div
                                className={styles.procEffortFill}
                                style={
                                  {
                                    width: laeuft(index) ? `${step.effortShare}%` : '0%',
                                    '--rd': '0.5s',
                                  } as React.CSSProperties
                                }
                              />
                            </div>
                          </div>
                        )}
                      </article>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
