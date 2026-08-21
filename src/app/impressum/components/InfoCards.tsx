'use client'

import { User, Building, Phone } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { SectionCard } from '@/components/ui'

/**
 * Bewusst ohne Angabe zur Umsatzsteuer-Identifikationsnummer.
 *
 * § 5 Abs. 1 Nr. 6 DDG verlangt die USt-IdNr. nur, wenn eine erteilt ist. Für
 * dieses Einzelunternehmen ist keine erteilt, also entfällt die Angabe.
 *
 * Ebenso bewusst fehlt ein Satz wie „keine USt-IdNr. vorhanden" oder ein
 * Hinweis auf § 19 UStG: Beides ist keine Impressumspflicht, und eine Aussage
 * über den eigenen Steuerstatus gehört nicht ohne steuerliche Bestätigung auf
 * die Website.
 *
 * Wird später eine USt-IdNr. erteilt, gehört sie hier als weitere Karte hinein
 * (Format: DE + 9 Ziffern) — dann ist sie Pflichtangabe.
 */

const ADDRESS = (
  <p className="text-muted-foreground">
    Nico-Luca Carpantier<br />
    Stammheimer Straße 123<br />
    50935 Köln
  </p>
)

const infoCards = [
  {
    icon: Building,
    title: 'Angaben gemäß § 5 DDG',
    content: ADDRESS,
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
    icon: User,
    title: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
    content: ADDRESS,
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-400/10',
  },
]

export default function InfoCards() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      {infoCards.map((card, index) => (
        <FadeIn key={card.title} delay={index * 0.1}>
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
