import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt | Vertriebsagentur für B2B Vertrieb - Strategiegespräch buchen',
  description:
    'Kontaktieren Sie Ihre B2B Vertriebsagentur für ein kostenloses Strategiegespräch. ✓ Vertriebsdienstleister Köln ✓ Vertrieb auslagern ✓ Leadgenerierung. Jetzt unverbindlich Termin vereinbaren!',
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
