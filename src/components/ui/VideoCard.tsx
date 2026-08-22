import { ExternalLink } from 'lucide-react'
import type { YouTubeVideo } from '@/lib/youtube'
import LiteYouTube from './LiteYouTube'

/**
 * Kachel der Video-Übersicht.
 *
 * Titel und Beschreibung stehen bewusst als echter Text in der Seite und nicht
 * nur im eingebetteten Fenster. Nur so kann Google die Inhalte dieser Seite
 * zuordnen — ein reines Einbettungs-Fenster wäre für die Suche leer.
 */

type VideoCardProps = {
  video: YouTubeVideo
  /** Überschriftenebene passend zur Seite. Die Übersicht nutzt h2. */
  headingLevel?: 'h2' | 'h3'
  priority?: boolean
}

const DATE_FORMAT = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

export default function VideoCard({ video, headingLevel = 'h2', priority = false }: VideoCardProps) {
  const Heading = headingLevel
  const publishedDate = video.published ? new Date(video.published) : null

  return (
    <article className="flex flex-col">
      <LiteYouTube id={video.id} title={video.title} priority={priority} />

      <div className="mt-4 flex flex-1 flex-col">
        {publishedDate && !Number.isNaN(publishedDate.getTime()) && (
          <time
            dateTime={video.published}
            className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
          >
            {DATE_FORMAT.format(publishedDate)}
          </time>
        )}

        <Heading className="mt-2 text-lg font-bold leading-snug text-foreground md:text-xl">
          {video.title}
        </Heading>

        {video.description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{video.description}</p>
        )}

        <a
          href={video.watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-medium text-primary hover:underline"
        >
          Bei YouTube ansehen
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}
