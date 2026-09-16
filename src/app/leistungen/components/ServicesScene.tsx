'use client'

import { useRef, useState } from 'react'
import { BarChart3, ClipboardCheck, Phone, Target } from 'lucide-react'
import { services } from '@/lib/leistungen-content'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import { isStacked, useScrollScene } from '@/app/components/seite/useScrollScene'
import styles from './leistungen.module.css'

/**
 * „Was wir übernehmen" — klebende Bühne mit vier Einträgen.
 *
 * Die vier Leistungen sind eine Kette, keine Auswahl: Erst steht fest, wen man
 * anruft, dann wird angerufen, dann qualifiziert, dann berichtet. Nebeneinander
 * als Kachelfeld liest man die vierte Karte nicht mehr — nacheinander bekommt
 * jede ihren Moment, und die Reihenfolge wird zur Aussage.
 *
 * Die Texte stehen in `src/lib/leistungen-content.ts`, weil dieselben Angaben
 * als `Service`-Markup ausgeliefert werden.
 *
 * Ab 1100px abwärts fällt die Klebe-Mechanik weg: Die Karten stehen dann
 * untereinander, der Kopf darüber.
 */

/** Ein Sinnbild je Leistung, in der Reihenfolge der Kette. */
const MARKEN = [Target, Phone, ClipboardCheck, BarChart3]

export default function ServicesScene() {
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

      const next = Math.min(services.length - 1, Math.floor(progress * services.length))
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
    },
  })

  return (
    <section
      id="leistungen"
      ref={sectionRef}
      className={styles.sceneServices}
      aria-labelledby="services-title"
    >
      <div ref={wrapRef} className={styles.sceneWrap}>
        <div className={styles.sceneStage}>
          <div ref={revealRef} className={styles.sceneGrid}>
            <div className={styles.sceneCopy}>
              <div
                className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
              >
                Was wir übernehmen
              </div>

              <h2
                id="services-title"
                className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.08s' } as React.CSSProperties}
              >
                Vier Schritte, die zusammen einen Termin ergeben.
              </h2>

              <p
                className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.16s' } as React.CSSProperties}
              >
                Recherche, Gespräch, Qualifizierung, Bericht: Die vier Teile hängen zusammen.
                Deshalb gibt es sie nur gemeinsam – nicht als Bausteine zum Zusammenstellen.
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
                  <span>Zielgruppe durchsprechen</span>
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
                {services.map((service, index) => {
                  const Marke = MARKEN[index]
                  return (
                    <li
                      key={service.title}
                      className={`${styles.sceneItem} ${
                        index === active
                          ? styles.sceneItemOn
                          : index < active
                            ? styles.sceneItemDone
                            : ''
                      }`}
                      aria-hidden={index === active ? undefined : true}
                    >
                      <article className={styles.svcCard}>
                        <div className={styles.svcTop}>
                          <span className={styles.svcMark} aria-hidden="true">
                            <Marke />
                          </span>
                          <h3 className={styles.h3}>{service.title}</h3>
                          <span className={styles.svcStep}>{service.step}</span>
                        </div>

                        <p className={styles.svcText}>{service.description}</p>

                        <ul className={styles.svcList}>
                          {service.features.map((feature) => (
                            <li key={feature}>
                              <span className={styles.svcBullet} aria-hidden="true" />
                              <span>{feature}</span>
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
