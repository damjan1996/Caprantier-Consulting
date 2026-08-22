import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Library, PlayCircle } from 'lucide-react'
import { PageWrapper } from '@/components/ui'
import FadeIn from '@/components/ui/FadeIn'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { getBlogPostPreviews } from '@/lib/blog'
import { getVideos } from '@/lib/youtube'

/**
 * Einstieg in alle Inhalte: Blog, Videos und Glossar.
 *
 * Die Seite bündelt nur — sie zieht nichts um. Blog und Glossar behalten ihre
 * Adressen `/blog` und `/glossar`, weil beide seit Langem indexiert sind. Ein
 * Umzug nach `/wissen/...` würde die Platzierungen dieser Seiten aufgeben,
 * ohne dass etwas gewonnen wäre.
 */

const PAGE_URL = 'https://carpantier-consulting.de/wissen'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Wissen | B2B-Vertrieb, Kaltakquise & Leadgenerierung',
  description:
    'Fachartikel, Videos und Begriffserklärungen rund um B2B-Vertrieb, Telefonakquise und Leadgenerierung — gebündelt an einer Stelle.',
  keywords: [
    'B2B Vertrieb Wissen',
    'Kaltakquise Ratgeber',
    'Vertrieb Glossar',
    'Leadgenerierung Tipps',
  ],
  openGraph: {
    title: 'Wissen | B2B-Vertrieb, Kaltakquise & Leadgenerierung',
    description:
      'Fachartikel, Videos und Begriffserklärungen rund um B2B-Vertrieb und Telefonakquise.',
    url: PAGE_URL,
  },
  alternates: {
    canonical: PAGE_URL,
  },
}

export default async function WissenPage() {
  const [videos, posts] = await Promise.all([
    getVideos(1),
    Promise.resolve(getBlogPostPreviews()),
  ])

  const newestPost = [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )[0]
  const newestVideo = videos[0]

  const cards = [
    {
      href: '/blog',
      icon: BookOpen,
      title: 'Blog',
      description:
        'Ausführliche Leitfäden zu Kaltakquise, Vertriebsoutsourcing und Leadgenerierung.',
      meta: newestPost ? `Zuletzt: ${newestPost.title}` : `${posts.length} Fachartikel`,
      cta: 'Zu den Artikeln',
    },
    {
      href: '/wissen/videos',
      icon: PlayCircle,
      title: 'Videos',
      description:
        'Kurze Videos aus der Praxis: was in der Akquise wirklich funktioniert — und was nicht.',
      meta: newestVideo ? `Zuletzt: ${newestVideo.title}` : 'Neu auf dem Kanal',
      cta: 'Zu den Videos',
      isNew: true,
    },
    {
      href: '/glossar',
      icon: Library,
      title: 'Glossar',
      description:
        'Von BANT über SDR bis Warmakquise: die Fachbegriffe des B2B-Vertriebs, kurz erklärt.',
      meta: 'Begriffe von A bis Z',
      cta: 'Zum Glossar',
    },
  ]

  return (
    <PageWrapper>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-custom">
          <FadeIn>
            <Breadcrumbs items={[{ label: 'Wissen' }]} className="mb-8" />

            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                <BookOpen className="mr-2 h-4 w-4" aria-hidden="true" />
                Wissen
              </div>

              <h1 className="mb-6 text-4xl font-bold leading-[1.15] text-foreground md:text-5xl lg:text-6xl">
                Alles zum Thema <span className="text-primary">B2B-Vertrieb</span>
              </h1>

              <p className="text-base text-muted-foreground md:text-lg">
                Artikel, Videos und Begriffe — gebündelt an einer Stelle. Für alle, die
                Neukundengewinnung nicht dem Zufall überlassen wollen.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {cards.map((card, index) => {
              const Icon = card.icon
              return (
                <FadeIn key={card.href} delay={index * 0.08}>
                  <Link
                    href={card.href}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md md:p-8"
                  >
                    <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>

                    <div className="mb-2 flex items-center gap-2">
                      <h2 className="text-xl font-bold text-foreground">{card.title}</h2>
                      {card.isNew && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                          Neu
                        </span>
                      )}
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {card.description}
                    </p>

                    <p className="mt-4 line-clamp-2 text-sm font-medium text-foreground/80">
                      {card.meta}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      {card.cta}
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
