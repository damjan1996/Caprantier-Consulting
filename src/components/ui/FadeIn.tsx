'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
  /** Disable animation for performance (e.g., on mobile) */
  disabled?: boolean
}

const directionStyles = {
  up: 'translate-y-6',
  down: '-translate-y-6',
  left: 'translate-x-6',
  right: '-translate-x-6',
} as const

export default function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  disabled = false,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(disabled)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    if (mediaQuery.matches || disabled) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Use requestAnimationFrame for smoother animation triggering
          if (delay > 0) {
            const timer = setTimeout(() => {
              requestAnimationFrame(() => setIsVisible(true))
            }, delay * 1000)
            observer.disconnect()
            return () => clearTimeout(timer)
          } else {
            requestAnimationFrame(() => setIsVisible(true))
          }
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px' }
    )

    const current = ref.current
    if (current) {
      observer.observe(current)
    }

    return () => observer.disconnect()
  }, [delay, disabled])

  // If reduced motion is preferred or disabled, show content immediately
  if (prefersReducedMotion || disabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={ref}
      className={cn(
        // Only animate opacity and transform for GPU acceleration
        'transition-[opacity,transform] duration-300 ease-out will-change-[opacity,transform]',
        // Mobile: faster animations (duration via CSS)
        'md:duration-500',
        isVisible
          ? 'opacity-100 translate-x-0 translate-y-0'
          : `opacity-0 ${directionStyles[direction]}`,
        className
      )}
      style={{
        // Force GPU layer for smooth animations
        transform: isVisible ? 'translate3d(0, 0, 0)' : undefined,
      }}
    >
      {children}
    </div>
  )
}
