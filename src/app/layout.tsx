import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Providers } from '@/components/providers/Providers'
import Script from 'next/script'

// Dynamic import for TrackingScripts - load after page is interactive
const TrackingScripts = dynamic(
  () => import('@/components/tracking/TrackingScripts'),
  { ssr: false }
)

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

// Relevante Keywords für B2B Akquise, Leadgenerierung, Städte
const keywords = [
  // Hauptkeywords
  'B2B Akquise',
  'B2B Leadgenerierung',
  'Telefonakquise',
  'Kaltakquise Agentur',
  'Terminvereinbarung B2B',
  'Neukundengewinnung',
  'Sales Outsourcing',
  'Vertriebsagentur',
  'Akquise Dienstleister',
  'Lead Generation',
  // Zielgruppen
  'Akquise für Agenturen',
  'Akquise für IT-Dienstleister',
  'Akquise für Beratungsunternehmen',
  'Akquise für Softwareunternehmen',
  // Städte NRW
  'Akquise Köln',
  'Leadgenerierung Köln',
  'Telefonakquise Köln',
  'Vertriebsagentur Köln',
  'B2B Akquise Düsseldorf',
  'Leadgenerierung Düsseldorf',
  'B2B Akquise Bonn',
  'Akquise NRW',
  'Vertrieb Nordrhein-Westfalen',
  // Weitere Städte
  'B2B Akquise Essen',
  'Leadgenerierung Dortmund',
  'Telefonakquise Frankfurt',
  'Akquise München',
  'Vertriebsagentur Hamburg',
  'B2B Leads Deutschland',
  // Long-tail Keywords
  'qualifizierte Termine B2B',
  'Entscheider Termine',
  'planbare Kundengewinnung',
  'professionelle Kaltakquise',
  'outbound Sales',
  'SDR as a Service',
]

