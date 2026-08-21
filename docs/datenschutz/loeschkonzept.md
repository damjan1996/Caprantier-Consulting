# Lösch-, Auskunfts- und Berichtigungskonzept

**Stand:** _(Datum der letzten Prüfung eintragen)_
**Zuständig:** Nico-Luca Carpantier

Art. 5 Abs. 1 lit. e DSGVO verlangt, dass personenbezogene Daten nur so lange
gespeichert werden, wie es für den Zweck erforderlich ist. Art. 12 Abs. 3 DSGVO
setzt für Betroffenenanfragen eine Frist von einem Monat. Beides braucht einen
festgelegten Ablauf, nicht nur eine Aussage in der Datenschutzerklärung.

---

## 1. Löschfristen

| Daten | Speicherort | Frist | Auslöser |
|---|---|---|---|
| Chat-Sitzungen ohne Kontaktdaten | PostgreSQL, `chat_sessions` | 90 Tage ab Erstellung | Täglicher Lauf von `/api/cron/cleanup-chats` |
| Chat-Sitzungen mit Kontaktdaten | PostgreSQL, `chat_sessions` | 365 Tage ab Erstellung | Derselbe Lauf |
| Chatnachrichten | PostgreSQL, `chat_messages` | Mit der Sitzung | `onDelete: Cascade` |
| Kontaktanfragen | E-Mail-Postfach | Nach Abschluss der Anfrage, spätestens _(Frist festlegen)_ | Manuell, siehe Abschnitt 3 |
| Anfragen, die zu einem Vertrag geführt haben | E-Mail-Postfach und Buchhaltung | 6 beziehungsweise 10 Jahre nach §§ 257 HGB, 147 AO | Gesetzliche Aufbewahrung |
| Server-Logs | Vercel | _(zu ermitteln)_ | Automatisch durch den Anbieter |
| Terminbuchungen | Calendly | _(zu ermitteln)_ | Automatisch nach Kontoeinstellung |
| Analysedaten | Google Analytics 4 | _(zu setzen: 2 oder 14 Monate)_ | Automatisch nach Kontoeinstellung |

Die Fristen für den Chat stehen an drei Stellen und müssen zusammen geändert
werden:

- `src/app/api/cron/cleanup-chats/route.ts` — `RETENTION_DAYS_ANONYMOUS`, `RETENTION_DAYS_WITH_CONTACT`
- `src/app/datenschutz/components/PrivacySections.tsx` — Angabe gegenüber Besuchern
- Dieses Dokument

## 2. Nachweis der Löschläufe

Der Löschjob läuft täglich um 03:00 UTC (`vercel.json`, Abschnitt `crons`) und
gibt die Anzahl gelöschter Sitzungen zurück. Ohne gesetztes `CRON_SECRET` ist er
deaktiviert und antwortet mit 404 — dann läuft **keine** Löschung.

**Die Datenschutzerklärung darf die Fristen erst zusagen, wenn mindestens ein
Lauf nachweislich erfolgreich war.**

| Datum | Ausgelöst durch | Gelöschte Sitzungen | Geprüft von |
|---|---|---|---|
| _(erster Lauf hier eintragen)_ | | | |

Manuell auslösen zur Prüfung:

```bash
curl -i -H "Authorization: Bearer $CRON_SECRET" \
  https://carpantier-consulting.de/api/cron/cleanup-chats
```

Erwartet wird `200` mit `{"deletedSessions": <Zahl>}`. Bei `404` fehlt das
Secret, bei `401` stimmt es nicht.

Quartalsweise zusätzlich in der Datenbank gegenprüfen, dass keine Sitzung älter
als die zugesagte Frist ist:

```sql
SELECT count(*) FROM chat_sessions
WHERE ("visitorEmail" IS NULL     AND "createdAt" < now() - interval '90 days')
   OR ("visitorEmail" IS NOT NULL AND "createdAt" < now() - interval '365 days');
```

Das Ergebnis muss `0` sein.

## 3. Ablauf bei Betroffenenanfragen

Eingang über nico@carpantier-consulting.de. Frist: **ein Monat** ab Eingang
(Art. 12 Abs. 3 DSGVO), verlängerbar um zwei Monate bei begründeter Komplexität,
wobei die Verlängerung innerhalb des ersten Monats mitzuteilen ist.

### Schritt 1 — Identität prüfen
Nur bei begründeten Zweifeln zusätzliche Angaben verlangen (Art. 12 Abs. 6
DSGVO). Keine Ausweiskopie anfordern, wenn die Anfrage von der bekannten
E-Mail-Adresse kommt.

### Schritt 2 — Daten zusammentragen
| Quelle | Wonach gesucht wird |
|---|---|
| PostgreSQL | `chat_sessions.visitorEmail`, `chat_sessions.visitorName`, zugehörige `chat_messages` |
| E-Mail-Postfach | Volltextsuche nach Name und E-Mail-Adresse |
| Brevo | Kontakt in der Kontaktliste |
| Calendly | Buchungen unter der E-Mail-Adresse |
| Google Analytics 4 | Nur pseudonyme Daten ohne Personenbezug für uns; auf Wunsch Nutzerlöschung über die GA4-Oberfläche |

### Schritt 3 — Antworten
- **Auskunft (Art. 15):** Kopie der Daten plus Zwecke, Empfänger, Speicherdauer,
  Rechte und Herkunft. Vorlage in `vorlagen/auskunft.md` anlegen
- **Berichtigung (Art. 16):** Korrektur direkt in der Quelle, Bestätigung an die
  betroffene Person
- **Löschung (Art. 17):** Datensätze löschen, gesetzliche Aufbewahrungspflichten
  benennen, wenn sie einer Löschung entgegenstehen
- **Widerspruch (Art. 21) und Widerruf (Art. 7 Abs. 3):** Einwilligung
  zurücknehmen, betroffene Verarbeitung einstellen

### Schritt 4 — Protokollieren

| Datum Eingang | Art der Anfrage | Datum Antwort | Ergebnis |
|---|---|---|---|
| | | | |

Das Protokoll ist der Nachweis nach Art. 5 Abs. 2 DSGVO. Es enthält selbst
personenbezogene Daten und gehört deshalb **nicht** in das Repository.

## 4. Löschung in Backups

Werden Chatdaten nach Ablauf der Frist gelöscht, liegen sie unter Umständen
weiter in Datenbank-Backups. Das ist zulässig, wenn die Backup-Aufbewahrung
begrenzt und dokumentiert ist und wiederhergestellte Daten erneut der Löschung
unterliegen.

- [ ] Aufbewahrungsdauer der Backups beim Datenbankanbieter ermitteln
- [ ] Hier und in der Datenschutzerklärung eintragen
- [ ] Festhalten, dass nach einer Wiederherstellung der Löschlauf erneut greift
