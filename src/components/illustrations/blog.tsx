// Blog-spezifische SVG-Illustrationen für SEO-optimierte Artikel
// Themen: KI im Vertrieb, Rechtliche Grundlagen, BANT, Outsourcing, SDR

export function AIVertriebIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Künstliche Intelligenz im B2B Vertrieb - Automatisierung und Leadgenerierung"
    >
      {/* Background elements */}
      <rect x="50" y="50" width="700" height="300" rx="20" fill="#0f172a" opacity="0.5" />

      {/* AI Brain/Chip */}
      <g transform="translate(100, 100)">
        <rect x="0" y="0" width="120" height="120" rx="16" fill="url(#ai-chip-gradient)" />
        <rect x="10" y="10" width="100" height="100" rx="12" fill="#0f172a" />
        {/* Circuit lines */}
        <path d="M30 60 H50 M70 60 H90" stroke="#22c55e" strokeWidth="2" />
        <path d="M60 30 V50 M60 70 V90" stroke="#22c55e" strokeWidth="2" />
        <circle cx="60" cy="60" r="15" fill="url(#ai-core-gradient)" />
        <circle cx="60" cy="60" r="8" fill="#22c55e" className="animate-pulse" />
        {/* Connection dots */}
        <circle cx="30" cy="30" r="4" fill="#3b82f6" />
        <circle cx="90" cy="30" r="4" fill="#3b82f6" />
        <circle cx="30" cy="90" r="4" fill="#3b82f6" />
        <circle cx="90" cy="90" r="4" fill="#3b82f6" />
      </g>

      {/* Data flow lines to contacts */}
      <path d="M220 160 C280 160, 300 100, 350 100" stroke="url(#data-flow)" strokeWidth="3" fill="none" strokeDasharray="8 4" />
      <path d="M220 160 C280 160, 300 160, 350 160" stroke="url(#data-flow)" strokeWidth="3" fill="none" strokeDasharray="8 4" />
      <path d="M220 160 C280 160, 300 220, 350 220" stroke="url(#data-flow)" strokeWidth="3" fill="none" strokeDasharray="8 4" />

      {/* Contact cards */}
      <g transform="translate(350, 70)">
        <rect x="0" y="0" width="160" height="60" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
        <circle cx="30" cy="30" r="18" fill="url(#contact-gradient)" />
        <text x="30" y="36" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">A</text>
        <rect x="60" y="18" width="80" height="8" rx="4" fill="#334155" />
        <rect x="60" y="34" width="60" height="6" rx="3" fill="#334155" opacity="0.6" />
        <circle cx="145" cy="30" r="8" fill="#22c55e" />
        <path d="M141 30 L144 33 L150 27" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </g>

      <g transform="translate(350, 140)">
        <rect x="0" y="0" width="160" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
        <circle cx="30" cy="30" r="18" fill="url(#contact-gradient-2)" />
        <text x="30" y="36" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">B</text>
        <rect x="60" y="18" width="80" height="8" rx="4" fill="#334155" />
        <rect x="60" y="34" width="60" height="6" rx="3" fill="#334155" opacity="0.6" />
        <circle cx="145" cy="30" r="8" fill="#22c55e" />
        <path d="M141 30 L144 33 L150 27" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </g>

      <g transform="translate(350, 210)">
        <rect x="0" y="0" width="160" height="60" rx="8" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
        <circle cx="30" cy="30" r="18" fill="url(#contact-gradient-3)" />
        <text x="30" y="36" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">C</text>
        <rect x="60" y="18" width="80" height="8" rx="4" fill="#334155" />
        <rect x="60" y="34" width="60" height="6" rx="3" fill="#334155" opacity="0.6" />
        <circle cx="145" cy="30" r="8" fill="#f59e0b" />
        <text x="145" y="34" textAnchor="middle" fill="white" fontSize="10">?</text>
      </g>

      {/* Analytics Dashboard */}
      <g transform="translate(560, 80)">
        <rect x="0" y="0" width="180" height="200" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        <rect x="0" y="0" width="180" height="40" rx="12" fill="#0f172a" />
        <text x="20" y="26" fill="#64748b" fontSize="12">KI-Analyse</text>
        <circle cx="160" cy="20" r="6" fill="#22c55e" className="animate-pulse" />

        {/* Mini chart */}
        <path d="M20 120 L50 100 L80 110 L110 80 L140 70 L160 50" stroke="#22c55e" strokeWidth="2" fill="none" />
        <path d="M20 120 L50 100 L80 110 L110 80 L140 70 L160 50 L160 160 L20 160 Z" fill="url(#chart-fill)" opacity="0.3" />

        {/* Stats */}
        <text x="20" y="180" fill="#22c55e" fontSize="16" fontWeight="bold">+47%</text>
        <text x="70" y="180" fill="#64748b" fontSize="10">Conversion</text>
      </g>

      <defs>
        <linearGradient id="ai-chip-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="ai-core-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="data-flow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="contact-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="contact-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="contact-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="chart-fill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function RechtlicheGrundlagenIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Rechtliche Grundlagen der Kaltakquise in Deutschland - UWG Paragraph 7"
    >
      {/* Document/Law background */}
      <g transform="translate(100, 50)">
        <rect x="0" y="0" width="250" height="300" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        {/* Header */}
        <rect x="0" y="0" width="250" height="50" rx="8" fill="#0f172a" />
        <text x="20" y="32" fill="#f59e0b" fontSize="16" fontWeight="bold">§ 7 UWG</text>

        {/* Paragraph lines */}
        <rect x="20" y="70" width="180" height="8" rx="4" fill="#334155" />
        <rect x="20" y="90" width="210" height="8" rx="4" fill="#334155" />
        <rect x="20" y="110" width="160" height="8" rx="4" fill="#334155" />

        {/* Checkmarks for B2B */}
        <g transform="translate(20, 140)">
          <circle cx="12" cy="12" r="12" fill="#22c55e" opacity="0.2" />
          <path d="M7 12 L11 16 L18 8" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
          <text x="35" y="16" fill="#22c55e" fontSize="12">B2B erlaubt</text>
        </g>

        {/* X for B2C */}
        <g transform="translate(20, 180)">
          <circle cx="12" cy="12" r="12" fill="#ef4444" opacity="0.2" />
          <path d="M8 8 L16 16 M16 8 L8 16" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
          <text x="35" y="16" fill="#ef4444" fontSize="12">B2C eingeschränkt</text>
        </g>

        {/* Info box */}
        <rect x="20" y="220" width="210" height="60" rx="6" fill="#22c55e" opacity="0.1" stroke="#22c55e" strokeWidth="1" />
        <text x="30" y="245" fill="#22c55e" fontSize="11">Mutmaßliche Einwilligung</text>
        <text x="30" y="265" fill="#64748b" fontSize="10">bei geschäftlichem Interesse</text>
      </g>

      {/* Shield/Compliance */}
      <g transform="translate(420, 80)">
        <path d="M100 0 L180 30 L180 120 C180 180, 100 220, 100 220 C100 220, 20 180, 20 120 L20 30 Z" fill="url(#shield-gradient)" />
        <path d="M100 20 L160 45 L160 115 C160 165, 100 195, 100 195 C100 195, 40 165, 40 115 L40 45 Z" fill="#0f172a" />
        <path d="M75 100 L95 120 L130 75" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* DSGVO Badge */}
      <g transform="translate(580, 200)">
        <rect x="0" y="0" width="140" height="80" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
        <text x="70" y="35" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">DSGVO</text>
        <text x="70" y="55" textAnchor="middle" fill="#64748b" fontSize="10">konform</text>
        <circle cx="70" cy="70" r="4" fill="#22c55e" />
      </g>

      {/* Balance scale */}
      <g transform="translate(450, 280)">
        <line x1="100" y1="0" x2="100" y2="60" stroke="#64748b" strokeWidth="3" />
        <line x1="40" y1="20" x2="160" y2="20" stroke="#64748b" strokeWidth="3" />
        <circle cx="100" cy="0" r="8" fill="#f59e0b" />
        {/* Left plate */}
        <ellipse cx="40" cy="35" rx="30" ry="8" fill="#22c55e" opacity="0.3" />
        <text x="40" y="55" textAnchor="middle" fill="#22c55e" fontSize="9">Erlaubt</text>
        {/* Right plate */}
        <ellipse cx="160" cy="35" rx="30" ry="8" fill="#ef4444" opacity="0.3" />
        <text x="160" y="55" textAnchor="middle" fill="#ef4444" fontSize="9">Verboten</text>
      </g>

      <defs>
        <linearGradient id="shield-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function BANTMethodeIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="BANT Methode erklärt - Budget Authority Need Timing Qualifizierung"
    >
      {/* BANT Letters as blocks */}
      <g transform="translate(80, 100)">
        {/* B - Budget */}
        <rect x="0" y="0" width="140" height="180" rx="16" fill="url(#bant-b)" />
        <text x="70" y="70" textAnchor="middle" fill="white" fontSize="48" fontWeight="bold">B</text>
        <text x="70" y="110" textAnchor="middle" fill="white" fontSize="14" fontWeight="500">Budget</text>
        <rect x="20" y="130" width="100" height="30" rx="6" fill="rgba(255,255,255,0.1)" />
        <text x="70" y="150" textAnchor="middle" fill="white" fontSize="10">€ vorhanden?</text>
      </g>

      <g transform="translate(240, 100)">
        {/* A - Authority */}
        <rect x="0" y="0" width="140" height="180" rx="16" fill="url(#bant-a)" />
        <text x="70" y="70" textAnchor="middle" fill="white" fontSize="48" fontWeight="bold">A</text>
        <text x="70" y="110" textAnchor="middle" fill="white" fontSize="14" fontWeight="500">Authority</text>
        <rect x="20" y="130" width="100" height="30" rx="6" fill="rgba(255,255,255,0.1)" />
        <text x="70" y="150" textAnchor="middle" fill="white" fontSize="10">Entscheider?</text>
      </g>

      <g transform="translate(400, 100)">
        {/* N - Need */}
        <rect x="0" y="0" width="140" height="180" rx="16" fill="url(#bant-n)" />
        <text x="70" y="70" textAnchor="middle" fill="white" fontSize="48" fontWeight="bold">N</text>
        <text x="70" y="110" textAnchor="middle" fill="white" fontSize="14" fontWeight="500">Need</text>
        <rect x="20" y="130" width="100" height="30" rx="6" fill="rgba(255,255,255,0.1)" />
        <text x="70" y="150" textAnchor="middle" fill="white" fontSize="10">Bedarf?</text>
      </g>

      <g transform="translate(560, 100)">
        {/* T - Timing */}
        <rect x="0" y="0" width="140" height="180" rx="16" fill="url(#bant-t)" />
        <text x="70" y="70" textAnchor="middle" fill="white" fontSize="48" fontWeight="bold">T</text>
        <text x="70" y="110" textAnchor="middle" fill="white" fontSize="14" fontWeight="500">Timing</text>
        <rect x="20" y="130" width="100" height="30" rx="6" fill="rgba(255,255,255,0.1)" />
        <text x="70" y="150" textAnchor="middle" fill="white" fontSize="10">Zeitpunkt?</text>
      </g>

      {/* Connection arrows */}
      <path d="M220 190 L240 190" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
      <path d="M380 190 L400 190" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
      <path d="M540 190 L560 190" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* Result badge */}
      <g transform="translate(300, 310)">
        <rect x="0" y="0" width="200" height="50" rx="25" fill="#22c55e" />
        <text x="100" y="32" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">= Qualifizierter Lead</text>
      </g>

      {/* Arrow down to result */}
      <path d="M400 280 L400 310" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrow-green)" />

      <defs>
        <linearGradient id="bant-b" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="bant-a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bant-n" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bant-t" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill="#64748b" />
        </marker>
        <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill="#22c55e" />
        </marker>
      </defs>
    </svg>
  )
}

export function OutsourcingVsInhouseIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Vertrieb auslagern vs. internes Team - Kostenvergleich Outsourcing"
    >
      {/* Left side - Inhouse */}
      <g transform="translate(50, 60)">
        <rect x="0" y="0" width="300" height="280" rx="16" fill="#1e293b" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
        <text x="150" y="35" textAnchor="middle" fill="#ef4444" fontSize="18" fontWeight="bold">Internes Team</text>

        {/* Cost items */}
        <g transform="translate(20, 60)">
          <rect x="0" y="0" width="260" height="40" rx="6" fill="#ef4444" opacity="0.1" />
          <text x="15" y="26" fill="#ef4444" fontSize="12">Gehälter</text>
          <text x="220" y="26" fill="#ef4444" fontSize="12" fontWeight="bold">€5.000+</text>
        </g>
        <g transform="translate(20, 110)">
          <rect x="0" y="0" width="260" height="40" rx="6" fill="#ef4444" opacity="0.1" />
          <text x="15" y="26" fill="#ef4444" fontSize="12">Sozialabgaben</text>
          <text x="220" y="26" fill="#ef4444" fontSize="12" fontWeight="bold">€1.000+</text>
        </g>
        <g transform="translate(20, 160)">
          <rect x="0" y="0" width="260" height="40" rx="6" fill="#ef4444" opacity="0.1" />
          <text x="15" y="26" fill="#ef4444" fontSize="12">Recruiting</text>
          <text x="220" y="26" fill="#ef4444" fontSize="12" fontWeight="bold">€3.000+</text>
        </g>
        <g transform="translate(20, 210)">
          <rect x="0" y="0" width="260" height="40" rx="6" fill="#ef4444" opacity="0.1" />
          <text x="15" y="26" fill="#ef4444" fontSize="12">Einarbeitung</text>
          <text x="220" y="26" fill="#ef4444" fontSize="12" fontWeight="bold">3-6 Mon.</text>
        </g>
      </g>

      {/* VS Circle */}
      <circle cx="400" cy="200" r="35" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
      <text x="400" y="208" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">VS</text>

      {/* Right side - Outsourcing */}
      <g transform="translate(450, 60)">
        <rect x="0" y="0" width="300" height="280" rx="16" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
        <text x="150" y="35" textAnchor="middle" fill="#22c55e" fontSize="18" fontWeight="bold">Outsourcing</text>

        {/* Benefits */}
        <g transform="translate(20, 60)">
          <rect x="0" y="0" width="260" height="40" rx="6" fill="#22c55e" opacity="0.1" />
          <circle cx="20" cy="20" r="10" fill="#22c55e" />
          <path d="M15 20 L18 23 L25 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <text x="45" y="26" fill="#22c55e" fontSize="12">Keine Fixkosten</text>
        </g>
        <g transform="translate(20, 110)">
          <rect x="0" y="0" width="260" height="40" rx="6" fill="#22c55e" opacity="0.1" />
          <circle cx="20" cy="20" r="10" fill="#22c55e" />
          <path d="M15 20 L18 23 L25 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <text x="45" y="26" fill="#22c55e" fontSize="12">Sofort einsatzbereit</text>
        </g>
        <g transform="translate(20, 160)">
          <rect x="0" y="0" width="260" height="40" rx="6" fill="#22c55e" opacity="0.1" />
          <circle cx="20" cy="20" r="10" fill="#22c55e" />
          <path d="M15 20 L18 23 L25 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <text x="45" y="26" fill="#22c55e" fontSize="12">Erfahrene Profis</text>
        </g>
        <g transform="translate(20, 210)">
          <rect x="0" y="0" width="260" height="40" rx="6" fill="#22c55e" opacity="0.1" />
          <circle cx="20" cy="20" r="10" fill="#22c55e" />
          <path d="M15 20 L18 23 L25 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <text x="45" y="26" fill="#22c55e" fontSize="12">Flexibel skalierbar</text>
        </g>
      </g>
    </svg>
  )
}

