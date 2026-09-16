# Release-Checkliste

Diese Liste gehört vor jedes Deployment auf `carpantier-consulting.de`. Sie
setzt den Zustand des Compliance-Release voraus und ist bei jedem weiteren
Release erneut durchzugehen.

Reihenfolge ist Absicht: Was lokal scheitert, soll lokal scheitern.

---

## 1. Vor dem Deployment — lokal

```bash
pnpm install
pnpm run verify
```

`verify` führt nacheinander aus:

| Schritt | Prüft |
|---|---|
| `typecheck` | `tsc --noEmit` |
| `lint` | `eslint .` (ESLint 9 Flat Config) |
| `check:compliance` | Bewertungs-Markup, „§ 5 TMG", Link auf die abgeschaltete OS-Plattform, zurückgekehrte Fallstudienseite, Platzhalter statt USt-IdNr. |
| `build` | `prisma generate && next build` |

**Wenn `prisma generate` mit `EPERM ... query_engine-windows.dll.node`
abbricht:** Es läuft noch ein Server, der die Datei geöffnet hält. Alle
`next dev` und `next start` beenden und erneut versuchen.

```powershell
Get-CimInstance Win32_Process -Filter "Name='node.exe'" |
  Where-Object { $_.CommandLine -match 'next (dev|start)' } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
```

Zusätzlich mindestens einmal vor größeren Änderungen:

```bash
pnpm run test:e2e
```

- [ ] `pnpm run verify` läuft ohne Fehler durch
- [ ] `pnpm run test:e2e` läuft ohne Fehler durch
- [ ] Echte USt-IdNr. ist in `src/app/impressum/components/InfoCards.tsx`
      eingetragen (sonst bricht `check:compliance` ab)

## 2. Vor dem Deployment — Vercel

Alle Werte müssen für die Umgebung **Production** gesetzt sein. Ein fehlender
Wert schaltet die jeweilige Funktion stillschweigend ab.

| Variable | Pflicht | Folge, wenn nicht gesetzt |
|---|---|---|
| `BREVO_API_KEY` | ja | Kontaktformular kann nicht zustellen |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | optional | Keine Reichweitenmessung — zulässig |
| `NEXT_PUBLIC_BREVO_CLIENT_KEY` | optional | Kein Marketing-Tracking — zulässig |

- [ ] Alle Pflichtwerte in Production gesetzt
- [ ] `CHAT_SESSION_SECRET` ist ein zufälliger Wert, kein wiederverwendetes Passwort
- [ ] Cron-Job `/api/cron/cleanup-chats` ist in Vercel sichtbar und aktiv

## 3. Nach dem Deployment — technische Abnahme auf der Live-Domain

### 3.1 Keine Drittanbieter vor der Einwilligung

Neues privates Fenster, Entwicklerwerkzeuge, Reiter „Netzwerk", dann
`carpantier-consulting.de` aufrufen und **noch nichts anklicken**.

- [ ] Kein Request an `googletagmanager.com`
- [ ] Kein Request an `google-analytics.com`
- [ ] Kein Request an `calendly.com`
- [ ] Kein Request an `sibautomation.com`
- [ ] Kein Request an `t.contentsquare.net` (Hotjar ist entfernt)
- [ ] Kein Request an `fonts.googleapis.com` oder `fonts.gstatic.com`

Danach „Ablehnen" klicken und die Seite neu laden:

- [ ] Weiterhin keiner der oben genannten Requests

Danach „Alle akzeptieren" klicken:

- [ ] `googletagmanager.com` wird geladen
- [ ] Widerruf über „Cookie-Einstellungen" im Footer funktioniert
- [ ] Selektive Zustimmung: nur „Analyse" lädt Google, nicht Brevo

### 3.2 Kontaktformular

- [ ] Echte Testanfrage absenden
- [ ] E-Mail kommt bei nico@carpantier-consulting.de an
- [ ] Wortlaut und Zeitpunkt der Einwilligung stehen in der E-Mail
- [ ] Absenden ohne gesetztes Häkchen wird abgelehnt
- [ ] Bei einem Zustellfehler zeigt das Formular einen Fehler an und behauptet
      nicht, die Nachricht sei verschickt

### 3.3 Kein Chatbot mehr

Der KI-Chat ist am 30.08.2026 von der Website entfernt worden, der
verbliebene Code am 16.09.2026. Statt der früheren Kennzeichnungs-
prüfungen ist jetzt zu bestätigen, dass nichts davon übrig geblieben ist:

- [ ] Auf keiner Seite erscheint unten rechts eine Chat-Blase
- [ ] `/api/chat`, `/api/admin/leads` und `/api/cron/cleanup-chats` antworten
      mit 404
- [ ] `/ki-transparenz` nennt ausdrücklich, dass kein KI-Chatbot im Einsatz ist
- [ ] Die Datenschutzerklärung enthält keinen Abschnitt zu Anthropic mehr
- [ ] **Datenbank:** `chat_sessions` und `chat_messages` sind gelöscht und die
      Löschung ist in `loeschkonzept.md` mit Datum protokolliert
- [ ] `ANTHROPIC_API_KEY` ist beim Anbieter widerrufen; `DATABASE_URL`,
      `CHAT_SESSION_SECRET`, `ADMIN_API_KEY` und `CRON_SECRET` sind aus der
      Deploy-Umgebung entfernt

