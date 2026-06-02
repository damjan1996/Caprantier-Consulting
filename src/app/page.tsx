import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { PageWrapper } from '@/components/ui'
import { Hero, ClientLogos, Problem, Method, Benefits, FAQ } from './components'
import {
  generateHowToSchema,
  generateHomepageFAQSchema,
  generateServiceAreaSchema,
} from '@/lib/schemas'

// Dynamic imports for below the fold components
const AboutTeaser = dynamic(() => import('@/components/sections/Testimonials'), {
  loading: () => <div className="section-padding" />,
})

const ServiceAreas = dynamic(() => import('./components/ServiceAreas'), {
  loading: () => <div className="section-padding" />,
})

const CTA = dynamic(() => import('@/components/sections/CTA'), {
  loading: () => <div className="section-padding" />,
})

export default function Home() {
  const howToSchema = generateHowToSchema()
  const faqSchema = generateHomepageFAQSchema()
  const serviceAreaSchema = generateServiceAreaSchema()

  return (
    <PageWrapper>
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

      {/* 1. Hero */}
      <Hero />
      {/* 1b. Trusted-by Logo Marquee */}
      <ClientLogos />
      {/* 2. Warum unsere Akquise-Strategie so gut funktioniert */}
      <Suspense fallback={<div className="section-padding" />}>
        <Problem />
      </Suspense>
      {/* 3. Das erreichen unsere Kunden */}
      <Suspense fallback={<div className="section-padding" />}>
        <Benefits />
      </Suspense>
      {/* 4. So können Sie mit uns zusammenarbeiten */}
      <Suspense fallback={<div className="section-padding" />}>
        <Method />
      </Suspense>
      {/* 5. FAQ */}
      <Suspense fallback={<div className="section-padding" />}>
        <FAQ />
      </Suspense>
      {/* 6. Über uns */}
      <Suspense fallback={<div className="section-padding" />}>
        <AboutTeaser />
      </Suspense>
      {/* 7. Regionen */}
      <Suspense fallback={<div className="section-padding" />}>
        <ServiceAreas />
      </Suspense>
      {/* 8. Abschließender CTA */}
      <Suspense fallback={<div className="section-padding" />}>
        <CTA />
      </Suspense>
    </PageWrapper>
  )
}
