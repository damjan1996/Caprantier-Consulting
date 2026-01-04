import { Metadata } from 'next'
import Image from 'next/image'
import { Target, Users, TrendingUp, Award, Phone, Briefcase } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import CTA from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'Über uns',
  description: 'Erfahren Sie mehr über Carpantier Consulting - Ihr Partner für professionelle B2B-Telefonakquise und Leadgenerierung aus Köln.',
  openGraph: {
    title: 'Über uns | Carpantier Consulting',
    description: 'Ihr Partner für professionelle B2B-Telefonakquise und Leadgenerierung.',
  },
}

const values = [
  {
    icon: Target,
    title: 'Ergebnisorientiert',
    description: 'Wir messen uns an den Terminen, die wir liefern - nicht an Aktivitäten.',
  },
  {
    icon: Users,
    title: 'Partnerschaftlich',
    description: 'Wir arbeiten als Teil Ihres Teams und repräsentieren Ihre Marke.',
  },
  {
    icon: TrendingUp,
    title: 'Kontinuierlich',
    description: 'Konstante Schlagzahl statt einmaliger Aktionen für nachhaltige Ergebnisse.',
  },
  {
    icon: Award,
    title: 'Professionell',
    description: 'Jahrelange Erfahrung im B2B-Vertrieb und Recruiting.',
  },
]

const experience = [
  {
    icon: Briefcase,
    title: 'B2B-Vertrieb',
    description: 'Umfassende Erfahrung in der Neukundengewinnung für Dienstleister und Agenturen.',
  },
  {
    icon: Users,
    title: 'Recruiting',
    description: 'Tiefes Verständnis für Gesprächsführung und Bedarfsanalyse aus dem Recruiting-Bereich.',
  },
  {
    icon: Phone,
    title: 'Telefonakquise',
    description: 'Professionelle Kaltakquise mit erprobten Methoden und hoher Abschlussquote.',
  },
]

export default function UeberUnsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background z-0" />
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <span className="text-primary font-medium tracking-wider uppercase text-sm">
                Über uns
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
                B2B-Akquise ist unsere{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Leidenschaft
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Bei Carpantier Consulting verbinden wir jahrelange Erfahrung im
                B2B-Vertrieb und Recruiting mit dem Ziel, Agenturen und
                IT-Dienstleistern planbare Neukundengewinnung zu ermöglichen.
              </p>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-primary">
                  <Image
                    src="/images/nico-portrait.png"
                    alt="Nico Carpantier"
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <div className="font-semibold text-white">Nico Carpantier</div>
                  <div className="text-sm text-muted-foreground">
                    Geschäftsführer & Sales Consultant
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} direction="right">
              <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10">
                <Image
                  src="/images/nico-portrait.png"
                  alt="Nico Carpantier - B2B Sales Consultant"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Unsere Geschichte
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  Carpantier Consulting entstand aus einer einfachen Erkenntnis:
                  Die meisten Agenturen und IT-Dienstleister haben ein
                  hervorragendes Angebot, aber keine Zeit oder Ressourcen für
                  systematische Akquise.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Mit jahrelanger Erfahrung im B2B-Vertrieb - von der
                  Personalberatung bis zur direkten Kundenakquise - wissen wir,
                  wie wichtig eine konstante Pipeline qualifizierter Leads ist.
                  Diese Expertise bringen wir nun gezielt für unsere Partner ein.
                </p>
                <p className="text-lg text-muted-foreground">
                  Unser Ansatz: Wir übernehmen nicht nur die Akquise, sondern
                  werden zum erweiterten Teil Ihres Teams. Professionell,
                  zuverlässig und mit dem klaren Fokus auf messbare Ergebnisse.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <FadeIn className="text-center mb-12">
            <span className="text-primary font-medium tracking-wider uppercase text-sm">
              Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
              Jahrelange Erfahrung in
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {experience.map((item, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 text-center h-full">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <FadeIn className="text-center mb-12">
            <span className="text-primary font-medium tracking-wider uppercase text-sm">
              Unsere Werte
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
              Wofür wir stehen
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 h-full">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Unsere Mission
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Wir machen Akquise zur strategischen Säule Ihres Unternehmens -
                planbar, messbar und mit voller Transparenz. Damit Sie sich auf
                das konzentrieren können, was Sie am besten können: Ihre Kunden
                betreuen und Ihr Geschäft ausbauen.
              </p>
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-6 py-3 text-primary">
                Limitiert auf 5 neue Partner pro Monat
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
