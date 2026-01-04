import { Metadata } from 'next'
import FadeIn from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzerklaerung von Carpantier Consulting - Informationen zum Umgang mit Ihren Daten.',
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
              Datenschutzerklaerung
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
                  Die folgenden Hinweise geben einen einfachen Ueberblick
                  darueber, was mit Ihren personenbezogenen Daten passiert, wenn
                  Sie diese Website besuchen. Personenbezogene Daten sind alle
                  Daten, mit denen Sie persoenlich identifiziert werden koennen.
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
                  persoenlichen Daten sehr ernst. Wir behandeln Ihre
                  personenbezogenen Daten vertraulich und entsprechend der
                  gesetzlichen Datenschutzvorschriften sowie dieser
                  Datenschutzerklaerung.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Verantwortliche Stelle
                </h3>
                <p className="text-muted-foreground">
                  Die verantwortliche Stelle fuer die Datenverarbeitung auf
                  dieser Website ist:
                </p>
                <p className="text-muted-foreground mt-4">
                  Carpantier Consulting<br />
                  Nico-Luca Carpantier<br />
                  [Strasse und Hausnummer]<br />
                  [PLZ] Koeln<br />
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
                  Browser automatisch an uns uebermittelt. Dies sind:
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
                  Funktionalitaet der Website zu gewaehrleisten. Sie koennen Ihren
                  Browser so einstellen, dass Sie ueber das Setzen von Cookies
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
                  Fuer die Terminbuchung nutzen wir den Dienst Calendly. Wenn Sie
                  einen Termin buchen, werden Ihre eingegebenen Daten an Calendly
                  uebermittelt. Weitere Informationen zum Datenschutz bei
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
                    Auskunft ueber Ihre bei uns gespeicherten personenbezogenen
                    Daten zu erhalten
                  </li>
                  <li>
                    Berichtigung unrichtiger personenbezogener Daten zu verlangen
                  </li>
                  <li>
                    Die Loeschung Ihrer bei uns gespeicherten personenbezogenen
                    Daten zu verlangen
                  </li>
                  <li>
                    Die Einschraenkung der Datenverarbeitung zu verlangen
                  </li>
                  <li>Der Datenverarbeitung zu widersprechen</li>
                  <li>Datenuebertragbarkeit zu verlangen</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  6. Beschwerderecht bei der zustaendigen Aufsichtsbehoerde
                </h2>
                <p className="text-muted-foreground">
                  Im Falle von Vertoessen gegen die DSGVO steht den Betroffenen
                  ein Beschwerderecht bei einer Aufsichtsbehoerde, insbesondere
                  in dem Mitgliedstaat ihres gewoehnlichen Aufenthalts, ihres
                  Arbeitsplatzes oder des Orts des mutmasslichen Verstosses zu.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  7. SSL- bzw. TLS-Verschluesselung
                </h2>
                <p className="text-muted-foreground">
                  Diese Seite nutzt aus Sicherheitsgruenden und zum Schutz der
                  Uebertragung vertraulicher Inhalte eine SSL- bzw.
                  TLS-Verschluesselung. Eine verschluesselte Verbindung erkennen
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
