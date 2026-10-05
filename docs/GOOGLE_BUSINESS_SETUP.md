# Google Unternehmensprofil – Einrichtungsanleitung

**Stand:** 05.10.2026 · gilt zusammen mit `docs/aufgaben-nico.md`, Punkt 1 und 2

## Warum

Ohne verifiziertes Profil kennt der lokale Index die Firma nicht: Google zeigt bei „Carpantier Consulting“ eine namensähnliche Firma aus einer anderen Stadt, und der Kölner Wettbewerber mit den meisten Bewertungen gewinnt das lokale Ergebnis. Ein Profil bringt außerdem Maps-Einträge, direkte Kontaktwege und Bewertungen.

## Regel für alle Texte im Profil

Im Profil steht nur, was auch auf der Website steht. Das heißt:

- keine Garantien und keine Ergebnisversprechen („Termine in der ersten Woche“, „5 Termine pro Woche“, Quoten),
- keine Qualifizierungsmethode und kein Berichtswesen als Zusage,
- kein Team, keine Teamfotos, keine „Wir sind X Mitarbeiter“-Angaben,
- keine Preise,
- keine Schlagwortlisten in Namen oder Beschreibung. Das ist ein Richtlinienverstoß.

Weicht ein Satz davon ab, gilt die Website, nicht dieses Dokument.

---

## Schritt 1: Profil erstellen

