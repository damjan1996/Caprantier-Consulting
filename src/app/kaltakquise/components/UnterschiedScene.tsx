'use client'

import { useRef, useState } from 'react'
import { Building2, Clock, Search } from 'lucide-react'
import { getCityBySlug } from '@/lib/cities'
import { getCityAcquisition } from '@/lib/city-acquisition'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import { isStacked, useScrollScene } from '@/app/components/seite/useScrollScene'
import styles from './uebersicht.module.css'

/**
 * „Warum der Ort zählt“ — klebende Bühne mit drei Einträgen.
 *
 * Der einzige Abschnitt, den nur diese Seite haben kann: Er **vergleicht** die
 * Märkte miteinander. Eine einzelne Stadtseite kann das nicht, sie kennt nur
 * ihren eigenen Ort.
 *
 * Damit begründet der Abschnitt zugleich, warum es die fünfzehn Seiten
 * überhaupt gibt — sonst wirken sie wie derselbe Text mit ausgetauschtem
 * Stadtnamen, und genau das sollen sie nicht sein
 * (`scripts/check-content-duplication.mjs` hält das nach).
 */

/**
 * Die Belegzeile des ersten Eintrags wird **aus den Ortsdaten gezogen**, nicht
 * abgetippt: Drei Märkte, deren führende Branche kaum unterschiedlicher sein
 * könnte. Wer `city-acquisition.ts` redigiert, ändert damit auch diese Seite —
 * ein abgetippter Beleg wäre beim ersten Umformulieren still veraltet.
 */
const VERGLEICHSORTE = ['dresden', 'hamburg', 'stuttgart']

function leitbranchenBeleg() {
  return VERGLEICHSORTE.map((slug) => {
    const city = getCityBySlug(slug)
    const acquisition = getCityAcquisition(slug)
    return { key: city?.name ?? slug, text: acquisition?.leitbranchen[0] ?? '' }
  }).filter((zeile) => zeile.text)
}

export default function UnterschiedScene() {
  const { openCalendly, onHover } = useCalendly()
  const { ref: revealRef, isIn } = useReveal<HTMLDivElement>()

  const sectionRef = useRef<HTMLElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLSpanElement>(null)

  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  /*
   * Die Belege des zweiten und dritten Eintrags nennen **Betriebstypen**, nicht
   * einzelne Städte. Das ist Absicht: Eine Zeile wie „Essen: ab 7:00 Uhr“ wäre
   * ein zweiter Textstand neben dem Ortstext und beim ersten Redigieren dort
   * still falsch. Die Verallgemeinerung trägt über alle fünfzehn Märkte, die
   * Uhrzeit steht auf der jeweiligen Seite.
   */
  const eintraege = [
    {
      kind: 'Branchenstruktur',
      Marke: Building2,
      titel: 'Wer vor Ort sitzt, entscheidet den Einstieg',
      text: 'Ein Anruf bei einem Zulieferer der Halbleiterfertigung beginnt anders als einer bei einem inhabergeführten Handelshaus. Der erste Satz muss zur Branche passen, sonst ist das Gespräch nach zehn Sekunden vorbei.',
      beleg: leitbranchenBeleg(),
    },
    {
      kind: 'Zeitfenster',
      Marke: Clock,
      titel: 'Dieselbe Uhrzeit trifft nicht überall',
      text: 'Wer bundesweit im selben Block anruft, verliert in der Hälfte der Märkte die Verbindungsquote. Wann jemand ans Telefon geht, hängt am Betrieb – und der Betrieb hängt am Ort.',
      beleg: [
        { key: 'Technik', text: 'am ergiebigsten vor dem Arbeitsbeginn' },
        { key: 'Finanzumfeld', text: 'am ergiebigsten nach Handelsschluss' },
        { key: 'Junge Firmen', text: 'selten vor zehn Uhr morgens' },
      ],
    },
    {
      kind: 'Anlass',
      Marke: Search,
      titel: 'Ohne Anlass kein Gespräch',
      text: 'Die Liste entsteht aus öffentlich zugänglichen Anlässen. Was vor Ort als Anlass taugt, ist von Markt zu Markt verschieden – und es steht vor dem Anruf fest, nicht danach im Bericht.',
      beleg: [
        { key: 'Messestandort', text: 'der Messekalender, vorher wie nachher' },
        { key: 'Zulieferkette', text: 'das Ende eines Rahmenvertrags' },
        { key: 'Wachstumsmarkt', text: 'die aufgebrauchte Zeit der Geschäftsführung' },
      ],
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
                Warum der Ort zählt
              </div>

              <h2
                id="unterschied-title"
                className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.08s' } as React.CSSProperties}
              >
                Drei Dinge unterscheiden einen Markt vom nächsten.
              </h2>

              <p
                className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.16s' } as React.CSSProperties}
              >
                Der Ablauf ist überall derselbe. Was sich ändert, sind Branchenstruktur,
                Zeitfenster und Anlass – und daran hängt, ob aus einem Anruf ein Gespräch wird.
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
                  <span>Markt durchsprechen</span>
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
                  eigenständige Absätze, kein dekoratives Wiederholungsmuster
                  (Baukasten § 4.4, Regel 3). */}
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
                      <article className={styles.untCard}>
                        <div className={styles.untTop}>
                          <span className={styles.untMark} aria-hidden="true">
                            <Marke />
                          </span>
                          <h3 className={styles.h3}>{eintrag.titel}</h3>
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
