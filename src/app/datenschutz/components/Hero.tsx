'use client'

import { Shield } from 'lucide-react'
import { PageHero } from '@/components/ui'

export default function Hero() {
  return (
    <PageHero
      badge="Rechtliches"
      badgeIcon={Shield}
      title={
        <span className="text-primary">
          Datenschutz
        </span>
      }
      description="Informationen zum Umgang mit Ihren personenbezogenen Daten."
    />
  )
}
