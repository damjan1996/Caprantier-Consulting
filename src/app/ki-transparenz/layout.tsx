import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KI-Transparenz',
  description:
    'Transparenzangaben nach Art. 50 der KI-Verordnung (EU) 2024/1689: Wo auf carpantier-consulting.de künstliche Intelligenz eingesetzt wird — KI-generierte Bilder und KI-Chatbot.',
  robots: {
    index: true,
    follow: true,
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
