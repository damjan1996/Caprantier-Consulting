'use client'

import { useRef, useState } from 'react'
import { businessInfo } from '@/lib/local-seo'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import { isStacked, useScrollScene } from '@/app/components/seite/useScrollScene'
import styles from './kontakt.module.css'

/**
 * Abschluss — klebende Bühne mit dunkler Karte.
 *
 * Rechts steht, was für den Termin nötig ist. Das ist die passende Zusage
 * ausgerechnet am Ende einer Kontaktseite: Wer bis hierher gescrollt hat, hat
 * das Formular gesehen und sich dagegen entschieden — meistens, weil er nicht
 * weiß, was von ihm erwartet wird. Die Antwort lautet: fast nichts.
 *
 * Bewusst nicht die Tagesordnung des Erstgesprächs (die trägt `/leistungen`),
 * nicht „Was wir vorher wissen wollen“ (`/branchen`) und nicht „Was Sie daraus
 * mitnehmen“ (`/ueber-uns`).
 */
const BRAUCHT = [
  {
    when: 'Vorbereitung',
    what: 'Keine Unterlagen',
    detail: 'Kein Foliensatz, keine Zahlen, keine fertige Liste. Was fehlt, fragen wir im Gespräch.',
  },
  {
    when: 'Zehn Sekunden',
    what: 'Einen freien Platz',
    detail: 'Der Kalender zeigt nur Zeiten, die tatsächlich frei sind. Aussuchen, bestätigen, fertig.',
  },
  {
    when: 'Eine Angabe',
    what: 'Ihre E-Mail-Adresse',
    detail: 'Für die Einladung. Mehr wird nicht abgefragt, und ein Newsletter folgt daraus nicht.',
  },
]

export default function TerminScene() {
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

      const next = Math.min(BRAUCHT.length - 1, Math.floor(progress * BRAUCHT.length))
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
                Der kürzeste Weg bleibt der, bei dem Sie nichts tippen müssen.
              </h2>

              <p
                className={`${styles.closeText} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.3s' } as React.CSSProperties}
              >
                Ein freier Platz im Kalender, 15 Minuten, keine Vorbereitung. Was wir wissen
                müssen, fragen wir im Gespräch – das geht schneller, als es aufzuschreiben.
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
              <span className={styles.closePlanHead}>Was Sie dafür brauchen</span>

              {/* Kein `aria-hidden` auf den nicht sichtbaren Punkten: eine
                  zusammenhängende Aufzählung, die eine Vorlesehilfe am Stück
                  durchgehen soll (Baukasten § 4.4, Regel 3). */}
              <ol className={styles.sceneSlot}>
                {BRAUCHT.map((punkt, index) => (
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
                Kommt etwas dazwischen, sagen Sie ab – der Platz geht dann an jemand anderen.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
