import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über uns - Ihre B2B Vertriebsagentur aus Köln',
  description:
    'Lernen Sie Carpantier Consulting kennen: Ihre B2B Vertriebsagentur & Vertriebsdienstleister aus Köln. ✓ Erfahrene Vertriebsexperten ✓ Persönliche Betreuung ✓ Messbare Ergebnisse bei Leadgenerierung & Kaltakquise.',
  keywords: [
    'Carpantier Consulting',
    'B2B Vertriebsagentur Köln',
    'Vertriebsdienstleister Köln',
    'Telefonakquise Experten',
    'Leadgenerierung Köln',
    'Nico Carpantier',
    'Vertriebsagentur NRW',
    'B2B Sales Agentur',
    'Vertrieb Experten',
    'B2B Vertrieb Experten',
    'Kaltakquise Profis',
  ],
  openGraph: {
    title: 'Über uns - Ihre B2B Vertriebsagentur aus Köln | Carpantier',
    description:
      'Ihre B2B Vertriebsagentur & Vertriebsdienstleister aus Köln. Erfahrene Experten für planbare Neukundengewinnung.',
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
