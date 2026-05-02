'use client'

import { Mail, MapPin, Clock, ArrowRight, CheckCircle, Zap } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/Button'
import { DecorativeParticles } from '@/components/ui'
import { useCalendly } from '@/hooks/useCalendly'

const contactInfo = [
  {
    icon: Mail,
    title: 'E-Mail',
    value: 'info@carpantier-consulting.de',
    href: 'mailto:info@carpantier-consulting.de',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    bgHover: 'group-hover:bg-blue-400/20',
    borderHover: 'hover:border-blue-400/40',
    shadow: 'hover:shadow-blue-500/10',
  },
  {
    icon: MapPin,
    title: 'Standort',
    value: 'Köln, Deutschland',
    href: null,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    bgHover: 'group-hover:bg-purple-400/20',
    borderHover: 'hover:border-purple-400/40',
    shadow: 'hover:shadow-purple-500/10',
  },
  {
    icon: Clock,
    title: 'Erreichbarkeit',
    value: 'Mo - Fr: 9:00 - 18:00 Uhr',
    href: null,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    bgHover: 'group-hover:bg-green-400/20',
    borderHover: 'hover:border-green-400/40',
    shadow: 'hover:shadow-green-500/10',
  },
]

const benefits = [
  { text: 'Unverbindlich und kostenlos', color: 'text-green-400' },
  { text: 'Direkt mit dem Experten sprechen', color: 'text-blue-400' },
  { text: 'Erste strategische Impulse', color: 'text-purple-400' },
  { text: 'Keine versteckten Kosten', color: 'text-orange-400' },
]

export default function ContactOptions() {
  const { openCalendly, onHover } = useCalendly()

  return (
    <section className="section-padding relative">
      <DecorativeParticles preset="section" />

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - CTA Card */}
          <FadeIn>
            <div className="group p-8 md:p-10 rounded-3xl border border-border bg-white h-full transition-all duration-500 hover:bg-muted hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  <Zap className="h-6 w-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Kostenloses Strategiegespräch
                </h2>
              </div>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                In einem 15-minütigen Gespräch analysieren wir Ihre aktuelle
                Situation und zeigen Ihnen, wie wir Ihren Kalender mit
                qualifizierten Terminen füllen können.
              </p>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="group/item flex items-center gap-3 text-foreground cursor-default">
                    <CheckCircle className={`h-5 w-5 ${benefit.color} transition-transform duration-300 group-hover/item:scale-110`} />
                    <span className="transition-colors duration-300 group-hover/item:text-foreground/90">{benefit.text}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" onClick={() => openCalendly()} onMouseEnter={onHover} className="w-full md:w-auto group/btn">
                Termin buchen
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>

              <p className="text-sm text-muted-foreground mt-4 flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse"></span>
                Limitiert auf 5 neue Partner pro Monat
              </p>
            </div>
          </FadeIn>

          {/* Right Side - Contact Info */}
          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                Oder kontaktieren Sie uns{' '}
                <span className="text-primary">
                  direkt
                </span>
              </h2>

              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl border border-border bg-white transition-all duration-500 hover:bg-muted ${info.borderHover} hover:shadow-xl ${info.shadow} hover:-translate-y-1 cursor-default`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-xl ${info.bg} ${info.bgHover} ${info.color} flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110`}>
                      <info.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                      {info.href ? (
                        <a href={info.href} className="text-muted-foreground hover:text-foreground transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="group p-6 rounded-2xl border border-primary/30 bg-primary/10 transition-all duration-500 hover:bg-primary/20 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 cursor-default">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/30">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Schnelle Antwort garantiert</h3>
                    <p className="text-sm text-muted-foreground">
                      Wir antworten auf alle Anfragen innerhalb von 24 Stunden an Werktagen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
