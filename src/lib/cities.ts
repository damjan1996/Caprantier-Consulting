// Städte-Konfiguration für lokale SEO Landing Pages

export interface City {
  slug: string
  name: string
  region: string
  regionShort: string
  coordinates: {
    latitude: number
    longitude: number
  }
  // Regionale Beschreibungen für einzigartigen Content
  regionalText: string
  businessContext: string
  // Nearby cities for internal linking
  nearbyAreas: string[]
}

export const cities: City[] = [
  {
    slug: 'koeln',
    name: 'Köln',
    region: 'Nordrhein-Westfalen',
    regionShort: 'NRW',
    coordinates: { latitude: 50.9375, longitude: 6.9603 },
    regionalText: 'Als Medien- und Wirtschaftsstandort bietet Köln ideale Voraussetzungen für B2B-Unternehmen. Die rheinische Metropole ist Heimat zahlreicher Agenturen, IT-Dienstleister und Beratungsunternehmen.',
    businessContext: 'im Rheinland und der Kölner Bucht',
    nearbyAreas: ['Düsseldorf', 'Bonn', 'Leverkusen'],
  },
  {
    slug: 'duesseldorf',
    name: 'Düsseldorf',
    region: 'Nordrhein-Westfalen',
    regionShort: 'NRW',
    coordinates: { latitude: 51.2277, longitude: 6.7735 },
    regionalText: 'Düsseldorf ist als Landeshauptstadt und internationaler Messestandort ein Zentrum für Mode, Werbung und Unternehmensberatung. Die Stadt am Rhein bietet exzellente Geschäftsmöglichkeiten.',
    businessContext: 'an der Königsallee und im Rheinland',
    nearbyAreas: ['Köln', 'Essen', 'Duisburg'],
  },
  {
    slug: 'bonn',
    name: 'Bonn',
    region: 'Nordrhein-Westfalen',
    regionShort: 'NRW',
    coordinates: { latitude: 50.7374, longitude: 7.0982 },
    regionalText: 'Die ehemalige Bundeshauptstadt Bonn ist heute ein bedeutender Standort für IT, Telekommunikation und internationale Organisationen. Zahlreiche DAX-Unternehmen haben hier ihren Sitz.',
    businessContext: 'in der Bundesstadt und dem Rhein-Sieg-Kreis',
    nearbyAreas: ['Köln', 'Koblenz', 'Siegburg'],
  },
  {
    slug: 'essen',
    name: 'Essen',
    region: 'Nordrhein-Westfalen',
    regionShort: 'NRW',
    coordinates: { latitude: 51.4556, longitude: 7.0116 },
    regionalText: 'Essen hat sich vom Industriestandort zur grünen Hauptstadt Europas gewandelt. Die Stadt ist Sitz bedeutender Energiekonzerne und bietet eine dynamische Wirtschaftslandschaft.',
    businessContext: 'im Ruhrgebiet und der Metropole Ruhr',
    nearbyAreas: ['Dortmund', 'Düsseldorf', 'Duisburg'],
  },
  {
    slug: 'dortmund',
    name: 'Dortmund',
    region: 'Nordrhein-Westfalen',
    regionShort: 'NRW',
    coordinates: { latitude: 51.5136, longitude: 7.4653 },
    regionalText: 'Dortmund ist ein wachsender Technologie- und Dienstleistungsstandort. Mit dem TechnologieZentrumDortmund und zahlreichen IT-Unternehmen bietet die Stadt ideale B2B-Möglichkeiten.',
    businessContext: 'im östlichen Ruhrgebiet und Westfalen',
    nearbyAreas: ['Essen', 'Bochum', 'Münster'],
  },
  {
    slug: 'frankfurt',
    name: 'Frankfurt am Main',
    region: 'Hessen',
    regionShort: 'HE',
    coordinates: { latitude: 50.1109, longitude: 8.6821 },
    regionalText: 'Frankfurt ist das Finanzzentrum Deutschlands und Sitz der Europäischen Zentralbank. Die Mainmetropole bietet exzellente Möglichkeiten für B2B-Akquise im Finanz- und Beratungssektor.',
    businessContext: 'im Rhein-Main-Gebiet und der Finanzmetropole',
    nearbyAreas: ['Wiesbaden', 'Mainz', 'Darmstadt'],
  },
  {
    slug: 'muenchen',
    name: 'München',
    region: 'Bayern',
    regionShort: 'BY',
    coordinates: { latitude: 48.1351, longitude: 11.5820 },
    regionalText: 'München ist Deutschlands führender Technologie- und Innovationsstandort. Von Automotive bis Software – die bayerische Landeshauptstadt bietet erstklassige B2B-Chancen.',
    businessContext: 'in Bayern und der Hightech-Region',
    nearbyAreas: ['Augsburg', 'Nürnberg', 'Ingolstadt'],
  },
  {
    slug: 'hamburg',
    name: 'Hamburg',
    region: 'Hamburg',
    regionShort: 'HH',
    coordinates: { latitude: 53.5511, longitude: 9.9937 },
    regionalText: 'Hamburg ist Deutschlands Tor zur Welt und ein führender Medien- und Logistikstandort. Die Hansestadt bietet ein starkes Netzwerk für B2B-Unternehmen.',
    businessContext: 'in der Hansestadt und Norddeutschland',
    nearbyAreas: ['Bremen', 'Hannover', 'Kiel'],
  },
  {
    slug: 'berlin',
    name: 'Berlin',
    region: 'Berlin',
    regionShort: 'BE',
    coordinates: { latitude: 52.5200, longitude: 13.4050 },
    regionalText: 'Berlin ist Deutschlands pulsierende Startup-Metropole und ein Magnet für innovative Unternehmen. Die Hauptstadt bietet unzählige Möglichkeiten für B2B-Geschäfte.',
    businessContext: 'in der Hauptstadt und der Startup-Szene',
    nearbyAreas: ['Potsdam', 'Leipzig', 'Dresden'],
  },
]

