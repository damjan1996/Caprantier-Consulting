'use client'

import { useEffect, useRef, useState } from 'react'
import { STACK_BREAKPOINT, isStacked, useScrollScene } from '../seite/useScrollScene'
import { useReveal } from '../seite/useReveal'
import styles from './home.module.css'

/**
 * „Wie ein Termin entsteht“ — klebende Bühne wie Einstieg und Problem.
 *
 * Links steht der Kopf still, rechts wechseln die drei Stufen an Ort und
 * Stelle. Jede Karte trägt eine kleine Vorführung: aussortierte Leads, ein
 * Gesprächsausschnitt, ein Balken von „kalt“ auf „warm“. Nebeneinander waren
 * die drei in einer halben Wischbewegung durch, und für die Vorführungen blieb
 * in drei schmalen Spalten zu wenig Platz.
 *
 * Die Vorführung der aktiven Karte läuft jedes Mal neu an — sie hängt an einem
 * Schlüssel, der mit der Stufe wechselt. Ohne das liefe sie einmal beim ersten
 * Einblenden und danach nie wieder.
 *
 * Ab 1100px abwärts fällt die Klebe-Mechanik weg: Die Karten stehen dann
 * untereinander.
 */

const LEADS = [
  { name: 'Maschinenbau GmbH', detail: 'Geschäftsführer · 120 MA', fits: true },
  { name: 'Handels-AG', detail: 'Assistenz · kein Entscheider', fits: false },
  { name: 'IT-Systemhaus', detail: 'Vertriebsleiter · 45 MA', fits: true },
  { name: 'Kleinagentur', detail: 'Inhaber · Budget zu klein', fits: false },
]

const STAGES = [
  {
    badge: 'Auswahl',
    title: 'Wir suchen die Nadel im Heuhaufen',
    text: 'Nicht jeder Lead ist ein guter Lead. Wir identifizieren die Unternehmen und Entscheider, die wirklich zu Ihrem Angebot passen – nur Termine mit echter Auftragschance.',
  },
  {
    badge: 'Gespräch',
    title: 'Kein Druck, keine Verkaufsfloskeln',
    text: 'Wir führen Gespräche auf Augenhöhe, die sich nicht wie typische Kaltakquise anfühlen. Professionell, sympathisch und respektvoll – so entstehen echte Verbindungen.',
  },
  {
    badge: 'Übergabe',
    title: 'Aus kalten Leads werden warme Kontakte',
    text: 'Durch gezielte Gesprächsführung wecken wir echtes Interesse – bevor der Termin in Ihrem Kalender landet. Sie übernehmen ein Gespräch, das schon begonnen hat.',
  },
]

