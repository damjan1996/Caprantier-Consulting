'use client'

import type { CaseStudy } from '@/lib/case-studies'
import { useReveal } from '@/app/components/seite/useReveal'
import styles from './referenzen.module.css'

/**
 * Die echten, schriftlich freigegebenen Fallstudien.
 *
 * Heute leer — `getEchteFallstudien()` liefert nichts, und der Abschnitt
 * verschwindet dann vollständig statt eine Leermeldung zu zeigen. Die Auskunft
 * „null freigegebene Fallstudien“ steht schon im Zählerstreifen des
 * Einstiegs; ein zweiter Kasten mit derselben Aussage wäre eine Dopplung.
 *
 * Die Karten benutzen dieselben Feldklassen wie die Vorlage, aber mit
 * durchgezogenen Linien und voller Tinte. Der Unterschied zwischen „echt“ und
 * „noch nicht echt“ ist damit an der Darstellung ablesbar und braucht keinen
 * Warnkasten.
 *
 * Der Kundenname erscheint ausschließlich, wenn `kundeNennbar` gesetzt ist;
 * sonst steht die Branche. Das ist keine Vorsicht, sondern § 5 UWG — ein
 * Firmenname neben einer nicht freigegebenen Zahl ist eine irreführende
 * geschäftliche Handlung.
 */
export default function FallstudienSection({ faelle }: { faelle: CaseStudy[] }) {
  const { ref, isIn } = useReveal<HTMLElement>()

  if (faelle.length === 0) return null

  return (
    <section id="faelle" ref={ref} className={styles.section} aria-labelledby="faelle-title">
      <div className={styles.vorlageHead}>
        <div
          className={`${styles.eyebrow} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
        >
          Freigegebene Fälle
        </div>

        <h2
          id="faelle-title"
          className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
          data-fade-in=""
          style={{ '--rd': '0.08s' } as React.CSSProperties}
        >
          Projekte, deren Zahlen aus dem Verlauf stammen.
        </h2>
      </div>

      <div
        className={`${styles.reveal} ${isIn ? styles.revealIn : ''}`}
        data-fade-in=""
        style={{ '--ry': '20px', '--rd': '0.18s' } as React.CSSProperties}
      >
        {faelle.map((fall) => (
          <article key={fall.slug} className={styles.fallCard}>
            <div className={styles.fallKopf}>
              <h3 className={styles.fallName}>
                {fall.kundeNennbar && fall.kundenname ? fall.kundenname : fall.branche}
              </h3>
              <span className={styles.fallZeitraum}>{fall.zeitraum}</span>
            </div>

            <div className={styles.vorlageFeld}>
              <span className={styles.vorlageLabel}>Einordnung</span>
              <p className={styles.vorlageWert}>
                {fall.branche} · {fall.unternehmensgroesse} · {fall.region}
              </p>
            </div>

            <div className={styles.vorlageFeld}>
              <span className={styles.vorlageLabel}>Ausgangslage</span>
              <p className={styles.vorlageWert}>{fall.ausgangslage}</p>
            </div>

            <div className={styles.vorlageFeld}>
              <span className={styles.vorlageLabel}>Vorgehen</span>
              <ul className={styles.vorlageListe}>
                {fall.massnahme.map((schritt) => (
                  <li key={schritt}>{schritt}</li>
                ))}
              </ul>
            </div>

            <div className={styles.vorlageFeld}>
              <span className={styles.vorlageLabel}>Ergebnis</span>
              <div className={styles.vorlageZahlen}>
                {fall.ergebnisse.map((ergebnis) => (
                  <div key={ergebnis.label} className={styles.vorlageZahl}>
                    <span className={styles.vorlageZahlWert}>{ergebnis.wert}</span>
                    <span className={styles.vorlageZahlLabel}>{ergebnis.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.vorlageFeld}>
              <span className={styles.vorlageLabel}>Erkenntnis</span>
              <p className={styles.vorlageWert}>{fall.erkenntnis}</p>
            </div>

            {fall.freigegebenAm && (
              <p className={styles.fallFreigabe}>
                Schriftlich freigegeben am{' '}
                {new Date(fall.freigegebenAm).toLocaleDateString('de-DE', { timeZone: 'UTC' })}.
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
