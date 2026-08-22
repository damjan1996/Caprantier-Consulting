import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Youtube } from 'lucide-react'
import { PageWrapper } from '@/components/ui'
import FadeIn from '@/components/ui/FadeIn'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import VideoCard from '@/components/ui/VideoCard'
import { getVideos, YOUTUBE_CHANNEL_URL, type YouTubeVideo } from '@/lib/youtube'

/**
 * Video-Übersicht.
 *
 * Die Liste kommt aus dem RSS-Feed des Kanals und aktualisiert sich damit von
 * selbst, sobald ein neues Video erscheint — spätestens eine Stunde später.
 * Niemand muss die Seite anfassen.
 */

const PAGE_URL = 'https://carpantier-consulting.de/wissen/videos'

// Die Seite ist nur so aktuell wie der Feed. Gleiche Frist wie in lib/youtube.
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Videos | B2B-Vertrieb & Kaltakquise erklärt',
  description:
    'Videos zu B2B-Vertrieb, Telefonakquise und Leadgenerierung — direkt aus der Praxis von Nico-Luca Carpantier. Kurz, konkret, ohne Theorie.',
  keywords: [
    'B2B Vertrieb Video',
    'Kaltakquise Video',
    'Telefonakquise lernen',
    'Leadgenerierung B2B',
    'Vertriebstipps',
  ],
  openGraph: {
    title: 'Videos | B2B-Vertrieb & Kaltakquise erklärt',
    description:
      'Videos zu B2B-Vertrieb, Telefonakquise und Leadgenerierung — direkt aus der Praxis.',
    url: PAGE_URL,
  },
  alternates: {
    canonical: PAGE_URL,
  },
}

/**
 * `VideoObject` je Video.
 *
 * `contentUrl` zeigt bewusst auf YouTube und nicht auf eine eigene Datei — dort
 * liegt das Video. `embedUrl` nennt die cookiefreie Variante, die auch der
 * Player verwendet.
 */
function videoSchema(video: YouTubeVideo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description || video.title,
    thumbnailUrl: `https://carpantier-consulting.de${video.thumbnailUrl}`,
    uploadDate: video.published,
    contentUrl: video.watchUrl,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
    publisher: {
      '@type': 'Organization',
      name: 'Carpantier Consulting',
      url: 'https://carpantier-consulting.de',
    },
  }
}

export default async function VideosPage() {
  const videos = await getVideos()

  return (
    <PageWrapper>
      {videos.map((video) => (
        <script
          key={video.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema(video)) }}
        />
      ))}

      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-custom">
          <FadeIn>
            <Breadcrumbs
              items={[{ label: 'Wissen', href: '/wissen' }, { label: 'Videos' }]}
              className="mb-8"
            />

            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                <Youtube className="mr-2 h-4 w-4" aria-hidden="true" />
                Videos
              </div>

              <h1 className="mb-6 text-4xl font-bold leading-[1.15] text-foreground md:text-5xl lg:text-6xl">
                Vertrieb, der funktioniert — <span className="text-primary">in kurzen Videos</span>
              </h1>

              <p className="text-base text-muted-foreground md:text-lg">
                Worauf es bei B2B-Kaltakquise, Terminierung und Leadgenerierung wirklich ankommt.
                Aus der täglichen Praxis, ohne Theoriegerüst.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {videos.map((video, index) => (
                <FadeIn key={video.id} delay={index * 0.05}>
                  <VideoCard video={video} priority={index === 0} />
                </FadeIn>
              ))}
            </div>
          ) : (
            /* Der Feed ist nicht erreichbar. Kein Fehler — nur der Weg zum Kanal. */
            <FadeIn>
              <div className="rounded-2xl border border-border bg-white p-8 text-center md:p-12">
                <h2 className="mb-3 text-xl font-bold text-foreground">
                  Die Videos lassen sich gerade nicht laden
                </h2>
                <p className="mx-auto mb-6 max-w-md text-sm text-muted-foreground">
                  Bitte versuchen Sie es später noch einmal — oder sehen Sie sich alle Videos
                  direkt auf dem Kanal an.
                </p>
                <a
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 text-sm"
                >
                  <Youtube className="h-4 w-4" aria-hidden="true" />
                  Zum YouTube-Kanal
                </a>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <FadeIn>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-white p-6 transition-colors hover:border-primary/50"
              >
                <span>
                  <span className="block font-semibold text-foreground">
                    Kanal abonnieren
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    Kein neues Video verpassen
                  </span>
                </span>
                <Youtube className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              </a>

              <Link
                href="/blog"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-white p-6 transition-colors hover:border-primary/50"
              >
                <span>
                  <span className="block font-semibold text-foreground">Lieber lesen?</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    Die Themen ausführlich im Blog
                  </span>
                </span>
                <BookOpen className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <FadeIn>
            <div className="rounded-2xl border border-border bg-gray-50 p-8 text-center md:p-12">
              <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
                Lieber direkt darüber sprechen?
              </h2>
              <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
                In 15 Minuten klären wir, ob planbare Neukundengewinnung über Telefonakquise für
                Ihr Unternehmen der richtige Weg ist.
              </p>
              <Link href="/kontakt" className="btn-primary inline-flex items-center gap-2">
                Erstgespräch vereinbaren
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  )
}
