'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { CalendarClock, ExternalLink, Mail, X } from 'lucide-react'
import { Button } from './Button'

/**
 * Zwischenkarte vor dem Laden des Calendly-Buchungsfensters.
 *
 * Calendly wird von der Calendly LLC in den USA betrieben. Sobald das
 * Buchungsfenster geladen wird, erfährt Calendly die IP-Adresse des Besuchers
 * und setzt eigene Cookies. Beides darf nicht ungefragt passieren
 * (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG, Art. 44 ff. DSGVO für die
 * Übermittlung in ein Drittland).
 *
 * Deshalb dieser Zwischenschritt: Der erste Klick öffnet nur diese Karte, erst
 * der zweite lädt Calendly. Wer das nicht möchte, bekommt hier den gleichwertigen
 * Weg per E-Mail angeboten — sonst wäre die Einwilligung nicht freiwillig.
 */

const CONTACT_EMAIL = 'nico@carpantier-consulting.de'

type CalendlyConsentCardProps = {
  onAccept: () => void
  onDismiss: () => void
}

export default function CalendlyConsentCard({ onAccept, onDismiss }: CalendlyConsentCardProps) {
  const acceptRef = useRef<HTMLButtonElement>(null)

  // Tastaturbedienung: Der Dialog nimmt den Fokus auf und schließt mit Escape.
  useEffect(() => {
    acceptRef.current?.focus()

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss()
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [onDismiss])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
      onClick={onDismiss}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="calendly-consent-title"
        className="relative w-full max-w-lg rounded-2xl border border-border bg-white p-6 shadow-xl md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Schließen"
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <CalendarClock className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>

        <h2
          id="calendly-consent-title"
          className="mb-3 text-xl font-bold text-foreground md:text-2xl"
        >
          Termin über Calendly buchen
        </h2>

        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Für die Terminbuchung laden wir ein Fenster des Anbieters Calendly LLC, 271 17th St
            NW, Atlanta, GA 30363, USA. Dabei wird Ihre IP-Adresse an Calendly übertragen, es
            werden Cookies gesetzt und Ihre Daten werden in den USA verarbeitet.
          </p>
          <p>
            Das geschieht erst, wenn Sie unten zustimmen. Ihre Zustimmung gilt für diesen Besuch
            und ist jederzeit widerrufbar. Einzelheiten stehen in unserer{' '}
            <Link href="/datenschutz" className="text-primary hover:underline">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button ref={acceptRef} onClick={onAccept} className="gap-2">
            Weiter zu Calendly
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </Button>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Terminanfrage')}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-base font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-muted"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Stattdessen per E-Mail
          </a>
        </div>
      </div>
    </div>
  )
}
