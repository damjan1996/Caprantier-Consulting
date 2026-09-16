'use client'

import Image from 'next/image'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { AiGeneratedBadge, AI_GENERATED_MEDIA_ATTRS } from '@/components/ui'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './leistungen.module.css'

// Statischer Import, damit Next den Unschärfe-Platzhalter selbst erzeugt.
import nicoSalesCall from '@/../public/images/nico-sales-call.jpg'

/**
 * Einstieg der Leistungsseite.
 *
 * Bewusst **keine** Klebe-Bühne wie auf der Startseite. Dort entscheidet
 * jemand zum ersten Mal, ob das Thema ihn überhaupt betrifft; hier kommt er
 * aus der Navigation oder der Suche und will wissen, was geliefert wird. Der
 * Einstieg nennt die Sache auf zwei Dritteln der Bildschirmhöhe und gibt den
 * Weg nach unten frei.
 *
 * Die Angaben in der Merkmalszeile sind dieselben wie auf der Startseite —
 * fünf Kunden pro Monat, erste Termine in vierzehn Tagen. Zwei Fassungen
 * derselben Zusage, die auseinanderlaufen, wären schlimmer als keine.
 */
export default function LeistungenIntro() {
  const { openCalendly, onHover } = useCalendly()
  const { ref, isIn } = useReveal<HTMLDivElement>()

  return (
    <section id="einstieg" className={styles.intro} aria-labelledby="intro-title">
      <div ref={ref} className={styles.introGrid}>
        <div className={styles.introCopy}>
          <Breadcrumbs items={[{ label: 'Leistungen' }]} />

          <div
            className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
          >
            Unsere Leistungen
          </div>

          <h1
            id="intro-title"
            className={`${styles.introTitle} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.08s' } as React.CSSProperties}
          >
            B2B-Akquise in vier Schritten – bis der Termin in Ihrem Kalender steht.
          </h1>

          <p
            className={`${styles.introText} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.16s' } as React.CSSProperties}
          >
            Wir übernehmen Zielgruppe, Anruf, Qualifizierung und Bericht. Sie bekommen Gespräche
            mit Entscheidern – und sehen jede Woche, was dahintersteckt.
          </p>

          <div
            className={`${styles.actionRow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--ry': '14px', '--rd': '0.24s' } as React.CSSProperties}
          >
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={openCalendly}
              onMouseEnter={onHover}
            >
              <span>Leistungen besprechen</span>
              <span className={styles.btnHint}>15 Min.</span>
            </button>
            <span className={styles.metaNote}>Kostenlos, direkt mit dem Gründer</span>
          </div>

          <div
            className={`${styles.introMeta} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.32s' } as React.CSSProperties}
          >
            <span>Unverbindlich</span>
            <span className={styles.dot} aria-hidden="true" />
            <span>Nur 5 Kunden pro Monat</span>
            <span className={styles.dot} aria-hidden="true" />
            <span>Erste Termine in 14 Tagen</span>
          </div>
        </div>

        <div
          className={`${styles.introVisual} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--ry': '28px', '--rd': '0.2s' } as React.CSSProperties}
        >
          <Image
            src={nicoSalesCall}
            alt="Nico-Luca Carpantier im Akquisegespräch am Telefon (KI-generiertes Bild)"
            fill
            sizes="(max-width: 1100px) 420px, 34vw"
            placeholder="blur"
            priority
            fetchPriority="high"
            {...AI_GENERATED_MEDIA_ATTRS}
          />
          {/* Transparenzhinweis nach Art. 50 Abs. 4 KI-VO */}
          <AiGeneratedBadge corner="top-right" />
        </div>
      </div>
    </section>
  )
}
