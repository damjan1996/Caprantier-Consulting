import type { City } from './cities'
import type { CityAcquisition } from './city-acquisition'
import { homeFaqs, homeProcessSteps } from './home-content'
import { services } from './leistungen-content'

/*
 * Kein Bewertungs-Markup.
 *
 * Hier standen bis zuletzt drei erfundene Kundenstimmen samt Namen, Firmen und
 * 5-Sterne-Wertungen, die als Review- und AggregateRating-Markup ausgegeben
 * wurden. Erfundene Bewertungen sind irrefuehrend im Sinne des § 5 UWG und
 * verstossen gegen die Richtlinien fuer strukturierte Daten.
 *
 * Bewertungs-Markup darf erst zurueckkehren, wenn es echte, schriftlich
 * freigegebene Kundenstimmen gibt, die auf der Seite auch sichtbar sind.
 */

// Generate city-specific FAQs - optimiert für "Vertrieb [Stadt]" Keywords
/**
 * Die häufigen Fragen der Seitenfamilie `/leistungen/[stadt]`.
 *
 * Wortgleich mit dem sichtbaren Abschnitt „Häufige Fragen“ dort — beide lesen
 * diese Funktion. Zwei Textstände zwischen Markup und Seite sind ein Verstoß,
 * den man der Seite nicht ansieht.
 *
 * Die Fragen zielen bewusst auf eine **andere Absicht** als die unter
 * `/kaltakquise/[stadt]`: Dort geht es um die Zulässigkeit des Anrufs und den
 * Markt vor Ort, hier um die Entscheidung, den Vertrieb überhaupt abzugeben —
 * was übergeben wird, was es kostet, was am Ende bleibt.
 *
 * Neu geschrieben am 15.09.2026. Die frühere Fassung stand im Widerspruch zum
 * Rest der Website und zu den eigenen Textregeln:
 *
 * - „oft schon in der ersten Woche“ gegen „innerhalb von 10–14 Tagen … oft in
 *   der zweiten Woche“ in `home-content.ts`. Dieselbe Zusage in zwei Fassungen,
 *   die aggressivere auf fünfzehn Seiten.
 * - „maßgeschneiderte Vertriebsstrategien“ und „liefern schnelle Ergebnisse“ —
 *   beides führt `docs/seitentexte.md` § 9.1 und § 1 ausdrücklich als das auf,
 *   was nicht geschrieben wird.
 * - „Pay-per-Lead bis zu monatlichen Vertriebspaketen“ gegen die drei Modelle
 *   in `src/lib/pricing.ts`, die anders heißen.
 * - „über 3 Jahre Vertriebserfahrung“ — eine Zahl ohne zweite Quelle im
 *   Projekt.
 */
