# NanoBanana Pro 4K - Workflow Dokumentation

> Anleitung zur KI-Bildgenerierung mit Referenzbildern via nanobananaapi.ai

---

## Inhaltsverzeichnis

1. [Übersicht](#übersicht)
2. [Voraussetzungen](#voraussetzungen)
3. [Schritt 1: Referenzbilder hochladen](#schritt-1-referenzbilder-hochladen)
4. [Schritt 2: Bild generieren](#schritt-2-bild-generieren)
5. [Schritt 3: Status abfragen](#schritt-3-status-abfragen)
6. [Schritt 4: Bild herunterladen](#schritt-4-bild-herunterladen)
7. [Komplettes Beispiel](#komplettes-beispiel)
8. [Parameter-Referenz](#parameter-referenz)
9. [Kosten](#kosten)
10. [Troubleshooting](#troubleshooting)

---

## Übersicht

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Lokale Bilder  │────▶│   Catbox.moe    │────▶│  NanoBanana API │
│  (Referenzen)   │     │  (Image Host)   │     │  (Generation)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                              │                        │
                              ▼                        ▼
                         Public URLs            Task ID + Polling
                                                       │
                                                       ▼
                                               ┌─────────────────┐
                                               │  Fertiges Bild  │
                                               │     (4K URL)    │
                                               └─────────────────┘
```

---

## Voraussetzungen

| Was | Wo bekommst du es |
|-----|-------------------|
| NanoBanana API Key | https://nanobananaapi.ai/api-key |
| cURL | Vorinstalliert (Windows/Mac/Linux) |
| Referenzbilder | Lokal auf deinem Computer |

---

## Schritt 1: Referenzbilder hochladen

### Warum Catbox.moe?

- **Kostenlos** - Kein Account/API-Key nötig
- **Permanent** - Bilder bleiben online
- **Direkte URLs** - Sofort verwendbar
- **200 MB Limit** - Ausreichend für Bilder

### Upload-Befehl

```bash
curl -F "reqtype=fileupload" -F "fileToUpload=@/pfad/zum/bild.jpg" https://catbox.moe/user/api.php
```

### Beispiel

```bash
# Bild hochladen
curl -F "reqtype=fileupload" -F "fileToUpload=@C:/Fotos/mein_bild.jpg" https://catbox.moe/user/api.php

# Response (direkte URL):
https://files.catbox.moe/abc123.jpg
```

### Mehrere Bilder hochladen

```bash
# Referenz 1: Style/Atmosphäre
curl -F "reqtype=fileupload" -F "fileToUpload=@style_referenz.jpg" https://catbox.moe/user/api.php
# → https://files.catbox.moe/style123.jpg

# Referenz 2: Design/Print
curl -F "reqtype=fileupload" -F "fileToUpload=@design.png" https://catbox.moe/user/api.php
# → https://files.catbox.moe/design456.png

# Referenz 3: Produkt
curl -F "reqtype=fileupload" -F "fileToUpload=@produkt.jpg" https://catbox.moe/user/api.php
# → https://files.catbox.moe/produkt789.jpg
```

---

## Schritt 2: Bild generieren

### API-Endpoint

```
POST https://api.nanobananaapi.ai/api/v1/nanobanana/generate-pro
```

### Header

```
Authorization: Bearer DEIN_API_KEY
Content-Type: application/json
```

### Request Body

```json
{
  "prompt": "Deine Bildbeschreibung hier, photorealistic, 8k quality",
  "type": "IMAGETOIAMGE",
  "imageUrls": [
    "https://files.catbox.moe/bild1.jpg",
    "https://files.catbox.moe/bild2.png"
  ],
  "numImages": 1,
  "resolution": "4K",
  "aspect_ratio": "16:9"
}
```

### cURL-Befehl

```bash
curl -X POST "https://api.nanobananaapi.ai/api/v1/nanobanana/generate-pro" \
  -H "Authorization: Bearer DEIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Deine Bildbeschreibung hier, photorealistic, 8k quality",
    "type": "IMAGETOIAMGE",
    "imageUrls": [
      "https://files.catbox.moe/bild1.jpg",
      "https://files.catbox.moe/bild2.png"
    ],
    "numImages": 1,
    "resolution": "4K",
    "aspect_ratio": "16:9"
  }'
```

### Response

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "taskId": "abc123def456..."
  }
}
```

**Wichtig:** Speichere die `taskId` - du brauchst sie für den nächsten Schritt!

---

## Schritt 3: Status abfragen

### API-Endpoint

```
GET https://api.nanobananaapi.ai/api/v1/nanobanana/record-info?taskId=DEINE_TASK_ID
```

### cURL-Befehl

```bash
curl -X GET "https://api.nanobananaapi.ai/api/v1/nanobanana/record-info?taskId=abc123def456" \
  -H "Authorization: Bearer DEIN_API_KEY"
```

### Status-Codes

| successFlag | Bedeutung |
|-------------|-----------|
| `0` | GENERATING - Noch am Arbeiten |
| `1` | SUCCESS - Fertig! |
| `2` | CREATE_TASK_FAILED - Task konnte nicht erstellt werden |
| `3` | GENERATE_FAILED - Generierung fehlgeschlagen |

### Response bei Erfolg (successFlag: 1)

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "taskId": "abc123def456",
    "successFlag": 1,
    "completeTime": "2026-02-02 17:11:25",
    "response": {
      "resultImageUrl": "https://tempfile.aiquickdraw.com/vnp/abc123_1770023459.jpeg"
    }
  }
}
```

### Polling-Strategie

```bash
# Alle 30 Sekunden prüfen bis successFlag != 0
while true; do
  result=$(curl -s -X GET "https://api.nanobananaapi.ai/api/v1/nanobanana/record-info?taskId=TASK_ID" \
    -H "Authorization: Bearer API_KEY")

  flag=$(echo $result | grep -o '"successFlag":[0-9]' | cut -d: -f2)

  if [ "$flag" != "0" ]; then
    echo "$result"
    break
  fi

  echo "Generiere... (warte 30s)"
  sleep 30
done
```

---

## Schritt 4: Bild herunterladen

```bash
# URL aus Response extrahieren und herunterladen
curl -o mein_generiertes_bild.jpeg "https://tempfile.aiquickdraw.com/vnp/abc123_1770023459.jpeg"
```

**Hinweis:** Die temporäre URL ist nur begrenzt gültig. Lade das Bild zeitnah herunter!

---

## Komplettes Beispiel

### Szenario: Streetwear-Kampagnenbild erstellen

```bash
# ═══════════════════════════════════════════════════════════════
# SCHRITT 1: Referenzbilder hochladen
# ═══════════════════════════════════════════════════════════════

# Style-Referenz (Atmosphäre/Pose)
curl -F "reqtype=fileupload" -F "fileToUpload=@editorial_shot.jpg" https://catbox.moe/user/api.php
# → https://files.catbox.moe/vqzknl.jpg

# Design/Print
curl -F "reqtype=fileupload" -F "fileToUpload=@print_design.png" https://catbox.moe/user/api.php
# → https://files.catbox.moe/pt2jcr.png

# Produkt (Kleidungsstück)
curl -F "reqtype=fileupload" -F "fileToUpload=@sweatshirt.avif" https://catbox.moe/user/api.php
# → https://files.catbox.moe/4nfs81.avif

# ═══════════════════════════════════════════════════════════════
# SCHRITT 2: Pro 4K Bild generieren
# ═══════════════════════════════════════════════════════════════

curl -X POST "https://api.nanobananaapi.ai/api/v1/nanobanana/generate-pro" \
  -H "Authorization: Bearer 3159ba2416bb1a852e7b96bc11c1b7e6" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a streetwear editorial photo combining these references: Use the style and atmosphere from the first image (man in elevator with snow, moody lighting, urban winter vibe). Put the GLACADE ELEVATION mountaineer print design from the second image onto the black fleece-lined sweatshirt from the third image. The model should wear the black sweatshirt with the summit print on the chest, standing in an industrial elevator with snow on the floor, cold blue-grey cinematic lighting, silver chain necklace, dark sunglasses, confident pose, high fashion streetwear campaign, photorealistic, 8k quality",
    "type": "IMAGETOIAMGE",
    "imageUrls": [
      "https://files.catbox.moe/vqzknl.jpg",
      "https://files.catbox.moe/pt2jcr.png",
      "https://files.catbox.moe/4nfs81.avif"
    ],
    "numImages": 1,
    "resolution": "4K",
    "aspect_ratio": "16:9"
  }'

# Response: {"code":200,"msg":"success","data":{"taskId":"4c92eb44739ff8a1bbc16d71498140f3"}}

# ═══════════════════════════════════════════════════════════════
# SCHRITT 3: Status prüfen (nach ~2-3 Minuten)
# ═══════════════════════════════════════════════════════════════

curl -X GET "https://api.nanobananaapi.ai/api/v1/nanobanana/record-info?taskId=4c92eb44739ff8a1bbc16d71498140f3" \
  -H "Authorization: Bearer 3159ba2416bb1a852e7b96bc11c1b7e6"

# Response enthält: "resultImageUrl": "https://tempfile.aiquickdraw.com/vnp/4c92eb44739ff8a1bbc16d71498140f3_1770023459.jpeg"

# ═══════════════════════════════════════════════════════════════
# SCHRITT 4: Bild herunterladen
# ═══════════════════════════════════════════════════════════════

curl -o glacade_editorial_4k.jpeg "https://tempfile.aiquickdraw.com/vnp/4c92eb44739ff8a1bbc16d71498140f3_1770023459.jpeg"

echo "Fertig! Bild gespeichert als glacade_editorial_4k.jpeg"
```

---

## Parameter-Referenz

### Generate-Pro Endpoint

| Parameter | Typ | Pflicht | Beschreibung |
|-----------|-----|---------|--------------|
| `prompt` | string | Ja | Bildbeschreibung |
| `type` | string | Ja | `TEXTTOIAMGE` oder `IMAGETOIAMGE` |
| `imageUrls` | array | Bei IMAGETOIAMGE | URLs der Referenzbilder (max. 8) |
| `numImages` | int | Nein | Anzahl Bilder (1-4, default: 1) |
| `resolution` | string | Ja | `1K`, `2K`, oder `4K` (max) |
| `aspect_ratio` | string | Nein | Seitenverhältnis (empfohlen: `16:9`) |

> **Hinweis zu 8K:** Die API unterstützt maximal 4K als `resolution`. Für beste Qualität nutze `"resolution": "4K"` kombiniert mit `"8k quality"` im Prompt-Text. Das Keyword im Prompt optimiert die Bilddetails zusätzlich.
| `callBackUrl` | string | Nein | Webhook für Benachrichtigung |

### Aspect Ratios

| Wert | Verwendung |
|------|------------|
| **`16:9`** | **Landscape (YouTube, Desktop) - EMPFOHLEN** |
| `9:16` | Portrait/Story (TikTok, Reels) |
| `1:1` | Quadratisch (Instagram) |
| `4:3` | Klassisch |
| `3:2` | Fotografie |
| `21:9` | Ultrawide |

### Type-Werte

| Wert | Beschreibung |
|------|--------------|
| `TEXTTOIAMGE` | Nur aus Text generieren |
| `IMAGETOIAMGE` | Mit Referenzbildern generieren |

**Hinweis:** Die Schreibweise `IAMGE` (nicht `IMAGE`) ist korrekt - das ist ein Typo in der API!

---

## Empfohlene Einstellungen (Best Practice)

```json
{
  "resolution": "4K",
  "aspect_ratio": "16:9",
  "prompt": "... photorealistic, 8k quality, professional photography"
}
```

| Einstellung | Empfohlener Wert | Warum |
|-------------|------------------|-------|
| `resolution` | `4K` | Maximale Auflösung der API |
| `aspect_ratio` | `16:9` | Standard für Desktop/Web/Marketing |
| Prompt-Ende | `8k quality` | Optimiert Bilddetails |

---

## Kosten

| Version | Auflösung | Preis/Bild | Verwendung |
|---------|-----------|------------|------------|
| Standard | ~1K | ~$0.008 | Prototyping, Tests |
| Pro | 1K | ~$0.03 | Gute Qualität |
| Pro | 2K | ~$0.05 | Marketing, Web |
| Pro | 4K | ~$0.10 | Print, Poster, Kampagnen |

---

## Troubleshooting

### "API key required"

**Problem:** Authorization Header fehlt oder falsch

**Lösung:**
```bash
# Richtig:
-H "Authorization: Bearer DEIN_API_KEY"

# Falsch:
-H "Api-Key: DEIN_API_KEY"
-H "Authorization: DEIN_API_KEY"
```

### "Resolution must not be blank"

**Problem:** Bei Pro-Endpoint ist `resolution` Pflicht

**Lösung:** `resolution` Parameter hinzufügen: `"resolution": "4K"`

### successFlag bleibt auf 0

**Problem:** Generierung dauert lange

**Lösung:**
- Standard: ~1-2 Minuten
- Pro 2K: ~2-3 Minuten
- Pro 4K: ~3-5 Minuten

Einfach weiter pollen!

### "Invalid image URL"

**Problem:** Catbox-URL nicht erreichbar

**Lösung:**
- URL im Browser testen
- Dateiendung prüfen (.jpg, .png, .avif)
- Neu hochladen falls nötig

---

## Tipps für beste Ergebnisse

### Prompt-Struktur

```
[Hauptmotiv] + [Referenz-Anweisungen] + [Style] + [Qualität]
```

**Beispiel:**
```
"Create a streetwear editorial photo combining these references:
Use the style and atmosphere from the first image (describe it).
Apply the design from the second image onto the product from the third image.
[Gewünschte Details: Pose, Beleuchtung, Umgebung]
photorealistic, 8k quality, professional photography"
```

### Referenzbild-Reihenfolge

1. **Erstes Bild:** Style/Atmosphäre/Pose
2. **Zweites Bild:** Design/Grafik/Print
3. **Drittes Bild:** Produkt/Basis

### Qualitäts-Keywords

- `photorealistic`
- `8k quality`
- `professional photography`
- `high fashion`
- `editorial`
- `cinematic lighting`

---

*Dokumentation erstellt: Feb-02-2026*
*Getestet mit NanoBanana Pro API v1*
