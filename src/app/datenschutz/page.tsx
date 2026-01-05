'use client'

import { PageWrapper } from '@/components/ui'
import { Hero, PrivacySections } from './components'

export default function DatenschutzPage() {
  return (
    <PageWrapper>
      <Hero />
      <section className="section-padding relative">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-6">
            <PrivacySections />
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
