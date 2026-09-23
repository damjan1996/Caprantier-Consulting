import { Suspense } from 'react'
import PageWrapper from '@/components/ui/PageWrapper'
import Hero from './_components/Hero'
import InfoCards from './_components/InfoCards'
import AdditionalSections from './_components/AdditionalSections'

export default function ImpressumPage() {
  return (
    <PageWrapper>
      <Hero />
      <section className="section-padding relative">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Suspense fallback={<div className="animate-pulse h-48 bg-white/5 rounded-xl" />}>
              <InfoCards />
            </Suspense>
            <Suspense fallback={<div className="animate-pulse h-48 bg-white/5 rounded-xl mt-8" />}>
              <AdditionalSections />
            </Suspense>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
