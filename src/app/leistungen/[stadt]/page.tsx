import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { PageWrapper } from '@/components/ui'
import { getCityBySlug, getAllCitySlugs, type City } from '@/lib/cities'
import StadtHero from './components/StadtHero'
import StadtServices from './components/StadtServices'
import StadtFAQ, { generateCityFAQSchema } from './components/StadtFAQ'
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
        alternateName: `Carpantier Consulting - B2B Akquise ${city.name}`,
        description: `Professionelle B2B Telefonakquise & Leadgenerierung in ${city.name}. Wir liefern qualifizierte Termine mit Entscheidern für Agenturen, IT-Dienstleister und Beratungsunternehmen ${city.businessContext}.`,
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
        serviceType: 'B2B Telefonakquise',
        name: `B2B Leadgenerierung & Terminvereinbarung in ${city.name}`,
        description: `Professionelle Kaltakquise und Leadgenerierung für B2B-Unternehmen in ${city.name}. Wir vereinbaren qualifizierte Termine mit Entscheidern ${city.businessContext}.`,
        provider: {
          '@id': `https://carpantier-consulting.de/leistungen/${city.slug}#organization`,
        },
        areaServed: {
          '@type': 'City',
          name: city.name,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `B2B Akquise Dienstleistungen ${city.name}`,
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: `B2B Telefonakquise ${city.name}`,
                description: `Professionelle Kaltakquise zur Terminvereinbarung mit Entscheidern in ${city.name}`,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: `Leadgenerierung ${city.name}`,
                description: `Qualifizierte B2B Leads für Ihr Vertriebsteam in ${city.name}`,
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
