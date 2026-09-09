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
  id: 'LevIt3mHrng',
  title: 'Was passiert, wenn du keine Kaltakquise machst',
}

/** Die drei Kernaussagen des Videos, in der Ansprache der Website. */
const KEY_POINTS = [
  'Ohne konstante Ansprache bleibt nur, was von allein kommt — Empfehlungen, alte Kontakte, Zufall. Planbar ist das nicht.',
  'Der Ausfall zeigt sich nicht sofort. Er zeigt sich zwei, drei Monate später, wenn vorne in der Pipeline nichts mehr nachkommt.',
  'Wer erst anfängt, wenn es eng wird, verhandelt aus der schwächeren Position — und nimmt Aufträge an, die eigentlich nicht passen.',
]

export default function VideoHighlight() {
  return (
    <section className="section-padding relative bg-gray-50">
      <div className="container-custom">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-10 text-center md:mb-14">
            {/*
              Zuvor stand hier zusaetzlich die Laufzeit. Fuer dieses Video liegt
              sie nicht gesichert vor — lieber gar keine Angabe als eine
              geschaetzte. Sobald sie bekannt ist, kann sie hier wieder hinter
              "Aus der Praxis" ergaenzt werden (Feld `duration` in VIDEO).
            */}
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-primary">
              Aus der Praxis
            </span>
            <h2 className="text-3xl font-bold leading-[1.15] text-foreground md:text-4xl lg:text-5xl">
              Was passiert, wenn Sie{' '}
              <span className="text-primary">keine Kaltakquise machen</span>
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
