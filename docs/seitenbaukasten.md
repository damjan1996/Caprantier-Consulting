# Seitenbaukasten — wie weitere Seiten auf Basis der Startseite gebaut werden

**Stand:** 16.09.2026
**Referenzumsetzung:** `src/app/page.tsx` + `src/app/components/home/`
**Gemeinsame Grundlage:** `src/app/components/seite/`
**Gilt für:** alle neuen Seiten und jeden Umbau bestehender Seiten

Dieses Dokument beantwortet **wie wird es gebaut**. Die zwei Schwesterdokumente
beantworten die anderen beiden Fragen und gehören vor dem ersten Commit gelesen:
[seitendesign.md](seitendesign.md) — wie es aussehen soll;
[seitentexte.md](seitentexte.md) — was dastehen soll.

Die Startseite ist der Maßstab. Dieses Dokument beschreibt, was daran
übertragbar ist — und an welchen Stellen bewusst vom Entwurf abgewichen wurde,
damit dieselben Entscheidungen nicht ein zweites Mal aufgerollt werden müssen.

> **Stand 16.09.2026: Der Seitenbestand ist umgestellt.** Startseite,
> Leistungen, Kaltakquise, Branchen, Wissen, Referenzen, Über uns, Kontakt und
> beide Stadtfamilien laufen auf dieser Grundlage. Auf Tailwind stehen noch
> `/branchen/[branche]` (zwei Seiten), Blog und Glossar — dort trägt
> `Markdown.tsx` die Gestaltung, das ist ein eigener Schnitt. Abschnitt 9
> führt den Stand je Seite.

---

## 1 · Die zwei Regeln, die alles andere bestimmen

**1. Der Inhalt sitzt in derselben Box wie die Navigation.**
Höchstens `1280px` breit, zentriert, mit `1rem / 1.5rem / 2rem` Innenabstand ab
`0 / 640px / 1024px`. Das ist exakt `.container-custom` aus `globals.css`. Logo,
Überschrift und Fußzeile stehen dadurch auf jeder Fensterbreite auf derselben
senkrechten Linie — geprüft von 390 bis 1920 px mit 0 px Abweichung.

**2. Was sich bewegt, ist beim Ankommen fertig.**
Einblendungen starten, *bevor* der Abschnitt sichtbar wird, und dauern eine
halbe Sekunde. Wer zügig scrollt, sieht fertigen Inhalt, keine Animation. Das
war der auffälligste Fehler der ersten Fassung und ist in Abschnitt 5 als Zahl
hinterlegt.

Alles Weitere lässt sich aus diesen beiden ableiten.

---

## 2 · Aufbau einer Seite

### 2.1 Dateien

```
src/app/<route>/
  page.tsx                  Server-Komponente: Metadaten, JSON-LD, Komposition
  components/
    <Abschnitt>.tsx         je Abschnitt eine Datei
    <route>.module.css      ein Stylesheet je Seite
    index.ts                Sammel-Export
```

Ein Stylesheet **je Seite**, nicht je Komponente. Die Abschnitte einer Seite
teilen sich Token und Bausteine; auf zwölf Dateien verteilt wären die Umbrüche
nicht mehr an einer Stelle nachlesbar.

Die Seite schreibt darin aber nur ihre **eigenen** Abschnitte. Alles Gemeinsame
— Token, Textgerüst, Klebe-Bühne, Schaltflächen, Einblendungen,
Fortschrittsleiste — steht in `src/app/components/seite/basis.module.css` und
wird eingebunden:

```css
.page {
  composes: page from '../seite/basis.module.css';
}

/* Und für jede weitere Grundlagen-Klasse, die die Seite benutzt: */
.sceneStage {
  composes: sceneStage from '../seite/basis.module.css';
}
```

`composes` hängt dem Element **beide** Klassennamen an. Das ist nicht Kosmetik:
Nur so greifen auch eigene Regeln, die eine Grundlagen-Klasse im
Nachfahren-Selektor ansprechen — `.meinAbschnitt .sceneStage { … }`. Vorbild
für den Zuschnitt: der Stummel-Block oben in `home.module.css`.

> [!WARNING]
> **Ohne `.page` aus der Grundlage gibt es die Token nicht — und `--accent`
> heißt global etwas anderes.**
>
> Die Token hängen an der Klasse `.page`. Ausserhalb davon gemessen: `--ink`
> und `--page-max` sind gar nicht definiert, und `--accent` ist `#e8edf5` —
> ein blasses Grau aus dem `:root`-Satz in `globals.css`, nicht das
> Markenblau. Das Markenblau heisst dort `--primary`.
>
> Ein Stylesheet, das die Grundlage **nicht** einbindet und trotzdem
> `var(--accent)` schreibt, bekommt also **grau statt blau**, und `var(--ink)`
> lässt die Deklaration ersatzlos fallen. Ohne Fehlermeldung.
>
> Deshalb steht `composes: page from '../seite/basis.module.css'` ganz oben,
> und das Wurzelelement der Seite trägt diese Klasse.

CSS-Module statt Tailwind für neue Seiten. Der Grund ist nicht Geschmack: Die
Werte hier sind durchgehend `clamp()`-Verläufe und mehrstufige Rasterwechsel —
als Klassenkette wäre jede Medienabfrage eine eigene Variante.

