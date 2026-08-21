import Link from 'next/link'
import { Sparkles } from 'lucide-react'

/**
 * Kennzeichnung für KI-generierte Medieninhalte.
 *
 * Erfüllt die Transparenzpflicht aus Art. 50 Abs. 2 und Abs. 4 KI-VO
 * (Verordnung (EU) 2024/1689): synthetisch erzeugte Bild-, Audio- und
 * Videoinhalte müssen für Betrachter klar erkennbar gekennzeichnet sein.
 * Das Badge verlinkt auf die ausführliche KI-Transparenzerklärung.
 */

type Size = 'xs' | 'sm' | 'md'

/** Ecke des Elternelements — dieses braucht `position: relative`. */
type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

const CORNER_CLASSES: Record<Corner, string> = {
  'top-left': 'top-3 left-3',
  'top-right': 'top-3 right-3',
  'bottom-left': 'bottom-3 left-3',
  'bottom-right': 'bottom-3 right-3',
}

const SIZE_CLASSES: Record<Size, string> = {
  xs: 'gap-0.5 px-1.5 py-0.5 text-[9px]',
  sm: 'gap-1 px-2 py-0.5 text-[10px]',
  md: 'gap-1.5 px-2.5 py-1 text-xs',
}

const ICON_CLASSES: Record<Size, string> = {
  xs: 'h-2 w-2',
  sm: 'h-2.5 w-2.5',
  md: 'h-3 w-3',
}

const TOOLTIP =
  'Dieses Bild wurde mit künstlicher Intelligenz erzeugt und zeigt keine reale fotografische Aufnahme. Mehr erfahren.'

const ARIA_LABEL = 'KI-generiertes Bild — Hinweise zur KI-Transparenz'

const BASE_CLASSES =
  'inline-flex items-center rounded-full border border-white/40 bg-black/65 font-medium text-white shadow-sm backdrop-blur-sm'

type AiGeneratedBadgeProps = {
  /** Absolut in einer Ecke des Bildcontainers platzieren statt im Textfluss. */
  corner?: Corner
  size?: Size
  /** Kurzform „KI“ für sehr kleine Bilder wie Rund-Porträts. */
  short?: boolean
  /**
   * Auf `false` setzen, wenn das Badge innerhalb eines anderen Links steht.
   * Verschachtelte `<a>`-Elemente sind ungültiges HTML und lösen in React
   * einen Hydration-Fehler aus; die Kennzeichnung selbst bleibt sichtbar.
   */
  linked?: boolean
  className?: string
}

export default function AiGeneratedBadge({
  corner,
  size = 'md',
  short = false,
  linked = true,
  className = '',
}: AiGeneratedBadgeProps) {
  const position = corner ? `absolute z-30 ${CORNER_CLASSES[corner]}` : ''
  const classes = `${position} ${BASE_CLASSES} ${SIZE_CLASSES[size]} ${className}`
  const content = (
    <>
      <Sparkles className={ICON_CLASSES[size]} aria-hidden="true" />
      {short ? 'KI' : 'KI-generiert'}
    </>
  )

  if (!linked) {
    return (
      <span className={classes} title={TOOLTIP} aria-label={ARIA_LABEL} role="note">
        {content}
      </span>
    )
  }

  return (
    <Link
      href="/ki-transparenz"
      title={TOOLTIP}
      aria-label={ARIA_LABEL}
      className={`${classes} transition-colors hover:bg-black/80`}
    >
      {content}
    </Link>
  )
}
