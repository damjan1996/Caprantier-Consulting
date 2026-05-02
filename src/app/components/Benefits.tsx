'use client'

import { TrendingUp, Calendar, Users, Building2, Briefcase } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'

const SUCCESS_STORIES = [
  {
    icon: Building2,
    industry: 'Mittelständischer Maschinenbauer aus NRW',
    result: '14 qualifizierte Entscheider-Termine in 8 Wochen',
    detail: 'Vorher: Akquise lag brach, Pipeline leer. Nachher: Regelmäßige Termine mit Produktionsleitern und Geschäftsführern.',
  },
  {
    icon: Briefcase,
    industry: 'IT-Dienstleister aus Köln',
    result: '6 Neukunden in 3 Monaten gewonnen',
    detail: 'Hatte zuvor einen Inhouse-Vertriebler, der nicht geliefert hat. Mit uns: Planbar jede Woche neue Gespräche.',
  },
  {
    icon: Users,
    industry: 'Personalvermittlung aus dem Rheinland',
    result: '23 Termine mit HR-Entscheidern in 10 Wochen',
    detail: 'War komplett von Empfehlungen abhängig. Jetzt: Systematischer Zufluss neuer Anfragen.',
  },
  {
    icon: TrendingUp,
    industry: 'SaaS-Anbieter aus Süddeutschland',
    result: 'Abschlussquote von 35% auf gelieferte Termine',
    detail: 'Gutes Produkt, aber kein Vertriebsteam. Wir liefern die Termine — er schließt ab.',
  },
  {
    icon: Calendar,
    industry: 'Unternehmensberatung aus Hamburg',
    result: '5–7 Termine pro Woche nach der Anlaufphase',
    detail: 'Tagesgeschäft hat alles gefressen. Jetzt läuft die Akquise extern — ohne Eigenaufwand.',
  },
]

export default function Benefits() {
  return (
    <section className="section-padding relative bg-gray-50">
      <div className="container-custom">
        <FadeIn className="text-center mb-12 md:mb-16">
          <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
            Ergebnisse
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.15]">
            Das erreichen unsere{' '}
            <span className="text-primary">Kunden</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Echte Ergebnisse, echte Unternehmen. Aus Vertraulichkeitsgründen ohne Firmennamen — die Zahlen sprechen für sich.
          </p>
        </FadeIn>

        {/* Stats Bar */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 md:mb-16">
            {[
              { value: '3–8', label: 'Termine pro Woche' },
              { value: '87%', label: 'Entscheider-Quote' },
              { value: '< 14', label: 'Tage bis zum ersten Termin' },
              { value: '35%+', label: 'Ø Abschlussquote' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white border border-border">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUCCESS_STORIES.slice(0, 3).map((story, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="group h-full p-6 md:p-8 rounded-2xl border border-border bg-white hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                  <story.icon className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-primary mb-2">{story.industry}</p>
                <h3 className="text-lg font-bold text-foreground mb-3">{story.result}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{story.detail}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
          {SUCCESS_STORIES.slice(3).map((story, index) => (
            <FadeIn key={index + 3} delay={(index + 3) * 0.1}>
              <div className="group h-full p-6 md:p-8 rounded-2xl border border-border bg-white hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                  <story.icon className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-primary mb-2">{story.industry}</p>
                <h3 className="text-lg font-bold text-foreground mb-3">{story.result}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{story.detail}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
