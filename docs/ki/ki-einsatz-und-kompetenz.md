# KI-Einsatz, redaktionelle Freigabe und KI-Kompetenz

**Stand:** _(Datum der letzten Prüfung eintragen)_
**Verantwortlich:** Nico-Luca Carpantier

Grundlage ist die Verordnung (EU) 2024/1689 über künstliche Intelligenz
(KI-VO). Für diese Website sind zwei Vorschriften einschlägig:

- **Art. 50** — Transparenzpflichten für Betreiber. Gilt seit dem 2. August 2026.
  Die Angaben müssen spätestens beim ersten Kontakt klar erkennbar sein.
- **Art. 4** — KI-Kompetenz. Betreiber müssen dafür sorgen, dass die Personen,
  die KI-Systeme in ihrem Auftrag einsetzen, über ein ausreichendes Maß an
  KI-Kompetenz verfügen.

Die öffentlich sichtbare Fassung dieser Angaben steht unter `/ki-transparenz`.
Dieses Dokument ist der interne Nachweis dahinter.

---

## 1. Eingesetzte KI-Systeme

| System | Anbieter | Einsatz | Sichtbare Kennzeichnung |
|---|---|---|---|
| ~~Claude (API)~~ | ~~Anthropic PBC~~ | ~~Chat-Assistent auf der Website~~ | **Beendet am 30.08.2026** — der Chat wurde entfernt. Damit interagiert kein KI-System mehr mit Besuchern, und Art. 50 Abs. 1 KI-VO greift auf dieser Website nicht mehr |
| Bildgenerator | _(verwendetes Werkzeug eintragen)_ | Personen- und Situationsbilder | `AiGeneratedBadge` unmittelbar am Bild, Hinweis im Alternativtext, Hinweis im Vorschaubild für soziale Netzwerke |
| Textwerkzeuge | _(verwendete Werkzeuge eintragen)_ | Entwürfe für Blog- und Glossarbeiträge | `AiContentNotice` am jeweiligen Beitrag mit Datum der redaktionellen Prüfung |

## 2. Umsetzung des Art. 50 KI-VO

| Pflicht | Umsetzung | Ort im Code |
|---|---|---|
| Abs. 1 — Offenlegung der Interaktion mit einem KI-System | **Nicht mehr einschlägig.** Seit dem 30.08.2026 gibt es kein KI-System, das mit Besuchern interagiert. Die Seite `/ki-transparenz` sagt das ausdrücklich, statt den Punkt wegzulassen | `src/app/ki-transparenz/page.tsx` |
| Abs. 4 — Kennzeichnung KI-erzeugter Bilder | Sichtbares Kennzeichen an jedem betroffenen Bild | `src/components/ui/AiGeneratedBadge.tsx` |
| Abs. 4 — Kennzeichnung KI-gestützter Texte | Hinweis am Beitrag mit Datum der Prüfung und Nennung des Verantwortlichen | `src/components/ui/AiContentNotice.tsx` |
| Abs. 2 — maschinenlesbare Markierung | **Trifft den Anbieter des erzeugenden Systems, nicht den Betreiber.** Freiwillig ergänzt durch `data-ai-generated` im Markup; das ist kein anerkannter Provenienzstandard | `src/components/ui/ai-media.ts` |

**Bewusst nicht behauptet:** Die Bilddateien tragen derzeit keine
Provenienzdaten nach IPTC oder C2PA. Wer sie ergänzt, muss beachten, dass die
Bildoptimierung von Next.js Dateien neu schreibt und Metadaten dabei verwirft.
Für die Betreiberpflicht nach Abs. 4 ist das nicht erforderlich.

## 3. Redaktionelle Freigabe KI-gestützter Texte

Art. 50 Abs. 4 KI-VO nimmt Texte von der Kennzeichnungspflicht aus, wenn sie
einer menschlichen Überprüfung unterzogen wurden und eine natürliche oder
juristische Person die redaktionelle Verantwortung trägt. Wir kennzeichnen
trotzdem — und halten den Ablauf hier fest, damit die Ausnahme belegbar wäre.

**Ablauf für jeden KI-gestützten Beitrag:**

1. Entwurf erzeugen
2. Fachliche Prüfung: Stimmen Aussagen, Zahlen und Rechtsbezüge? Jede Zahl und
   jede Rechtsnorm gegen eine Primärquelle prüfen
3. Prüfung auf unbelegte Erfolgsversprechen. Aussagen über Ergebnisse, Quoten
   oder Amortisation dürfen nur stehen, wenn sie belegbar sind (§ 5 UWG)
4. Prüfung auf fremde Rechte: keine übernommenen Textpassagen, keine erfundenen
   Zitate, keine erfundenen Unternehmen oder Personen
5. Freigabe durch Nico-Luca Carpantier
6. Datum der Prüfung in `AiContentNotice` (`reviewedOn`) eintragen
7. Zeile im Freigabeprotokoll unten ergänzen

### Freigabeprotokoll

| Beitrag | Werkzeug | Geprüft am | Geprüft von | Anmerkungen |
|---|---|---|---|---|
| _(erste Zeile beim nächsten Beitrag eintragen)_ | | | | |

> Für den Bestand an Blog- und Glossarbeiträgen ist eine Nachprüfung
> erforderlich. Bis dahin ist die Kennzeichnung am Beitrag die tragende
> Angabe — nicht die Berufung auf die Ausnahme.

## 4. KI-Kompetenz nach Art. 4 KI-VO

Die Pflicht trifft Anbieter und Betreiber. Sie ist nicht an eine bestimmte
Schulungsform gebunden; verlangt wird ein ausreichendes Maß an Kompetenz
gemessen an Kenntnissen, Erfahrung, Ausbildung und Einsatzkontext.

**Beteiligte Personen:**

| Person | Rolle | Einsatzkontext | Unterweisung am | Nachweis |
|---|---|---|---|---|
| Nico-Luca Carpantier | Betreiber, redaktionelle Freigabe | Chatbot, Bildgenerierung, Textentwürfe | _(Datum)_ | Dieses Dokument |
| _(weitere Personen ergänzen)_ | | | | |

**Inhalte der Unterweisung:**

1. Wie generative Systeme arbeiten und warum sie sachlich falsche Angaben
   erzeugen können, die überzeugend formuliert sind
2. Welche Angaben nicht in einen Prompt gehören: personenbezogene Daten Dritter,
   Zugangsdaten, vertrauliche Kundenunterlagen
3. Kennzeichnungspflichten nach Art. 50 KI-VO und wo sie auf dieser Website
   umgesetzt sind
4. Werberechtliche Grenzen: keine unbelegten Erfolgsversprechen, keine
   erfundenen Referenzen, keine erfundenen Bewertungen (§ 5 UWG)
5. Pflicht zur menschlichen Prüfung vor jeder Veröffentlichung
6. Wer zu benachrichtigen ist, wenn ein veröffentlichter KI-Inhalt sich als
   falsch herausstellt, und wie er entfernt wird

**Auffrischung:** jährlich, sowie bei jedem Wechsel des eingesetzten Systems.

## 5. Offene Punkte

- [ ] Verwendete Bild- und Textwerkzeuge in Abschnitt 1 eintragen
- [ ] Unterweisung durchführen und Datum in Abschnitt 4 eintragen
- [ ] Bestehende Blog- und Glossarbeiträge nachprüfen und ins Freigabeprotokoll
      aufnehmen
- [ ] Prüfen, ob weitere Personen Zugriff auf die KI-Werkzeuge haben
