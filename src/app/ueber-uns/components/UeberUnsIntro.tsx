'use client'

import Image from 'next/image'
import AiGeneratedBadge from '@/components/ui/AiGeneratedBadge'
import { AI_GENERATED_MEDIA_ATTRS } from '@/components/ui/ai-media'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { businessInfo } from '@/lib/local-seo'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './ueber-uns.module.css'

import nicoOffice from '@/../public/images/nico-office.jpg'

/**
 * Einstieg der Seite „Über uns“.
 *
 * ## Warum hier ein Bild steht
 *
 * Auf den Stadtseiten wurde das Porträt ausdrücklich verworfen: fünfzehn
 * Seiten mit demselben Gesicht sind fünfzehnmal dasselbe LCP-Bild und
 * nullmal ein Argument (Designleitfaden § 9.1). Hier gilt dieselbe Regel mit
 * umgekehrtem Ergebnis — auf dieser einen Seite **ist** das Gesicht das
 * Argument. Wer ausgelagerte Telefonakquise kauft, lässt jemand Fremdes unter
 * dem eigenen Firmennamen anrufen; die erste Frage lautet deshalb nicht „was
 * kostet das“, sondern „wer ist das“.
 *
 * Deshalb trägt die Überschrift auch nicht den Firmennamen, sondern den
 * Tausch, um den es geht: Sie geben uns Ihren Namen, wir zeigen Ihnen unseren.
 *
 * Das Porträt ist KI-erzeugt und trägt die Kennzeichnung nach Art. 50 Abs. 4
 * KI-VO sichtbar am Bild — in der Standardgrösse, die kleine Variante liegt
 * mit 10px unter der Lesbarkeitsgrenze.
 */
export default function UeberUnsIntro() {
  const { openCalendly, onHover } = useCalendly()
  const { ref, isIn } = useReveal<HTMLElement>()

  return (
    <section id="einstieg" ref={ref} className={styles.intro} aria-labelledby="intro-title">
      <Breadcrumbs items={[{ label: 'Über uns' }]} />

      <div className={styles.introGrid}>
        <div className={styles.introCopy}>
          <div
            className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
          >
            Über uns
          </div>

          <h1
            id="intro-title"
            className={`${styles.introTitle} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.08s' } as React.CSSProperties}
          >
            Wir rufen unter Ihrem Namen an. Deshalb steht hier unserer.
          </h1>

          <p
            className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.16s' } as React.CSSProperties}
          >
            Carpantier Consulting ist eine B2B-Vertriebsagentur aus Köln. Wer uns beauftragt,
            lässt uns mit seinem Firmennamen telefonieren. Hier steht, wer das tut.
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
            <span>Sitz in {businessInfo.address.city}</span>
            <span className={styles.dot} aria-hidden="true" />
            <span>Bundesweit am Telefon</span>
            <span className={styles.dot} aria-hidden="true" />
            <span>Nur 5 Kunden pro Monat</span>
          </div>
        </div>

        <div
          className={`${styles.portrait} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--ry': '28px', '--rd': '0.2s' } as React.CSSProperties}
        >
          <div className={styles.portraitFrame}>
            <Image
              src={nicoOffice}
              alt={`${businessInfo.owner.name}, Gründer und Geschäftsführer von ${businessInfo.name} (KI-generiertes Bild)`}
              fill
              sizes="(max-width: 1100px) 100vw, 480px"
              placeholder="blur"
              priority
              fetchPriority="high"
              {...AI_GENERATED_MEDIA_ATTRS}
            />
            {/* Kennzeichnung nach Art. 50 Abs. 4 KI-VO, sichtbar am Bild. */}
            <AiGeneratedBadge corner="top-right" />
          </div>

          <div className={styles.portraitPlate}>
            <span className={styles.portraitName}>
              <b>{businessInfo.owner.name}</b>
              <span>Gründer &amp; Geschäftsführer</span>
            </span>
            <span className={styles.portraitPlace}>
              <span className={styles.liveDot} aria-hidden="true" />
              {businessInfo.address.city} · bundesweit
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
