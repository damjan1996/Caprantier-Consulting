import { Suspense } from 'react'
import { PageWrapper } from '@/components/ui'
import { Hero, PrivacySections } from './components'

export default function DatenschutzPage() {
  return (
    <PageWrapper>
      <Hero />
      <section className="section-padding relative">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-6">
            <Suspense fallback={<div className="animate-pulse h-96 bg-white/5 rounded-xl" />}>
              <PrivacySections />
            </Suspense>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
