'use client'

import { useRef, useState } from 'react'
import { industryPages } from '@/lib/industries'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import { isStacked, useScrollScene } from '@/app/components/seite/useScrollScene'
import styles from './branchen.module.css'

/**
 * „Woran es hängt“ — klebende Bühne mit drei Einträgen.
 *
 * Der einzige Abschnitt, den nur diese Seite haben kann: Er stellt die beiden
 * Branchen nebeneinander. Eine einzelne Branchenseite kann das nicht, sie
 * kennt nur ihren eigenen Markt. Damit begründet der Abschnitt zugleich,
 * warum es zwei getrennte Seiten gibt statt einer mit zwei Absätzen.
 */

/**
 * Die Beschriftung der Vergleichszeilen kommt aus dem Datenmodul, nicht aus
 * einer abgetippten Liste: `kicker` lautet „Branchenlösung Personaldienst-
 * leistung“ beziehungsweise „Branchenlösung IT und Managed Services“ — für
 * eine schmale Spalte bleibt davon der Teil hinter dem Gattungswort.
 */
function branchenName(index: number): string {
  return industryPages[index]?.kicker.replace(/^Branchenlösung\s+/, '') ?? ''
}

/**
 * Die dritte Gegenüberstellung zitiert die **erste Qualifizierungsfrage** der
 * jeweiligen Branchenseite. Sie steht dort in `qualification[0]`, wird also
 * mit der Branchenseite mitgepflegt und kann nicht still veralten.
 *
 * Die ersten beiden Zeilenpaare stehen dagegen hier: Sie fassen zusammen, was
 * auf beiden Seiten über mehrere Absätze verteilt steht, und es gibt kein Feld
 * im Datenmodul, das genau das trägt. Ein abgetipptes Zitat wäre an dieser
 * Stelle der zweite Textstand, den der Baukasten § 8.3 verbietet — eine
 * Zusammenfassung ist etwas anderes.
 */
const EINTRAEGE = [
  {
    kind: 'Schritt 1',
    titel: 'Der Anlass',
    text: 'Ohne Anlass kein Gespräch – aber was als Anlass taugt, steht in jeder Branche woanders. Beides ist öffentlich einsehbar; man muss es nur suchen, bevor man wählt.',
    beleg: [
      { key: branchenName(0), text: 'die Stelle, die seit Wochen ausgeschrieben ist' },
      { key: branchenName(1), text: 'das auslaufende Vertragsende, der Standortwechsel' },
    ],
  },
  {
    kind: 'Schritt 2',
    titel: 'Die Rolle',
    text: 'Wer über eine Beauftragung entscheidet, ist nicht überall dieselbe Person – und wer falsch anfängt, landet in der Zentrale statt im Kalender.',
    beleg: [
      { key: branchenName(0), text: 'Personalabteilung, Fachbereich oder Geschäftsführung' },
      { key: branchenName(1), text: 'die Geschäftsführung, nicht die IT-Abteilung' },
    ],
  },
  {
    kind: 'Schritt 3',
    titel: 'Die Frage vor dem Termin',
    text: 'Ein Termin wird erst eingetragen, wenn er beantwortet ist. Auf jeder Branchenseite steht die vollständige Liste dieser Fragen; die erste lautet unterschiedlich.',
    beleg: [
      { key: branchenName(0), text: industryPages[0]?.qualification[0] ?? '' },
      { key: branchenName(1), text: industryPages[1]?.qualification[0] ?? '' },
    ],
  },
]

export default function UnterschiedScene() {
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
      id="unterschied"
      ref={sectionRef}
      className={styles.sceneUnterschied}
      aria-labelledby="unterschied-title"
    >
      <div ref={wrapRef} className={styles.sceneWrap}>
        <div className={styles.sceneStage}>
          <div ref={revealRef} className={styles.sceneGrid}>
            <div className={styles.sceneCopy}>
              <div
                className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
              >
                Woran es hängt
              </div>

              <h2
                id="unterschied-title"
                className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.08s' } as React.CSSProperties}
              >
                Drei Stellen, an denen sich die Branchen unterscheiden.
              </h2>

              <p
                className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.16s' } as React.CSSProperties}
              >
                Der Ablauf ist derselbe: Liste, Anruf, Qualifizierung, Bericht. Was sich ändert,
                sind der Anlass, die Rolle und die Frage, die vor dem Termin beantwortet sein muss.
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
                  <span>Branche durchsprechen</span>
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
                  eigenständige Gegenüberstellungen, kein dekoratives Muster
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
                    <article className={styles.untCard}>
                      <div className={styles.untTop}>
                        <h3 className={styles.untTitel}>{eintrag.titel}</h3>
                        <span className={styles.untKind}>{eintrag.kind}</span>
                      </div>

                      <p className={styles.untText}>{eintrag.text}</p>

                      <ul className={styles.untBeleg}>
                        {eintrag.beleg.map((zeile) => (
                          <li key={zeile.key}>
                            <span className={styles.untBelegKey}>{zeile.key}</span>
                            <span>{zeile.text}</span>
                          </li>
                        ))}
                      </ul>
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
