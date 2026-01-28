import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Providers } from '@/components/providers/Providers'
import { ClientSideComponents } from '@/components/layout/ClientComponents'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

// Relevante Keywords für Vertrieb, B2B Akquise, Leadgenerierung - optimiert für lokale Suche
const keywords = [
  // PRIMÄRE KEYWORDS: "Vertrieb + Stadt" (höchste Priorität für Rankings)
  'Vertrieb Köln',
  'Vertrieb Düsseldorf',
  'Vertrieb Bonn',
  'Vertrieb Essen',
  'Vertrieb Dortmund',
  'Vertrieb Frankfurt',
  'Vertrieb München',
  'Vertrieb Hamburg',
  'Vertrieb Berlin',
  'Vertrieb NRW',
  // Vertrieb-Varianten
  'Vertriebsagentur',
  'Vertrieb auslagern',
  'Vertriebsunterstützung',
  'Vertriebsoutsourcing',
  'Vertriebspartner',
  'Vertriebsberatung',
  'B2B Vertrieb',
  'Vertrieb outsourcen',
  // Sekundäre Keywords
  'B2B Akquise',
  'B2B Leadgenerierung',
  'Telefonakquise',
  'Kaltakquise Agentur',
  'Terminvereinbarung B2B',
  'Neukundengewinnung',
  'Sales Outsourcing',
  'Akquise Dienstleister',
  'Lead Generation',
  // Zielgruppen
  'Vertrieb für Agenturen',
  'Vertrieb für IT-Dienstleister',
  'Vertrieb für Beratungsunternehmen',
  'Vertrieb für Softwareunternehmen',
  // Städte + Vertriebsagentur
  'Vertriebsagentur Köln',
  'Vertriebsagentur Düsseldorf',
  'Vertriebsagentur Frankfurt',
  'Vertriebsagentur München',
  'Vertriebsagentur Hamburg',
  'Vertriebsagentur Berlin',
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
        width: 1200,
        height: 630,
        alt: 'Carpantier Consulting - B2B Telefonakquise & Leadgenerierung aus Köln',
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
        { '@type': 'City', name: 'Frankfurt' },
        { '@type': 'City', name: 'München' },
        { '@type': 'City', name: 'Hamburg' },
        { '@type': 'City', name: 'Berlin' },
        { '@type': 'City', name: 'Stuttgart' },
        { '@type': 'City', name: 'Hannover' },
        { '@type': 'City', name: 'Leipzig' },
        { '@type': 'City', name: 'Dresden' },
        { '@type': 'City', name: 'Nürnberg' },
        { '@type': 'City', name: 'Bremen' },
        { '@type': 'State', name: 'Nordrhein-Westfalen' },
        { '@type': 'State', name: 'Bayern' },
        { '@type': 'State', name: 'Baden-Württemberg' },
        { '@type': 'State', name: 'Hessen' },
        { '@type': 'State', name: 'Niedersachsen' },
        { '@type': 'State', name: 'Sachsen' },
        { '@type': 'Country', name: 'Deutschland' },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '12',
        bestRating: '5',
        worstRating: '1',
      },
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
              name: 'Vertriebsoutsourcing',
              description: 'Komplette Auslagerung Ihres B2B-Vertriebs an erfahrene Profis',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'SDR as a Service',
              description: 'Sales Development Representatives als externe Dienstleistung',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Terminqualifizierung',
              description: 'BANT-qualifizierte Termine mit echten Entscheidern',
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
        {/* Google Analytics - G-1JZ5EDZ26R */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1JZ5EDZ26R" />
        <script
          id="gtag-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1JZ5EDZ26R');
            `,
          }}
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Favicon - SVG für moderne Browser, PNG als Fallback */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="icon"
          type="image/png"
          href="/logo/Logo%20-%20Schwarz.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          href="/logo/Logo%20-%20Wei%C3%9F.png"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo/Logo%20-%20Schwarz.png" />

        {/* Theme Color */}
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Carpantier" />

      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          {/* Client-side Components (Chat Widget + Tracking) */}
          <ClientSideComponents />
        </Providers>
      </body>
    </html>
  )
}