export const metadata: Metadata = {
  metadataBase: new URL('https://carpantier-consulting.de'),
  title: {
    default: 'B2B Telefonakquise & Leadgenerierung Köln | Carpantier Consulting',
    template: '%s | Carpantier Consulting',
  },
  description:
    'Professionelle B2B Telefonakquise & Leadgenerierung aus Köln. Wir liefern qualifizierte Termine mit Entscheidern direkt in Ihren Kalender. ✓ Für Agenturen ✓ IT-Dienstleister ✓ Beratungen. Jetzt kostenloses Strategiegespräch buchen!',
  keywords: keywords,
  authors: [{ name: 'Nico-Luca Carpantier', url: 'https://carpantier-consulting.de' }],
  creator: 'Carpantier Consulting',
  publisher: 'Carpantier Consulting',
  category: 'Business Services',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
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
    title: 'B2B Telefonakquise & Leadgenerierung Köln | Carpantier Consulting',
    description:
      'Professionelle B2B Telefonakquise & Leadgenerierung aus Köln. Qualifizierte Termine mit Entscheidern für Agenturen, IT-Dienstleister & Beratungen.',
    images: [
      {
        url: 'https://carpantier-consulting.de/images/og-image.jpg',
        width: 1024,
        height: 1024,
        alt: 'Nico-Luca Carpantier - B2B Telefonakquise & Leadgenerierung',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B Telefonakquise & Leadgenerierung | Carpantier Consulting',
    description:
      'Planbare Neukundengewinnung durch professionelle B2B-Telefonakquise aus Köln.',
    images: ['https://carpantier-consulting.de/images/og-image.jpg'],
    creator: '@carpantier',
  },
  alternates: {
    canonical: 'https://carpantier-consulting.de',
    languages: {
      'de-DE': 'https://carpantier-consulting.de',
    },
  },
  verification: {
    google: 'your-google-verification-code', // TODO: Add actual verification code
  },
  other: {
    'geo.region': 'DE-NW',
    'geo.placename': 'Köln',
    'geo.position': '50.9375;6.9603',
    ICBM: '50.9375, 6.9603',
  },
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://carpantier-consulting.de/#organization',
      name: 'Carpantier Consulting',
      alternateName: 'Carpantier Consulting - B2B Akquise',
      description:
        'Professionelle B2B Telefonakquise & Leadgenerierung. Wir liefern qualifizierte Termine mit Entscheidern für Agenturen, IT-Dienstleister und Beratungsunternehmen.',
      url: 'https://carpantier-consulting.de',
      logo: 'https://carpantier-consulting.de/logo/Logo%20-%20Schwarz.png',
      image: 'https://carpantier-consulting.de/images/nico-portrait.png',
      telephone: '+4915738186221',
      email: 'nico@carpantier-consulting.de',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Stammheimer Straße 123',
        addressLocality: 'Köln',
        postalCode: '50935',
        addressRegion: 'Nordrhein-Westfalen',
        addressCountry: 'DE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 50.9375,
        longitude: 6.9603,
      },
      areaServed: [
        { '@type': 'City', name: 'Köln' },
        { '@type': 'City', name: 'Düsseldorf' },
        { '@type': 'City', name: 'Bonn' },
        { '@type': 'City', name: 'Essen' },
        { '@type': 'City', name: 'Dortmund' },
        { '@type': 'City', name: 'Frankfurt am Main' },
        { '@type': 'City', name: 'München' },
        { '@type': 'City', name: 'Hamburg' },
        { '@type': 'City', name: 'Berlin' },
        { '@type': 'State', name: 'Nordrhein-Westfalen' },
        { '@type': 'Country', name: 'Deutschland' },
      ],
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      priceRange: '€€€',
      sameAs: [
        'https://www.linkedin.com/company/carpantier-consulting',
      ],
      founder: {
        '@type': 'Person',
        name: 'Nico-Luca Carpantier',
        jobTitle: 'Geschäftsführer',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://carpantier-consulting.de/#website',
      url: 'https://carpantier-consulting.de',
      name: 'Carpantier Consulting',
      description: 'B2B Telefonakquise & Leadgenerierung aus Köln',
      publisher: {
        '@id': 'https://carpantier-consulting.de/#organization',
      },
      inLanguage: 'de-DE',
    },
    {
      '@type': 'Service',
      '@id': 'https://carpantier-consulting.de/#service',
      serviceType: 'B2B Telefonakquise',
      name: 'B2B Leadgenerierung & Terminvereinbarung',
      description:
        'Professionelle Kaltakquise und Leadgenerierung für B2B-Unternehmen. Wir vereinbaren qualifizierte Termine mit Entscheidern.',
      provider: {
        '@id': 'https://carpantier-consulting.de/#organization',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Deutschland',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'B2B Akquise Dienstleistungen',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'B2B Telefonakquise',
              description: 'Professionelle Kaltakquise zur Terminvereinbarung mit Entscheidern',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Leadgenerierung',
              description: 'Qualifizierte B2B Leads für Ihr Vertriebsteam',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Sales Consulting',
              description: 'Strategische Beratung zur Optimierung Ihres Vertriebs',
            },
          },
        ],
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="dark">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Favicon */}
        <link
          rel="icon"
          href="/logo/Logo%20-%20Schwarz.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/logo/Logo%20-%20Wei%C3%9F.png"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="icon" href="/logo/Logo%20-%20Schwarz.png" />
        <link rel="apple-touch-icon" href="/logo/Logo%20-%20Schwarz.png" />

        {/* Theme Color */}
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Carpantier" />

        {/* Preconnect für externe Ressourcen */}
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />

        {/* Calendly Widget CSS - mit preload für Performance */}
        <link
          rel="preload"
          href="https://assets.calendly.com/assets/external/widget.css"
          as="style"
        />
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>

        {/* Calendly Widget Script - async für Performance */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />

        {/* Tracking Scripts - werden nur bei Cookie-Einwilligung geladen */}
        <TrackingScripts />
      </body>
    </html>
  )
}
