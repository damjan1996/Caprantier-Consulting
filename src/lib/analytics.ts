// GA4 Event Tracking Utility

type GTagEvent = {
  action: string
  category: string
  label?: string
  value?: number
}

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetId: string,
      config?: Record<string, unknown>
    ) => void
    dataLayer?: unknown[]
  }
}

/**
 * Track a custom event in Google Analytics 4
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
): void {
  if (typeof window === 'undefined' || !window.gtag) {
    // GA not loaded or SSR
    return
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

/**
 * Track page view (useful for SPA navigation)
 */
export function trackPageView(url: string, title?: string): void {
  if (typeof window === 'undefined' || !window.gtag) {
    return
  }

  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  if (!measurementId) return

  window.gtag('config', measurementId, {
    page_path: url,
    page_title: title,
  })
}

/**
 * Track button clicks
 */
export function trackButtonClick(buttonName: string, location?: string): void {
  trackEvent('click', 'button', `${buttonName}${location ? ` - ${location}` : ''}`)
}

/**
 * Track CTA clicks
 */
export function trackCTAClick(ctaName: string): void {
  trackEvent('cta_click', 'engagement', ctaName)
}

/**
 * Track Calendly events
 */
export function trackCalendlyOpen(): void {
  trackEvent('calendly_open', 'conversion', 'popup_opened')
}

export function trackCalendlyScheduled(): void {
  trackEvent('calendly_scheduled', 'conversion', 'meeting_booked')
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(percentage: number): void {
  trackEvent('scroll', 'engagement', `${percentage}%`, percentage)
}

/**
 * Track outbound links
 */
export function trackOutboundLink(url: string): void {
  trackEvent('click', 'outbound', url)
}

/**
 * Track form interactions
 */
export function trackFormStart(formName: string): void {
  trackEvent('form_start', 'form', formName)
}

export function trackFormSubmit(formName: string, success: boolean): void {
  trackEvent('form_submit', 'form', formName, success ? 1 : 0)
}

/**
 * Track time on page
 */
export function trackTimeOnPage(seconds: number): void {
  trackEvent('time_on_page', 'engagement', `${seconds}s`, seconds)
}

/**
 * Track Web Vitals metrics (LCP, FID, CLS, TTFB, INP)
 */
export function trackWebVitals(metric: {
  name: string
  value: number
  id: string
  rating: 'good' | 'needs-improvement' | 'poor'
}): void {
  if (typeof window === 'undefined' || !window.gtag) {
    return
  }

  // Send to Google Analytics 4
  window.gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    non_interaction: true,
    // Custom dimensions for better analysis
    metric_rating: metric.rating,
    metric_value: metric.value,
  })
}
