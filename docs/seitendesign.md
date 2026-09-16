# Designleitfaden — wie die Seiten aussehen

**Stand:** 16.09.2026
**Referenzumsetzung:** `src/app/page.tsx` + `src/app/components/home/`
**Gemeinsame Grundlage:** `src/app/components/seite/basis.module.css`
**Gilt für:** alle neuen Seiten und jeden Umbau bestehender Seiten

Drei Dokumente, drei Fragen:

| Dokument | beantwortet |
|---|---|
| [seitendesign.md](seitendesign.md) *(dieses)* | **Wie soll es aussehen?** Gestaltungsentscheidungen und ihre Gründe |
| [seitentexte.md](seitentexte.md) | **Was soll dastehen?** Haltung, Satzbau, Zahlen, Recht im Text |
| [seitenbaukasten.md](seitenbaukasten.md) | **Wie wird es gebaut?** Dateien, Klassen, Haken, Abnahme |

Wer eine neue Seite baut, liest dieses zuerst und den Baukasten beim Tippen.
Werte, die hier als Tabelle stehen, sind nicht zur Deko da: Sie stehen so in
`seite/basis.module.css` und werden eingebunden, nicht neu erfunden.

---

## 1 · Der Charakter in fünf Sätzen

1. **Die Seite behauptet nichts, was sie auch vorführen kann.** Statt „planbare
   Termine" zeigt sie einen Kalender, der sich füllt. Jede Grafik ist ein
   arbeitendes Schaubild, keine Illustration.
2. **Ein Gedanke je Bildschirm.** Abschnitte bleiben stehen, während ihr Inhalt
   wechselt — statt vorbeizuziehen.
3. **Wenig Farbe, viel Weiß.** Genau ein Blau, ein dunkles Grau, sonst Grautöne
   und Linien. Gewicht entsteht durch Schriftgröße und Raum, nicht durch Fläche.
4. **Bewegung ist fertig, wenn man ankommt.** Eine halbe Sekunde, eine Kurve,
   keine Effekte, die auf sich aufmerksam machen.
