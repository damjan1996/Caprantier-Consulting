'use client'

import { useRef, useState } from 'react'
import { formatPreis, istPreisSichtbar, priceModels } from '@/lib/pricing'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import { isStacked, useScrollScene } from '@/app/components/seite/useScrollScene'
import styles from './leistungen.module.css'

/**
 * „Zusammenarbeit" — klebende Bühne mit den drei Preismodellen.
 *
 * Jede Karte trägt ihre **Grenze** als eigenen Block, nicht als Fußnote. Das
 * ist der Teil, der die Entscheidung trägt: Ein Modell, von dem man weiß,
 * wann es nicht funktioniert, ist glaubwürdiger als drei, die alles können.
 *
 * Die Modelle stehen in `src/lib/pricing.ts` — dort hängen die Freigabe-Logik
 * (`PREISE_FREIGEGEBEN`), das `Offer`-Markup und die Prüfung in
 * `scripts/check-pricing.mjs` daran. Solange kein Betrag freigegeben ist,
 * nennt die Seite keine Zahl und erklärt stattdessen das Modell.
 */
export default function EngagementScene() {
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

      const next = Math.min(priceModels.length - 1, Math.floor(progress * priceModels.length))
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
    },
  })

  return (
    <section
      id="preise"
      ref={sectionRef}
      className={styles.sceneEngagement}
      aria-labelledby="engagement-title"
    >
      <div ref={wrapRef} className={styles.sceneWrap}>
        <div className={styles.sceneStage}>
          <div ref={revealRef} className={styles.sceneGrid}>
            <div className={styles.sceneCopy}>
              <div
                className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
              >
                Zusammenarbeit
              </div>

              <h2
                id="engagement-title"
                className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.08s' } as React.CSSProperties}
              >
                Drei Modelle – und wo jedes an seine Grenze kommt.
              </h2>

              <p
                className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.16s' } as React.CSSProperties}
              >
                Welches Modell passt, entscheidet sich an zwei Fragen: wie groß Ihre Zielgruppe
                ist und wie viele Termine Sie pro Woche tatsächlich wahrnehmen können.
              </p>

              {/* Warum hier keine Beträge stehen. Der Satz ist derselbe wie in
                  der Antwort „Was kostet die Zusammenarbeit?" auf der
                  Startseite — eine Zusage, eine Formulierung. */}
              <p
                className={`${styles.priceNote} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.2s' } as React.CSSProperties}
              >
                Wir verkaufen keine Standardpakete, deshalb variiert der Preis. Im Erstgespräch
                nennen wir Ihnen nach kurzer Analyse eine transparente Hausnummer.
              </p>

              <div
                className={`${styles.pinAction} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--ry': '14px', '--rd': '0.28s' } as React.CSSProperties}
              >
                <button
                  type="button"
                  className={`${styles.btnDark} ${styles.btnSmall}`}
                  onClick={openCalendly}
                  onMouseEnter={onHover}
                >
                  <span>Modell im Gespräch klären</span>
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
              <ol className={styles.sceneSlot}>
                {priceModels.map((modell, index) => (
                  <li
                    key={modell.key}
                    className={`${styles.sceneItem} ${
                      index === active
                        ? styles.sceneItemOn
                        : index < active
                          ? styles.sceneItemDone
                          : ''
                    }`}
                    aria-hidden={index === active ? undefined : true}
                  >
                    <article className={styles.modCard}>
                      <div className={styles.modTop}>
                        <h3 className={styles.modName}>{modell.name}</h3>
                        {modell.hervorgehoben && (
                          <span className={styles.modBadge}>Am häufigsten</span>
                        )}
                        <span className={styles.modUnit}>
                          {istPreisSichtbar(modell)
                            ? `${formatPreis(modell.preis as number)} ${modell.einheit}`
                            : modell.einheit}
                        </span>
                      </div>

                      <p className={styles.modFit}>{modell.eignung}</p>

                      <ul className={styles.modList}>
                        {modell.leistungen.map((leistung) => (
                          <li key={leistung}>
                            <span className={styles.modTick} aria-hidden="true">
                              ✓
                            </span>
                            <span>{leistung}</span>
                          </li>
                        ))}
                      </ul>

                      <div className={styles.modLimit}>
                        <span className={styles.modLimitLabel}>Wo es aufhört</span>
                        <p className={styles.modLimitText}>{modell.grenze}</p>
                      </div>
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
