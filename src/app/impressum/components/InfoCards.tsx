'use client'

import { User, Building, Phone, Receipt } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { SectionCard } from '@/components/ui'

/**
 * Umsatzsteuer-Identifikationsnummer nach § 27 a UStG.
 *
 * Pflichtangabe nach § 5 Abs. 1 Nr. 6 DDG, sobald eine USt-IdNr. erteilt ist.
 * Solange hier der Platzhalter steht, wird die Karte bewusst NICHT gerendert:
 * eine falsche Nummer im Impressum wiegt schwerer als eine fehlende Angabe.
 *
 * TODO(Carpantier): echte USt-IdNr. eintragen (Format: DE + 9 Ziffern).
 */
const VAT_ID = 'DE_USTIDNR_EINTRAGEN'

const VAT_ID_PLACEHOLDER = 'DE_USTIDNR_EINTRAGEN'

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
  ...(VAT_ID === VAT_ID_PLACEHOLDER
    ? []
    : [
        {
          icon: Receipt,
          title: 'Umsatzsteuer-ID',
          content: (
            <p className="text-muted-foreground">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              <span className="text-foreground">{VAT_ID}</span>
            </p>
          ),
          iconColor: 'text-green-400',
          iconBg: 'bg-green-400/10',
        },
      ]),
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
