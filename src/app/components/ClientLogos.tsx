'use client'

import FadeIn from '@/components/ui/FadeIn'

type ClientLogo = {
  name: string
  src: string
  href?: string
}

const logos: ClientLogo[] = [
  {
    name: 'Lixt AG',
    src: '/logo/lixt.svg',
    href: 'https://www.lixt.ch',
  },
  {
    name: 'Jungwild',
    src: '/logo/jungwild.svg',
    href: 'https://jungwild.io',
  },
  {
    name: 'Syntriq',
    src: '/logo/syntriq.png',
    href: 'https://syntriq.de',
  },
]

export default function ClientLogos() {
  const loop = Array.from({ length: 8 }).flatMap(() => logos)

  return (
    <section
      aria-label="Unsere Kunden"
      className="relative bg-white border-y border-border/60 py-10 md:py-14 overflow-hidden"
    >
      <div className="container-custom">
        <FadeIn>
          <p className="text-center text-sm font-medium tracking-wider uppercase text-muted-foreground mb-8">
            Vertrauen unter anderem auf uns
          </p>
        </FadeIn>

        <div
          className="relative"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)',
          }}
        >
          <div className="flex w-max animate-marquee gap-16 md:gap-24 items-center hover:[animation-play-state:paused]">
            {loop.map((logo, i) => {
              const img = (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={logo.src}
                  alt={`${logo.name} Logo`}
                  loading="lazy"
                  decoding="async"
                  className="h-8 md:h-10 w-auto opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                />
              )
              return (
                <div
                  key={`${logo.name}-${i}`}
                  className="shrink-0 flex items-center justify-center"
                >
                  {logo.href ? (
                    <a
                      href={logo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${logo.name} Webseite öffnen`}
                    >
                      {img}
                    </a>
                  ) : (
                    img
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