function getCityFAQs(city: City) {
  return [
    {
      question: `Kann ich meinen Vertrieb in ${city.name} komplett auslagern?`,
      answer: `Die Neukundengewinnung ja, den Abschluss nicht. Wir übernehmen Zielgruppe, Telefonakquise, Qualifizierung und Bericht; das Verkaufsgespräch führen Sie selbst, weil Preis und Zusage bei Ihnen liegen. ${city.regionalText}`,
    },
    {
      question: `Wie läuft die Zusammenarbeit in ${city.name} an?`,
      answer: `Zwei Gespräche mit Ihnen, dann übernehmen wir. Nach Kick-off und Setup starten wir in der Regel innerhalb von 10–14 Tagen mit den ersten Anrufen; die ersten qualifizierten Termine stehen oft in der zweiten Woche in Ihrem Kalender. Über den gesamten Prozess kostet Sie das weniger als 90 Minuten Ihrer Zeit.`,
    },
    {
      question: `Was kostet eine Vertriebsagentur in ${city.name}?`,
      answer: `Wir verkaufen keine Standardpakete, deshalb variiert der Preis. Im Erstgespräch nennen wir Ihnen nach kurzer Analyse eine transparente Hausnummer. Zur Wahl stehen drei Modelle: ein Pilotprojekt, laufende Akquise oder die Abrechnung je qualifiziertem Termin – welches passt, hängt an der Größe Ihrer Zielgruppe und daran, wie viele Termine Sie pro Woche wahrnehmen können.`,
    },
    {
      question: `Für welche Unternehmen in ${city.name} arbeiten Sie?`,
      answer: `Für B2B-Dienstleister mit etwa fünf bis fünfzig Mitarbeitern ${city.businessContext} – Personalvermittler, IT-Systemhäuser, Beratungen, SaaS-Anbieter und Agenturen. Damit sich laufende Akquise rechnet, sollte ein gewonnener Kunde über die Zusammenarbeit hinweg mindestens rund 10.000 € wert sein. Liegt er deutlich darunter, sagen wir das im Erstgespräch.`,
    },
    {
      question: `Was bleibt bei uns, wenn die Zusammenarbeit endet?`,
      answer: `Die Anrufliste mit ihren Auswahlkriterien, die Gesprächsnotizen und das erarbeitete Gesprächsgerüst. Alles läuft von Anfang an in Ihr CRM und nicht in eine Tabelle bei uns; Absagegründe stehen im Wortlaut im Bericht. Wer die Akquise danach selbst weiterführen will, kann das mit dem, was vorliegt.`,
    },
    {
      question: `Arbeiten Sie vor Ort in ${city.name}?`,
      answer: `Wir telefonieren aus Köln, mit korrekt übermittelter Rufnummer und ohne vorgetäuschte Ortsvorwahl. Für den Vertrieb am Telefon zählt nicht die Anfahrt, sondern ob der Anlass des Anrufs zum angerufenen Unternehmen passt und ob wir den Markt ${city.businessContext} kennen.`,
    },
  ]
}

// Generate FAQPage Schema for city pages
export function generateCityFAQSchema(city: City) {
  const faqs = getCityFAQs(city)
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Export FAQs for use in component
export { getCityFAQs }

// Blog Post Schema (Article)
export function generateBlogPostSchema(post: {
  title: string
  description: string
  slug: string
  author: string
  publishedAt: string
  updatedAt: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://carpantier-consulting.de/ueber-uns',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Carpantier Consulting',
      logo: {
        '@type': 'ImageObject',
        url: 'https://carpantier-consulting.de/logo/Logo%20-%20Weiß.png',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://carpantier-consulting.de/blog/${post.slug}`,
    },
    url: `https://carpantier-consulting.de/blog/${post.slug}`,
    ...(post.image && {
      image: {
        '@type': 'ImageObject',
        url: `https://carpantier-consulting.de${post.image}`,
      },
    }),
  }
}

// Blog Post FAQ Schema for Featured Snippets
export function generateBlogFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs || faqs.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// HowTo Schema for Method/Process Section
/**
 * HowTo zum Abschnitt „Der Prozess“ auf der Startseite.
 *
 * Die Schritte kommen aus `src/lib/home-content.ts` und sind damit
 * zwangsläufig dieselben, die der Abschnitt anzeigt. Strukturierte Daten
 * müssen den sichtbaren Inhalt wiedergeben — vorher standen hier drei
 * Schritte mit eigenen Texten, während die Seite vier andere zeigte.
 */
export function generateHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'B2B-Vertrieb auslagern — in vier Schritten zu wöchentlichen Entscheider-Terminen',
    description:
      'Vom Erstgespräch bis zu wöchentlich 3–8 qualifizierten Terminen im eigenen Kalender. Der Ablauf einer Zusammenarbeit mit Carpantier Consulting.',
    totalTime: 'P14D',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: 'Individuell nach Anforderung',
    },
    step: homeProcessSteps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: `${step.phase} · Ihr Aufwand: ${step.effort}. ${step.description}`,
      url: 'https://carpantier-consulting.de/#process-title',
    })),
    tool: [
      { '@type': 'HowToTool', name: 'Professionelles CRM-System' },
      { '@type': 'HowToTool', name: 'Kalender-Integration (Calendly)' },
    ],
  }
}

