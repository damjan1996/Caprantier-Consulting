'use client'

import { ReactNode } from 'react'
import { CookieConsentProvider } from '@/components/consent/CookieConsentProvider'
import { ServiceWorkerProvider } from './ServiceWorkerProvider'
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider'
import { CalendlyProvider } from '@/components/calendly/CalendlyProvider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CookieConsentProvider>
      <AnalyticsProvider />
      <ServiceWorkerProvider />
      <CalendlyProvider>
        {children}
      </CalendlyProvider>
    </CookieConsentProvider>
  )
}
