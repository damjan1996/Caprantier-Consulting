'use client'

import { useRef, useState } from 'react'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '../seite/useReveal'
import { clamp01, isStacked, useScrollScene } from '../seite/useScrollScene'
import styles from './home.module.css'

/**
 * „Was am Telefon passiert“ — klebende Bühne wie Einstieg, Problem und Ablauf.
 *
 * Der häufigste Einwand gegen ausgelagerte Akquise ist die Vorstellung vom
 * Call-Center. Dagegen hilft keine Zusicherung, sondern Offenlegung: Links
 * läuft die Gesprächsanzeige mit, rechts steht, was in dieser Minute gesagt
 * wird. Wer den Abschnitt durchscrollt, hat ein Gespräch mitgehört.
 *
 * Die Uhr ist keine Animation mit eigener Laufzeit, sondern hängt am
 * Scrollstand — sonst liefe sie weiter, während man einen Schritt liest.
 *
 * Sechs Schritte, deshalb eine längere Bühne als bei den Abschnitten mit drei
 * (500vh statt 420vh, siehe `home.module.css`). Ab 1100px abwärts fällt die
 * Klebe-Mechanik weg: Die Schritte stehen dann untereinander, die Karte darüber.
 */

const STEPS = [
  {
    time: 'Vor dem Anruf',
    title: 'Wir wissen, wen wir anrufen – und warum',
    text: 'Unternehmen, Entscheider, aktueller Anlass: Vor jedem Gespräch steht Recherche. Kein Anruf aus einer Liste, sondern ein Grund, genau jetzt anzurufen.',
  },
  {
    time: '0:00 – 0:30',
    title: 'Einstieg in Ihrem Namen',
    text: 'Wir melden uns mit Ihrem Firmennamen und sagen in einem Satz, worum es geht. Kein „Störe ich gerade?“, kein auswendig gelerntes Skript – ein Kollege ruft an.',
  },
  {
    time: '0:30 – 2:30',
    title: 'Zuhören statt pitchen',
    text: 'Zwei, drei Fragen zur Situation: Wie läuft die Neukundengewinnung heute, was fehlt, was hat schon nicht funktioniert. Wir reden über sein Geschäft, nicht über unser Angebot.',
  },
  {
    time: '2:30 – 4:00',
    title: 'Qualifizieren – oder freundlich beenden',
    text: 'Drei Fragen entscheiden: Spricht der Entscheider? Gibt es ein konkretes Thema? Passt der Zeitpunkt? Fehlt eines davon, beenden wir das Gespräch sauber. Kein „Kaffeetrinken“-Termin landet in Ihrem Kalender.',
  },
  {
    time: '4:00 – 5:00',
    title: 'Termin direkt in Ihren Kalender',
    text: 'Konkreter Vorschlag, konkrete Uhrzeit. Die Einladung kommt aus Ihrem Kalender mit Ihrer Signatur – für den Entscheider war das ein Gespräch mit Ihrem Unternehmen.',
  },
  {
    time: 'Nach dem Anruf',
    title: 'Sie übernehmen mit Kontext',
    text: 'Gesprächsnotiz mit Situation, Thema und offenen Punkten – im CRM oder per Mail. Sie gehen nicht in einen Kalttermin, sondern setzen ein Gespräch fort.',
  },
]

/** Sekundenstand zu Beginn des jeweiligen Schritts. */
const STEP_SECONDS = [0, 0, 30, 150, 240, 300]
const CALL_LENGTH_SECONDS = 300

const STEP_LABELS = [
  'Recherche · noch nicht gewählt',
  'Einstieg · wir stellen uns vor',
  'Zuhören · Situation verstehen',
  'Qualifizieren · drei Fragen',
  'Termin · Vorschlag & Bestätigung',
  'Übergabe · Notiz ans Team',
]

const QUALIFICATIONS = ['Entscheider am Apparat', 'Konkretes Thema', 'Zeitpunkt passt']
const QUALIFICATION_THRESHOLDS = [0.5, 0.56, 0.62]

type Stage = { step: number; quals: number }
const INITIAL_STAGE: Stage = { step: 0, quals: 0 }

