'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import LiteYouTube from '@/components/ui/LiteYouTube'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '../seite/useReveal'
import { clamp01, easeOut, isStacked, useScrollScene } from '../seite/useScrollScene'
import styles from './home.module.css'

/**
 * „Das Problem“ — eine klebende Bühne wie der Einstieg.
 *
 * Die Aussage des Abschnitts ist eine zeitliche: Der Ausfall kommt verzögert.
 * Genau das lässt sich schlecht behaupten und gut zeigen — deshalb leert sich
 * die Pipeline im Diagramm erst, während man schon beim zweiten Punkt liest.
 *
 * Die Szene bleibt dafür stehen, und die drei Punkte wechseln an Ort und
 * Stelle. Die frühere Fassung liess die Punkte vorbeiscrollen; um dabei auf
 * die Verweildauer des Einstiegs zu kommen, hätte zwischen ihnen jeweils eine
 * halbe Bildschirmhöhe Leerraum stehen müssen. Stehend kostet dieselbe Dauer
 * keinen leeren Pixel.
 *
 * Ab 1100px abwärts fällt die Klebe-Mechanik weg (siehe `home.module.css`):
 * Die Punkte stehen dann untereinander, das Diagramm darüber.
 *
 * Das Video stammt aus dem eigenen Kanal und lädt erst nach ausdrücklicher
 * Einwilligung (`LiteYouTube`), nicht beim Aufruf der Seite.
 */

/*
 * Getauscht am 09.09.2026 (Commit d877351), damals noch in der alten
 * `VideoHighlight`-Komponente. Die ist mit dem Umbau der Startseite entfallen;
 * das Video steht seitdem hier. Wer es wieder tauscht, ändert nur diese zwei
 * Zeilen — der Titel ist der Fallbacktext, solange das Vorschaubild lädt.
 */
const VIDEO = {
  id: 'LevIt3mHrng',
  title: 'Was passiert, wenn du keine Kaltakquise machst',
}

const STEPS = [
  {
    title: 'Kein System, nur Zufall',
    text: 'Ohne konstante Ansprache bleibt nur, was von allein kommt: Empfehlungen, alte Kontakte, Glück. Planbar ist das nicht.',
  },
  {
    title: 'Der Ausfall kommt verzögert',
    text: 'Er zeigt sich nicht sofort, sondern zwei, drei Monate später – wenn vorne in der Pipeline nichts mehr nachkommt.',
  },
  {
    title: 'Verhandeln aus der Schwäche',
    text: 'Wer erst anfängt, wenn es eng wird, verhandelt aus der schwächeren Position – und nimmt Aufträge an, die eigentlich nicht passen.',
  },
]

const CHART_TITLES = [
  'Anfragen, die von allein kommen',
  'Die Lücke kommt mit Verzögerung',
  'Was übrig bleibt',
]

/** Ausgangshöhen der acht Monatsbalken, 0–1. */
const BARS = [0.55, 0.22, 0.72, 0.18, 0.42, 0.66, 0.28, 0.5]

/*
 * Reihenfolge, in der die Balken aufkommen — bewusst ungeordnet.
 *
 * Der erste Punkt heisst „Kein System, nur Zufall“. Kämen die Monate der
 * Reihe nach, sähe das nach Plan aus. Springend gelesen sieht man, was der
 * Text behauptet: Es kommt, was kommt — Empfehlung hier, alter Kontakt da.
 */
const RISE_ORDER = [2, 5, 0, 6, 3, 7, 1, 4]

/** Für jeden Balken seine Position in `RISE_ORDER`. */
const RISE_SLOT = BARS.map((_, index) => RISE_ORDER.indexOf(index))
const MONTHS = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug']

const CHIPS = [
  { title: 'Auftrag angenommen', detail: '30\u00A0% unter Preis' },
  { title: 'Projekt angenommen', detail: 'falsche Zielgruppe' },
  { title: 'Kunde angenommen', detail: 'kein Fit, viel Aufwand' },
]

type Stage = {
  step: number
  markerA: boolean
  markerB: boolean
  /** Anzahl der bereits aufgedeckten Nachteils-Karten, 0–3. */
  chips: number
}

const INITIAL_STAGE: Stage = { step: 0, markerA: false, markerB: false, chips: 0 }

