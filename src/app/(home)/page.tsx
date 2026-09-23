import CallScene from './_components/CallScene'
import ClosingCta from './_components/ClosingCta'
import FaqSection from './_components/FaqSection'
import FitSection from './_components/FitSection'
import FounderSection from './_components/FounderSection'
import HeroScene from './_components/HeroScene'
import HowSection from './_components/HowSection'
import MobileCtaBar from './_components/MobileCtaBar'
import ProblemScene from './_components/ProblemScene'
import ProcessSection from './_components/ProcessSection'
import ReferencesSection from './_components/ReferencesSection'
import TrustedLogos from './_components/TrustedLogos'
import { HOME_SECTIONS } from './_components/sections'
import SectionRail from '@/components/seite/SectionRail'
import {
  generateHowToSchema,
  generateHomepageFAQSchema,
  generateServiceAreaSchema,
  generateHomepageVideoSchema,
} from '@/lib/schemas'
import styles from './_components/home.module.css'

/**
 * Startseite.
 *
 * Der Aufbau folgt einer einzigen Frage in der Reihenfolge, in der ein
 * Entscheider sie stellt: Was bekomme ich (Einstieg) — warum brauche ich das
 * (Problem) — wie läuft das ab (Termin, Anruf, Prozess) — bin ich der Richtige
 * dafür (Fit) — hat das schon funktioniert (Referenzen) — mit wem rede ich
 * (Nico) — was ist noch offen (FAQ) — und dann der Abschluss.
 *
 * Kein `dynamic()` für die einzelnen Abschnitte: Sie stehen alle im
 * ausgelieferten HTML und werden für die Hydration ohnehin sofort gebraucht.
 * Nachgeladene Teilstücke würden hier nur eine zusätzliche Wartekette erzeugen.
 * Schwer wiegen auf dieser Seite nur Bild, Video und Buchungsfenster — und die
 * laden bereits verzögert beziehungsweise erst nach Einwilligung.
 */
export default function Home() {
  return (
    <div className={styles.page}>
      {/* HowTo — die vier Schritte aus dem Abschnitt „Der Prozess“ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateHowToSchema()) }}
      />
      {/* FAQPage — wortgleich mit dem sichtbaren FAQ-Abschnitt */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateHomepageFAQSchema()) }}
      />
      {/* Einzugsgebiet für die lokale Suche */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceAreaSchema()) }}
      />
      {/* VideoObject für das Video im Problem-Abschnitt */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateHomepageVideoSchema()) }}
      />

      <HeroScene />
      <TrustedLogos />
      <ProblemScene />
      <HowSection />
      <CallScene />
      <ProcessSection />
      <FitSection />
      <ReferencesSection />
      <FounderSection />
      <FaqSection />
      <ClosingCta />
      <MobileCtaBar />
      <SectionRail sections={HOME_SECTIONS} />
    </div>
  )
}
