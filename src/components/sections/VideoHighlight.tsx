import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import LiteYouTube from '@/components/ui/LiteYouTube'

/**
 * Videoabschnitt auf der Startseite.
 *
 * Steht bewusst direkt hinter dem Einstieg: Oben steht das Versprechen, hier
 * erklärt Nico-Luca Carpantier selbst das Problem dahinter. Alles Weitere auf
 * der Seite ist dann die Antwort darauf.
 *
 * Titel, Kernaussagen und Laufzeit sind bewusst fest hinterlegt und werden
 * nicht aus dem RSS-Feed gelesen. Zum einen ist die Auswahl eine redaktionelle
 * Entscheidung und soll sich nicht ändern, sobald ein neues Video erscheint.
 * Zum anderen bliebe die Startseite so statisch ausgeliefert — ein Abruf beim
 * Rendern würde sie unnötig verlangsamen.
 */

const VIDEO = {
  id: 'FHfhaN-SG3Q',
  title: 'Warum eure Akquise immer wieder einschläft',
  duration: '7:49 Min.',
}

/** Die drei Kernaussagen des Videos, in der Ansprache der Website. */
const KEY_POINTS = [
  'Ein guter Monat, dann zwei Wochen Funkstille — und die Pipeline ist genau dann leer, wenn Sie sie am dringendsten brauchen.',
  'Das Problem ist selten Ihr Angebot. Akquise passiert nur dann, wenn gerade Zeit ist oder der Druck groß genug wird.',
  'Das Ziel sind nicht möglichst viele Termine, sondern Gespräche mit Unternehmen, bei denen realistisch eine Chance besteht.',
]

export default function VideoHighlight() {
  return (
    <section className="section-padding relative bg-gray-50">
      <div className="container-custom">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-10 text-center md:mb-14">
            {/*
              Die Laufzeit steht hier oben statt in einem eigenen Satz darunter.
              Sie ist die einzige Angabe, die Besucher vor dem Klick wirklich
              brauchen — worum es geht, sagen Überschrift und Stichpunkte.
            */}
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-primary">
              Aus der Praxis · {VIDEO.duration}
            </span>
            <h2 className="text-3xl font-bold leading-[1.15] text-foreground md:text-4xl lg:text-5xl">
              Warum eure Akquise{' '}
              <span className="text-primary">immer wieder einschläft</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-5 lg:gap-12">
            <FadeIn className="lg:col-span-3">
              <LiteYouTube
                id={VIDEO.id}
                title={VIDEO.title}
                className="shadow-lg"
              />
            </FadeIn>

            <FadeIn delay={0.1} className="lg:col-span-2">
              <ul className="space-y-4">
                {KEY_POINTS.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/wissen/videos"
                className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Alle Videos ansehen
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
