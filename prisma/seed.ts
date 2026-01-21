import { PrismaClient } from '@prisma/client'
import { blogPosts } from '../src/lib/blog'
import { cities } from '../src/lib/cities'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.knowledgeArticle.deleteMany()
  await prisma.knowledgeService.deleteMany()
  await prisma.knowledgeCity.deleteMany()
  await prisma.knowledgeFAQ.deleteMany()
  await prisma.companyInfo.deleteMany()

  // 1. Seed Articles from blog.ts
  console.log('📝 Seeding articles...')
  for (const post of blogPosts) {
    // Extract key points from content (first few bullet points or headers)
    const keyPoints = extractKeyPoints(post.content)

    await prisma.knowledgeArticle.create({
      data: {
        slug: post.slug,
        title: post.title,
        description: post.description,
        category: mapCategory(post.category),
        content: post.content,
        keyPoints: JSON.stringify(keyPoints),
        faqs: JSON.stringify(post.faqs || []),
        keywords: post.tags.join(', '),
      },
    })
  }
  console.log(`✅ ${blogPosts.length} articles seeded`)

  // 2. Seed Cities from cities.ts
  console.log('🏙️ Seeding cities...')
  for (const city of cities) {
    await prisma.knowledgeCity.create({
      data: {
        slug: city.slug,
        name: city.name,
        region: city.region,
        regionCode: city.regionShort,
        description: city.regionalText,
        nearbyAreas: JSON.stringify(city.nearbyAreas),
        localKeywords: JSON.stringify([
          `Vertrieb ${city.name}`,
          `Vertriebsagentur ${city.name}`,
          `B2B Akquise ${city.name}`,
          `Leadgenerierung ${city.name}`,
          `Kaltakquise ${city.name}`,
        ]),
      },
    })
  }
  console.log(`✅ ${cities.length} cities seeded`)

  // 3. Seed Services
  console.log('🛠️ Seeding services...')
  const services = [
    {
      slug: 'telefonakquise',
      title: 'Telefonakquise',
      description:
        'Professionelle Kaltakquise durch erfahrene Sales-Experten. Wir übernehmen die telefonische Neukundengewinnung und vereinbaren qualifizierte Termine mit Entscheidern.',
      features: [
        'Individuelle Gesprächsleitfäden für Ihre Branche',
        'Branchenspezifische Ansprache durch erfahrene B2B-Profis',
        'Kontinuierliche Optimierung der Gespräche',
        '40-60 Anrufe pro Tag, 15-25 Gespräche',
      ],
      benefits: [
        'Keine eigenen Vertriebsressourcen nötig',
        'Planbare Kosten ohne Festanstellung',
        'Sofortiger Start ohne Einarbeitung',
        'Höhere Erfolgsquote durch Expertise',
      ],
    },
    {
      slug: 'leadgenerierung',
      title: 'Leadgenerierung',
      description:
        'Zielgenaue Identifikation und Ansprache Ihrer Wunschkunden. Wir finden die richtigen Unternehmen und Ansprechpartner für Ihr Angebot.',
      features: [
        'Präzise Zielgruppenselektion nach ICP',
        'Datenqualifizierung und -anreicherung',
        'BANT-Qualifizierung aller Leads',
        'CRM-Integration der Kontaktdaten',
      ],
      benefits: [
        'Nur relevante Leads, keine Streuverluste',
        'Zeit sparen bei der Recherche',
        'Bessere Conversion durch Vorqualifizierung',
        'Direkter Zugang zu Entscheidern',
      ],
    },
    {
      slug: 'terminqualifizierung',
      title: 'Terminqualifizierung',
      description:
        'Nur qualifizierte Termine mit echten Entscheidern. Jeder Termin wird nach BANT-Kriterien vorqualifiziert.',
      features: [
        'BANT-qualifizierte Termine',
        'Direkte Entscheider-Kontakte',
        'Automatische Terminerinnerungen',
        'Flexible Kalenderintegration (Calendly, etc.)',
      ],
      benefits: [
        'Keine No-Shows durch Vorqualifizierung',
        'Gespräche mit Budget-Verantwortlichen',
        'Höhere Abschlussquote',
        'Effizientere Nutzung Ihrer Zeit',
      ],
    },
    {
      slug: 'reporting',
      title: 'Reporting & Analyse',
      description:
        'Transparente Berichte über alle Vertriebsaktivitäten. Sie sehen genau, was wir tun und welche Ergebnisse wir erzielen.',
      features: [
        'Wöchentliche Aktivitätsreports',
        'KPI-Tracking (Anrufe, Gespräche, Termine)',
        'Conversion-Analysen',
        'Optimierungsvorschläge basierend auf Daten',
      ],
      benefits: [
        'Volle Transparenz über alle Aktivitäten',
        'Datenbasierte Entscheidungen',
        'Kontinuierliche Verbesserung',
        'ROI jederzeit nachvollziehbar',
      ],
    },
  ]

  for (const service of services) {
    await prisma.knowledgeService.create({
      data: {
        slug: service.slug,
        title: service.title,
        description: service.description,
        features: JSON.stringify(service.features),
        benefits: JSON.stringify(service.benefits),
      },
    })
  }
  console.log(`✅ ${services.length} services seeded`)

  // 4. Seed FAQs
  console.log('❓ Seeding FAQs...')
  const faqs = [
    // General
    {
      category: 'general',
      question: 'Was passiert im kostenlosen Erstgespräch?',
      answer:
        'Im 30-minütigen Strategiegespräch analysieren wir Ihr Angebot, Ihre Zielgruppe und Ihren aktuellen Vertriebsprozess. Sie erhalten konkrete Impulse – unabhängig davon, ob wir zusammenarbeiten.',
      priority: 100,
    },
    {
      category: 'general',
      question: 'Für welche Unternehmen ist Carpantier Consulting geeignet?',
      answer:
        'Wir arbeiten mit B2B-Dienstleistern: Agenturen, IT-Dienstleister, Beratungsunternehmen, Softwarefirmen. Nicht geeignet für MLM, Dropshipping oder B2C-Produkte.',
      priority: 95,
    },
    {
      category: 'general',
      question: 'Wie unterscheidet sich Carpantier Consulting von anderen Agenturen?',
      answer:
        'Wir liefern ausschließlich BANT-qualifizierte Termine mit echten Entscheidern. Keine Masse, sondern Qualität. 3+ Jahre Erfahrung in B2B-Akquise und Spezialisierung auf Dienstleister.',
      priority: 90,
    },

    // Pricing
    {
      category: 'pricing',
      question: 'Was kostet die Zusammenarbeit mit Carpantier Consulting?',
      answer:
        'Unsere Preise sind maßgeschneidert auf Ihre Anforderungen. Je nach Volumen und Komplexität gibt es verschiedene Modelle: Pay-per-Lead, Monatspauschale oder Vollservice-Pakete. Details besprechen wir im Erstgespräch.',
      priority: 100,
    },
    {
      category: 'pricing',
      question: 'Gibt es eine Mindestlaufzeit?',
      answer:
        'Wir empfehlen eine Zusammenarbeit von mindestens 3 Monaten, um aussagekräftige Ergebnisse zu erzielen. Es gibt aber keine lange Vertragsbindung.',
      priority: 85,
    },
    {
      category: 'pricing',
      question: 'Wann erreiche ich den ROI?',
      answer:
        'Die meisten unserer Kunden erreichen den ROI nach 2-3 Monaten. Bei einem durchschnittlichen Auftragswert von 5.000€+ rechnet sich die Investition oft schon mit dem ersten gewonnenen Kunden.',
      priority: 80,
    },

    // Process
    {
      category: 'process',
      question: 'Wie läuft das Onboarding ab?',
      answer:
        'Nach dem Erstgespräch analysieren wir Ihr Angebot und Ihre Zielgruppe. Wir erstellen maßgeschneiderte Gesprächsleitfäden, selektieren die Zielgruppe und starten dann mit der Akquise. Das dauert ca. 1 Woche.',
      priority: 100,
    },
    {
      category: 'process',
      question: 'Wie schnell bekomme ich erste Termine?',
      answer:
        'Oft schon in der ersten Woche nach dem Onboarding. Die Anlaufphase beträgt typischerweise 1-2 Wochen, dann läuft die Maschine.',
      priority: 95,
    },
    {
      category: 'process',
      question: 'Wie werden die Termine qualifiziert?',
      answer:
        'Wir nutzen die BANT-Methode: Budget, Authority, Need, Timing. Nur wenn alle Kriterien erfüllt sind, wird ein Termin eingebucht. So stellen wir sicher, dass Sie nur mit echten Interessenten sprechen.',
      priority: 90,
    },
    {
      category: 'process',
      question: 'Wie erhalte ich die Termine?',
      answer:
        'Die Termine werden direkt in Ihren Kalender eingebucht (Calendly-Integration). Sie erhalten alle relevanten Informationen zum Lead vorab per E-Mail.',
      priority: 85,
    },

    // Services
    {
      category: 'services',
      question: 'Was ist der Unterschied zwischen Leadgenerierung und Terminvereinbarung?',
      answer:
        'Leadgenerierung umfasst die Recherche und Qualifizierung potenzieller Kunden. Terminvereinbarung geht einen Schritt weiter: Wir rufen die Leads an und buchen konkrete Gesprächstermine für Sie.',
      priority: 100,
    },
    {
      category: 'services',
      question: 'Macht ihr auch LinkedIn-Akquise?',
      answer:
        'Unser Fokus liegt auf Telefonakquise, da hier die Conversion-Rate am höchsten ist. LinkedIn kann aber als ergänzender Kanal eingesetzt werden.',
      priority: 80,
    },
    {
      category: 'services',
      question: 'Können Sie auch bestehende Leads nachfassen?',
      answer:
        'Ja, wir können auch Ihre bestehenden Leads qualifizieren und Termine vereinbaren. Das ist oft sehr effektiv, da diese Kontakte bereits Interesse gezeigt haben.',
      priority: 75,
    },
  ]

  for (const faq of faqs) {
    await prisma.knowledgeFAQ.create({
      data: faq,
    })
  }
  console.log(`✅ ${faqs.length} FAQs seeded`)

  // 5. Seed Company Info
  console.log('🏢 Seeding company info...')
  const companyInfos = [
    {
      key: 'contact',
      value: JSON.stringify({
        name: 'Carpantier Consulting',
        owner: 'Nico-Luca Carpantier',
        email: 'nico@carpantier-consulting.de',
        phone: '+49 157 38186221',
        address: {
          street: 'Stammheimer Straße 123',
          city: 'Köln',
          postalCode: '50735',
          country: 'Deutschland',
        },
        calendly: 'https://calendly.com/nico-carpantier/30min',
        linkedin: 'https://www.linkedin.com/company/carpantier-consulting',
      }),
    },
    {
      key: 'hours',
      value: JSON.stringify({
        weekdays: '09:00 - 18:00 Uhr',
        saturday: 'Geschlossen',
        sunday: 'Geschlossen',
        note: 'Termine nach Vereinbarung auch außerhalb der Geschäftszeiten möglich.',
      }),
    },
    {
      key: 'about',
      value: JSON.stringify({
        mission:
          'Wir machen Akquise zur strategischen Säule Ihres Unternehmens – planbar, messbar und mit voller Transparenz.',
        story:
          'Carpantier Consulting entstand aus der Erkenntnis, dass viele B2B-Dienstleister ein hervorragendes Angebot haben, aber keine Zeit oder Ressourcen für die Akquise. Mit jahrelanger Erfahrung im B2B-Vertrieb und Recruiting wissen wir, wie man Entscheider erreicht und überzeugt.',
        values: [
          'Ergebnisorientiert - Wir messen uns an Terminen, nicht an Aktivitäten',
          'Partnerschaftlich - Wir sind Teil Ihres Teams',
          'Kontinuierlich - Konstante Schlagzahl für nachhaltige Ergebnisse',
          'Professionell - Jahrelange Erfahrung im B2B-Vertrieb',
        ],
        experience: [
          'B2B-Vertrieb für Dienstleister und Agenturen',
          'Recruiting und Personalberatung',
          'Professionelle Telefonakquise mit hohen Erfolgsquoten',
        ],
      }),
    },
    {
      key: 'process',
      value: JSON.stringify({
        steps: [
          {
            number: 1,
            title: 'Onboarding',
            description:
              'Wir analysieren Ihr Angebot und Ihre Zielgruppe. Gemeinsam entwickeln wir die optimale Akquise-Strategie.',
          },
          {
            number: 2,
            title: 'Setup',
            description:
              'Wir erstellen maßgeschneiderte Gesprächsleitfäden und selektieren Ihre Zielgruppe.',
          },
          {
            number: 3,
            title: 'Akquise-Start',
            description:
              'Unsere erfahrenen Sales-Profis beginnen mit den Gesprächen. Qualifizierte Termine landen direkt in Ihrem Kalender.',
          },
          {
            number: 4,
            title: 'Optimierung',
            description:
              'Basierend auf Feedback und Daten optimieren wir kontinuierlich den Prozess für bessere Ergebnisse.',
          },
        ],
      }),
    },
    {
      key: 'team',
      value: JSON.stringify({
        founder: {
          name: 'Nico-Luca Carpantier',
          title: 'Geschäftsführer',
          experience:
            'Mehrjährige Erfahrung in B2B-Vertrieb und Recruiting. Spezialisiert auf Kaltakquise für Dienstleister und Agenturen.',
        },
      }),
    },
  ]

  for (const info of companyInfos) {
    await prisma.companyInfo.create({
      data: info,
    })
  }
  console.log(`✅ ${companyInfos.length} company info entries seeded`)

  console.log('\n✨ Database seeding completed!')
}

// Helper function to extract key points from content
function extractKeyPoints(content: string): string[] {
  const points: string[] = []

  // Extract headers (## )
  const headerMatches = content.match(/^## .+$/gm)
  if (headerMatches) {
    points.push(...headerMatches.slice(0, 5).map((h) => h.replace('## ', '')))
  }

  // Extract numbered items (1. 2. 3.)
  const numberedMatches = content.match(/^\d+\. \*\*.+\*\*/gm)
  if (numberedMatches) {
    points.push(
      ...numberedMatches.slice(0, 3).map((n) => n.replace(/^\d+\. \*\*/, '').replace('**', ''))
    )
  }

  return points.slice(0, 5)
}

// Map blog category to knowledge category
function mapCategory(category: string): string {
  const mapping: Record<string, string> = {
    'Vertriebsoutsourcing': 'vertrieb',
    'Kaltakquise': 'kaltakquise',
    'Leadgenerierung': 'leadgenerierung',
    'Recht & Compliance': 'rechtliches',
    'Sales Methoden': 'methoden',
    'Vertriebstipps': 'vertrieb',
    'Einwandbehandlung': 'kaltakquise',
    'Gesprächsführung': 'kaltakquise',
  }
  return mapping[category] || 'vertrieb'
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
