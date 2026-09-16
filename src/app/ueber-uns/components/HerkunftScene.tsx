'use client'

import { useRef, useState } from 'react'
import { services } from '@/lib/leistungen-content'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import { isStacked, useScrollScene } from '@/app/components/seite/useScrollScene'
import styles from './ueber-uns.module.css'

/**
 * „Woher das kommt“ — klebende Bühne mit drei Einträgen.
 *
 * Der Abschnitt, den keine andere Seite haben kann. `/leistungen` beschreibt,
 * **was** geliefert wird; hier steht, warum es ausgerechnet so aussieht. Das
 * ist der Unterschied zwischen einer Leistungsbeschreibung und einer
 * Herkunft — und die Prüffrage aus Textleitfaden § 11 („Beantwortet die Seite
 * eine andere Frage als ihre Schwester?“) hängt genau daran.
 *
 * Eine Reihenfolge gibt es als Herleitung, nicht als Ablauf: erst das
 * Gespräch selbst, dann der Anlass davor, dann das, was danach ausgewertet
 * wird. Drei gleichrangige Einträge mit einer Ordnung — die Bedingung für
 * eine Bühne (Designleitfaden § 5.2).
 *
 * ## Die Belegzeile
 *
 * Jeder Eintrag endet mit der Stelle, an der die Erfahrung heute im Ablauf
 * steht — **zitiert** aus `src/lib/leistungen-content.ts`, nicht abgetippt.
 * Dieselben Sätze werden als `Service`-Markup ausgeliefert; zwei Textstände
 * laufen beim ersten Umformulieren auseinander, und es fällt niemandem auf,
 * der die Seite ansieht (Baukasten § 8.3).
 */

/** Zitiert eine Leistungszusage aus dem Datenmodul, ohne bei Umbauten zu brechen. */
function leistungsZusage(schritt: number, punkt: number): string {
  return services[schritt]?.features[punkt] ?? ''
}

const EINTRAEGE = [
  {
    kind: 'Aus dem Recruiting',
    titel: 'Zuhören schlägt vortragen',
    text: 'Wer Kandidaten und Auftraggeber zusammenbringt, verkauft im ersten Gespräch nichts – er fragt so lange, bis feststeht, ob es überhaupt passt. Diese Reihenfolge gilt am Telefon genauso: erst der Bedarf, dann das Angebot. Ein auswendig gelernter Einstieg kommt damit nicht weit, ein Gerüst schon.',
    beleg: leistungsZusage(1, 0),
  },
  {
    kind: 'Aus dem B2B-Vertrieb',
    titel: 'Kein Anruf ohne Anlass',
    text: 'Eine gekaufte Liste kennt Branche und Mitarbeiterzahl. Beides ist kein Grund, ausgerechnet heute anzurufen – und ohne Grund beginnt jedes Gespräch mit einer Entschuldigung. Der Anlass steht fast immer öffentlich; man muss ihn nur suchen, bevor man wählt.',
    beleg: leistungsZusage(0, 0),
  },
  {
    kind: 'Aus der eigenen Praxis',
    titel: 'Die Absage ist die Information',
    text: 'Absagen in vier Schubladen zu sortieren ist bequem und lässt sich gut zählen. Danach weiß niemand mehr, woran ein Gespräch gescheitert ist. Bleibt der Satz stehen, den der Angerufene gesagt hat, lässt sich der Einstieg in der Woche darauf daran nachschärfen.',
    beleg: leistungsZusage(3, 1),
  },
]

export default function HerkunftScene() {
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

      const next = Math.min(EINTRAEGE.length - 1, Math.floor(progress * EINTRAEGE.length))
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
    },
  })

  return (
    <section
      id="herkunft"
      ref={sectionRef}
      className={styles.sceneHerkunft}
      aria-labelledby="herkunft-title"
    >
      <div ref={wrapRef} className={styles.sceneWrap}>
        <div className={styles.sceneStage}>
          <div ref={revealRef} className={styles.sceneGrid}>
            <div className={styles.sceneCopy}>
              <div
                className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
              >
                Woher das kommt
              </div>

              <h2
                id="herkunft-title"
                className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.08s' } as React.CSSProperties}
              >
                Was wir tun, haben wir uns nicht ausgedacht. Wir haben es gelernt.
              </h2>

              <p
                className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.16s' } as React.CSSProperties}
              >
                Drei Erfahrungen prägen das Vorgehen bis heute. Jede davon steht an einer
                konkreten Stelle im Ablauf – und die lässt sich nachlesen.
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
                  <span>Vorgehen durchsprechen</span>
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
                  eigenständige Absätze, kein dekoratives Muster
                  (Baukasten § 4.4, Regel 3). */}
              <ol className={styles.sceneSlot}>
                {EINTRAEGE.map((eintrag, index) => (
                  <li
                    key={eintrag.kind}
                    className={`${styles.sceneItem} ${
                      index === active
                        ? styles.sceneItemOn
                        : index < active
                          ? styles.sceneItemDone
                          : ''
                    }`}
                  >
                    <article className={styles.herkCard}>
                      <div className={styles.herkTop}>
                        <h3 className={styles.herkTitel}>{eintrag.titel}</h3>
                        <span className={styles.herkKind}>{eintrag.kind}</span>
                      </div>

                      <p className={styles.herkText}>{eintrag.text}</p>

                      <div className={styles.herkBeleg}>
                        <span className={styles.herkBelegLabel}>Steht heute im Ablauf als</span>
                        <span className={styles.herkBelegText}>{eintrag.beleg}</span>
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
