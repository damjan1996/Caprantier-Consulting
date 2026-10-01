import { Metadata } from 'next'
import { OG_GRUNDWERTE } from '@/lib/open-graph'

export const metadata: Metadata = {
  title: 'Impressum',
  description:
    'Impressum von Carpantier Consulting - B2B Telefonakquise & Leadgenerierung. Angaben gemäß § 5 DDG. Nico-Luca Carpantier, Köln.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    ...OG_GRUNDWERTE,
    title: 'Impressum | Carpantier Consulting',
    description: 'Rechtliche Informationen und Kontaktdaten von Carpantier Consulting.',
    url: 'https://carpantier-consulting.de/impressum',
  },
  alternates: {
    canonical: 'https://carpantier-consulting.de/impressum',
  },
}

export default function ImpressumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
