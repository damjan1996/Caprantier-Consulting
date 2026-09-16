# Was nur Nico erledigen kann

**Stand:** 10.09.2026 · **Grundlage:** `AUFTRAG-SICHTBARKEIT-2026-09.md`, Abschnitt 4

Die Website ist umgebaut. Was jetzt noch fehlt, lässt sich nicht programmieren –
es braucht Firmendaten, Identitätsnachweise, echte Projektzahlen und
Geschäftsentscheidungen. Die Punkte stehen in der Reihenfolge ihrer Wirkung.

---

## 0 · Kundenlogos auf der Startseite — **Freigabe schriftlich?**

*Ergänzt am 12.09.2026 bei der Gesamtprüfung.*

Auf der Startseite laufen unter der Überschrift **„Vertrauen unter anderem auf
uns"** vier Kundenlogos, jeweils als Link auf deren Website:

| Firma | Verlinkt auf |
|---|---|
| Lixt AG | `lixt.ch` |
| Jungwild | `jungwild.io` |
| Syntriq | `syntriq.de` |
| SMYCO | `smyco.de` |

**Im Projekt findet sich zu keiner dieser vier eine dokumentierte Freigabe.**
Für Fallstudien existiert dafür ein strenges Verfahren — `case-studies.ts`
verlangt `kundeNennbar` **und** ein Datum in `freigegebenAm`, und
`check-compliance.mjs` bricht den Build ab, wenn das fehlt. Die Logos auf der
Startseite stehen in einer eigenen Datei (`src/app/components/ClientLogos.tsx`)
und laufen an diesem Verfahren vorbei.

**Bitte zurückmelden:**

1. Sind alle vier tatsächlich Kunden?
2. Liegt für Name und Logo jeweils eine **schriftliche** Freigabe vor? Wenn ja:
   Datum je Kunde, dann wird es wie bei den Fallstudien hinterlegt und geprüft.

Warum das zählt: Ein Kundenlogo ohne Freigabe berührt Marken- und
Unternehmenspersönlichkeitsrecht, und eine Kundenbeziehung zu behaupten, die so
nicht besteht, wäre eine irreführende geschäftliche Handlung nach § 5 UWG.
Abschnitt 3 des Auftrags führt „keine Kundenlogos ohne Freigabe" als
unantastbar.

**Die Logos wurden nicht entfernt** — das wäre eine sichtbare Änderung an einer
laufenden Seite, und gut möglich, dass die Freigaben längst vorliegen und nur
nicht im Projekt vermerkt sind.

---

## 1 · Postleitzahl prüfen — **vor allem anderen, 5 Minuten**

Im Projekt waren zwei Postleitzahlen im Umlauf:

| Ort im Code | Angabe |
|---|---|
| Impressum, Datenschutzerklärung, Organisations-Markup | **50935** Köln |
| `local-seo.ts`, Chatbot-Auskunft | **50735** Köln |

Vereinheitlicht wurde auf **50935**, weil das die Angabe im Impressum ist und
damit die rechtlich verbindliche Anbieterkennzeichnung nach § 5 DDG.

**Ungeprüft bleibt, ob das stimmt.** Bitte gegen einen Briefkopf oder den
Gewerbeschein abgleichen und Bescheid geben. Zwei Gründe, warum das zuerst
kommt:

- Eine falsche Adresse im Impressum ist abmahnfähig.
- Google lehnt die Verifizierung eines Business Profiles ab, wenn die Adresse
  nicht zustellbar ist — Punkt 2 hängt also daran.

Zu ändern ist danach nur eine Stelle: `address` in `src/lib/local-seo.ts`.
Impressum, Datenschutz, Chatbot und alle strukturierten Daten lesen von dort.

---

## 2 · Google Business Profile anlegen — **der größte Einzelhebel**

Ohne diesen Eintrag kennt der lokale Index die Firma nicht. Google schlägt bei
der Suche nach „Carpantier Consulting" stattdessen die namensähnliche
*Carpentier Consulting GmbH* aus Gau-Weinheim vor. Der Kölner Wettbewerber
AS Concepts gewinnt das Local Pack und wird in Googles KI-Übersicht zuerst
genannt — im Wesentlichen deshalb.

### Kompakt: die zehn Minuten

