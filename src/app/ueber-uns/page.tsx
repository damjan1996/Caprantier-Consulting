'use client'

import { PageWrapper } from '@/components/ui'
import CTA from '@/components/sections/CTA'
import { Hero, Story, Experience, Values, Mission } from './components'

export default function UeberUnsPage() {
  return (
    <PageWrapper>
      <Hero />
      <Story />
      <Experience />
      <Values />
      <Mission />
      <CTA />
    </PageWrapper>
  )
}
