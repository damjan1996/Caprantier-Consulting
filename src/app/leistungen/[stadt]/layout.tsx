import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCityBySlug, getCityKeywords, getAllCitySlugs } from '@/lib/cities'

interface Props {
  params: Promise<{ stadt: string }>
}

export async function generateStaticParams() {
  return getAllCitySlugs().map((stadt) => ({ stadt }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stadt } = await params
  const city = getCityBySlug(stadt)

  if (!city) {
    notFound()
  }

  const title = `B2B Telefonakquise & Leadgenerierung ${city.name} | Carpantier Consulting`
  const description = `Professionelle B2B Telefonakquise & Leadgenerierung in ${city.name}. ✓ Qualifizierte Termine mit Entscheidern ✓ Für Agenturen & IT-Dienstleister ${city.businessContext}. Jetzt Strategiegespräch buchen!`

  return {
    title,
    description,
    keywords: getCityKeywords(city),
    openGraph: {
      title,
      description,
      url: `https://carpantier-consulting.de/leistungen/${city.slug}`,
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `Carpantier Consulting - B2B Akquise ${city.name}`,
        },
      ],
    },
    alternates: {
      canonical: `https://carpantier-consulting.de/leistungen/${city.slug}`,
    },
    other: {
      'geo.region': `DE-${city.regionShort}`,
      'geo.placename': city.name,
      'geo.position': `${city.coordinates.latitude};${city.coordinates.longitude}`,
      ICBM: `${city.coordinates.latitude}, ${city.coordinates.longitude}`,
    },
  }
}

export default function StadtLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
