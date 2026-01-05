'use client'

import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'
import FadeIn from './FadeIn'
import DecorativeParticles from './DecorativeParticles'

interface PageHeroProps {
  badge?: string
  badgeIcon?: LucideIcon
  title: ReactNode
  description?: string
  children?: ReactNode
  centered?: boolean
  particlePreset?: 'hero' | 'section' | 'minimal'
}

export default function PageHero({
  badge,
  badgeIcon: BadgeIcon,
  title,
  description,
  children,
  centered = true,
  particlePreset = 'minimal',
}: PageHeroProps) {
  return (
    <section className="pt-32 pb-12 md:pt-40 md:pb-16 relative">
      {/* Decorative particles */}
      <DecorativeParticles preset={particlePreset} />

      <div className="container-custom">
        <FadeIn className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
          {badge && (
            <div className="group inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-white cursor-default transition-all duration-300 hover:border-primary/50 hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/20 transform-gpu mb-6">
              {BadgeIcon && <BadgeIcon className="h-4 w-4 mr-2 text-primary" />}
              {badge}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.15]">
            {title}
          </h1>

          {description && (
            <p className="text-base md:text-lg text-muted-foreground">
              {description}
            </p>
          )}

          {children}
        </FadeIn>
      </div>
    </section>
  )
}
