'use client'

import { useRef, useState } from 'react'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '../seite/useReveal'
import { isStacked, useScrollScene } from '../seite/useScrollScene'
import styles from './home.module.css'

/**
 * „Für wen wir arbeiten – und für wen nicht.“
 *
 * Der Abschnitt sagt vier Dinge ausdrücklich ab. Das ist kein Understatement,
 * sondern der wirksamste Teil der Seite: Wer sich in der rechten Spalte
 * wiedererkennt, bucht kein Erstgespräch, das ohnehin zu nichts führt — und
 * wer sich in der linken wiedererkennt, weiß, dass die Zusage etwas bedeutet.
 *
 * Der Selbsttest darunter macht dieselbe Prüfung in zehn Sekunden. Er läuft
 * vollständig im Browser: Es wird nichts gesendet, nichts gespeichert.
 */

const GOOD_FIT = [
  {
    title: 'B2B-Dienstleister mit erklärungsbedürftigem Angebot',
    detail:
      'Personalvermittlung, IT-Systemhäuser, Beratung, SaaS, Software- und Web-Agenturen, Industriezulieferer.',
  },
  {
    title: 'Kundenwert ab 10.000\u00A0€',
    detail: 'Erst dann rechnet sich persönliche Akquise am Telefon für Sie – und für uns.',
  },
  {
    title: 'Jemand, der Termine wahrnimmt und abschließt',
    detail: 'Wir liefern das Gespräch. Sie führen es weiter – Sie oder Ihr Vertrieb.',
  },
  {
    title: 'Geduld für drei Monate',
    detail: 'Erste Termine in 14 Tagen, planbare Zahlen nach dem ersten Quartal.',
  },
]

const BAD_FIT = [
  {
    title: 'Endkunden-Geschäft',
    detail:
      'Kaltakquise am Telefon funktioniert zwischen Unternehmen. Privatkunden rufen wir nicht an.',
  },
  {
    title: 'Kleine Ticketgrößen',
    detail: 'Unter 10.000\u00A0€ Kundenwert frisst der Aufwand die Marge – bei Ihnen und bei uns.',
  },
  {
    title: '„Hauptsache viele Termine“',
    detail:
      'Wir liefern qualifizierte Gespräche mit Entscheidern. Wer Masse will, ist bei einem Call-Center besser aufgehoben.',
  },
  {
    title: 'Ergebnis bis nächste Woche',
    detail:
      'Setup braucht rund 14 Tage, planbare Zahlen drei Monate. Wer das nicht mitgeht, wird enttäuscht.',
  },
]

const INDUSTRY_TAGS = [
  'Personalvermittlung',
  'IT-Systemhaus',
  'Unternehmensberatung',
  'SaaS',
  'Software- & Web-Agentur',
  'Industriezulieferer',
]

const QUESTIONS = [
  'Verkaufen Sie an Unternehmen, nicht an Privatkunden?',
  'Ist ein Kunde über die Laufzeit mindestens 10.000\u00A0€ wert?',
  'Gibt es jemanden, der gelieferte Termine wahrnimmt und abschließt?',
]

type Answer = boolean | null

/** Auswertung des Selbsttests: Überschrift, Text und ob der CTA erscheint. */
function verdict(answers: Answer[]) {
  const answered = answers.filter((answer) => answer !== null).length
  const yes = answers.filter((answer) => answer === true).length

  if (answered < 3) {
    return {
      title: answered === 0 ? 'Noch nichts angeklickt.' : `${answered} von 3 beantwortet.`,
      text: 'Beantworten Sie die drei Fragen – ehrlich, nicht optimistisch. Es dauert zehn Sekunden.',
      ready: false,
    }
  }

  if (yes === 3) {
    return {
      title: 'Sieht nach einem Fit aus.',
      text: 'B2B, Kundenwert stimmt, jemand schließt ab: Das ist genau der Rahmen, in dem unsere Akquise funktioniert. Das Erstgespräch lohnt sich.',
      ready: true,
    }
  }

  if (yes === 2) {
    const text =
      answers[2] === false
        ? 'Termine ohne jemanden, der sie führt, verpuffen. Wenn Sie das intern lösen können, sprechen wir gern.'
        : answers[1] === false
          ? 'Unter 10.000\u00A0€ Kundenwert wird es eng. Wenn der Wert über die Laufzeit höher liegt als gedacht, lohnt sich das Gespräch trotzdem.'
          : 'Reines Endkunden-Geschäft können wir nicht bedienen. Gibt es einen B2B-Anteil, sprechen wir über den.'
    return { title: 'Wahrscheinlich ja – ein Punkt ist offen.', text, ready: true }
  }

  return {
    title: 'Ehrlich: eher kein Fit.',
    text: 'Wir würden Ihnen im Erstgespräch dasselbe sagen. Wenn sich etwas ändert – gern später wieder.',
    ready: false,
  }
}

