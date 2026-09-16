import { Metadata } from 'next'
import {
  GrenzenSection,
  MaerkteSection,
  TerminScene,
  UebersichtIntro,
  UnterschiedScene,
} from './components'
import { KALTAKQUISE_START_SECTIONS } from './components/sections'
import { SectionRail } from '@/app/components/seite'
import { cities } from '@/lib/cities'
import { businessInfo } from '@/lib/local-seo'
import { generateBreadcrumbSchema } from '@/lib/schemas'
import styles from './components/uebersicht.module.css'

const PAGE_URL = `${businessInfo.website}/kaltakquise`

export const metadata: Metadata = {
  title: 'Kaltakquise Agentur – B2B-Telefonakquise nach Standorten',
  description:
    'B2B-Kaltakquise und Telefonakquise in 15 deutschen Wirtschaftsräumen: Zielgruppenauswahl mit dokumentiertem Anlass, Entscheideransprache und qualifizierte Terminvereinbarung. Rechtssicher nach § 7 UWG.',
  keywords: [
    'Kaltakquise Agentur',
    'B2B Telefonakquise Agentur',
    'Telefonakquise Agentur',
    'B2B Terminvereinbarung Agentur',
    'Kaltakquise auslagern',
    'Neukundengewinnung Telefon',
  ],
  openGraph: {
    title: 'Kaltakquise Agentur | Carpantier Consulting',
    description: 'B2B-Telefonakquise und Terminvereinbarung in 15 deutschen Wirtschaftsräumen.',
    url: PAGE_URL,
  },
  alternates: {
    canonical: PAGE_URL,
  },
}

/**
 * Einstieg in die Seitenfamilie `/kaltakquise/[stadt]`.
 *
 * Ohne diese Übersicht wären die fünfzehn Stadtseiten nur über die Sitemap und
 * über die drei Nachbarorte der jeweils anderen Seiten erreichbar. Genau
 * dieser Zustand – Seiten ohne eingehende Verweise – ist im Blog die belegte
 * Ursache dafür gewesen, dass 40 von 52 Beiträgen nie in den Index kamen.
 *
 * Aufgebaut wie die Startseite, aber auf die Aufgabe einer Übersicht
 * zugeschnitten: fünf Abschnitte, zwei davon als Klebe-Bühne, rund zwölf
 * Bildschirmhöhen. Der Wegweiser (die Marktliste) steht weit oben; alles
 * danach beantwortet, warum es die Einzelseiten überhaupt gibt und wo die
 * Arbeit aufhört.
 *
 * Bewusst **nicht** übernommen: der Rechtsrahmen in voller Länge, die vier
 * Leistungen und die häufigen Fragen. Die stehen auf den Stadtseiten, auf
 * `/leistungen` und auf der Startseite. Eine sechzehnte Fassung desselben
 * Textes macht die Seite länger, nicht überzeugender.
 *
 * Kein `'use client'`: Die Abschnitte bringen es selbst mit, wo sie Zustand
 * oder Scroll brauchen.
 */
export default function KaltakquisePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Startseite', url: businessInfo.website },
    { name: 'Kaltakquise', url: PAGE_URL },
  ])

  /*
   * Die fünfzehn Märkte als `ItemList` — wortgleich mit dem sichtbaren
   * Abschnitt „Die Märkte“, weil beide aus `cities` lesen.
   */
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Standorte für B2B-Kaltakquise',
    itemListElement: cities.map((city, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `Kaltakquise Agentur ${city.name}`,
      url: `${PAGE_URL}/${city.slug}`,
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

      <UebersichtIntro />
      <MaerkteSection />
      {/* Die Grenzen stehen vor der Bühne, nicht dahinter: Ihre dunkle Karte
          darf nicht unmittelbar an der dunklen Abschlusskarte liegen
          (Designleitfaden § 2.2). Die helle Bühne dazwischen trennt sie —
          und inhaltlich beantwortet die Abgrenzung genau den Einwand, den
          eine Liste von fünfzehn Städten weckt. */}
      <GrenzenSection />
      <UnterschiedScene />
      <TerminScene />
      <SectionRail sections={KALTAKQUISE_START_SECTIONS} />
    </div>
  )
}
