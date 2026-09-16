'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AiGeneratedBadge from '@/components/ui/AiGeneratedBadge'
import { AI_GENERATED_MEDIA_ATTRS } from '@/components/ui/ai-media'
import { YOUTUBE_CHANNEL_URL } from '@/lib/youtube'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '../seite/useReveal'
import { isStacked, useScrollScene } from '../seite/useScrollScene'
import styles from './home.module.css'

import nicoPortrait from '@/../public/images/nico-portrait-new.jpg'

/**
 * „Über Nico“ — der Gegenentwurf zum anonymen Call-Center.
 *
 * Die Seite verkauft ausgelagerte Telefonakquise. Das Misstrauen dagegen ist
 * berechtigt und richtet sich fast immer gegen dieselbe Vorstellung: ein
 * Großraumbüro voller austauschbarer Stimmen. Dagegen hilft ein Name, ein
 * Gesicht und drei überprüfbare Zusagen.
 */

const COMMITMENTS = [
  {
    title: 'Führt jedes Erstgespräch und jeden Kick-off selbst',
    detail:
      'Sie sprechen von der ersten Minute mit dem, der die Verantwortung trägt – nicht mit einem Vertriebler, der Sie weiterreicht.',
  },
  {
    title: 'Baut mit dem Team Ihre Akquise-Strategie',
    detail:
      'Zielgruppe, Gesprächsleitfaden, Einwände, Definition eines qualifizierten Termins – bevor der erste Anruf rausgeht.',
  },
  {
    title: 'Teilt, was am Telefon funktioniert – öffentlich',
    detail:
      'Auf YouTube und im Wissensbereich zeigt Nico, wie moderne B2B-Kaltakquise klingt. Wer will, kann vorher zuhören.',
  },
]

export default function FounderSection() {
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

      const next = Math.min(COMMITMENTS.length - 1, Math.floor(progress * COMMITMENTS.length))
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
    },
  })

  return (
    <section
      id="gruender"
      ref={sectionRef}
      className={styles.sceneFounder}
      aria-labelledby="founder-title"
    >
      <div ref={wrapRef} className={styles.sceneWrap}>
        <div className={styles.sceneStage}>
          <div ref={ref} className={styles.sceneGrid}>
            {/* Das Porträt steht — es ist der ganze Punkt des Abschnitts. */}
            <div
              className={`${styles.sceneAside} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
              data-fade-in=""
              style={{ '--ry': '32px', '--rd': '0.1s' } as React.CSSProperties}
            >
        <div className={styles.nicoVisual}>
          <div className={`${styles.nicoFrame} ${isIn ? styles.nicoFrameIn : ''}`}>
            <Image
              src={nicoPortrait}
              alt="Nico-Luca Carpantier, Gründer und Geschäftsführer von Carpantier Consulting (KI-generiertes Bild)"
              fill
              sizes="(max-width: 1100px) 440px, 34vw"
              placeholder="blur"
              {...AI_GENERATED_MEDIA_ATTRS}
            />
            {/* Kennzeichnung nach Art. 50 Abs. 4 KI-VO. Bewusst in der Standardgröße:
                Die Angabe muss klar erkennbar sein, die kleine Variante liegt mit
                10px unter der Lesbarkeitsgrenze. */}
            <AiGeneratedBadge corner="top-left" />
          </div>

          <div className={styles.nicoBadge}>
            <span className={styles.nicoBadgeName}>
              <b>Nico-Luca Carpantier</b>
              <span>Gründer &amp; Geschäftsführer</span>
            </span>
            <span className={styles.nicoBadgePlace}>
              <span className={styles.liveDot} aria-hidden="true" />
              Köln · bundesweit
            </span>
          </div>
        </div>
            </div>

            <div className={styles.sceneCopy}>
            <div
              className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
              data-fade-in=""
            >
              Über Nico
            </div>
            <h2
              id="founder-title"
              className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
              data-fade-in=""
              style={{ '--rd': '0.08s' } as React.CSSProperties}
            >
              Kein Call-Center. Ihr externer Vertrieb – mit einem Gesicht.
            </h2>

          <div
            className={`${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.18s' } as React.CSSProperties}
          >
            <p className={styles.heroText} style={{ color: 'var(--ink)' }}>
              Ich bin Nico-Luca Carpantier, Gründer und Geschäftsführer. Aus Köln heraus unterstütze
              ich B2B-Dienstleister und inhabergeführte Unternehmen dabei, planbar neue Kunden zu
              gewinnen.
            </p>
            <p className={styles.body} style={{ marginTop: '14px', maxWidth: '34em' }}>
              Kein anonymes Call-Center, kein austauschbares Skript. Bei uns telefoniert ein
              eingespieltes Team, das Ihr Geschäft versteht und Ihre Sprache spricht. Wie ein eigener
              Mitarbeiter – nur ohne Recruiting, Onboarding und Führung.
            </p>
          </div>

          <span className={styles.sceneRail} aria-hidden="true">
            <span ref={railRef} className={styles.sceneRailFill} />
          </span>

          <ol className={`${styles.sceneSlot} ${styles.nicoList}`}>
            {COMMITMENTS.map((commitment, index) => (
              <li
                key={commitment.title}
                className={`${styles.sceneItem} ${
                  index === active
                    ? styles.sceneItemOn
                    : index < active
                      ? styles.sceneItemDone
                      : ''
                }`}
                aria-hidden={index === active ? undefined : true}
              >
                <span className={styles.nicoNum} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.fitItemText}>
                  <b>{commitment.title}</b>
                  <span>{commitment.detail}</span>
                </span>
              </li>
            ))}
          </ol>

          <div
            className={`${styles.actionRow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--ry': '14px', '--rd': '0.72s' } as React.CSSProperties}
          >
            <button type="button" className={styles.btnPrimary} onClick={openCalendly} onMouseEnter={onHover}>
              15 Minuten mit Nico
            </button>
            <Link href="/ueber-uns" className={styles.textLink}>
              Mehr über uns <span aria-hidden="true">→</span>
            </Link>
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.textLink} ${styles.textLinkMuted}`}
            >
              YouTube-Kanal
            </a>
          </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
