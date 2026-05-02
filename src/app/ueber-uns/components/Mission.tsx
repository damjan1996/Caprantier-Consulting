'use client'

import { CheckCircle } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { DecorativeParticles } from '@/components/ui'

export default function Mission() {
  return (
    <section className="section-padding relative">
      <DecorativeParticles
        particles={[
          { position: 'top-1/4 left-1/4', size: 'lg', color: 'bg-primary/50', animation: 'ping', duration: '3s' },
          { position: 'bottom-1/3 right-1/4', size: 'sm', color: 'bg-blue-400/40', animation: 'pulse', duration: '2.5s' },
        ]}
      />

      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
              Unsere Mission
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.15]">
              Akquise als{' '}
              <span className="text-primary">
                strategische Säule
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Inhabergeführte B2B-Unternehmen brauchen keine Videokurse oder
              noch einen Vertriebler, der nicht liefert. Sie brauchen einen
              bewiesenen Prozess, der qualifizierte Gespräche planbar und
              messbar in ihren Kalender bringt - damit sie sich auf ihr
              Kerngeschäft konzentrieren können.
            </p>
            <div className="group inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-6 py-3 text-primary cursor-default transition-all duration-300 hover:border-primary/50 hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/20">
              <CheckCircle className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
              Wir arbeiten mit max. 5 Kunden gleichzeitig
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
