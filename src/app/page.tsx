'use client'

import { PageWrapper } from '@/components/ui'
import CTA from '@/components/sections/CTA'
import { Hero, Problem, Method, Benefits, FAQ } from './components'

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <Problem />
      <Method />
      <Benefits />
      <FAQ />
      <CTA />
    </PageWrapper>
  )
}
