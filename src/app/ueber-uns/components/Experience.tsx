'use client'

import { Briefcase, Users, Phone } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { DecorativeParticles } from '@/components/ui'

const experience = [
  {
    icon: Briefcase,
    title: 'B2B-Vertrieb',
    description: 'Umfassende Erfahrung in der Neukundengewinnung für Dienstleister und Agenturen.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    icon: Users,
    title: 'Recruiting',
    description: 'Tiefes Verständnis für Gesprächsführung und Bedarfsanalyse aus dem Recruiting-Bereich.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    icon: Phone,
    title: 'Telefonakquise',
    description: 'Professionelle Kaltakquise mit erprobten Methoden und hoher Abschlussquote.',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
]

export default function Experience() {
  return (
    <section className="section-padding relative">
      <DecorativeParticles
        particles={[
          { position: 'top-20 left-1/4', size: 'lg', color: 'bg-blue-400/30', animation: 'pulse', duration: '3s' },
          { position: 'bottom-1/4 right-1/5', size: 'sm', color: 'bg-purple-400/40', animation: 'ping', duration: '4s' },
        ]}
      />

      <div className="container-custom">
        <FadeIn className="text-center mb-16">
          <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
            Expertise
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.15]">
            Jahrelange{' '}
            <span className="text-primary">
              Erfahrung
            </span>{' '}
            in
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {experience.map((item, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="group p-8 rounded-2xl border border-border bg-white text-center h-full transition-all duration-500 hover:bg-muted hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 cursor-default">
                <div className={`h-14 w-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110`}>
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