### 2.2 `page.tsx`

Bleibt **Server-Komponente**. Kein `'use client'`, kein `dynamic()` für die
Abschnitte: Sie stehen alle im ausgelieferten HTML und werden für die Hydration
ohnehin sofort gebraucht. Nachgeladene Teilstücke erzeugen nur eine zusätzliche
Wartekette.

```tsx
export default function Seite() {
  return (
    <div className={styles.page}>
      {/* JSON-LD zuerst — wortgleich mit dem sichtbaren Inhalt */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Einstieg />
      <Abschnitt />
      …
      <MobileCtaBar />
      <SectionRail sections={MEINE_ABSCHNITTE} />
    </div>
  )
}
```

`'use client'` steht **nur** in den Abschnitten, die Zustand oder Scroll
brauchen. Reine Textabschnitte bleiben Server-Komponenten.

### 2.3 Dramaturgie

Die Startseite folgt der Reihenfolge, in der ein Entscheider seine Fragen
stellt. Für Unterseiten gilt dasselbe Prinzip, nicht dieselbe Liste:

| | Startseite | Übertragbar als |
|---|---|---|
| 1 | Was bekomme ich (Einstieg) | Versprechen mit Beleg im Bild |
| 2 | Warum brauche ich das (Problem) | Der Schmerz, vorgeführt statt behauptet |
| 3 | Wie läuft das ab (Ablauf, Telefon, Prozess) | Mechanik — der Teil, der Vertrauen schafft |
| 4 | Bin ich der Richtige (Passt das?) | Abgrenzung, ausdrücklich auch nach unten |
| 5 | Hat das funktioniert (Ergebnisse) | Belege |
| 6 | Mit wem rede ich (Über Nico) | Gesicht |
| 7 | Was ist offen (Fragen) | FAQ |
| 8 | Abschluss | Ein Aufruf, kein Formularfriedhof |

Kürzere Seiten lassen Punkte weg — aber nicht die Reihenfolge umstellen. Eine
Unterseite mit vier Abschnitten nimmt 1, 3, 5, 8.

---

## 3 · Token

Am Wurzelelement der Seite (`.page`) gesetzt, von allen Abschnitten geerbt.
Vollständig in `src/app/components/seite/basis.module.css`.

### 3.1 Farbe

| Token | Wert | Verwendung |
|---|---|---|
| `--ink` | `#0a0a0a` | Überschriften, Fließtext auf hellem Grund |
| `--ink-2` | `#4b4b4b` | Lauftext, Beschreibungen |
| `--ink-3` | `#6b6b6b` | Eyebrow, Nebenangaben |
| `--ink-4` | `#8a8a8a` | Spaltentitel, Achsen |
| `--ink-5` | `#a0a0a0` | Fußnoten, Hinweise |
| `--line` | `#e6e6e6` | Rahmen von Karten |
| `--line-soft` | `#ececec` | Trennlinie zwischen Abschnitten |
| `--surface` | `#f5f5f5` | Karten ohne Rahmen |
| `--surface-2` | `#f0f0f0` | Pillen, Marken |
| `--accent` | `#1a56db` | genau ein Blau, siehe unten |
| `--dark` | `#2b2f38` | dunkle Karten (Anrufkarte, Abgrenzung, Abschluss) |

> **Zum Akzent:** Der Entwurf schlug `#2a4fd6` vor und hat das selbst als
> Annahme markiert. Gesetzt ist `#1a56db` — das Blau aus `globals.css`. Sonst
> hätte die Startseite ein anderes Blau als Kopfzeile und alle übrigen Seiten.
> **Nicht ändern, ohne beide Stellen zu ändern.**

### 3.2 Maß und Takt

| Token | Wert | Bedeutung |
|---|---|---|
| `--page-max` | `1280px` | Satzbreite, = `.container-custom` |
| `--edge` | `1rem → 1.5rem → 2rem` | Seitenabstand, gestuft bei 640/1024 px |
| `--section-y` | `clamp(104px, 15vw, 260px)` | Höhe eines Abschnitts |
| `--ease` | `cubic-bezier(.16, 1, .3, 1)` | eine Kurve für alles |
| `--reveal-dur` | `0.5s` | Dauer jeder Einblendung |
| `--rd-scale` | `0.45` | staucht alle gestaffelten Verzögerungen |

`--edge` ist **gestuft und nicht fließend**, weil `.container-custom` es auch
ist. Ein `clamp()` daraus zu machen bricht die Ausrichtung zur Kopfzeile.

---

## 4 · Bausteine

Aus `src/app/components/seite/basis.module.css` einbinden, nicht neu erfinden.

### 4.1 Gerüst

```tsx
<section id="<marke>" className={styles.section} aria-labelledby="<x>-title">
  <div className={styles.stack}>
    <div className={styles.sectionHead}>
      <div className={styles.sectionHeadCopy}>
        <div className={styles.eyebrow}>Kurzes Etikett</div>
        <h2 id="<x>-title" className={styles.h2}>Eine Aussage, kein Schlagwort.</h2>
      </div>
      <p className={styles.lead}>Ein Satz, der die Überschrift einlöst.</p>
    </div>

    {/* Inhalt */}
  </div>
</section>
```

