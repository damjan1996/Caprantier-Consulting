import { Metadata } from 'next'
import FadeIn from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum von Carpantier Consulting - Angaben gemaess § 5 TMG.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function ImpressumPage() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-background min-h-screen">
      <div className="container-custom">
        <FadeIn>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Impressum
            </h1>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Angaben gemaess § 5 TMG
                </h2>
                <p className="text-muted-foreground">
                  Carpantier Consulting<br />
                  Nico-Luca Carpantier<br />
                  [Strasse und Hausnummer]<br />
                  [PLZ] Koeln<br />
                  Deutschland
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Kontakt
                </h2>
                <p className="text-muted-foreground">
                  E-Mail: info@carpantier-consulting.de
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Umsatzsteuer-ID
                </h2>
                <p className="text-muted-foreground">
                  Umsatzsteuer-Identifikationsnummer gemaess § 27 a Umsatzsteuergesetz:<br />
                  [USt-IdNr. einfuegen]
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Berufsbezeichnung und berufsrechtliche Regelungen
                </h2>
                <p className="text-muted-foreground">
                  Berufsbezeichnung: Unternehmensberater<br />
                  Zustaendige Kammer: [Falls zutreffend]<br />
                  Verliehen in: Deutschland
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Verantwortlich fuer den Inhalt nach § 55 Abs. 2 RStV
                </h2>
                <p className="text-muted-foreground">
                  Nico-Luca Carpantier<br />
                  [Strasse und Hausnummer]<br />
                  [PLZ] Koeln<br />
                  Deutschland
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  EU-Streitschlichtung
                </h2>
                <p className="text-muted-foreground">
                  Die Europaeische Kommission stellt eine Plattform zur
                  Online-Streitbeilegung (OS) bereit:{' '}
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                  <br />
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Verbraucherstreitbeilegung/Universalschlichtungsstelle
                </h2>
                <p className="text-muted-foreground">
                  Wir sind nicht bereit oder verpflichtet, an
                  Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Haftung fuer Inhalte
                </h2>
                <p className="text-muted-foreground">
                  Als Diensteanbieter sind wir gemaess § 7 Abs.1 TMG fuer eigene
                  Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                  verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                  Diensteanbieter jedoch nicht verpflichtet, uebermittelte oder
                  gespeicherte fremde Informationen zu ueberwachen oder nach
                  Umstaenden zu forschen, die auf eine rechtswidrige Taetigkeit
                  hinweisen.
                </p>
                <p className="text-muted-foreground mt-4">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                  Informationen nach den allgemeinen Gesetzen bleiben hiervon
                  unberuehrt. Eine diesbezuegliche Haftung ist jedoch erst ab dem
                  Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                  moeglich. Bei Bekanntwerden von entsprechenden
                  Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Haftung fuer Links
                </h2>
                <p className="text-muted-foreground">
                  Unser Angebot enthaelt Links zu externen Websites Dritter, auf
                  deren Inhalte wir keinen Einfluss haben. Deshalb koennen wir
                  fuer diese fremden Inhalte auch keine Gewaehr uebernehmen. Fuer
                  die Inhalte der verlinkten Seiten ist stets der jeweilige
                  Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Urheberrecht
                </h2>
                <p className="text-muted-foreground">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                  diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                  Vervielfaeltigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung ausserhalb der Grenzen des Urheberrechtes beduerfen
                  der schriftlichen Zustimmung des jeweiligen Autors bzw.
                  Erstellers.
                </p>
              </section>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
