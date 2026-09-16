/**
 * Local SEO Data - Konsistente NAP (Name, Address, Phone) Daten
 * Diese Daten sollten überall identisch verwendet werden für beste Local SEO Ergebnisse.
 */

export const businessInfo = {
  // NAP - Name, Address, Phone (muss überall identisch sein!)
  name: 'Carpantier Consulting',
  legalName: 'Carpantier Consulting',

  // Adresse
  //
  // Die Postleitzahl stand hier bis zum 10.09.2026 auf 50735, während
  // Impressum, Datenschutzerklärung und das Organisations-JSON-LD im Root-
  // Layout durchgehend 50935 nannten. Maßgeblich ist die Angabe im Impressum:
  // Sie ist die rechtlich verbindliche Anbieterkennzeichnung nach § 5 DDG.
  //
  // ACHTUNG, ungeprüft: Ob "Stammheimer Straße 123" tatsächlich in 50935 liegt,
  // ist nicht verifiziert. Eine falsche Postleitzahl im Impressum ist
  // abmahnfähig, und Google lehnt die Verifizierung eines Business Profiles ab,
  // wenn die Adresse nicht zustellbar ist. Siehe docs/aufgaben-nico.md, Punkt 1.
  address: {
    street: 'Stammheimer Straße 123',
    city: 'Köln',
    postalCode: '50935',
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
  description: 'Professionelle B2B Telefonakquise & Leadgenerierung aus Köln. Wir liefern qualifizierte Termine mit Entscheidern für Personalvermittler, IT-Systemhäuser, Unternehmensberater, SaaS-Anbieter und Software-Agenturen.',
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
    'Frankfurt',
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
 * Verzeichnisse und Plattformen, in denen die Firma gelistet sein sollte.
 *
 * Bis zum 10.09.2026 standen alle 15 Einträge auf Status "pending" --
 * inklusive Google Business Profile. Das war kein Datenbestand, sondern ein
 * Aufgabenzettel, der als Datenstruktur getarnt war: Weil nie jemand einen
 * Status geändert hat, ließ sich weder ablesen, was erledigt ist, noch, was
 * als Nächstes drankommt.
 *
 * Deshalb tragen die Einträge jetzt `submittedAt` und `profileUrl`. Ein
 * Eintrag gilt erst dann als erledigt, wenn beide gefüllt sind --
 * `scripts/check-directories.mjs` prueft das und meldet Widersprueche.
 *
 * Neu aufgenommen: Sortlist, OMR Reviews und ProvenExpert. Sortlist stand in
 * 13 von 29 am 10.09.2026 gemessenen Suchergebnissen und wird von Googles
 * KI-Übersicht als Vergleichsquelle empfohlen -- dort zu fehlen kostet mehr
 * Sichtbarkeit als die meisten einzelnen Rankings.
 *
 * Die Pflege dieser Liste ist Nicos Aufgabe, nicht die einer Session: Jede
 * Anmeldung verlangt Firmendaten und einen Identitaetsnachweis. Siehe
 * `docs/aufgaben-nico.md`.
 */

/** pending = nicht begonnen | submitted = angelegt, Prüfung läuft | verified = bestaetigt. */
export type DirectoryStatus = 'pending' | 'submitted' | 'verified'

export interface LocalDirectory {
  name: string
  /** Adresse für die Anmeldung. */
  url: string
  priority: 'high' | 'medium' | 'low'
  status: DirectoryStatus
  /** Datum der Anmeldung im Format JJJJ-MM-TT. Pflicht ab "submitted". */
  submittedAt?: string
  /** Öffentliche Adresse des fertigen Profils. Pflicht ab "verified". */
  profileUrl?: string
  notes: string
}

export const localDirectories: LocalDirectory[] = [
  {
    name: 'Google Business Profile',
    url: 'https://business.google.com',
    priority: 'high',
    status: 'pending',
    notes:
      'Der mit Abstand wichtigste Eintrag. Ohne ihn kennt der lokale Index die Firma nicht, ' +
      'und Google schlägt bei der Markensuche die namensähnliche Carpentier Consulting GmbH ' +
      'aus Gau-Weinheim vor. Verifizierung läuft ueber Postkarte oder Telefon und kann nur ' +
      'Nico selbst durchfuehren. Anleitung: docs/GOOGLE_BUSINESS_SETUP.md',
  },
  {
    name: 'Sortlist',
    url: 'https://www.sortlist.de',
    priority: 'high',
    status: 'pending',
    notes:
      'Stand am 10.09.2026 in 13 von 29 gemessenen Suchergebnissen und wird von Googles ' +
      'KI-Übersicht als Vergleichsquelle genannt. Auf der Sortlist-Seite für Köln ist ' +
      'Carpantier nicht gelistet. Höchste Priorität nach dem Business Profile.',
  },
  {
    name: 'ProvenExpert',
    url: 'https://www.provenexpert.com',
    priority: 'high',
    status: 'pending',
    notes:
      'Deutsche Bewertungsplattform mit guter Sichtbarkeit bei Markensuchen. Sammelt ' +
      'Bewertungen, die auch außerhalb von Google zitierbar sind. Voraussetzung sind echte ' +
      'Kundenstimmen – ohne die kein Profil anlegen.',
  },
  {
    name: 'OMR Reviews',
    url: 'https://omr.com/de/reviews',
    priority: 'medium',
    status: 'pending',
    notes:
      'Bewertungsplattform für Dienstleister und Software im deutschsprachigen B2B. ' +
      'Relevante Vergleichsquelle für die Zielgruppe, wird in Kaufrecherchen häufig gelesen.',
  },
  {
    name: 'Bing Places',
    url: 'https://www.bingplaces.com',
    priority: 'high',
    status: 'pending',
    notes:
      'Bing führt die Suche nach Vertriebsagentur Köln auf Position 1 – die organische ' +
      'Position ist also da, der Karteneintrag fehlt. Aufwand gering, Datenübernahme aus ' +
      'dem Google-Profil möglich.',
  },
  {
    name: 'LinkedIn Unternehmensseite',
    url: 'https://www.linkedin.com/company/carpantier-consulting',
    priority: 'high',
    status: 'pending',
    notes:
      'In businessInfo.social bereits als sameAs hinterlegt. Status prüfen und auf verified ' +
      'setzen, sobald die Seite gepflegt ist – die Adresse steht im LocalBusiness-Schema.',
  },
  {
    name: 'Das Telefonbuch',
    url: 'https://www.dastelefonbuch.de',
    priority: 'high',
    status: 'pending',
    notes: 'Größtes deutsches Branchenverzeichnis, speist zahlreiche weitere Datenbestaende.',
  },
  {
    name: 'Gelbe Seiten',
    url: 'https://www.gelbeseiten.de',
    priority: 'high',
    status: 'pending',
    notes: 'Bekanntes deutsches Branchenverzeichnis, NAP-Konsistenz beachten.',
  },
  {
    name: 'Apple Maps Connect',
    url: 'https://mapsconnect.apple.com',
    priority: 'medium',
    status: 'pending',
    notes: 'Apple Maps und Siri. Relevant, weil ein erheblicher Teil der Zielgruppe iOS nutzt.',
  },
  {
    name: 'WLW (Wer liefert was)',
    url: 'https://www.wlw.de',
    priority: 'medium',
    status: 'pending',
    notes: 'B2B-Plattform für Dienstleister, gute Sichtbarkeit bei Beschaffungsrecherchen.',
  },
  {
    name: 'XING Unternehmensseite',
    url: 'https://www.xing.com/companies',
    priority: 'medium',
    status: 'pending',
    notes: 'Deutsches B2B-Netzwerk. Erscheint bei der Markensuche bereits in den Ergebnissen.',
  },
  {
    name: '11880.com',
    url: 'https://www.11880.com',
    priority: 'medium',
    status: 'pending',
    notes: 'Telefonauskunft und Branchenverzeichnis.',
  },
  {
    name: 'GoYellow',
    url: 'https://www.goyellow.de',
    priority: 'low',
    status: 'pending',
    notes: 'Deutsches Branchenverzeichnis, geringe eigenstaendige Reichweite.',
  },
  {
    name: 'Yelp',
    url: 'https://biz.yelp.de',
    priority: 'low',
    status: 'pending',
    notes: 'Im deutschen B2B nachrangig. Erst nach den hochpriorisierten Eintraegen.',
  },
  {
    name: 'Trustpilot',
    url: 'https://business.trustpilot.com',
    priority: 'low',
    status: 'pending',
    notes:
      'Setzt echte Kundenstimmen voraus. Ein leeres Profil ist schlechter als keines – ' +
      'erst anlegen, wenn Bewertungen eingesammelt werden können.',
  },
  {
    name: 'Hotfrog',
    url: 'https://www.hotfrog.de',
    priority: 'low',
    status: 'pending',
    notes: 'Internationales Branchenverzeichnis, geringer Nutzen.',
  },
  {
    name: 'Cylex',
    url: 'https://www.cylex.de',
    priority: 'low',
    status: 'pending',
    notes: 'Deutsches Branchenverzeichnis, geringer Nutzen.',
  },
  {
    name: 'Kompass',
    url: 'https://de.kompass.com',
    priority: 'low',
    status: 'pending',
    notes: 'B2B-Verzeichnis, geringer Nutzen.',
  },
]

/** Verzeichnisse, die als Nächstes anstehen: offen, nach Priorität sortiert. */
export function getOffeneVerzeichnisse(): LocalDirectory[] {
  const rang = { high: 0, medium: 1, low: 2 }
  return localDirectories
    .filter((eintrag) => eintrag.status === 'pending')
    .sort((a, b) => rang[a.priority] - rang[b.priority])
}

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
