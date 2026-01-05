'use client'

import { useCallback, useRef } from 'react'

// hide_gdpr_banner=1 versteckt das Calendly-eigene Cookie-Banner
// (wir haben bereits unser eigenes DSGVO-konformes Banner)
const CALENDLY_URL = 'https://calendly.com/nico-carpantier-consulting/30min?hide_gdpr_banner=1'

interface CalendlyOptions {
  prefill?: {
    name?: string
    email?: string
    customAnswers?: Record<string, string>
  }
  utm?: {
    utmCampaign?: string
    utmSource?: string
    utmMedium?: string
    utmContent?: string
    utmTerm?: string
  }
}

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: {
        url: string
        prefill?: CalendlyOptions['prefill']
        utm?: CalendlyOptions['utm']
      }) => void
      showPopupWidget: (url: string) => void
      closePopupWidget: () => void
    }
  }
}

// Prefetch Calendly resources on hover
let prefetched = false
function prefetchCalendly() {
  if (prefetched || typeof window === 'undefined') return
  prefetched = true

  // Create hidden iframe to preload Calendly
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = CALENDLY_URL
  link.as = 'document'
  document.head.appendChild(link)
}

export function useCalendly() {
  const openCalendly = useCallback((options?: CalendlyOptions) => {
    if (typeof window === 'undefined' || !window.Calendly) {
      console.warn('Calendly widget not loaded')
      return
    }

    // Use initPopupWidget for more control over the popup
    window.Calendly.initPopupWidget({
      url: CALENDLY_URL,
      prefill: options?.prefill,
      utm: options?.utm,
    })
  }, [])

  const closeCalendly = useCallback(() => {
    if (typeof window !== 'undefined' && window.Calendly) {
      window.Calendly.closePopupWidget()
    }
  }, [])

  // Prefetch on hover to speed up opening
  const onHover = useCallback(() => {
    prefetchCalendly()
  }, [])

  return { openCalendly, closeCalendly, onHover }
}

// Simple function for components that don't need the hook
export function openCalendlyPopup(options?: CalendlyOptions) {
  if (typeof window === 'undefined' || !window.Calendly) {
    console.warn('Calendly widget not loaded')
    return
  }

  window.Calendly.initPopupWidget({
    url: CALENDLY_URL,
    prefill: options?.prefill,
    utm: options?.utm,
  })
}
