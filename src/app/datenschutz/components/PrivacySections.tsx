'use client'

import { Shield, Eye, Server, Cookie, Calendar, UserCheck, AlertCircle, Lock, FileText, Mail, Ban, Globe } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { SectionCard } from '@/components/ui'

const sections = [
  {
    icon: Eye,
    title: '1. Datenschutz auf einen Blick',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-400/10',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Allgemeine Hinweise</h3>
          <p className="text-muted-foreground">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-3">Datenerfassung auf dieser Website</h3>
          <h4 className="text-base font-medium text-white/90 mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
          <p className="text-muted-foreground mb-4">
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
          </p>

          <h4 className="text-base font-medium text-white/90 mb-2">Wie erfassen wir Ihre Daten?</h4>
          <p className="text-muted-foreground mb-4">
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
          </p>

          <h4 className="text-base font-medium text-white/90 mb-2">Wofür nutzen wir Ihre Daten?</h4>
          <p className="text-muted-foreground mb-4">
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Sofern über die Website Verträge geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen verarbeitet.
          </p>

          <h4 className="text-base font-medium text-white/90 mb-2">Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
          <p className="text-muted-foreground">
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-3">Analyse-Tools und Tools von Drittanbietern</h3>
          <p className="text-muted-foreground">
            Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten Analyseprogrammen. Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der folgenden Datenschutzerklärung.
          </p>
        </div>
      </div>
    ),
  },
  {
    icon: Shield,
    title: '2. Allgemeine Hinweise und Pflichtinformationen',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-400/10',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Datenschutz</h3>
          <p className="text-muted-foreground mb-4">
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>
          <p className="text-muted-foreground">
            Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht. Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-3">Hinweis zur verantwortlichen Stelle</h3>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-muted-foreground">
              Nico-Luca Carpantier<br />
              Stammheimer Straße 123<br />
              50935 Köln
            </p>
            <p className="text-muted-foreground mt-3">
              Telefon:{' '}
              <a href="tel:+4915738186221" className="text-primary hover:underline">
                +49 (0) 15738186221
              </a>
              <br />
              E-Mail:{' '}
              <a href="mailto:nico@carpantier-consulting.de" className="text-primary hover:underline">
                nico@carpantier-consulting.de
              </a>
            </p>
          </div>
          <p className="text-muted-foreground mt-4">
            Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-3">Speicherdauer</h3>
          <p className="text-muted-foreground">
            Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-3">Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h3>
          <p className="text-muted-foreground">
            Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-3">Empfänger von personenbezogenen Daten</h3>
          <p className="text-muted-foreground">
            Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen. Dabei ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen erforderlich. Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen einer Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z. B. Weitergabe von Daten an Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden nur auf Grundlage eines gültigen Vertrags über Auftragsverarbeitung weiter. Im Falle einer gemeinsamen Verarbeitung wird ein Vertrag über gemeinsame Verarbeitung geschlossen.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-3">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
          <p className="text-muted-foreground">
            Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-3">Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground space-y-3">
            <p>
              WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
            </p>
            <p>
              WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: UserCheck,
    title: 'Ihre Rechte',
    iconColor: 'text-green-400',
    iconBg: 'bg-green-400/10',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
          <p className="text-muted-foreground">
            Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-3">Recht auf Datenübertragbarkeit</h3>
          <p className="text-muted-foreground">
            Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-3">Auskunft, Berichtigung und Löschung</h3>
          <p className="text-muted-foreground">
            Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-3">Recht auf Einschränkung der Verarbeitung</h3>
          <p className="text-muted-foreground mb-4">
            Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:
          </p>
          <ul className="space-y-2">
            {[
              'Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.',
              'Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.',
              'Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.',
              'Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground mt-4">
            Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.
          </p>
        </div>
      </div>
    ),
  },
  {
    icon: Lock,
    title: 'SSL- bzw. TLS-Verschlüsselung',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-400/10',
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
        </p>
        <p className="text-muted-foreground">
          Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
        </p>
      </div>
    ),
  },
  {
    icon: Ban,
    title: 'Widerspruch gegen Werbe-E-Mails',
    iconColor: 'text-red-400',
    iconBg: 'bg-red-400/10',
    content: (
      <p className="text-muted-foreground">
        Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.
      </p>
    ),
  },
  {
    icon: Server,
    title: '3. Datenerfassung auf dieser Website',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-400/10',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Cookies</h3>
          <p className="text-muted-foreground mb-4">
            Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
          </p>
          <p className="text-muted-foreground mb-4">
            Cookies können von uns (First-Party-Cookies) oder von Drittunternehmen stammen (sog. Third-Party-Cookies). Third-Party-Cookies ermöglichen die Einbindung bestimmter Dienstleistungen von Drittunternehmen innerhalb von Webseiten (z. B. Cookies zur Abwicklung von Zahlungsdienstleistungen).
          </p>
          <p className="text-muted-foreground mb-4">
            Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da bestimmte Webseitenfunktionen ohne diese nicht funktionieren würden (z. B. die Warenkorbfunktion oder die Anzeige von Videos). Andere Cookies können zur Auswertung des Nutzerverhaltens oder zu Werbezwecken verwendet werden.
          </p>
          <p className="text-muted-foreground mb-4">
            Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs, zur Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z. B. für die Warenkorbfunktion) oder zur Optimierung der Website (z. B. Cookies zur Messung des Webpublikums) erforderlich sind (notwendige Cookies), werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von notwendigen Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine Einwilligung zur Speicherung von Cookies und vergleichbaren Wiedererkennungstechnologien abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG); die Einwilligung ist jederzeit widerrufbar.
          </p>
          <p className="text-muted-foreground">
            Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-3">Kontaktformular</h3>
          <p className="text-muted-foreground mb-4">
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
          <p className="text-muted-foreground mb-4">
            Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.
          </p>
          <p className="text-muted-foreground">
            Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-3">Anfrage per E-Mail, Telefon oder Telefax</h3>
          <p className="text-muted-foreground mb-4">
            Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
          <p className="text-muted-foreground mb-4">
            Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.
          </p>
          <p className="text-muted-foreground">
            Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.
          </p>
        </div>
      </div>
    ),
  },
  {
    icon: Globe,
    title: '4. Plugins und Tools',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-400/10',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Google Fonts</h3>
          <p className="text-muted-foreground mb-4">
            Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts, die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.
          </p>
          <p className="text-muted-foreground mb-4">
            Zu diesem Zweck muss der von Ihnen verwendete Browser Verbindung zu den Servern von Google aufnehmen. Hierdurch erlangt Google Kenntnis darüber, dass über Ihre IP-Adresse diese Website aufgerufen wurde. Die Nutzung von Google Fonts erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der einheitlichen Darstellung des Schriftbildes auf seiner Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.
          </p>
          <p className="text-muted-foreground mb-4">
            Wenn Ihr Browser Google Fonts nicht unterstützt, wird eine Standardschrift von Ihrem Computer genutzt.
          </p>
          <p className="text-muted-foreground mb-4">
            Weitere Informationen zu Google Fonts finden Sie unter{' '}
            <a href="https://developers.google.com/fonts/faq" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              https://developers.google.com/fonts/faq
            </a>
            {' '}und in der Datenschutzerklärung von Google:{' '}
            <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              https://policies.google.com/privacy?hl=de
            </a>.
          </p>
          <p className="text-muted-foreground">
            Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data Privacy Framework" (DPF). Der DPF ist ein Übereinkommen zwischen der Europäischen Union und den USA, der die Einhaltung europäischer Datenschutzstandards bei Datenverarbeitungen in den USA gewährleisten soll. Jedes nach dem DPF zertifizierte Unternehmen verpflichtet sich, diese Datenschutzstandards einzuhalten. Weitere Informationen hierzu erhalten Sie vom Anbieter unter folgendem Link:{' '}
            <a href="https://www.dataprivacyframework.gov/participant/5780" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              https://www.dataprivacyframework.gov/participant/5780
            </a>.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-3">Calendly</h3>
          <p className="text-muted-foreground">
            Für die Terminbuchung nutzen wir Calendly. Weitere Informationen finden Sie in der Datenschutzerklärung von Calendly:{' '}
            <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              https://calendly.com/privacy
            </a>
          </p>
        </div>
      </div>
    ),
  },
]

export default function PrivacySections() {
  return (
    <>
      {sections.map((section, index) => (
        <FadeIn key={index} delay={0.1 + index * 0.05}>
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

      <FadeIn delay={0.5}>
        <p className="text-sm text-muted-foreground text-center pt-6">
          Quelle:{' '}
          <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            https://www.e-recht24.de
          </a>
        </p>
      </FadeIn>
    </>
  )
}
