'use client'

import { ReactNode } from 'react'
import { CookieConsentProvider } from './CookieConsentProvider'
import { ServiceWorkerProvider } from './ServiceWorkerProvider'
import { AnalyticsProvider } from './AnalyticsProvider'
import { CalendlyProvider } from './CalendlyProvider'

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
