import Image from 'next/image'

// Static import for automatic blur placeholder
import abstractBg from '@/../public/images/abstract-bg-1.jpg'

interface PageBackgroundProps {
  showGlow?: boolean
  glowPosition?: 'left' | 'right' | 'center'
}

const glowPositionClasses = {
  left: '-top-40 -left-40',
  right: '-top-40 -right-40',
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
          alt=""
          fill
          className="object-cover opacity-25 blur-sm"
          priority
          sizes="100vw"
          placeholder="blur"
        />
      </div>

      {/* Glow Effect */}
      {showGlow && (
        <div
          className={`fixed ${glowPositionClasses[glowPosition]} w-[600px] h-[600px] hero-glow blur-3xl pointer-events-none opacity-60 z-0`}
        />
      )}
    </>
  )
}
