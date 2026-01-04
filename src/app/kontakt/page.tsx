'use client'

import { Mail, MapPin, Phone, Clock, ArrowRight, CheckCircle } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/Button'

const contactInfo = [
  {
    icon: Mail,
    title: 'E-Mail',
    value: 'info@carpantier-consulting.de',
    href: 'mailto:info@carpantier-consulting.de',
  },
  {
    icon: MapPin,
    title: 'Standort',
    value: 'Koeln, Deutschland',
    href: null,
  },
  {
    icon: Clock,
    title: 'Erreichbarkeit',
    value: 'Mo - Fr: 9:00 - 18:00 Uhr',
    href: null,
  },
]

export default function KontaktPage() {
  const openCalendly = () => {
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      (window as any).Calendly.showPopupWidget('https://calendly.com/nico-carpantier-consulting/30min')
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background z-0" />
        <div className="container-custom relative z-10">
          <FadeIn className="text-center max-w-4xl mx-auto">
            <span className="text-primary font-medium tracking-wider uppercase text-sm">
              Kontakt
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Lassen Sie uns{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                sprechen
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Bereit fuer planbare Neukundengewinnung? Buchen Sie jetzt Ihr
              kostenloses Strategiegespraech.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - CTA */}
            <FadeIn>
              <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-white/5 h-full">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Kostenloses Strategiegespraech
                </h2>
                <p className="text-muted-foreground mb-8">
                  In einem 15-minuetigen Gespraech analysieren wir Ihre aktuelle
                  Situation und zeigen Ihnen, wie wir Ihren Kalender mit
                  qualifizierten Terminen fuellen koennen.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Unverbindlich und kostenlos</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Direkt mit dem Experten sprechen</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Erste strategische Impulse</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Keine versteckten Kosten</span>
                  </div>
                </div>

                <Button size="lg" onClick={openCalendly} className="w-full md:w-auto">
                  Termin buchen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-sm text-muted-foreground mt-4">
                  * Limitiert auf 5 neue Partner pro Monat
                </p>
              </div>
            </FadeIn>

            {/* Right Side - Contact Info */}
            <FadeIn delay={0.2}>
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                  Oder kontaktieren Sie uns direkt
                </h2>

                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl border border-white/10 bg-white/5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">
                          {info.title}
                        </h3>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="p-6 rounded-2xl border border-primary/30 bg-primary/10 mt-8">
                  <h3 className="font-semibold text-white mb-2">
                    Schnelle Antwort garantiert
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Wir antworten auf alle Anfragen innerhalb von 24 Stunden an
                    Werktagen.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Mini Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Haben Sie Fragen?
              </h2>
              <p className="text-muted-foreground mb-8">
                Schauen Sie in unserem FAQ-Bereich auf der Startseite nach oder
                kontaktieren Sie uns direkt. Wir helfen Ihnen gerne weiter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" onClick={openCalendly}>
                  <Phone className="mr-2 h-4 w-4" />
                  Gespraech buchen
                </Button>
                <a href="mailto:info@carpantier-consulting.de">
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    E-Mail senden
                  </Button>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
