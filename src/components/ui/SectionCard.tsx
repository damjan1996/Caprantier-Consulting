'use client'

import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface SectionCardProps {
  children: ReactNode
  icon?: LucideIcon
  iconColor?: string
  iconBg?: string
  title?: string
  className?: string
  hover?: boolean
}

export default function SectionCard({
  children,
  icon: Icon,
  iconColor = 'text-primary',
  iconBg = 'bg-primary/10',
  title,
  className = '',
  hover = true,
}: SectionCardProps) {
  return (
    <div
      className={`
        p-6 rounded-2xl border border-white/10 bg-white/5
        ${hover ? 'transition-all duration-300 hover:bg-white/10 hover:border-white/20' : ''}
        ${className}
      `}
    >
      {(Icon || title) && (
        <div className="flex items-center gap-3 mb-4">
          {Icon && (
            <div className={`h-10 w-10 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center`}>
              <Icon className="h-5 w-5" />
            </div>
          )}
          {title && (
            <h2 className="text-xl font-semibold text-white">{title}</h2>
          )}
        </div>
      )}
      {children}
    </div>
  )
}
