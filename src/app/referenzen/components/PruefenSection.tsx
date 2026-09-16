'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useReveal } from '@/app/components/seite/useReveal'
import { useScrollScene } from '@/app/components/seite/useScrollScene'
import { abschnittsFortschritt, eintragsAnteil } from './fortschritt'
import styles from './referenzen.module.css'

/**
 * „Ohne Referenzen prüfen“ — vier Handgriffe, nummeriert.
 *
 * Der Abschnitt, der diese Seite überhaupt lesenswert macht. Wer Belege sucht
 * und keine findet, steht sonst mit leeren Händen da; hier bekommt er
 * stattdessen das Werkzeug, jeden Vertriebsdienstleister zu prüfen — uns
 * eingeschlossen.
 *
 * Eine nummerierte Liste statt eines Kartenfelds: vier Handgriffe in einer
 * sinnvollen Reihenfolge, keine gleichrangigen Kacheln. Die Ziffer trägt die
 * Reihenfolge; ein Symbol wäre Dekoration (Designleitfaden § 7).
 *
 * ## Die Scroll-Bindung
 *
 * Am linken Rand läuft eine Spur mit, die sich mit dem Scrollstand füllt,
 * während die vier Einträge nacheinander erscheinen. Verwandt mit der
 * Fortschrittslinie der Bühnen — dieselbe Feder, dasselbe `scaleX`-Prinzip
 * (hier senkrecht) — aber ohne klebenden Abschnitt: Die Liste scrollt normal
 * vorbei und zeigt nur, wie weit man in ihr ist.
 *
 * Geschrieben wird je Frame direkt ins DOM, nicht über `setState`
 * (Baukasten § 5.2).
 */
const HANDGRIFFE = [
  {
    titel: 'Nach dem Auswahlkriterium fragen',
    text: 'Lassen Sie sich erklären, woran die Anrufliste aufgebaut wird. Wer darauf mit Branche und Mitarbeiterzahl antwortet, arbeitet mit gekauften Adressen – und hat für jeden Kontakt denselben Anlass, nämlich keinen.',
  },
  {
    titel: 'Nach dem Absagegrund fragen',
    text: 'Werden Absagen als Kategorie festgehalten oder im Wortlaut? Der Wortlaut ist unbequemer zu lesen und die einzige Form, aus der sich das Gesprächsgerüst nachschärfen lässt.',
  },
  {
    titel: 'Einen Testlauf statt einer Fallstudie verlangen',
    text: 'Ein Pilotprojekt mit festem Terminkontingent zeigt in einem Monat mehr über die Zusammenarbeit als jede Referenzliste – und zwar an Ihrer eigenen Zielgruppe statt an einer fremden.',
  },
  {
    titel: 'Die drei unbequemen Fragen stellen',
    text: 'Für welche Zielgruppe funktioniert ihr nicht? Wann habt ihr zuletzt ein Projekt abgelehnt? Was war der letzte Fall, in dem ihr nicht geliefert habt? Wer auf alle drei eine Antwort hat, hat sie sich schon einmal gestellt.',
  },
]

export default function PruefenSection() {
  const { ref: einblendRef, isIn } = useReveal<HTMLElement>()

  const sectionRef = useRef<HTMLElement | null>(null)
  const eintraegeRef = useRef<HTMLLIElement[]>([])
  const fuellungRef = useRef<HTMLSpanElement>(null)

  const setzeAbschnitt = (element: HTMLElement | null) => {
    sectionRef.current = element
    einblendRef.current = element
  }

  const merkeEintrag = (index: number) => (element: HTMLLIElement | null) => {
    if (element) eintraegeRef.current[index] = element
  }

  useScrollScene(sectionRef, {
    measure: () => abschnittsFortschritt(sectionRef.current),
    apply: (fortschritt) => {
      if (fuellungRef.current) {
        fuellungRef.current.style.transform = `scaleY(${fortschritt.toFixed(3)})`
      }
      eintraegeRef.current.forEach((eintrag, index) => {
        if (!eintrag) return
        const anteil = eintragsAnteil(fortschritt, index, HANDGRIFFE.length)
        eintrag.style.opacity = anteil.toFixed(3)
        eintrag.style.transform = `translateY(${((1 - anteil) * 10).toFixed(2)}px)`
      })
    },
  })

  return (
    <section
      id="pruefen"
      ref={setzeAbschnitt}
      className={styles.section}
      aria-labelledby="pruefen-title"
    >
      <div className={styles.pruefenHead}>
        <div
          className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
        >
          Ohne Referenzen prüfen
        </div>

        <h2
          id="pruefen-title"
          className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.08s' } as React.CSSProperties}
        >
          Vier Wege, uns zu prüfen, ohne auf Zahlen zu vertrauen.
        </h2>

        <p
          className={`${styles.lead} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.16s' } as React.CSSProperties}
        >
          Wer Belege sucht und keine findet, ist deshalb nicht ausgeliefert. Diese vier Fragen
          sagen mehr über einen Vertriebsdienstleister als jede Referenzliste – auch über uns.
        </p>
      </div>

      {/* Keine Einblendung auf der Liste: Die Einträge hängen am Scrollstand.
          `data-fade-in` steht an ihnen selbst — ohne JavaScript sind sie damit
          sichtbar (noscript-Regel im Layout). */}
      <ol className={styles.pruefenListe}>
        <span className={styles.pruefenSpur} aria-hidden="true">
          <span ref={fuellungRef} className={styles.pruefenSpurFuellung} />
        </span>

        {HANDGRIFFE.map((handgriff, index) => (
          <li key={handgriff.titel} ref={merkeEintrag(index)} data-fade-in="">
            <span className={styles.pruefenZiffer} aria-hidden="true">
              {index + 1}
            </span>
            <h3 className={styles.pruefenTitel}>{handgriff.titel}</h3>
            <p className={styles.pruefenText}>{handgriff.text}</p>
          </li>
        ))}
      </ol>

      <div
        className={`${styles.pruefenFoot} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--rd': '0.3s' } as React.CSSProperties}
      >
        <Link href="/blog/vertriebsagentur-finden-checkliste" className={styles.textLink}>
          Die vollständige Checkliste zur Agenturauswahl
        </Link>
        <Link href="/leistungen" className={styles.textLink}>
          Was wir übernehmen
        </Link>
      </div>
    </section>
  )
}
