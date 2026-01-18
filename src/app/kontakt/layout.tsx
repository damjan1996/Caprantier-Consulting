import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt | Vertrieb auslagern - Kostenloses Strategiegespräch',
  description:
    'Vertrieb auslagern leicht gemacht: Kontaktieren Sie Carpantier Consulting für Ihr kostenloses Strategiegespräch. ✓ Vertriebsagentur Köln ✓ B2B Akquise ✓ Leadgenerierung. Jetzt Termin vereinbaren!',
  keywords: [
    'Vertrieb auslagern Kontakt',
    'Vertriebsagentur Köln Kontakt',
    'Vertriebsberatung Strategiegespräch',
    'B2B Vertrieb Beratung',
    'Vertriebsoutsourcing anfragen',
    'Kontakt Carpantier Consulting',
    'Strategiegespräch B2B Akquise',
    'Beratung Leadgenerierung',
    'Termin buchen Telefonakquise',
    'B2B Akquise Köln Kontakt',
    'Vertriebsberatung anfragen',
    'Sales Consulting Termin',
    'Akquise Beratung NRW',
    'Kaltakquise Agentur Anfrage',
  ],
  openGraph: {
    title: 'Kontakt | Carpantier Consulting',
    description:
      'Buchen Sie Ihr kostenloses Strategiegespräch für planbare Neukundengewinnung. Unverbindlich und persönlich.',
    url: 'https://carpantier-consulting.de/kontakt',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Carpantier Consulting Kontakt',
      },
    ],
  },
  alternates: {
    canonical: 'https://carpantier-consulting.de/kontakt',
  },
}

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
