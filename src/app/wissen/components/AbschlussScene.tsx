'use client'

import { useRef, useState } from 'react'
import { businessInfo } from '@/lib/local-seo'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import { isStacked, useScrollScene } from '@/app/components/seite/useScrollScene'
import styles from './wissen.module.css'

/**
 * Abschluss — klebende Bühne mit dunkler Karte.
 *
 * Rechts steht, was in **keinem** dieser Texte steht. Das ist die Abgrenzung
 * dieser Seite: Eine Wissenssammlung, die so tut, als beantworte sie alles,
 * ist genau die Sorte Seite, gegen die der Abschnitt „Wie wir schreiben“
 * argumentiert. Drei Auslassungen, jede mit dem Grund dafür.
 *
 * Damit ist auch klar, wofür der Termin gut ist — und wofür nicht.
 */
const NICHT_HIER = [
  {
    when: 'Preise',
    what: 'Stehen in keinem Beitrag',
    detail: 'Was eine Kampagne kostet, hängt an Zielgruppe und Umfang. Die Hausnummer nennen wir im Gespräch.',
  },
  {
    when: 'Rechtsberatung',
    what: 'Nur Einordnung',
    detail: 'Die rechtlichen Texte nennen Paragraphen und ordnen ein. Eine Prüfung Ihres Falls ersetzen sie nicht.',
  },
  {
    when: 'Skripte',
    what: 'Gibt es nicht zum Mitnehmen',
    detail: 'Ein Gesprächsgerüst entsteht an Ihrer Zielgruppe. Eine Vorlage, die überall passt, passt nirgends.',
  },
]

export default function AbschlussScene() {
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

      const next = Math.min(NICHT_HIER.length - 1, Math.floor(progress * NICHT_HIER.length))
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
    },
  })

  return (
    <section
      id="termin"
      ref={sectionRef}
      className={styles.sceneTermin}
      aria-labelledby="termin-title"
    >
      <div ref={wrapRef} className={styles.sceneWrap}>
        <div className={styles.sceneStage}>
          {/* Die dunkle Karte ist hier das Gitter der Bühne. */}
          <div
            ref={ref}
            className={`${styles.sceneGrid} ${styles.closeCard} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--ry': '32px' } as React.CSSProperties}
          >
            <div className={styles.sceneCopy}>
              <div
                className={`${styles.eyebrow} ${styles.closeEyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.15s' } as React.CSSProperties}
              >
                Der nächste Schritt
              </div>

              <h2
                id="termin-title"
                className={`${styles.closeTitle} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.22s' } as React.CSSProperties}
              >
                Gelesen ist nicht entschieden. Reden wir 15 Minuten darüber.
              </h2>

              <p
                className={`${styles.closeText} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.3s' } as React.CSSProperties}
              >
                Kein Pitch. Sie schildern, woran es bei Ihrer Akquise gerade hängt, und wir sagen,
                ob wir dabei etwas beitragen können – oder wer es besser kann.
              </p>

              <div
                className={`${styles.actionRow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.4s' } as React.CSSProperties}
              >
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={openCalendly}
                  onMouseEnter={onHover}
                >
                  <span>Erstgespräch buchen</span>
                  <span className={styles.btnHint}>15 Min.</span>
                </button>
                <a
                  href={`mailto:${businessInfo.emailGeneral}`}
                  className={`${styles.textLink} ${styles.closeMailLink}`}
                >
                  Lieber schreiben? {businessInfo.emailGeneral}
                </a>
              </div>

              <div
                className={`${styles.closeMeta} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
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
              className={`${styles.closePlan} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
              data-fade-in=""
              style={{ '--ry': '28px', '--rd': '0.35s' } as React.CSSProperties}
            >
              <span className={styles.closePlanHead}>Was hier nicht steht</span>

              {/* Kein `aria-hidden` auf den nicht sichtbaren Punkten: eine
                  zusammenhängende Aufzählung, die eine Vorlesehilfe am Stück
                  durchgehen soll (Baukasten § 4.4, Regel 3). */}
              <ol className={styles.sceneSlot}>
                {NICHT_HIER.map((punkt, index) => (
                  <li
                    key={punkt.when}
                    className={`${styles.sceneItem} ${
                      index === active
                        ? styles.sceneItemOn
                        : index < active
                          ? styles.sceneItemDone
                          : ''
                    }`}
                  >
                    <span className={styles.closeWhen}>{punkt.when}</span>
                    <b className={styles.closeWhat}>{punkt.what}</b>
                    <span className={styles.closeDetail}>{punkt.detail}</span>
                  </li>
                ))}
              </ol>

              <span className={styles.closePlanNote}>
                Alle drei klären wir im Gespräch – ohne dass Sie etwas kaufen müssen.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
