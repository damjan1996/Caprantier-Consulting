// Corporate SVG Illustrations for B2B Sales & Vertrieb Theme
// Abstract, professional graphics optimized for dark backgrounds

export function SalesGrowthIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Vertriebswachstum Illustration - steigende Umsätze durch professionelle B2B Akquise"
    >
      {/* Background gradient circles */}
      <circle cx="200" cy="150" r="120" fill="url(#growth-gradient-1)" opacity="0.1" />
      <circle cx="180" cy="170" r="80" fill="url(#growth-gradient-2)" opacity="0.15" />

      {/* Growth chart bars */}
      <rect x="80" y="180" width="40" height="60" rx="4" fill="url(#bar-gradient)" opacity="0.6" />
      <rect x="140" y="140" width="40" height="100" rx="4" fill="url(#bar-gradient)" opacity="0.75" />
      <rect x="200" y="100" width="40" height="140" rx="4" fill="url(#bar-gradient)" opacity="0.9" />
      <rect x="260" y="60" width="40" height="180" rx="4" fill="url(#bar-gradient)" />

      {/* Growth line */}
      <path
        d="M100 180 L160 140 L220 100 L280 60"
        stroke="url(#line-gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Data points */}
      <circle cx="100" cy="180" r="6" fill="#22c55e" />
      <circle cx="160" cy="140" r="6" fill="#22c55e" />
      <circle cx="220" cy="100" r="6" fill="#22c55e" />
      <circle cx="280" cy="60" r="8" fill="#22c55e" className="animate-pulse" />

      {/* Arrow indicator */}
      <path
        d="M290 50 L310 30 L295 35 M310 30 L305 45"
        stroke="#22c55e"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <defs>
        <linearGradient id="growth-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="growth-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="bar-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function NetworkConnectionIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="B2B Netzwerk Illustration - Verbindungen zu Entscheidern durch Kaltakquise"
    >
      {/* Central hub */}
      <circle cx="200" cy="150" r="30" fill="url(#hub-gradient)" />
      <circle cx="200" cy="150" r="20" fill="#0f172a" />
      <circle cx="200" cy="150" r="12" fill="#22c55e" />

      {/* Connection nodes */}
      <circle cx="80" cy="80" r="18" fill="url(#node-gradient)" opacity="0.8" />
      <circle cx="320" cy="80" r="18" fill="url(#node-gradient)" opacity="0.8" />
      <circle cx="60" cy="200" r="18" fill="url(#node-gradient)" opacity="0.8" />
      <circle cx="340" cy="200" r="18" fill="url(#node-gradient)" opacity="0.8" />
      <circle cx="140" cy="260" r="18" fill="url(#node-gradient)" opacity="0.8" />
      <circle cx="260" cy="260" r="18" fill="url(#node-gradient)" opacity="0.8" />

      {/* Connection lines */}
      <line x1="200" y1="150" x2="80" y2="80" stroke="url(#connection-gradient)" strokeWidth="2" opacity="0.6" />
      <line x1="200" y1="150" x2="320" y2="80" stroke="url(#connection-gradient)" strokeWidth="2" opacity="0.6" />
      <line x1="200" y1="150" x2="60" y2="200" stroke="url(#connection-gradient)" strokeWidth="2" opacity="0.6" />
      <line x1="200" y1="150" x2="340" y2="200" stroke="url(#connection-gradient)" strokeWidth="2" opacity="0.6" />
      <line x1="200" y1="150" x2="140" y2="260" stroke="url(#connection-gradient)" strokeWidth="2" opacity="0.6" />
      <line x1="200" y1="150" x2="260" y2="260" stroke="url(#connection-gradient)" strokeWidth="2" opacity="0.6" />

      {/* Animated pulses */}
      <circle cx="80" cy="80" r="24" stroke="#22c55e" strokeWidth="2" opacity="0.3" className="animate-ping" />
      <circle cx="320" cy="80" r="24" stroke="#3b82f6" strokeWidth="2" opacity="0.3" className="animate-ping" style={{ animationDelay: '0.5s' }} />

      <defs>
        <linearGradient id="hub-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="node-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function CalendarLeadsIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Qualifizierte Termine Illustration - Kalender gefüllt mit B2B Leads"
    >
      {/* Calendar base */}
      <rect x="80" y="60" width="240" height="200" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />

      {/* Calendar header */}
      <rect x="80" y="60" width="240" height="50" rx="12" fill="url(#calendar-header)" />
      <rect x="80" y="98" width="240" height="12" fill="#1e293b" />

      {/* Calendar rings */}
      <rect x="120" y="50" width="8" height="24" rx="4" fill="#64748b" />
      <rect x="272" y="50" width="8" height="24" rx="4" fill="#64748b" />

      {/* Calendar grid */}
      <g opacity="0.5">
        <line x1="80" y1="140" x2="320" y2="140" stroke="#334155" />
        <line x1="80" y1="180" x2="320" y2="180" stroke="#334155" />
        <line x1="80" y1="220" x2="320" y2="220" stroke="#334155" />
        <line x1="160" y1="110" x2="160" y2="260" stroke="#334155" />
        <line x1="240" y1="110" x2="240" y2="260" stroke="#334155" />
      </g>

      {/* Highlighted meeting slots - green for qualified leads */}
      <rect x="90" y="115" width="60" height="20" rx="4" fill="#22c55e" opacity="0.8" />
      <rect x="170" y="145" width="60" height="20" rx="4" fill="#22c55e" opacity="0.8" />
      <rect x="250" y="115" width="60" height="20" rx="4" fill="#22c55e" opacity="0.8" />
      <rect x="90" y="185" width="60" height="20" rx="4" fill="#22c55e" opacity="0.8" />
      <rect x="250" y="185" width="60" height="20" rx="4" fill="#3b82f6" opacity="0.8" />
      <rect x="170" y="225" width="60" height="20" rx="4" fill="#22c55e" opacity="0.8" />

      {/* Check marks on meetings */}
      <path d="M105 125 L115 132 L130 118" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M185 155 L195 162 L210 148" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M265 125 L275 132 L290 118" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Notification badge */}
      <circle cx="310" cy="70" r="16" fill="#ef4444" />
      <text x="310" y="76" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">5</text>

      <defs>
        <linearGradient id="calendar-header" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function PhoneCallIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Telefonakquise Illustration - professionelle B2B Kaltakquise"
    >
      {/* Phone device */}
      <rect x="140" y="40" width="120" height="220" rx="20" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <rect x="150" y="60" width="100" height="170" rx="4" fill="#0f172a" />

      {/* Screen content - contact */}
      <circle cx="200" cy="110" r="25" fill="url(#avatar-gradient)" />
      <text x="200" y="118" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">E</text>

      <rect x="165" y="145" width="70" height="8" rx="4" fill="#334155" />
      <rect x="175" y="160" width="50" height="6" rx="3" fill="#334155" opacity="0.6" />

      {/* Call button */}
      <circle cx="200" cy="200" r="20" fill="#22c55e" />
      <path d="M192 192 C188 196, 188 204, 192 208 L196 212 C200 216, 204 216, 208 212 L212 208 C216 204, 216 196, 212 192 L208 188 C204 184, 200 184, 196 188 Z" fill="white" />

      {/* Sound waves */}
      <path d="M280 120 Q300 150, 280 180" stroke="#22c55e" strokeWidth="3" fill="none" opacity="0.6" />
      <path d="M300 100 Q330 150, 300 200" stroke="#22c55e" strokeWidth="3" fill="none" opacity="0.4" />
      <path d="M320 80 Q360 150, 320 220" stroke="#22c55e" strokeWidth="3" fill="none" opacity="0.2" />

      {/* Left side sound waves */}
      <path d="M120 120 Q100 150, 120 180" stroke="#3b82f6" strokeWidth="3" fill="none" opacity="0.6" />
      <path d="M100 100 Q70 150, 100 200" stroke="#3b82f6" strokeWidth="3" fill="none" opacity="0.4" />

      {/* Home indicator */}
      <rect x="180" y="245" width="40" height="4" rx="2" fill="#64748b" />

      <defs>
        <linearGradient id="avatar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function DataAnalyticsIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Vertrieb Analytics Illustration - transparentes Reporting und Leadgenerierung Metriken"
    >
      {/* Dashboard frame */}
      <rect x="50" y="40" width="300" height="220" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />

      {/* Header bar */}
      <rect x="50" y="40" width="300" height="40" rx="12" fill="#0f172a" />
      <rect x="50" y="68" width="300" height="12" fill="#1e293b" />
      <circle cx="75" cy="60" r="6" fill="#ef4444" />
      <circle cx="95" cy="60" r="6" fill="#f59e0b" />
      <circle cx="115" cy="60" r="6" fill="#22c55e" />

      {/* Line chart */}
      <path
        d="M80 180 L120 160 L160 170 L200 130 L240 140 L280 100 L320 90"
        stroke="url(#chart-gradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Chart area fill */}
      <path
        d="M80 180 L120 160 L160 170 L200 130 L240 140 L280 100 L320 90 L320 220 L80 220 Z"
        fill="url(#area-gradient)"
        opacity="0.3"
      />

      {/* Data points */}
      <circle cx="120" cy="160" r="5" fill="#22c55e" />
      <circle cx="200" cy="130" r="5" fill="#22c55e" />
      <circle cx="280" cy="100" r="5" fill="#22c55e" />
      <circle cx="320" cy="90" r="7" fill="#22c55e" className="animate-pulse" />

      {/* KPI boxes */}
      <rect x="70" y="95" width="70" height="45" rx="6" fill="#0f172a" stroke="#22c55e" strokeWidth="1" opacity="0.8" />
      <text x="105" y="115" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">+47%</text>
      <text x="105" y="130" textAnchor="middle" fill="#64748b" fontSize="8">Leads</text>

      <rect x="260" y="120" width="70" height="45" rx="6" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" opacity="0.8" />
      <text x="295" y="140" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">12</text>
      <text x="295" y="155" textAnchor="middle" fill="#64748b" fontSize="8">Termine</text>

      {/* Grid lines */}
      <g opacity="0.2">
        <line x1="80" y1="220" x2="320" y2="220" stroke="#64748b" />
        <line x1="80" y1="180" x2="320" y2="180" stroke="#64748b" strokeDasharray="4" />
        <line x1="80" y1="140" x2="320" y2="140" stroke="#64748b" strokeDasharray="4" />
        <line x1="80" y1="100" x2="320" y2="100" stroke="#64748b" strokeDasharray="4" />
      </g>

      <defs>
        <linearGradient id="chart-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function TargetAudienceIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Zielgruppen-Targeting Illustration - BANT-qualifizierte Entscheider finden"
    >
      {/* Target circles */}
      <circle cx="200" cy="150" r="100" stroke="#334155" strokeWidth="2" fill="none" />
      <circle cx="200" cy="150" r="70" stroke="#334155" strokeWidth="2" fill="none" />
      <circle cx="200" cy="150" r="40" stroke="url(#target-gradient)" strokeWidth="3" fill="none" />
      <circle cx="200" cy="150" r="12" fill="#22c55e" />

      {/* Target icons/people */}
      <g transform="translate(95, 75)">
        <circle cx="15" cy="15" r="12" fill="url(#person-gradient)" opacity="0.7" />
        <text x="15" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">?</text>
      </g>

      <g transform="translate(270, 100)">
        <circle cx="15" cy="15" r="12" fill="url(#person-gradient)" opacity="0.7" />
        <text x="15" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">?</text>
      </g>

      <g transform="translate(80, 180)">
        <circle cx="15" cy="15" r="12" fill="url(#person-gradient)" opacity="0.7" />
        <text x="15" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">?</text>
      </g>

      {/* Qualified leads - green checkmarks */}
      <g transform="translate(175, 60)">
        <circle cx="15" cy="15" r="14" fill="#22c55e" />
        <path d="M10 15 L14 19 L21 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <g transform="translate(255, 180)">
        <circle cx="15" cy="15" r="14" fill="#22c55e" />
        <path d="M10 15 L14 19 L21 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Crosshair */}
      <line x1="200" y1="30" x2="200" y2="70" stroke="#22c55e" strokeWidth="2" strokeDasharray="4" />
      <line x1="200" y1="230" x2="200" y2="270" stroke="#22c55e" strokeWidth="2" strokeDasharray="4" />
      <line x1="80" y1="150" x2="120" y2="150" stroke="#22c55e" strokeWidth="2" strokeDasharray="4" />
      <line x1="280" y1="150" x2="320" y2="150" stroke="#22c55e" strokeWidth="2" strokeDasharray="4" />

      <defs>
        <linearGradient id="target-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="person-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Professional Avatar placeholder for testimonials
export function ProfessionalAvatar({
  initials,
  className = '',
  variant = 'primary'
}: {
  initials: string
  className?: string
  variant?: 'primary' | 'blue' | 'purple'
}) {
  const gradients = {
    primary: ['#22c55e', '#15803d'],
    blue: ['#3b82f6', '#1d4ed8'],
    purple: ['#8b5cf6', '#6d28d9'],
  }

  const [start, end] = gradients[variant]

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`Profilbild ${initials}`}
    >
      <defs>
        <linearGradient id={`avatar-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={start} />
          <stop offset="100%" stopColor={end} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#avatar-${variant})`} />
      <circle cx="50" cy="50" r="44" fill="#0f172a" />
      <circle cx="50" cy="50" r="40" fill={`url(#avatar-${variant})`} opacity="0.2" />
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fill="white"
        fontSize="28"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        {initials}
      </text>
    </svg>
  )
}
