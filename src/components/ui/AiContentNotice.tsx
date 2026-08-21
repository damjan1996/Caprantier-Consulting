import Link from 'next/link'
import { Sparkles } from 'lucide-react'

/**
 * Kennzeichnung für redaktionelle Texte, die mit KI-Unterstützung entstanden
 * sind.
 *
 * Art. 50 Abs. 4 KI-VO (Verordnung (EU) 2024/1689) verlangt die Offenlegung bei
 * KI-erzeugten Texten, die zur Information der Öffentlichkeit veröffentlicht
 * werden. Die Pflicht entfällt, wenn die Inhalte redaktionell geprüft werden und
 * eine benannte Person die Verantwortung trägt — genau das benennt dieser
 * Hinweis, statt sich stillschweigend auf die Ausnahme zu berufen.
 *
 * Das Gegenstück für Bilder ist `AiGeneratedBadge`.
 */

type AiContentNoticeProps = {
  /** Was gekennzeichnet wird, z. B. „Die Begriffserklärungen“. */
  subject: string
  /** Datum der letzten redaktionellen Prüfung im Format YYYY-MM-DD. */
  reviewedOn: string
  className?: string
}

const REVIEW_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
}

function formatReviewDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('de-DE', {
    ...REVIEW_DATE_FORMAT,
    timeZone: 'UTC',
  })
}

export default function AiContentNotice({
  subject,
  reviewedOn,
  className = '',
}: AiContentNoticeProps) {
  return (
    <aside
      className={`flex items-start gap-3 rounded-xl border border-border bg-muted/60 p-4 text-sm text-muted-foreground ${className}`}
    >
      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
      <p className="leading-relaxed">
        <strong className="font-medium text-foreground">Hinweis zur KI-Nutzung:</strong>{' '}
        {subject} wurden mit Unterstützung künstlicher Intelligenz erstellt und vor
        Veröffentlichung redaktionell geprüft. Die inhaltliche Verantwortung trägt der im{' '}
        <Link href="/impressum" className="text-primary hover:underline">
          Impressum
        </Link>{' '}
        genannte Anbieter. Letzte Prüfung: {formatReviewDate(reviewedOn)}. Mehr dazu unter{' '}
        <Link href="/ki-transparenz" className="text-primary hover:underline">
          KI-Transparenz
        </Link>
        .
      </p>
    </aside>
  )
}
