'use client'

import { Mail, User, Building, FileText, Phone } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { SectionCard } from '@/components/ui'

const infoCards = [
  {
    icon: Building,
    title: 'Angaben gemäß § 5 TMG',
    content: (
      <p className="text-muted-foreground">
        Nico-Luca Carpantier<br />
        Stammheimer Straße 123<br />
        50935 Köln
      </p>
    ),
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-400/10',
  },
  {
    icon: Phone,
    title: 'Kontakt',
    content: (
      <div className="text-muted-foreground space-y-2">
        <p>
          Telefon:{' '}
          <a href="tel:+4915738186221" className="text-primary hover:underline">
            +49 (0)1573 8186221
          </a>
        </p>
        <p>
          E-Mail:{' '}
          <a href="mailto:nico@carpantier-consulting.de" className="text-primary hover:underline">
            nico@carpantier-consulting.de
          </a>
        </p>
      </div>
    ),
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-400/10',
  },
  {
    icon: FileText,
    title: 'Umsatzsteuer-ID',
    content: (
      <p className="text-muted-foreground">
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
        DE999999999
      </p>
    ),
    iconColor: 'text-green-400',
    iconBg: 'bg-green-400/10',
  },
  {
    icon: User,
    title: 'Verantwortlich für den Inhalt',
    content: (
      <p className="text-muted-foreground">
        Nico-Luca Carpantier<br />
        Stammheimer Straße 123<br />
        50935 Köln
      </p>
    ),
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-400/10',
  },
]

export default function InfoCards() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      {infoCards.map((card, index) => (
        <FadeIn key={index} delay={index * 0.1}>
          <SectionCard
            icon={card.icon}
            iconColor={card.iconColor}
            iconBg={card.iconBg}
            title={card.title}
            className="h-full"
          >
            {card.content}
          </SectionCard>
        </FadeIn>
      ))}
    </div>
  )
}
