import Image from 'next/image'

// Static import for automatic blur placeholder
import abstractBg from '@/../public/images/abstract-bg-1.jpg'

interface PageBackgroundProps {
  showGlow?: boolean
  glowPosition?: 'left' | 'right' | 'center'
}

// Glow-Positionen - max-w-screen verhindert Overflow auf Mobile
const glowPositionClasses = {
  left: '-top-40 left-0 -translate-x-1/3',
  right: '-top-40 right-0 translate-x-1/3',
  center: '-top-40 left-1/2 -translate-x-1/2',
} as const

export default function PageBackground({
  showGlow = true,
  glowPosition = 'left'
}: PageBackgroundProps) {
  return (
    <>
      {/* Background Image with Gradient Overlay */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background z-10" />
        <Image
          src={abstractBg}
          alt="Abstrakter Hintergrund - Carpantier Consulting Vertriebsagentur"
          fill
          className="object-cover opacity-25 blur-sm"
          priority
          sizes="100vw"
          placeholder="blur"
          aria-hidden="true"
        />
      </div>

      {/* Glow Effect - mit overflow-hidden Container um horizontales Scrolling zu verhindern */}
      {showGlow && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className={`absolute ${glowPositionClasses[glowPosition]} w-[min(600px,150vw)] h-[600px] hero-glow blur-3xl opacity-60`}
          />
        </div>
      )}
    </>
  )
}
