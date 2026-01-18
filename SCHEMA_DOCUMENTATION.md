# Schema.org Structured Data Documentation

Diese Dokumentation listet alle Schema.org Markups auf der Website carpantier-consulting.de auf.

## Validierung

Alle Schemas können mit folgenden Tools validiert werden:
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema.org Validator**: https://validator.schema.org/
- **JSON-LD Playground**: https://json-ld.org/playground/

## Schema-Übersicht nach Seite

### Homepage (/)

| Schema | Typ | Zweck |
|--------|-----|-------|
| LocalBusiness | Organization | Unternehmensdaten, NAP, Öffnungszeiten |
| WebSite | Website | Website-Informationen |
| Service | Service | Angebotene Dienstleistungen |
| AggregateRating | Rating | Durchschnittsbewertung |
| Review (3x) | Review | Kundenbewertungen |
| HowTo | HowTo | 3-Schritte-Prozess |
| FAQPage | FAQ | 6 häufige Fragen |
| ServiceArea | Service | 15 Städte Servicegebiet |

### Stadt-Seiten (/leistungen/[stadt])

| Schema | Typ | Zweck |
|--------|-----|-------|
| LocalBusiness | Organization | Stadt-spezifische Daten |
| FAQPage | FAQ | 6 stadt-spezifische FAQs |
| BreadcrumbList | Navigation | Breadcrumb-Navigation |
| Service | Service | Stadt-spezifischer Service |

### Blog-Übersicht (/blog)

Keine zusätzlichen Schemas (erbt von Layout)

### Blog-Artikel (/blog/[slug])

| Schema | Typ | Zweck |
|--------|-----|-------|
| Article | Article | Artikel-Metadaten |
| BreadcrumbList | Navigation | Breadcrumb-Navigation |

### Glossar (/glossar)

| Schema | Typ | Zweck |
|--------|-----|-------|
| DefinedTermSet | DefinedTermSet | Glossar-Begriffe |
| DefinedTerm (15x) | DefinedTerm | Einzelne Begriffe |

### Case Studies (/case-studies)

Keine zusätzlichen Schemas (Standard-Seite)

## Schema-Details

### LocalBusiness Schema (Haupt)

```json
{
  "@type": "LocalBusiness",
  "name": "Carpantier Consulting",
  "description": "Professionelle B2B Telefonakquise & Leadgenerierung...",
  "url": "https://carpantier-consulting.de",
  "telephone": "+4915738186221",
  "email": "nico@carpantier-consulting.de",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Stammheimer Straße 123",
    "addressLocality": "Köln",
    "postalCode": "50935",
    "addressRegion": "Nordrhein-Westfalen",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.9375,
    "longitude": 6.9603
  },
  "openingHoursSpecification": {
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "priceRange": "€€€",
  "aggregateRating": {
    "ratingValue": "5",
    "reviewCount": "12"
  }
}
```

### HowTo Schema

```json
{
  "@type": "HowTo",
  "name": "B2B Vertrieb auslagern - Das 3-Schritte-System",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Strategie-Blueprint",
      "text": "Messerscharfe Analyse von Angebot und Zielgruppe..."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Akquise-Übernahme",
      "text": "Wir führen die Gespräche, als wären wir Teil Ihres Teams..."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Verkaufsgespräche führen",
      "text": "Sie erhalten qualifizierte Termine direkt in Ihren Kalender..."
    }
  ]
}
```

### FAQPage Schema

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was passiert im Erstgespräch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Im Erstgespräch analysieren wir Ihre aktuelle Situation..."
      }
    }
    // ... 5 weitere Fragen
  ]
}
```

## Rich Results Erwartungen

| Schema | Erwartetes Rich Result |
|--------|----------------------|
| LocalBusiness | Knowledge Panel, Maps Integration |
| FAQPage | FAQ Accordion in SERPs |
| HowTo | How-to Carousel |
| Article | Article Card mit Datum/Autor |
| BreadcrumbList | Breadcrumb-Pfad in SERPs |
| AggregateRating | Sterne-Bewertung |
| DefinedTermSet | Definition Snippets |

## Validierungs-Checkliste

- [ ] Homepage mit Rich Results Test prüfen
- [ ] Stadt-Seite (z.B. /leistungen/koeln) prüfen
- [ ] Blog-Artikel prüfen
- [ ] Glossar prüfen
- [ ] Mobile Usability Test durchführen
- [ ] Core Web Vitals prüfen

## Dateien mit Schema-Definitionen

- `src/app/layout.tsx` - Haupt-Schemas (LocalBusiness, WebSite, Service)
- `src/lib/schemas.ts` - Schema-Generator-Funktionen
- `src/app/page.tsx` - Homepage-spezifische Schemas
- `src/app/glossar/page.tsx` - DefinedTermSet Schema
- `src/app/blog/[slug]/page.tsx` - Article Schema
- `src/app/leistungen/[stadt]/page.tsx` - Stadt-spezifische Schemas

## Bekannte Einschränkungen

1. **AggregateRating**: Muss mit echten Bewertungen aktualisiert werden
2. **Review**: Aktuell 3 Beispiel-Reviews - echte Kundenbewertungen hinzufügen
3. **openingHours**: Feiertage nicht berücksichtigt
