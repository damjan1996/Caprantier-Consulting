'use client'

import { useRef, useState } from 'react'
import { homeFaqs } from '@/lib/home-content'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '../seite/useReveal'
import { isStacked, useScrollScene } from '../seite/useScrollScene'
import styles from './home.module.css'

/**
 * Häufige Fragen — klebende Bühne wie die übrigen Abschnitte.
 *
 * Die Antworten stehen in `src/lib/home-content.ts`, weil dieselben Texte als
 * FAQPage-Markup ausgeliefert werden. Strukturierte Daten müssen den sichtbaren
 * Inhalt wiedergeben — zwei Textstände wären ein Verstoß, den man der Seite
 * nicht ansieht.
 *
 * Das frühere Akkordeon ist entfallen: Neun zugeklappte Zeilen waren ein
 * Abschnitt von anderthalb Bildschirmhöhen, an dem man vorbeiscrollt. Jetzt
 * steht jede Frage mit ihrer Antwort offen da und bekommt ihren eigenen
 * Moment.
 *
 * Wichtig dabei: Die nicht sichtbaren Antworten liegen auf `opacity: 0`, nicht
 * auf `display: none` (siehe `.sceneItem`). Sie bleiben damit im
 * ausgelieferten HTML, für Suchmaschinen lesbar und über die Seitensuche des
 * Browsers auffindbar.
 */

export default function FaqSection() {
  const { openCalendly, onHover } = useCalendly()
  const { ref, isIn } = useReveal<HTMLDivElement>()

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

      const next = Math.min(homeFaqs.length - 1, Math.floor(progress * homeFaqs.length))
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
    },
  })

  return (
    <section
      id="fragen"
      ref={sectionRef}
      className={styles.sceneFaq}
      aria-labelledby="faq-title"
    >
      <div ref={wrapRef} className={styles.sceneWrap}>
        <div className={styles.sceneStage}>
          <div ref={ref} className={styles.sceneGrid}>
            <div className={styles.sceneCopy}>
              <div
                className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
              >
                Häufige Fragen
              </div>
              <h2
                id="faq-title"
                className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.08s' } as React.CSSProperties}
              >
                Was Entscheider uns vor dem ersten Gespräch fragen.
              </h2>
              <p
                className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.16s' } as React.CSSProperties}
              >
                Die kurzen Antworten stehen hier. Die lange Version – auf Ihr Unternehmen bezogen –
                gibt es im Erstgespräch.
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
                <a
                  href="mailto:info@carpantier-consulting.de"
                  className={`${styles.textLink} ${styles.textLinkMuted}`}
                >
                  info@carpantier-consulting.de
                </a>
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
                {homeFaqs.map((faq, index) => (
                  <li
                    key={faq.question}
                    className={`${styles.sceneItem} ${
                      index === active
                        ? styles.sceneItemOn
                        : index < active
                          ? styles.sceneItemDone
                          : ''
                    }`}
                    /*
                     * Bewusst **kein** `aria-hidden` auf den nicht sichtbaren
                     * Fragen: Anders als bei den Bild-Szenen ist hier jede
                     * Antwort eigenständiger Inhalt, den eine Vorlesehilfe
                     * vollständig durchgehen können soll — so wie das
                     * FAQPage-Markup ihn ausweist.
                     */
                  >
                    {faq.tag && <span className={styles.faqTag}>{faq.tag}</span>}
                    <h3 className={styles.faqQ}>{faq.question}</h3>
                    <p className={styles.faqA}>{faq.answer}</p>
                    {faq.note && <p className={styles.faqNote}>{faq.note}</p>}
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
