'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useReveal } from '@/app/components/seite/useReveal'
import { isStacked, useScrollScene } from '@/app/components/seite/useScrollScene'
import styles from './kontakt.module.css'

/**
 * „Was danach passiert“ — klebende Bühne mit drei Einträgen.
 *
 * Der Abschnitt, den Kontaktseiten üblicherweise nicht haben. Eine echte
 * Reihenfolge in der Zeit — Absenden, Antwort, Löschung — und damit der
 * Anlass für eine Bühne (Designleitfaden § 5.2).
 *
 * Inhaltlich ist er die Langfassung des Transparenzhinweises am Formular: was
 * mit den Angaben geschieht, wer antwortet, wann gelöscht wird. Am Formular
 * steht das als Pflichtangabe nach Art. 13 DSGVO in einem Absatz; hier steht
 * es als Auskunft, die man vor dem Tippen liest.
 *
 * Er steht **hinter** dem Formular, weil er die Frage „und jetzt?“
 * beantwortet — und weil er die helle Fläche zwischen Formular und dunklem
 * Abschluss trägt.
 */
const STATIONEN = [
  {
    wann: 'Beim Absenden',
    titel: 'Die Nachricht geht ins Postfach',
    text: 'Weitergeleitet wird sie per E-Mail, gespeichert wird sie nicht. Für die Beantwortung einer Anfrage braucht es keine zusätzliche Ablage in einer Datenbank – und was nicht gespeichert ist, kann auch nicht abhandenkommen.',
    grundLabel: 'Warum das so ist',
    grund: 'Grundsatz der Datenminimierung, Art. 5 Abs. 1 lit. c DSGVO. Der Versand läuft über unseren Auftragsverarbeiter Brevo.',
  },
  {
    wann: 'Innerhalb eines Werktags',
    titel: 'Eine Antwort kommt',
    text: 'Auch dann, wenn wir absagen. Passt die Anfrage, schlagen wir 15 Minuten im Kalender vor; passt sie nicht, schreiben wir, woran es liegt. Eine Anfrage unbeantwortet liegen zu lassen, ist die unhöflichste Form der Absage.',
    grundLabel: 'Woran Sie uns messen',
    grund: 'Ein Werktag, Montag bis Freitag. Länger dauert es nur, wenn der Monat voll ist – dann steht genau das in der Antwort.',
  },
  {
    wann: 'Wenn die Anfrage erledigt ist',
    titel: 'Die Nachricht wird gelöscht',
    text: 'Sofern keine gesetzliche Aufbewahrungsfrist entgegensteht. Ihre Einwilligung können Sie jederzeit formlos widerrufen – ohne Begründung, und ohne dass Ihnen daraus ein Nachteil entsteht.',
    grundLabel: 'Wo das nachzulesen ist',
    grund: 'In der Datenschutzerklärung, im Abschnitt zum Kontaktformular – zusammen mit Ihren übrigen Betroffenenrechten.',
  },
]

export default function DanachScene() {
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

      const next = Math.min(STATIONEN.length - 1, Math.floor(progress * STATIONEN.length))
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
    },
  })

  return (
    <section
      id="danach"
      ref={sectionRef}
      className={styles.sceneDanach}
      aria-labelledby="danach-title"
    >
      <div ref={wrapRef} className={styles.sceneWrap}>
        <div className={styles.sceneStage}>
          <div ref={revealRef} className={styles.sceneGrid}>
            <div className={styles.sceneCopy}>
              <div
                className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
              >
                Was danach passiert
              </div>

              <h2
                id="danach-title"
                className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.08s' } as React.CSSProperties}
              >
                Was mit Ihrer Nachricht geschieht, bis sie wieder gelöscht ist.
              </h2>

              <p
                className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.16s' } as React.CSSProperties}
              >
                Drei Stationen, jede mit ihrem Grund. Das steht hier, weil man es vor dem
                Absenden wissen will und nicht danach.
              </p>

              <div
                className={`${styles.pinAction} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--ry': '14px', '--rd': '0.24s' } as React.CSSProperties}
              >
                <Link href="/datenschutz" className={styles.textLink}>
                  Die vollständige Datenschutzerklärung
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
                  eigenständige Auskünfte, kein dekoratives Muster
                  (Baukasten § 4.4, Regel 3). */}
              <ol className={styles.sceneSlot}>
                {STATIONEN.map((station, index) => (
                  <li
                    key={station.wann}
                    className={`${styles.sceneItem} ${
                      index === active
                        ? styles.sceneItemOn
                        : index < active
                          ? styles.sceneItemDone
                          : ''
                    }`}
                  >
                    <article className={styles.danachCard}>
                      <div className={styles.danachTop}>
                        <h3 className={styles.danachTitel}>{station.titel}</h3>
                        <span className={styles.danachWann}>{station.wann}</span>
                      </div>

                      <p className={styles.danachText}>{station.text}</p>

                      <div className={styles.danachGrund}>
                        <span className={styles.danachGrundLabel}>{station.grundLabel}</span>
                        <span className={styles.danachGrundText}>{station.grund}</span>
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
