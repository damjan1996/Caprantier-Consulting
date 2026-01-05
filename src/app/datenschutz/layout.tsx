import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description:
    'Datenschutzerklärung von Carpantier Consulting. Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Datenschutzerklärung | Carpantier Consulting',
    description: 'Informationen zum Datenschutz bei Carpantier Consulting.',
    url: 'https://carpantier-consulting.de/datenschutz',
  },
  alternates: {
    canonical: 'https://carpantier-consulting.de/datenschutz',
  },
}

export default function DatenschutzLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
