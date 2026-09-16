import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Providers } from '@/components/providers/Providers'
import { ClientSideComponents } from '@/components/layout/ClientComponents'
import { businessInfo } from '@/lib/local-seo'

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
  'B2B Sales Agentur',
  'Vertriebsdienstleister',
  'Vertriebsdienstleister Köln',
  'Vertriebsdienstleister NRW',
  'Sales Agentur Deutschland',
  'B2B Vertriebsagentur',
  'Vertriebsagentur Deutschland',
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
  // Die Vorlage haengt den Firmennamen an jeden Seitentitel an. Seitentitel
  // duerfen ihn deshalb nicht selbst mitbringen, sonst steht er doppelt im
  // Browser-Tab und in den Suchergebnissen.
  title: {
    default: 'Vertriebsagentur für B2B Vertrieb & Leadgenerierung | Carpantier Consulting',
    template: '%s | Carpantier Consulting',
  },
  description:
    'Ihre Vertriebsagentur für B2B Vertrieb & Leadgenerierung aus Köln. Als erfahrener Vertriebsdienstleister & Sales Agentur liefern wir qualifizierte Termine durch professionelle Kaltakquise. ✓ Vertrieb auslagern ✓ Telefonakquise ✓ Jetzt Strategiegespräch buchen!',
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
    title: 'Vertriebsagentur für B2B Vertrieb & Leadgenerierung | Carpantier Consulting',
    description:
      'Ihre Vertriebsagentur für B2B Vertrieb & Leadgenerierung aus Köln. Vertriebsdienstleister für qualifizierte Termine mit Entscheidern.',
    images: [
      {
        url: 'https://carpantier-consulting.de/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Carpantier Consulting - B2B Vertriebsagentur für Leadgenerierung aus Köln',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vertriebsagentur für B2B Vertrieb & Leadgenerierung | Carpantier Consulting',
    description:
      'Ihre B2B Vertriebsagentur für planbare Neukundengewinnung. Vertriebsdienstleister aus Köln.',
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
    google: 'google657f39b03f350aac',
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
      alternateName: 'Carpantier Consulting - B2B Vertriebsagentur',
      description:
        'Vertriebsagentur & Vertriebsdienstleister für B2B Vertrieb, Telefonakquise & Leadgenerierung. Wir liefern qualifizierte Termine mit Entscheidern für Agenturen, IT-Dienstleister und Beratungsunternehmen.',
      url: 'https://carpantier-consulting.de',
      logo: {
        '@type': 'ImageObject',
        url: 'https://carpantier-consulting.de/logo/Logo%20-%20Schwarz.png',
        width: 512,
        height: 512,
      },
      // Nur Bilder, die ihre KI-Herkunft selbst mitbringen: og-image.jpg trägt
      // den Hinweis im Bild, das Logo ist keine Aufnahme. Ein unbeschriftetes
      // KI-Porträt hier würde in Rich Results als Foto des Unternehmens
      // erscheinen, ohne dass der Hinweis mitgeliefert wird (Art. 50 KI-VO).
      image: [
        'https://carpantier-consulting.de/images/og-image.jpg',
        'https://carpantier-consulting.de/logo/Logo%20-%20Schwarz.png',
      ],
      // NAP-Daten ausschliesslich aus `businessInfo`. Abweichende Schreibweisen
      // an mehreren Stellen schwaechen jedes lokale Signal, und im JSON-LD
      // faellt der Unterschied niemandem auf, der die Seite ansieht.
      telephone: businessInfo.phoneInternational,
      email: businessInfo.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: businessInfo.address.street,
        addressLocality: businessInfo.address.city,
        postalCode: businessInfo.address.postalCode,
        addressRegion: businessInfo.address.region,
        addressCountry: businessInfo.address.countryCode,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: businessInfo.geo.latitude,
        longitude: businessInfo.geo.longitude,
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
      // Bewusst kein aggregateRating: Die frueher hier gesetzten 5,0 Sterne aus
      // 12 Bewertungen waren frei erfunden. Erfundene Bewertungsdaten sind eine
      // irrefuehrende geschaeftliche Handlung (§ 5 UWG) und verstossen zugleich
      // gegen die Richtlinien fuer strukturierte Daten. Google wertet
      // aggregateRating bei LocalBusiness ohnehin nur fuer Seiten aus, die
      // Bewertungen ueber andere Unternehmen sammeln.
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
      description: 'Vertriebsagentur für B2B Vertrieb & Leadgenerierung aus Köln',
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
              description: 'Qualifizierte Termine mit echten Entscheidern',
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
        {/* Google Analytics mit Consent Mode v2 - DSGVO-konform */}
        {/* Consent-Defaults setzen — rein lokal, kein Netzwerk-Request */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              // Consent Mode v2: Standardmäßig alles verweigert (DSGVO-konform)
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'wait_for_update': 500
              });

              // Prüfe gespeicherten Consent und aktualisiere sofort
              try {
                var stored = localStorage.getItem('cookie-consent');
                if (stored) {
                  var parsed = JSON.parse(stored);
                  if (parsed.consent) {
                    gtag('consent', 'update', {
                      'analytics_storage': parsed.consent.analytics ? 'granted' : 'denied',
                      'ad_storage': parsed.consent.marketing ? 'granted' : 'denied',
                      'ad_user_data': parsed.consent.marketing ? 'granted' : 'denied',
                      'ad_personalization': parsed.consent.marketing ? 'granted' : 'denied'
                    });
                  }
                }
              } catch(e) {}
            `,
          }}
        />
        {/*
          gtag.js selbst wird NICHT hier geladen. Der Request an googletagmanager.com
          würde die IP-Adresse des Besuchers vor jeder Einwilligung an Google übertragen
          (§ 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a DSGVO). Das Laden und Konfigurieren
          übernimmt TrackingScripts erst nach erteilter Analyse-Einwilligung
          (Google Consent Mode "basic").
        */}

        {/*
          Bewusst keine Verbindungshinweise auf Fremdhosts.

          Hier standen dns-prefetch-Angaben für Calendly. Der Browser löst die
          Namen dann schon beim Seitenaufruf auf — also bevor der Besucher der
          Einbindung zugestimmt hat. Das widerspricht der Zusage in der
          Datenschutzerklärung, dass bis zur Zustimmung keine Verbindung zu
          Calendly aufgebaut wird.

          Schriften brauchen ohnehin keinen Hinweis: next/font liefert Inter
          beim Build lokal aus.
        */}

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

        {/*
          Ohne JavaScript bleiben alle FadeIn-Container auf opacity:0 stehen —
          Impressum und Datenschutzerklärung wären dann zwar im HTML vorhanden,
          aber für Besucher unsichtbar. § 5 DDG verlangt „leicht erkennbar“,
          Art. 12 Abs. 1 DSGVO „leicht zugänglich“. Deshalb blenden wir die
          Einblende-Animation ohne JavaScript vollständig aus.
        */}
        <noscript>
          <style>{`[data-fade-in]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

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
