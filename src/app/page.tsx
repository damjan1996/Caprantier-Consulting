import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { PageWrapper } from '@/components/ui'
import { Hero, Problem, Method, Benefits, FAQ } from './components'
import {
  generateTestimonialsSchema,
  generateHowToSchema,
  generateHomepageFAQSchema,
  generateServiceAreaSchema,
} from '@/lib/schemas'

// Dynamic imports for below the fold components
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), {
  loading: () => <div className="section-padding" />,
})

const ServiceAreas = dynamic(() => import('./components/ServiceAreas'), {
  loading: () => <div className="section-padding" />,
})

const CTA = dynamic(() => import('@/components/sections/CTA'), {
  loading: () => <div className="section-padding" />,
})

export default function Home() {
  const reviewSchema = generateTestimonialsSchema()
  const howToSchema = generateHowToSchema()
  const faqSchema = generateHomepageFAQSchema()
  const serviceAreaSchema = generateServiceAreaSchema()

  return (
    <PageWrapper>
      {/* Review Schema for Testimonials */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      {/* HowTo Schema for Method Section */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {/* FAQ Schema for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Service Area Schema for Local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceAreaSchema) }}
      />

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
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div className="section-padding" />}>
        <ServiceAreas />
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
