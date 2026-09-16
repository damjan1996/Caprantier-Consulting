import { notFound } from 'next/navigation'
import {
  FragenSection,
  MarktScene,
  RechtSection,
  StadtIntro,
  TerminScene,
  UmgebungSection,
} from './components'
import { KALTAKQUISE_SECTIONS } from './components/sections'
import { SectionRail } from '@/app/components/seite'
import { getCityBySlug, getAllCitySlugs, type City } from '@/lib/cities'
import { getCityAcquisition, type CityAcquisition } from '@/lib/city-acquisition'
import { generateKaltakquiseFAQSchema, generateBreadcrumbSchema } from '@/lib/schemas'
import { businessInfo } from '@/lib/local-seo'
import styles from './components/kaltakquise.module.css'

/**
 * Kaltakquise nach Stadt — eine Vorlage, fünfzehn Adressen.
 *
 * Aufgebaut wie die Startseite, aber auf die Frage zugeschnitten, mit der
 * jemand hier ankommt: „Kaltakquise Agentur <Stadt>“. Sechs Abschnitte, zwei
 * davon als Klebe-Bühne — der Zuschnitt aus dem Designleitfaden § 9.1 für
 * Stadtseiten, um den Rechtsteil und die interne Verlinkung erweitert.
 *
 * Die Reihenfolge folgt den Fragen in ihrer natürlichen Folge: Was ist das
 * (Einstieg) — passt das zu meiner Stadt (Markt) — darf man das überhaupt
 * (Recht) — was ist sonst noch offen (Fragen) — wo arbeitet ihr noch
 * (Umgebung) — und dann der Abschluss.
 *
 * Bewusst **nicht** übernommen: Problem, Abgrenzung, Referenzen und die vier
 * Leistungen. Die stehen auf Startseite und Leistungsseite. Fünfzehn Kopien
 * derselben Argumente wären genau der Dünn-Content-Fehler, den
 * `docs/ap1-indexierung-befund.md` für den Blog beschreibt.
 *
 * Kein `'use client'`: Die Abschnitte bringen es selbst mit, wo sie Zustand
 * oder Scroll brauchen.
 */

interface Props {
  params: Promise<{ stadt: string }>
}

export async function generateStaticParams() {
  return getAllCitySlugs().map((stadt) => ({ stadt }))
}

/**
 * JSON-LD der Kaltakquise-Seiten.
 *
 * Die Adressdaten stammen ausnahmslos aus `businessInfo`. Auf
 * `/leistungen/[stadt]` standen sie bis zum 10.09.2026 direkt im JSX – mit
 * einer abweichenden Postleitzahl. Genau das verbietet Abschnitt 3 des
 * Auftrags „Sichtbarkeit“: Widersprüchliche NAP-Angaben schwächen jedes
 * lokale Signal, und der Fehler fällt in strukturierten Daten niemandem auf.
 */
function generateKaltakquiseJsonLd(city: City, acquisition: CityAcquisition) {
  const url = `${businessInfo.website}/kaltakquise/${city.slug}`
  const { address } = businessInfo

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        serviceType: 'B2B Telefonakquise und Terminvereinbarung',
        name: `Kaltakquise Agentur ${city.name}`,
        description: `B2B-Kaltakquise und Telefonakquise für Unternehmen in ${city.name}: Zielgruppenauswahl mit dokumentiertem Anlass, Entscheideransprache und qualifizierte Terminvereinbarung ${city.businessContext}.`,
        url,
        provider: {
          '@type': 'LocalBusiness',
          '@id': `${businessInfo.website}/#organization`,
          name: businessInfo.name,
          url: businessInfo.website,
          telephone: businessInfo.phoneInternational,
          email: businessInfo.emailGeneral,
          address: {
            '@type': 'PostalAddress',
            streetAddress: address.street,
            addressLocality: address.city,
            postalCode: address.postalCode,
            addressRegion: address.region,
            addressCountry: address.countryCode,
          },
        },
        areaServed: {
          '@type': 'City',
          name: city.name,
          containedInPlace: {
            '@type': 'State',
            name: city.region,
          },
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `Telefonakquise und Terminvereinbarung ${city.name}`,
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: `Kaltakquise ${city.name}`,
                description: `Telefonische Erstansprache von Entscheidern in ${city.name} auf Grundlage eines dokumentierten Auswahlkriteriums.`,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: `B2B Terminvereinbarung ${city.name}`,
                description: `Qualifizierte Entscheidertermine in ${city.name} mit geklärtem Bedarf, geklärter Zuständigkeit und geklärtem Zeitpunkt.`,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: `Zielgruppenrecherche ${city.name}`,
                description: `Aufbau der Anrufliste aus öffentlich zugänglichen Anlässen: ${acquisition.leitbranchen.join(', ')}.`,
              },
            },
          ],
        },
      },
    ],
  }
}

export default async function KaltakquiseStadtPage({ params }: Props) {
  const { stadt } = await params
  const city = getCityBySlug(stadt)
  const acquisition = city ? getCityAcquisition(city.slug) : undefined

  if (!city || !acquisition) {
    notFound()
  }

  const serviceSchema = generateKaltakquiseJsonLd(city, acquisition)
  /* Wortgleich mit dem Abschnitt „Häufige Fragen“ — beide lesen
     `getKaltakquiseFAQs`. Die Antworten stehen eingeklappt, aber vollständig
     im ausgelieferten HTML; Markup und sichtbarer Text decken sich damit. */
  const faqSchema = generateKaltakquiseFAQSchema(city, acquisition)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Startseite', url: businessInfo.website },
    { name: 'Kaltakquise', url: `${businessInfo.website}/kaltakquise` },
    { name: city.name, url: `${businessInfo.website}/kaltakquise/${city.slug}` },
  ])

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <StadtIntro city={city} />
      <MarktScene city={city} acquisition={acquisition} />
      <RechtSection city={city} />
      <FragenSection city={city} acquisition={acquisition} />
      <UmgebungSection city={city} />
      <TerminScene city={city} />
      <SectionRail sections={KALTAKQUISE_SECTIONS} />
    </div>
  )
}
