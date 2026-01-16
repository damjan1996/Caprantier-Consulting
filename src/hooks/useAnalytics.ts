'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView, trackScrollDepth, trackTimeOnPage } from '@/lib/analytics'
import { useWebVitals } from './useWebVitals'

/**
 * Hook for automatic page view and engagement tracking
 */
export function usePageTracking() {
  const pathname = usePathname()
  const startTime = useRef<number>(Date.now())

  // Track page views on route change
  useEffect(() => {
    trackPageView(pathname)
    startTime.current = Date.now()
  }, [pathname])

  // Track time on page when leaving
  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000)
      trackTimeOnPage(timeSpent)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])
}

/**
 * Hook for scroll depth tracking
 */
export function useScrollTracking() {
  const tracked = useRef<Set<number>>(new Set())

  useEffect(() => {
    const thresholds = [25, 50, 75, 90, 100]

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const percentage = Math.round((scrolled / scrollHeight) * 100)

      thresholds.forEach((threshold) => {
        if (percentage >= threshold && !tracked.current.has(threshold)) {
          tracked.current.add(threshold)
          trackScrollDepth(threshold)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}

/**
 * Combined analytics hook
 * Includes page tracking, scroll tracking, and Web Vitals monitoring
 */
export function useAnalytics() {
  usePageTracking()
  useScrollTracking()
  useWebVitals()
}
