# Verzeichnis der Verarbeitungstätigkeiten

**Verantwortlicher:** Nico-Luca Carpantier, Stammheimer Straße 123, 50935 Köln
**Kontakt:** nico@carpantier-consulting.de, +49 157 3818 6221
**Stand:** _(Datum der letzten Prüfung eintragen)_
**Datenschutzbeauftragter:** nicht bestellt — der Schwellenwert des § 38 Abs. 1 BDSG
(20 Personen mit ständiger automatisierter Verarbeitung) ist nicht erreicht.
_Bei Personalaufbau erneut prüfen._

> Pflicht nach Art. 30 Abs. 1 DSGVO. Die Erleichterung für Unternehmen unter
> 250 Beschäftigten nach Art. 30 Abs. 5 greift hier **nicht**, weil die
> Verarbeitung nicht nur gelegentlich erfolgt.

Dieses Verzeichnis beschreibt den Stand nach dem Compliance-Release, in dem
Hotjar entfernt und alle optionalen Drittanbieter hinter die Einwilligung
gelegt wurden. Es ist bei jeder Änderung an Diensten oder Datenflüssen
fortzuschreiben.

---

## 1. Bereitstellung der Website (Hosting und Server-Logs)

| Feld | Angabe |
|---|---|
| Zweck | Auslieferung der Website, Betriebssicherheit, Abwehr von Missbrauch |
| Betroffene | Websitebesucher |
| Datenkategorien | IP-Adresse, Zeitstempel, angeforderte URL, Referrer, User-Agent, Statuscode |
| Rechtsgrundlage | Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse am sicheren Betrieb |
| Empfänger | Vercel Inc. (Hosting), Rechenzentrumsregion `fra1` (Frankfurt) |
| Drittlandbezug | Vercel Inc. sitzt in den USA. **Zu prüfen und zu belegen:** DPF-Zertifizierung oder Standardvertragsklauseln plus Transfer Impact Assessment |
| Löschfrist | **Zu ermitteln:** tatsächliche Aufbewahrungsdauer der Vercel-Logs, danach hier und in der Datenschutzerklärung eintragen |
| Technische und organisatorische Maßnahmen | HTTPS erzwungen (HSTS), Content-Security-Policy, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, Zugriff auf das Vercel-Projekt nur über ein persönliches Konto |

## 2. Kontaktformular

| Feld | Angabe |
|---|---|
| Zweck | Beantwortung von Anfragen, Anbahnung eines Geschäftskontakts |
| Betroffene | Interessenten |
| Datenkategorien | Name, E-Mail-Adresse, Unternehmen, Telefonnummer (freiwillig), Nachricht, Zeitpunkt und Wortlaut der Einwilligung |
| Rechtsgrundlage | Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen), ergänzend Art. 6 Abs. 1 lit. a DSGVO über die Einwilligung im Formular |
| Verarbeitung | `src/app/api/contact/route.ts` — die Angaben werden **nicht** in der Datenbank gespeichert, sondern ausschließlich per E-Mail weitergeleitet |
| Empfänger | Brevo GmbH, Köpenicker Str. 126, 10179 Berlin (Versand über die Brevo-API), danach das Postfach nico@carpantier-consulting.de |
| Drittlandbezug | Die Brevo GmbH sitzt in Deutschland. **Zu prüfen:** die im AV-Vertrag benannten Unterauftragsverarbeiter |
| Löschfrist | Im Postfach: Löschung nach Abschluss der Anfrage, spätestens nach _(Frist festlegen)_. Führt die Anfrage zu einem Vertrag, greifen handels- und steuerrechtliche Aufbewahrungspflichten |
| Technische und organisatorische Maßnahmen | Serverseitige Prüfung der Eingaben, Mengenbegrenzung je Absender (5 Anfragen in 10 Minuten), unsichtbares Honeypot-Feld, HTML-Maskierung aller Eingaben in der Benachrichtigung |

## 3. KI-Chatbot — **beendet am 16.09.2026**