1. **[business.google.com](https://business.google.com)** öffnen, mit dem
   Google-Konto der Firma anmelden (nicht privat).
2. **Firmenname exakt so:** `Carpantier Consulting` — keine Zusätze wie
   „B2B Vertrieb" oder „Köln". Zusätze im Namen sind ein Richtlinienverstoß
   und können zur Sperrung führen.
3. **Kategorie – Hauptkategorie:** `Unternehmensberater`.
   Zusatzkategorien: `Marketingberater`, `Telemarketing-Dienst`.
4. **Adresstyp:** „Ich liefere Waren und Dienstleistungen an meine Kunden"
   auswählen und die Adresse **ausblenden**. Als Einzelunternehmen ohne
   Publikumsverkehr ist das der richtige Typ (Service Area Business). Die
   Adresse wird trotzdem für die Verifizierung gebraucht.
5. **Einzugsgebiet:** Köln, Düsseldorf, Bonn, Leverkusen, Bergisch Gladbach.
   Nicht ganz Deutschland eintragen — ein zu großes Gebiet schwächt die lokale
   Relevanz.
6. **Kontakt:** Telefon `+49 157 38186221`, Website
   `https://carpantier-consulting.de`. **Exakt** wie im Impressum, Zeichen für
   Zeichen. Abweichende Schreibweisen sind der häufigste Grund dafür, dass
   lokale Signale nicht zusammenfinden.
7. **Öffnungszeiten:** Mo–Fr 09:00–18:00.
8. **Verifizierung:** Postkarte oder Telefon. Die Postkarte braucht bis zu
   14 Tage. **Bis die Verifizierung durch ist, passiert nichts** — deshalb
   dieser Schritt zuerst und alles andere danach.
9. **Beschreibung:** Der fertige Text steht in
   `docs/GOOGLE_BUSINESS_SETUP.md`, Schritt 3. Kopieren, einfügen.
10. **Leistungen anlegen:** B2B-Kaltakquise, Leadgenerierung,
    Terminvereinbarung, Vertriebsoutsourcing, Vertriebsberatung.

### Danach, laufend

- **Fotos:** Logo (720×720), Titelbild. **Keine KI-generierten Personenbilder**
  — im Business Profile sind sie ein Richtlinienrisiko, und die
  KI-Transparenzseite deckt sie dort nicht ab.
- **Beiträge:** ein bis zwei pro Monat reichen. Zeigt Aktivität.
- **Fragen und Antworten:** Drei Fragen selbst stellen und beantworten, Vorlage
  in `docs/GOOGLE_BUSINESS_SETUP.md`, Schritt 8.

Nach der Freischaltung: Status in `src/lib/local-seo.ts` auf `verified` setzen
und `profileUrl` eintragen. `pnpm run check:directories` prüft das.

---

## 2b · Die Zahlen auf der Startseite belegen oder entfernen — **rechtlich dringend**

Auf der Startseite steht ein Abschnitt „Das erreichen unsere Kunden" mit der
Zeile *„Echte Ergebnisse, echte Unternehmen. Aus Vertraulichkeitsgründen ohne
Firmennamen — die Zahlen sprechen für sich."* Darunter vier Kennzahlen:

| Angabe | Label |
|---|---|
| 3–8 | Termine pro Woche |
| 87 % | Entscheider-Quote |
| < 14 | Tage bis zum ersten Termin |
| 35 %+ | Ø Abschlussquote |

Dazu fünf anonymisierte Erfolgsgeschichten mit Branche, Ort und Ergebnis
(`src/app/components/Benefits.tsx`).

**Das wurde bewusst nicht angefasst**, weil der Text behauptet, es seien echte
Ergebnisse — und wenn das stimmt, wäre es das stärkste Material auf der ganzen
Website. Entscheiden kann das nur du.

Es braucht eine von zwei Antworten:

- **Die Zahlen stammen aus echten Projekten.** Dann bitte je Kennzahl den
  Bezugsrahmen nennen: aus wie vielen Projekten, über welchen Zeitraum. Das
  gehört als Fußnote unter den Abschnitt, und die Fälle gehören als richtige
  Fallstudien nach `/referenzen` (Punkt 4).
- **Die Zahlen sind Beispielwerte.** Dann müssen sie weg. Eine unbelegte
  Erfolgsangabe auf der Verkaufsseite ist irreführend nach § 5 UWG und
  abmahnfähig — genau der Grund, aus dem die frühere Seite `/case-studies`
  entfernt werden musste. Der Satz „echte Ergebnisse, echte Unternehmen" macht
  es dabei schlimmer, nicht besser, weil er die Zahlen ausdrücklich als real
  ausgibt.

Zum Vergleich: Zwei vergleichbare Beispielwerte („+47 % Leads", „12 Termine")
standen in einer Dashboard-Illustration auf `/leistungen` und wurden in diesem
Durchgang entfernt — dort war der Beispielcharakter eindeutig.

---

## 3 · Bewertungen einsammeln — **Zielmarke 20**

Ohne echte, freigegebene und auf der Seite sichtbare Kundenstimmen darf kein
Bewertungs-Markup gesetzt werden (§ 5 UWG). Das Compliance-Gate bricht den
Build, wenn es doch jemand versucht — das ist Absicht.

AS Concepts hat 4,9 Sterne aus 52 Bewertungen. Das ist der Abstand, den keine
Textoptimierung schließt.

**Vorgehen:** Nach jedem abgeschlossenen Projekt persönlich fragen, nicht per
Serienmail. Den Kurzlink aus dem Business Profile („Mehr Rezensionen erhalten")
per WhatsApp schicken. Auf jede Bewertung antworten.

Reihenfolge der Plattformen: Google zuerst, dann ProvenExpert, dann OMR
Reviews. Trustpilot erst, wenn dort auch tatsächlich Bewertungen entstehen —
ein leeres Profil ist schlechter als keines.

---

## 4 · Zwei bis drei echte Fallstudien

Das Gefäß steht unter **`/referenzen`**. Es enthält derzeit ein sichtbar
gekennzeichnetes Blindmuster, und die Seite ist deshalb auf `noindex` — das ist
im Compliance-Gate verankert und lässt sich nicht versehentlich umgehen.

Gebraucht wird pro Fall:

- Branche und Unternehmensgröße (anonymisiert reicht: „IT-Systemhaus, 45 MA")
- Region
- Ausgangslage in ein bis zwei Sätzen
- Zeitraum
- Was konkret gemacht wurde, drei bis fünf Punkte
- **Zahlen aus dem echten Projektverlauf** — Termine, Zeitraum,
  Wahrnehmungsquote
- Eine Erkenntnis, die über die Zahlen hinausgeht
- Ob der Kundenname genannt werden darf, und wenn ja: **schriftliche Freigabe**
  mit Datum

Sobald ein echter Fall in `src/lib/case-studies.ts` steht und das Blindmuster
entfernt ist, wird die Seite automatisch indexierbar und landet in der Sitemap.

---

## 5 · Preisentscheidung

Der Preisbaustein steht auf `/leistungen` und zeigt drei Modelle: Pilotprojekt,
laufende Akquise, pro qualifiziertem Termin. **Beträge sind bewusst nicht
eingetragen** — das ist eine Geschäftsentscheidung.

### Entscheidungsgrundlage

| Quelle | Angabe |
|---|---|
| Googles KI-Übersicht (Marktband DACH) | 2.000–8.000 €/Monat oder ~300 €/Termin |
| PATT (öffentlich) | ab ~2.000 €/Monat |
| SharkByte (gewinnt Köln) | 40-Stunden-Pilot 2.000 € |
| Erst-Kontakt | Testpakete ab „wenigen hundert Euro" |
| Eigener Blogbeitrag, bereits im Google-Snippet | 2.000–15.000 €/Monat je nach Modell |

Die letzte Zeile ist die interessanteste: Der Markt sieht diese Spanne bereits
mit dem Namen Carpantier daran — nur nicht auf einer Seite, die verkauft.

### Freigabe in zwei Schritten

1. In `src/lib/pricing.ts` bei den Modellen `preis` eintragen (und optional
   `preisHinweis`, etwa „zzgl. USt.").
2. `PREISE_FREIGEGEBEN` auf `true` setzen.

Beides ist nötig. Das Flag allein veröffentlicht nichts — so kann eine
versehentliche Änderung keine erfundene Zahl live schalten. `pnpm run
check:pricing` prüft die Kombination.

---

## 6 · Echtes Foto

Das Gründerporträt ist als KI-generiert deklariert. Rechtlich ist das
vorbildlich, und die Seite `/ki-transparenz` bleibt so, wie sie ist.

Kommerziell trifft es die einzige Stelle, die zählt: Bei einer
Ein-Mann-Agentur ist der Gründer das Einzige, was der Käufer beurteilen kann —
und dieses Bild ist als synthetisch markiert, während der Wettbewerb
Kundenlogos, Videointerviews und 52 Google-Bewertungen zeigt.

Ein Fototermin löst das. Wenn die KI-Bilder ersetzt werden, muss
`/ki-transparenz` **nachgeführt** werden — nicht gelöscht, nicht abgeschwächt.

---

## 7 · Google-Search-Console-Zugang

Die Diagnose in `docs/ap1-indexierung-befund.md` ist zu großen Teilen im Repo
belegt: 40 von 52 Beiträgen hatten keinen crawlbaren internen Link, keiner
davon war indexiert. Was ohne Search-Console-Zugang **Annahme** bleibt, ist die
Zuordnung zu Googles eigenen Kategorien („Gefunden – zurzeit nicht indexiert"
gegen „Gecrawlt – zurzeit nicht indexiert").

Gebraucht wird: Zugriff auf die Property `carpantier-consulting.de` als
Nutzer mit Leserechten. Damit lassen sich der Seiten-Bericht auslesen und die
Umleitungen nach dem Deployment live nachprüfen.

**Nach dem Deployment zusätzlich:** neue Sitemap einreichen und die vier bisher
indexierten Beitragsadressen im URL-Prüftool erneut anfordern.

---

## 8 · Verzeichnisse anlegen

Reihenfolge nach Wirkung. Die Liste steht als Datenstruktur in
`src/lib/local-seo.ts` und will nach jeder Anmeldung gepflegt werden
(`status`, `submittedAt`, `profileUrl`).

| # | Plattform | Warum |
|---|---|---|
| 1 | Google Business Profile | siehe Punkt 2 |
| 2 | **Sortlist** | stand in 13 von 29 gemessenen Suchergebnissen und wird von Googles KI-Übersicht als Vergleichsquelle empfohlen; auf der Kölner Sortlist-Seite fehlt Carpantier |
| 3 | Bing Places | Bing führt „vertriebsagentur köln" bereits auf Position 1, nur der Karteneintrag fehlt |
| 4 | ProvenExpert | sobald Punkt 3 läuft |
| 5 | LinkedIn Unternehmensseite | ist im Markup bereits als `sameAs` hinterlegt |
| 6 | Das Telefonbuch, Gelbe Seiten | speisen zahlreiche weitere Datenbestände |
| 7 | OMR Reviews, WLW, XING | B2B-Vergleichsquellen |

Bei **jeder** Anmeldung: Name, Anschrift und Telefonnummer exakt wie im
Impressum. Abweichende Schreibweisen sind der häufigste Grund dafür, dass
lokale Signale nicht zusammenfinden.

---

## 9 · Fachliche Substanz für die Beiträge

Die 13 Fachbeiträge tragen Methode, Rechtsrahmen und Struktur. Was ihnen fehlt,
ist das, was sie von KI-Fließtext unterscheidet: echte Gesprächserfahrung.

Im Quelltext ist jede dieser Stellen als `TODO(Nico)` markiert. Die
lohnendsten fünf:

| Datei | Was gebraucht wird |
|---|---|
| `b2b-kaltakquise-leitfaden.ts` | zwei bis drei **wörtliche** Gesprächseinstiege aus echten Telefonaten — einer, der getragen hat, einer, der abgebrochen wurde |
| `einwandbehandlung-vertrieb.ts` | die tatsächliche Häufigkeit der fünf Einwände aus 100 Gesprächen |
| `bant-methode-erklaert.ts` | deine echten fünf Qualifizierungsfragen, in der Reihenfolge, in der du sie stellst |
| `vertrieb-auslagern-kosten-vorteile.ts` | eine echte Vollkostenrechnung aus einem Kundenprojekt |
| `angebot-verhandlung-abschluss-b2b.ts` | die tatsächliche Verteilung der fünf Verlustgründe über ein Jahr |

Das ist der Teil, den weder triveo noch SharkByte schreiben können. Ein
Sprachaufnahme-Memo reicht — der Rest ist Redaktion.

---

## Was ohne dich weiterläuft

Nichts von der Liste blockiert das Deployment. Die Website ist in dem Zustand,
in dem sie live gehen kann; die Punkte hier heben sie von „technisch sauber" auf
„gewinnt gegen den Wettbewerb".

Die Reihenfolge, wenn wenig Zeit ist: **Punkt 1, dann Punkt 2, dann Punkt 3.**
Diese drei zusammen sind mehr wert als der gesamte Rest.
