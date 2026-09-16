'use client'

import { useId, useState } from 'react'
import type { City } from '@/lib/cities'
import type { CityAcquisition } from '@/lib/city-acquisition'
import { getKaltakquiseFAQs } from '@/lib/schemas'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './kaltakquise.module.css'

/**
 * Häufige Fragen — im Fluss, zum Aufklappen.
 *
 * Bewusst **keine** Klebe-Bühne, obwohl die Startseite ihre neun Fragen auf
 * eine stellt. Zwei Gründe, beide inhaltlich:
 *
 * 1. Wer hier ankommt, kommt aus der Suche mit **einer** Frage. Eine Liste zum
 *    Nachschlagen findet man, eine Bühne muss man durchscrollen — der
 *    Designleitfaden § 5.2 nennt genau diesen Fall.
 * 2. Drei der sechs Antworten geben den Ortstext wieder, den der Abschnitt
 *    „Der Markt vor Ort“ oben bereits sichtbar zeigt. Eingeklappt ist diese
 *    Überschneidung harmlos: Wer die Frage öffnet, hat sie gestellt. Offen auf
 *    einer Bühne wäre sie derselbe Absatz ein zweites Mal, nur langsamer.
 *
 * Die Fragen kommen aus `getKaltakquiseFAQs` in `src/lib/schemas.ts` — aus
 * derselben Quelle wie das FAQPage-Markup der Seite. Zwei Textstände zwischen
 * sichtbarem Inhalt und Markup sind ein Verstoß, den man der Seite nicht
 * ansieht (Baukasten § 8.3).
 *
 * Eingeklappt heißt nicht ausgelassen: Die Antworten stehen vollständig im
 * ausgelieferten HTML und sind nur über `grid-template-rows: 0fr` verborgen.
 * `inert` verhindert dabei, dass man sich durch unsichtbare Absätze tabbt.
 */
export default function FragenSection({
  city,
  acquisition,
}: {
  city: City
  acquisition: CityAcquisition
}) {
  const { openCalendly, onHover } = useCalendly()
  const { ref, isIn } = useReveal<HTMLElement>()
  const panelId = useId()

  /* Die erste Frage steht offen: Sie ist die, wegen der die Seite gelesen
     wird, und sie zeigt zugleich, dass die anderen sich öffnen lassen. */
  const [offen, setOffen] = useState<number | null>(0)

  const faqs = getKaltakquiseFAQs(city, acquisition)

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
          Sechs Fragen, die vor dem ersten Anruf geklärt sein sollten.
        </h2>

        <p
          className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Die Antworten gelten für {city.name}, nicht allgemein für Deutschland. Was danach offen
          bleibt, klären wir in 15 Minuten am Telefon.
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
