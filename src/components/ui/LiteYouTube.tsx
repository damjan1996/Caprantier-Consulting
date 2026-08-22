'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Play, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './Button'
import { useCookieConsentContext } from '@/components/providers/CookieConsentProvider'

/**
 * YouTube-Video, das erst nach einer Einwilligung geladen wird.
 *
 * Ein eingebundenes YouTube-Fenster nimmt sofort Verbindung zu Google auf,
 * überträgt die IP-Adresse des Besuchers in die USA und setzt eigene Cookies —
 * auch dann, wenn niemand auf "Abspielen" geklickt hat. Ohne Einwilligung ist
 * das unzulässig (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG, Art. 44 ff.
 * DSGVO).
 *
 * Deshalb dieselbe Mechanik wie beim Buchungsfenster: Zu sehen ist zunächst
 * nur ein Vorschaubild, das vom eigenen Server kommt. Der erste Klick öffnet
 * eine Zwischenkarte, erst der zweite lädt das Video. Wer nicht einwilligen
 * möchte, bekommt dort den Weg direkt zu YouTube angeboten — sonst wäre die
 * Einwilligung nicht freiwillig.
 *
 * Liegt die Einwilligung für Marketing bereits vor, entfällt die Zwischenkarte
 * und der Klick spielt sofort ab.
 */

type LiteYouTubeProps = {
  id: string
  title: string
  /** Nur beim wichtigsten Video einer Seite setzen — lädt das Bild vorrangig. */
  priority?: boolean
  className?: string
}

export default function LiteYouTube({ id, title, priority = false, className }: LiteYouTubeProps) {
  const { consent, updateConsent } = useCookieConsentContext()
  const [isPlaying, setIsPlaying] = useState(false)
  const [showConsentCard, setShowConsentCard] = useState(false)

  // Vor der Hydration ist der gespeicherte Zustand unbekannt. `null` bedeutet
  // deshalb "nicht eingewilligt" — die Seite darf im Zweifel nicht laden.
  const hasMarketingConsent = consent?.marketing === true

  const watchUrl = `https://www.youtube.com/watch?v=${id}`

  function handleClick() {
    if (hasMarketingConsent) {
      setIsPlaying(true)
      return
    }
    setShowConsentCard(true)
  }

  function acceptAndPlay() {
    updateConsent({ marketing: true })
    setShowConsentCard(false)
    setIsPlaying(true)
  }

  if (isPlaying && hasMarketingConsent) {
    return (
      <div className={cn('relative aspect-video overflow-hidden rounded-xl bg-black', className)}>
        <iframe
          // youtube-nocookie.com setzt erst beim tatsächlichen Abspielen Cookies
          // und verzichtet auf die Werbe-Kennungen der Hauptdomain.
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Video abspielen: ${title}`}
        className={cn(
          'group relative block aspect-video w-full overflow-hidden rounded-xl bg-muted',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
          className
        )}
      >
        <Image
          src={`/api/youtube/thumbnail/${id}`}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />

        <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play className="ml-0.5 h-7 w-7 fill-white text-white" aria-hidden="true" />
        </span>

        {!hasMarketingConsent && (
          <span className="absolute inset-x-2 bottom-2 rounded-lg bg-black/70 px-3 py-1.5 text-center text-xs leading-snug text-white">
            Wird erst nach Ihrer Einwilligung von YouTube geladen
          </span>
        )}
      </button>

      {showConsentCard && (
        <YouTubeConsentCard
          title={title}
          watchUrl={watchUrl}
          onAccept={acceptAndPlay}
          onDismiss={() => setShowConsentCard(false)}
        />
      )}
    </>
  )
}

type YouTubeConsentCardProps = {
  title: string
  watchUrl: string
  onAccept: () => void
  onDismiss: () => void
}

/**
 * Zwischenkarte vor dem Laden des Videos.
 *
 * Aufbau bewusst identisch zur Karte vor dem Calendly-Buchungsfenster: Besucher
 * sollen dieselbe Entscheidung an derselben Stelle in derselben Form treffen.
 */
function YouTubeConsentCard({ title, watchUrl, onAccept, onDismiss }: YouTubeConsentCardProps) {
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

  /*
   * Die Karte hängt direkt am <body> statt an der Video-Kachel.
   *
   * Die Kacheln stecken in der Einblende-Animation, und die arbeitet mit
   * `transform`. Ein Element mit `transform` wird zum Bezugsrahmen für
   * `position: fixed` — die Karte läge sonst nicht mittig im Fenster, sondern
   * in der Kachel und wäre dort abgeschnitten.
   *
   * Die Abfrage auf `document` ist reine Vorsicht: Die Karte erscheint erst
   * nach einem Klick und damit ohnehin nur im Browser.
   */
  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
      onClick={onDismiss}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="youtube-consent-title"
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
          <Play className="ml-0.5 h-5 w-5 fill-primary text-primary" aria-hidden="true" />
        </div>

        <h2 id="youtube-consent-title" className="mb-3 text-xl font-bold text-foreground md:text-2xl">
          Video von YouTube laden
        </h2>

        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Um „{title}&ldquo; hier abzuspielen, laden wir ein Fenster des Anbieters Google Ireland
            Limited, Gordon House, Barrow Street, Dublin 4, Irland. Dabei wird Ihre IP-Adresse an
            Google übertragen, es werden Cookies gesetzt und Ihre Daten können in den USA
            verarbeitet werden.
          </p>
          <p>
            Mit „Video laden&ldquo; willigen Sie in die Kategorie Marketing ein. Sie können das jederzeit
            über die Cookie-Einstellungen im Fußbereich widerrufen. Einzelheiten stehen in unserer{' '}
            <Link href="/datenschutz" className="text-primary hover:underline">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button ref={acceptRef} onClick={onAccept} className="gap-2 whitespace-nowrap">
            <Play className="h-4 w-4 fill-current" aria-hidden="true" />
            Video laden
          </Button>
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-base font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-muted"
          >
            Stattdessen bei YouTube ansehen
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>,
    document.body
  )
}