| Klasse | Zweck |
|---|---|
| `.section` | Box + `--section-y` + Trennlinie oben |
| `.stack` | senkrechter Fluss, `gap: clamp(48px, 6vw, 96px)` |
| `.sectionHead` | 7fr/5fr, unten bündig; ab 1100 px einspaltig |
| `.eyebrow` | 13 px, `0.08em`, Versalien, `--ink-3` |
| `.h2` | `clamp(28px, 3.6vw, 52px)`, `max-width: 20ch`, `text-wrap: balance` |
| `.h3` | `clamp(20px, 1.9vw, 30px)` |
| `.lead` | `clamp(16px, 1.2vw, 18px)`, `max-width: 32em` |
| `.body` | `clamp(15px, 1.15vw, 17px)`, `max-width: 36em` |

Die `max-width` in `ch`/`em` ist tragend: Sie begrenzt die **Zeilenlänge**, nicht
die Spalte. Ohne sie läuft Fließtext auf großen Fenstern auf 120 Zeichen.

### 4.2 Schaltflächen

| Klasse | Einsatz |
|---|---|
| `.btnPrimary` | der eine Hauptaufruf je Abschnitt (Akzentblau) |
| `.btnDark` | gleichwertige Alternative auf hellem Grund (`--ink`) |
| `.btnSmall` | dieselbe Schaltfläche in Nebenlage, 48 px statt 52 px |
| `.btnHint` | die Zeitangabe *in* der Schaltfläche („15 Min.") |
| `.textLink` | weiterführender Verweis, **min. 44 px Höhe** |
| `.actionRow` | Zeile aus Schaltfläche + Begleittext, umbruchfähig |

Buchungen laufen über `useCalendly()`, **nicht** über einen `href` auf Calendly:

```tsx
const { openCalendly, onHover } = useCalendly()
<button type="button" className={styles.btnPrimary} onClick={openCalendly} onMouseEnter={onHover}>
  <span>Erstgespräch buchen</span>
  <span className={styles.btnHint}>15 Min.</span>
</button>
```

`onMouseEnter` lädt das Buchungsfenster vor. Der Entwurf verlinkt direkt auf
`calendly.com` — das würde vor der Einwilligung Daten an einen Dritten geben.

### 4.3 Karten

Drei Sorten, mehr braucht es nicht:

| Sorte | Aufbau |
|---|---|
| hell, gefüllt | `background: var(--surface)`, `border-radius: 24px`, kein Rahmen |
| hell, umrandet | `background: #fff`, `border: 1px solid var(--line)`, `border-radius: 22px` |
| dunkel | `background: var(--dark)`, `color: #fff`, `border-radius: 24px` |

Die dunkle Karte trägt Gewicht. Höchstens **eine je Bildschirmhöhe**, sonst
wird sie zur Tapete.

### 4.4 Klebe-Bühne

Das Muster aller zehn Abschnitte der Startseite: Die Szene bleibt eine
Bildschirmhöhe lang stehen, während ihre Einträge an Ort und Stelle wechseln.

```tsx
<section id="<marke>" className={styles.sceneX} aria-labelledby="<x>-title">
  <div ref={wrapRef} className={styles.sceneWrap}>
    <div className={styles.sceneStage}>
      <div ref={revealRef} className={styles.sceneGrid}>
        <div className={styles.sceneCopy}>
          {/* Überschrift, Text, Aufruf, dann die Fortschrittslinie */}
          <span className={styles.sceneRail} aria-hidden="true">
            <span ref={railRef} className={styles.sceneRailFill} />
          </span>
        </div>
        <div className={styles.sceneAside}>
          <ol className={styles.sceneSlot}>
            {/* je Eintrag ein <li className={sceneItem …}> */}
          </ol>
        </div>
      </div>
    </div>
  </div>
</section>
```

| Klasse | Zweck |
|---|---|
| `.sceneWrap` | die Scrollstrecke; `height: var(--scene-height, 420vh)` |
| `.sceneStage` | `position: sticky`, `height: 100vh`, auf `--page-max` geboxt |
| `.sceneGrid` | Spalten aus `--scene-cols` (Vorgabe 7fr/5fr) |
| `.sceneSlot` | Stapelplatz; `min-height: var(--scene-slot)` |
| `.sceneItem` | ein Eintrag, absolut gesetzt, `opacity` statt `display` |
| `.sceneRail` | Fortschritt des Abschnitts, aus `apply` per `scaleX` |

Ein neuer Abschnitt braucht damit etwa sechs Zeilen CSS: Spalten, Slot-Höhe,
Bühnenlänge. Vier Regeln dazu:

1. **Die Bühnenlänge gehört auf `--scene-height`**, nicht auf eine eigene
   `.sceneX .sceneWrap { height: … }`-Regel. Eine solche Regel ist
   zweistellig und schlägt das einstellige `height: auto` der gestapelten
   Fassung — der Abschnitt behält auf dem Telefon seine Scrollhöhe und hängt
   ein bis zwei Bildschirmhöhen Leerraum unter seinen Inhalt.
2. **Die Slot-Höhe wird gemessen, nicht geschätzt.** Absolut gesetzte Kinder
   tragen keine Höhe bei; ist `--scene-slot` zu klein, ragt der höchste
   Eintrag heraus, ist sie zu groß, steht Leerraum darunter. Höchsten Eintrag
   bei mehreren Fensterbreiten messen, Untergrenze knapp darüber.
3. **Was nur einmal sichtbar ist, muss trotzdem im HTML stehen.** Deshalb
   `opacity: 0`, nie `display: none` — sonst verschwindet der Inhalt aus
   Suche und Seitensuche. `aria-hidden` nur auf dekorative Wiederholungen,
   nicht auf eigenständigen Text (Fragen, Antworten, Abläufe).
4. **Gestapelt kehrt sich „nur der aktive läuft“ um.** Unter 1100 px stehen
   alle Einträge gleichzeitig da; jede Logik der Art `i === active` muss dann
   `stacked || i === active` lauten, sonst bleiben alle bis auf einen leer
   oder gedimmt.
5. **Gestapelt blendet jeder Eintrag einzeln ein.** Seit dem 16.09.2026
   übernimmt `useScrollScene` unter 1100 px eine zweite Aufgabe: Ein Beobachter
   je Abschnitt setzt `data-sichtbar` an jedem Eintrag, sobald er ins Bild
   läuft; das Stylesheet hält ihn davor auf `opacity: 0.25`. Der Abschnitt
   bekommt dazu `data-stapel="an"` — und zwar vom Skript, nicht vom Server,
   damit ohne JavaScript nichts versteckt wird.

   Der Grund steht im [Designleitfaden § 8.2](seitendesign.md). Kurz: Ohne das
   war auf dem Telefon von der scrollgebundenen Bewegung dieser Website
   **nichts** übrig — die Bühne ist dort abgeschaltet, und alle Einträge
   standen sofort sichtbar da.

   Wer eine neue Bühne baut, bekommt das geschenkt, solange die Einträge `<li>`
   mit der Klasse `sceneItem` in einem `sceneSlot` sind. Wer eine eigene
   Stapel-Mechanik erfindet, muss den Fall selbst bedenken.

### 4.5 Aufklappbereich

Für Einträge, die man **nachschlägt** statt durchliest — häufige Fragen auf
einer Unterseite, lange Verweislisten. Gebaut wie in der Fußzeile
(`FooterRegions`) und auf `/kaltakquise/[stadt]`:

```tsx
<button aria-expanded={offen} aria-controls={id} onClick={…}>…</button>
<div id={id} className={`${styles.panel} ${offen ? styles.panelOpen : ''}`} inert={!offen}>
  <div className={styles.panelInner}>{/* Inhalt */}</div>
</div>
```

```css
.panel      { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .45s var(--ease); }
.panelOpen  { grid-template-rows: 1fr; }
.panelInner { overflow: hidden; min-height: 0; }
```

Drei Punkte, die daran hängen:

1. **`0fr → 1fr` statt `display: none` oder `height`.** Der Inhalt fährt auf
   seine tatsächliche Höhe, ohne dass sie gemessen werden muss — und er steht
   durchgehend im ausgelieferten HTML. Bei einem FAQ ist das die Bedingung
   dafür, dass das `FAQPage`-Markup den sichtbaren Text wiedergibt.
2. **`inert` im zugeklappten Zustand.** Ohne das tabbt man sich durch
   unsichtbare Schaltflächen und Verweise.
3. **Die Frage ist eine Überschrift.** `<h3><button …>` — die Schaltfläche
   steht *in* der Überschrift, nicht statt ihr, sonst fehlt der Abschnitt in
   der Gliederung. Dabei die Überschriftengröße zurücksetzen, sonst erbt die
   Schaltfläche sie über `font: inherit`.

**Steht in `seite/basis.module.css`**, Abschnitt „Aufklappen“ — eingebunden
über `composes`, wie alles andere aus der Grundlage. Die Klassen heißen dort
`faqList`, `faqItem`, `faqItemOpen`, `faqToggle`, `faqQ`, `faqIcon`,
`faqPanel`, `faqPanelOpen`, `faqPanelInner` und `faqAnswer`.

> Bis zum 15.09.2026 stand das Muster je Seite. Die Regel an dieser Stelle
> lautete „wer die dritte Umsetzung baut, zieht sie in die Grundlage“ — beim
> Umbau von `/leistungen/[stadt]` war es so weit. Die Fußzeile behält ihre
> eigene Fassung: Sie steht auf dunklem Grund und arbeitet mit den
> `--f-`-Token der Fußzeile, gemeinsam ist nur die Technik.

---

## 5 · Bewegung

### 5.1 Einblenden beim Scrollen

```tsx
const { ref, isIn } = useReveal<HTMLElement>()

<section ref={ref} className={styles.section}>
  <h2 className={`${styles.h2} ${styles.reveal} ${isIn ? styles.revealIn : ''}`}
      style={{ '--rd': '0.08s' } as React.CSSProperties}>
```

**Ein Beobachter je Abschnitt**, nicht einer je Element. Die Staffelung
innerhalb des Abschnitts macht `--rd` in CSS. Bei sechzig Elementen wären
sechzig Beobachter der Unterschied zwischen flüssig und ruckelig.

`useReveal` nimmt **kein Argument**. Der Auslöser hängt an
`rootMargin: '0px 0px 40% 0px'` — der Beobachtungsbereich reicht 40 % einer
Bildschirmhöhe unter die Bildkante, die Einblendung läuft also ab, während der
Abschnitt noch heranscrollt. Ein Sichtbarkeitsanteil (`threshold`) funktioniert
hier nicht: Bei Abschnitten von anderthalb Bildschirmhöhen sind 15 % mehrere
hundert Pixel Scrollweg.

**Verzögerungen** über `--rd` setzen, nie über eigene `transition-delay`. Der
Wert wird mit `--rd-scale` gestaucht; wer daran vorbeischreibt, hängt beim
nächsten Nachjustieren fest. Größenordnung: erstes Element `0.08s`, danach
`+0.1s` je Schritt, Obergrenze etwa `0.8s`.

**Messlatte:** Jede Überschrift steht bei Sichtkontakt auf ≥ 60 % Deckkraft.
Nachprüfbar, indem man in 600-px-Sprüngen scrollt und die Deckkraft beim ersten
Erscheinen abliest.

### 5.2 Scrollgebundene Szenen

Für Grafiken, die am Scrollstand hängen (Diagramm, Kalender, Gesprächsverlauf):

```tsx
useScrollScene(sectionRef, {
  measure: () => /* 0–1 aus getBoundingClientRect */,
  apply: (progress) => { /* nur ins DOM schreiben */ },
})
```

Drei Regeln, die nicht verhandelbar sind:

1. `measure` darf **messen, nicht schreiben** — sonst erzwingt jeder Frame ein
   zusätzliches Layout.
2. `apply` schreibt **direkt ins DOM**, nicht über `setState`. Ein `setState`
   je Frame rendert den Abschnitt sechzigmal pro Sekunde neu.
3. Diskrete Zustände (welcher Schritt ist aktiv) dürfen aus `apply` gesetzt
   werden — aber nur bei **echter Änderung**, mit `useRef` als Vergleich.

Die Schleife läuft nur, während der Abschnitt im Bild ist, und `prefers-reduced-motion`
setzt einmal den Endzustand. Beides erledigt der Haken.

### 5.3 Reduzierte Bewegung

Jede neue Animation gehört in den `@media (prefers-reduced-motion: reduce)`-Block
am Ende des Stylesheets. Global ist bereits abgeschaltet: `scroll-behavior` und
das Laufband.

**Klebe-Bühnen lösen sich dort auf.** `useScrollScene` setzt bei reduzierter
Bewegung einmal den Endzustand — auf einer Bühne heißt das: nur der letzte
Eintrag ist sichtbar. Der Block hebt deshalb `position: sticky` und die
absolute Lage der Einträge auf, sodass sie untereinander im Fluss stehen. Wer
eine neue Bühne baut, erbt das; wer eine neue Stapel-Mechanik erfindet, muss
denselben Fall selbst bedenken.

---

## 6 · Umbrüche

Eine Leiter, absteigend geprüft. Neue Seiten nutzen dieselben Stufen — ein
eigener Umbruchpunkt bei 900 px macht die Seite als Ganzes unvorhersehbar.

| Breite | Was passiert |
|---|---|
| `1280px` ⬆ | Fortschrittsleiste rechts erscheint |
| `1100px` | zweispaltige Abschnitte stapeln, Klebe-Mechanik entfällt |
| `860px` | Beweisleiste und Logos werden schmaler, mobile Buchungsleiste |
| `768px` | Kopfzeilenhöhe sinkt |
| `640px` | Karten einspaltig, Diagramme flacher |
| `520px` | Porträt quer, Überschrift kleiner |

`--edge` bricht abweichend bei `640px` und `1024px` — das sind die Stufen von
`.container-custom` und sie gehören zur Ausrichtung, nicht zum Layout.

**Prüfmaß:** kein waagerechter Überlauf bei 320, 375, 414, 768, 1024, 1280,
1920 px. `tests/responsive.spec.ts` prüft das über 26 Adressen.

---

## 7 · Fortschrittsleiste

`SectionRail` ist **nicht** startseitenspezifisch. Sinnvoll ab etwa sechs
Abschnitten **oder** zehn Bildschirmhöhen; darunter ist sie Dekoration.

> **Nachgeschärft beim Bau von `/leistungen`:** Die Regel stand zuerst nur auf
> der Abschnittszahl. Die Leistungsseite hat fünf Abschnitte und misst trotzdem
> knapp sechzehn Bildschirmhöhen, davon drei Klebe-Bühnen, die einander ähnlich
> sehen — genau die Lage, für die die Leiste gebaut wurde. Ausschlaggebend ist
> die Strecke, nicht die Zahl der Punkte.

Für eine neue Seite:

1. Liste anlegen nach dem Muster von `src/app/components/home/sections.ts` —
   `id` und **kurze** Beschriftung (max. ~12 Zeichen, sie steht in einer
   schmalen Leiste). Die Liste gehört zur Seite, nicht zur Leiste, und wird
   als Eigenschaft übergeben: `<SectionRail sections={MEINE_ABSCHNITTE} />`.
2. Dieselbe `id` am `<section>`-Element setzen.
3. Die Leiste überspringt still, was sie im Dokument nicht findet.

Was dabei schon gelöst ist und nicht neu bedacht werden muss: Sichtbarkeit erst
nach der ersten Bildschirmhöhe, Ausblenden unter 1280 px, `scaleX` statt
`width` für den Fortschritt, `setState` nur beim Abschnittswechsel,
`aria-current` am aktiven Verweis.

Sprungmarken funktionieren, weil `globals.css` ein `scroll-padding-top: 96px`
setzt. Ohne das landet jedes Ziel unter der festen Kopfzeile.

---

## 8 · Pflichten, die keine Gestaltungsfrage sind

Diese Punkte sind an der Startseite bereits entschieden. Sie gelten unverändert
für jede weitere Seite.

### 8.1 Recht

| Thema | Regel | Umsetzung |
|---|---|---|
| KI-Bilder | Kennzeichnung nach Art. 50 Abs. 4 KI-VO, sichtbar | `<AiGeneratedBadge />` + `AI_GENERATED_MEDIA_ATTRS` |
| YouTube | lädt **erst nach Einwilligung**, Vorschaubild vom eigenen Server | `<LiteYouTube id title />` |
| Fremdhosts | keine `remotePatterns` in `next.config.js` | Bilder liegen unter `/public` |
| Kennzahlen | **kein Firmenname neben einer erfundenen Zahl** | siehe unten |
| Preise | keine Beträge ohne Freigabe | `scripts/check-pricing.mjs` |

> **Zu den Kennzahlen:** Der Entwurf sah drei namentlich genannte Referenzen mit
> Platzhalter-KPIs vor („— Termine in — Wochen", „KPI folgt"). Ein Firmenname
> neben einer erfundenen Zahl ist eine irreführende geschäftliche Handlung
> (§ 5 UWG) — daran ist die frühere Fallstudienseite bereits gescheitert.
> Gesetzt sind deshalb die anonymisierten, veröffentlichten Ergebnisse. Sobald
> Zahlen **und schriftliche Freigaben** vorliegen, gehören sie in
> `src/lib/case-studies.ts` und von dort in die Seite.

### 8.2 Zugänglichkeit

- Jeder Abschnitt: `aria-labelledby` auf seine eigene Überschrift.
- Dekoratives: `aria-hidden="true"` — Ziffern in Marken, Trennpunkte, Linien.
- **Grafiken bekommen eine Beschreibung, keine Beschriftung.** Eine
  scrollgesteuerte Grafik ist für eine Vorlesehilfe unbrauchbar; sie bekommt
  `role="img"` und ein `aria-label`, das die **Aussage** wiedergibt:

  > „Diagramm über acht Monate: Ohne laufende Akquise brechen die Anfragen mit
  > einigen Monaten Verzögerung ein, bis die Pipeline leer ist."

  Der innere Aufbau steht dann auf `aria-hidden`.
- Aufklappbares bleibt im HTML. `grid-template-rows: 0fr → 1fr` statt
  `display: none` — der Inhalt ist verborgen, nicht abwesend, und bleibt für
  Suchmaschinen lesbar. Zugeklappt zusätzlich `inert`, sonst tabbt man durch
  unsichtbare Verweise.
- Tippziele mindestens 44 px hoch. `.textLink` bringt das mit.

### 8.3 Inhalt und strukturierte Daten

Texte, die **zugleich als JSON-LD** ausgeliefert werden, stehen in einem
Datenmodul — nicht zweimal im Code. Vorbild: `src/lib/home-content.ts` mit
`homeFaqs` und `homeProcessSteps`, verwendet von `FaqSection`, `ProcessSection`
und `generateHomepageFAQSchema()` / `generateHowToSchema()`.

Zwei Textstände zwischen sichtbarem Inhalt und Markup sind ein Verstoß, den man
der Seite nicht ansieht.

Vorhandene Schema-Erzeuger in `src/lib/schemas.ts`: `generateBreadcrumbSchema`,
`generateHowToSchema`, `generateBlogFAQSchema`, `generateServiceAreaSchema`
u. a. — **erst dort nachsehen**, bevor ein neuer geschrieben wird.

### 8.4 Bilder

```tsx
<Image src={…} alt="…" fill sizes="(max-width: 1100px) 640px, 30vw" placeholder="blur" />
```

`sizes` muss zum tatsächlichen Raster passen. **Keine `quality`-Angabe** — 75
ist der Standard, und ein abweichender Wert, der nicht in
`next.config.js → images.qualities` steht, lässt Next den Vorlade-Hinweis mit
einer anderen Qualität erzeugen als das Bild selbst. Ergebnis: Das
LCP-Bild wird zweimal geladen. Genau dieser Fehler steckte in der ersten
Fassung.

Beim Einstiegsbild zusätzlich `priority` und `fetchPriority="high"`.

---

## 9 · Bestehende Seiten umstellen

Nicht alles auf einmal. Reihenfolge nach Wirkung:

1. ~~**`/leistungen`**~~ — **umgestellt am 15.09.2026.** Fünf Abschnitte,
   drei davon als Bühne; Vorlage für alles Weitere. Die Preismodelle liegen
   weiterhin in `src/lib/pricing.ts`, die vier Leistungen neu in
   `src/lib/leistungen-content.ts` (zugleich Quelle des `Service`-Markups).
2. ~~**`/kaltakquise`**~~ und ~~**`/branchen`**~~ — **umgestellt am
   15.09.2026.** Beide fünf Abschnitte, zwei davon als Bühne; zusammen mit
   `/wissen` die drei Familien-Einstiege. `/branchen` hat nur zwei Kinder
   und verlagert das Gewicht deshalb auf die Bühne, die erklärt, worin sich
   die beiden Branchen unterscheiden, und auf die dunkle Karte, die sagt,
   warum es nicht zwanzig Branchenseiten sind.
3. **Stadt- und Branchenseiten** — aus je einer Vorlage, ein Umbau je
   Familie.
   - ~~**`/kaltakquise/[stadt]`**~~ — **umgestellt am 15.09.2026**, fünfzehn
     Seiten aus einer Vorlage. Sechs Abschnitte, zwei davon als Bühne; die
     Ortstexte weiterhin aus `src/lib/city-acquisition.ts`, die Fragen
     weiterhin aus `getKaltakquiseFAQs` in `src/lib/schemas.ts`.
   - ~~**`/leistungen/[stadt]`**~~ — **umgestellt am 15.09.2026**, fünfzehn
     Seiten aus einer Vorlage. Sechs Abschnitte, zwei davon als Bühne. Mit
     dem Umbau sind `StadtHero`, `StadtServices`, `StadtFAQ`,
     `RelatedCities` sowie `Process` und `WhyUs` entfallen — sie hatten
     keine Verwender mehr.
   - **`/branchen/[branche]`** — noch auf Tailwind, zwei Seiten.
4. ~~**`/wissen`**~~ — **umgestellt am 15.09.2026.** Sechs Abschnitte, zwei
   davon als Bühne; zweiter Familien-Einstieg nach `/kaltakquise`. Die
   Begriffe liegen dabei neu in `src/lib/glossar-content.ts` — sie standen
   als Feld in `src/app/glossar/page.tsx` und sind jetzt dreifach in
   Gebrauch (Glossarseite, `DefinedTermSet`, Kurzliste auf `/wissen`).
5. ~~**`/referenzen`**~~ — **umgestellt am 16.09.2026.** Fünf Abschnitte,
   keine Bühne, keine Leiste; der Zuschnitt „Aussageseite“ aus
   Designleitfaden § 9.1. Die `robots`-Kopplung in `layout.tsx` bleibt
   unverändert: Solange ein Blindmuster im Bestand steht, ist die Seite
   `noindex`.
6. ~~**`/ueber-uns`**~~ — **umgestellt am 16.09.2026.** Sechs Abschnitte,
   zwei davon als Bühne, rund vierzehn Bildschirmhöhen; der Zuschnitt
   „Vertrauensseite“ aus Designleitfaden § 9.1. Die Werteliste aus vier
   Symbolkarten ist dabei entfallen und durch vier Zusagen mit Gegenprobe
   ersetzt; die Angaben zu Sitz, Inhaber und Erreichbarkeit kommen jetzt aus
   `businessInfo` statt aus dem Fließtext.
7. ~~**`/kontakt`**~~ — **umgestellt am 16.09.2026.** Sechs Abschnitte, zwei
   davon als Bühne, rund vierzehn Bildschirmhöhen. **Damit ist der
   Seitenbestand umgestellt**, bis auf `/branchen/[branche]` (Punkt 3) sowie
   Blog und Glossar (Punkt 8).

   Das Formular ist neu eingekleidet, aber nicht neu gebaut: Feldnamen,
   `contactRequestSchema`, `CONTACT_CONSENT_TEXT`, Honigtopf, die Ereignisse
   der Reichweitenmessung und `/api/contact` samt Ratenbegrenzung und
   Einwilligungsprotokoll sind unverändert. Entfallen ist
   `src/components/sections/ContactForm.tsx` — es hatte danach keinen
   Verwender mehr und brachte eine zweite, handgeschriebene Prüfung mit, die
   die Regeln des Schemas noch einmal nachbildete.
8. **Blog und Glossar** zuletzt — dort trägt `Markdown.tsx` die Gestaltung, das
   ist ein eigener Schnitt.

Je Seite gilt: erst das Gerüst aus Abschnitt 4, dann Inhalte übernehmen, dann
Bewegung. **Keine Seite halb umstellen** — eine Seite mit `.container-custom`
oben und `--page-max` unten hat zwei verschiedene Kanten.

> **Wenn auf der Seite etwas funktioniert: die Grenze zwischen Kleid und
> Mechanik ziehen, bevor die erste Zeile fällt.** Auf `/kontakt` hängt ein
> Formular an einer Server-Route mit Schema, Ratenbegrenzung, Honigtopf und
> Einwilligungsnachweis. Getauscht wurde ausschließlich die Darstellung;
> Feldnamen, Schema, Endpunkt und Zählereignisse blieben, wie sie waren.
>
> **Nachgeprüft wird das mit abgefangenem Netzverkehr, nicht mit einer echten
> Absendung.** Der Aufruf an die Route wird im Test beantwortet, der Weg im
> Browser läuft damit vollständig — Prüfung, Feldnamen, JSON-Körper,
> Erfolgszustand, Zurücksetzen —, und es geht keine Mail an einen echten
> Empfänger. Die Route selbst prüft man daneben mit **ungültigen** Körpern:
> Sie scheitern am Schema und erreichen den Versand nie.
>
> Was dabei auffiel und sonst stehen geblieben wäre: Die alte Fassung hatte
> neben `contactRequestSchema` eine zweite, handgeschriebene `validateForm()`
> mit eigenem E-Mail-Muster. Zwei Prüfungen laufen auseinander, und die
> Client-Seite lockert dann stillschweigend, was der Server noch verlangt.

> **Beim Umbau einer Seitenfamilie: einmal alle Ausprägungen durchsehen.** Die
> Kaltakquise-Stadtseiten sahen in Köln und Düsseldorf vollständig aus und
> waren es in Frankfurt und Stuttgart nicht: `nearbyAreas` nennt dort drei
> Nachbarorte, die es als Seite nicht gibt, und die alte Vorlage filterte sie
> stillschweigend weg — zwei von fünfzehn Seiten ohne einen einzigen Verweis
> in die Umgebung. Eine Vorlage zeigt solche Lücken nicht, weil sie überall
> gleich aussieht; nur die Daten sind ungleich. Seitdem füllt
> `getNearbyCities` in `src/lib/cities.ts` auf drei auf.

---

## 10 · Abnahme

Ohne diese Punkte geht keine Seite live.

```bash
pnpm run typecheck
pnpm run lint
pnpm run check:all        # 9 Prüfungen, alle müssen „keine Beanstandungen" melden
pnpm run build
pnpm exec playwright test # Umbruchprüfung über 7 Breiten
```

> **Auf Windows:** `pnpm run build` scheitert mit einem Prisma-`EPERM`, solange
> ein Dev-Server läuft — das ist eine Dateisperre, kein Konfigurationsfehler.
> Erst alle `next dev` beenden. Kommt danach immer noch veralteter Inhalt an,
> ist der Turbopack-Cache schal: `rm -rf .next`.

Dazu von Hand oder per Skript:

| Prüfung | Maß |
|---|---|
| Kantenausrichtung | Logo, Eyebrow, H1, H2, Fußzeile bei 390–1920 px: **0 px Abweichung** |
| Einblendungen | jede Überschrift bei Sichtkontakt ≥ 60 % Deckkraft |
| Waagerechter Überlauf | `scrollWidth === innerWidth` bei allen sieben Breiten |
| Bühne gestapelt | unter 1100 px: Abschnittshöhe = Inhaltshöhe, kein Leerraum darunter |
| Bühne ohne Bewegung | bei `prefers-reduced-motion`: **jeder** Eintrag sichtbar, nicht nur der letzte |
| Restzeile der Überschriften | letzte Zeile ≥ 25 % der breitesten — messbar über die Zeilenkästen (`Range.getClientRects()`), nicht nach Gefühl |
| Konsole | keine Fehler — insbesondere keine Bild- oder Preload-Warnung |
| Einwilligung | vor Zustimmung kein Abruf an youtube.com, googletagmanager.com |

---

## 11 · Was bewusst anders ist als im Entwurf

Damit diese Punkte nicht als Fehler „korrigiert" werden:

| Entwurf | Umsetzung | Grund |
|---|---|---|
| Akzent `#2a4fd6` | `#1a56db` | der Entwurf nennt seinen Wert selbst eine Annahme; Kopfzeile und alle übrigen Seiten führen `#1a56db` |
| Schrift „Geist" | Inter | bereits geladen; eine zweite Schrift kostet Ladezeit ohne sichtbaren Gewinn |
| randlos, volle Breite | Box auf `1280px` | sonst reißen Inhalt und Navigation auf großen Fenstern auseinander |
| Kalenderwoche „KW 38" mit Datumszahlen | „Beispiel", ohne Daten | ein fixes Datum veraltet ab dem Tag nach dem Deployment |
| Referenzen mit Namen + Platzhalter-KPI | anonymisierte, belegte Ergebnisse | § 5 UWG, siehe 8.1 |
| `calendly.com` als `href` | `useCalendly()` | keine Drittdaten vor Einwilligung |
| drei Städte-Spalten in der Fußzeile | eine | `/neukundengewinnung/[stadt]` existiert nicht; Kaltakquise-Städte behalten ihre Verweise aus fünf anderen Vorlagen |
| Einblenden 1,1–2,2 s, Staffelung bis 1,7 s | 0,5 s, Staffelung × 0,45 | in der Entwurfsvorschau ruhig, beim echten Scrollen zu spät |
| Überschrift bis 74 px | bis 64 px | die Spalte ist seit der Begrenzung gedeckelt, die Schrift skalierte weiter mit `vw` |

---

## 12 · Kurzreferenz

| Was | Wo |
|---|---|
| Token und Bausteine | `src/app/components/seite/basis.module.css` |
| Einblenden | `src/app/components/seite/useReveal.ts` |
| Scrollgebundene Szenen | `src/app/components/seite/useScrollScene.ts` |
| Fortschrittsleiste | `src/app/components/seite/SectionRail.tsx` |
| Abschnittsliste der Startseite | `src/app/components/home/sections.ts` |
| Abschnitte der Startseite | `src/app/components/home/` |
| Buchung | `src/hooks/useCalendly.ts` |
| Texte mit Markup-Zweitverwendung | `src/lib/home-content.ts` |
| Strukturierte Daten | `src/lib/schemas.ts` |
| Satzbreite der übrigen Seiten | `.container-custom` in `src/app/globals.css` |
| Kopf- und Fußzeile | `src/components/layout/` |
| Umbruchprüfung | `tests/responsive.spec.ts` |