/**
 * FAQPage der Startseite.
 *
 * Quelle ist `homeFaqs` — dieselbe Liste, die der FAQ-Abschnitt rendert. Der
 * erläuternde Hinweis (`note`) bleibt bewusst draußen: Er steht auf der Seite
 * unter der Antwort, gehört aber nicht zur Antwort selbst.
 */
export function generateHomepageFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// ServiceArea Schema for Local SEO
export function generateServiceAreaSchema() {
  const cities = [
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
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'B2B Vertriebsdienstleister',
    name: 'B2B Vertriebsagentur - Telefonakquise & Leadgenerierung',
    description:
      'Vertriebsagentur & Vertriebsdienstleister für B2B Vertrieb, Telefonakquise und Leadgenerierung. Vertrieb auslagern an erfahrene Sales Agentur. Qualifizierte Termine mit Entscheidern.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Carpantier Consulting',
      url: 'https://carpantier-consulting.de',
    },
    areaServed: cities.map((city) => ({
      '@type': 'City',
      name: city,
      containedInPlace: {
        '@type': 'Country',
        name: 'Deutschland',
      },
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Vertriebsdienstleistungen',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'B2B Telefonakquise',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Kaltakquise',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Terminvereinbarung',
              },
            },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Leadgenerierung',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Qualifizierte Leads mit Entscheidern',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Entscheider-Termine',
              },
            },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Vertriebsoutsourcing',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Vertrieb auslagern',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'SDR as a Service',
              },
            },
          ],
        },
      ],
    },
  }
}

/**
 * VideoObject für das Video auf der Startseite.
 *
 * Ohne dieses Markup weiß Google nur, dass irgendwo ein Bild und ein Link
 * stehen. Mit ihm kann die Seite als Video-Treffer erscheinen — der Verweis
 * geht dabei auf die eigene Seite, nicht auf YouTube.
 *
 * `uploadDate` steht fest, weil er sich für ein bereits veröffentlichtes Video
 * nicht mehr ändert. `duration` ist bewusst nicht gesetzt: Das Feld ist
 * optional, und eine geschätzte Laufzeit im strukturierten Markup waere eine
 * falsche Angabe gegenüber Google. Sobald die echte Laufzeit vorliegt, kann
 * sie nach ISO 8601 ergänzt werden (z. B. PT7M49S für 7:49).
 */
export function generateHomepageVideoSchema() {
  const videoId = 'LevIt3mHrng'

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Was passiert, wenn du keine Kaltakquise machst',
    description:
      'Was mit einer B2B-Pipeline passiert, wenn niemand konstant neue Unternehmen anspricht — und warum sich das erst Monate später zeigt.',
    thumbnailUrl: `https://carpantier-consulting.de/api/youtube/thumbnail/${videoId}`,
    uploadDate: '2026-09-05T13:16:38+00:00',
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
    publisher: {
      '@type': 'Organization',
      name: 'Carpantier Consulting',
      url: 'https://carpantier-consulting.de',
    },
  }
}

/**
 * FAQ der Seiten unter `/kaltakquise/[stadt]`.
 *
 * Bewusst nicht `getCityFAQs` wiederverwendet: Jene Fragen drehen sich um
 * Vertriebsoutsourcing als Ganzes und gehören zu `/leistungen/[stadt]`. Zwei
 * Seitenfamilien mit identischem FAQ-Block wären derselbe Text unter zwei
 * Adressen -- genau die Dopplung, die den Blog in die Nichtindexierung geführt
 * hat. Diese Fragen behandeln ausschließlich die Telefonakquise: Zulässigkeit,
 * Ablauf, Erreichbarkeit vor Ort.
 */
