'use client'

interface Particle {
  position: string
  size: 'sm' | 'md' | 'lg'
  color: string
  animation: 'ping' | 'pulse'
  duration: string
}

interface DecorativeParticlesProps {
  particles?: Particle[]
  preset?: 'hero' | 'section' | 'minimal'
}

// Presets mit prozentbasierten Positionen für bessere Mobile-Kompatibilität
const presets: Record<string, Particle[]> = {
  hero: [
    { position: 'top-1/4 right-[15%]', size: 'md', color: 'bg-primary/60', animation: 'ping', duration: '3s' },
    { position: 'top-1/3 left-[10%]', size: 'sm', color: 'bg-blue-400/50', animation: 'pulse', duration: '2s' },
    { position: 'bottom-1/4 right-[20%]', size: 'sm', color: 'bg-purple-400/40', animation: 'ping', duration: '4s' },
  ],
  section: [
    { position: 'top-1/4 left-[5%]', size: 'md', color: 'bg-primary/40', animation: 'pulse', duration: '3s' },
    { position: 'bottom-1/3 right-[8%]', size: 'sm', color: 'bg-blue-400/30', animation: 'ping', duration: '4s' },
  ],
  minimal: [
    { position: 'top-1/4 right-[15%]', size: 'md', color: 'bg-primary/60', animation: 'ping', duration: '3s' },
    { position: 'top-1/3 left-[10%]', size: 'sm', color: 'bg-blue-400/50', animation: 'pulse', duration: '2s' },
  ],
}

const sizeClasses = {
  sm: 'w-1 h-1',
  md: 'w-1.5 h-1.5',
  lg: 'w-2 h-2',
}

export default function DecorativeParticles({
  particles,
  preset = 'section'
}: DecorativeParticlesProps) {
  const particlesToRender = particles || presets[preset]

  return (
    <>
      {particlesToRender.map((particle, index) => (
        <div
          key={index}
          className={`absolute ${particle.position} ${sizeClasses[particle.size]} ${particle.color} rounded-full animate-${particle.animation}`}
          style={{ animationDuration: particle.duration }}
        />
      ))}
    </>
  )
}
