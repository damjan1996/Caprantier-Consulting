# Dienstleister, Rollen und Auftragsverarbeitung

**Stand:** _(Datum der letzten Prüfung eintragen)_

Für jeden eingebundenen Dienst ist dreierlei zu klären, bevor die Website live
geht:

1. **Rolle** — Auftragsverarbeiter (Art. 28 DSGVO), eigener Verantwortlicher
   oder gemeinsam Verantwortlicher (Art. 26 DSGVO). Davon hängt ab, welcher
   Vertrag nötig ist.
2. **Vertrag** — AV-Vertrag, Vereinbarung über gemeinsame Verantwortlichkeit
   oder gar keiner. Der Nachweis gehört in einen Ordner, auf den auch bei einer
   Prüfung zugegriffen werden kann.
3. **Drittlandtransfer** — bei Verarbeitung außerhalb der EU/des EWR: gültige
   DPF-Zertifizierung **oder** Standardvertragsklauseln plus dokumentiertes
   Transfer Impact Assessment (Art. 44 ff. DSGVO).

Die Spalten „Vertrag" und „Transfergrundlage" sind bewusst leer. Sie dürfen
erst ausgefüllt werden, wenn das Dokument tatsächlich vorliegt — eine Zeile,
die einen Vertrag behauptet, den es nicht gibt, ist schlimmer als eine leere
Zeile.

---

## Übersicht

| Dienst | Anbieter | Zweck | Erwartete Rolle | Vertrag liegt vor | Ort der Verarbeitung | Transfergrundlage |
|---|---|---|---|---|---|---|
| Hosting | Vercel Inc., USA | Betrieb der Website | Auftragsverarbeiter | ☐ | Region `fra1` (Frankfurt), Verwaltung aus den USA | ☐ |
| ~~Datenbank~~ | _(entfiel)_ | ~~Chat-Sitzungen~~ | — | — | — | — |

> **Datenbank und Anthropic: beendet am 16.09.2026.** Der KI-Chat wurde
> entfernt. Damit entfällt der einzige Drittlandtransfer ausserhalb von
> Vercel, Google und Calendly; AV-Vertrag und Transfer Impact Assessment für
> Anthropic werden nicht mehr benötigt. Der Datenbestand in `chat_sessions`
> und `chat_messages` ist noch zu löschen — siehe VVT Nr. 3.
| E-Mail-Versand | Brevo GmbH, Berlin | Weiterleitung von Anfragen | Auftragsverarbeiter | ☐ | Deutschland/EU | entfällt, sofern keine Unterauftragsverarbeitung außerhalb der EU |
| Marketing-Tracking | Brevo GmbH, Berlin | Wiedererkennung | Auftragsverarbeiter | ☐ | Deutschland/EU | entfällt, sofern keine Unterauftragsverarbeitung außerhalb der EU |
| ~~KI-Antworten~~ | ~~Anthropic PBC, USA~~ | ~~Chatbot~~ | — | — | — | — |
| Terminbuchung | Calendly LLC, USA | Buchungsfenster | **Zu prüfen:** eher eigener Verantwortlicher für die eigenen Cookies | ☐ | USA | ☐ |
| Reichweitenmessung | Google Ireland Ltd. | Google Analytics 4 | Auftragsverarbeiter nach den Google-Bedingungen | ☐ | EU mit Übermittlung in die USA | ☐ |

---

## Was je Dienst zu tun ist

### Vercel
- [ ] Data Processing Addendum im Vercel-Konto abschließen und als PDF ablegen
- [ ] Liste der Unterauftragsverarbeiter herunterladen und ablegen
- [ ] Transfergrundlage festhalten: DPF-Zertifizierung oder Standardvertragsklauseln
- [ ] Aufbewahrungsdauer der Zugriffslogs erfragen und im Verzeichnis eintragen

### Datenbank
- [ ] Anbieter und Rechenzentrumsstandort festhalten
- [ ] AV-Vertrag abschließen
- [ ] Verschlüsselung im Ruhezustand bestätigen lassen
- [ ] Backup-Aufbewahrung dokumentieren — **wichtig:** Werden Chatdaten nach 90
      beziehungsweise 365 Tagen gelöscht, liegen sie unter Umständen weiter im
      Backup. Diese Frist muss zur Aussage in der Datenschutzerklärung passen

### Brevo
- [ ] AV-Vertrag abschließen (im Brevo-Konto verfügbar) und ablegen
- [ ] Unterauftragsverarbeiter prüfen, insbesondere auf Standorte außerhalb der EU
- [ ] Entscheiden, ob das Marketing-Tracking überhaupt gebraucht wird

### Anthropic
- [ ] Data Processing Addendum abschließen und ablegen
- [ ] Prüfen und dokumentieren, ob die Eingaben zum Training verwendet werden;
      für die API ist das standardmäßig nicht der Fall, der Nachweis gehört
      trotzdem in die Akte
- [ ] Transfergrundlage festhalten

### Calendly
- [ ] Rolle bestimmen: Für die eigenen Cookies und die Analyse im Buchungsfenster
      handelt Calendly voraussichtlich als eigener Verantwortlicher. Dann ist
      kein AV-Vertrag der richtige Vertragstyp, wohl aber eine saubere Angabe in
      der Datenschutzerklärung und die vorgeschaltete Einwilligung — beides ist
      umgesetzt
- [ ] Transfergrundlage prüfen und ablegen
- [ ] Aufbewahrungsdauer der Buchungsdaten im Konto prüfen

### Google Analytics 4
- [ ] Auftragsverarbeitungsbedingungen im GA4-Konto akzeptieren und Nachweis ablegen
- [ ] DPF-Zertifizierung von Google LLC prüfen und Ausdruck ablegen
- [ ] Aufbewahrung der Nutzer- und Ereignisdaten auf einen bewussten Wert setzen
- [ ] Google-Signale und Werbefunktionen prüfen; sind sie nicht nötig, abschalten

---

## Ablage

Empfohlene Struktur außerhalb des Repositorys, weil Verträge personenbezogene
und vertrauliche Angaben enthalten:

```
Datenschutz/
  AV-Vertraege/
    Vercel_DPA_<Datum>.pdf
    Brevo_AVV_<Datum>.pdf
    Anthropic_DPA_<Datum>.pdf
    Google_Ads_Data_Processing_Terms_<Datum>.pdf
  Transferbewertungen/
    TIA_Vercel_<Datum>.pdf
    TIA_Anthropic_<Datum>.pdf
    TIA_Calendly_<Datum>.pdf
  Nachweise/
    DPF_Google_LLC_<Datum>.pdf
```

Im Repository steht nur diese Übersicht — nie die Verträge selbst.