export default function FitSection() {
  const { openCalendly, onHover } = useCalendly()
  const { ref, isIn } = useReveal<HTMLDivElement>()
  const [answers, setAnswers] = useState<Answer[]>([null, null, null])

  const sectionRef = useRef<HTMLElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLSpanElement>(null)

  /** 0 = „Dafür sind wir gemacht“, 1 = „Dafür nicht“. */
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

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

      const next = progress < 0.5 ? 0 : 1
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
    },
  })

  const answer = (index: number, value: boolean) => {
    setAnswers((current) => {
      const next = current.slice()
      // Nochmaliges Klicken auf dieselbe Antwort nimmt sie zurück.
      next[index] = next[index] === value ? null : value
      return next
    })
  }

  const result = verdict(answers)

  return (
    <section
      id="passt-das"
      ref={sectionRef}
      className={styles.sceneFit}
      aria-labelledby="fit-title"
    >
      <div ref={wrapRef} className={styles.sceneWrap}>
        <div className={styles.sceneStage}>
          <div ref={ref} className={styles.sceneGrid}>
            <div className={styles.sceneCopy}>
            <div
              className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
              data-fade-in=""
            >
              Für wen wir arbeiten – und für wen nicht
            </div>
            <h2
              id="fit-title"
              className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
              data-fade-in=""
              style={{ '--rd': '0.08s' } as React.CSSProperties}
            >
              Wir passen nicht zu jedem. Das sagen wir Ihnen nach 15 Minuten.
            </h2>
            <p
              className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
              data-fade-in=""
              style={{ '--rd': '0.16s' } as React.CSSProperties}
            >
              Wir nehmen maximal fünf Kunden pro Monat auf. Deshalb prüfen wir vorher genau – auf
              beiden Seiten. Das spart Ihnen Geld und uns Gespräche, die nirgendwo hinführen.
            </p>

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
                <li
                  className={`${styles.sceneItem} ${active === 0 ? styles.sceneItemOn : styles.sceneItemDone}`}
                  aria-hidden={active === 0 ? undefined : true}
                >
          <article className={styles.fitCard}>
            <div className={styles.fitCardHead}>
              <span className={styles.fitMark} aria-hidden="true">
                ✓
              </span>
              <h3 className={styles.fitCardTitle}>Dafür sind wir gemacht</h3>
            </div>
            <ul className={styles.fitList}>
              {GOOD_FIT.map((item) => (
                <li key={item.title}>
                  <span className={styles.fitBullet} aria-hidden="true" />
                  <span className={styles.fitItemText}>
                    <b>{item.title}</b>
                    <span>{item.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className={styles.fitTags}>
              {INDUSTRY_TAGS.map((tag) => (
                <span key={tag} className={styles.fitTag}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
                </li>

                <li
                  className={`${styles.sceneItem} ${active === 1 ? styles.sceneItemOn : ''}`}
                  aria-hidden={active === 1 ? undefined : true}
                >
          <article className={`${styles.fitCard} ${styles.fitCardDark}`}>
            <div className={styles.fitCardHead}>
              <span className={styles.fitMark} aria-hidden="true">
                –
              </span>
              <h3 className={styles.fitCardTitle}>Dafür nicht</h3>
            </div>
            <ul className={styles.fitList}>
              {BAD_FIT.map((item) => (
                <li key={item.title}>
                  <span className={styles.fitBulletDark} aria-hidden="true" />
                  <span className={styles.fitItemText}>
                    <b>{item.title}</b>
                    <span>{item.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className={styles.fitNote}>
              Wenn es nicht passt, sagen wir das im Erstgespräch – und wenn wir können, wohin Sie
              sich stattdessen wenden sollten.
            </p>
          </article>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sceneAfter}>
        <div
          className={`${styles.fitCheck} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--ry': '28px', '--rd': '0.1s' } as React.CSSProperties}
        >
          <div className={styles.fitCheckCopy}>
            <span className={styles.eyebrow}>Kurzer Selbsttest</span>
            <h3 className={styles.fitCheckTitle}>
              Drei Fragen, dann wissen Sie, ob sich das Erstgespräch lohnt.
            </h3>
            <div className={styles.fitVerdict} aria-live="polite">
              <b>{result.title}</b>
              <span>{result.text}</span>
            </div>
            {result.ready && (
              <button
                type="button"
                className={`${styles.btnPrimary} ${styles.btnSmall}`}
                style={{ alignSelf: 'flex-start' }}
                onClick={openCalendly}
                onMouseEnter={onHover}
              >
                <span>Erstgespräch buchen</span>
                <span className={styles.btnHint}>15 Min.</span>
              </button>
            )}
          </div>

          <div className={styles.fitQuestions}>
            {QUESTIONS.map((question, index) => (
              <div key={question} className={styles.fitQuestion}>
                <span id={`fit-q${index}`}>{question}</span>
                <div className={styles.segmented} role="group" aria-labelledby={`fit-q${index}`}>
                  <button
                    type="button"
                    className={`${styles.segBtn} ${styles.segBtnYes}`}
                    aria-pressed={answers[index] === true}
                    onClick={() => answer(index, true)}
                  >
                    Ja
                  </button>
                  <button
                    type="button"
                    className={`${styles.segBtn} ${styles.segBtnNo}`}
                    aria-pressed={answers[index] === false}
                    onClick={() => answer(index, false)}
                  >
                    Nein
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
