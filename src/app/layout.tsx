import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://carpantier-consulting.de'),
  title: {
    default: 'Carpantier Consulting | B2B Telefonakquise & Leadgenerierung',
    template: '%s | Carpantier Consulting'
  },
  description: 'Planbare Neukundengewinnung durch professionelle B2B-Telefonakquise. Wir liefern qualifizierte Termine mit Entscheidern direkt in Ihren Kalender.',
  keywords: ['B2B Akquise', 'Telefonakquise', 'Leadgenerierung', 'Neukundengewinnung', 'Kaltakquise', 'Sales Consulting', 'Terminierung', 'Vertrieb', 'Agentur Akquise', 'IT Dienstleister', 'Köln'],
  authors: [{ name: 'Carpantier Consulting' }],
  creator: 'Carpantier Consulting',
  publisher: 'Carpantier Consulting',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://carpantier-consulting.de',
    siteName: 'Carpantier Consulting',
    title: 'Carpantier Consulting | B2B Telefonakquise & Leadgenerierung',
    description: 'Planbare Neukundengewinnung durch professionelle B2B-Telefonakquise. Wir liefern qualifizierte Termine mit Entscheidern.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Carpantier Consulting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carpantier Consulting | B2B Telefonakquise',
    description: 'Planbare Neukundengewinnung durch professionelle B2B-Telefonakquise.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://carpantier-consulting.de',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0a0a0a" />
        {/* Calendly Widget CSS */}
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        {/* Calendly Widget Script */}
        <script
          src="https://assets.calendly.com/assets/external/widget.js"
          async
        />
      </body>
    </html>
  )
}
