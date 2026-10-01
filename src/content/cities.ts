// Städte-Konfiguration für lokale SEO Landing Pages

/**
 * Ortswissen je Stadt für `/leistungen/[stadt]` — optional, und leer, bis es
 * belegt ist.
 *
 * Hintergrund (Search Console, 01.10.2026): Nach Tausch des Stadtnamens sind
 * 84 % des Textes der fünfzehn Vertriebs-Stadtseiten gleich, auf
 * `/kaltakquise/[stadt]` 76 % — und alle fünfzehn Kaltakquise-Stadtseiten
 * fehlen im Index. Was eine Stadtseite von den anderen vierzehn unterscheidet,
 * kann nur echtes Ortswissen sein: Branchen, für die hier tatsächlich
 * gearbeitet wird, ein reales Projekt, das Gebiet, das von hier aus bearbeitet
 * wird, Fragen, die nur hier gestellt werden.
 *
 * Deshalb ist jedes Feld optional und bleibt leer, solange es dazu nichts
 * Belegtes gibt. Allgemeiner Text mit ausgetauschtem Stadtnamen wäre genau das
 * Muster, das diese Felder beheben sollen. Der Abschnitt `OrtSection` erscheint
 * nur, wenn mindestens ein Feld gefüllt ist; `fragen` gehen zusätzlich in die
 * häufigen Fragen und das FAQPage-Markup der Seite.
 * `scripts/check-content-duplication.mjs` prüft alle Felder gegeneinander.
 */
export interface CityLokal {
  /** Abschnitt „Neukundengewinnung in <Stadt>“: was die Akquise hier anders macht. */
  neukundengewinnung?: { titel: string; absaetze: string[] }
  /** Branchen, für die wir hier tatsächlich arbeiten, je ein Satz dazu. */
  branchen?: { name: string; text: string }[]
  /**
   * Ein reales Projekt vor Ort, anonymisiert (Branche statt Name). Nur mit
   * schriftlicher Freigabe des Kunden — dieselbe Regel wie in `case-studies.ts`.
   */
  projekt?: { text: string; freigegebenAm: string }
  /** Das Gebiet, das von hier aus bearbeitet wird: Kreise, Nachbarorte. */
  einzugsgebiet?: string
  /** Fragen, die nur in dieser Stadt gestellt werden. */
  fragen?: { question: string; answer: string }[]
}

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
  /**
   * Führender Begriff in Titel und H1 von `/leistungen/[stadt]`, wenn die
   * Search Console für diese Stadt einen anderen Suchbegriff zeigt als
   * „Vertrieb auslagern“. „Vertriebsagentur <Stadt>“ bleibt vorn im Titel.
   */
  suchbegriff?: { titel: string; h1: string }
  lokal?: CityLokal
}

