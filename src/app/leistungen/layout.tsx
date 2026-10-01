import { Metadata } from 'next'
import { OG_GRUNDWERTE } from '@/lib/open-graph'

/*
 * „Vertrieb auslagern“ ist der Kaufbegriff dieser Seite; die Stadtseiten
 * darunter tragen „Vertriebsagentur <Stadt>“, der Fachbeitrag
 * `/blog/vertrieb-auslagern-kosten-vorteile` die Kostenfrage. Die frühere
 * Beschreibung trug drei Häkchen-Zeichen und kam auf 247 Zeichen — Google
 * zeigt rund 155.
 */
export const metadata: Metadata = {
  title: 'Vertrieb auslagern: B2B-Telefonakquise',
  description:
    'Vertrieb auslagern, ohne den Abschluss abzugeben: Zielgruppe, Telefonakquise, Terminqualifizierung und Wochenbericht. Erste Termine in rund 14 Tagen.',
  openGraph: {
    ...OG_GRUNDWERTE,
    title: 'Vertrieb auslagern: B2B-Telefonakquise | Carpantier Consulting',
    description:
      'Zielgruppe, Telefonakquise, Terminqualifizierung und Wochenbericht – das Verkaufsgespräch führen Sie selbst.',
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
