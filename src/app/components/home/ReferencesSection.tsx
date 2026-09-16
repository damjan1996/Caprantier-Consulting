'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Briefcase, Building2, CalendarCheck, TrendingUp, Users } from 'lucide-react'
import { useReveal } from '../seite/useReveal'
import { isStacked, useScrollScene } from '../seite/useScrollScene'
import styles from './home.module.css'

/**
 * Ergebnisse aus der Zusammenarbeit.
 *
 * Der Entwurf sah hier drei namentlich genannte Unternehmen mit Kennzahlen vor
 * — die Kennzahlen waren als Platzhalter markiert und die Freigaben stehen aus.
 * Ein Firmenname neben einer erfundenen Zahl ist eine irreführende
 * geschäftliche Handlung (§ 5 UWG); genau daran ist die frühere Fallstudienseite
 * gescheitert (siehe `src/lib/case-studies.ts`). Deshalb stehen hier die
 * anonymisierten Ergebnisse, die auf der Website bereits veröffentlicht sind —
 * unverändert im Wortlaut, nur im neuen Kartenlayout.
 *
 * Sobald Nico Zahlen und schriftliche Freigaben für benannte Kunden hat,
 * gehören sie in `src/lib/case-studies.ts` und von dort hierher.
 */

type Reference = {
  icon: typeof Building2
  branche: string
  region: string
  result: string
  text: string
}

const REFERENCES: Reference[] = [
  {
    icon: Building2,
    branche: 'Maschinenbau',
    region: 'Mittelstand · Nordrhein-Westfalen',
    result: '14 qualifizierte Entscheider-Termine in 8 Wochen',
    text: 'Vorher: Akquise lag brach, Pipeline leer. Nachher: Regelmäßige Termine mit Produktionsleitern und Geschäftsführern.',
  },
  {
    icon: Briefcase,
    branche: 'IT-Dienstleistung',
    region: 'Köln',
    result: '6 Neukunden in 3 Monaten gewonnen',
    text: 'Hatte zuvor einen Inhouse-Vertriebler, der nicht geliefert hat. Mit uns: Planbar jede Woche neue Gespräche.',
  },
  {
    icon: Users,
    branche: 'Personalvermittlung',
    region: 'Rheinland',
    result: '23 Termine mit HR-Entscheidern in 10 Wochen',
    text: 'War komplett von Empfehlungen abhängig. Jetzt: Systematischer Zufluss neuer Anfragen.',
  },
  {
    icon: TrendingUp,
    branche: 'SaaS-Anbieter',
    region: 'Süddeutschland',
    result: 'Abschlussquote von 35\u00A0% auf gelieferte Termine',
    text: 'Gutes Produkt, aber kein Vertriebsteam. Wir liefern die Termine — er schließt ab.',
  },
  {
    icon: CalendarCheck,
    branche: 'Unternehmensberatung',
    region: 'Hamburg',
    result: '5–7 Termine pro Woche nach der Anlaufphase',
    text: 'Tagesgeschäft hat alles gefressen. Jetzt läuft die Akquise extern — ohne Eigenaufwand.',
  },
]

function ReferenceCard({ reference }: { reference: Reference }) {
  const Icon = reference.icon
  return (
    <article className={styles.refCard}>
      <div className={styles.refCardTop}>
        <span className={styles.refIcon} aria-hidden="true">
          <Icon className={styles.refIconGlyph} />
        </span>
        <span className={styles.refBadge}>Kunde</span>
      </div>

      <div className={styles.refWho}>
        <b>{reference.branche}</b>
        <span>{reference.region}</span>
      </div>

      <div className={styles.refResult}>
        <span className={styles.refResultLabel}>Ergebnis</span>
        <span className={styles.refResultValue}>{reference.result}</span>
      </div>

      <p className={styles.refText}>{reference.text}</p>
    </article>
  )
}

export default function ReferencesSection() {
  const { ref, isIn } = useReveal<HTMLDivElement>()

  const sectionRef = useRef<HTMLElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLSpanElement>(null)

  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  const letzter = REFERENCES.length - 1

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

      const next = Math.min(letzter, Math.floor(progress * REFERENCES.length))
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
    },
  })

  return (
    <section
      id="ergebnisse"
      ref={sectionRef}
      className={styles.sceneRefs}
      aria-labelledby="references-title"
    >
      <div ref={wrapRef} className={styles.sceneWrap}>
        <div className={styles.sceneStage}>
          <div ref={ref} className={styles.sceneGrid}>
            <div className={styles.sceneCopy}>
            <div
              className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
              data-fade-in=""
            >
              Referenzen
            </div>
            <h2
              id="references-title"
              className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
              data-fade-in=""
              style={{ '--rd': '0.08s' } as React.CSSProperties}
            >
              Das erreichen unsere Kunden in den ersten Wochen.
            </h2>
            <p
              className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
              data-fade-in=""
              style={{ '--rd': '0.16s' } as React.CSSProperties}
            >
              Echte Ergebnisse, echte Unternehmen. Aus Vertraulichkeitsgründen ohne Firmennamen —
              die Zahlen sprechen für sich.
            </p>

              {/* Angebot und Weiterweg stehen bei der Überschrift, nicht hinter
                  der Bühne. Dort kamen sie erst ins Bild, als die Fälle schon
                  weggescrollt waren — „einen dieser Fälle“ ohne die Fälle. */}
              <p className={`${styles.refNote} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.2s' } as React.CSSProperties}
              >
                Auf Wunsch gehen wir im Erstgespräch einen dieser Fälle durch – mit Zielgruppe,
                Gesprächsleitfaden und den Zahlen dahinter.
              </p>

              <div
                className={`${styles.pinAction} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--ry': '14px', '--rd': '0.26s' } as React.CSSProperties}
              >
                <Link href="/referenzen" className={styles.textLink}>
                  Alle Referenzen ansehen <span aria-hidden="true">→</span>
                </Link>
              </div>

              <span className={styles.sceneRail} aria-hidden="true">
                <span ref={railRef} className={styles.sceneRailFill} />
              </span>
            </div>

            {/* Ein Fall nach dem anderen. Fünf Karten nebeneinander überfliegt
                man; einzeln liest man sie. */}
            <div
              className={`${styles.sceneAside} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
              data-fade-in=""
              style={{ '--ry': '32px', '--rd': '0.22s' } as React.CSSProperties}
            >
              <ol className={styles.sceneSlot}>
                {REFERENCES.map((reference, index) => (
                  <li
                    key={reference.branche}
                    className={`${styles.sceneItem} ${
                      index === active
                        ? styles.sceneItemOn
                        : index < active
                          ? styles.sceneItemDone
                          : ''
                    }`}
                    aria-hidden={index === active ? undefined : true}
                  >
                    <ReferenceCard reference={reference} />
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