// Helper function to get city by slug
export function getCityBySlug(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug)
}

// Get all city slugs for static generation
export function getAllCitySlugs(): string[] {
  return cities.map((city) => city.slug)
}

// Generate city-specific keywords - optimiert für "Vertrieb + Stadt"
export function getCityKeywords(city: City): string[] {
  return [
    // Primäre "Vertrieb"-Keywords (höchste Priorität)
    `Vertrieb ${city.name}`,
    `Vertriebsagentur ${city.name}`,
    `Vertrieb auslagern ${city.name}`,
    `Vertriebsunterstützung ${city.name}`,
    `Vertriebsoutsourcing ${city.name}`,
    `Vertriebspartner ${city.name}`,
    `Vertriebsberatung ${city.name}`,
    // Sekundäre Keywords
    `B2B Vertrieb ${city.name}`,
    `B2B Akquise ${city.name}`,
    `Telefonakquise ${city.name}`,
    `Leadgenerierung ${city.name}`,
    `Kaltakquise ${city.name}`,
    `Neukundengewinnung ${city.name}`,
    `B2B Leads ${city.name}`,
    `Terminvereinbarung ${city.name}`,
    `Sales Outsourcing ${city.name}`,
    `Akquise Agentur ${city.name}`,
    // Regionale Keywords
    `Vertrieb ${city.regionShort}`,
    `Vertriebsagentur ${city.region}`,
    `Leadgenerierung ${city.regionShort}`,
    `Akquise ${city.region}`,
  ]
}

// Get city by name (for nearby areas linking)
export function getCityByName(name: string): City | undefined {
  return cities.find((city) => city.name === name)
}

// Get slug from city name
export function getSlugFromName(name: string): string | undefined {
  const city = getCityByName(name)
  return city?.slug
}
