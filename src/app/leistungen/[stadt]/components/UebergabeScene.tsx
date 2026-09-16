'use client'

import { useRef, useState } from 'react'
import { Clock, FileSignature, PhoneOutgoing } from 'lucide-react'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import { isStacked, useScrollScene } from '@/app/components/seite/useScrollScene'
import styles from './stadt.module.css'

/**
 * „Die Übergabe“ — klebende Bühne mit drei Einträgen.
 *
 * Der tragende Abschnitt dieser Seitenfamilie. Wer „Vertriebsagentur <Stadt>“
 * sucht, hat eine andere Frage als jemand auf `/kaltakquise/[stadt]`: nicht
 * „darf man anrufen“, sondern „soll ich den Vertrieb abgeben — und was bleibt
 * dann bei mir“. Genau das steht hier, in der Reihenfolge, in der die Frage
 * gestellt wird.
 *
 * Die mittlere Karte ist die, wegen der jemand weiterliest: Sie sagt, was wir
 * **nicht** übernehmen. Deshalb trägt sie als einzige einen Rahmen statt einer
 * Fläche — kein zweiter Farbton, nur ein anderer Anschnitt.
 */
const SCHRITTE = [
  {
    kind: 'An uns',
    Marke: PhoneOutgoing,
    titel: 'Alles bis zum Termin',
    text: 'Zielgruppe und Liste, die Anrufe in Ihrem Namen, die Qualifizierung und der wöchentliche Bericht. Wir melden uns mit Ihrem Firmennamen; für die Gegenseite sind wir Ihr Vertrieb.',
    punkte: [
      'Auswahlkriterium je Kontakt, schriftlich festgehalten',
      'Anruf in Ihrem Namen, in der Wir-Form',
      'Rolle, Bedarf und Zeitpunkt vorab geklärt',
      'Einladung aus Ihrem Kalender, Notiz in Ihrem CRM',
    ],
    halten: false,
  },
  {
    kind: 'Bei Ihnen',
    Marke: FileSignature,
    titel: 'Angebot, Preis, Abschluss',
    text: 'Das Verkaufsgespräch führen Sie. Was Ihr Angebot kostet und wem Sie zusagen, entscheidet niemand aus einer Agentur – dafür kennt niemand Ihr Geschäft gut genug.',
    punkte: [
      'Das Verkaufsgespräch selbst',
      'Preis, Angebot und Verhandlung',
      'Die Entscheidung, wen Sie annehmen',
      'Die Kundenbeziehung danach',
    ],
    halten: true,
  },
  {
    kind: 'Ihr Aufwand',
    Marke: Clock,
    titel: '90 Minuten Setup, dann 30 pro Woche',
    text: 'Zwei Gespräche zu Beginn, danach ein wöchentlicher Abgleich. Weniger geht nicht, weil die Nachsteuerung an Ihrem Wissen über Ihre Kunden hängt – nicht an unserem.',
    punkte: [
      'Kick-off: Zielgruppe und Angebot',
      'Freigabe des Gesprächsgerüsts',
      'Wöchentlicher Abgleich, 30 Minuten',
      'Rückmeldung, was aus den Terminen wurde',
    ],
    halten: false,
  },
]

export default function UebergabeScene() {
  const { openCalendly, onHover } = useCalendly()
  const { ref: revealRef, isIn } = useReveal<HTMLDivElement>()

  const sectionRef = useRef<HTMLElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLSpanElement>(null)

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

      const next = Math.min(SCHRITTE.length - 1, Math.floor(progress * SCHRITTE.length))
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
    },
  })

  return (
    <section
      id="uebergabe"
      ref={sectionRef}
      className={styles.sceneUebergabe}
      aria-labelledby="uebergabe-title"
    >
      <div ref={wrapRef} className={styles.sceneWrap}>
        <div className={styles.sceneStage}>
          <div ref={revealRef} className={styles.sceneGrid}>
            <div className={styles.sceneCopy}>
              <div
                className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
              >
                Die Übergabe
              </div>

              <h2
                id="uebergabe-title"
                className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.08s' } as React.CSSProperties}
              >
                Was an uns geht, was bei Ihnen bleibt – und was es Sie kostet.
              </h2>

              <p
                className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.16s' } as React.CSSProperties}
              >
                Vertrieb auslagern heißt nicht, ihn abzugeben. Die Trennlinie liegt dort, wo aus
                einem Termin ein Angebot wird.
              </p>

              <div
                className={`${styles.pinAction} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--ry': '14px', '--rd': '0.24s' } as React.CSSProperties}
              >
                <button
                  type="button"
                  className={`${styles.btnDark} ${styles.btnSmall}`}
                  onClick={openCalendly}
                  onMouseEnter={onHover}
                >
                  <span>Übergabe durchsprechen</span>
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
              {/* Kein `aria-hidden` auf den nicht sichtbaren Einträgen: drei
                  eigenständige Abschnitte über die Arbeitsteilung, kein
                  dekoratives Muster (Baukasten § 4.4, Regel 3). */}
              <ol className={styles.sceneSlot}>
                {SCHRITTE.map((schritt, index) => {
                  const { Marke } = schritt
                  return (
                    <li
                      key={schritt.kind}
                      className={`${styles.sceneItem} ${
                        index === active
                          ? styles.sceneItemOn
                          : index < active
                            ? styles.sceneItemDone
                            : ''
                      }`}
                    >
                      <article
                        className={`${styles.uebCard} ${schritt.halten ? styles.uebCardHalten : ''}`}
                      >
                        <div className={styles.uebTop}>
                          <span className={styles.uebMark} aria-hidden="true">
                            <Marke />
                          </span>
                          <h3 className={styles.h3}>{schritt.titel}</h3>
                          <span className={styles.uebKind}>{schritt.kind}</span>
                        </div>

                        <p className={styles.uebText}>{schritt.text}</p>

                        <ul className={styles.uebList}>
                          {schritt.punkte.map((punkt) => (
                            <li key={punkt}>
                              <span className={styles.uebBullet} aria-hidden="true" />
                              <span>{punkt}</span>
                            </li>
                          ))}
                        </ul>
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
