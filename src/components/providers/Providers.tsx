'use client'

import { ReactNode } from 'react'
import { CookieConsentProvider } from './CookieConsentProvider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CookieConsentProvider>
      {children}
    </CookieConsentProvider>
  )
}
