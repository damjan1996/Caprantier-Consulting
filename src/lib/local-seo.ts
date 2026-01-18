/**
 * Local SEO Data - Konsistente NAP (Name, Address, Phone) Daten
 * Diese Daten sollten überall identisch verwendet werden für beste Local SEO Ergebnisse.
 */

export const businessInfo = {
  // NAP - Name, Address, Phone (muss überall identisch sein!)
  name: 'Carpantier Consulting',
  legalName: 'Carpantier Consulting',

  // Adresse
  address: {
    street: 'Stammheimer Straße 123',
    city: 'Köln',
    postalCode: '50735',
    region: 'Nordrhein-Westfalen',
    regionCode: 'NW',
    country: 'Deutschland',
    countryCode: 'DE',
  },

  // Kontakt
  phone: '+49 157 38186221',
  phoneFormatted: '+49 (0) 157 38186221',
  phoneInternational: '+4915738186221',
  email: 'nico@carpantier-consulting.de',
  emailGeneral: 'info@carpantier-consulting.de',

  // Web
  website: 'https://carpantier-consulting.de',

  // Geo-Koordinaten
  geo: {
    latitude: 50.9375,
    longitude: 6.9603,
  },

  // Geschäftszeiten
  openingHours: {
    monday: '09:00-18:00',
    tuesday: '09:00-18:00',
    wednesday: '09:00-18:00',
    thursday: '09:00-18:00',
    friday: '09:00-18:00',
    saturday: 'closed',
    sunday: 'closed',
  },

  // Geschäftsdetails
  businessType: 'Vertriebsagentur',
  description: 'Professionelle B2B Telefonakquise & Leadgenerierung aus Köln. Wir liefern qualifizierte Termine mit Entscheidern für Agenturen, IT-Dienstleister und Beratungsunternehmen.',
  shortDescription: 'B2B Vertriebsagentur für Telefonakquise & Leadgenerierung',

  // Inhaber
  owner: {
    name: 'Nico-Luca Carpantier',
    title: 'Geschäftsführer',
    email: 'nico@carpantier-consulting.de',
  },

  // Social Media
  social: {
    linkedin: 'https://www.linkedin.com/company/carpantier-consulting',
    // Weitere Kanäle hier hinzufügen wenn vorhanden
  },

  // Kategorien (für Verzeichnisse)
  categories: [
    'Vertriebsagentur',
    'B2B Marketing',
    'Unternehmensberatung',
    'Telemarketing',
    'Leadgenerierung',
    'Vertriebsberatung',
  ],

  // Keywords für Verzeichnisse
  keywords: [
    'B2B Vertrieb',
    'Telefonakquise',
    'Leadgenerierung',
    'Kaltakquise',
    'Vertriebsoutsourcing',
    'Terminvereinbarung',
    'SDR as a Service',
  ],

  // Service-Bereich
  serviceAreas: [
    'Köln',
    'Düsseldorf',
    'Bonn',
    'Essen',
    'Dortmund',
    'Frankfurt am Main',
    'München',
    'Hamburg',
    'Berlin',
    'Stuttgart',
    'Hannover',
    'Leipzig',
    'Dresden',
    'Nürnberg',
    'Bremen',
    'Nordrhein-Westfalen',
    'Deutschland',
  ],
}

/**
 * Lokale Verzeichnisse für Eintragungen
 * Status: 'pending' | 'submitted' | 'verified'
 */
export const localDirectories = [
  {
    name: 'Google Business Profile',
    url: 'https://business.google.com',
    priority: 'high',
    status: 'pending' as const,
    notes: 'Wichtigster Eintrag für Local SEO. Google Maps Integration.',
  },
  {
    name: 'Bing Places',
    url: 'https://www.bingplaces.com',
    priority: 'high',
    status: 'pending' as const,
    notes: 'Microsoft/Bing Suchergebnisse.',
  },
  {
    name: 'Apple Maps Connect',
    url: 'https://mapsconnect.apple.com',
    priority: 'medium',
    status: 'pending' as const,
    notes: 'Apple Maps für iPhone Nutzer.',
  },
  {
    name: 'Das Telefonbuch',
    url: 'https://www.dastelefonbuch.de',
    priority: 'high',
    status: 'pending' as const,
    notes: 'Größtes deutsches Branchenverzeichnis.',
  },
  {
    name: 'Gelbe Seiten',
    url: 'https://www.gelbeseiten.de',
    priority: 'high',
    status: 'pending' as const,
    notes: 'Bekanntes deutsches Branchenverzeichnis.',
  },
  {
    name: 'GoYellow',
    url: 'https://www.goyellow.de',
    priority: 'medium',
    status: 'pending' as const,
    notes: 'Deutsches Branchenverzeichnis.',
  },
  {
    name: '11880.com',
    url: 'https://www.11880.com',
    priority: 'medium',
    status: 'pending' as const,
    notes: 'Telefonauskunft und Branchenverzeichnis.',
  },
  {
    name: 'Yelp',
    url: 'https://biz.yelp.de',
    priority: 'medium',
    status: 'pending' as const,
    notes: 'Bewertungsplattform, relevant für Vertrauen.',
  },
  {
    name: 'Trustpilot',
    url: 'https://business.trustpilot.com',
    priority: 'medium',
    status: 'pending' as const,
    notes: 'Bewertungsplattform, wichtig für Trust-Signale.',
  },
  {
    name: 'LinkedIn Unternehmensseite',
    url: 'https://www.linkedin.com/company/setup/new/',
    priority: 'high',
    status: 'pending' as const,
    notes: 'B2B Social Media, wichtig für Glaubwürdigkeit.',
  },
  {
    name: 'XING Unternehmensseite',
    url: 'https://www.xing.com/companies',
    priority: 'medium',
    status: 'pending' as const,
    notes: 'Deutsches B2B Netzwerk.',
  },
  {
    name: 'Hotfrog',
    url: 'https://www.hotfrog.de',
    priority: 'low',
    status: 'pending' as const,
    notes: 'Internationales Branchenverzeichnis.',
  },
  {
    name: 'Cylex',
    url: 'https://www.cylex.de',
    priority: 'low',
    status: 'pending' as const,
    notes: 'Deutsches Branchenverzeichnis.',
  },
  {
    name: 'WLW (Wer liefert was)',
    url: 'https://www.wlw.de',
    priority: 'medium',
    status: 'pending' as const,
    notes: 'B2B-Plattform für Dienstleister.',
  },
  {
    name: 'Kompass',
    url: 'https://de.kompass.com',
    priority: 'low',
    status: 'pending' as const,
    notes: 'B2B-Verzeichnis.',
  },
]

/**
 * Generiert den vollständigen NAP-String für Verzeichnisse
 */
export function getFullNAP(): string {
  return `${businessInfo.name}
${businessInfo.address.street}
${businessInfo.address.postalCode} ${businessInfo.address.city}
${businessInfo.phone}
${businessInfo.website}`
}

/**
 * Generiert Schema.org LocalBusiness Daten
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${businessInfo.website}/#organization`,
    name: businessInfo.name,
    description: businessInfo.description,
    url: businessInfo.website,
    telephone: businessInfo.phoneInternational,
    email: businessInfo.emailGeneral,
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
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: Object.values(businessInfo.social),
    areaServed: businessInfo.serviceAreas.map((area) => ({
      '@type': area.includes('Deutschland') ? 'Country' : area.includes('Nordrhein') ? 'State' : 'City',
      name: area,
    })),
  }
}
