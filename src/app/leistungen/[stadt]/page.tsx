import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { PageWrapper } from '@/components/ui'
import { getCityBySlug, getAllCitySlugs, type City } from '@/lib/cities'
import { generateCityFAQSchema } from '@/lib/schemas'
import StadtHero from './components/StadtHero'
import StadtServices from './components/StadtServices'
import StadtFAQ from './components/StadtFAQ'
import RelatedCities from './components/RelatedCities'
import { Process, WhyUs } from '../components'

const CTA = dynamic(() => import('@/components/sections/CTA'), {
  loading: () => <div className="section-padding" />,
})

// Generate JSON-LD for city-specific page
function generateCityJsonLd(city: City) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `https://carpantier-consulting.de/leistungen/${city.slug}#organization`,
        name: 'Carpantier Consulting',
        alternateName: `Vertriebsagentur ${city.name} - Carpantier Consulting`,
        description: `Vertrieb ${city.name}: Ihre Vertriebsagentur für B2B Leadgenerierung & Telefonakquise. Wir liefern qualifizierte Termine mit Entscheidern für Agenturen, IT-Dienstleister und Beratungsunternehmen ${city.businessContext}.`,
        url: `https://carpantier-consulting.de/leistungen/${city.slug}`,
        logo: 'https://carpantier-consulting.de/logo/Logo%20-%20Schwarz.png',
        image: 'https://carpantier-consulting.de/images/nico-portrait.png',
        telephone: '+4915738186221',
        email: 'nico@carpantier-consulting.de',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Stammheimer Straße 123',
          addressLocality: 'Köln',
          postalCode: '50935',
          addressRegion: 'Nordrhein-Westfalen',
          addressCountry: 'DE',
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
        '@id': `https://carpantier-consulting.de/leistungen/${city.slug}#service`,
        serviceType: 'Vertriebsagentur',
        name: `Vertrieb ${city.name} - B2B Leadgenerierung & Terminvereinbarung`,
        description: `Vertrieb auslagern in ${city.name}: Professionelle Vertriebsunterstützung, Kaltakquise und Leadgenerierung für B2B-Unternehmen. Wir vereinbaren qualifizierte Termine mit Entscheidern ${city.businessContext}.`,
        provider: {
          '@id': `https://carpantier-consulting.de/leistungen/${city.slug}#organization`,
        },
        areaServed: {
          '@type': 'City',
          name: city.name,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `Vertrieb & B2B Akquise Dienstleistungen ${city.name}`,
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: `Vertrieb ${city.name}`,
                description: `Professionelle Vertriebsagentur und Vertriebsunterstützung für B2B-Unternehmen in ${city.name}`,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: `Vertrieb auslagern ${city.name}`,
                description: `Vertriebsoutsourcing und B2B Telefonakquise zur Terminvereinbarung mit Entscheidern in ${city.name}`,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: `Leadgenerierung ${city.name}`,
                description: `Qualifizierte B2B Leads und Vertriebsunterstützung für Ihr Team in ${city.name}`,
              },
            },
          ],
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://carpantier-consulting.de',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Leistungen',
            item: 'https://carpantier-consulting.de/leistungen',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: city.name,
            item: `https://carpantier-consulting.de/leistungen/${city.slug}`,
          },
        ],
      },
    ],
  }
}

interface Props {
  params: Promise<{ stadt: string }>
}

export async function generateStaticParams() {
  return getAllCitySlugs().map((stadt) => ({ stadt }))
}

export default async function StadtPage({ params }: Props) {
  const { stadt } = await params
  const city = getCityBySlug(stadt)

  if (!city) {
    notFound()
  }

  const jsonLd = generateCityJsonLd(city)
  const faqSchema = generateCityFAQSchema(city)

  return (
    <PageWrapper>
      {/* City-specific JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <StadtHero city={city} />
      <Suspense fallback={<div className="section-padding" />}>
        <StadtServices city={city} />
      </Suspense>
      <Suspense fallback={<div className="section-padding" />}>
        <Process />
      </Suspense>
      <Suspense fallback={<div className="section-padding" />}>
        <WhyUs />
      </Suspense>
      <Suspense fallback={<div className="section-padding" />}>
        <StadtFAQ city={city} />
      </Suspense>
      <Suspense fallback={<div className="section-padding" />}>
        <RelatedCities city={city} />
      </Suspense>
      <Suspense fallback={<div className="section-padding" />}>
        <CTA />
      </Suspense>
    </PageWrapper>
  )
}
