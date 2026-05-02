'use client'

import { Scale } from 'lucide-react'
import { PageHero } from '@/components/ui'

export default function Hero() {
  return (
    <PageHero
      badge="Rechtliches"
      badgeIcon={Scale}
      title={
        <span className="text-primary">
          Impressum
        </span>
      }
      description="Angaben gemäß § 5 TMG und weitere rechtliche Informationen."
    />
  )
}
