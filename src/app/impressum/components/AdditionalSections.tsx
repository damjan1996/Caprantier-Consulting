'use client'

import Link from 'next/link'
import { Scale, FileText, Link as LinkIcon, Shield, Globe, Sparkles } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { SectionCard } from '@/components/ui'
import { businessInfo } from '@/lib/local-seo'

const CONTACT_EMAIL = 'nico@carpantier-consulting.de'

/**
 * Bewusst ohne Hinweis auf die EU-Plattform zur Online-Streitbeilegung (OS/ODR):
 * Die Verordnung (EU) Nr. 524/2013 wurde durch die Verordnung (EU) 2024/3228
 * aufgehoben, die Plattform ist seit dem 20.07.2025 abgeschaltet. Ein weiterhin
 * gesetzter Link geht ins Leere und gilt als irreführend im Sinne des UWG.
 * Die Informationspflicht nach § 36 VSBG bleibt davon unberührt.
 */
const additionalSections = [
  {
    icon: Scale,
    title: 'Verbraucherstreitbeilegung / Universalschlichtungsstelle',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-400/10',
    content: (
      <div className="text-muted-foreground space-y-3">
        <p>
          Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen (§ 36 Abs. 1 Nr. 1 VSBG).
        </p>
        <p>
          Unser Angebot richtet sich ausschließlich an Unternehmerinnen und Unternehmer im Sinne
          des § 14 BGB.
        </p>
      </div>
    ),
  },
  {
    icon: Sparkles,
    title: 'Einsatz künstlicher Intelligenz',
    iconColor: 'text-pink-400',
    iconBg: 'bg-pink-400/10',
    content: (
      <div className="text-muted-foreground space-y-3">
        <p>
          Auf dieser Website setzen wir künstliche Intelligenz ein: Die fotorealistischen Personen-
          und Situationsbilder sind KI-generiert und zeigen keine realen fotografischen Aufnahmen,
          der Chat wird von einem KI-Assistenten beantwortet. Beides ist unmittelbar am jeweiligen
          Inhalt gekennzeichnet.
        </p>
        <p>
          Die vollständigen Transparenzangaben nach Art. 50 der Verordnung (EU) 2024/1689 (KI-VO)
          finden Sie unter{' '}
          <Link href="/ki-transparenz" className="text-primary hover:underline">
            KI-Transparenz
          </Link>
          .
        </p>
      </div>
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
          Unsere zentrale Kontaktstelle für Nutzer und Behörden nach Art. 11, 12 DSA (Verordnung (EU) 2022/2065) erreichen Sie wie folgt:
        </p>
        <p>
          E-Mail:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
            {CONTACT_EMAIL}
          </a>
          <br />
          Telefon:{' '}
          <a href={`tel:${businessInfo.phoneInternational}`} className="text-primary hover:underline">
            {businessInfo.phoneFormatted}
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
      <div className="text-muted-foreground space-y-3">
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
          nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
          Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
          Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
          allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
          erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
          Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
          entfernen.
        </p>
      </div>
    ),
  },
  {
    icon: LinkIcon,
    title: 'Haftung für Links',
    iconColor: 'text-red-400',
    iconBg: 'bg-red-400/10',
    content: (
      <div className="text-muted-foreground space-y-3">
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
          übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
          Betreiber der Seiten verantwortlich.
        </p>
        <p>
          Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
          überprüft. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete
          Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
          Rechtsverletzungen werden wir derartige Links umgehend entfernen.
        </p>
      </div>
    ),
  },
  {
    icon: Shield,
    title: 'Urheberrecht',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
    content: (
      <div className="text-muted-foreground space-y-3">
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
          dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
          der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
          Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
        <p>
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
          Urheberrechte Dritter beachtet. Sollten Sie dennoch auf eine Urheberrechtsverletzung
          aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
          Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
        </p>
      </div>
    ),
  },
]

export default function AdditionalSections() {
  return (
    <div className="space-y-6">
      {additionalSections.map((section, index) => (
        <FadeIn key={section.title} delay={0.4 + index * 0.1}>
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
