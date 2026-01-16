import { Suspense } from 'react'
import { PageWrapper } from '@/components/ui'
import { Hero, ContactOptions, FAQ } from './components'

export default function KontaktPage() {
  return (
    <PageWrapper>
      <Hero />
      <Suspense fallback={<div className="section-padding" />}>
        <ContactOptions />
      </Suspense>
      <Suspense fallback={<div className="section-padding" />}>
        <FAQ />
      </Suspense>
    </PageWrapper>
  )
}
