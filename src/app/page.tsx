import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { PageWrapper } from '@/components/ui'
import { Hero, Problem, Method, Benefits, FAQ } from './components'

// Dynamic import for CTA (below the fold)
const CTA = dynamic(() => import('@/components/sections/CTA'), {
  loading: () => <div className="section-padding" />,
})

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <Suspense fallback={<div className="section-padding" />}>
        <Problem />
      </Suspense>
      <Suspense fallback={<div className="section-padding" />}>
        <Method />
      </Suspense>
      <Suspense fallback={<div className="section-padding" />}>
        <Benefits />
      </Suspense>
      <Suspense fallback={<div className="section-padding" />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<div className="section-padding" />}>
        <CTA />
      </Suspense>
    </PageWrapper>
  )
}
