import type { City } from './cities'

// Testimonials data for schema generation - mit Vertrieb-Keywords
const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Michael Weber',
    company: 'WebTech Solutions GmbH',
    location: 'Köln',
    rating: 5,
    text: 'Carpantier Consulting ist die beste Vertriebsagentur in Köln. Innerhalb von 3 Monaten hatten wir 12 qualifizierte Termine mit Entscheidern, von denen 4 zu Neukunden wurden. Vertrieb auslagern war die beste Entscheidung für unser Unternehmen.',
  },
  {
    id: 2,
    name: 'Sandra Müller',
    company: 'Digital First Agency',
    location: 'Düsseldorf',
    rating: 5,
    text: 'Endlich planbarer Vertrieb! Wir haben jahrelang versucht, selbst Vertrieb zu machen - ohne Erfolg. Mit Carpantier als Vertriebspartner haben wir jetzt einen konstanten Strom an qualifizierten Leads. Die Vertriebsagentur versteht unser Geschäft.',
  },
  {
    id: 3,
    name: 'Thomas Schneider',
    company: 'Schneider IT Consulting',
    location: 'Frankfurt',
    rating: 5,
    text: 'Als Einzelunternehmer hatte ich keine Zeit für Vertrieb. Carpantier ermöglicht mir, mich auf mein Kerngeschäft zu konzentrieren, während sie meinen Vertrieb übernehmen. ROI nach 2 Monaten erreicht. Beste Vertriebsagentur in Frankfurt!',
  },
]

// Generate Review Schema for Testimonials
export function generateTestimonialsSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Carpantier Consulting',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: TESTIMONIALS_DATA.length.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    review: TESTIMONIALS_DATA.map((t) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: t.rating.toString(),
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: t.name,
      },
      reviewBody: t.text,
      publisher: {
        '@type': 'Organization',
        name: t.company,
        address: {
          '@type': 'PostalAddress',
          addressLocality: t.location,
          addressCountry: 'DE',
        },
      },
    })),
  }
}

// Generate city-specific FAQs - optimiert für "Vertrieb [Stadt]" Keywords
function getCityFAQs(city: City) {
  return [
    {
      question: `Kann ich meinen Vertrieb in ${city.name} an Sie auslagern?`,
      answer: `Ja, als Vertriebsagentur übernehmen wir Ihren kompletten B2B-Vertrieb in ${city.name}. Wir sind spezialisiert auf Vertriebsoutsourcing und Leadgenerierung ${city.businessContext}. ${city.regionalText} Von unserem Standort aus betreuen wir Unternehmen in ${city.name} und Umgebung mit professioneller Vertriebsunterstützung.`,
    },
    {
      question: `Wie funktioniert Vertrieb auslagern mit Carpantier in ${city.name}?`,
      answer: `Als Ihre Vertriebsagentur für ${city.name} starten wir mit einem kostenlosen Strategiegespräch. Wir analysieren Ihre Zielgruppe in ${city.name} und ${city.region}, entwickeln maßgeschneiderte Vertriebsstrategien und übernehmen die aktive Kundenakquise. Alle qualifizierten Termine werden digital in Ihren Kalender übergeben.`,
    },
    {
      question: `Was kostet eine Vertriebsagentur in ${city.name}?`,
      answer: `Die Kosten für Vertriebsoutsourcing in ${city.name} hängen von Ihrem Bedarf ab. Wir bieten verschiedene Modelle an - von Pay-per-Lead bis zu monatlichen Vertriebspaketen. In einem kostenlosen Strategiegespräch erstellen wir ein individuelles Angebot für Ihr Vertriebsprojekt ${city.businessContext}.`,
    },
    {
      question: `Welche Branchen betreut Ihre Vertriebsagentur in ${city.name}?`,
      answer: `Wir sind auf den Vertrieb für B2B-Dienstleister spezialisiert: Agenturen, IT-Dienstleister, Beratungsunternehmen und Softwareunternehmen ${city.businessContext}. Unsere Vertriebsexpertise liegt in der Ansprache von Entscheidern in mittelständischen Unternehmen in ${city.name}.`,
    },
    {
      question: `Wie schnell generiert Ihr Vertriebsteam erste Leads in ${city.name}?`,
      answer: `Nach dem Onboarding können Sie oft schon in der ersten Woche mit den ersten qualifizierten Terminen aus ${city.name} rechnen. Als erfahrene Vertriebsagentur verstehen wir den Markt ${city.businessContext} und liefern schnelle Ergebnisse.`,
    },
    {
      question: `Was unterscheidet Carpantier von anderen Vertriebsagenturen in ${city.region}?`,
      answer: `Als spezialisierte Vertriebsagentur für ${city.name} liefern wir ausschließlich BANT-qualifizierte Termine mit echten Entscheidern. Keine Masse, sondern Klasse. Wir haben über 3 Jahre Vertriebserfahrung speziell im B2B-Dienstleisterumfeld und verstehen die Vertriebsherausforderungen ${city.businessContext}.`,
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
export function generateHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'B2B Vertrieb auslagern - Das 3-Schritte-System',
    description:
      'In drei Schritten von der kalten Liste zum zahlenden Kunden. Professionelle B2B Telefonakquise und Leadgenerierung durch Carpantier Consulting.',
    totalTime: 'P30D',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: 'Individuell nach Anforderung',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Strategie-Blueprint',
        text: 'Messerscharfe Analyse von Angebot und Zielgruppe. Wir definieren genau, wen wir anrufen und was wir sagen. Entwicklung einer maßgeschneiderten Akquise-Strategie mit Zielgruppenanalyse, Skript-Entwicklung und Einwandbehandlung.',
        url: 'https://carpantier-consulting.de/#methode',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Akquise-Übernahme',
        text: 'Wir führen die Gespräche, als wären wir Teil Ihres Teams. Professionell, hartnäckig und sympathisch. Aktive B2B Telefonakquise mit qualifizierten Vertriebsmitarbeitern.',
        url: 'https://carpantier-consulting.de/#methode',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Verkaufsgespräche führen',
        text: 'Sie erhalten qualifizierte Termine direkt in Ihren Kalender. Sie schließen ab - wir halten Ihnen den Rücken frei. BANT-qualifizierte Leads mit echten Entscheidern.',
        url: 'https://carpantier-consulting.de/#methode',
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Professionelles CRM-System',
      },
      {
        '@type': 'HowToTool',
        name: 'Kalender-Integration (Calendly)',
      },
    ],
  }
}

