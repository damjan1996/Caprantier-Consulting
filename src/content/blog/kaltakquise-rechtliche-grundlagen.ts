import type { BlogPost } from '@/lib/blog-types'

// Bleibt eigenständig. Dieser Beitrag ist der einzige im Bestand, der eine
// Frage beantwortet, zu der Googles KI-Übersicht von sich aus den Rechtsrahmen
// mitliefert (§ 7 UWG, mutmaßliche Einwilligung, Verbot der Werbe-Mail).
// Juristische Präzision ist in dieser Kategorie ein zitierrelevantes Signal --
// deshalb wird hier zusammengeführt statt gekürzt.
//
// Achtung bei künftigen Änderungen: Die Trennung Telefon/E-Mail ist in
// Abschnitt 3 des Auftrags "Sichtbarkeit" als unantastbar geführt. Sie darf in
// keiner Überarbeitung verwischt werden.

export const kaltakquiseRechtlicheGrundlagen: BlogPost = {
  slug: 'kaltakquise-rechtliche-grundlagen',
  title: 'Kaltakquise und Recht: Was im B2B erlaubt ist und was nicht',
  description:
    'B2B-Telefonakquise ist nach § 7 UWG bei mutmaßlicher Einwilligung zulässig – Werbe-E-Mails ohne Einwilligung sind es nicht. Der Unterschied, die Beweislast, die DSGVO-Pflichten und was bei einem Widerspruch zu tun ist.',
  author: 'Nico-Luca Carpantier',
  publishedAt: '2026-01-17',
  updatedAt: '2026-09-10',
  category: 'Rechtliches',
  tags: [
    'Kaltakquise Recht',
    'UWG',
    'DSGVO',
    'B2B Telefonakquise',
    'mutmaßliche Einwilligung',
    'Werbe-E-Mail',
    'Compliance',
    'Datenschutz Vertrieb',
  ],
  featured: true,
  image: '/images/blog/kaltakquise-recht.webp',
  faqs: [
    {
      question: 'Ist Kaltakquise per Telefon im B2B erlaubt?',
      answer:
        'Ja, wenn eine mutmaßliche Einwilligung vorliegt. § 7 Abs. 2 Nr. 1 UWG verlangt gegenüber einem sonstigen Marktteilnehmer – also einem Unternehmen – nur eine zumindest mutmaßliche Einwilligung, nicht die ausdrückliche, die beim Verbraucher gefordert ist. Mutmaßlich einwilligen wird ein Unternehmen, wenn das Angebot einen konkreten sachlichen Bezug zu seiner Geschäftstätigkeit hat.',
    },
    {
      question: 'Ist Kaltakquise per E-Mail im B2B erlaubt?',
      answer:
        'Nein, nicht ohne vorherige ausdrückliche Einwilligung. § 7 Abs. 2 Nr. 2 UWG stellt Werbung unter Verwendung elektronischer Post ohne vorherige ausdrückliche Einwilligung generell als unzumutbare Belästigung ein – ohne die Erleichterung, die beim Telefonanruf für Unternehmen gilt. Die einzige praktische Ausnahme ist die enge Bestandskundenregelung des § 7 Abs. 3 UWG.',
    },
    {
      question: 'Wer muss die mutmaßliche Einwilligung beweisen?',
      answer:
        'Der Anrufende. Im Streitfall muss das werbende Unternehmen darlegen, worauf es die Annahme gestützt hat, der Angerufene sei mit dem Anruf einverstanden. Deshalb gehört der Anlass jedes Anrufs dokumentiert: aus welcher Quelle der Kontakt stammt und welcher sachliche Bezug zum Geschäft des Angerufenen besteht.',
    },
    {
      question: 'Was gilt datenschutzrechtlich für recherchierte Kontaktdaten?',
      answer:
        'Geschäftliche Kontaktdaten einer natürlichen Person sind personenbezogene Daten. Die Verarbeitung stützt sich in der Regel auf das berechtigte Interesse nach Art. 6 Abs. 1 lit. f DSGVO. Weil die Daten nicht bei der betroffenen Person erhoben wurden, greift zusätzlich die Informationspflicht aus Art. 14 DSGVO – spätestens bei der ersten Kontaktaufnahme.',
    },
    {
      question: 'Was ist zu tun, wenn jemand künftige Anrufe untersagt?',
      answer:
        'Die Kontaktaufnahme endet sofort und dauerhaft. Der Widerspruch ist zu dokumentieren und der Datensatz technisch zu sperren, nicht zu löschen – eine Löschung würde dazu führen, dass derselbe Kontakt beim nächsten Listenimport erneut angerufen wird. Ab dem Widerspruch ist die mutmaßliche Einwilligung widerlegt; jeder weitere Anruf ist unzulässig.',
    },
  ],
  content: `
Die verbreitetste Fehlannahme im deutschen B2B-Vertrieb lautet: Kaltakquise ist verboten. Die zweitverbreitetste lautet: Im B2B ist alles erlaubt. Beide sind falsch, und der Unterschied zwischen ihnen ist die Grundlage jedes seriösen Akquiseprojekts.

Dieser Beitrag klärt, was tatsächlich gilt – getrennt nach Telefon, E-Mail und Datenschutz – und was daraus praktisch folgt.

## Die Vorschrift, um die es geht

Maßgeblich ist [§ 7 UWG, "Unzumutbare Belästigungen"](https://www.gesetze-im-internet.de/uwg_2004/__7.html). Absatz 2 Nummer 1 lautet im Wortlaut:

> bei Werbung mit einem Telefonanruf gegenüber einem Verbraucher ohne dessen vorherige ausdrückliche Einwilligung oder gegenüber einem sonstigen Marktteilnehmer ohne dessen zumindest mutmaßliche Einwilligung,

Der Satz enthält zwei völlig verschiedene Maßstäbe, und der Unterschied ist das ganze Thema:

| | Verbraucher | Sonstiger Marktteilnehmer (Unternehmen) |
|---|---|---|
| Erforderlich | **vorherige ausdrückliche** Einwilligung | **zumindest mutmaßliche** Einwilligung |
| Bedeutet | ein aktives Ja vor dem Anruf | begründete Annahme des Einverständnisses |
| In der Praxis | Kaltakquise faktisch ausgeschlossen | Kaltakquise zulässig, wenn begründet |

## Was "mutmaßliche Einwilligung" konkret verlangt

Mutmaßlich einwilligen bedeutet nicht: Das Unternehmen wird schon nichts dagegen haben. Es bedeutet: Aus den Umständen ergibt sich, dass ein Interesse an dem angebotenen Geschäft besteht.

Drei Fragen entscheiden darüber:

**1. Gibt es einen sachlichen Bezug zur Geschäftstätigkeit?** Ein Angebot zur Vertriebsunterstützung an ein Unternehmen, das erkennbar wächst und offene Vertriebsstellen ausgeschrieben hat, hat einen solchen Bezug. Dasselbe Angebot an eine Steuerkanzlei mit drei Mitarbeitern hat ihn nicht.

**2. Richtet sich der Anruf an die richtige Rolle?** Ein Anruf zum Thema Neukundengewinnung an die Geschäftsführung ist begründbar. Derselbe Anruf in die Buchhaltung ist es nicht.

**3. Ist der Bezug vor dem Anruf feststellbar?** Der entscheidende Punkt. Die Begründung muss **vor** dem Wählen existieren, nicht nachträglich konstruiert werden. Praktisch heißt das: Die Liste braucht ein dokumentiertes Auswahlkriterium.

Die Beweislast trägt im Streitfall das werbende Unternehmen. Wer die Herkunft eines Kontakts und den Anlass des Anrufs nicht belegen kann, verliert – unabhängig davon, wie höflich das Gespräch verlaufen ist.

## E-Mail: die Erleichterung gilt hier nicht

Das ist die Stelle, an der die meisten Vertriebsprojekte rechtlich kippen – und der Grund, warum "wir rufen an und schicken danach eine Mail hinterher" keine harmlose Ergänzung ist.

§ 7 Abs. 2 Nr. 2 UWG behandelt Werbung unter Verwendung elektronischer Post **ohne die Unterscheidung**, die Nummer 1 für den Telefonanruf trifft. Für Werbe-E-Mails gilt einheitlich: vorherige ausdrückliche Einwilligung. Auch gegenüber Unternehmen. Auch bei perfektem sachlichem Bezug.

Die einzige praktische Ausnahme steht in § 7 Abs. 3 UWG und ist eng: Sie setzt voraus, dass die Adresse **im Zusammenhang mit einem Verkauf** an den Empfänger erlangt wurde, dass für **eigene ähnliche Waren oder Dienstleistungen** geworben wird, dass der Empfänger nicht widersprochen hat und dass er bei Erhebung und bei jeder Verwendung auf sein Widerspruchsrecht hingewiesen wurde. Auf einen kalt recherchierten Kontakt trifft davon nichts zu.

**Praktische Folge:** Nach einem Telefonat darf eine Unterlage verschickt werden, wenn der Gesprächspartner sie erbeten hat – das ist keine unverlangte Werbung, sondern die Erfüllung einer Bitte. Was nicht geht: den Kontakt danach in einen Newsletter oder eine Mail-Sequenz aufnehmen. Dafür braucht es eine gesonderte Einwilligung.

## Datenschutz: zwei Pflichten, die regelmäßig übersehen werden

Neben dem Wettbewerbsrecht gilt die DSGVO, sobald eine natürliche Person betroffen ist – und das ist bei einer Durchwahl mit Namen immer der Fall. Zwei Punkte sind praxisrelevant.

### Rechtsgrundlage: berechtigtes Interesse

Die Verarbeitung recherchierter Geschäftskontakte stützt sich üblicherweise auf [Art. 6 Abs. 1 lit. f DSGVO](https://dsgvo-gesetz.de/art-6-dsgvo/): "die Verarbeitung ist zur Wahrung der berechtigten Interessen des Verantwortlichen oder eines Dritten erforderlich, sofern nicht die Interessen oder Grundrechte und Grundfreiheiten der betroffenen Person ... überwiegen".

Direktwerbung ist als berechtigtes Interesse anerkannt. Die Abwägung fällt aber nur dann zugunsten des Werbenden aus, wenn die Verarbeitung auf das Erforderliche beschränkt bleibt: geschäftliche Kontaktdaten und Auswahlkriterium ja, private Rufnummern und Profildaten aus sozialen Netzwerken nein.

### Informationspflicht bei Daten aus Drittquellen

Der häufiger übersehene Punkt: [Art. 14 DSGVO](https://dsgvo-gesetz.de/art-14-dsgvo/) regelt die "Informationspflicht, wenn die personenbezogenen Daten nicht bei der betroffenen Person erhoben wurden". Genau das ist bei jeder recherchierten Akquiseliste der Fall.

Der Betroffene ist über Verantwortlichen, Zwecke, Datenkategorien, Herkunft, Speicherdauer und seine Rechte zu informieren – spätestens bei der ersten Kontaktaufnahme. In der Telefonakquise wird das üblicherweise so gelöst, dass im Gespräch auf die Datenschutzhinweise verwiesen und der Hinweis anschließend schriftlich nachgereicht wird.

### Wenn die Akquise ausgelagert wird: Auftragsverarbeitung

Sobald ein externer Dienstleister im Auftrag anruft, verarbeitet er personenbezogene Daten für den Auftraggeber. Das ist eine Auftragsverarbeitung nach Art. 28 DSGVO und braucht einen schriftlichen Vertrag, bevor der erste Anruf stattfindet.

Der Vertrag regelt insbesondere:

- **Gegenstand und Zweck** der Verarbeitung – also welche Zielgruppe zu welchem Angebot kontaktiert wird.
- **Weisungsbindung**: Der Dienstleister handelt ausschließlich auf dokumentierte Weisung.
- **Technische und organisatorische Maßnahmen**: Wie sind die Daten während der Kampagne geschützt?
- **Umgang mit Betroffenenrechten**: Wer beantwortet eine Auskunftsanfrage, wer nimmt einen Widerspruch entgegen, und wie erreicht dieser Widerspruch den Auftraggeber?
- **Löschung oder Rückgabe** nach Projektende.

Der letzte Punkt ist der, an dem es in der Praxis hakt: Widersprüche, die beim Dienstleister eingehen, müssen beim Auftraggeber ankommen – sonst ruft dessen eigener Vertrieb drei Monate später erneut an. Wer eine Vertriebsagentur beauftragt, sollte sich diesen Rückkanal konkret zeigen lassen. Was dabei sonst noch zu prüfen ist, steht in der [Checkliste zur Auswahl einer Vertriebsagentur](/blog/vertriebsagentur-finden-checkliste).

## Sonderfall Freiberufler, Einzelunternehmer und Kleinstbetriebe

Die Unterscheidung zwischen Verbraucher und sonstigem Marktteilnehmer klingt eindeutig, ist es in der Praxis aber nicht. Entscheidend ist nicht die Rechtsform, sondern ob der Anruf die **gewerbliche oder selbständige berufliche Tätigkeit** betrifft.

Ein Architekt, der unter seiner Kanzleinummer zu einem Angebot für Bürosoftware angerufen wird, ist sonstiger Marktteilnehmer. Derselbe Architekt, der unter seiner Festnetznummer zu einem Stromtarif angerufen wird, ist Verbraucher – auch wenn er den Strom teilweise geschäftlich nutzt. Im Zweifel gilt der strengere Maßstab.

Praktisch heißt das: Bei Einzelunternehmen und Freiberuflern gehört die verwendete Rufnummer zur Dokumentation. Eine im Impressum veröffentlichte Geschäftsnummer trägt die Einordnung als Marktteilnehmer; eine aus einem Privatverzeichnis oder einem sozialen Netzwerk gezogene Mobilnummer trägt sie nicht.

## Der Widerspruch: sperren, nicht löschen

Sagt jemand, er wolle nicht mehr angerufen werden, endet jede weitere Kontaktaufnahme sofort und dauerhaft. Ab diesem Moment ist die mutmaßliche Einwilligung widerlegt; jeder weitere Anruf ist ein Verstoß gegen § 7 UWG und zugleich ein Verstoß gegen das Widerspruchsrecht aus Art. 21 DSGVO.

Wichtig ist die technische Umsetzung: Der Datensatz gehört **gesperrt**, nicht gelöscht. Wer ihn löscht, hat beim nächsten Listenimport keine Information mehr darüber, dass dieser Kontakt widersprochen hat – und ruft erneut an. Eine Sperrliste ist deshalb kein Widerspruch zur Löschpflicht, sondern ihre korrekte Umsetzung: Die Speicherung dient dann ausschließlich dazu, den Widerspruch zu beachten.

## Was passiert, wenn man es falsch macht

Drei Konsequenzen, unabhängig voneinander:

**Abmahnung durch Wettbewerber oder Verbände.** Der praktisch häufigste Fall. Kostenpflichtig, verbunden mit einer strafbewehrten Unterlassungserklärung, die jeden weiteren Verstoß empfindlich teuer macht.

**Bußgeld der Bundesnetzagentur.** Die Behörde verfolgt unerlaubte Telefonwerbung und Rufnummernmissbrauch; ihre [Übersicht zu Ärger mit Rufnummern und Anrufen](https://www.bundesnetzagentur.de/DE/Vportal/TK/Aerger/start.html) dokumentiert die Beschwerdewege und die verhängten Maßnahmen. Wer mit unterdrückter oder manipulierter Rufnummer anruft, riskiert zusätzlich ein Verfahren wegen Rufnummernmissbrauchs.

**Datenschutzrechtliche Aufsicht.** Zuständig ist die Aufsichtsbehörde des Bundeslandes. Anlass sind meist Beschwerden über fehlende Auskunft nach Art. 15 DSGVO oder ignorierte Widersprüche.

## Was daraus für die Praxis folgt

Fünf Punkte, die ein sauberes Akquiseprojekt ohnehin erfüllt:

1. **Das Auswahlkriterium der Liste dokumentieren.** Warum steht dieses Unternehmen darauf? Der Satz muss vor dem Anruf existieren.
2. **Die Quelle jedes Kontakts festhalten.** Website, Handelsregister, Messeverzeichnis, Branchenportal – nachvollziehbar, nicht "gekauft".
3. **Klarnamen und echte Rufnummer verwenden.** Keine Unterdrückung, keine vorgetäuschte Ortsvorwahl.
4. **Werbe-E-Mails nur mit Einwilligung.** Angeforderte Unterlagen sind etwas anderes; die Grenze verläuft an der Bitte des Empfängers.
5. **Widersprüche zentral sperren.** Ein Feld im CRM, das jeder Listenimport respektiert.

Wer diese fünf Punkte einhält, muss den Rechtsrahmen nicht fürchten – er ist ihm günstig gesinnt. Der deutsche Gesetzgeber hat B2B-Telefonakquise ausdrücklich anders behandelt als Verbraucherwerbung, und das ist eine bewusste Entscheidung.

Wie das Gespräch danach aufgebaut wird, steht im [Leitfaden zur B2B-Kaltakquise](/blog/b2b-kaltakquise-leitfaden); wie man auf die häufigsten Reaktionen antwortet, im [Beitrag zur Einwandbehandlung](/blog/einwandbehandlung-vertrieb). Was wir bei einer Zusammenarbeit an dieser Stelle übernehmen – Listenaufbau, Dokumentation, Sperrliste – steht unter [Leistungen](/leistungen) und für den Heimatmarkt unter [Kaltakquise Köln](/kaltakquise/koeln).

**Hinweis:** Dieser Beitrag gibt den Rechtsrahmen wieder, ersetzt aber keine Rechtsberatung im Einzelfall.

## Quellen

- [§ 7 UWG – Unzumutbare Belästigungen, gesetze-im-internet.de](https://www.gesetze-im-internet.de/uwg_2004/__7.html)
- [§ 5 UWG – Irreführende geschäftliche Handlungen, gesetze-im-internet.de](https://www.gesetze-im-internet.de/uwg_2004/__5.html)
- [Art. 6 DSGVO – Rechtmäßigkeit der Verarbeitung](https://dsgvo-gesetz.de/art-6-dsgvo/)
- [Art. 14 DSGVO – Informationspflicht bei Daten aus Drittquellen](https://dsgvo-gesetz.de/art-14-dsgvo/)
- [Ärger mit Rufnummern und Anrufen, Bundesnetzagentur](https://www.bundesnetzagentur.de/DE/Vportal/TK/Aerger/start.html)
  `.trim(),
}
