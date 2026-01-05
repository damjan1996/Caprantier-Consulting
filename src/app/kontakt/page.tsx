'use client'

import { PageWrapper } from '@/components/ui'
import { Hero, ContactOptions, FAQ } from './components'

export default function KontaktPage() {
  return (
    <PageWrapper>
      <Hero />
      <ContactOptions />
      <FAQ />
    </PageWrapper>
  )
}
