import Image from 'next/image'
import { ABSTRACT_BG_BLUR, IMAGE_SIZES } from '@/lib/image-placeholders'

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
          src="/images/abstract-bg-1.jpg"
          alt=""
          fill
          className="object-cover opacity-25 blur-sm"
          priority
          sizes={IMAGE_SIZES.fullWidth}
          placeholder="blur"
          blurDataURL={ABSTRACT_BG_BLUR}
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
