'use client'

import Image from 'next/image'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { AiGeneratedBadge, AI_GENERATED_MEDIA_ATTRS } from '@/components/ui'
import type { City } from '@/lib/cities'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './stadt.module.css'

// Statischer Import, damit Next den Unschärfe-Platzhalter selbst erzeugt.
import nicoSalesCall from '@/../public/images/nico-sales-call.jpg'

/**
 * Einstieg der Vertriebs-Stadtseiten.
 *
 * Mit Porträt, anders als auf `/kaltakquise/[stadt]`. Wer erwägt, den Vertrieb
 * auszulagern, gibt einen Teil seines Geschäfts aus der Hand — da will man
 * sehen, an wen. Die Schwesterfamilie zeigt an derselben Stelle eine
 * Dokumentationskarte; die beiden sollen sich auch im ersten Bild
 * unterscheiden.
 *
 * Die Überschrift nennt den Suchbegriff („Vertrieb auslagern in <Stadt>“) und
 * im selben Satz die Grenze der Zusage. Die frühere Fassung hiess nur
 * „Vertrieb <Stadt>“ — zwei Wörter im Nominalstil, die nichts behaupten und
 * nichts einlösen.
 */
export default function StadtIntro({ city }: { city: City }) {
  const { openCalendly, onHover } = useCalendly()
  const { ref, isIn } = useReveal<HTMLDivElement>()

  return (
    <section id="einstieg" className={styles.intro} aria-labelledby="intro-title">
      <div ref={ref} className={styles.introGrid}>
        <div className={styles.introCopy}>
          <Breadcrumbs
            items={[{ label: 'Leistungen', href: '/leistungen' }, { label: city.name }]}
          />

          <div
            className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
          >
            Vertriebsagentur {city.name}
          </div>

          <h1
            id="intro-title"
            className={`${styles.introTitle} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.08s' } as React.CSSProperties}
          >
            Vertrieb auslagern in {city.name} – ohne den Abschluss aus der Hand zu geben.
          </h1>

          <p
            className={`${styles.introText} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.16s' } as React.CSSProperties}
          >
            Wir übernehmen Zielgruppe, Anruf und Qualifizierung. Das Verkaufsgespräch führen Sie –
            weil Preis und Zusage bei Ihnen bleiben.
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
              <span>Erstgespräch buchen</span>
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
            alt={`Nico-Luca Carpantier im Akquisegespräch für Kunden in ${city.name} (KI-generiertes Bild)`}
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