> **Diese Verarbeitung findet nicht mehr statt.** Der Chat wurde am 16.09.2026
> von der Website entfernt; `/api/chat`, `/api/admin/leads` und der Löschlauf
> `/api/cron/cleanup-chats` sind gelöscht, ebenso das Datenmodell.
>
> Der Eintrag bleibt trotzdem stehen. Art. 30 DSGVO verlangt ein Verzeichnis
> der Verarbeitungen — wer nachträglich prüft, muss erkennen können, was
> zwischen der Inbetriebnahme und dem 16.09.2026 verarbeitet wurde. Ein
> gelöschter Eintrag sieht aus wie eine Verarbeitung, die es nie gab.
>
> **Offen und vor dem Livegang zu erledigen:** Die Tabellen `chat_sessions`
> und `chat_messages` in der PostgreSQL-Datenbank enthalten weiterhin
> Gesprächsverläufe samt freiwillig genannter E-Mail-Adressen. Mit dem Wegfall
> des Chats entfällt ihr Zweck; sie sind nach Art. 5 Abs. 1 lit. e und
> Art. 17 Abs. 1 lit. a DSGVO zu löschen. Der Löschlauf, der das bisher
> automatisch erledigt hat, ist mit entfernt worden.

| Feld | Angabe (Stand bei Beendigung) |
|---|---|
| Zweck | Automatisierte Beantwortung von Fragen, Aufnahme von Kontaktwünschen |
| Betroffene | Websitebesucher, die den Chat öffnen |
| Datenkategorien | Chatnachrichten, pseudonyme Besucherkennung, aufgerufene Seite, gegebenenfalls freiwillig genannter Name und freiwillig genannte E-Mail-Adresse |
| Rechtsgrundlage | Art. 6 Abs. 1 lit. a DSGVO — Einwilligung durch Bestätigung des Hinweises vor der ersten Nachricht |
| Verarbeitung | `src/app/api/chat/route.ts`; Speicherung in PostgreSQL (`chat_sessions`, `chat_messages`) |
| Empfänger | Anthropic PBC (Erzeugung der Antworten), Betreiber der Datenbank _(Anbieter und Standort eintragen)_ |
| Drittlandbezug | Anthropic PBC sitzt in den USA. **Zu prüfen und zu belegen:** DPF-Zertifizierung oder Standardvertragsklauseln plus Transfer Impact Assessment |
| Löschfrist | 90 Tage ohne hinterlassene Kontaktdaten, 365 Tage mit Kontaktdaten. Umsetzung: `src/app/api/cron/cleanup-chats/route.ts`, täglich um 03:00 UTC |
| Automatisierte Entscheidung | Keine Entscheidung mit rechtlicher Wirkung im Sinne des Art. 22 DSGVO |
| Technische und organisatorische Maßnahmen | Signierte Sitzungskennung, Bindung an die Besucherkennung, Mengenbegrenzung, Längenbegrenzung der Nachrichten, Logging ohne Nachrichteninhalte |

> **Ohne bestätigten Löschlauf darf die Datenschutzerklärung diese Fristen nicht
> zusagen.** Der erste erfolgreiche Lauf ist in `loeschkonzept.md` zu
> protokollieren.

## 4. Terminbuchung über Calendly

| Feld | Angabe |
|---|---|
| Zweck | Vereinbarung von Erstgesprächen |
| Betroffene | Interessenten, die einen Termin buchen |
| Datenkategorien | Name, E-Mail-Adresse, Terminwunsch sowie IP-Adresse und Geräteangaben, die das eingebettete Buchungsfenster selbst erhebt |
| Rechtsgrundlage | Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG — Einwilligung über die Zwischenkarte vor dem Laden |
| Verarbeitung | `src/components/providers/CalendlyProvider.tsx`; das Buchungsfenster wird erst nach ausdrücklicher Zustimmung geladen |
| Empfänger | Calendly LLC, 271 17th St NW, Atlanta, GA 30363, USA |
| Drittlandbezug | USA. **Zu prüfen und zu belegen:** DPF-Zertifizierung oder Standardvertragsklauseln plus Transfer Impact Assessment |
| Löschfrist | Ergibt sich aus den Einstellungen des Calendly-Kontos — **zu ermitteln und einzutragen** |
| Alternative | Die Zwischenkarte bietet den gleichwertigen Weg per E-Mail an |