// Homepage FAQ Schema
export function generateHomepageFAQSchema() {
  const faqs = [
    {
      question: 'Was passiert im Erstgespräch?',
      answer:
        'Im Erstgespräch analysieren wir Ihre aktuelle Situation und prüfen, ob unser System für Ihre Agentur geeignet ist. Wir geben Ihnen bereits erste strategische Impulse mit, völlig unverbindlich.',
    },
    {
      question: 'Warum ist das Gespräch kostenlos?',
      answer:
        'Wir investieren in Vorleistung, weil wir wissen, dass unser System überzeugt. Wenn wir sehen, dass wir Ihnen helfen können, machen wir Ihnen ein Angebot. Wenn nicht, haben Sie trotzdem wertvolle Klarheit gewonnen.',
    },
    {
      question: 'Was kostet die Dienstleistung?',
      answer:
        'Da wir keine Standard-Pakete verkaufen, sondern maßgeschneiderte Lösungen, variiert der Preis je nach Umfang und Zielsetzung. Im Erstgespräch können wir Ihnen nach der Analyse eine genaue Hausnummer nennen.',
    },
    {
      question: 'Für wen ist Carpantier Consulting geeignet?',
      answer:
        'Wir arbeiten exklusiv mit Dienstleistern und Agenturinhabern (B2B), die ein funktionierendes Angebot haben und bereit sind, zu skalieren. Wir arbeiten nicht mit Network Marketern oder Dropshippern.',
    },
    {
      question: 'Sind die Termine qualifiziert?',
      answer:
        'Ja. Wir vereinbaren keine "Kaffeetrinken"-Termine. Jeder Lead wird nach Ihren Kriterien vorqualifiziert (BANT-Methode: Budget, Authority, Need, Timing), bevor er in Ihrem Kalender landet.',
    },
    {
      question: 'Wie schnell kann ich mit Ergebnissen rechnen?',
      answer:
        'Nach dem Onboarding starten wir in der Regel innerhalb weniger Tage mit den ersten Gesprächen. Die ersten qualifizierten Termine können Sie oft schon in der ersten Woche erwarten.',
    },
  ]

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

// ServiceArea Schema for Local SEO
export function generateServiceAreaSchema() {
  const cities = [
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
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'B2B Vertriebsagentur',
    name: 'B2B Telefonakquise & Leadgenerierung',
    description:
      'Professionelle B2B Telefonakquise und Leadgenerierung. Vertrieb auslagern an erfahrene Profis. Qualifizierte Termine mit Entscheidern.',
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
                name: 'BANT-qualifizierte Leads',
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
      ],
    },
  }
}