export function SDRServiceIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SDR as a Service - Sales Development Representative Outsourcing"
    >
      {/* SDR Person */}
      <g transform="translate(100, 80)">
        <circle cx="80" cy="60" r="50" fill="url(#sdr-avatar)" />
        <circle cx="80" cy="60" r="40" fill="#0f172a" />
        <text x="80" y="70" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">SDR</text>

        {/* Headset */}
        <path d="M40 50 C40 25, 120 25, 120 50" stroke="#22c55e" strokeWidth="4" fill="none" />
        <circle cx="35" cy="55" r="8" fill="#22c55e" />
        <circle cx="125" cy="55" r="8" fill="#22c55e" />
        <path d="M35 63 L35 80 C35 85, 45 85, 45 80" stroke="#22c55e" strokeWidth="3" fill="none" />
      </g>

      {/* Activity flow */}
      <g transform="translate(280, 60)">
        {/* Research */}
        <rect x="0" y="0" width="140" height="80" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
        <circle cx="30" cy="40" r="20" fill="#3b82f6" opacity="0.2" />
        <text x="30" y="45" textAnchor="middle" fill="#3b82f6" fontSize="16">🔍</text>
        <text x="90" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="500">Research</text>
        <text x="90" y="52" textAnchor="middle" fill="#64748b" fontSize="10">Zielgruppe</text>
      </g>

      <path d="M420 100 L450 100" stroke="#64748b" strokeWidth="2" />

      <g transform="translate(450, 60)">
        {/* Outreach */}
        <rect x="0" y="0" width="140" height="80" rx="10" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
        <circle cx="30" cy="40" r="20" fill="#8b5cf6" opacity="0.2" />
        <text x="30" y="45" textAnchor="middle" fill="#8b5cf6" fontSize="16">📞</text>
        <text x="90" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="500">Outreach</text>
        <text x="90" y="52" textAnchor="middle" fill="#64748b" fontSize="10">Kaltakquise</text>
      </g>

      <path d="M590 100 L620 100" stroke="#64748b" strokeWidth="2" />

      <g transform="translate(620, 60)">
        {/* Qualify */}
        <rect x="0" y="0" width="140" height="80" rx="10" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
        <circle cx="30" cy="40" r="20" fill="#22c55e" opacity="0.2" />
        <text x="30" y="45" textAnchor="middle" fill="#22c55e" fontSize="16">✓</text>
        <text x="90" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="500">Qualify</text>
        <text x="90" y="52" textAnchor="middle" fill="#64748b" fontSize="10">BANT</text>
      </g>

      {/* Arrow to Calendar */}
      <path d="M690 140 L690 180 L550 180 L550 220" stroke="#22c55e" strokeWidth="3" fill="none" markerEnd="url(#arrow-sdr)" />

      {/* Calendar result */}
      <g transform="translate(450, 220)">
        <rect x="0" y="0" width="200" height="120" rx="12" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
        <rect x="0" y="0" width="200" height="35" rx="12" fill="#22c55e" />
        <text x="100" y="24" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Ihr Kalender</text>

        {/* Meeting slots */}
        <rect x="15" y="50" width="170" height="25" rx="4" fill="#22c55e" opacity="0.2" />
        <text x="25" y="67" fill="#22c55e" fontSize="10">Di 10:00 - Qualifizierter Termin</text>
        <rect x="15" y="85" width="170" height="25" rx="4" fill="#22c55e" opacity="0.2" />
        <text x="25" y="102" fill="#22c55e" fontSize="10">Do 14:00 - Qualifizierter Termin</text>
      </g>

      {/* Metrics */}
      <g transform="translate(100, 250)">
        <rect x="0" y="0" width="280" height="100" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1" />
        <text x="140" y="30" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Typische Ergebnisse</text>

        <text x="50" y="60" textAnchor="middle" fill="#22c55e" fontSize="20" fontWeight="bold">40-60</text>
        <text x="50" y="80" textAnchor="middle" fill="#64748b" fontSize="10">Calls/Tag</text>

        <text x="140" y="60" textAnchor="middle" fill="#3b82f6" fontSize="20" fontWeight="bold">15-25</text>
        <text x="140" y="80" textAnchor="middle" fill="#64748b" fontSize="10">Gespräche</text>

        <text x="230" y="60" textAnchor="middle" fill="#8b5cf6" fontSize="20" fontWeight="bold">3-8</text>
        <text x="230" y="80" textAnchor="middle" fill="#64748b" fontSize="10">Termine/Wo</text>
      </g>

      <defs>
        <linearGradient id="sdr-avatar" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <marker id="arrow-sdr" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill="#22c55e" />
        </marker>
      </defs>
    </svg>
  )
}

