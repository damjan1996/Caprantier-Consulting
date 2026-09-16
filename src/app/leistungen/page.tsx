import {
  ClosingScene,
  EngagementScene,
  LeistungenIntro,
  RegionsSection,
  ServicesScene,
} from './components'
import { LEISTUNGEN_SECTIONS } from './components/sections'
import { SectionRail } from '@/app/components/seite'
import { generateBreadcrumbSchema, generateServicesSchema } from '@/lib/schemas'
import { generateOfferSchema } from '@/lib/pricing'
import { businessInfo } from '@/lib/local-seo'
import styles from './components/leistungen.module.css'

/**
 * Leistungen.
 *
 * Aufgebaut wie die Startseite, aber kürzer: fünf Abschnitte statt zehn, drei
 * davon als Klebe-Bühne. Wer hier ankommt, kommt aus der Navigation oder der
 * Suche und will wissen, was geliefert wird — er muss nicht erst über das
 * Thema aufgeklärt werden. Deshalb kein bildschirmfüllender Einstieg und
 * keine Wiederholung von Problem, Abgrenzung und Referenzen; das steht auf
 * der Startseite und wäre hier dieselbe Seite ein zweites Mal.
 *
 * Die Reihenfolge folgt der Frage, die jemand auf dieser Seite stellt: Was
 * genau macht ihr (Leistungen) — wie werdet ihr beauftragt (Zusammenarbeit) —
 * arbeitet ihr auch bei mir (Regionen) — und dann der Abschluss.
 *
 * Kein `'use client'`: Die Abschnitte bringen es selbst mit, wo sie Zustand
 * oder Scroll brauchen.
 */
export default function LeistungenPage() {
  /*
   * `Offer`-Markup nur mit freigegebenem Betrag. Ohne Zahl gibt
   * `generateOfferSchema` null zurück — ein Angebot ohne Preis wäre gegenüber
   * Google wertlos und gegenüber dem Leser irreführend.
   */
  const offerSchema = generateOfferSchema(businessInfo.website)

  return (
    <div className={styles.page}>
      {/* Die vier Leistungen — wortgleich mit dem sichtbaren Abschnitt */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServicesSchema()) }}
      />
      {/* Brotkrumen, wie sie im Einstieg auch sichtbar stehen */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Startseite', url: businessInfo.website },
              { name: 'Leistungen', url: `${businessInfo.website}/leistungen` },
            ])
          ),
        }}
      />
      {offerSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
        />
      )}

      <LeistungenIntro />
      <ServicesScene />
      <EngagementScene />
      <RegionsSection />
      <ClosingScene />
      <SectionRail sections={LEISTUNGEN_SECTIONS} />
    </div>
  )
}
