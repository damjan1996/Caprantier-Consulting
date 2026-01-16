import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { PageWrapper } from '@/components/ui'
import { Hero, ContactOptions, FAQ } from './components'
import FadeIn from '@/components/ui/FadeIn'

const ContactForm = dynamic(() => import('@/components/sections/ContactForm'), {
  loading: () => <div className="animate-pulse h-96 bg-white/5 rounded-xl" />,
})

export default function KontaktPage() {
  return (
    <PageWrapper>
      <Hero />
      <Suspense fallback={<div className="section-padding" />}>
        <ContactOptions />
      </Suspense>

      {/* Contact Form Section */}
      <section className="section-padding relative">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <FadeIn className="text-center mb-12">
              <span className="inline-block text-primary font-medium tracking-wider uppercase text-sm mb-4">
                Kontaktformular
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Schreiben Sie uns
              </h2>
              <p className="text-muted-foreground">
                Alternativ zum Erstgespräch können Sie uns auch direkt eine Nachricht senden.
              </p>
            </FadeIn>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
              <Suspense fallback={<div className="animate-pulse h-96 bg-white/5 rounded-xl" />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="section-padding" />}>
        <FAQ />
      </Suspense>
    </PageWrapper>
  )
}
