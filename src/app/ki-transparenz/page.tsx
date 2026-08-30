'use client'

import Link from 'next/link'
import { Sparkles, ImageIcon, Scale, UserCheck } from 'lucide-react'
import { PageWrapper, PageHero, SectionCard, FadeIn } from '@/components/ui'

const AI_IMAGE_LOCATIONS = [
  'Startseite — Hero-Bild und Bild im Abschnitt „Über uns“',
  'Leistungen — Hero-Bild',
  'Leistungen in Ihrer Stadt — Hero-Bild',
  'Über uns — Hero-Bild und Porträt',
  'Kontakt — Hero-Bild und Porträt',
  'Blog — Beitragsbilder',
]

export default function KiTransparenzPage() {
  return (
    <PageWrapper>
      <PageHero
        badge="KI-Transparenz"
        badgeIcon={Sparkles}
        title={
          <>
            Wo wir <span className="text-primary">künstliche Intelligenz</span> einsetzen
          </>
        }
        description="Transparenzangaben nach Art. 50 der Verordnung (EU) 2024/1689 über künstliche Intelligenz (KI-VO)."
      />

      <section className="section-padding relative">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-6">
            <FadeIn delay={0.1}>
              <SectionCard
                icon={ImageIcon}
                iconColor="text-purple-400"
                iconBg="bg-purple-400/10"
                title="KI-generierte Bilder"
              >
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Sämtliche fotorealistischen Personen- und Situationsbilder auf dieser Website
                    wurden mit generativer künstlicher Intelligenz erzeugt. Es handelt sich
                    <strong className="text-foreground"> nicht um reale fotografische Aufnahmen</strong>.
                    Dargestellte Personen im Hintergrund, Büroräume, Bildschirminhalte und
                    Arbeitssituationen sind synthetisch und bilden keine tatsächlichen Vorgänge,
                    Räumlichkeiten oder Mitarbeitenden ab.
                  </p>
                  <p>
                    Jedes dieser Bilder ist unmittelbar am Bild mit dem Hinweis
                    <span className="mx-1 inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
                      <Sparkles className="h-3 w-3" aria-hidden="true" /> KI-generiert
                    </span>
                    gekennzeichnet. Betroffen sind:
                  </p>
                  <ul className="space-y-2">
                    {AI_IMAGE_LOCATIONS.map((location) => (
                      <li key={location} className="flex items-start gap-2 text-sm">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                        {location}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm">
                    Rechtsgrundlage der Kennzeichnung: Art. 50 Abs. 4 KI-VO.
                  </p>
                </div>
              </SectionCard>
            </FadeIn>

            <FadeIn delay={0.2}>
              <SectionCard
                icon={UserCheck}
                iconColor="text-green-400"
                iconBg="bg-green-400/10"
                title="KI-gestützte Texte"
              >
                <p className="text-muted-foreground">
                  Ein Teil der redaktionellen Inhalte dieser Website — insbesondere Blog- und
                  Glossarbeiträge — wurde mit Unterstützung von KI-Werkzeugen erstellt. Alle Inhalte
                  werden vor Veröffentlichung redaktionell geprüft und verantwortet; die inhaltliche
                  Verantwortung liegt beim im{' '}
                  <Link href="/impressum" className="text-primary hover:underline">
                    Impressum
                  </Link>{' '}
                  genannten Anbieter.
                </p>
              </SectionCard>
            </FadeIn>

            <FadeIn delay={0.25}>
              <SectionCard
                icon={Scale}
                iconColor="text-orange-400"
                iconBg="bg-orange-400/10"
                title="Rechtlicher Rahmen und Kontakt"
              >
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Die hier eingesetzten KI-Systeme sind keine Hochrisiko-KI-Systeme im Sinne des
                    Art. 6 KI-VO. Wir setzen sie als Betreiber („deployer“) ein; die
                    Transparenzpflichten des Art. 50 KI-VO erfüllen wir über diese Seite und die
                    Kennzeichnung unmittelbar an den betroffenen Inhalten.
                  </p>
                  <p>
                    Fragen zum KI-Einsatz auf dieser Website beantworten wir unter{' '}
                    <a
                      href="mailto:nico@carpantier-consulting.de"
                      className="text-primary hover:underline"
                    >
                      nico@carpantier-consulting.de
                    </a>
                    .
                  </p>
                </div>
              </SectionCard>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
