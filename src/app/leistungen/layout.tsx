import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'B2B Vertriebsdienstleister - Telefonakquise & Leadgenerierung',
  description:
    'Ihr B2B Vertriebsdienstleister für Telefonakquise & Leadgenerierung. Als Vertriebsagentur & B2B Sales Agentur übernehmen wir Ihren Vertrieb. ✓ Vertrieb auslagern ✓ Kaltakquise ✓ Terminvereinbarung. Für Agenturen & IT-Dienstleister deutschlandweit.',
  keywords: [
    'B2B Vertriebsdienstleister',
    'Vertriebsagentur Leistungen',
    'B2B Sales Agentur',
    'Telefonakquise Service',
    'Leadgenerierung Agentur',
    'Terminvereinbarung B2B',
    'Kaltakquise Dienstleistung',
    'Sales Outsourcing',
    'Vertrieb auslagern',
    'Vertriebsunterstützung',
    'Akquise für Agenturen',
    'IT Dienstleister Akquise',
    'B2B Vertrieb Köln',
    'Leadgenerierung NRW',
  ],
  openGraph: {
    title: 'B2B Vertriebsdienstleister - Telefonakquise & Leadgenerierung | Carpantier',
    description:
      'Ihr Vertriebsdienstleister für B2B Telefonakquise, Leadgenerierung und Terminvereinbarung. Vertrieb auslagern an Profis.',
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
