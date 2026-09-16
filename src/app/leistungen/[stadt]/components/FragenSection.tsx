'use client'

import { useId, useState } from 'react'
import type { City } from '@/lib/cities'
import { getCityFAQs } from '@/lib/schemas'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './stadt.module.css'

/**
 * Häufige Fragen — im Fluss, zum Aufklappen.
 *
 * Die Fragen kommen aus `getCityFAQs` in `src/lib/schemas.ts`, derselben
 * Quelle wie das FAQPage-Markup der Seite. Eingeklappt heißt nicht
 * ausgelassen: Die Antworten stehen vollständig im ausgelieferten HTML und
 * sind nur über `grid-template-rows: 0fr` verborgen; `inert` verhindert, dass
 * man sich durch unsichtbare Absätze tabbt.
 *
 * Das Aufklapp-Muster selbst steht in der Grundlage
 * (`seite/basis.module.css`, Abschnitt „Aufklappen“) — diese Seite ist die
 * zweite, die es benutzt.
 */
export default function FragenSection({ city }: { city: City }) {
  const { openCalendly, onHover } = useCalendly()
  const { ref, isIn } = useReveal<HTMLElement>()
  const panelId = useId()

  /* Die erste Frage steht offen — sie ist die, wegen der die Seite gelesen
     wird, und sie zeigt zugleich, dass die anderen sich öffnen lassen. */
  const [offen, setOffen] = useState<number | null>(0)

  const faqs = getCityFAQs(city)

  return (
    <section id="fragen" ref={ref} className={styles.section} aria-labelledby="fragen-title">
      <div className={styles.fragenHead}>
        <div
          className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
        >
          Häufige Fragen
        </div>

        <h2
          id="fragen-title"
          className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.08s' } as React.CSSProperties}
        >
          Was Geschäftsführer fragen, bevor sie den Vertrieb abgeben.
        </h2>

        <p
          className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Sechs Antworten, die auch das enthalten, was gegen eine Zusammenarbeit spricht. Was
          danach offen bleibt, klären wir in 15 Minuten am Telefon.
        </p>

        {/* Der Aufruf steht im Abschnitt, nicht dahinter — und oben, nicht
            unter sechs zugeklappten Zeilen (Textleitfaden § 2). */}
        <div
          className={`${styles.pinAction} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--ry': '14px', '--rd': '0.2s' } as React.CSSProperties}
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
        </div>
      </div>

      <div
        className={`${styles.faqList} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '20px', '--rd': '0.22s' } as React.CSSProperties}
      >
        {faqs.map((faq, index) => {
          const istOffen = offen === index
          return (
            <div
              key={faq.question}
              className={`${styles.faqItem} ${istOffen ? styles.faqItemOpen : ''}`}
            >
              <h3>
                <button
                  type="button"
                  className={styles.faqToggle}
                  aria-expanded={istOffen}
                  aria-controls={`${panelId}-${index}`}
                  onClick={() => setOffen(istOffen ? null : index)}
                >
                  <span className={styles.faqQ}>{faq.question}</span>
                  <span className={styles.faqIcon} aria-hidden="true" />
                </button>
              </h3>

              <div
                id={`${panelId}-${index}`}
                className={`${styles.faqPanel} ${istOffen ? styles.faqPanelOpen : ''}`}
                inert={!istOffen}
              >
                <div className={styles.faqPanelInner}>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
