'use client'

import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { useCalendly } from '@/hooks/useCalendly'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './uebersicht.module.css'

/**
 * Einstieg der Kaltakquise-Übersicht.
 *
 * Kurz gehalten und ohne Schaubild. Diese Seite ist ein Wegweiser: Der nächste
 * nützliche Schritt ist die Marktliste darunter, nicht ein weiteres Argument.
 * Ein erfundenes Bild daneben würde die Seite nur um eine Bildschirmhöhe
 * verlängern.
 *
 * Statt einer Grafik trägt der Einstieg das Abschnittsgerüst der Grundlage:
 * Etikett und Überschrift links, Vorspann rechts, unten bündig. Damit füllt
 * Text die Breite.
 *
 * Die Überschrift nennt bewusst eine Grenze („dort, wo wir den Markt kennen“)
 * und der Vorspann löst sie sofort auf — telefoniert wird bundesweit, die
 * fünfzehn Seiten sind die Märkte mit eigener Einschätzung. Ohne diese
 * Auflösung wäre die Überschrift eine Absage an jeden, dessen Ort fehlt.
 */
export default function UebersichtIntro() {
  const { openCalendly, onHover } = useCalendly()
  const { ref, isIn } = useReveal<HTMLElement>()

  return (
    <section id="einstieg" ref={ref} className={styles.intro} aria-labelledby="intro-title">
      <Breadcrumbs items={[{ label: 'Kaltakquise' }]} />

      <div className={styles.sectionHead}>
        <div className={styles.sectionHeadCopy}>
          <div
            className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
          >
            Kaltakquise nach Standort
          </div>

          <h1
            id="intro-title"
            className={`${styles.introTitle} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
            data-fade-in=""
            style={{ '--rd': '0.08s' } as React.CSSProperties}
          >
            Wir machen Kaltakquise dort, wo wir den Markt kennen.
          </h1>
        </div>

        <p
          className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Telefoniert wird bundesweit. Für fünfzehn Wirtschaftsräume steht zusätzlich, welche
          Branchen dort führen und wann Entscheider ans Telefon gehen.
        </p>
      </div>

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
    </section>
  )
}
