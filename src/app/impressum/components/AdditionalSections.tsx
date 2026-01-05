'use client'

import { Scale, FileText, Link as LinkIcon, Shield, Globe } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { SectionCard } from '@/components/ui'

const additionalSections = [
  {
    icon: LinkIcon,
    title: 'EU-Streitschlichtung',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-400/10',
    content: (
      <p className="text-muted-foreground">
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          https://ec.europa.eu/consumers/odr/
        </a>
        <br />
        Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>
    ),
  },
  {
    icon: Scale,
    title: 'Verbraucherstreitbeilegung/Universalschlichtungsstelle',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-400/10',
    content: (
      <p className="text-muted-foreground">
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    ),
  },
  {
    icon: Globe,
    title: 'Zentrale Kontaktstelle nach dem Digital Services Act - DSA',
    iconColor: 'text-green-400',
    iconBg: 'bg-green-400/10',
    content: (
      <div className="text-muted-foreground space-y-3">
        <p>
          Unsere zentrale Kontaktstelle für Nutzer und Behörden nach Art. 11, 12 DSA (Verordnung (EU) 2022/265) erreichen Sie wie folgt:
        </p>
        <p>
          E-Mail:{' '}
          <a href="mailto:nico@carpantier-consulting.de" className="text-primary hover:underline">
            nico@carpantier-consulting.de
          </a>
          <br />
          Telefon:{' '}
          <a href="tel:+4915738186221" className="text-primary hover:underline">
            +49 1573 8186221
          </a>
        </p>
        <p>
          Die für den Kontakt zur Verfügung stehenden Sprachen sind: Deutsch, Englisch.
        </p>
      </div>
    ),
  },
  {
    icon: FileText,
    title: 'Haftung für Inhalte',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-400/10',
    content: (
      <>
        <p className="text-muted-foreground mb-4">
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
        </p>
        <p className="text-muted-foreground">
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
        </p>
      </>
    ),
  },
  {
    icon: LinkIcon,
    title: 'Haftung für Links',
    iconColor: 'text-red-400',
    iconBg: 'bg-red-400/10',
    content: (
      <p className="text-muted-foreground">
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
      </p>
    ),
  },
  {
    icon: Shield,
    title: 'Urheberrecht',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
    content: (
      <p className="text-muted-foreground">
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
      </p>
    ),
  },
]

export default function AdditionalSections() {
  return (
    <div className="space-y-6">
      {additionalSections.map((section, index) => (
        <FadeIn key={index} delay={0.4 + index * 0.1}>
          <SectionCard
            icon={section.icon}
            iconColor={section.iconColor}
            iconBg={section.iconBg}
            title={section.title}
          >
            {section.content}
          </SectionCard>
        </FadeIn>
      ))}
    </div>
  )
}
