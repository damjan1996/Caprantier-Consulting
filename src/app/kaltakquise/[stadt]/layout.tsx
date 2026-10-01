import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCityBySlug, getAllCitySlugs } from '@/content/cities'
import { getCityAcquisition } from '@/content/city-acquisition'
import { businessInfo } from '@/content/local-seo'
import { OG_GRUNDWERTE } from '@/lib/open-graph'

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
 *
 * Gemessen am 10.09.2026: `kaltakquise agentur köln` #6, `telefonakquise
 * agentur köln` #8. Beide Begriffe stehen deshalb im Titel, der mit dem kurzen
 * Firmennamen unter 65 Zeichen bleibt (die Vorlage aus `layout.tsx` brachte
 * ihn auf 90–96). Die Beschreibung nennt die erste Leitbranche als Nachsatz:
 * Zwei mit „und“ verbunden ergaben „Software und IT und Logistik“, und im Satz
 * („Entscheider aus …“) fehlte je nach Branche der Artikel.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stadt } = await params
  const city = getCityBySlug(stadt)
  const acquisition = city ? getCityAcquisition(city.slug) : undefined

  if (!city || !acquisition) {
    notFound()
  }

  const title = `Kaltakquise Agentur ${city.name} – Telefonakquise | Carpantier`
  const description = `Kaltakquise in ${city.name}: Termine mit Entscheidern, telefonisch nach § 7 UWG und mit dokumentiertem Anlass je Kontakt. Leitbranche: ${acquisition.leitbranchen[0]}.`
  const url = `${businessInfo.website}/kaltakquise/${city.slug}`

  return {
    title: { absolute: title },
    description,
    openGraph: {
      ...OG_GRUNDWERTE,
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
