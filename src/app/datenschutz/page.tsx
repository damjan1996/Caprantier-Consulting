import { Metadata } from 'next'
import FadeIn from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzerklärung von Carpantier Consulting - Informationen zum Umgang mit Ihren Daten.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function DatenschutzPage() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-background min-h-screen">
      <div className="container-custom">
        <FadeIn>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Datenschutzerklärung
            </h1>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  1. Datenschutz auf einen Blick
                </h2>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Allgemeine Hinweise
                </h3>
                <p className="text-muted-foreground">
                  Die folgenden Hinweise geben einen einfachen Überblick
                  darüber, was mit Ihren personenbezogenen Daten passiert, wenn
                  Sie diese Website besuchen. Personenbezogene Daten sind alle
                  Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  2. Allgemeine Hinweise und Pflichtinformationen
                </h2>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Datenschutz
                </h3>
                <p className="text-muted-foreground">
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer
                  persönlichen Daten sehr ernst. Wir behandeln Ihre
                  personenbezogenen Daten vertraulich und entsprechend der
                  gesetzlichen Datenschutzvorschriften sowie dieser
                  Datenschutzerklärung.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Verantwortliche Stelle
                </h3>
                <p className="text-muted-foreground">
                  Die verantwortliche Stelle für die Datenverarbeitung auf
                  dieser Website ist:
                </p>
                <p className="text-muted-foreground mt-4">
                  Carpantier Consulting<br />
                  Nico-Luca Carpantier<br />
                  [Straße und Hausnummer]<br />
                  [PLZ] Köln<br />
                  Deutschland
                </p>
                <p className="text-muted-foreground mt-4">
                  E-Mail: info@carpantier-consulting.de
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  3. Datenerfassung auf dieser Website
                </h2>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Server-Log-Dateien
                </h3>
                <p className="text-muted-foreground">
                  Der Provider der Seiten erhebt und speichert automatisch
                  Informationen in so genannten Server-Log-Dateien, die Ihr
                  Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                  <li>Browsertyp und Browserversion</li>
                  <li>Verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Cookies
                </h3>
                <p className="text-muted-foreground">
                  Diese Website verwendet technisch notwendige Cookies, um die
                  Funktionalität der Website zu gewährleisten. Sie können Ihren
                  Browser so einstellen, dass Sie über das Setzen von Cookies
                  informiert werden und Cookies nur im Einzelfall erlauben.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  4. Externe Dienste
                </h2>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Calendly
                </h3>
                <p className="text-muted-foreground">
                  Für die Terminbuchung nutzen wir den Dienst Calendly. Wenn Sie
                  einen Termin buchen, werden Ihre eingegebenen Daten an Calendly
                  übermittelt. Weitere Informationen zum Datenschutz bei
                  Calendly finden Sie unter:{' '}
                  <a
                    href="https://calendly.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://calendly.com/privacy
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  5. Ihre Rechte
                </h2>
                <p className="text-muted-foreground">
                  Sie haben jederzeit das Recht:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                  <li>
                    Auskunft über Ihre bei uns gespeicherten personenbezogenen
                    Daten zu erhalten
                  </li>
                  <li>
                    Berichtigung unrichtiger personenbezogener Daten zu verlangen
                  </li>
                  <li>
                    Die Löschung Ihrer bei uns gespeicherten personenbezogenen
                    Daten zu verlangen
                  </li>
                  <li>
                    Die Einschränkung der Datenverarbeitung zu verlangen
                  </li>
                  <li>Der Datenverarbeitung zu widersprechen</li>
                  <li>Datenübertragbarkeit zu verlangen</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  6. Beschwerderecht bei der zuständigen Aufsichtsbehörde
                </h2>
                <p className="text-muted-foreground">
                  Im Falle von Verstößen gegen die DSGVO steht den Betroffenen
                  ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere
                  in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres
                  Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  7. SSL- bzw. TLS-Verschlüsselung
                </h2>
                <p className="text-muted-foreground">
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
                  Übertragung vertraulicher Inhalte eine SSL- bzw.
                  TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen
                  Sie daran, dass die Adresszeile des Browsers von
                  &ldquo;http://&rdquo; auf &ldquo;https://&rdquo; wechselt und an dem
                  Schloss-Symbol in Ihrer Browserzeile.
                </p>
              </section>

              <section>
                <p className="text-muted-foreground text-sm">
                  Stand: Januar 2025
                </p>
              </section>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