1. [business.google.com](https://business.google.com) öffnen, mit dem Google-Konto der Firma anmelden (nicht privat).
2. Firmenname **exakt** `Carpantier Consulting`. Keine Zusätze wie „Vertriebsagentur Köln“.
3. Hauptkategorie **Unternehmensberater**. Zusatzkategorien, soweit angeboten: **Marketingberater**, **Telemarketing-Dienst**.

## Schritt 2: Standort und Kontakt

- Als Anbieter ohne Publikumsverkehr: „Ich liefere Waren und Dienstleistungen an meine Kunden“ wählen und die Adresse **ausblenden** (Service Area Business). Die Adresse wird trotzdem für die Verifizierung gebraucht.
- Die Adresse wird aus dem Impressum der Website übernommen, nicht aus einer anderen Quelle abgetippt. Schlägt Google eine abweichende Postleitzahl vor, nicht übernehmen, sondern erst klären (`docs/aufgaben-nico.md`, Punkt 1).
- Einzugsgebiet: Köln, Düsseldorf, Bonn, Leverkusen, Bergisch Gladbach. Nicht ganz Deutschland eintragen, ein zu großes Gebiet schwächt die lokale Relevanz.
- Telefon und Website **Zeichen für Zeichen** wie im Impressum. Abweichende Schreibweisen sind der häufigste Grund dafür, dass lokale Signale nicht zusammenfinden.
- Öffnungszeiten: Mo–Fr 09:00–18:00.
- Verifizierung per Postkarte oder Telefon. Die Postkarte braucht bis zu 14 Tage. Bis dahin ist das Profil nicht sichtbar, deshalb zuerst.

## Schritt 3: Beschreibung

Maximal 750 Zeichen. Dieser Text ist fertig (rund 560 Zeichen):

```
Carpantier Consulting ist eine B2B-Vertriebsagentur aus Köln. Schwerpunkt ist die telefonische Neukundenakquise: Entscheider werden im Namen des Auftraggebers angesprochen und Termine vereinbart. Der Abschluss bleibt beim Auftraggeber. Zielgruppen sind unter anderem Personaldienstleister und IT-Systemhäuser. Die Zusammenarbeit läuft deutschlandweit; Erstgespräch und Kick-off führt der Inhaber persönlich. Das Erstgespräch ist kostenlos und unverbindlich.
```

## Schritt 4: Fotos und Medien

- **Logo** quadratisch, 720 × 720 px.
- **Titelbild** erst, wenn ein echtes Foto vorliegt. Keine KI-generierten Personenbilder: Im Profil sind sie ein Richtlinienrisiko, und die Seite `/ki-transparenz` deckt sie dort nicht ab. Wer Bilder ersetzt, führt `/ki-transparenz` nach.
- Keine Teamfotos.

## Schritt 5: Leistungen

| Leistung | Beschreibung |
|---|---|
| B2B-Kaltakquise | Telefonische Ansprache von Entscheidern im Namen des Auftraggebers. |
| Terminvereinbarung | Termine mit Entscheidern, die grundsätzliches Interesse und erkennbaren Bedarf haben. |
| Leadgenerierung | Gewinnung von Gesprächskontakten für B2B-Unternehmen. |
| Vertriebsoutsourcing | Auslagerung der Neukundenakquise. Der Abschluss bleibt beim Auftraggeber. |

## Schritt 6: Bewertungen

1. Nach einem abgeschlossenen Projekt **persönlich** um eine Bewertung bitten, nicht per Serienmail.
2. Kurzlink im Profil unter „Mehr Rezensionen erhalten“ kopieren und im Gespräch weitergeben.
3. Nur echte Bewertungen. Keine Gegenleistung anbieten und nicht nur ausgewählte Kunden bitten: Beides verstößt gegen die Richtlinien.
4. Auf jede Bewertung antworten, sachlich, bei Kritik lösungsorientiert.

Bewertungs-Markup (`aggregateRating`, `Review`) gibt es auf der Website erst mit echten, freigegebenen und sichtbaren Kundenstimmen (`pnpm check:compliance`).

## Schritt 7: Beiträge

Optional. Ein bis zwei im Monat reichen. Inhalt: ein neuer Fachbeitrag mit Link, zum Beispiel „Was kostet es, den Vertrieb auszulagern?“, ohne zusätzliche Aussagen.

## Schritt 8: Fragen und Antworten

Nicht selbst vorbefüllen. Echte Fragen sachlich beantworten, nur mit Aussagen, die auch auf der Website stehen (zum Beispiel: erste Terminvereinbarungen in der Regel innerhalb von 14 Tagen nach dem Erstgespräch, keine Garantie). Gibt es den Bereich im Profil nicht mehr, entfällt der Schritt.

## Schritt 9: Messung

Link zur Website mit Kampagnenparametern:

```
https://carpantier-consulting.de?utm_source=google&utm_medium=gmb&utm_campaign=local
```

Die Zahlen in GA4 sind eine Untergrenze: gezählt wird nur, wer dem Analyse-Banner zugestimmt hat. Aufrufe, Klicks und Anrufe zeigt das Profil selbst, ohne Einwilligung.

## Schritt 10: Einheitliche Angaben und Verzeichnisse

**Name, Anschrift, Telefon überall identisch**, wie im Impressum: Profil, Website, Verzeichnisse, Social-Media-Profile. Die Quelle im Code ist `businessInfo` in `src/content/local-seo.ts`.

Reihenfolge der Einträge (Liste und Status in `local-seo.ts`, Gründe in `docs/aufgaben-nico.md`, Punkt 8):

1. Google Unternehmensprofil
2. Bing Places (Import aus dem Google-Profil)
3. Sortlist
4. ProvenExpert, sobald es echte Bewertungen gibt
5. LinkedIn, Das Telefonbuch, Gelbe Seiten
6. OMR Reviews, wlw, XING

Nach jeder Anmeldung `status`, `submittedAt` und `profileUrl` in `local-seo.ts` pflegen; `pnpm run check:directories` prüft das.

---

## Monatlich

- [ ] Auf neue Bewertungen antworten
- [ ] Fragen im Profil beantworten, soweit vorhanden
- [ ] Statistik prüfen (Aufrufe, Klicks, Anrufe)
- [ ] Angaben mit dem Impressum vergleichen (Adresse, Telefon, Öffnungszeiten)
- [ ] Leistungen und Beschreibung mit der Website abgleichen

Hilfe: [support.google.com/business](https://support.google.com/business)
