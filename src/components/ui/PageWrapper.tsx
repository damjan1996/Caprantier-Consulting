'use client'

import { ReactNode } from 'react'
import PageBackground from './PageBackground'

interface PageWrapperProps {
  children: ReactNode
  showGlow?: boolean
  glowPosition?: 'left' | 'right' | 'center'
}

export default function PageWrapper({
  children,
  showGlow = true,
  glowPosition = 'left'
}: PageWrapperProps) {
  return (
    <div className="relative">
      <PageBackground showGlow={showGlow} glowPosition={glowPosition} />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