function formatTimer(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

export default function CallScene() {
  const { openCalendly, onHover } = useCalendly()
  const { ref: revealRef, isIn } = useReveal<HTMLDivElement>()

  const wrapRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLSpanElement>(null)
  const timerRef = useRef<HTMLSpanElement>(null)
  const clockRef = useRef<HTMLSpanElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const [stage, setStage] = useState<Stage>(INITIAL_STAGE)
  const stageRef = useRef<Stage>(INITIAL_STAGE)

  const sectionRef = useRef<HTMLElement>(null)

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

      const step = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length))
      const withinStep = clamp01(progress * STEPS.length - step)
      const nextStepSeconds = STEP_SECONDS[Math.min(STEPS.length - 1, step + 1)]
      const seconds = Math.round(
        STEP_SECONDS[step] + (nextStepSeconds - STEP_SECONDS[step]) * withinStep
      )

      if (timerRef.current) timerRef.current.textContent = formatTimer(seconds)
      if (clockRef.current) {
        clockRef.current.textContent = `14:0${Math.min(9, Math.floor(seconds / 60))} Uhr`
      }
      if (progressRef.current) {
        progressRef.current.style.width = `${(clamp01(seconds / CALL_LENGTH_SECONDS) * 100).toFixed(1)}%`
      }

      const quals =
        step < 3 ? 0 : QUALIFICATION_THRESHOLDS.filter((limit) => progress > limit).length
      const previous = stageRef.current
      if (step !== previous.step || quals !== previous.quals) {
        stageRef.current = { step, quals }
        setStage({ step, quals })
      }
    },
  })

  return (
    <section
      id="telefon"
      ref={sectionRef}
      className={styles.sceneCall}
      aria-labelledby="call-title"
    >
      <div ref={wrapRef} className={styles.sceneWrap}>
        <div className={styles.sceneStage}>
          <div ref={revealRef} className={styles.sceneGrid}>
            {/* Die Gesprächsanzeige steht links — sie ist das, was mitläuft. */}
            <div
              className={`${styles.sceneAside} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
              data-fade-in=""
              style={{ '--ry': '32px', '--rd': '0.22s' } as React.CSSProperties}
            >
        <div
          className={styles.callCard}
          role="img"
          aria-label="Darstellung eines laufenden Akquise-Anrufs: Gesprächsdauer, aktuelle Phase, drei Qualifizierungskriterien und der bestätigte Termin."
        >
          <div aria-hidden="true" className={styles.callTop}>
            <span className={styles.callFrom}>
              <span className={styles.callLive} />
              Ausgehend · im Namen von <b>Ihre Firma GmbH</b>
            </span>
            <span ref={clockRef} className={styles.callClock}>
              14:00 Uhr
            </span>
          </div>

          <div aria-hidden="true" className={styles.callWho}>
            <b>Maschinenbau GmbH</b>
            <span>Herr Meier · Geschäftsführer · 120 Mitarbeiter</span>
          </div>

          <div aria-hidden="true">
            <div className={styles.callTimerRow}>
              <span ref={timerRef} className={styles.callTimer}>
                0:00
              </span>
              <span className={styles.callTimerLabel}>Gesprächsdauer</span>
            </div>
            <div className={styles.callProgressTrack}>
              <div ref={progressRef} className={styles.callProgressFill} />
            </div>
          </div>

          <div aria-hidden="true" className={styles.callNow}>
            <span className={styles.callNowLabel}>Gerade</span>
            <span className={styles.callNowValue}>{STEP_LABELS[stage.step]}</span>
          </div>

          <div aria-hidden="true" className={styles.callQuals}>
            {QUALIFICATIONS.map((qualification, index) => (
              <div
                key={qualification}
                className={`${styles.qual} ${stage.quals > index ? styles.qualOn : ''}`}
              >
                <span className={styles.qualTick}>✓</span>
                <span>{qualification}</span>
              </div>
            ))}
          </div>

          <div
            aria-hidden="true"
            className={`${styles.callDone} ${stage.step >= 4 ? styles.callDoneOn : ''}`}
          >
            <span className={styles.callDoneText}>
              <b>Termin bestätigt · Do 14:30</b>
              <span>Einladung aus Ihrem Kalender, Notiz im CRM</span>
            </span>
            <span className={styles.callDoneFlag}>→ Ihr Kalender</span>
          </div>
        </div>

              {/* Der Aufruf steht bei der Karte, nicht hinter der Bühne.
                  Vorher lag er im Nachlauf: Wenn er ins Bild kam, waren Karte
                  und Schritte längst weggescrollt — ein Knopf ohne Bezug. */}
              <div className={styles.callAction}>
                <button
                  type="button"
                  className={`${styles.btnDark} ${styles.btnSmall}`}
                  onClick={openCalendly}
                  onMouseEnter={onHover}
                >
                  Erstgespräch buchen
                </button>
                <span className={styles.metaNote}>15 Minuten, direkt mit dem Gründer</span>
              </div>
            </div>

            <div className={styles.sceneCopy}>
              <div
                className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
              >
                Was am Telefon passiert
              </div>
              <h2
                id="call-title"
                className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.08s' } as React.CSSProperties}
              >
                Ein Anruf, wie ihn Ihr bester Mitarbeiter führen würde.
              </h2>
              <p
                className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.16s' } as React.CSSProperties}
              >
                Wir melden uns mit Ihrem Firmennamen, sprechen in der Wir-Form und kennen Ihr
                Angebot. Für die Gegenseite sind wir Ihr Vertrieb – so läuft ein typisches Gespräch
                ab.
              </p>

              <span className={styles.sceneRail} aria-hidden="true">
                <span ref={railRef} className={styles.sceneRailFill} />
              </span>

              <ol className={styles.sceneSlot}>
                {STEPS.map((step, index) => (
                  <li
                    key={step.title}
                    /* `stepActive` hellt Ziffer und Text auf — beides liegt
                       standardmäßig gedimmt, weil in der früheren Fassung alle
                       Schritte gleichzeitig sichtbar waren. */
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
                      <span className={styles.stepTime}>{step.time}</span>
                      <h3 className={styles.h3}>{step.title}</h3>
                      <p className={styles.body}>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
