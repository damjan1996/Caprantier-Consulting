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

  /*
   * Titel und Beschreibung besetzen bewusst andere Begriffe als
   * `/kaltakquise/[stadt]`: dort „Kaltakquise“ und „Telefonakquise“, hier
   * „Vertrieb“, „Vertriebsagentur“ und „Vertrieb auslagern“. Zwei Seiten
   * derselben Domain, die auf denselben Begriff optimiert sind, konkurrieren
   * miteinander statt mit dem Wettbewerb.
   *
   * Die frühere Beschreibung trug zwei Häkchen-Zeichen und ein Ausrufezeichen
   * und warb mit „Strategiegespräch“. Auf der ganzen Website steht kein
   * einziges Ausrufezeichen (Textleitfaden § 1), Häkchen im Snippet sind
   * Dekoration ohne Aussage, und das Gespräch heißt überall sonst
   * „Erstgespräch“.
   */
  const title = `Vertrieb ${city.name} | Vertriebsagentur & B2B-Akquise | Carpantier`
  const description = `Vertrieb auslagern in ${city.name}: Wir übernehmen Zielgruppe, Telefonakquise und Qualifizierung, das Verkaufsgespräch führen Sie. Qualifizierte Termine mit Entscheidern ${city.businessContext} – erste Termine in rund 14 Tagen.`

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
          alt: `Carpantier Consulting - Vertrieb & Vertriebsagentur ${city.name}`,
        },
      ],
    },
    alternates: {
      canonical: `https://carpantier-consulting.de/leistungen/${city.slug}`,
      languages: {
        'de-DE': `https://carpantier-consulting.de/leistungen/${city.slug}`,
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

export default function StadtLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
