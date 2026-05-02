import { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'
import { PageWrapper } from '@/components/ui'
import FadeIn from '@/components/ui/FadeIn'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Vertrieb Glossar | B2B Begriffe erklärt | Carpantier Consulting',
  description:
    'Vertrieb Glossar: Alle wichtigen B2B-Begriffe verständlich erklärt. Von Kaltakquise über BANT bis SDR - lernen Sie die Fachbegriffe der Vertriebswelt kennen.',
  keywords: [
    'Vertrieb Glossar',
    'B2B Begriffe',
    'Kaltakquise Definition',
    'BANT Methode',
    'SDR Sales Development',
    'Leadgenerierung erklärt',
    'Vertriebsoutsourcing Definition',
    'Akquise Bedeutung',
  ],
  openGraph: {
    title: 'Vertrieb Glossar | B2B Begriffe erklärt',
    description:
      'Alle wichtigen B2B-Vertriebsbegriffe verständlich erklärt. Von Kaltakquise über BANT bis SDR.',
    url: 'https://carpantier-consulting.de/glossar',
  },
  alternates: {
    canonical: 'https://carpantier-consulting.de/glossar',
  },
}

const glossaryTerms = [
  {
    id: 'akquise',
    term: 'Akquise',
    shortDescription: 'Gewinnung von Neukunden durch aktive Ansprache',
    fullDescription:
      'Akquise bezeichnet alle Maßnahmen zur Gewinnung von Neukunden. Man unterscheidet zwischen Kaltakquise (Ansprache ohne vorherigen Kontakt) und Warmakquise (Kontaktaufnahme mit bereits bekannten Interessenten). Im B2B-Bereich ist die telefonische Akquise nach wie vor eine der effektivsten Methoden.',
    relatedTerms: ['Kaltakquise', 'Warmakquise', 'Leadgenerierung'],
    category: 'Grundlagen',
  },
  {
    id: 'bant',
    term: 'BANT-Methode',
    shortDescription: 'Framework zur Lead-Qualifizierung',
    fullDescription:
      'BANT steht für Budget, Authority, Need und Timing. Es ist eine bewährte Methode zur Qualifizierung von Leads im B2B-Vertrieb. Ein Lead gilt als qualifiziert, wenn er über ausreichend Budget verfügt, die Entscheidungsbefugnis hat, einen konkreten Bedarf aufweist und der Zeitpunkt für einen Kauf passt.',
    relatedTerms: ['Lead-Qualifizierung', 'Sales Qualified Lead'],
    category: 'Methoden',
    blogLink: '/blog/bant-methode-erklaert',
  },
  {
    id: 'b2b',
    term: 'B2B (Business-to-Business)',
    shortDescription: 'Geschäftsbeziehungen zwischen Unternehmen',
    fullDescription:
      'B2B beschreibt Geschäftsbeziehungen zwischen zwei oder mehr Unternehmen, im Gegensatz zu B2C (Business-to-Consumer). Im B2B-Vertrieb sind die Verkaufszyklen typischerweise länger, die Entscheidungsprozesse komplexer und die Auftragswerte höher.',
    relatedTerms: ['B2C', 'Enterprise Sales'],
    category: 'Grundlagen',
  },
  {
    id: 'cold-calling',
    term: 'Cold Calling / Kaltakquise',
    shortDescription: 'Telefonische Erstansprache potenzieller Kunden',
    fullDescription:
      'Cold Calling bezeichnet die telefonische Kontaktaufnahme mit potenziellen Kunden ohne vorherige Geschäftsbeziehung. Im B2B-Bereich ist Kaltakquise unter bestimmten Voraussetzungen erlaubt, wenn ein mutmaßliches Interesse des Unternehmens angenommen werden kann. Professionelle Kaltakquise erfordert gute Vorbereitung, ein überzeugendes Skript und ausgeprägte Kommunikationsfähigkeiten.',
    relatedTerms: ['Akquise', 'Telefonakquise', 'Einwandbehandlung'],
    category: 'Methoden',
    blogLink: '/blog/kaltakquise-rechtliche-grundlagen',
  },
  {
    id: 'crm',
    term: 'CRM (Customer Relationship Management)',
    shortDescription: 'System zur Verwaltung von Kundenbeziehungen',
    fullDescription:
      'Ein CRM-System ist eine Software zur Verwaltung und Analyse von Kundeninteraktionen. Es hilft Vertriebsteams, Leads zu verfolgen, Verkaufschancen zu managen und Kundenbeziehungen zu pflegen. Bekannte CRM-Systeme sind Salesforce, HubSpot und Pipedrive.',
    relatedTerms: ['Pipeline', 'Lead Management'],
    category: 'Tools',
  },
  {
    id: 'decision-maker',
    term: 'Decision Maker / Entscheider',
    shortDescription: 'Person mit Kaufentscheidungsbefugnis',
    fullDescription:
      'Ein Decision Maker ist die Person in einem Unternehmen, die die finale Entscheidung über einen Kauf treffen kann. Im B2B-Vertrieb ist es entscheidend, den richtigen Entscheider zu identifizieren und anzusprechen. Oft gibt es mehrere Stakeholder im Buying Center.',
    relatedTerms: ['Buying Center', 'Gatekeeper', 'BANT'],
    category: 'Grundlagen',
  },
  {
    id: 'einwandbehandlung',
    term: 'Einwandbehandlung',
    shortDescription: 'Professioneller Umgang mit Kundenbedenken',
    fullDescription:
      'Einwandbehandlung bezeichnet Techniken, um auf Bedenken und Einwände potenzieller Kunden professionell zu reagieren. Typische Einwände sind "kein Interesse", "keine Zeit", "zu teuer" oder "wir haben schon einen Anbieter". Eine gute Einwandbehandlung wandelt Einwände in Verkaufschancen um.',
    relatedTerms: ['Kaltakquise', 'Verkaufsgespräch'],
    category: 'Methoden',
    blogLink: '/blog/einwandbehandlung-vertrieb',
  },
  {
    id: 'lead',
    term: 'Lead',
    shortDescription: 'Potenzieller Kunde mit Interesse',
    fullDescription:
      'Ein Lead ist ein potenzieller Kunde, der Interesse an einem Produkt oder einer Dienstleistung gezeigt hat. Leads werden typischerweise nach ihrer Qualität unterschieden: Marketing Qualified Leads (MQL) zeigen erstes Interesse, Sales Qualified Leads (SQL) sind kaufbereit.',
    relatedTerms: ['MQL', 'SQL', 'Lead-Qualifizierung'],
    category: 'Grundlagen',
  },
  {
    id: 'leadgenerierung',
    term: 'Leadgenerierung',
    shortDescription: 'Gewinnung potenzieller Kundeninteressenten',
    fullDescription:
      'Leadgenerierung umfasst alle Maßnahmen zur Gewinnung von Kontaktdaten potenzieller Kunden. Methoden sind u.a. Content Marketing, Social Selling, Kaltakquise, Events und Paid Advertising. Ziel ist es, eine Pipeline mit qualifizierten Interessenten aufzubauen.',
    relatedTerms: ['Lead', 'Pipeline', 'Akquise'],
    category: 'Methoden',
    blogLink: '/blog/leadgenerierung-it-dienstleister',
  },
  {
    id: 'pipeline',
    term: 'Sales Pipeline',
    shortDescription: 'Visuelle Darstellung des Verkaufsprozesses',
    fullDescription:
      'Die Sales Pipeline ist eine visuelle Darstellung aller aktiven Verkaufschancen in verschiedenen Phasen des Verkaufsprozesses. Typische Phasen sind: Lead, Qualifizierung, Angebot, Verhandlung, Abschluss. Eine gut gefüllte Pipeline ist entscheidend für planbaren Umsatz.',
    relatedTerms: ['CRM', 'Forecast', 'Conversion Rate'],
    category: 'Tools',
  },
  {
    id: 'sdr',
    term: 'SDR (Sales Development Representative)',
    shortDescription: 'Vertriebsmitarbeiter für Leadqualifizierung',
    fullDescription:
      'Ein SDR ist ein Vertriebsmitarbeiter, der sich auf die Generierung und Qualifizierung von Leads spezialisiert hat. SDRs führen Erstgespräche, qualifizieren Interessenten nach BANT-Kriterien und übergeben qualifizierte Termine an Account Executives. SDR as a Service ermöglicht Unternehmen, diese Funktion auszulagern.',
    relatedTerms: ['BDR', 'Account Executive', 'Inside Sales'],
    category: 'Rollen',
    blogLink: '/blog/sdr-as-a-service',
  },
  {
    id: 'vertriebsoutsourcing',
    term: 'Vertriebsoutsourcing',
    shortDescription: 'Auslagerung von Vertriebsaktivitäten',
    fullDescription:
      'Vertriebsoutsourcing bezeichnet die Auslagerung von Vertriebsaktivitäten an externe Dienstleister. Vorteile sind Kosteneffizienz, Skalierbarkeit und Zugang zu Expertenwissen. Besonders für KMUs ist Vertriebsoutsourcing eine attraktive Alternative zum Aufbau eines eigenen Vertriebsteams.',
    relatedTerms: ['SDR as a Service', 'Vertriebsagentur'],
    category: 'Strategien',
    blogLink: '/blog/vertrieb-auslagern-kosten-vorteile',
  },
  {
    id: 'warmakquise',
    term: 'Warmakquise',
    shortDescription: 'Kontaktaufnahme mit bekannten Interessenten',
    fullDescription:
      'Warmakquise bezeichnet die Kontaktaufnahme mit Personen, zu denen bereits eine Verbindung besteht - sei es durch vorherige Gespräche, Empfehlungen, Website-Besuche oder Event-Teilnahmen. Die Erfolgsquote bei Warmakquise ist typischerweise höher als bei Kaltakquise.',
    relatedTerms: ['Kaltakquise', 'Lead Nurturing'],
    category: 'Methoden',
  },
  {
    id: 'buying-center',
    term: 'Buying Center',
    shortDescription: 'Gruppe von Entscheidungsbeteiligten',
    fullDescription:
      'Das Buying Center umfasst alle Personen in einem Unternehmen, die am Kaufentscheidungsprozess beteiligt sind. Typische Rollen sind: Initiator, Beeinflusser, Entscheider, Einkäufer und Nutzer. Im B2B-Vertrieb ist es wichtig, alle relevanten Stakeholder zu identifizieren und anzusprechen.',
    relatedTerms: ['Decision Maker', 'Stakeholder'],
    category: 'Grundlagen',
  },
  {
    id: 'conversion-rate',
    term: 'Conversion Rate',
    shortDescription: 'Umwandlungsrate im Vertriebsprozess',
    fullDescription:
      'Die Conversion Rate misst, wie viele Leads oder Interessenten in die nächste Phase des Vertriebsprozesses oder zu Kunden konvertiert werden. Eine typische Lead-to-Customer Conversion Rate im B2B liegt bei 2-5%. Die Optimierung der Conversion Rate ist ein wichtiger Hebel für mehr Umsatz.',
    relatedTerms: ['Pipeline', 'KPIs', 'Forecast'],
    category: 'Metriken',
  },
]

