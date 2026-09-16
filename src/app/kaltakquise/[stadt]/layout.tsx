import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCityBySlug, getAllCitySlugs } from '@/lib/cities'
import { getCityAcquisition } from '@/lib/city-acquisition'
import { businessInfo } from '@/lib/local-seo'

interface Props {
  params: Promise<{ stadt: string }>
}

export async function generateStaticParams() {
  return getAllCitySlugs().map((stadt) => ({ stadt }))
}

/**
 * Metadaten der zweiten Stadt-Seitenfamilie.
 *
 * Titel und Beschreibung besetzen bewusst andere Begriffe als
 * `/leistungen/[stadt]`: dort "Vertrieb" und "Vertriebsagentur", hier
 * "Kaltakquise", "Telefonakquise" und "Terminvereinbarung". Zwei Seiten
 * derselben Domain, die auf denselben Begriff optimiert sind, konkurrieren
 * miteinander statt mit dem Wettbewerb.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stadt } = await params
  const city = getCityBySlug(stadt)
  const acquisition = city ? getCityAcquisition(city.slug) : undefined

  if (!city || !acquisition) {
    notFound()
  }

  const title = `Kaltakquise Agentur ${city.name} | B2B-Telefonakquise & Terminvereinbarung`
  const description = `Kaltakquise und Telefonakquise für B2B-Unternehmen in ${city.name}: Wir sprechen Entscheider in ${acquisition.leitbranchen.slice(0, 2).join(' und ')} an und vereinbaren qualifizierte Termine. Rechtssicher nach § 7 UWG, mit dokumentiertem Anlass je Kontakt.`
  const url = `${businessInfo.website}/kaltakquise/${city.slug}`

  return {
    title,
    description,
    keywords: [
      `Kaltakquise Agentur ${city.name}`,
      `Telefonakquise Agentur ${city.name}`,
      `Kaltakquise ${city.name}`,
      `Telefonakquise ${city.name}`,
      `B2B Terminvereinbarung ${city.name}`,
      `Terminvereinbarung Agentur ${city.name}`,
      `Neukundengewinnung ${city.name}`,
      `Akquise Agentur ${city.name}`,
      `Kaltakquise ${city.regionShort}`,
      `B2B Telefonakquise ${city.region}`,
    ],
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `Carpantier Consulting – Kaltakquise Agentur ${city.name}`,
        },
      ],
    },
    alternates: {
      canonical: url,
      languages: {
        'de-DE': url,
      },
    },
    other: {
      'geo.region': `DE-${city.regionShort}`,
      'geo.placename': city.name,
      'geo.position': `${city.coordinates.latitude};${city.coordinates.longitude}`,
      ICBM: `${city.coordinates.latitude}, ${city.coordinates.longitude}`,
    },
  }
}

export default function KaltakquiseLayout({ children }: { children: React.ReactNode }) {
  return children
}