export default function ProblemScene() {
  const { openCalendly, onHover } = useCalendly()
  const { ref: revealRef, isIn } = useReveal<HTMLDivElement>()

  const wrapRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLSpanElement>(null)
  const barRefs = useRef<(HTMLDivElement | null)[]>([])

  const [stage, setStage] = useState<Stage>(INITIAL_STAGE)
  const stageRef = useRef<Stage>(INITIAL_STAGE)

  const sectionRef = useRef<HTMLElement>(null)

  useScrollScene(sectionRef, {
    measure: () => {
      if (isStacked()) {
        // Gestapelt klebt nichts: Der Fortschritt kommt aus der Lage des
        // Abschnitts im Fenster, damit das Diagramm trotzdem mitläuft.
        const section = sectionRef.current
        if (!section) return 0
        const rect = section.getBoundingClientRect()
        const lead = window.innerHeight * 0.5
        return (lead - rect.top) / Math.max(1, rect.height - window.innerHeight + lead)
      }

      // Stehend: derselbe Weg wie im Einstieg — der Anteil der bereits
      // zurückgelegten Klebestrecke.
      const wrap = wrapRef.current
      if (!wrap) return 0
      const travel = wrap.offsetHeight - window.innerHeight
      return travel > 4 ? -wrap.getBoundingClientRect().top / travel : 1
    },

    apply: (progress) => {
      if (railRef.current) railRef.current.style.transform = `scaleX(${progress.toFixed(3)})`

      // Erstes Drittel: Die Balken kommen einzeln auf, in ungeordneter Folge.
      const riseProgress = clamp01(progress / 0.3)

      /*
       * Der Einbruch wandert von links nach rechts durch die Monate: Jeder
       * Balken beginnt später zu fallen als sein Vorgänger.
       *
       * Bewusst **ohne** `easeOut` auf dem Phasenfortschritt. Die Kurve ist
       * expo-out und steht bei einem Drittel schon bei 0,88 — als Taktgeber
       * für die Staffelung hiesse das: Der Einbruch ist nach einem Zehntel
       * der Strecke durch, und den Rest steht das Diagramm still. Geglättet
       * wird der Wert je Balken, nicht die Zeit selbst.
       */
      const drainProgress = clamp01((progress - 0.3) / 0.36)
      const leftoverProgress = clamp01((progress - 0.66) / 0.28)

      for (let i = 0; i < BARS.length; i += 1) {
        const bar = barRefs.current[i]
        if (!bar) continue

        const rise = easeOut(clamp01((riseProgress * 10.5 - RISE_SLOT[i]) / 2.5))
        const drain = easeOut(clamp01((drainProgress * 11 - i) / 3))

        bar.style.height = `${(BARS[i] * rise * (1 - 0.94 * drain) * 100).toFixed(1)}%`

        // Farbig markiert ist immer nur der Balken, der sich gerade bewegt —
        // beim Aufkommen wie beim Wegbrechen.
        const isRising = rise > 0.02 && rise < 0.98 && drainProgress < 0.05
        const isDraining = drain < 0.5 && i > 0 && drainProgress > 0.05 && drainProgress < 1
        bar.classList.toggle(styles.barDraining, isRising || isDraining)
      }

      const next: Stage = {
        step: progress < 0.34 ? 0 : progress < 0.67 ? 1 : 2,
        markerA: drainProgress > 0.05 && leftoverProgress < 0.5,
        markerB: drainProgress > 0.5 && leftoverProgress < 0.5,
        // Weiter auseinandergezogen als die anderen Phasen: Die drei Karten
        // sind der Schluss und sollen einzeln gelesen werden.
        chips:
          leftoverProgress > 0.8 ? 3 : leftoverProgress > 0.45 ? 2 : leftoverProgress > 0.1 ? 1 : 0,
      }

      const previous = stageRef.current
      if (
        next.step !== previous.step ||
        next.markerA !== previous.markerA ||
        next.markerB !== previous.markerB ||
        next.chips !== previous.chips
      ) {
        stageRef.current = next
        setStage(next)
      }
    },
  })

  return (
    <section
      id="problem"
      ref={sectionRef}
      className={styles.sceneProblem}
      aria-labelledby="problem-title"
    >
      <div ref={wrapRef} className={styles.sceneWrap}>
        <div className={styles.sceneStage}>
          <div ref={revealRef} className={styles.sceneGrid}>
            <div className={styles.sceneCopy}>
              <div
                className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
              >
                Das Problem
              </div>
              <h2
                id="problem-title"
                className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.08s' } as React.CSSProperties}
              >
                Wer Akquise dem Zufall überlässt, merkt es erst, wenn die Pipeline leer ist.
              </h2>

              {/* Fortschritt über die drei Punkte. Ersetzt die frühere
                  senkrechte Schiene: Die Punkte liegen jetzt übereinander,
                  eine Schiene neben ihnen hätte nichts mehr abgebildet. */}
              <span className={styles.sceneRail} aria-hidden="true">
                <span ref={railRef} className={styles.sceneRailFill} />
              </span>

              <ol className={styles.sceneSlot}>
                {STEPS.map((step, index) => (
                  <li
                    key={step.title}
                    /* `stepActive` hellt Ziffer und Text auf — beides liegt
                       standardmäßig gedimmt, weil in der früheren Fassung alle
                       drei Punkte gleichzeitig sichtbar waren. */
                    className={`${styles.sceneItem} ${
                      index === stage.step
                        ? `${styles.sceneItemOn} ${styles.stepActive}`
                        : index < stage.step
                          ? styles.sceneItemDone
                          : ''
                    }`}
                    aria-hidden={index === stage.step ? undefined : true}
                  >
                    <span className={styles.stepDot} aria-hidden="true">
                      {index + 1}
                    </span>
                    <div className={styles.stepBody}>
                      <h3 className={styles.h3}>{step.title}</h3>
                      <p className={styles.body}>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div
              className={`${styles.sceneAside} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
              data-fade-in=""
              style={{ '--ry': '32px', '--rd': '0.22s' } as React.CSSProperties}
            >
          <div
            className={styles.chart}
            role="img"
            aria-label="Diagramm über acht Monate: Ohne laufende Akquise brechen die Anfragen mit einigen Monaten Verzögerung ein, bis die Pipeline leer ist."
          >
            <div aria-hidden="true">
              <div className={styles.chartHead}>
                <div className={styles.chartTitles}>
                  {CHART_TITLES.map((title, index) => (
                    <span
                      key={title}
                      className={`${styles.chartTitle} ${stage.step === index ? styles.chartTitleOn : ''}`}
                    >
                      {title}
                    </span>
                  ))}
                </div>
                <span className={styles.chartUnit}>Pipeline · 8 Monate</span>
              </div>

              <div className={styles.chartBars}>
                <div className={styles.barGrid}>
                  {BARS.map((_, index) => (
                    <div
                      key={MONTHS[index]}
                      ref={(element) => {
                        barRefs.current[index] = element
                      }}
                      className={styles.bar}
                    />
                  ))}
                </div>

                <div
                  className={`${styles.marker} ${styles.markerA}`}
                  style={{ opacity: stage.markerA ? 1 : 0 }}
                >
                  <span className={styles.markerLabel}>Akquise gestoppt</span>
                </div>
                <div
                  className={`${styles.marker} ${styles.markerB}`}
                  style={{ opacity: stage.markerB ? 1 : 0 }}
                >
                  <span className={styles.markerLabel}>Pipeline leer</span>
                </div>

                <div className={styles.chips}>
                  {CHIPS.map((chip, index) => (
                    <div
                      key={chip.title}
                      className={`${styles.chip} ${stage.chips > index ? styles.chipOn : ''}`}
                      style={{ '--rd': `${index * 0.06}s` } as React.CSSProperties}
                    >
                      <b>{chip.title}</b>
                      <span>·</span>
                      <span>{chip.detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.chartAxis}>
                {MONTHS.map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sceneAfter}>
        <div className={styles.actionRow}>
          <button
            type="button"
            className={`${styles.btnDark} ${styles.btnSmall}`}
            onClick={openCalendly}
            onMouseEnter={onHover}
          >
            Erstgespräch buchen
          </button>
          <Link href="/wissen/videos" className={styles.textLink}>
            Alle Videos ansehen <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={styles.videoRow}>
          <LiteYouTube id={VIDEO.id} title={VIDEO.title} />
          <div className={styles.videoCopy}>
            <span className={styles.eyebrow}>Im Video</span>
            <p className={styles.body}>
              Nico erklärt, warum Akquise ohne System immer zu spät kommt – und was ein fester
              Rhythmus verändert.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