/** Vorgabe für Titel und H1, wenn eine Stadt keinen eigenen `suchbegriff` hat. */
export const STANDARD_SUCHBEGRIFF = { titel: 'Vertrieb auslagern', h1: 'Vertrieb auslagern' }

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
    // Search Console 01.09.–28.09.2026: „neukundengewinnung köln“ Ø Position
    // 17,9, „vertriebsagentur köln“ 13,1. Die Absätze stützen sich nur auf
    // Belegtes: den Sitz in Köln (`businessInfo`), „Wir telefonieren aus Köln“
    // (`getCityFAQs` in `src/lib/schemas.ts`) und die Zusage, dass der Gründer
    // Erstgespräch und Kick-off selbst führt (`/ueber-uns`). Bewusst ohne
    // Heimvorteil – dieselbe Seite sagt, am Telefon zähle nicht die Anfahrt –
    // und ohne die Marktbeschreibung von `/kaltakquise/koeln`: Die beiden
    // Familien sollen Verschiedenes sagen, auch nicht dasselbe mit anderen
    // Worten.
    //
    // TODO(Nico): Branchen, für die du in Köln tatsächlich arbeitest; ein
    // Kölner Projekt (anonymisiert, mit schriftlicher Freigabe); das
    // Einzugsgebiet, das du von Köln aus bearbeitest; ein bis zwei Fragen, die
    // Kölner Auftraggeber im Erstgespräch stellen.
    lokal: {
      neukundengewinnung: {
        titel: 'Neukundengewinnung in Köln – telefoniert und betreut von Köln aus.',
        absaetze: [
          'Carpantier Consulting hat seinen Sitz in Köln, und von hier aus wird telefoniert. Erstgespräch und Kick-off führt der Gründer selbst – für Kölner Auftraggeber also jemand aus derselben Stadt.',
          'Am Ablauf ändert das nichts: Liste mit dokumentiertem Anlass, Anruf in Ihrem Namen, Termin erst bei geklärtem Bedarf. Wen wir in Köln anrufen und wann diese Rollen am besten erreichbar sind, steht auf der Seite zur Kaltakquise in Köln.',
        ],
      },
    },
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
    // TODO(Nico): Ortswissen für `lokal` (siehe `CityLokal`) – Stadt mit Impressionen,
    // deshalb zuerst: „vertriebsagentur düsseldorf“ am 10.09.2026 auf Position 4.
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
    name: 'Frankfurt',
    region: 'Hessen',
    regionShort: 'HE',
    coordinates: { latitude: 50.1109, longitude: 8.6821 },
    regionalText: 'Frankfurt ist das Finanzzentrum Deutschlands und Sitz der Europäischen Zentralbank. Die Mainmetropole bietet exzellente Möglichkeiten für B2B-Akquise im Finanz- und Beratungssektor.',
    businessContext: 'im Rhein-Main-Gebiet und der Finanzmetropole',
    nearbyAreas: ['Wiesbaden', 'Mainz', 'Darmstadt'],
    // TODO(Nico): Ortswissen für `lokal` (siehe `CityLokal`) – Stadt mit Impressionen,
    // deshalb zuerst: „vertriebsagentur frankfurt“ am 10.09.2026 auf Position 2.
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
    // TODO(Nico): Ortswissen für `lokal` (siehe `CityLokal`) – Stadt mit Impressionen,
    // deshalb zuerst: „vertriebsagentur münchen“ Ø Position 4,6 (Search Console 01.09.–28.09.2026).
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
    // „Akquise“ stand bis zum 01.10.2026 weder im Titel noch in der H1.
    suchbegriff: { titel: 'Akquise & B2B-Vertrieb', h1: 'Akquise auslagern' },
    // TODO(Nico): Ortswissen für `lokal` (siehe `CityLokal`) – Stadt mit Impressionen,
    // deshalb zuerst: „akquise agentur hamburg“ Ø Position 13,1 (35 Impressionen),
    // „vertriebsagentur hamburg“ 7,0 (Search Console 01.09.–28.09.2026).
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
    // TODO(Nico): Ortswissen für `lokal` (siehe `CityLokal`) – Stadt mit Impressionen,
    // deshalb zuerst: „vertriebsagentur berlin“ Ø Position 7,2 (Search Console 01.09.–28.09.2026).
  },
  {
    slug: 'stuttgart',
    name: 'Stuttgart',
    region: 'Baden-Württemberg',
    regionShort: 'BW',
    coordinates: { latitude: 48.7758, longitude: 9.1829 },
    regionalText: 'Stuttgart ist das Herz der deutschen Automobilindustrie und ein führender Innovationsstandort. Mercedes-Benz, Porsche und Bosch prägen die Region mit zahlreichen B2B-Möglichkeiten.',
    businessContext: 'im Ländle und der Automobilregion',
    nearbyAreas: ['Karlsruhe', 'Mannheim', 'Heidelberg'],
  },
  {
    slug: 'hannover',
    name: 'Hannover',
    region: 'Niedersachsen',
    regionShort: 'NI',
    coordinates: { latitude: 52.3759, longitude: 9.7320 },
    regionalText: 'Hannover ist als Messestadt weltbekannt und ein wichtiger Knotenpunkt für Industrie und Dienstleistungen. Die niedersächsische Landeshauptstadt bietet starke B2B-Netzwerke.',
    businessContext: 'in der Messestadt und Niedersachsen',
    nearbyAreas: ['Braunschweig', 'Hamburg', 'Bremen'],
  },
  {
    slug: 'leipzig',
    name: 'Leipzig',
    region: 'Sachsen',
    regionShort: 'SN',
    coordinates: { latitude: 51.3397, longitude: 12.3731 },
    regionalText: 'Leipzig entwickelt sich rasant zum ostdeutschen Wirtschaftszentrum. Die Stadt zieht Kreative, Tech-Unternehmen und Logistiker an und bietet wachsende B2B-Chancen.',
    businessContext: 'in Mitteldeutschland und Sachsen',
    nearbyAreas: ['Dresden', 'Berlin', 'Halle'],
  },
  {
    slug: 'dresden',
    name: 'Dresden',
    region: 'Sachsen',
    regionShort: 'SN',
    coordinates: { latitude: 51.0504, longitude: 13.7373 },
    regionalText: 'Dresden ist Deutschlands Silicon Saxony – ein führender Standort für Mikroelektronik und High-Tech. Die sächsische Landeshauptstadt bietet exzellente B2B-Möglichkeiten in der Tech-Branche.',
    businessContext: 'im Silicon Saxony und der High-Tech-Region',
    nearbyAreas: ['Leipzig', 'Chemnitz', 'Berlin'],
  },
  {
    slug: 'nuernberg',
    name: 'Nürnberg',
    region: 'Bayern',
    regionShort: 'BY',
    coordinates: { latitude: 49.4521, longitude: 11.0767 },
    regionalText: 'Nürnberg ist das wirtschaftliche Zentrum Frankens und ein bedeutender Messestandort. Die Metropolregion bietet starke Industrieunternehmen und dynamische B2B-Netzwerke.',
    businessContext: 'in Franken und der Metropolregion Nürnberg',
    nearbyAreas: ['München', 'Würzburg', 'Erlangen'],
    // TODO(Nico): Ortswissen für `lokal` (siehe `CityLokal`) – Stadt mit Impressionen,
    // deshalb zuerst: „vertriebsoutsourcing nürnberg“ Ø Position 5,4 (27 Impressionen, Search Console
    // 01.09.–28.09.2026).
  },
  {
    slug: 'bremen',
    name: 'Bremen',
    region: 'Bremen',
    regionShort: 'HB',
    coordinates: { latitude: 53.0793, longitude: 8.8017 },
    regionalText: 'Bremen ist ein traditionsreicher Handels- und Logistikstandort an der Weser. Die Hansestadt bietet exzellente B2B-Möglichkeiten in Luft- und Raumfahrt, Logistik und Nahrungsmittelindustrie.',
    businessContext: 'in der Hansestadt und Norddeutschland',
    nearbyAreas: ['Hamburg', 'Hannover', 'Oldenburg'],
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

// Get city by name (for nearby areas linking)
function getCityByName(name: string): City | undefined {
  return cities.find((city) => city.name === name)
}

/**
 * Hat die Stadt Ortswissen für den Abschnitt „Vor Ort“?
 *
 * `lokal.fragen` zählen hier nicht mit: Sie stehen bei den häufigen Fragen,
 * nicht in diesem Abschnitt. Steht hier und nicht in der Komponente, weil die
 * Server-Komponente `page.tsx` entscheidet, ob der Abschnitt erscheint.
 */
export function hatOrtswissen(city: City): boolean {
  const lokal = city.lokal
  if (!lokal) return false
  return Boolean(
    lokal.neukundengewinnung || lokal.branchen?.length || lokal.projekt || lokal.einzugsgebiet
  )
}

/**
 * Bis zu `anzahl` Nachbarstädte, die eine eigene Seite haben.
 *
 * `nearbyAreas` nennt die geografischen Nachbarn, nicht die vorhandenen
 * Seiten: Frankfurt verweist auf Wiesbaden, Mainz und Darmstadt, Stuttgart auf
 * Karlsruhe, Mannheim und Heidelberg — und keine dieser sechs Städte steht in
 * `cities`. Wer nur filtert, was auflösbar ist, bekommt auf genau diesen
 * beiden Seiten **keinen einzigen** Verweis in die Umgebung, während andere
 * Seiten zwei bekommen. Die interne Verlinkung der Familie ist dann so
 * ungleich wie die Datenlage, nicht so wie die Absicht.
 *
 * Deshalb wird in drei Stufen aufgefüllt:
 *   1. die genannten Nachbarn, soweit es sie als Seite gibt,
 *   2. weitere Städte derselben Region,
 *   3. die nächstgelegenen nach Luftlinie.
 *
 * Stufe 3 ist eine Näherung über ebene Koordinaten. Für den Vergleich von
 * Entfernungen innerhalb Deutschlands reicht das; der Breitengrad geht mit dem
 * Kosinus in die Länge ein, damit Ost–West nicht überschätzt wird.
 */
export function getNearbyCities(city: City, anzahl = 3): City[] {
  const gewaehlt: City[] = []

  const aufnehmen = (kandidat: City | undefined) => {
    if (!kandidat) return
    if (kandidat.slug === city.slug) return
    if (gewaehlt.length >= anzahl) return
    if (gewaehlt.some((vorhanden) => vorhanden.slug === kandidat.slug)) return
    gewaehlt.push(kandidat)
  }

  for (const name of city.nearbyAreas) aufnehmen(getCityByName(name))

  if (gewaehlt.length < anzahl) {
    for (const kandidat of cities) {
      if (kandidat.region === city.region) aufnehmen(kandidat)
    }
  }

  if (gewaehlt.length < anzahl) {
    const entfernung = (ziel: City) => {
      const dLat = ziel.coordinates.latitude - city.coordinates.latitude
      const dLon =
        (ziel.coordinates.longitude - city.coordinates.longitude) *
        Math.cos((city.coordinates.latitude * Math.PI) / 180)
      return Math.hypot(dLat, dLon)
    }
    for (const kandidat of [...cities].sort((a, b) => entfernung(a) - entfernung(b))) {
      aufnehmen(kandidat)
    }
  }

  return gewaehlt
}
