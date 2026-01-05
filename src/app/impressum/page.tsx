'use client'

import { PageWrapper } from '@/components/ui'
import { Hero, InfoCards, AdditionalSections } from './components'

export default function ImpressumPage() {
  return (
    <PageWrapper>
      <Hero />
      <section className="section-padding relative">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <InfoCards />
            <AdditionalSections />
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
