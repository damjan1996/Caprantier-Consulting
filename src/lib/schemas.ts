import type { City } from './cities'

// Testimonials data for schema generation
const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Michael Weber',
    company: 'WebTech Solutions GmbH',
    location: 'Köln',
    rating: 5,
    text: 'Carpantier Consulting hat unsere Erwartungen übertroffen. Innerhalb von 3 Monaten hatten wir 12 qualifizierte Termine mit Entscheidern, von denen 4 zu Neukunden wurden. Die Zusammenarbeit war professionell und erstklassig.',
  },
  {
    id: 2,
    name: 'Sandra Müller',
    company: 'Digital First Agency',
    location: 'Düsseldorf',
    rating: 5,
    text: 'Endlich planbare Akquise! Wir haben jahrelang versucht, selbst Kaltakquise zu machen - ohne Erfolg. Mit Carpantier haben wir jetzt einen konstanten Strom an qualifizierten Leads. Das Team versteht unser Geschäft und liefert Neukunden.',
  },
  {
    id: 3,
    name: 'Thomas Schneider',
    company: 'Schneider IT Consulting',
    location: 'Frankfurt',
    rating: 5,
    text: 'Als Einzelunternehmer hatte ich keine Zeit für Akquise. Carpantier hat mir ermöglicht, mich auf mein Kerngeschäft zu konzentrieren, während sie die Pipeline füllen. ROI nach 2 Monaten erreicht. Absolute Empfehlung!',
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

// Generate city-specific FAQs
function getCityFAQs(city: City) {
  return [
    {
      question: `Bieten Sie B2B Akquise in ${city.name} an?`,
      answer: `Ja, wir sind spezialisiert auf B2B Telefonakquise und Leadgenerierung ${city.businessContext}. ${city.regionalText} Von unserem Standort in Köln aus betreuen wir Unternehmen in ${city.name} und Umgebung.`,
    },
    {
      question: `Wie läuft die Zusammenarbeit mit Unternehmen aus ${city.name} ab?`,
      answer: `Die Zusammenarbeit startet mit einem kostenlosen Strategiegespräch. Wir analysieren Ihre Zielgruppe in ${city.name} und ${city.region}, entwickeln maßgeschneiderte Gesprächsleitfäden und beginnen mit der Akquise. Alle Termine werden digital übergeben - die Distanz spielt keine Rolle.`,
    },
    {
      question: `Welche Branchen sprechen Sie in ${city.name} an?`,
      answer: `Wir sind auf B2B-Dienstleister spezialisiert: Agenturen, IT-Dienstleister, Beratungsunternehmen und Softwareunternehmen ${city.businessContext}. Unsere Expertise liegt in der Ansprache von Entscheidern in mittelständischen Unternehmen.`,
    },
    {
      question: `Wie schnell kann ich mit ersten Terminen in ${city.name} rechnen?`,
      answer: `Nach dem Onboarding und der Kampagneneinrichtung können Sie oft schon in der ersten Woche mit den ersten qualifizierten Terminen rechnen. Die genaue Geschwindigkeit hängt von Ihrer Zielgruppe und Branche in ${city.name} ab.`,
    },
    {
      question: `Was unterscheidet Carpantier von anderen Akquise-Agenturen in ${city.region}?`,
      answer: `Wir liefern ausschließlich BANT-qualifizierte Termine mit echten Entscheidern. Keine Masse, sondern Klasse. Zudem haben wir über 3 Jahre Erfahrung speziell im B2B-Dienstleisterumfeld und verstehen die Herausforderungen von Unternehmen ${city.businessContext}.`,
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