## 5. Reichweitenmessung mit Google Analytics 4

| Feld | Angabe |
|---|---|
| Zweck | Auswertung der Nutzung zur Verbesserung des Angebots |
| Betroffene | Besucher, die in die Kategorie „Analyse" eingewilligt haben |
| Datenkategorien | Gekürzte IP-Adresse, Seitenaufrufe, Verweildauer, Geräte- und Browserangaben, Ereignisse |
| Rechtsgrundlage | Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG |
| Verarbeitung | `src/components/tracking/TrackingScripts.tsx` — `gtag.js` wird erst nach der Einwilligung geladen, bis dahin steht der Google Consent Mode auf `denied` |
| Empfänger | Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland |
| Drittlandbezug | Übermittlung an Google LLC in den USA. **Vor dem Release:** DPF-Zertifizierung prüfen und Nachweis ablegen |
| Löschfrist | Ergibt sich aus der GA4-Einstellung „Aufbewahrung von Nutzer- und Ereignisdaten" — **zu prüfen**, empfohlen sind 2 oder 14 Monate |
| Widerruf | Über „Cookie-Einstellungen" im Footer; der Widerruf setzt den Consent Mode sofort zurück |

## 6. Marketing-Tracking mit Brevo

| Feld | Angabe |
|---|---|
| Zweck | Wiedererkennung für die E-Mail-Kommunikation |
| Betroffene | Besucher, die in die Kategorie „Marketing" eingewilligt haben |
| Datenkategorien | Besucherkennung (`sib_cuid`), besuchte Seiten, gegebenenfalls E-Mail-Adresse |
| Rechtsgrundlage | Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG |
| Empfänger | Brevo GmbH, Köpenicker Str. 126, 10179 Berlin |
| Löschfrist | 13 Monate (Laufzeit des Cookies); die serverseitige Frist ist **zu ermitteln** |
| Hinweis | Wird das Tracking nicht aktiv ausgewertet, ist die Entfernung die einfachere Lösung: sie spart eine Einwilligungskategorie, zwei CSP-Freigaben und einen Abschnitt in der Datenschutzerklärung |

## 7. Verwaltungszugriff auf Chat-Leads — **beendet am 16.09.2026**

> Entfallen mit der Verarbeitung unter 3. Der Endpunkt ist gelöscht,
> `ADMIN_API_KEY` wird nicht mehr ausgewertet und gehört aus der
> Deploy-Umgebung entfernt.

| Feld | Angabe (Stand bei Beendigung) |
|---|---|
| Zweck | Nachverfolgung von Kontaktwünschen aus dem Chat |
| Datenkategorien | Wie unter 3. |
| Rechtsgrundlage | Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse an der Bearbeitung von Anfragen |
| Verarbeitung | `src/app/api/admin/leads/route.ts`, Zugriff nur mit `ADMIN_API_KEY`; ohne gesetzten Schlüssel antwortet der Endpunkt mit 404 |
| Empfänger | Keine |
| Löschfrist | Wie unter 3. — die Daten stammen aus derselben Tabelle |

---

## Offene Punkte

- [ ] **Vor dem Livegang:** `chat_sessions` und `chat_messages` löschen und die
      Löschung mit Datum in `loeschkonzept.md` protokollieren. Danach die
      PostgreSQL-Datenbank stilllegen — sie hatte keine andere Verwendung
- [ ] `ANTHROPIC_API_KEY` beim Anbieter widerrufen, `DATABASE_URL`,
      `CHAT_SESSION_SECRET`, `ADMIN_API_KEY` und `CRON_SECRET` aus der
      Deploy-Umgebung entfernen
- [ ] Aufbewahrungsdauer der Vercel-Logs ermitteln
- [ ] Aufbewahrungseinstellungen in GA4 und Calendly prüfen und eintragen
- [ ] Drittlandbewertung je Anbieter abschließen (siehe `dienstleister-und-rollen.md`)
- [ ] Datum der letzten Prüfung oben eintragen
