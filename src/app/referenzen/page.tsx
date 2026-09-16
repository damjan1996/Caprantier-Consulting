import {
  AbschlussSection,
  FallstudienSection,
  MassstabSection,
  PruefenSection,
  ReferenzenIntro,
  VorlageSection,
} from './components'
import {
  enthaeltBeispiele,
  getBeispielFallstudien,
  getEchteFallstudien,
} from '@/lib/case-studies'
import { businessInfo } from '@/lib/local-seo'
import { generateBreadcrumbSchema } from '@/lib/schemas'
import styles from './components/referenzen.module.css'

const PAGE_URL = `${businessInfo.website}/referenzen`

/**
 * Referenzen.
 *
 * Bewusst unter `/referenzen` und nicht unter `/case-studies`: Jener Pfad ist
 * im Compliance-Gate gesperrt, weil dort einmal erfundene Firmennamen, Zitate
 * und Kennzahlen standen. Die Sperre bleibt; diese Seite tritt nicht an ihre
 * Stelle, sondern beginnt von vorn — mit einem Datenmodell, das eine
 * schriftliche Freigabe je Fall verlangt.
 *
 * Solange nur Blindmuster im Bestand sind, ist die Seite `noindex` (siehe
 * `layout.tsx`) und trägt kein `Article`-Markup. Ausgezeichnet wird nur, was
 * belegbar ist.
 *
 * ## Warum diese Seite anders gebaut ist als die übrigen
 *
 * Fünf Abschnitte, **keine einzige Klebe-Bühne** und **keine
 * Fortschrittsleiste**. Beides folgt aus dem Inhalt, nicht aus dem Wunsch nach
 * Abwechslung: Es gibt null freigegebene Fallstudien und ein Blindmuster —
 * eine Bühne wäre Mechanik ohne Anlass (Designleitfaden § 5.2), und bei knapp
 * sieben Bildschirmhöhen wäre die Leiste Dekoration (Baukasten § 7).
 *
 * Dafür hat die Seite zwei Bauteile, die es sonst nirgends gibt: das Register
 * (was veröffentlicht wird, was nicht) und die gestrichelte Vorlage. Die
 * Einzelheiten stehen im Kopf von `components/referenzen.module.css`.
 *
 * Die Reihenfolge trägt die Aussage: erst die freigegebenen Fälle (heute
 * keine), dann der Maßstab, nach dem veröffentlicht würde, dann die Vorlage,
 * dann — für den Leser, der Belege suchte und keine fand — vier Wege, uns
 * ohne Referenzen zu prüfen.
 */
export default function ReferenzenPage() {
  const echte = getEchteFallstudien()
  const beispiele = getBeispielFallstudien()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Startseite', url: businessInfo.website },
    { name: 'Referenzen', url: PAGE_URL },
  ])

  return (
    <div className={styles.page}>
      {/* Brotkrumen, wie sie im Einstieg auch sichtbar stehen. Weiteres Markup
          gibt es hier bewusst nicht: Kein `Article`, solange kein Fall
          freigegeben ist, und niemals `Review` oder `aggregateRating` —
          `scripts/check-compliance.mjs` prüft das im Quelltext. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ReferenzenIntro
        freigegeben={echte.length}
        beispiele={beispiele.length}
        imIndex={!enthaeltBeispiele()}
      />
      <FallstudienSection faelle={echte} />
      <MassstabSection />
      <VorlageSection beispiel={beispiele[0]} />
      <PruefenSection />
      <AbschlussSection />
    </div>
  )
}
