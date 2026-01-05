import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über uns - B2B Akquise Experten aus Köln',
  description:
    'Lernen Sie Carpantier Consulting kennen: Ihr Partner für professionelle B2B Telefonakquise & Leadgenerierung aus Köln. ✓ Erfahrene Akquise-Experten ✓ Persönliche Betreuung ✓ Messbare Ergebnisse.',
  keywords: [
    'Carpantier Consulting',
    'B2B Akquise Agentur Köln',
    'Telefonakquise Experten',
    'Leadgenerierung Köln',
    'Nico Carpantier',
    'Vertriebsagentur NRW',
    'Sales Consulting Team',
    'Akquise Spezialisten',
    'B2B Vertrieb Experten',
    'Kaltakquise Profis',
  ],
  openGraph: {
    title: 'Über uns | Carpantier Consulting',
    description:
      'Ihr Partner für professionelle B2B Telefonakquise & Leadgenerierung aus Köln. Erfahrene Experten für planbare Neukundengewinnung.',
    url: 'https://carpantier-consulting.de/ueber-uns',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Carpantier Consulting Team',
      },
    ],
  },
  alternates: {
    canonical: 'https://carpantier-consulting.de/ueber-uns',
  },
}

export default function UeberUnsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
