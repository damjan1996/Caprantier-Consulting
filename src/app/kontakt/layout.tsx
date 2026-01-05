import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt - Kostenloses Strategiegespräch buchen',
  description:
    'Kontaktieren Sie Carpantier Consulting für Ihr kostenloses Strategiegespräch. ✓ Unverbindliche Beratung ✓ Persönlicher Ansprechpartner ✓ Köln & deutschlandweit. Jetzt Termin vereinbaren!',
  keywords: [
    'Kontakt Carpantier Consulting',
    'Strategiegespräch B2B Akquise',
    'Beratung Leadgenerierung',
    'Termin buchen Telefonakquise',
    'B2B Akquise Köln Kontakt',
    'Vertriebsberatung anfragen',
    'Sales Consulting Termin',
    'Akquise Beratung NRW',
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
