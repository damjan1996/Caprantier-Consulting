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
