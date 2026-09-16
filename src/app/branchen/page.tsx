import { Metadata } from 'next'
import {
  BranchenIntro,
  TerminScene,
  UnterschiedScene,
  WegweiserSection,
  ZuschnittSection,
} from './components'
import { BRANCHEN_SECTIONS } from './components/sections'
import { SectionRail } from '@/app/components/seite'
import { industryPages } from '@/lib/industries'
import { businessInfo } from '@/lib/local-seo'
import { generateBreadcrumbSchema } from '@/lib/schemas'
import styles from './components/branchen.module.css'

const PAGE_URL = `${businessInfo.website}/branchen`

export const metadata: Metadata = {
  title: 'Branchenlösungen – Vertrieb für Personaldienstleister und IT-Systemhäuser',
  description:
    'B2B-Akquise mit Branchenschärfe: eigene Vorgehensweisen für Personaldienstleister und für IT-Systemhäuser sowie Managed Service Provider. Was in diesen Märkten anders läuft und wie wir arbeiten.',
  keywords: [
    'Vertriebsagentur Branchen',
    'Vertriebsagentur Personaldienstleister',
    'Leadgenerierung IT-Systemhaus',
    'B2B Akquise Branchenlösung',
    'Managed Service Provider Vertrieb',
    'Kaltakquise Personalvermittlung',
  ],
  openGraph: {
    title: 'Branchenlösungen | Carpantier Consulting',
    description:
      'Vertriebsagentur mit Branchenschärfe: Personaldienstleister und IT-Systemhäuser.',
    url: PAGE_URL,
  },
  alternates: {
    canonical: PAGE_URL,
  },
}

/**
 * Übersicht der Branchenseiten.
 *
 * Sie existiert nicht nur der Vollständigkeit halber: Ohne diese Seite hätten
 * die beiden Branchenseiten kaum eingehende interne Verweise. Genau dieser
 * Zustand – Seiten, zu denen kaum ein Link führt – ist im Blog die belegte
 * Ursache dafür gewesen, dass 40 von 52 Beiträgen nie indexiert wurden (siehe
 * `docs/ap1-indexierung-befund.md`).
 *
 * Aufgebaut als Familien-Einstieg (Designleitfaden § 9.1): fünf Abschnitte,
 * zwei davon als Klebe-Bühne, rund zwölf Bildschirmhöhen. Ein Unterschied zu
 * `/kaltakquise` und `/wissen`: Diese Familie hat nur zwei Kinder. Der
 * Wegweiser ist deshalb kurz, und das Gewicht liegt auf der Bühne, die
 * erklärt, warum es überhaupt zwei getrennte Seiten gibt — und auf der
 * dunklen Karte, die sagt, warum es nicht zwanzig sind.
 *
 * Kein `'use client'`: Die Abschnitte bringen es selbst mit, wo sie Zustand
 * oder Scroll brauchen.
 */
export default function BranchenPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Startseite', url: businessInfo.website },
    { name: 'Branchen', url: PAGE_URL },
  ])

  /*
   * Die Branchenseiten als `ItemList` — wortgleich mit dem sichtbaren
   * Abschnitt „Die Branchen“, weil beide `industryPages` lesen.
   */
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Branchenlösungen von Carpantier Consulting',
    itemListElement: industryPages.map((industry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: industry.headline,
      url: `${PAGE_URL}/${industry.slug}`,
    })),
  }

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <BranchenIntro />
      <WegweiserSection />
      {/* Der Zuschnitt steht vor der Bühne, nicht dahinter: Seine dunkle
          Karte darf nicht unmittelbar an der dunklen Abschlusskarte liegen
          (Designleitfaden § 2.2). Die helle Bühne dazwischen trennt sie. */}
      <ZuschnittSection />
      <UnterschiedScene />
      <TerminScene />
      <SectionRail sections={BRANCHEN_SECTIONS} />
    </div>
  )
}
