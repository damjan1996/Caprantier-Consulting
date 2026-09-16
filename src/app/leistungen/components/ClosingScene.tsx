'use client'

import { useRef, useState } from 'react'
import { erstgespraechAgenda } from '@/lib/leistungen-content'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import { isStacked, useScrollScene } from '@/app/components/seite/useScrollScene'
import styles from './leistungen.module.css'

/**
 * Abschluss der Leistungsseite — klebende Bühne mit dunkler Karte.
 *
 * Rechts steht, was die fünfzehn Minuten füllt: Zielgruppe, Modell, ehrliche
 * Einschätzung. Das ist bewusst **nicht** die Wochen-Grafik der Startseite.
 * Dieselbe Darstellung ein zweites Mal wäre kein Wiedererkennen, sondern
 * Füllmaterial — und der Leser ist hier eine Frage weiter: Er weiß schon, was
 * er bekommt, und will wissen, wie das Gespräch abläuft.
 *
 * Die dunkle Karte ist die einzige dunkle Fläche der Seite (Designleitfaden
 * § 2.2: höchstens drei je Seite, der Abschluss gehört immer dazu).
 */
export default function ClosingScene() {
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

      const next = Math.min(
        erstgespraechAgenda.length - 1,
        Math.floor(progress * erstgespraechAgenda.length)
      )
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
      className={styles.sceneClose}
      aria-labelledby="closing-title"
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
                id="closing-title"
                className={`${styles.closeTitle} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.22s' } as React.CSSProperties}
              >
                Welche Leistung Sie brauchen, klären wir in 15 Minuten.
              </h2>

              <p
                className={`${styles.closeText} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.3s' } as React.CSSProperties}
              >
                Kein Pitch, keine Präsentation. Sie schildern Ihre Zielgruppe, wir sagen ehrlich,
                welches Modell passt – und ob es sich für Sie überhaupt rechnet.
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
                  href="mailto:info@carpantier-consulting.de"
                  className={`${styles.textLink} ${styles.closeMailLink}`}
                >
                  Lieber schreiben? info@carpantier-consulting.de
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
              className={`${styles.closeAgenda} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
              data-fade-in=""
              style={{ '--ry': '28px', '--rd': '0.35s' } as React.CSSProperties}
            >
              <span className={styles.closeAgendaHead}>Was in den 15 Minuten passiert</span>

              {/*
                Drei Punkte, einer nach dem anderen. Bewusst kein `aria-hidden`
                auf den nicht sichtbaren: Sie sind ein zusammenhängender Ablauf,
                den eine Vorlesehilfe am Stück durchgehen soll.
              */}
              <ol className={styles.sceneSlot}>
                {erstgespraechAgenda.map((eintrag, index) => (
                  <li
                    key={eintrag.when}
                    className={`${styles.sceneItem} ${
                      index === active
                        ? styles.sceneItemOn
                        : index < active
                          ? styles.sceneItemDone
                          : ''
                    }`}
                  >
                    <span className={styles.closeWhen}>{eintrag.when}</span>
                    <b className={styles.closeWhat}>{eintrag.what}</b>
                    <span className={styles.closeDetail}>{eintrag.detail}</span>
                  </li>
                ))}
              </ol>

              <span className={styles.closeAgendaNote}>
                Danach wissen Sie, woran Sie sind – in beide Richtungen.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
