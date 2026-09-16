import { notFound } from 'next/navigation'
import {
  AufwandSection,
  FragenSection,
  RegionSection,
  StadtIntro,
  TerminScene,
  UebergabeScene,
} from './components'
import { STADT_SECTIONS } from './components/sections'
import { SectionRail } from '@/app/components/seite'
import { getCityBySlug, getAllCitySlugs, type City } from '@/lib/cities'
import { generateCityFAQSchema, generateBreadcrumbSchema } from '@/lib/schemas'
import { businessInfo } from '@/lib/local-seo'
import styles from './components/stadt.module.css'

/**
 * Vertrieb nach Stadt — eine Vorlage, fünfzehn Adressen.
 *
 * Aufgebaut wie die Startseite: sechs Abschnitte, zwei davon als Klebe-Bühne,
 * rund dreizehn Bildschirmhöhen.
 *
 * **Abgrenzung zur Schwesterfamilie.** `/kaltakquise/[stadt]` beantwortet
 * „darf man das, und wen ruft ihr an“. Diese Seite beantwortet „soll ich den
 * Vertrieb überhaupt abgeben — und was bleibt dann bei mir“. Deshalb trägt die
 * Bühne hier die Übergabe statt des Marktes, und die dunkle Karte den Aufwand
 * statt des Rechtsrahmens. Zwei Seitenfamilien mit denselben Abschnitten wären
 * dieselbe Seite unter zwei Adressen.
 *
 * Die Reihenfolge folgt der Frage, mit der jemand hier ankommt: Was bekomme
 * ich (Einstieg) — wie ist die Arbeit geteilt (Übergabe) — kennt ihr meinen
 * Markt (Region) — was kostet es mich (Aufwand) — was ist noch offen (Fragen)
 * — und dann der Abschluss.
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
 * JSON-LD der Vertriebs-Stadtseiten.
 *
 * Die Adressdaten stammen ausnahmslos aus `businessInfo`. Bis zum 10.09.2026
 * standen sie hier direkt im JSX — mit einer abweichenden Postleitzahl.
 * Widersprüchliche NAP-Angaben schwächen jedes lokale Signal, und der Fehler
 * fällt in strukturierten Daten niemandem auf.
 *
 * `LocalBusiness` trägt bewusst die Kölner Anschrift und nicht die der Stadt:
 * Es gibt kein Büro vor Ort, und ein vorgetäuschter Standort wäre eine
 * irreführende Angabe. `areaServed` sagt, wofür gearbeitet wird.
 */
function generateCityJsonLd(city: City) {
  const url = `${businessInfo.website}/leistungen/${city.slug}`
  const { address } = businessInfo

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${url}#organization`,
        name: businessInfo.name,
        alternateName: `Vertriebsagentur ${city.name} – ${businessInfo.name}`,
        description: `Vertrieb ${city.name}: Vertriebsagentur für B2B-Leadgenerierung und Telefonakquise. Wir liefern qualifizierte Termine mit Entscheidern für Dienstleister ${city.businessContext}.`,
        url,
        logo: `${businessInfo.website}/logo/Logo%20-%20Schwarz.png`,
        // Siehe layout.tsx: kein unbeschriftetes KI-Porträt in strukturierten
        // Daten.
        image: `${businessInfo.website}/images/og-image.jpg`,
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
        geo: {
          '@type': 'GeoCoordinates',
          latitude: city.coordinates.latitude,
          longitude: city.coordinates.longitude,
        },
        areaServed: {
          '@type': 'City',
          name: city.name,
          containedInPlace: {
            '@type': 'State',
            name: city.region,
          },
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        priceRange: '€€€',
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        serviceType: 'Vertriebsagentur',
        name: `Vertrieb auslagern in ${city.name}`,
        description: `Vertriebsoutsourcing in ${city.name}: Zielgruppe, Telefonakquise und Qualifizierung übernehmen wir, das Verkaufsgespräch führt der Auftraggeber selbst.`,
        provider: { '@id': `${url}#organization` },
        areaServed: {
          '@type': 'City',
          name: city.name,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `Vertriebsunterstützung ${city.name}`,
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: `Vertrieb ${city.name}`,
                description: `Laufende Vertriebsunterstützung für B2B-Dienstleister in ${city.name}.`,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: `Vertrieb auslagern ${city.name}`,
                description: `Übernahme von Zielgruppenauswahl, Telefonakquise und Terminqualifizierung für Unternehmen in ${city.name}.`,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: `Leadgenerierung ${city.name}`,
                description: `Qualifizierte Entscheidertermine mit geklärtem Bedarf, geklärter Zuständigkeit und geklärtem Zeitpunkt.`,
              },
            },
          ],
        },
      },
    ],
  }
}

export default async function StadtPage({ params }: Props) {
  const { stadt } = await params
  const city = getCityBySlug(stadt)

  if (!city) {
    notFound()
  }

  const jsonLd = generateCityJsonLd(city)
  /* Wortgleich mit dem Abschnitt „Häufige Fragen“ — beide lesen
     `getCityFAQs`. Die Antworten stehen eingeklappt, aber vollständig im
     ausgelieferten HTML; Markup und sichtbarer Text decken sich damit. */
  const faqSchema = generateCityFAQSchema(city)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Startseite', url: businessInfo.website },
    { name: 'Leistungen', url: `${businessInfo.website}/leistungen` },
    { name: city.name, url: `${businessInfo.website}/leistungen/${city.slug}` },
  ])

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
      <UebergabeScene />
      <RegionSection city={city} />
      <AufwandSection />
      <FragenSection city={city} />
      <TerminScene city={city} />
      <SectionRail sections={STADT_SECTIONS} />
    </div>
  )
}
