import { Metadata } from 'next'
import { Phone, Target, BarChart3, Users, CheckCircle, ArrowRight, Zap, Shield, Clock } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import CTA from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'Leistungen',
  description: 'Unsere B2B-Akquise-Dienstleistungen: Telefonakquise, Leadgenerierung, Terminqualifizierung und strategisches Reporting fuer Agenturen und IT-Dienstleister.',
  openGraph: {
    title: 'Leistungen | Carpantier Consulting',
    description: 'Professionelle B2B-Telefonakquise und Leadgenerierung fuer Ihren Erfolg.',
  },
}

const services = [
  {
    icon: Phone,
    title: 'Telefonakquise',
    description: 'Professionelle Kaltakquise durch erfahrene Sales-Experten. Wir sprechen mit Entscheidern auf Augenhoehe.',
    features: [
      'Individuelle Gespraechsleitfaeden',
      'Branchenspezifische Ansprache',
      'Kontinuierliche Optimierung',
      'Erfahrene B2B-Vertriebsprofis',
    ],
  },
  {
    icon: Target,
    title: 'Leadgenerierung',
    description: 'Zielgenaue Identifikation und Ansprache Ihrer idealen Kunden nach massgeschneiderten Kriterien.',
    features: [
      'Praezise Zielgruppenselektion',
      'Datenqualifizierung',
      'BANT-Methode',
      'CRM-Integration',
    ],
  },
  {
    icon: Users,
    title: 'Terminqualifizierung',
    description: 'Nur qualifizierte Termine mit echten Entscheidern, die Interesse und Budget haben.',
    features: [
      'Vorqualifizierte Leads',
      'Entscheider-Kontakte',
      'Terminerinnerungen',
      'Flexible Kalenderintegration',
    ],
  },
  {
    icon: BarChart3,
    title: 'Reporting & Analyse',
    description: 'Transparente Berichte ueber alle Aktivitaeten und Ergebnisse. Volle Kontrolle fuer Sie.',
    features: [
      'Woechentliche Reports',
      'KPI-Tracking',
      'Conversion-Analysen',
      'Optimierungsvorschlaege',
    ],
  },
]

const process = [
  {
    step: '01',
    title: 'Onboarding',
    description: 'Wir analysieren Ihr Angebot, Ihre Zielgruppe und entwickeln die optimale Akquise-Strategie.',
  },
  {
    step: '02',
    title: 'Setup',
    description: 'Erstellung massgeschneiderter Gespraechsleitfaeden und Selektion der Zielgruppe.',
  },
  {
    step: '03',
    title: 'Akquise-Start',
    description: 'Wir beginnen mit den Gespraechen und liefern qualifizierte Termine in Ihren Kalender.',
  },
  {
    step: '04',
    title: 'Optimierung',
    description: 'Kontinuierliche Verbesserung der Prozesse basierend auf Feedback und Ergebnissen.',
  },
]

export default function LeistungenPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background z-0" />
        <div className="container-custom relative z-10">
          <FadeIn className="text-center max-w-4xl mx-auto">
            <span className="text-primary font-medium tracking-wider uppercase text-sm">
              Unsere Leistungen
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              B2B-Akquise, die{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Ergebnisse
              </span>{' '}
              liefert
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Von der Strategie bis zum qualifizierten Termin - wir uebernehmen
              Ihre komplette Akquise und fuellen Ihren Kalender mit Entscheidern.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-white/5 h-full hover:bg-white/10 transition-all duration-300">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3 text-sm text-white/80"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <FadeIn className="text-center mb-16">
            <span className="text-primary font-medium tracking-wider uppercase text-sm">
              Der Ablauf
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
              So starten wir zusammen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ein strukturierter Prozess fuer maximale Ergebnisse.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <FadeIn key={index} delay={index * 0.15}>
                <div className="relative p-6 rounded-2xl border border-white/10 bg-white/5 h-full">
                  <span className="text-5xl font-bold text-primary/20 absolute top-4 right-4">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3 relative z-10">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm relative z-10">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <span className="text-primary font-medium tracking-wider uppercase text-sm">
                Warum wir?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
                Erfahrung, die den Unterschied macht
              </h2>
              <p className="text-muted-foreground mb-8">
                Jahrelange Erfahrung im B2B-Vertrieb und Recruiting. Wir wissen,
                wie man mit Entscheidern spricht und Termine vereinbart, die zu
                Abschluessen fuehren.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Schnelle Ergebnisse</h4>
                    <p className="text-sm text-muted-foreground">
                      Erste Termine oft schon in der ersten Woche
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Kein Risiko</h4>
                    <p className="text-sm text-muted-foreground">
                      Transparente Zusammenarbeit ohne versteckte Kosten
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Zeitersparnis</h4>
                    <p className="text-sm text-muted-foreground">
                      Fokussieren Sie sich auf Ihr Kerngeschaeft
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} direction="right">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">3+</div>
                  <div className="text-sm text-muted-foreground">Jahre Erfahrung</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">B2B-Fokus</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">5</div>
                  <div className="text-sm text-muted-foreground">Partner/Monat</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">BANT</div>
                  <div className="text-sm text-muted-foreground">Qualifizierung</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
