'use client'

import { useRef } from 'react'
import Image from 'next/image'
import AiGeneratedBadge from '@/components/ui/AiGeneratedBadge'
import { AI_GENERATED_MEDIA_ATTRS } from '@/components/ui/ai-media'
import { useCalendly } from '@/hooks/useCalendly'
import { clamp01, easeOut, isStacked, useScrollScene } from '../seite/useScrollScene'
import styles from './home.module.css'

import nicoPortrait from '@/../public/images/nico-portrait-new.jpg'

/**
 * Einstieg der Startseite.
 *
 * Der Abschnitt bleibt über mehrere Bildschirmhöhen stehen, während sich die
 * Beispielwoche im Kalender füllt: Das Versprechen der Überschrift —
 * wöchentlich 3–8 Termine — wird einmal vorgeführt, statt nur behauptet.
 *
 * Ab 1100px abwärts fällt die Klebe-Mechanik weg (siehe `home.module.css`).
 * Die Woche füllt sich dann, während die Grafik durchs Bild wandert; auf dem
 * Telefon wäre eine Seite, die sich beim Scrollen nicht bewegt, eine Sackgasse.
 *
 * Sämtliche Werte, die pro Frame wandern, werden direkt ins DOM geschrieben.
 * Ein `setState` je Frame würde den ganzen Abschnitt sechzigmal pro Sekunde
 * neu aufbauen — das ist der Unterschied zwischen flüssig und ruckelig.
 */

/** 8:00 bis 18:00. Die Termine liegen prozentual in diesem Fenster. */
const DAY_START_HOUR = 8
const DAY_MINUTES = 600

type Appointment = {
  /** 0 = Montag. */
  day: number
  hour: number
  minute: number
  /** Dauer in Stunden. */
  duration: number
  role: string
  industry: string
}

const APPOINTMENTS: Appointment[] = [
  { day: 0, hour: 9, minute: 0, duration: 1, role: 'Geschäftsführer', industry: 'Maschinenbau' },
  { day: 2, hour: 10, minute: 0, duration: 1, role: 'Geschäftsführerin', industry: 'Unternehmensberatung' },
  { day: 1, hour: 10, minute: 30, duration: 1, role: 'Inhaber', industry: 'Personalvermittlung' },
  /* Dienstagnachmittag statt Donnerstag: Die Webcam-Einblendung liegt über
     der unteren rechten Ecke des Kalenders. Ein Termin dort wäre halb
     verdeckt — und verdeckt zählt nicht, der Kalender ist der Beleg für die
     acht Termine in der Überschrift. */
  { day: 1, hour: 14, minute: 30, duration: 1, role: 'Vertriebsleiter', industry: 'IT-Systemhaus' },
  { day: 0, hour: 14, minute: 0, duration: 1, role: 'Head of Sales', industry: 'SaaS-Anbieter' },
  { day: 4, hour: 11, minute: 0, duration: 1, role: 'Prokurist', industry: 'Logistik' },
  { day: 2, hour: 13, minute: 30, duration: 1.5, role: 'Leiter Einkauf', industry: 'Industriezulieferer' },
  { day: 3, hour: 9, minute: 30, duration: 1, role: 'CEO', industry: 'Software-Agentur' },
]

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr']
const HOURS = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

/**
 * Die drei Kennzahlen der Beweisleiste.
 *
 * Dieselben Werte, die der Abschnitt „Das erreichen unsere Kunden“ schon
 * ausweist. Sie stehen hier zusammen mit ihrer Schreibweise, damit die Zahl
 * beim Hochzählen nicht an zwei Stellen formatiert werden muss.
 */
const PROOF = [
  { target: 87, format: (n: number) => `${n}\u00A0%`, label: 'Entscheider-Quote in den gelieferten Gesprächen' },
  { target: 14, format: (n: number) => `<\u00A0${n} Tage`, label: 'bis zum ersten Termin in Ihrem Kalender' },
  { target: 35, format: (n: number) => `${n}\u00A0%`, label: 'Ø Abschlussquote auf gelieferte Termine' },
]

function blockGeometry(appointment: Appointment) {
  const startMinute = (appointment.hour - DAY_START_HOUR) * 60 + appointment.minute
  return {
    top: `${(startMinute / DAY_MINUTES) * 100}%`,
    height: `calc(${((appointment.duration * 60) / DAY_MINUTES) * 100}% - 4px)`,
    left: `calc(${appointment.day * 20}% + 3px)`,
  }
}

