interface PageBackgroundProps {
  showGlow?: boolean
  glowPosition?: 'left' | 'right' | 'center'
}

export default function PageBackground({
  showGlow = true,
  glowPosition = 'left'
}: PageBackgroundProps) {
  const glowPositionClasses = {
    left: '-top-40 left-0 -translate-x-1/3',
    right: '-top-40 right-0 translate-x-1/3',
    center: '-top-40 left-1/2 -translate-x-1/2',
  } as const

  return (
    <>
      {/* Clean light background */}
      <div className="fixed inset-0 z-0 bg-white" />

      {/* Subtle decorative gradient */}
      {showGlow && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className={`absolute ${glowPositionClasses[glowPosition]} w-[min(800px,150vw)] h-[600px] bg-gradient-to-br from-blue-50 via-indigo-50/50 to-transparent rounded-full blur-3xl opacity-70`}
          />
        </div>
      )}
    </>
  )
}
