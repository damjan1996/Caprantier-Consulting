import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Users, Calendar, Target, CheckCircle } from 'lucide-react'
import { PageWrapper } from '@/components/ui'
import FadeIn from '@/components/ui/FadeIn'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Erfolgsgeschichten | Case Studies B2B Vertrieb | Carpantier Consulting',
  description:
    'Echte Erfolgsgeschichten unserer Kunden: Wie IT-Dienstleister, Agenturen und Beratungen mit unserer Vertriebsunterstützung planbar Neukunden gewinnen.',
  keywords: [
    'Case Studies Vertrieb',
    'Erfolgsgeschichten B2B',
    'Vertriebsagentur Erfahrungen',
    'Leadgenerierung Erfolge',
    'Kaltakquise Resultate',
    'Vertriebsoutsourcing Beispiele',
  ],
  openGraph: {
    title: 'Erfolgsgeschichten | Case Studies B2B Vertrieb',
    description:
      'Echte Erfolgsgeschichten: Wie unsere Kunden planbar Neukunden gewinnen.',
    url: 'https://carpantier-consulting.de/case-studies',
  },
  alternates: {
    canonical: 'https://carpantier-consulting.de/case-studies',
  },
}

const caseStudies = [
  {
    id: 'webtech-solutions',
    company: 'WebTech Solutions GmbH',
    industry: 'IT-Dienstleister',
    location: 'Köln',
    challenge:
      'Keine Zeit für Akquise neben dem Tagesgeschäft. Unregelmäßiger Neukundenzufluss gefährdete das Wachstum.',
    solution:
      'Übernahme der kompletten Kaltakquise durch Carpantier. Fokussierte Ansprache von mittelständischen Unternehmen im IT-Beratungssegment.',
    results: [
      { metric: '12', label: 'Qualifizierte Termine', period: 'in 3 Monaten' },
      { metric: '4', label: 'Neukunden gewonnen', period: 'im ersten Quartal' },
      { metric: '340%', label: 'ROI', period: 'Return on Investment' },
    ],
    quote:
      'Carpantier Consulting hat unseren Vertrieb transformiert. Endlich können wir uns auf das konzentrieren, was wir am besten können - unsere Kunden beraten.',
    author: 'Michael Weber',
    role: 'Geschäftsführer',
    color: 'from-blue-500/20 to-blue-600/10',
    borderColor: 'border-blue-500/30',
  },
  {
    id: 'digital-first-agency',
    company: 'Digital First Agency',
    industry: 'Marketing-Agentur',
    location: 'Düsseldorf',
    challenge:
      'Starke Abhängigkeit von Empfehlungen und Bestandskunden. Wachstum nur durch aktive Akquise möglich.',
    solution:
      'Entwicklung einer gezielten Akquise-Strategie für E-Commerce-Unternehmen. Regelmäßige Outbound-Kampagnen mit qualifizierten Terminen.',
    results: [
      { metric: '8', label: 'Termine pro Monat', period: 'konstant' },
      { metric: '25%', label: 'Conversion Rate', period: 'Termin zu Kunde' },
      { metric: '6', label: 'Wochen', period: 'bis zum ersten Deal' },
    ],
    quote:
      'Endlich planbarer Vertrieb! Wir wissen jetzt genau, wie viele Kunden wir pro Monat erwarten können.',
    author: 'Sandra Müller',
    role: 'Inhaberin',
    color: 'from-purple-500/20 to-purple-600/10',
    borderColor: 'border-purple-500/30',
  },
  {
    id: 'schneider-consulting',
    company: 'Schneider IT Consulting',
    industry: 'IT-Beratung',
    location: 'Frankfurt',
    challenge:
      'Als Einzelunternehmer keine Kapazität für systematische Akquise. Projektpausen bedeuteten Umsatzeinbrüche.',
    solution:
      'SDR as a Service: Komplette Übernahme der Leadgenerierung und Terminvereinbarung. BANT-qualifizierte Termine mit Entscheidern.',
    results: [
      { metric: '2', label: 'Monate', period: 'bis ROI erreicht' },
      { metric: '15', label: 'Gespräche', period: 'mit Entscheidern' },
      { metric: '3', label: 'Neukunden', period: 'in 2 Monaten' },
    ],
    quote:
      'Als Einzelunternehmer hatte ich keine Zeit für Vertrieb. Carpantier ermöglicht mir, mich auf mein Kerngeschäft zu konzentrieren.',
    author: 'Thomas Schneider',
    role: 'Inhaber',
    color: 'from-green-500/20 to-green-600/10',
    borderColor: 'border-green-500/30',
  },
]

const stats = [
  { value: '50+', label: 'Qualifizierte Termine', icon: Calendar },
  { value: '15+', label: 'Zufriedene Kunden', icon: Users },
  { value: '95%', label: 'Weiterempfehlungsrate', icon: Target },
  { value: '300%', label: 'Durchschnittlicher ROI', icon: TrendingUp },
]

export default function CaseStudiesPage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <FadeIn className="mb-6">
            <Breadcrumbs items={[{ label: 'Case Studies' }]} />
          </FadeIn>

          <FadeIn className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-foreground mb-6">
              <TrendingUp className="h-4 w-4 text-primary" />
              Erfolgsgeschichten
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.15]">
              Echte Ergebnisse,{' '}
              <span className="text-primary">
                echte Kunden
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Erfahren Sie, wie IT-Dienstleister, Agenturen und Beratungen mit unserer
              Vertriebsunterstützung planbar Neukunden gewinnen.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pb-12">
        <div className="container-custom">
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl border border-border bg-white text-center"
                >
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding pt-8">
        <div className="container-custom">
          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <FadeIn key={study.id} delay={index * 0.1}>
                <div
                  className={`p-8 md:p-10 rounded-3xl border ${study.borderColor} bg-gradient-to-br ${study.color}`}
                >
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Side - Info */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                          {study.industry}
                        </span>
                        <span className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                          {study.location}
                        </span>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                        {study.company}
                      </h2>

                      <div className="space-y-4 mb-6">
                        <div>
                          <h3 className="text-sm font-semibold text-primary mb-2">
                            Herausforderung
                          </h3>
                          <p className="text-muted-foreground">{study.challenge}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-primary mb-2">Lösung</h3>
                          <p className="text-muted-foreground">{study.solution}</p>
                        </div>
                      </div>

                      {/* Quote */}
                      <blockquote className="border-l-2 border-primary/50 pl-4 italic text-muted-foreground mb-4">
                        &ldquo;{study.quote}&rdquo;
                      </blockquote>
                      <div className="text-sm text-muted-foreground">
                        <span className="text-foreground font-medium">{study.author}</span>,{' '}
                        {study.role}
                      </div>
                    </div>

                    {/* Right Side - Results */}
                    <div className="flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        Ergebnisse
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {study.results.map((result, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-muted border border-border text-center"
                          >
                            <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                              {result.metric}
                            </div>
                            <div className="text-sm text-foreground font-medium">
                              {result.label}
                            </div>
                            <div className="text-xs text-muted-foreground">{result.period}</div>
                          </div>
                        ))}
                      </div>
                    </div>
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
                Ihre Erfolgsgeschichte beginnt hier
              </h2>
              <p className="text-muted-foreground mb-6">
                Erfahren Sie in einem kostenlosen Strategiegespräch, wie wir auch Ihren Vertrieb
                auf das nächste Level bringen.
              </p>
              <Link href="/kontakt" className="btn-primary inline-flex items-center gap-2">
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