export function getKaltakquiseFAQs(city: City, acquisition: CityAcquisition) {
  return [
    {
      question: `Ist Kaltakquise per Telefon in ${city.name} erlaubt?`,
      answer: `Gegenüber Unternehmen ja. § 7 Abs. 2 Nr. 1 UWG verlangt beim Anruf gegenüber einem sonstigen Marktteilnehmer nur eine zumindest mutmaßliche Einwilligung – diese liegt vor, wenn das Angebot einen konkreten sachlichen Bezug zur Geschäftstätigkeit des angerufenen Unternehmens in ${city.name} hat. Gegenüber Verbrauchern ist eine vorherige ausdrückliche Einwilligung nötig, und für Werbe-E-Mails gilt die Erleichterung ebenfalls nicht. Wir dokumentieren zu jedem Kontakt das Auswahlkriterium, weil die Beweislast beim werbenden Unternehmen liegt.`,
    },
    {
      question: `Welche Unternehmen rufen Sie in ${city.name} an?`,
      answer: `${acquisition.zielgruppenText} Die Zielgruppe wird vor Projektbeginn gemeinsam festgelegt und nicht aus einem gekauften Adressbestand gezogen.`,
    },
    {
      question: `Wie sieht der Markt in ${city.name} aus?`,
      answer: `${acquisition.marktText} Die Leitbranchen vor Ort sind ${acquisition.leitbranchen.join(', ')}.`,
    },
    {
      question: `Wann sind Entscheider in ${city.name} am besten erreichbar?`,
      answer: `${acquisition.erreichbarkeit} Diese Zeitfenster sind ein Startpunkt: Wir protokollieren Uhrzeit und Ergebnis jedes Wählversuchs und richten die Anrufblöcke nach den tatsächlichen Verbindungsquoten Ihrer Zielgruppe aus.`,
    },
    {
      question: `Rufen Sie in ${city.name} vor Ort an oder aus der Ferne?`,
      answer: `Wir telefonieren aus Köln, mit korrekt übermittelter Rufnummer und ohne vorgetäuschte Ortsvorwahl. Eine manipulierte Rufnummer ist ein eigenständiger Verstoß, den die Bundesnetzagentur verfolgt. Für ${city.name} zählt nicht die Vorwahl des Anrufers, sondern ob der Anlass des Anrufs zum angerufenen Unternehmen passt.`,
    },
    {
      question: `Wie viele Termine sind in ${city.name} realistisch?`,
      answer: `Das hängt an der Größe der Zielgruppe und am Angebot, nicht an der Stadt. Im Pilotprojekt vereinbaren wir ein festes Kontingent von 10–15 qualifizierten Terminen über einen Monat. Eine belastbare laufende Quote entsteht erst nach etwa acht Wochen, weil die ersten Wochen jeder Kampagne der Kalibrierung von Liste, Einstieg und Einwandbehandlung dienen.`,
    },
  ]
}

/** FAQPage-Schema für die Seiten unter `/kaltakquise/[stadt]`. */
export function generateKaltakquiseFAQSchema(city: City, acquisition: CityAcquisition) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: getKaltakquiseFAQs(city, acquisition).map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Die vier Leistungen als `ItemList` von `Service`-Einträgen.
 *
 * Wortgleich mit dem sichtbaren Abschnitt „Was wir übernehmen“ auf
 * `/leistungen` — beide lesen `services` aus `src/lib/leistungen-content.ts`.
 * Strukturierte Daten müssen den sichtbaren Inhalt wiedergeben; zwei
 * Textstände wären ein Verstoß, den man der Seite nicht ansieht.
 *
 * Bewusst ohne `offers`: Beträge sind nicht freigegeben, und ein `Offer` ohne
 * `price` ist gegenüber Google wertlos. Die Preismodelle liefert
 * `generateOfferSchema` in `src/lib/pricing.ts`, sobald es Zahlen gibt.
 */
export function generateServicesSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Leistungen der B2B-Akquise',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        serviceType: 'B2B-Telefonakquise und Terminvereinbarung',
        provider: {
          '@type': 'LocalBusiness',
          name: 'Carpantier Consulting',
          url: 'https://carpantier-consulting.de',
        },
      },
    })),
  }
}
