'use client'

import { useRef, useState } from 'react'
import { businessInfo } from '@/lib/local-seo'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import { isStacked, useScrollScene } from '@/app/components/seite/useScrollScene'
import styles from './uebersicht.module.css'

/**
 * Abschluss — klebende Bühne mit dunkler Karte.
 *
 * Rechts steht weder die Tagesordnung des Erstgesprächs (die trägt
 * `/leistungen`) noch der Zwei-Wochen-Ablauf (den tragen die Stadtseiten),
 * sondern die dritte Frage, die an dieser Stelle offen ist: **Was muss ich
 * mitbringen?** Diese Seite spricht jemanden an, der noch gar nicht weiß, ob
 * er für laufende Akquise überhaupt in Frage kommt.
 *
 * Damit ist der Abschluss zugleich die zweite Abgrenzung der Seite: Wer keine
 * Zielgruppe, kein erklärbares Angebot und keine Kapazität hat, bucht besser
 * kein Gespräch. Das ist die Haltung des Hauses — die Seite gewinnt, indem sie
 * absagt (Textleitfaden § 1).
 */

/**
 * Was ein Erstgespräch voraussetzt. Die Spanne „3–8 Termine“ ist dieselbe wie
 * auf Startseite und Leistungsseite — dort als Zusage, hier als Anforderung.
 * Eine Zahl, eine Schreibweise (Textleitfaden § 6.2).
 */
const VORAUSSETZUNGEN = [
  {
    when: 'Erstens',
    what: 'Eine Zielgruppe',
    detail: 'Branche, Größe, Rolle – eine Beschreibung genügt. Wie viele davon erreichbar sind, prüfen wir.',
  },
  {
    when: 'Zweitens',
    what: 'Ein erklärbares Angebot',
    detail: 'Etwas, das sich in einem Satz sagen lässt. Am Telefon gibt es für mehr keine Zeit.',
  },
  {
    when: 'Drittens',
    what: 'Kapazität für Termine',
    detail: '3–8 Gespräche pro Woche wollen geführt werden. Wer die nicht führen kann, braucht keine Akquise.',
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

      const next = Math.min(
        VORAUSSETZUNGEN.length - 1,
        Math.floor(progress * VORAUSSETZUNGEN.length)
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
                Bringen Sie Ihre Zielgruppe mit. Den Rest klären wir in 15 Minuten.
              </h2>

              <p
                className={`${styles.closeText} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.3s' } as React.CSSProperties}
              >
                Kein Pitch, keine Präsentation. Sie schildern, wen Sie erreichen wollen, und hören
                danach, ob wir das können – oder warum nicht.
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
              <span className={styles.closePlanHead}>Was Sie mitbringen sollten</span>

              {/* Kein `aria-hidden` auf den nicht sichtbaren Punkten: Sie sind
                  eine zusammenhängende Aufzählung, die eine Vorlesehilfe am
                  Stück durchgehen soll (Baukasten § 4.4, Regel 3). */}
              <ol className={styles.sceneSlot}>
                {VORAUSSETZUNGEN.map((punkt, index) => (
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
                Fehlt eines davon, sagen wir das im Gespräch – und Sie sparen sich die Kampagne.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