### 3.4 Entfernte Endpunkte

Mit dem KI-Chat sind alle geschützten Endpunkte entfallen. Übrig bleibt
`/api/contact` (nur POST) und `/api/youtube/thumbnail/[id]`.

```bash
curl -i https://carpantier-consulting.de/api/admin/leads
curl -i https://carpantier-consulting.de/api/cron/cleanup-chats
curl -i https://carpantier-consulting.de/api/chat
# erwartet jeweils: 404

curl -i https://carpantier-consulting.de/api/contact
# erwartet: 405 (nur POST)
```

- [ ] Alle drei entfernten Endpunkte antworten mit 404
- [ ] `/api/contact` nimmt weiterhin Anfragen an und stellt zu

### 3.5 Einmalige Löschung des Chatbestands

Der automatische Löschlauf ist mit dem Chat entfallen. Die noch vorhandenen
Gesprächsverläufe müssen deshalb **einmal von Hand** gelöscht werden — ihr
Zweck ist weggefallen (Art. 5 Abs. 1 lit. e, Art. 17 Abs. 1 lit. a DSGVO).

```sql
-- Bestand vorher zählen:
SELECT count(*) FROM chat_messages;
SELECT count(*) FROM chat_sessions;

-- Löschen (chat_messages hängt per ON DELETE CASCADE an chat_sessions):
DELETE FROM chat_sessions;

-- Danach die Tabellen entfernen:
DROP TABLE IF EXISTS chat_messages;
DROP TABLE IF EXISTS chat_sessions;
```

- [ ] Löschung ausgeführt, Anzahl vorher notiert
- [ ] Datum, Anzahl und Prüfer in `datenschutz/loeschkonzept.md` eingetragen
- [ ] Anschließend: Datenbank stilllegen — sie hatte keine andere Verwendung

### 3.6 Seiten und Kennzeichnungen

- [ ] `/ki-transparenz` antwortet mit 200 und ist im Footer verlinkt
- [ ] `/case-studies` antwortet mit 404
- [ ] Impressum nennt § 5 DDG, keinen Hinweis auf die OS-Plattform und die
      echte USt-IdNr.
- [ ] Jedes KI-generierte Personenbild trägt ein sichtbares Kennzeichen
- [ ] Das Vorschaubild für soziale Netzwerke trägt den Hinweis im Bild
      (prüfen über die Vorschau von LinkedIn oder einen OG-Prüfer)
- [ ] Vor Calendly erscheint die Zwischenkarte; ohne Zustimmung wird nichts geladen

### 3.7 Strukturierte Daten und Header

- [ ] Im Quelltext steht kein `aggregateRating` und kein `Review` mehr
- [ ] Rich-Results-Test der Startseite meldet keine Bewertungen
- [ ] `curl -sI https://carpantier-consulting.de | grep -i "x-frame\|content-security"`
      zeigt `X-Frame-Options: DENY` und `frame-ancestors 'none'` — widerspruchsfrei
- [ ] Die CSP enthält im Produktionsbuild kein `unsafe-eval`

### 3.8 Darstellung und Zugänglichkeit

- [ ] Core Web Vitals über PageSpeed Insights geprüft
- [ ] Mobile Darstellung auf einem echten Gerät geprüft
- [ ] Cookie-Banner und Calendly-Zwischenkarte sind mit der Tastatur bedienbar
      und mit Escape schließbar
- [ ] Kontraste geprüft
- [ ] Mit deaktiviertem JavaScript sind Impressum und Datenschutzerklärung
      lesbar (die `noscript`-Regel im Layout schaltet die Einblendeanimation ab)

## 4. Organisatorisch — vor der Freigabe

- [ ] `datenschutz/verzeichnis-verarbeitungstaetigkeiten.md` vollständig
- [ ] `datenschutz/dienstleister-und-rollen.md`: alle AV-Verträge abgeschlossen
      und abgelegt
- [ ] Drittlandtransfers je Anbieter belegt
- [ ] `datenschutz/loeschkonzept.md`: erster Löschlauf protokolliert
- [ ] `datenschutz/dsfa-bewertung.md`: Ergebnis eingetragen
- [ ] `ki/ki-einsatz-und-kompetenz.md`: Unterweisung durchgeführt und datiert
- [ ] Datenschutzerklärung stimmt mit den tatsächlichen Datenflüssen überein
- [ ] **Abschließende Freigabe durch eine Fachanwältin oder einen Fachanwalt für
      IT-Recht beziehungsweise Datenschutzrecht**

---

## Was dieses Repository nicht leisten kann

Die technischen Punkte lassen sich hier prüfen und absichern. Nicht prüfbar
sind aus dem Code heraus:

- ob die eingetragene USt-IdNr. korrekt ist,
- ob die AV-Verträge tatsächlich abgeschlossen wurden,
- ob der Löschlauf in der Produktionsumgebung wirklich Daten löscht,
- ob die Angaben im Impressum der tatsächlichen Rechtsform entsprechen.

Diese Punkte sind ausschließlich durch Nachweise außerhalb des Repositorys
abzudecken. Ein grüner `verify`-Lauf ersetzt sie nicht.
