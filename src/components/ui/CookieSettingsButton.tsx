'use client'

import { Cookie } from 'lucide-react'
import { useCookieConsentContext } from '@/components/providers/CookieConsentProvider'

interface CookieSettingsButtonProps {
  className?: string
}

export default function CookieSettingsButton({ className = '' }: CookieSettingsButtonProps) {
  const { setShowBanner } = useCookieConsentContext()

  return (
    <button
      onClick={() => setShowBanner(true)}
      className={`flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm ${className}`}
      aria-label="Cookie-Einstellungen öffnen"
    >
      <Cookie className="h-4 w-4" />
      Cookie-Einstellungen
    </button>
  )
}
