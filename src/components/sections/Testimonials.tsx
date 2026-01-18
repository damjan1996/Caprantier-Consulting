'use client'

import { useState } from 'react'
import { Quote, ChevronLeft, ChevronRight, Star, MapPin } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { cn } from '@/lib/utils'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Michael Weber',
    role: 'Geschäftsführer',
    company: 'WebTech Solutions GmbH',
    location: 'Köln',
    rating: 5,
    text: 'Carpantier Consulting hat unsere Erwartungen übertroffen. Innerhalb von 3 Monaten hatten wir 12 qualifizierte Termine mit Entscheidern, von denen 4 zu Neukunden wurden. Die Zusammenarbeit war professionell und erstklassig.',
  },
  {
    id: 2,
    name: 'Sandra Müller',
    role: 'Head of Sales',
    company: 'Digital First Agency',
    location: 'Düsseldorf',
    rating: 5,
    text: 'Endlich planbare Akquise! Wir haben jahrelang versucht, selbst Kaltakquise zu machen - ohne Erfolg. Mit Carpantier haben wir jetzt einen konstanten Strom an qualifizierten Leads. Das Team versteht unser Geschäft und liefert Neukunden.',
  },
  {
    id: 3,
    name: 'Thomas Schneider',
    role: 'Inhaber',
    company: 'Schneider IT Consulting',
    location: 'Frankfurt',
    rating: 5,
    text: 'Als Einzelunternehmer hatte ich keine Zeit für Akquise. Carpantier hat mir ermöglicht, mich auf mein Kerngeschäft zu konzentrieren, während sie die Pipeline füllen. ROI nach 2 Monaten erreicht. Absolute Empfehlung!',
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background decoration - prozentbasierte Positionen für Mobile */}
      <div className="absolute top-1/4 right-[5%] w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-1/3 left-[8%] w-1 h-1 bg-blue-400/30 rounded-full animate-ping" style={{ animationDuration: '4s' }} />

      <div className="container-custom">
        <FadeIn className="text-center mb-12">
          <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
            Kundenstimmen
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.15]">
            Was unsere{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              Kunden
            </span>{' '}
            sagen
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Erfahren Sie, wie wir Unternehmen dabei helfen, planbar neue Kunden zu gewinnen.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="max-w-4xl mx-auto">
            {/* Main testimonial card */}
            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
              {/* Quote icon */}
              <div className="absolute -top-6 left-8 h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Quote className="h-6 w-6 text-primary" />
              </div>

              {/* Content */}
              <div className="pt-4">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>

                {/* Text */}
                <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
                  &ldquo;{TESTIMONIALS[activeIndex].text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 border border-white/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">
                      {TESTIMONIALS[activeIndex].name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {TESTIMONIALS[activeIndex].name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {TESTIMONIALS[activeIndex].role}, {TESTIMONIALS[activeIndex].company}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {TESTIMONIALS[activeIndex].location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="absolute bottom-8 right-8 flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="h-10 w-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Vorheriges Testimonial"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="h-10 w-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Nächstes Testimonial"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    index === activeIndex
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  )}
                  aria-label={`Testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
