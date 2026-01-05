'use client'

import { PageWrapper } from '@/components/ui'
import CTA from '@/components/sections/CTA'
import { Hero, Services, Process, WhyUs } from './components'

export default function LeistungenPage() {
  return (
    <PageWrapper>
      <Hero />
      <Services />
      <Process />
      <WhyUs />
      <CTA />
    </PageWrapper>
  )
}