export default function HeroScene() {
  const { openCalendly, onHover } = useCalendly()

  const visualRef = useRef<HTMLDivElement>(null)
  const blockRefs = useRef<(HTMLDivElement | null)[]>([])
  const countRef = useRef<HTMLSpanElement>(null)
  const proofCellRefs = useRef<(HTMLDivElement | null)[]>([])
  const proofValueRefs = useRef<(HTMLSpanElement | null)[]>([])
  const cueRef = useRef<HTMLDivElement>(null)

  const wrapRef = useRef<HTMLDivElement>(null)

  useScrollScene(wrapRef, {
    measure: () => {
      if (isStacked()) {
        // Gestapelt: Fortschritt ist der Weg der Grafik vom unteren Bildrand
        // bis auf etwa ein Viertel Höhe.
        const visual = visualRef.current
        if (!visual) return 0
        const rect = visual.getBoundingClientRect()
        const viewport = window.innerHeight
        const from = viewport * 0.95
        const to = Math.max(viewport * 0.25, viewport - rect.height - 40)
        return from - to > 4 ? (from - rect.top) / (from - to) : 1
      }

      const wrap = wrapRef.current
      if (!wrap) return 0
      const travel = wrap.offsetHeight - window.innerHeight
      return travel > 4 ? -wrap.getBoundingClientRect().top / travel : 1
    },

    apply: (progress) => {
      const stacked = isStacked()
      const fillStart = stacked ? 0.08 : 0.12
      const stagger = (stacked ? 0.62 : 0.6) / APPOINTMENTS.length
      const window_ = stagger * 2.2

      let booked = 0
      for (let i = 0; i < APPOINTMENTS.length; i += 1) {
        const t = easeOut(clamp01((progress - (fillStart + i * stagger)) / window_))
        const element = blockRefs.current[i]
        if (element) {
          element.style.opacity = String(t)
          element.style.transform = `translateY(${(1 - t) * 10}px) scale(${0.94 + 0.06 * t})`
        }
        if (t > 0.5) booked += 1
      }
      if (countRef.current) countRef.current.textContent = String(booked)

      PROOF.forEach((entry, index) => {
        const t = easeOut(clamp01((progress - 0.62 - index * 0.05) / 0.28))
        const cell = proofCellRefs.current[index]
        if (cell) {
          cell.style.opacity = String(t)
          cell.style.transform = `translateY(${(1 - t) * 18}px)`
        }
        const value = proofValueRefs.current[index]
        if (value) value.textContent = entry.format(Math.round(entry.target * t))
      })

      if (cueRef.current) cueRef.current.style.opacity = String(clamp01(1 - progress * 8))
    },
  })

  return (
    <div id="einstieg" ref={wrapRef} className={styles.heroWrap}>
      <div className={styles.heroSticky}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <div className={`${styles.eyebrow} ${styles.introIn}`} data-fade-in="" style={{ '--rd': '0.05s' } as React.CSSProperties}>
              B2B Akquise-Agentur aus Köln
            </div>

            <h1 className={`${styles.heroTitle} ${styles.introIn}`} data-fade-in="" style={{ '--rd': '0.12s' } as React.CSSProperties}>
              Wöchentlich <span className={styles.nowrap}>3–8</span> Termine mit Entscheidern aus Ihrer Zielgruppe
            </h1>

            <p className={`${styles.heroText} ${styles.introIn}`} data-fade-in="" style={{ '--rd': '0.22s' } as React.CSSProperties}>
              Wir übernehmen Ihre komplette B2B-Kaltakquise und liefern qualifizierte Gespräche
              direkt in Ihren Kalender. Planbares Wachstum ohne Druck – von Köln aus, bundesweit.
            </p>

            <div className={`${styles.actionRow} ${styles.introIn}`} data-fade-in="" style={{ '--rd': '0.32s' } as React.CSSProperties}>
              <button type="button" className={styles.btnPrimary} onClick={openCalendly} onMouseEnter={onHover}>
                <span>Erstgespräch buchen</span>
                <span className={styles.btnHint}>15 Min.</span>
              </button>
              <span className={styles.metaNote}>Kostenlos, direkt mit dem Gründer</span>
            </div>

            <div className={`${styles.heroMeta} ${styles.introIn}`} data-fade-in="" style={{ '--rd': '0.42s' } as React.CSSProperties}>
              <span>Unverbindlich</span>
              <span className={styles.dot} aria-hidden="true" />
              <span>Nur 5 Kunden pro Monat</span>
              <span className={styles.dot} aria-hidden="true" />
              <span>Erste Termine in 14 Tagen</span>
            </div>
          </div>

          <div ref={visualRef} className={styles.heroVisual}>
            <div
              className={`${styles.calendar} ${styles.introIn}`}
              data-fade-in=""
              style={{ '--rd': '0.18s' } as React.CSSProperties}
              role="img"
              aria-label="Beispielhafte Arbeitswoche: acht Termine mit Entscheidern, verteilt von Montag bis Freitag zwischen 8 und 18 Uhr."
            >
              <div aria-hidden="true">
                <div className={styles.calHead}>
                  <span className={styles.calTitle}>
                    <strong>Ihre Woche</strong>
                    <span className={styles.calWeek}>Beispiel</span>
                  </span>
                  <span className={styles.calCount}>
                    <span ref={countRef} className={styles.calCountValue}>
                      8
                    </span>
                    <span className={styles.calUnit}>Termine</span>
                  </span>
                </div>

                <div className={styles.calRow}>
                  <div className={styles.calGutter} />
                  <div className={styles.calDays}>
                    {WEEKDAYS.map((day) => (
                      <span key={day}>
                        <b>{day}</b>
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.calRow}>
                  <div className={styles.calHours}>
                    {HOURS.map((hour) => (
                      <span key={hour}>{hour}</span>
                    ))}
                  </div>
                  <div className={styles.calGrid}>
                    {APPOINTMENTS.map((appointment, index) => (
                      <div
                        key={`${appointment.day}-${appointment.hour}-${appointment.minute}`}
                        ref={(element) => {
                          blockRefs.current[index] = element
                        }}
                        className={styles.calBlock}
                        data-fade-in=""
                        style={blockGeometry(appointment)}
                      >
                        <span className={styles.calBlockRole}>{appointment.role}</span>
                        <span className={styles.calBlockIndustry}>{appointment.industry}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.calNote}>Beispielhafte Woche, keine echten Kundendaten</div>
              </div>
            </div>

            <div className={`${styles.portrait} ${styles.introIn}`} data-fade-in="" style={{ '--rd': '0.28s' } as React.CSSProperties}>
              <Image
                src={nicoPortrait}
                alt="Nico-Luca Carpantier, Gründer von Carpantier Consulting (KI-generiertes Bild)"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1100px) 180px, 11vw"
                priority
                fetchPriority="high"
                placeholder="blur"
                {...AI_GENERATED_MEDIA_ATTRS}
              />
              {/* Kennzeichnung nach Art. 50 Abs. 4 KI-VO. Bewusst in der Standardgröße:
                  Die Angabe muss klar erkennbar sein, die kleine Variante liegt mit
                  10px unter der Lesbarkeitsgrenze. */}
              <AiGeneratedBadge corner="top-left" />
              {/* Auf der Einblendung ist nur für den Namen Platz. Die Rolle
                  („Gründer, Ihr Ansprechpartner“) steht weiterhin im Abschnitt
                  „Über Nico“ — sie ging nicht verloren, sie steht dort, wo mehr
                  Platz für sie ist. */}
              <div className={styles.portraitCaption}>
                <span className={styles.portraitName}>Nico-Luca Carpantier</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.proof}>
          {PROOF.map((entry, index) => (
            <div
              key={entry.label}
              ref={(element) => {
                proofCellRefs.current[index] = element
              }}
              className={styles.proofCell}
              data-fade-in=""
            >
              <span
                ref={(element) => {
                  proofValueRefs.current[index] = element
                }}
                className={styles.proofNum}
              >
                {entry.format(entry.target)}
              </span>
              <span className={styles.proofLabel}>{entry.label}</span>
            </div>
          ))}
        </div>

        <div ref={cueRef} className={styles.cue} aria-hidden="true">
          Scrollen, um die Woche zu füllen
        </div>
      </div>
    </div>
  )
}
