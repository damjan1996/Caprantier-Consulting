'use client'

import { Shield } from 'lucide-react'
import { PageHero } from '@/components/ui'

export default function Hero() {
  return (
    <PageHero
      badge="Rechtliches"
      badgeIcon={Shield}
      title={
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
          Datenschutz
        </span>
      }
      description="Informationen zum Umgang mit Ihren personenbezogenen Daten."
    />
  )
}