export default function HowSection() {
  const { ref: revealRef, isIn } = useReveal<HTMLDivElement>()

  const sectionRef = useRef<HTMLElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLSpanElement>(null)

  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  /*
   * Die Miniatur der aktiven Karte soll bei jedem Wechsel neu anlaufen.
   *
   * Der Schlüssel am Miniatur-Kasten hängt sie dafür neu ein — das allein
   * genügt aber nicht: Ein frisch eingehängtes Element, das die Endklasse
   * schon trägt, hat keinen Ausgangszustand und blendet deshalb nicht, es
   * steht sofort da. Erst das Nachreichen der Klasse einen Frame später
   * erzeugt den Übergang.
   */
  const [playing, setPlaying] = useState(0)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setPlaying(active))
    return () => cancelAnimationFrame(frame)
  }, [active])

  /*
   * Gestapelt stehen alle drei Karten gleichzeitig da.
   *
   * Dann darf nicht nur die „aktive“ Miniatur laufen — die beiden anderen
   * blieben sonst als leerer Kasten stehen. Der Zustand wird im Effekt
   * gesetzt, nicht beim Rendern: Auf dem Server gibt es keine Fensterbreite,
   * und ein Lesen im Render ergäbe eine Hydration-Abweichung.
   */
  const [stacked, setStacked] = useState(false)

  useEffect(() => {
    const abfrage = window.matchMedia(`(max-width: ${STACK_BREAKPOINT}px)`)
    const uebernehmen = () => setStacked(abfrage.matches)
    uebernehmen()
    abfrage.addEventListener('change', uebernehmen)
    return () => abfrage.removeEventListener('change', uebernehmen)
  }, [])

  /** Gestapelt laufen alle Miniaturen, stehend nur die der sichtbaren Karte. */
  const laeuft = (index: number) => stacked || index === playing

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

      const next = progress < 0.34 ? 0 : progress < 0.67 ? 1 : 2
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
    },
  })

  /** Klasse für eine Karte, je nachdem ob sie kommt, steht oder gelesen ist. */
  const cardState = (index: number) =>
    index === active
      ? styles.sceneItemOn
      : index < active
        ? styles.sceneItemDone
        : ''

  /** Gestaffeltes Einblenden der Miniatur — die Verzögerung kommt über `--rd`. */
  const artOn = (index: number, extra: string) =>
    `${styles.artIn} ${laeuft(index) ? styles.artInOn : ''} ${extra}`

  return (
    <section
      id="ablauf"
      ref={sectionRef}
      className={styles.sceneHow}
      aria-labelledby="how-title"
    >
      <div ref={wrapRef} className={styles.sceneWrap}>
        <div className={styles.sceneStage}>
          <div ref={revealRef} className={styles.sceneGrid}>
            <div className={styles.sceneCopy}>
              <div
                className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
              >
                Wie ein Termin entsteht
              </div>
              <h2
                id="how-title"
                className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.08s' } as React.CSSProperties}
              >
                Kein Skript, kein Druck. Drei Schritte, bis ein Termin wirklich ein Termin ist.
              </h2>
              <p
                className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
                data-fade-in=""
                style={{ '--rd': '0.16s' } as React.CSSProperties}
              >
                Wir telefonieren in Ihrem Namen – aber nicht wie ein Call-Center. Jeder Termin
                durchläuft dieselben drei Stufen, bevor er in Ihrem Kalender landet.
              </p>

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
                {STAGES.map((entry, index) => (
                  <li
                    key={entry.badge}
                    className={`${styles.sceneItem} ${cardState(index)}`}
                    aria-hidden={index === active ? undefined : true}
                  >
                    <article className={styles.howCard}>
                      <div className={styles.howCardHead}>
                        <div className={styles.badgeRow}>
                          <span className={styles.badgeNum} aria-hidden="true">
                            {index + 1}
                          </span>
                          <span className={styles.badgeLabel}>{entry.badge}</span>
                        </div>
                        <h3 className={styles.howCardTitle}>{entry.title}</h3>
                        <p className={styles.howCardText}>{entry.text}</p>
                      </div>

                      <div className={styles.howArt} aria-hidden="true" key={stacked ? 'art' : `art-${active}`}>
                        {index === 0 &&
                          LEADS.map((lead, position) => (
                            <div
                              key={lead.name}
                              className={artOn(index, `${styles.leadRow} ${lead.fits ? '' : styles.leadRowOut}`)}
                              style={
                                { '--rd': `${0.25 + position * 0.12}s` } as React.CSSProperties
                              }
                            >
                              <span className={styles.leadName}>
                                <b>{lead.name}</b>
                                <span>{lead.detail}</span>
                              </span>
                              <span className={lead.fits ? styles.tagYes : styles.tagNo}>
                                {lead.fits ? 'passt' : 'raus'}
                              </span>
                            </div>
                          ))}

                        {index === 1 && (
                          <>
                            <div
                              className={artOn(index, styles.bubbleIn)}
                              style={{ '--rd': '0.3s' } as React.CSSProperties}
                            >
                              „Herr Meier, ganz kurz zur Einordnung: Woran hängt bei Ihnen aktuell
                              die Neukundengewinnung?“
                            </div>
                            <div
                              className={artOn(index, styles.bubbleOut)}
                              style={{ '--rd': '0.85s' } as React.CSSProperties}
                            >
                              „Ehrlich gesagt an der Zeit. Erzählen Sie mal, wie Sie das machen.“
                            </div>
                            <div
                              className={artOn(index, styles.callMeta)}
                              style={{ '--rd': '1.3s' } as React.CSSProperties}
                            >
                              <span className={styles.liveDot} />
                              Gespräch läuft · 4:12
                            </div>
                          </>
                        )}

                        {index === 2 && (
                          <>
                            <div className={styles.meter}>
                              <div className={styles.meterScale}>
                                <span>kalt</span>
                                <span
                                  className={styles.warm}
                                  style={{ opacity: laeuft(index) ? 1 : 0 }}
                                >
                                  warm
                                </span>
                              </div>
                              <div className={styles.meterTrack}>
                                <div
                                  className={styles.meterFill}
                                  style={{ width: laeuft(index) ? '86%' : '6%' }}
                                />
                              </div>
                            </div>

                            <div
                              className={artOn(index, styles.handoverCard)}
                              style={{ '--rd': '1.1s' } as React.CSSProperties}
                            >
                              <span className={styles.handoverBar} />
                              <span className={styles.handoverText}>
                                <b>Do 14:30 · Vertriebsleiter, IT-Systemhaus</b>
                                <span>Interesse bestätigt · Unterlagen angefordert</span>
                              </span>
                              <span className={styles.handoverFlag}>Im Kalender</span>
                            </div>
                          </>
                        )}
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
