import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCityBySlug, getAllCitySlugs } from '@/content/cities'
import { OG_GRUNDWERTE } from '@/lib/open-graph'

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
   *
   * Seit dem 01.10.2026 steht der Suchbegriff, für den diese Familie rankt
   * (`vertriebsagentur <stadt>`, am 10.09.2026 Frankfurt #2, Düsseldorf #4,
   * Köln #7), wortgleich am Anfang des Titels — vorher stand dort „Vertrieb
   * <Stadt>“. `absolute` mit dem kurzen Firmennamen, weil die Vorlage aus
   * `layout.tsx` mit „Carpantier Consulting“ das Zielband von 65 Zeichen
   * sprengt. Die Beschreibung bleibt unter 160 Zeichen, auch für Düsseldorf.
   */
  const title = `Vertriebsagentur ${city.name}: Vertrieb auslagern | Carpantier`
  const description = `Vertrieb auslagern in ${city.name}: Telefonakquise und Terminqualifizierung ${city.businessContext} – das Verkaufsgespräch führen Sie selbst.`

  return {
    title: { absolute: title },
    description,
    openGraph: {
      ...OG_GRUNDWERTE,
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
