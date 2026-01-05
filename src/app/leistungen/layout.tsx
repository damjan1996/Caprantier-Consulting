import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'B2B Akquise Leistungen - Telefonakquise & Leadgenerierung',
  description:
    'Unsere B2B Akquise Leistungen: ✓ Professionelle Telefonakquise ✓ Qualifizierte Leadgenerierung ✓ Terminvereinbarung mit Entscheidern ✓ Sales Consulting. Für Agenturen & IT-Dienstleister in Köln, Düsseldorf, NRW und deutschlandweit.',
  keywords: [
    'B2B Akquise Leistungen',
    'Telefonakquise Service',
    'Leadgenerierung Agentur',
    'Terminvereinbarung B2B',
    'Kaltakquise Dienstleistung',
    'Sales Outsourcing',
    'Vertriebsunterstützung',
    'Akquise für Agenturen',
    'IT Dienstleister Akquise',
    'B2B Vertrieb Köln',
    'Leadgenerierung NRW',
  ],
  openGraph: {
    title: 'B2B Akquise Leistungen | Carpantier Consulting',
    description:
      'Professionelle B2B Telefonakquise, Leadgenerierung und Terminvereinbarung. Qualifizierte Termine mit Entscheidern für Ihren Vertriebserfolg.',
    url: 'https://carpantier-consulting.de/leistungen',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Carpantier Consulting Leistungen',
      },
    ],
  },
  alternates: {
    canonical: 'https://carpantier-consulting.de/leistungen',
  },
}

export default function LeistungenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
