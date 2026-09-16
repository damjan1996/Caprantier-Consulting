import { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight, Scale } from 'lucide-react'
import { PageWrapper } from '@/components/ui'
import FadeIn from '@/components/ui/FadeIn'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import AiContentNotice from '@/components/ui/AiContentNotice'
import { glossarBegriffe, glossarKategorien } from '@/lib/glossar-content'

/**
 * Datum der letzten redaktionellen Prüfung der Begriffserklärungen.
 * Bei inhaltlichen Änderungen mitpflegen — der KI-Hinweis zeigt es an.
 */
const LAST_REVIEWED = '2026-08-21'

export const metadata: Metadata = {
  title: 'Vertrieb Glossar | B2B Begriffe erklärt',
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



/*
 * Begriffe und Kategorien liegen seit dem 15.09.2026 in
 * `src/lib/glossar-content.ts`: Dieselben Texte erscheinen hier, im
 * `DefinedTermSet`-Markup und in der Kurzliste auf `/wissen`.
 */
const glossaryTerms = glossarBegriffe
const categories = glossarKategorien

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

          {/* Transparenzhinweis nach Art. 50 Abs. 4 KI-VO */}
          <FadeIn delay={0.05} className="max-w-3xl mx-auto mt-8">
            <AiContentNotice
              subject="Die Begriffserklärungen auf dieser Seite"
              reviewedOn={LAST_REVIEWED}
            />
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

      {/* Rechtlicher Hinweis: Einzelne Einträge geben Rechtsnormen wieder
          (z. B. § 7 UWG). Die Wiedergabe ist keine Rechtsdienstleistung im
          Sinne des § 2 RDG — der Hinweis stellt das ausdrücklich klar. */}
      <section className="pb-8">
        <div className="container-custom">
          <FadeIn className="max-w-4xl mx-auto">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/60 p-4 text-sm text-muted-foreground">
              <Scale className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <p className="leading-relaxed">
                <strong className="font-medium text-foreground">Kein Rechtsrat:</strong> Einzelne
                Erklärungen geben Rechtsvorschriften in vereinfachter Form wieder. Sie dienen der
                allgemeinen Information, ersetzen keine Rechtsberatung im Einzelfall und stellen
                keine Rechtsdienstleistung dar. Für Ihren konkreten Fall wenden Sie sich bitte an
                eine Rechtsanwältin oder einen Rechtsanwalt.
              </p>
            </div>
          </FadeIn>
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
