'use client'

import { Scale } from 'lucide-react'
import { PageHero } from '@/components/ui'

export default function Hero() {
  return (
    <PageHero
      badge="Rechtliches"
      badgeIcon={Scale}
      title={
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600">
          Impressum
        </span>
      }
      description="Angaben gemäß § 5 TMG und weitere rechtliche Informationen."
    />
  )
}
