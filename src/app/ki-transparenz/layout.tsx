import { Metadata } from 'next'
import { OG_GRUNDWERTE } from '@/lib/open-graph'

export const metadata: Metadata = {
  title: 'KI-Transparenz',
  description:
    'Transparenzangaben nach Art. 50 der KI-Verordnung (EU) 2024/1689: Wo auf carpantier-consulting.de künstliche Intelligenz eingesetzt wird — KI-generierte Bilder und KI-gestützte Texte. Ein KI-Chatbot ist nicht im Einsatz.',
  robots: {
    index: true,
    follow: true,
  },
  /* Ohne eigenes `openGraph` erbte die Seite das der Startseite: Geteilt zeigte
     sie deren Titel, Beschreibung und Adresse (`og:url` = Startseite). */
  openGraph: {
    ...OG_GRUNDWERTE,
    title: 'KI-Transparenz | Carpantier Consulting',
    description:
      'Wo auf carpantier-consulting.de künstliche Intelligenz eingesetzt wird: KI-generierte Bilder und KI-gestützte Texte, nach Art. 50 KI-VO.',
    url: 'https://carpantier-consulting.de/ki-transparenz',
  },
  alternates: {
    canonical: 'https://carpantier-consulting.de/ki-transparenz',
  },
}

export default function KiTransparenzLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
