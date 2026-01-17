import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { PageWrapper } from '@/components/ui'
import { Hero, Services, Process, WhyUs } from './components'
import ServiceAreas from '@/app/components/ServiceAreas'

const CTA = dynamic(() => import('@/components/sections/CTA'), {
  loading: () => <div className="section-padding" />,
})

export default function LeistungenPage() {
  return (
    <PageWrapper>
      <Hero />
      <Suspense fallback={<div className="section-padding" />}>
        <Services />
      </Suspense>
      <Suspense fallback={<div className="section-padding" />}>
        <Process />
      </Suspense>
      <Suspense fallback={<div className="section-padding" />}>
        <WhyUs />
      </Suspense>
      <Suspense fallback={<div className="section-padding" />}>
        <ServiceAreas />
      </Suspense>
      <Suspense fallback={<div className="section-padding" />}>
        <CTA />
      </Suspense>
    </PageWrapper>
  )
}