export function EinwandbehandlungIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Einwandbehandlung im Vertrieb - häufige Kundeneinwände und Antworten"
    >
      {/* Speech bubbles - Objections */}
      <g transform="translate(50, 50)">
        <path d="M0 30 L200 30 Q220 30 220 50 L220 90 Q220 110 200 110 L40 110 L20 130 L30 110 L20 110 Q0 110 0 90 L0 50 Q0 30 20 30 Z" fill="#ef4444" opacity="0.2" stroke="#ef4444" strokeWidth="2" />
        <text x="110" y="75" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="500">&quot;Kein Interesse&quot;</text>
      </g>

      <g transform="translate(50, 160)">
        <path d="M0 30 L200 30 Q220 30 220 50 L220 90 Q220 110 200 110 L40 110 L20 130 L30 110 L20 110 Q0 110 0 90 L0 50 Q0 30 20 30 Z" fill="#f59e0b" opacity="0.2" stroke="#f59e0b" strokeWidth="2" />
        <text x="110" y="75" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="500">&quot;Keine Zeit&quot;</text>
      </g>

      <g transform="translate(50, 270)">
        <path d="M0 30 L200 30 Q220 30 220 50 L220 90 Q220 110 200 110 L40 110 L20 130 L30 110 L20 110 Q0 110 0 90 L0 50 Q0 30 20 30 Z" fill="#8b5cf6" opacity="0.2" stroke="#8b5cf6" strokeWidth="2" />
        <text x="110" y="75" textAnchor="middle" fill="#8b5cf6" fontSize="14" fontWeight="500">&quot;Zu teuer&quot;</text>
      </g>

      {/* Arrow transformation */}
      <g transform="translate(290, 180)">
        <path d="M0 20 L60 20" stroke="#64748b" strokeWidth="3" markerEnd="url(#transform-arrow)" />
        <circle cx="30" cy="20" r="20" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
        <text x="30" y="25" textAnchor="middle" fill="#22c55e" fontSize="14">↻</text>
      </g>

      {/* Response bubbles */}
      <g transform="translate(380, 30)">
        <path d="M20 30 L200 30 Q220 30 220 50 L220 110 Q220 130 200 130 L20 130 Q0 130 0 110 L0 50 Q0 30 20 30 Z M200 100 L220 120 L190 100 Z" fill="#22c55e" opacity="0.2" stroke="#22c55e" strokeWidth="2" />
        <text x="110" y="60" textAnchor="middle" fill="#22c55e" fontSize="11">&quot;Verstehe ich. Darf ich</text>
        <text x="110" y="78" textAnchor="middle" fill="#22c55e" fontSize="11">fragen, wie Sie aktuell</text>
        <text x="110" y="96" textAnchor="middle" fill="#22c55e" fontSize="11">[Problem] lösen?&quot;</text>
      </g>

      <g transform="translate(380, 150)">
        <path d="M20 30 L200 30 Q220 30 220 50 L220 110 Q220 130 200 130 L20 130 Q0 130 0 110 L0 50 Q0 30 20 30 Z M200 100 L220 120 L190 100 Z" fill="#22c55e" opacity="0.2" stroke="#22c55e" strokeWidth="2" />
        <text x="110" y="60" textAnchor="middle" fill="#22c55e" fontSize="11">&quot;Wann passt es Ihnen</text>
        <text x="110" y="78" textAnchor="middle" fill="#22c55e" fontSize="11">besser? Ich rufe</text>
        <text x="110" y="96" textAnchor="middle" fill="#22c55e" fontSize="11">gerne zurück.&quot;</text>
      </g>

      <g transform="translate(380, 270)">
        <path d="M20 30 L200 30 Q220 30 220 50 L220 110 Q220 130 200 130 L20 130 Q0 130 0 110 L0 50 Q0 30 20 30 Z M200 100 L220 120 L190 100 Z" fill="#22c55e" opacity="0.2" stroke="#22c55e" strokeWidth="2" />
        <text x="110" y="60" textAnchor="middle" fill="#22c55e" fontSize="11">&quot;Mit welchem Budget</text>
        <text x="110" y="78" textAnchor="middle" fill="#22c55e" fontSize="11">rechnen Sie? Vielleicht</text>
        <text x="110" y="96" textAnchor="middle" fill="#22c55e" fontSize="11">finden wir eine Lösung.&quot;</text>
      </g>

      {/* Success indicator */}
      <g transform="translate(620, 150)">
        <rect x="0" y="0" width="140" height="100" rx="12" fill="#22c55e" opacity="0.1" stroke="#22c55e" strokeWidth="2" />
        <circle cx="70" cy="40" r="25" fill="#22c55e" />
        <path d="M58 40 L66 48 L82 32" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="70" y="80" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Gespräch gerettet</text>
      </g>

      <defs>
        <marker id="transform-arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill="#64748b" />
        </marker>
      </defs>
    </svg>
  )
}
