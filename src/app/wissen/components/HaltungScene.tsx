'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import { isStacked, useScrollScene } from '@/app/components/seite/useScrollScene'
import styles from './wissen.module.css'

/**
 * „Wie wir schreiben“ — klebende Bühne mit drei Einträgen.
 *
 * Auf einer Wissensseite ist die Frage hinter jedem Text dieselbe: Warum soll
 * ich dem hier glauben? Zwischen zehntausend Seiten über B2B-Vertrieb ist das
 * die einzige Auskunft, die nur diese Seite geben kann — deshalb bekommt sie
 * die Bühne und nicht die Beitragsliste.
 *
 * Der Verweis auf die KI-Transparenz steht in der **stehenden** Spalte, nicht
 * im dritten Eintrag: Nicht sichtbare Bühneneinträge liegen auf `opacity: 0`
 * und `pointer-events: none`, sind mit der Tastatur aber weiterhin
 * erreichbar. Ein Verweis darin wäre ein Sprungziel, das niemand sieht.
 */
const REGELN = [
  {
    zahl: 'Regel 1',
    titel: 'Ein Thema, ein Text',
    text: 'Zur selben Frage gibt es keinen zweiten Beitrag in Kurzform. Wer etwas sucht, soll einen vollständigen Text finden und nicht vier angerissene.',
    folge: 'Das ist der Grund, warum hier wenige Beiträge stehen und keine Themenliste wächst.',
  },
  {
    zahl: 'Regel 2',
    titel: 'Zahlen und Paragraphen mit Herkunft',
    text: 'Wo eine Zahl steht, steht auch, worauf sie beruht. Rechtsfragen nennen den Paragraphen – und dazu den Hinweis, dass eine Einordnung keine Rechtsberatung ist.',
    folge: 'Eine Zahl ohne Herkunft wird gestrichen, nicht gerundet.',
  },
  {
    zahl: 'Regel 3',
    titel: 'Mit KI geschrieben, von Hand geprüft',
    text: 'Die Texte entstehen mit Unterstützung künstlicher Intelligenz und werden vor der Veröffentlichung redaktionell geprüft. Die inhaltliche Verantwortung trägt der im Impressum genannte Anbieter.',
    folge: 'Jeder Beitrag und das Glossar tragen diesen Hinweis sichtbar, mit dem Datum der letzten Prüfung.',
  },
]

export default function HaltungScene() {
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

      const next = Math.min(REGELN.length - 1, Math.floor(progress * REGELN.length))
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
    },
  })

  return (
    <section
      id="haltung"
      ref={sectionRef}
      className={styles.sceneHaltung}
      aria-labelledby="haltung-title"
    >
      <div ref={wrapRef} className={styles.sceneWrap}>
        <div className={styles.sceneStage}>
          <div ref={revealRef} className={styles.sceneGrid}>
            <div className={styles.sceneCopy}>
              <div
                className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
              >
                Wie wir schreiben
              </div>

              <h2
                id="haltung-title"
                className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.08s' } as React.CSSProperties}
              >
                Kein Beitrag, der nur da ist, damit etwas da ist.
              </h2>

              <p
                className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.16s' } as React.CSSProperties}
              >
                Drei Regeln entscheiden, ob hier etwas erscheint. Sie sind der Grund, warum es
                wenige Texte sind – und warum jeder einzelne eine Frage zu Ende beantwortet.
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
                  <span>Frage im Gespräch klären</span>
                  <span className={styles.btnHint}>15 Min.</span>
                </button>
                <Link
                  href="/ki-transparenz"
                  className={`${styles.textLink} ${styles.textLinkMuted}`}
                >
                  Wo wir KI einsetzen
                </Link>
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
                  eigenständige Absätze, kein dekoratives Wiederholungsmuster
                  (Baukasten § 4.4, Regel 3). */}
              <ol className={styles.sceneSlot}>
                {REGELN.map((regel, index) => (
                  <li
                    key={regel.zahl}
                    className={`${styles.sceneItem} ${
                      index === active
                        ? styles.sceneItemOn
                        : index < active
                          ? styles.sceneItemDone
                          : ''
                    }`}
                  >
                    <article className={styles.haltCard}>
                      <span className={styles.haltZahl}>{regel.zahl}</span>
                      <h3 className={styles.haltTitel}>{regel.titel}</h3>
                      <p className={styles.haltText}>{regel.text}</p>
                      <p className={styles.haltFolge}>{regel.folge}</p>
                    </article>
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
