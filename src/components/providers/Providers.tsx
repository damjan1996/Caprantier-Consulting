'use client'

import { ReactNode } from 'react'
import { CookieConsentProvider } from './CookieConsentProvider'
import { ServiceWorkerProvider } from './ServiceWorkerProvider'
import { AnalyticsProvider } from './AnalyticsProvider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CookieConsentProvider>
      <AnalyticsProvider />
      <ServiceWorkerProvider />
      {children}
    </CookieConsentProvider>
  )
}
