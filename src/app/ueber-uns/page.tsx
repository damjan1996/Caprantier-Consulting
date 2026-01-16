import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { PageWrapper } from '@/components/ui'
import { Hero, Story, Experience, Values, Mission } from './components'

const CTA = dynamic(() => import('@/components/sections/CTA'), {
  loading: () => <div className="section-padding" />,
})

export default function UeberUnsPage() {
  return (
    <PageWrapper>
      <Hero />
      <Suspense fallback={<div className="section-padding" />}>
        <Story />
      </Suspense>
      <Suspense fallback={<div className="section-padding" />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<div className="section-padding" />}>
        <Values />
      </Suspense>
      <Suspense fallback={<div className="section-padding" />}>
        <Mission />
      </Suspense>
      <Suspense fallback={<div className="section-padding" />}>
        <CTA />
      </Suspense>
    </PageWrapper>
  )
}
