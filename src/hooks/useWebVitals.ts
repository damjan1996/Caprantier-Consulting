'use client'

import { useEffect } from 'react'
import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals'
import { trackWebVitals } from '@/lib/analytics'

/**
 * Hook for tracking Core Web Vitals metrics
 * Sends metrics to Google Analytics 4 for real user monitoring (RUM)
 *
 * Metrics tracked:
 * - LCP (Largest Contentful Paint) - Loading performance
 * - INP (Interaction to Next Paint) - Interactivity (replaces FID)
 * - CLS (Cumulative Layout Shift) - Visual stability
 * - FCP (First Contentful Paint) - Initial render speed
 * - TTFB (Time to First Byte) - Server response time
 */
export function useWebVitals() {
  useEffect(() => {
    const handleMetric = (metric: Metric) => {
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Web Vitals] ${metric.name}:`, {
          value: metric.value,
          rating: metric.rating,
          id: metric.id,
        })
      }

      // Send to analytics
      trackWebVitals({
        name: metric.name,
        value: metric.value,
        id: metric.id,
        rating: metric.rating,
      })
    }

    // Register all Web Vitals observers
    onCLS(handleMetric)  // Cumulative Layout Shift
    onFCP(handleMetric)  // First Contentful Paint
    onINP(handleMetric)  // Interaction to Next Paint (replaces FID)
    onLCP(handleMetric)  // Largest Contentful Paint
    onTTFB(handleMetric) // Time to First Byte
  }, [])
}

export default useWebVitals
