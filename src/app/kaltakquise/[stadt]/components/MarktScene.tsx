'use client'

import { useRef, useState } from 'react'
import { Building2, Clock, Target } from 'lucide-react'
import type { City } from '@/lib/cities'
import type { CityAcquisition } from '@/lib/city-acquisition'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import { isStacked, useScrollScene } from '@/app/components/seite/useScrollScene'
import styles from './kaltakquise.module.css'

/**
 * „Der Markt vor Ort“ — klebende Bühne mit drei Einträgen.
 *
 * Das ist der Abschnitt, den keine zweite Seite dieser Domain so hat. Die
 * Texte stehen je Stadt in `src/lib/city-acquisition.ts` und werden von
 * `scripts/check-content-duplication.mjs` gegeneinander geprüft: Fünfzehn
 * Seiten mit denselben Absätzen wären genau der Dünn-Content-Fehler, an dem
 * der Blog gescheitert ist.
 *
 * Die Reihenfolge ist die der Fragen, nicht die der Wichtigkeit: Wer sitzt
 * hier — wen davon rufen wir an — wann nehmen die ab. Nebeneinander als drei
 * Karten wäre das ein Kachelfeld, das man überfliegt; nacheinander bekommt
 * jeder Absatz seinen Moment.
 *
 * Ab 1100px abwärts fällt die Klebe-Mechanik weg und die Karten stehen
 * untereinander.
 */
export default function MarktScene({
  city,
  acquisition,
}: {
  city: City
  acquisition: CityAcquisition
}) {
  const { openCalendly, onHover } = useCalendly()
  const { ref: revealRef, isIn } = useReveal<HTMLDivElement>()

  const sectionRef = useRef<HTMLElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLSpanElement>(null)

  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  /*
   * Die drei Einträge entstehen aus dem Ortsdatensatz, nicht aus Fließtext in
   * dieser Datei: So bleibt der redaktionelle Teil an einer Stelle, und die
   * Dopplungsprüfung greift auf ihn zu.
   */
  const eintraege = [
    {
      kind: 'Der Markt',
      Marke: Building2,
      titel: `Wer in ${city.name} sitzt`,
      text: acquisition.marktText,
      tags: acquisition.leitbranchen,
      note: null,
    },
    {
      kind: 'Die Zielgruppe',
      Marke: Target,
      titel: 'Wen wir davon anrufen',
      text: acquisition.zielgruppenText,
      tags: null,
      note: 'Die Liste entsteht aus öffentlich zugänglichen Anlässen, nicht aus einem gekauften Adressbestand.',
    },
    {
      kind: 'Das Zeitfenster',
      Marke: Clock,
      titel: 'Wann wir anrufen',
      text: acquisition.erreichbarkeit,
      tags: null,
      note: 'Mehr als eine Ausgangshypothese ist das nicht: Die Anrufblöcke verschieben sich dorthin, wo tatsächlich abgenommen wird.',
    },
  ]

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

      const next = Math.min(eintraege.length - 1, Math.floor(progress * eintraege.length))
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
    },
  })

  return (
    <section id="markt" ref={sectionRef} className={styles.sceneMarkt} aria-labelledby="markt-title">
      <div ref={wrapRef} className={styles.sceneWrap}>
        <div className={styles.sceneStage}>
          <div ref={revealRef} className={styles.sceneGrid}>
            <div className={styles.sceneCopy}>
              <div
                className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
              >
                Der Markt vor Ort
              </div>

              <h2
                id="markt-title"
                className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.08s' } as React.CSSProperties}
              >
                Drei Dinge stehen fest, bevor in {city.name} das Telefon klingelt.
              </h2>

              <p
                className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.16s' } as React.CSSProperties}
              >
                Markt, Zielgruppe und Zeitfenster sind kein Nebenprodukt der Kampagne. Sie stehen am
                Anfang, schriftlich – und werden an den gemessenen Quoten nachgeschärft.
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
                  <span>Zielgruppe besprechen</span>
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
              {/*
                Kein `aria-hidden` auf den nicht sichtbaren Einträgen: Das sind
                drei eigenständige Absätze über den Ort, kein dekoratives
                Wiederholungsmuster (Baukasten § 4.4, Regel 3).
              */}
              <ol className={styles.sceneSlot}>
                {eintraege.map((eintrag, index) => {
                  const { Marke } = eintrag
                  return (
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
                      <article className={styles.marktCard}>
                        <div className={styles.marktTop}>
                          <span className={styles.marktMark} aria-hidden="true">
                            <Marke />
                          </span>
                          <h3 className={styles.h3}>{eintrag.titel}</h3>
                          <span className={styles.marktKind}>{eintrag.kind}</span>
                        </div>

                        <p className={styles.marktText}>{eintrag.text}</p>

                        {eintrag.tags && (
                          <div className={styles.marktTags}>
                            {eintrag.tags.map((tag) => (
                              <span key={tag} className={styles.marktTag}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {eintrag.note && <p className={styles.marktNote}>{eintrag.note}</p>}
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
