'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'

import nicoConsulting from '@/../public/images/nico-consulting.jpg'

export default function Testimonials() {
  return (
    <section className="section-padding relative bg-white">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image */}
              <div className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden group order-last lg:order-first">
                <div className="relative h-full w-full rounded-2xl overflow-hidden border border-border shadow-lg">
                  <Image
                    src={nicoConsulting}
                    alt="Nico Carpantier - Gründer von Carpantier Consulting, Köln"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    placeholder="blur"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm">
                  Über uns
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-[1.15]">
                  Kein Call-Center.{' '}
                  <span className="text-primary">Ihr externer Vertrieb.</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Ich bin Nico Carpantier, Gründer und Geschäftsführer. Aus Köln heraus unterstütze ich B2B-Dienstleister und inhabergeführte Unternehmen dabei, planbar neue Kunden zu gewinnen.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Kein anonymes Call-Center, kein austauschbares Skript. Bei uns telefoniert ein eingespieltes Team, das Ihr Geschäft versteht und Ihre Sprache spricht. Wie ein eigener Mitarbeiter — nur ohne Recruiting, Onboarding und Führung.
                </p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Köln, Deutschland — bundesweit aktiv</span>
                </div>
                <Link
                  href="/ueber-uns"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline group/link"
                >
                  Mehr über uns erfahren
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
