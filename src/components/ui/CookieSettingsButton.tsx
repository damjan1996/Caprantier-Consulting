'use client'

import { Cookie } from 'lucide-react'
import { useCookieConsentContext } from '@/components/providers/CookieConsentProvider'

const DEFAULT_CLASS =
  'flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm'

interface CookieSettingsButtonProps {
  /** Ersetzt die Standardklassen vollständig, statt sie zu ergänzen. */
  className?: string
  /** In der Fußzeile steht die Schaltfläche zwischen reinen Textverweisen — dort ohne Symbol. */
  withIcon?: boolean
}

export default function CookieSettingsButton({
  className,
  withIcon = true,
}: CookieSettingsButtonProps) {
  const { setShowBanner } = useCookieConsentContext()

  return (
    <button
      type="button"
      onClick={() => setShowBanner(true)}
      className={className ?? DEFAULT_CLASS}
      aria-label="Cookie-Einstellungen öffnen"
    >
      {withIcon && <Cookie className="h-4 w-4" aria-hidden="true" />}
      Cookie-Einstellungen
    </button>
  )
}