const categories = [...new Set(glossaryTerms.map((term) => term.category))].sort()

// Generate DefinedTermSet Schema
function generateGlossarySchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'B2B Vertrieb Glossar',
    description: 'Glossar mit wichtigen Begriffen aus dem B2B-Vertrieb und der Kundenakquise',
    url: 'https://carpantier-consulting.de/glossar',
    hasDefinedTerm: glossaryTerms.map((item) => ({
      '@type': 'DefinedTerm',
      name: item.term,
      description: item.fullDescription,
      url: `https://carpantier-consulting.de/glossar#${item.id}`,
    })),
  }
}

export default function GlossarPage() {
  const glossarySchema = generateGlossarySchema()

  return (
    <PageWrapper>
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossarySchema) }}
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <FadeIn className="mb-6">
            <Breadcrumbs items={[{ label: 'Glossar' }]} />
          </FadeIn>

          <FadeIn className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-foreground mb-6">
              <BookOpen className="h-4 w-4 text-primary" />
              Vertrieb Glossar
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.15]">
              B2B-Vertriebsbegriffe{' '}
              <span className="text-primary">
                einfach erklärt
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Von Akquise bis Vertriebsoutsourcing - alle wichtigen Fachbegriffe der
              B2B-Vertriebswelt verständlich erklärt.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="pb-8">
        <div className="container-custom">
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <a
                  key={category}
                  href={`#${category.toLowerCase()}`}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-muted text-muted-foreground border border-border transition-all hover:bg-muted hover:text-foreground hover:border-primary/30"
                >
                  {category}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="section-padding pt-8">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {categories.map((category, categoryIndex) => (
              <FadeIn key={category} delay={categoryIndex * 0.1}>
                <div id={category.toLowerCase()} className="mb-12 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="h-8 w-1 bg-primary rounded-full" />
                    {category}
                  </h2>
                  <div className="space-y-4">
                    {glossaryTerms
                      .filter((term) => term.category === category)
                      .map((item) => (
                        <div
                          key={item.id}
                          id={item.id}
                          className="group p-6 rounded-2xl border border-border bg-white hover:bg-muted hover:border-primary/30 transition-all scroll-mt-24"
                        >
                          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {item.term}
                          </h3>
                          <p className="text-primary text-sm font-medium mb-3">
                            {item.shortDescription}
                          </p>
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            {item.fullDescription}
                          </p>
                          <div className="flex flex-wrap items-center gap-4">
                            {item.relatedTerms && item.relatedTerms.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                <span className="text-xs text-muted-foreground">Verwandte Begriffe:</span>
                                {item.relatedTerms.map((related) => (
                                  <span
                                    key={related}
                                    className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full"
                                  >
                                    {related}
                                  </span>
                                ))}
                              </div>
                            )}
                            {item.blogLink && (
                              <Link
                                href={item.blogLink}
                                className="inline-flex items-center gap-1 text-sm text-primary hover:underline ml-auto"
                              >
                                Mehr erfahren
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <FadeIn className="max-w-3xl mx-auto text-center">
            <div className="p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                Vertrieb in der Praxis erleben?
              </h2>
              <p className="text-muted-foreground mb-6">
                Erfahren Sie in einem kostenlosen Strategiegespräch, wie wir diese Konzepte für
                Ihr Unternehmen umsetzen.
              </p>
              <Link
                href="/kontakt"
                className="btn-primary inline-flex items-center gap-2"
              >
                Kostenlos beraten lassen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  )
}