5. **Ehrlichkeit ist ein Gestaltungsmittel.** Die Absage („Dafür nicht") bekommt
   dieselbe Karte und dasselbe Gewicht wie die Zusage. Das ist kein
   Understatement — es ist der Grund, warum der Rest glaubwürdig wirkt.

---

## 2 · Farbe

Die Grundpalette — Tinten, Linien, Flächen — steht im
[Baukasten § 3.1](seitenbaukasten.md). Hier stehen die Abstufungen des Akzents,
die dort fehlen, und die Disziplin dazu: der Teil, der bricht, wenn jemand nur
die Tabelle liest.

> [!WARNING]
> **Diese Token gibt es nur innerhalb von `.page`.** Ausserhalb ist `--ink`
> nicht definiert und `--accent` ist `#e8edf5` — ein blasses Grau aus
> `globals.css`, nicht das Markenblau. Eine Seite, die die Grundlage nicht
> einbindet, bekommt lautlos die falschen Farben. Wie eingebunden wird, steht
> im [Baukasten § 2.1](seitenbaukasten.md).

### 2.1 Wie viel Blau

Das Blau ist **eine** Farbe in vier Stärken — nicht vier Farben:

| Token | Wert | Rolle |
|---|---|---|
| `--accent` | `#1a56db` | die Farbe selbst |
| `--accent-dark` | `#1648b8` | nur der Mauszeiger-Zustand der Hauptschaltfläche |
| `--accent-soft` | `rgba(26,86,219,.08)` | Fläche hinter kleinen Auszeichnungen |
| `--accent-ring` | `rgba(26,86,219,.22)` | Fokusring |

Gefärbt wird damit genau viererlei:

| Erlaubt | Beispiel auf der Startseite |
|---|---|
| die Hauptschaltfläche eines Abschnitts | „Erstgespräch buchen" |
| der gefüllte Teil einer Fortschritts- oder Mengenanzeige | Bühnenlinie, Aufwandsbalken, Kalenderblöcke |
| eine Auszeichnung, die eine Zusage trägt | `Kein Eigenaufwand`, der gesetzte Haken, `Kunde` |
| ein Symbolfeld als Marke einer Karte | das 40-px-Feld der Referenzkarten |

Die letzten beiden laufen über `--accent-soft` als Fläche mit `--accent` als
Zeichen darin — 8 % Deckung, damit sie neben der Schaltfläche nicht mitreden.

Nicht erlaubt: blaue Überschriften, blaue Rahmen, blaue Symbole zur
Auflockerung, ein zweites Blau „für Abwechslung".

**Im Inhaltsbereich steht höchstens ein blauer Knopf im Bild** — nachgemessen
über die ganze Seite, an keiner Stelle zwei. Die Kopfzeile trägt ihren eigenen;
er zählt nicht mit, steht aber dafür in jedem Bild. Sobald im Inhalt zwei
nebeneinander stehen, ist keiner mehr der Hauptaufruf.

### 2.2 Das Budget für dunkle Flächen

`--dark` (`#2b2f38`) trägt Gewicht und verbraucht es. Auf der ganzen Startseite
gibt es drei dunkle Flächen: die Gesprächskarte („Was am Telefon passiert"), die
Abgrenzungskarte („Dafür nicht") und den Abschluss.

**Höchstens eine dunkle Fläche je Bildschirmhöhe, höchstens drei je Seite.** Die
dritte ist der Abschluss — die gehört immer dorthin. Also bleiben für den Rest
der Seite zwei.

> **Daraus folgt eine Anordnungsregel: Zwei dunkle Flächen dürfen nicht
> aneinandergrenzen.** Der Abschluss ist immer dunkel und klebt, sobald sein
> Abschnitt beginnt — der Abschnitt davor muss deshalb hell sein. Sonst stehen
> am Übergang beide gleichzeitig im Bild, und zwar genau eine Bildschirmhöhe
> lang.
>
> Auf `/branchen` und `/kaltakquise` stand die dunkle Abgrenzungskarte zuerst
> unmittelbar vor dem Abschluss. Beide Seiten tragen jetzt die helle Bühne
> dazwischen; die Abgrenzung ist dafür einen Abschnitt nach vorn gerückt, was
> inhaltlich sogar besser passt — sie beantwortet den Einwand, den die Liste
> darüber weckt.
>
> **Zum Nachmessen:** in Schritten von einer **halben** Bildschirmhöhe prüfen,
> nicht einer ganzen. Mit ganzen Schritten hängt es am Zufall der
> Abschnittshöhen, ob der Übergang überhaupt in ein Bild fällt — auf
> `/kaltakquise` fiel er monatelang daneben, bei derselben Anordnung, die auf
> `/branchen` sofort aufgefallen ist.

### 2.3 Grau ist gestuft, nicht beliebig

Fünf Tinten von `--ink` bis `--ink-5`. Die Stufe ergibt sich aus der Rolle,
nicht aus dem Geschmack: Überschrift, Lauftext, Etikett, Spaltentitel, Fußnote.
Wer eine sechste Stufe braucht, hat meist eine Rolle zu viel erfunden.

> [!WARNING]
> **`--ink-4` und `--ink-5` bestehen die WCAG-AA-Schwelle auf Weiß nicht.**
> Gemessen: `--ink-4` (`#8a8a8a`) 3,45:1, `--ink-5` (`#a0a0a0`) 2,61:1 —
> nötig sind 4,5:1 für Text unter 18,5px. Das betrifft Spaltentitel, Achsen
> und Fußnoten auf allen Seiten einschließlich Startseite und Fußzeile und ist
> Bestand im Tokensatz, keine Folge einer einzelnen Seite.
>
> Die Korrektur (`--ink-4` auf etwa `#767676`, `--ink-5` auf `#8a8a8a`)
> verändert das Bild jeder Seite und ist deshalb eine Entscheidung, keine
> Wartung. **Bis sie gefallen ist: neuer Code nimmt für Spaltentitel und
> Etiketten `--ink-3` (5,74:1).** So gebaut in `/ueber-uns`; die Seite ist
> dadurch die erste ohne eigenen Kontrastbefund.

---

## 3 · Schrift

Inter, geladen über `next/font`. Eine Familie, vier Größenrollen.

| Rolle | Größe | Schnitt | Laufweite | Zeile | Breite |
|---|---|---|---|---|---|
| `.heroTitle` | `clamp(34px, 5vw, 64px)` | 700 | `-0.04em` | 1.03 | `16ch` |
| `.h2` | `clamp(28px, 3.6vw, 52px)` | 700 | `-0.035em` | 1.06 | `20ch` |
| `.h3` | `clamp(20px, 1.9vw, 30px)` | 600 | `-0.025em` | 1.2 | — |
| `.lead` | `clamp(16px, 1.2vw, 18px)` | 400 | — | 1.55 | `32em` |
| `.body` | `clamp(15px, 1.15vw, 17px)` | 400 | — | 1.6 | `36em` |
| `.eyebrow` | `13px` | 600 | `+0.08em` | — | — |
| Kleintext | `12–14px` | 400–600 | — | — | — |

Vier Regeln, die zusammen den Satz tragen:

1. **Die Laufweite läuft der Größe entgegen.** Große Schrift wird enger
   (`-0.04em`), das Etikett wird weiter (`+0.08em`). Ohne das fällt eine
   64-px-Zeile auseinander und ein 13-px-Etikett klumpt.
2. **Die Breitenbegrenzung steht in `ch` und `em`, nicht in Pixeln.** Sie
   begrenzt die **Zeilenlänge**, nicht die Spalte. Ohne sie läuft Fließtext auf
   großen Fenstern auf 120 Zeichen — lesbar ist er bis etwa 75.
3. **`text-wrap: balance` für Überschriften, `pretty` für Fließtext.** Das
   verhindert die einzelne Restzeile aus zwei Wörtern.
4. **Schriftgröße, die an der Fensterhöhe hängt, ist die Ausnahme.** Nur die
   Abschlussüberschrift hat `clamp(34px, min(5vw, 7.4vh), 72px)` — sie steht in
   einer Karte, die in eine Bühne passen muss. Überall sonst skaliert nur die
   Breite.

> **Gelernt:** Die Einstiegsüberschrift stand zuerst auf `72px`. Nachdem der
> Inhalt auf `1280px` geboxt wurde, wuchs die Schrift mit `5vw` weiter, die
> Spalte aber nicht mehr — bei 1600 px brach die Zeile auf fünf Zeilen um, die
> letzten beiden zwei Wörter lang. `64px` ist der Wert, bei dem es bei vier
> bleibt. Wer die Obergrenze anhebt, muss die Spaltenbreite mit anheben.

---

## 4 · Raum

### 4.1 Die Box

Alles sitzt in `--page-max: 1280px`, zentriert, mit `--edge` als Innenabstand.
Das ist dieselbe Box wie die Navigation — **die wichtigste einzelne
Entscheidung der Seite.** Logo, Überschrift und Fußzeile stehen dadurch auf
jeder Fensterbreite auf derselben senkrechten Linie.

Randlos über die volle Breite sieht auf einem 1920er Bildschirm nicht großzügig
aus, sondern unaufgeräumt: Der Inhalt reißt von der Navigation weg.

### 4.2 Der Takt

| Größe | Wert | Rolle |
|---|---|---|
| `--section-y` | `clamp(104px, 15vw, 260px)` | Abstand zwischen Abschnitten im Fluss |
| Spaltenabstand | `clamp(40px, 6vw, 96px)` | zwischen den zwei Spalten einer Bühne |
| Spaltenfluss | `clamp(28px, 5vh, 56px)` | zwischen Etikett, Überschrift, Vorspann, Aufruf |

Der senkrechte Fluss innerhalb einer Bühne hängt an `vh`, nicht an `vw`: Er
teilt sich die Bildschirmhöhe mit dem Inhalt, und auf einem flachen Fenster
muss er nachgeben, bevor der Text es tut.

### 4.3 Radien

`32px` für die große dunkle Karte, `24px` für gefüllte Karten, `22px` für
umrandete, `999px` für Pillen und Schaltflächen. Auf schmalen Fenstern gehen
die großen eine Stufe zurück (`24px`), sonst wirkt die Rundung im Verhältnis
zur Fläche wie ein Wasserbett.

---

## 5 · Die Klebe-Bühne

Das Muster, das die Startseite prägt. Technisch steht es im
[Baukasten § 4.4](seitenbaukasten.md); hier steht, **wann** man es einsetzt und
wie man es proportioniert.

### 5.1 Anatomie

```
┌─ Abschnitt ────────────────────────────────────────┐
│ ┌─ Hülle (Scrollstrecke, 360–500vh) ─────────────┐ │
│ │ ┌─ Bühne (klebt, 100vh) ──────────────────────┐│ │
│ │ │  ┌ stehende Spalte ┐  ┌ laufende Spalte ┐   ││ │
│ │ │  │ Etikett         │  │  Eintrag 1      │   ││ │
│ │ │  │ Überschrift     │  │  Eintrag 2  ←   │   ││ │
│ │ │  │ Vorspann        │  │  Eintrag 3      │   ││ │
│ │ │  │ Aufruf          │  └─────────────────┘   ││ │
│ │ │  │ ▬▬▬▬▬▬░░░░░░░░  │   (einer sichtbar)     ││ │
│ │ │  └─────────────────┘                        ││ │
│ │ └─────────────────────────────────────────────┘│ │
│ └────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────┘
```

- Die **stehende Spalte** trägt, was für den ganzen Abschnitt gilt: Etikett,
  Überschrift, Vorspann, Aufruf, Fortschrittslinie.
- Die **laufende Spalte** trägt die Einträge. Sichtbar ist immer genau einer,
  die anderen liegen auf `opacity: 0` **im selben Platz**.
- Die **Fortschrittslinie** am Fuß der stehenden Spalte zeigt, wie weit der
  Abschnitt gelaufen ist. Sie ist 2 px hoch und blau — das einzige Blau, das
  sich bewegt.

Welche Seite steht, ist eine Entscheidung je Abschnitt: Beim Problem steht der
Text links und das Diagramm läuft rechts; beim Telefon steht die Gesprächskarte
links und der Text läuft rechts. Faustregel: **Was sich erklärt, läuft. Was
begleitet, steht.**

### 5.2 Wann eine Bühne — und wann nicht

| Nimm eine Bühne, wenn … | Lass es, wenn … |
|---|---|
| der Abschnitt 3–9 gleichrangige Einträge hat | es ein Fließtext mit Zwischenüberschriften ist |
| die Einträge eine Reihenfolge haben (Ablauf, Zeit, Stufen) | die Einträge zum Vergleich **nebeneinander** gehören |
| es dazu ein Schaubild gibt, das sich mitentwickelt | das Schaubild ein statisches Bild ist |
| der Abschnitt inhaltlich trägt | er nur eine Überleitung ist |

**Höchstens drei bis vier Bühnen je Unterseite.** Die Startseite hat zehn, weil
dort jemand zum ersten Mal entscheidet und jede Frage einmal drankommt. Eine
Unterseite mit zehn Bühnen kopiert die Form ohne den Anlass — sie wird lang,
ohne mehr zu sagen. Der Rest der Seite läuft im normalen Fluss (`.section` +
`.stack`, [Baukasten § 4.1](seitenbaukasten.md)).

### 5.3 Länge

Gemessen auf der Startseite bei 1600 × 900:

| Einträge | `--scene-height` | ergibt | Abschnitt |
|---|---|---|---|
| 2 | `360vh` | 4,3 × | Passt das? |
| 3 | `400–420vh` | 4,0–5,1 × | Problem, Ablauf, Über Nico, Termin |
| 4 | `450vh` | 4,5 × | Prozess |
| 5 | `480vh` | 4,8 × | Ergebnisse |
| 6 | `500vh` | 5,0 × | Am Telefon |
| 9 | `460vh` | 4,6 × | Fragen |

Bis fünf Einträge etwa **eine Bildschirmhöhe je Eintrag**. Darüber wird der
Anteil kleiner — neun Fragen mit je einer Bildschirmhöhe wären ein Abschnitt
von zehn Bildschirmhöhen, an dem man verzweifelt. Untergrenze für jede Bühne:
**4 ×**. Darunter scrollt man daran vorbei, und man hätte sich die Mechanik
sparen können.

### 5.4 Der Slot wird gemessen

Die Einträge liegen absolut übereinander und tragen deshalb **keine Höhe** bei.
`--scene-slot` ist die Höhe des höchsten, und zwar gemessen, nicht geschätzt:
zu klein, und der längste Eintrag ragt aus der Bühne; zu groß, und darunter
steht Leerraum. Höchsten Eintrag bei mehreren Fensterbreiten messen,
Untergrenze der `clamp()` knapp darüber.

Auf der Startseite reicht die Spanne von `clamp(108px, 13vh, 122px)` (drei
Zeitpunkte im Abschluss) bis `clamp(600px, 70vh, 640px)` (die Vergleichskarten
mit vier Punkten). Es gibt keinen brauchbaren Vorgabewert.

---

## 6 · Karten

| Sorte | Aufbau | Wofür |
|---|---|---|
| hell, gefüllt | `--surface`, `24px`, kein Rahmen | Inhalt, der zusammengehört |
| hell, umrandet | `#fff`, `1px var(--line)`, `22px` | Einzelstücke in einer Reihe |
| dunkel | `--dark`, `#fff`, `24–32px` | das Gegenstück, der Abschluss |

Eine Karte hat **eine** Sorte Inhalt. Der Innenrand wächst mit ihr und liegt
auf der Startseite zwischen `clamp(20px, 1.8vw, 28px)` (Prozesskarte) und
`clamp(22px, 2.2vw, 36px)` (Vergleichskarte); die Gesprächskarte setzt ihn
senkrecht an die Fensterhöhe (`clamp(26px, 3vh, 44px)`), weil sie in eine Bühne
passen muss. Einen Vorgabewert gibt es nicht — Richtwert ist rund ein Achtel
der Kartenbreite, gedeckelt bei 36 px.

Karten in Karten gibt es nicht. Wenn eine Karte drei verschiedene Dinge zeigen
soll, sind es drei Karten oder ein Eintrag einer Bühne.

---

## 7 · Grafik: vorführen statt illustrieren

Jeder tragende Abschnitt der Startseite hat ein Schaubild, und jedes zeigt
etwas, das die Seite ohnehin behauptet:

| Abschnitt | Schaubild | Zeigt |
|---|---|---|
| Einstieg | Arbeitswoche mit Terminblöcken | die 3–8 Termine |
| Problem | Balkendiagramm, das erst steigt und dann versiegt | die verzögerte Wirkung |
| Ablauf | Karten, die durch drei Stufen laufen | die Qualifizierung |
| Am Telefon | Gesprächsanzeige mit Uhr und Haken | ein Anruf in fünf Minuten |
| Prozess | Aufwandsbalken je Schritt | „weniger als 90 Minuten" |
| Ergebnisse | Fallkarten, einzeln | die Zahlen |
| Abschluss | dieselbe Woche wie im Einstieg, die sich füllt | das Ergebnis |

Die Regeln dahinter:

1. **Das Schaubild zeigt die Zahl, die im Text steht** — nicht eine
   schmückende andere.
2. **Sein Zustand hängt am Scrollstand**, nicht an einer eigenen Laufzeit.
   Sonst läuft es weiter, während man noch den Text daneben liest.
3. **Es ist ein Bild für Vorlesehilfen**: `role="img"` mit einem `aria-label`,
   das beschreibt, was zu sehen ist — nicht 40 einzeln vorgelesene Kästchen.
   Echter Text daneben bleibt **außerhalb** dieses Elements, sonst verschwindet
   er aus der Vorlesereihenfolge.
4. **Keine Stockbilder, keine Symbolteppiche.** Ein Symbol gibt es nur als
   Marke einer Karte, höchstens eines je Karte: ein 40-px-Feld mit `12px`
   Radius, `--accent-soft` als Fläche, `--accent` als Zeichen — so wie auf den
   Referenzkarten. Symbole im Fließtext, in Listen oder neben Überschriften
   gibt es nicht.
5. **Ein leerer Zustand ist auch ein Zustand.** Der Abschlusskalender zeigt von
   Anfang an blasse Plätze, die sich füllen. Vorher war dort zwei Drittel der
   Bühne lang nichts zu sehen — und „nichts zu sehen" liest sich wie ein Fehler,
   nicht wie „noch nichts eingetragen".

---

## 8 · Bewegung

| Größe | Wert |
|---|---|
| Kurve | `--ease: cubic-bezier(.16, 1, .3, 1)` — eine für alles |
| Einblenddauer | `--reveal-dur: 0.5s` |
| Staffelung | Verzögerungen × `--rd-scale: 0.45` |
| Auslöser | Rand mit Vorlauf (`0px 0px 60% 0px`), nicht Sichtbarkeitsanteil |
| Glättung | Feder in `useScrollScene`, 0.12 der Restdistanz je Frame |

Vier Sätze zum Charakter:

- **Einblendungen beginnen, bevor der Abschnitt zu sehen ist.** Wer zügig
  scrollt, sieht fertigen Inhalt. Der Auslöser hängt am unteren Rand mit 60 %
  Vorlauf — bei einem Abschnitt von vier Bildschirmhöhen ist ein
  Sichtbarkeitsanteil als Auslöser unbrauchbar.
- **Es bewegen sich Deckkraft und Position, sonst nichts.** Keine Drehung, kein
  Federn, keine Skalierung über 6 %.
- **Was am Scrollstand hängt, hat keine eigene Laufzeit** und bekommt deshalb
  auch keine Verzögerung. Eine Verzögerung auf einem scrollgebundenen Element
  lässt es dem Mausrad hinterherlaufen.
- **Bei `prefers-reduced-motion` lösen sich die Bühnen auf.** Nicht „Animation
  aus" — sondern das Klebe-Verhalten fällt weg und alle Einträge stehen
  untereinander. Wer das vergisst, zeigt von neun Antworten eine.

---

### 8.1 Scroll-Bindung ohne Bühne

Die Klebe-Bühne ist **eine** Art, etwas an den Scrollstand zu hängen, nicht die
einzige. Wer sie weglässt, weil der Anlass fehlt, muss deshalb nicht auf
Bewegung verzichten — sonst fällt die Seite auf blosse Einblendungen zurück und
wirkt neben den übrigen leblos.

Der Haken `useScrollScene` ist dafür schon allgemein genug: Er liefert einen
geglätteten Wert 0–1 und schreibt ihn direkt ins DOM. Was die Bühne daraus
macht — kleben und Einträge tauschen — ist nur eine von mehreren Auswertungen.

Auf `/referenzen` gebaut, beide ohne klebenden Abschnitt:

| Bauteil | Was am Scrollstand hängt |
|---|---|
| **Das Register schreibt sich** | acht Zeilen erscheinen nacheinander, während der Abschnitt vorbeiläuft; die Trennlinie zieht sich mit (`scaleY`) |
| **Die Spur der Prüfliste** | eine senkrechte Linie am linken Rand füllt sich, die vier Einträge kommen dazu |

Drei Regeln, die dabei gelten:

1. **Der Fortschritt misst den Abschnitt im Fenster, nicht eine Klebestrecke.**
   0, wenn die Oberkante bei 85 % der Fensterhöhe steht; 1, wenn die Unterkante
   15 % erreicht. Diese Formel funktioniert auch für Abschnitte, die kürzer
   sind als das Fenster — die Bühnenformel (`-wrap.top / (wrap.height - vh)`)
   nicht.
2. **Kein `transition` auf scroll-gebundenen Elementen.** Die Glättung macht
   die Feder im Haken. Beides übereinander zieht sichtbar nach.
3. **Der Ausgangszustand steht in CSS, die Sichtbarkeit ohne JavaScript am
   Element.** `opacity: 0` im Stylesheet und `data-fade-in` am Element: Die
   `noscript`-Regel im Layout hebt es auf. Ohne das ist der Abschnitt ohne
   JavaScript leer — geprüft wird das mit abgeschaltetem JavaScript, nicht nur
   bei reduzierter Bewegung.

---

## 9 · Eine Unterseite: was sich ändern darf

Die Frage bei jeder neuen Seite lautet nicht „wie sehr darf ich abweichen",
sondern „was ist die Kante, an der man die Seiten als dieselbe Familie
erkennt". Das ist diese Liste:

**Fest — ohne Diskussion übernehmen:**

Box (`1280px`) · `--edge`-Stufen · alle Farbtoken · die Schriftskala aus § 3 ·
`--ease` und die Einblenddauer · die Umbruchleiter (1280/1100/860/768/640/520) ·
Schaltflächenformen und -größen · Radien-Stufen · die Kopf- und Fußzeile.

**Frei — und soll sich unterscheiden:**

| Was | Spielraum |
|---|---|
| Anzahl und Reihenfolge der Abschnitte | eine Leistungsseite braucht keine neun |
| Anteil Bühne zu Fluss | 3–4 Bühnen, Rest im Fluss (§ 5.2) |
| Welche Spalte steht, welche läuft | je Abschnitt neu entscheiden |
| Welches Schaubild ein Abschnitt zeigt | muss zur Aussage der Seite passen, nicht zur Startseite |
| Dichte | eine Wissensseite darf enger stehen als die Startseite |
| Fortschrittsleiste | ab etwa sechs Abschnitten **oder** zehn Bildschirmhöhen |
| Einstieg | nicht jede Seite braucht einen bildschirmfüllenden |

### 9.1 Vier Zuschnitte als Ausgangspunkt

**Leistungsseite** — so gebaut in `/leistungen`: fünf Abschnitte, drei Bühnen.

> Einstieg *(Fluss, gut zwei Drittel Bildschirmhöhe, kein Klebe-Einstieg)* →
> **Bühne:** die Leistungen, eine nach der anderen → **Bühne:** die Modelle der
> Zusammenarbeit, jedes mit seiner Grenze → Regionen *(Fluss, Kartenfeld)* →
> **Bühne:** Abschluss mit dunkler Karte
>
> Bewusst **nicht** übernommen: Problem, Abgrenzung, Referenzen und FAQ. Die
> stehen auf der Startseite. Wer hier ankommt, kommt aus Navigation oder Suche
> und will wissen, was geliefert wird — dieselben Argumente ein zweites Mal
> machen die Seite länger, nicht überzeugender.

**Stadtseite** — so gebaut in `/kaltakquise/[stadt]`: sechs Abschnitte, zwei
Bühnen, rund dreizehn Bildschirmhöhen.

> Einstieg mit Ortsbezug *(Fluss, Schaubild statt Bild)* → **Bühne:** der Markt
> vor Ort, drei Einträge → Rechtsrahmen *(Fluss, dunkle Karte)* → häufige
> Fragen *(Fluss, aufklappbar)* → Umgebung und Branchen *(Fluss)* → **Bühne:**
> Abschluss mit dunkler Karte
>
> **Zwei Bühnen statt einer, und die Fragen nicht darauf.** Der Entwurf dieser
> Zeile sah eine Bühne vor. Gebaut wurden zwei — der Abschluss trägt sie
> ohnehin, und der Ortsteil ist der einzige Abschnitt, den keine zweite Seite
> der Domain so hat; er verdient den Platz. Die sechs Fragen stehen dagegen
> bewusst **nicht** auf einer Bühne: Drei ihrer Antworten geben den Ortstext
> wieder, der weiter oben schon sichtbar steht. Eingeklappt ist diese
> Überschneidung harmlos — wer die Frage öffnet, hat sie gestellt. Offen auf
> einer Bühne wäre sie derselbe Absatz ein zweites Mal, nur langsamer. Das ist
> § 5.2 in einem Satz: Was man nachschlägt, gehört nebeneinander.
>
> **Das Schaubild des Einstiegs ist kein Bild.** Fünfzehn Seiten mit demselben
> Porträt sind fünfzehnmal dasselbe LCP-Bild und nullmal ein Argument. An
> seiner Stelle steht, was zu jedem Kontakt dokumentiert wird — vier Zeilen,
> die genau das zeigen, was die Seite behauptet, und ohne Beispielquote: Vier
> Protokollzeilen mit einem Termin darin wären eine Trefferquote, die niemand
> zugesagt hat.

**Branchenseite** — noch nicht umgestellt. Der Zuschnitt oben ist der
Ausgangspunkt; Belege und Abgrenzung treten dort an die Stelle des Ortsteils.

> **Gelernt beim zweiten Familien-Einstieg (`/wissen`):** Dort folgen drei
> Listenabschnitte aufeinander — Beiträge, Videos, Begriffe. In derselben
> Kachelform hintereinander liest sich das wie eine einzige, sehr lange Liste,
> und man hört nach der zweiten auf zu schauen. **Mehrere Listen in Folge
> bekommen deshalb verschiedene Texturen:** die Beiträge eine Zeilenliste mit
> Trennlinien, die Videos Karten mit Vorschaubild, die Begriffe ein dichtes
> Feld kleiner Kacheln. Gleiche Familie, unterschiedlicher Griff — der Wechsel
> sagt dem Auge, dass hier etwas anderes anfängt.
>
> **Und: kein Terminknopf über der Liste.** Wer auf einer Wissensseite
> ankommt, will lesen. Der eine Aufruf der Seite steht im Abschluss, wie
> überall; im Einstieg steht stattdessen, was es hier gibt. Ein Buchungsknopf
> über der Beitragsliste stünde im Weg, ohne etwas zu gewinnen.

**Familien-Einstieg** — so gebaut in `/kaltakquise`: fünf Abschnitte, zwei
Bühnen, rund zwölf Bildschirmhöhen.

> Einstieg *(Fluss, gut zwei Drittel Bildschirmhöhe, **ohne Schaubild**)* →
> die Kinder der Familie *(Fluss, Kartenfeld)* → **Bühne:** woran sich die
> Kinder unterscheiden → Abgrenzung *(Fluss, dunkle Karte)* → **Bühne:**
> Abschluss mit dunkler Karte
>
> **Der Wegweiser steht weit oben.** Eine Übersicht wird nicht gelesen, sie
> wird benutzt: Der nützlichste nächste Schritt ist die Liste, nicht ein
> weiteres Argument. Sie ist deshalb der zweite Abschnitt, nicht der fünfte.
>
> **Der Einstieg bekommt kein Schaubild.** Hier gilt § 7 rückwärts: Es gibt
> nichts vorzuführen, was die Seite selbst behauptet — die Belege stehen eine
> Ebene tiefer. Statt eines Bildes, das nichts zeigt, trägt der Einstieg das
> Abschnittsgerüst der Grundlage (`.sectionHead`, 7fr/5fr): Etikett und
> Überschrift links, Vorspann rechts, unten bündig. Damit füllt Text die
> Breite, ohne dass etwas erfunden wird.
>
> **Der mittlere Abschnitt vergleicht.** Das ist das Einzige, was eine
> Übersicht kann und ihre Kinder nicht: Auf `/kaltakquise` stellt die Bühne
> drei Märkte nebeneinander und begründet damit, warum es die fünfzehn
> Einzelseiten überhaupt gibt. Ohne diesen Abschnitt wirkt eine Seitenfamilie
> wie derselbe Text mit ausgetauschtem Namen.
>
> **Die Abgrenzung wird nicht wiederholt, sondern gedreht.** Die Kinder tragen
> den Rechtsrahmen in voller Länge; eine sechzehnte Fassung davon wäre
> Füllmaterial. Der Einstieg trägt stattdessen die Praxisseite derselben Sache
> — drei Dinge, die wir nicht tun, jedes mit seiner Rechtsgrundlage in einem
> Halbsatz.

**Aussageseite** — so gebaut in `/referenzen`: fünf Abschnitte, **keine
Bühne, keine Fortschrittsleiste**, knapp sieben Bildschirmhöhen.

> Einstieg mit Zählerstreifen *(Fluss)* → **Register:** was veröffentlicht wird
> und was nicht *(Fluss, dunkle Karte, zwei Spalten)* → die Vorlage
> *(gestrichelt)* → vier Handgriffe *(nummerierte Liste)* → Abschluss
> *(Fluss, dunkle Karte — nicht als Bühne)*
>
> Der Zuschnitt folgt aus dem Inhalt: Es gibt null freigegebene Fallstudien und
> ein Blindmuster. Eine Bühne braucht drei bis neun gleichrangige Einträge
> (§ 5.2) — hier gäbe es einen. Eine Leiste braucht sechs Abschnitte oder zehn
> Bildschirmhöhen — hier gibt es fünf und sieben. **Beide wegzulassen ist keine
> Abweichung, sondern dieselbe Regel, angewendet auf andere Zahlen.**
>
> **Scroll-gebunden ist die Seite trotzdem** — siehe § 8.1. Ohne Bühne heißt
> nicht ohne Bewegung.

**Vertrauensseite** — so gebaut in `/ueber-uns`: sechs Abschnitte, zwei
Bühnen, rund vierzehn Bildschirmhöhen, mit Fortschrittsleiste.

> Einstieg **mit Porträt** *(Fluss)* → **Bühne:** woher die Arbeitsweise stammt,
> drei Einträge → vier Zusagen mit Gegenprobe *(Fluss, Kartenfeld)* → die
> Grenze *(Fluss, dunkle Karte)* → das Unternehmen *(Fluss, Angabenraster)* →
> **Bühne:** Abschluss mit dunkler Karte
>
> **Der Einstieg trägt ein Bild — und das ist keine Ausnahme vom Zuschnitt
> Stadtseite, sondern dieselbe Regel.** Dort wurde das Porträt verworfen,
> weil fünfzehn Seiten mit demselben Gesicht fünfzehnmal dasselbe LCP-Bild
> sind und nullmal ein Argument. Auf dieser einen Seite **ist** das Gesicht
> das Argument: Wer ausgelagerte Akquise kauft, lässt jemand Fremdes unter dem
> eigenen Firmennamen anrufen. Die Regel lautet „das Schaubild zeigt, was die
> Seite behauptet“ (§ 7) — hier liefert sie das umgekehrte Ergebnis.
>
> **Das Angabenraster steht zwischen den beiden dunklen Flächen.** Sitz,
> Inhaber, Erreichbarkeit, Auftragsverarbeitung und KI-Kennzeichnung sind
> zugleich der hellste Abschnitt der Seite — und damit die Trennung, die
> § 2.2 für Grenzkarte und Abschluss verlangt. Ein Abschnitt, der nur trennt,
> wäre Füllmaterial; dieser wird auf einer „Über uns“-Seite ohnehin gesucht.
>
> **Die Zusagen ersetzen die Werteliste.** Vier Symbolkarten mit
> „Ergebnisorientiert“, „Partnerschaftlich“, „Kontinuierlich“,
> „Professionell“ standen hier vorher. Jeden dieser Sätze hätte ein
> Wettbewerber unverändert übernehmen können — siehe § 9.2, Hebel zwei.

**Kontaktseite** — so gebaut in `/kontakt`: sechs Abschnitte, zwei Bühnen,
rund vierzehn Bildschirmhöhen, mit Fortschrittsleiste.

> Einstieg *(Fluss, ohne Schaubild)* → die drei Wege *(Fluss, drei Karten
> nebeneinander)* → wofür nicht *(Fluss, dunkle Karte)* → das Formular
> *(Fluss)* → **Bühne:** was mit der Nachricht geschieht → **Bühne:**
> Abschluss mit dunkler Karte
>
> **Die drei Wege sind keine Bühne — aus der Regel heraus.** Drei
> gleichrangige Einträge mit einer Ordnung wären der Anlass für eine; § 5.2
> nennt aber den Gegenfall ausdrücklich: „die Einträge gehören zum Vergleich
> nebeneinander". Drei Kontaktwege liest man nicht nacheinander, man wählt
> einen aus, und dafür müssen alle drei gleichzeitig im Bild stehen.
>
> **Die Antwortzeit ist die Auszeichnung.** Jede Karte trägt sie oben als
> Pille in `--accent-soft` — der dritte erlaubte Fall aus § 2.1, eine
> Auszeichnung, die eine Zusage trägt. Sie ist die Angabe, nach der ausgewählt
> wird, und die einzige farbige Stelle der Seite ausserhalb der Knöpfe.
>
> **Die Abgrenzung steht vor dem Formular, nicht dahinter.** Wer sich darin
> wiedererkennt, soll nicht erst tippen. Zugleich trennen Formular und Bühne
> die dunkle Abgrenzungskarte vom dunklen Abschluss (§ 2.2).
>
> **Das Formular braucht ein Zustandsrot.** Die Palette kennt genau ein Blau
> und ein Dunkelgrau — ein Fehlerrot ist kein zweiter Akzent, sondern ein
> Zustandszeichen: Ohne eigene Farbe bleibt nur die Textmeldung, und die wird
> übersehen. Gesetzt ist `#b42318` (6,6:1 auf Weiß), lokal im Stylesheet der
> Seite, ausschließlich an Formularfehlern, nie als Fläche.

**Wissensseite / Beitrag** — keine Bühne. Dort trägt die Lesbarkeit des
Fließtextes, nicht die Mechanik. Übernommen werden Box, Schrift, Farbe und der
Abschluss.

### 9.2 Wenn alles gleich aussieht

Ab der dritten, vierten Seite im selben Zuschnitt beginnt die Familie zur
Schablone zu werden: Einstieg, Bühne, dunkle Karte, Bühne, fertig. Das ist ein
echtes Risiko — eine Website, deren Seiten sich nur im Text unterscheiden,
liest sich wie ein Formular.

**Was NICHT die Lösung ist:** ein zweiter Akzent, eine andere Schrift, ein
eigener Umbruchpunkt, eine neue Kartenform „zur Auflockerung". Das bricht die
Familie, ohne etwas zu gewinnen — § 9 nennt diese Dinge nicht ohne Grund als
fest.

**Was die Lösung ist: den Inhalt fragen, nicht den Kalender.** Drei Hebel, alle
aus § 9 erlaubt, alle an `/referenzen` erprobt:

| Hebel | Beispiel |
|---|---|
| **Mechanik weglassen, wenn der Anlass fehlt** | keine Bühne, keine Leiste — weil es einen Eintrag gibt, nicht neun |
| **Ein Bauteil erfinden, das nur diese Seite braucht** | das Register (zwei Spalten, senkrechte Linie) und die gestrichelte Vorlage |
| **Die Scroll-Bindung anders auswerten** | das Register schreibt sich, statt dass eine Bühne klebt (§ 8.1) |
| **Eine Zeile umwidmen statt neu erfinden** | aus der Merkmalszeile („Unverbindlich · Nur 5 Kunden pro Monat") wird ein Zählerstreifen: 0 freigegebene Fallstudien · 1 Blindmuster · nicht im Index |
| **Dieselbe Regel mit umgekehrtem Ergebnis anwenden** | auf der Stadtseite fällt das Porträt weg, auf `/ueber-uns` trägt es den Einstieg — beide Male, weil das Schaubild zeigen soll, was die Seite behauptet (§ 7) |

Die Probe: **Lässt sich die Abweichung in einem Satz aus dem Inhalt
begründen?** „Keine Bühne, weil es nur einen Eintrag gibt" besteht sie.
„Mal etwas anderes" besteht sie nicht.

Ein neues Bauteil bekommt dabei eine **eigene Bedeutung, die es nirgends sonst
hat.** Gestrichelte Linien kommen auf dieser Website ausschließlich auf
`/referenzen` vor und heißen dort genau eines: noch nicht echt. Ein zweites
Vorkommen mit anderer Bedeutung macht aus der Aussage Dekoration.

Gemeinsam bleibt allen: **ein Einstieg, der etwas verspricht, ein Abschnitt,
der abgrenzt, und genau ein Abschluss mit einem Aufruf.**

---

## 10 · Anti-Muster

Jeder Punkt stand schon einmal in dieser Codebasis und wurde entfernt.

| Nicht tun | Warum |
|---|---|
| Abstände vergrößern, um einem Abschnitt mehr Zeit zu geben | ergibt keinen längeren Abschnitt, sondern einen löchrigen — auf der Startseite entstanden so ~600 px Leerraum zwischen zwei Punkten |
| Zwei Hauptaufrufe nebeneinander | dann ist keiner mehr der Hauptaufruf |
| Ein zweites Blau, ein zweites Dunkelgrau | die Palette lebt davon, dass sie klein ist |
| `display: none` für den unsichtbaren Eintrag einer Bühne | der Inhalt verschwindet aus Suche und Seitensuche |
| Eine eigene `height`-Regel je Bühne | sie schlägt das `height: auto` der gestapelten Fassung; sieben Abschnitte hingen dadurch bis zu 2.000 px Leerraum unter ihren Inhalt |
| Einen eigenen Umbruchpunkt erfinden (z. B. 900 px) | die Seite wird als Ganzes unvorhersehbar |
| `quality` an `next/image` | ein Wert, der nicht in `images.qualities` steht, lädt das LCP-Bild zweimal |
| Eine Grafik mit eigener Laufzeit neben scrollgebundenem Text | beides läuft auseinander, sobald jemand langsam liest |
| Symbole zur Auflockerung | sie werden zum Teppich und tragen nichts |

---

## 11 · Sichtprüfung vor der Abnahme

Zusätzlich zur [Abnahme im Baukasten § 10](seitenbaukasten.md):

- [ ] Logo, Etikett, Überschrift und Fußzeile auf **einer** senkrechten Linie
      (390–1920 px, 0 px Abweichung)
- [ ] Je Bildschirmhöhe höchstens **ein** blauer Knopf im Inhalt (die Kopfzeile
      zählt nicht mit) und **eine** dunkle Fläche
- [ ] Jede Bühne mindestens **4 ×** Bildschirmhöhe, klebendes Element mittig
- [ ] Der höchste Eintrag passt in seinen Slot — bei 1120, 1440, 1920 px geprüft
- [ ] Die Bühne passt bei **560 px Fensterhöhe** noch in den Bildschirm
- [ ] Gestapelt (< 1100 px): Abschnittshöhe = Inhaltshöhe, kein Leerraum darunter
- [ ] Bei `prefers-reduced-motion`: **jeder** Eintrag sichtbar, nicht nur der letzte
- [ ] Beim Scrollen mit 5.000 px/s steht jede Überschrift beim Sichtkontakt fertig
- [ ] Keine Überschrift bricht auf eine angerissene Restzeile um — gemessen:
      letzte Zeile mindestens ein Viertel der breitesten
