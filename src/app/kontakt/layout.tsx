import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktieren Sie Carpantier Consulting fuer ein kostenloses Strategiegespraech. Wir zeigen Ihnen, wie Sie planbar Neukunden gewinnen.',
  openGraph: {
    title: 'Kontakt | Carpantier Consulting',
    description: 'Buchen Sie Ihr kostenloses Strategiegespraech fuer planbare Neukundengewinnung.',
  },
}

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
