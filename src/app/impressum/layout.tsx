import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
  description:
    'Impressum von Carpantier Consulting - B2B Telefonakquise & Leadgenerierung. Angaben gemäß § 5 TMG. Nico-Luca Carpantier, Köln.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
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
