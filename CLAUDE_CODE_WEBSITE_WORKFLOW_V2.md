# 🚀 Claude Code Website Workflow - Master Instructions V2

> **Version:** 2.0.0  
> **Ziel:** Vollautomatisierte Erstellung produktionsreifer, DSGVO-konformer Websites  
> **Parallelität:** Optimiert für 3+ simultane Projekte  
> **Compliance:** DSGVO / GDPR / ePrivacy Ready

---

## 📋 PROJEKTÜBERSICHT

Du bist ein Senior Full-Stack Developer, DevOps Engineer und Compliance-Experte. Deine Aufgabe ist die vollautomatisierte Erstellung einer produktionsreifen, DSGVO-konformen Website nach Enterprise-Standards mit Edge-Deployment.

### Kernziele
| Bereich | Ziel |
|---------|------|
| **Performance** | PageSpeed Score ≥ 95 (Desktop & Mobile) |
| **Testabdeckung** | ≥ 85% Coverage mit Playwright |
| **Responsiveness** | Pixel-perfekt auf Desktop, Tablet, Mobile |
| **SEO** | Vollständiges Audit mit Score ≥ 90 |
| **Accessibility** | WCAG 2.1 AA Compliance |
| **DSGVO** | Vollständige Compliance mit Cookie Consent |
| **Edge** | Edge Runtime für minimale Latenz |

---

## 🛠️ TECH STACK (MANDATORY)

### Core Framework
```
- Next.js 15.x (App Router, Turbopack, Edge Runtime)
- React 19.x
- TypeScript 5.7+
- Tailwind CSS 4.x
```

### Vollständige Package-Liste
```bash
# Core
npm install next@latest react@latest react-dom@latest

# UI & Animation
npm install framer-motion @radix-ui/react-slot @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu @radix-ui/react-tabs @radix-ui/react-accordion \
  @radix-ui/react-tooltip @radix-ui/react-popover @radix-ui/react-switch \
  @radix-ui/react-checkbox @radix-ui/react-navigation-menu \
  lucide-react class-variance-authority tailwind-merge clsx

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers

# SEO & Analytics
npm install next-seo @vercel/analytics @vercel/speed-insights

# DSGVO & Cookie Consent
npm install cookies-next js-cookie

# Edge & Server
npm install @vercel/edge server-only

# Campaign & Marketing
npm install resend @react-email/components

# Dev Dependencies
npm install -D typescript @types/react @types/node \
  @playwright/test vitest @vitejs/plugin-react \
  @testing-library/react @testing-library/jest-dom @vitest/coverage-v8 \
  @axe-core/playwright \
  eslint eslint-config-next prettier prettier-plugin-tailwindcss \
  husky lint-staged
```

---

## 🔐 UMGEBUNGSVARIABLEN

```env
# ══════════════════════════════════════════════════════════════
# DEPLOYMENT
# ══════════════════════════════════════════════════════════════
GITHUB_TOKEN=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
VERCEL_TOKEN=TexLoDHoBrhOrJX2nmVWwRMT
VERCEL_ORG_ID=$VERCEL_ORG_ID
VERCEL_PROJECT_ID=$VERCEL_PROJECT_ID

# ══════════════════════════════════════════════════════════════
# ANALYTICS & TRACKING
# ══════════════════════════════════════════════════════════════
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXX
PAGESPEED_API_KEY=AIzaSyBO7ERPbQt9uQ2BF1Y-W_gM3kh0vNuI5ng

# ══════════════════════════════════════════════════════════════
# DSGVO / LEGAL
# ══════════════════════════════════════════════════════════════
NEXT_PUBLIC_COMPANY_NAME="Firma GmbH"
NEXT_PUBLIC_COMPANY_ADDRESS="Musterstraße 1, 12345 Musterstadt"
NEXT_PUBLIC_COMPANY_EMAIL="info@example.com"
NEXT_PUBLIC_COMPANY_PHONE="+49 123 456789"
NEXT_PUBLIC_COMPANY_REGISTER="HRB 12345, Amtsgericht Musterstadt"
NEXT_PUBLIC_COMPANY_VAT_ID="DE123456789"
NEXT_PUBLIC_COMPANY_CEO="Max Mustermann"
NEXT_PUBLIC_PRIVACY_EMAIL="datenschutz@example.com"

# ══════════════════════════════════════════════════════════════
# CAMPAIGN & EMAIL
# ══════════════════════════════════════════════════════════════
RESEND_API_KEY=re_MMUAvEgE_5nziSL8QFn6VdjfDCDwCvsaJ
NEXT_PUBLIC_SITE_URL=https://example.com

# ══════════════════════════════════════════════════════════════
# EDGE CONFIG (Optional)
# ══════════════════════════════════════════════════════════════
EDGE_CONFIG=$EDGE_CONFIG

# ══════════════════════════════════════════════════════════════
# CREATIVES
# ══════════════════════════════════════════════════════════════
NanoBananaAPI.ai API Key: 3159ba2416bb1a852e7b96bc11c1b7e6

```

---

## 📁 ERWEITERTE PROJEKTSTRUKTUR

```
project-root/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── deploy.yml
│       ├── lighthouse.yml
│       └── campaign-report.yml      # Kampagnen-Auswertung
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root Layout (Edge-Ready)
│   │   ├── page.tsx                 # Homepage
│   │   ├── globals.css
│   │   ├── robots.ts                # Dynamic robots.txt
│   │   ├── sitemap.ts               # Dynamic sitemap
│   │   │
│   │   ├── (legal)/                 # DSGVO Legal Pages
│   │   │   ├── impressum/
│   │   │   │   └── page.tsx
│   │   │   ├── datenschutz/
│   │   │   │   └── page.tsx
│   │   │   └── agb/
│   │   │       └── page.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── consent/
│   │   │   │   └── route.ts         # Cookie Consent API
│   │   │   ├── analytics/
│   │   │   │   └── route.ts         # Custom Analytics
│   │   │   ├── campaign/
│   │   │   │   ├── create/
│   │   │   │   │   └── route.ts     # Campaign Creation
│   │   │   │   ├── track/
│   │   │   │   │   └── route.ts     # Event Tracking
│   │   │   │   └── report/
│   │   │   │       └── route.ts     # Campaign Reports
│   │   │   └── contact/
│   │   │       └── route.ts         # Contact Form
│   │   │
│   │   └── [dynamic]/
│   │
│   ├── components/
│   │   ├── ui/                      # Atomic UI Components
│   │   ├── sections/                # Page Sections
│   │   ├── layouts/                 # Layout Components
│   │   ├── legal/                   # Legal Components
│   │   │   ├── cookie-banner.tsx
│   │   │   ├── cookie-settings.tsx
│   │   │   └── consent-manager.tsx
│   │   ├── analytics/               # Analytics Components
│   │   │   ├── scripts.tsx
│   │   │   ├── consent-gate.tsx
│   │   │   └── tracking-provider.tsx
│   │   └── campaign/                # Campaign Components
│   │       ├── utm-tracker.tsx
│   │       ├── conversion-pixel.tsx
│   │       └── ab-test-wrapper.tsx
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── analytics.ts
│   │   ├── seo.ts
│   │   ├── consent.ts               # Consent Management
│   │   ├── edge.ts                  # Edge Utilities
│   │   └── campaign/
│   │       ├── types.ts
│   │       ├── tracker.ts
│   │       ├── report.ts
│   │       └── automation.ts
│   │
│   ├── hooks/
│   │   ├── use-consent.ts
│   │   ├── use-analytics.ts
│   │   └── use-campaign.ts
│   │
│   ├── config/
│   │   ├── legal.ts                 # Legal Config
│   │   ├── cookies.ts               # Cookie Definitions
│   │   └── campaigns.ts             # Campaign Config
│   │
│   ├── middleware.ts                # Edge Middleware
│   │
│   └── types/
│       ├── consent.ts
│       └── campaign.ts
│
├── emails/                          # React Email Templates
│   ├── campaign-report.tsx
│   └── contact-confirmation.tsx
│
├── tests/
│   ├── e2e/
│   │   ├── homepage.spec.ts
│   │   ├── legal-pages.spec.ts      # DSGVO Tests
│   │   ├── cookie-consent.spec.ts
│   │   └── campaign-tracking.spec.ts
│   └── unit/
│
├── scripts/
│   ├── pagespeed-check.ts
│   ├── campaign-report.ts
│   └── generate-legal.ts
│
├── public/
│   ├── fonts/
│   └── images/
│
├── docs ci
      
      - run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: ${{ vars.SITE_URL }}
          NEXT_PUBLIC_GA_MEASUREMENT_ID: ${{ vars.GA_MEASUREMENT_ID }}
          NEXT_PUBLIC_META_PIXEL_ID: ${{ vars.META_PIXEL_ID }}
      
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

---

## 📋 AUSFÜHRUNGSREIHENFOLGE

Führe die Phasen in dieser exakten Reihenfolge aus:

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 1: SETUP & DESIGN                      │
├─────────────────────────────────────────────────────────────────┤
│ 1.1 Projekt initialisieren (create-next-app)                    │
│ 1.2 Dependencies installieren                                   │
│ 1.3 Design System erstellen (Pencil.dev / Tailwind)             │
│ 1.4 Umgebungsvariablen konfigurieren                           │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   PHASE 2: CORE DEVELOPMENT                     │
├─────────────────────────────────────────────────────────────────┤
│ 2.1 Root Layout mit SSR/Edge Setup                              │
│ 2.2 UI Components erstellen (Button, Input, Card, etc.)         │
│ 2.3 Page Sections entwickeln (Hero, Features, CTA, etc.)        │
│ 2.4 Responsive Design implementieren                            │
│ 2.5 Animationen hinzufügen (Framer Motion)                     │
│ 2.6 Middleware konfigurieren (UTM, Geo, Headers)               │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 3: DSGVO & LEGAL                       │
├─────────────────────────────────────────────────────────────────┤
│ 3.1 Cookie Banner implementieren                                │
│ 3.2 Cookie Settings Modal erstellen                             │
│ 3.3 Consent Management Hook entwickeln                          │
│ 3.4 Impressum Page erstellen                                    │
│ 3.5 Datenschutz Page erstellen                                  │
│ 3.6 AGB Page erstellen (optional)                               │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                 PHASE 4: ANALYTICS & TRACKING                   │
├─────────────────────────────────────────────────────────────────┤
│ 4.1 Analytics Provider (Consent-basiert)                        │
│ 4.2 Google Analytics Integration                                │
│ 4.3 Meta Pixel Integration                                      │
│ 4.4 UTM Parameter Tracking                                      │
│ 4.5 Custom Event Tracking                                       │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              PHASE 5: CREATIVE GENERATION (Optional)            │
├─────────────────────────────────────────────────────────────────┤
│ 5.1 NanoBanana API Client implementieren                        │
│ 5.2 Creative Generation API Routes                              │
│ 5.3 Batch Generation Script                                     │
│ 5.4 Hero/Banner Images generieren                               │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              PHASE 6: CAMPAIGN AUTOMATION (Optional)            │
├─────────────────────────────────────────────────────────────────┤
│ 6.1 Campaign Tracker implementieren                             │
│ 6.2 Campaign API Routes                                         │
│ 6.3 Report Generator                                            │
│ 6.4 Email Templates (React Email)                               │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      PHASE 7: TESTING                           │
├─────────────────────────────────────────────────────────────────┤
│ 7.1 Unit Tests schreiben (Vitest)                               │
│ 7.2 E2E Tests erstellen (Playwright)                            │
│ 7.3 Accessibility Tests (axe-core)                              │
│ 7.4 DSGVO Compliance Tests                                      │
│ 7.5 Responsive Tests (Mobile/Tablet/Desktop)                    │
│ 7.6 Coverage Report generieren (≥85%)                           │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                 PHASE 8: SEO & PERFORMANCE                      │
├─────────────────────────────────────────────────────────────────┤
│ 8.1 Dynamic Sitemap erstellen                                   │
│ 8.2 Dynamic Robots.txt                                          │
│ 8.3 Structured Data (JSON-LD)                                   │
│ 8.4 PageSpeed Insights Audit (≥95 Desktop, ≥90 Mobile)         │
│ 8.5 Core Web Vitals optimieren                                  │
│ 8.6 Image Optimization                                          │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     PHASE 9: DEPLOYMENT                         │
├─────────────────────────────────────────────────────────────────┤
│ 9.1 GitHub Repository erstellen                                 │
│ 9.2 GitHub Secrets konfigurieren                                │
│ 9.3 CI/CD Pipeline aktivieren                                   │
│ 9.4 Vercel Projekt verbinden                                    │
│ 9.5 Domain konfigurieren                                        │
│ 9.6 Production Deployment                                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📝 PROJEKT-SPEZIFISCHE VARIABLEN

Ersetze diese Platzhalter für jedes neue Projekt:

```bash
# ══════════════════════════════════════════════════════════════
# PROJEKT KONFIGURATION
# ══════════════════════════════════════════════════════════════

$PROJECT_NAME           = "projekt-name"
$DOMAIN                 = "example.com"
$SITE_NAME              = "Site Name"
$SITE_DESCRIPTION       = "Kurze Beschreibung der Website"

# ══════════════════════════════════════════════════════════════
# BRANDING
# ══════════════════════════════════════════════════════════════

$PRIMARY_COLOR          = "#0ea5e9"
$SECONDARY_COLOR        = "#d946ef"
$FONT_FAMILY            = "Inter"

# ══════════════════════════════════════════════════════════════
# LEGAL / IMPRESSUM
# ══════════════════════════════════════════════════════════════

$COMPANY_NAME           = "Firma GmbH"
$COMPANY_ADDRESS        = "Musterstraße 1, 12345 Musterstadt"
$COMPANY_EMAIL          = "info@example.com"
$COMPANY_PHONE          = "+49 123 456789"
$COMPANY_REGISTER       = "HRB 12345, Amtsgericht Musterstadt"
$COMPANY_VAT_ID         = "DE123456789"
$COMPANY_CEO            = "Max Mustermann"

# ══════════════════════════════════════════════════════════════
# ANALYTICS (Umgebungsvariablen)
# ══════════════════════════════════════════════════════════════

$GA_MEASUREMENT_ID      = "G-XXXXXXXXXX"
$META_PIXEL_ID          = "XXXXXXXXXX"
```

---

## ⚠️ SICHERHEITSHINWEISE

> **KRITISCH:** Diese Regeln MÜSSEN befolgt werden!

1. **NIEMALS API Keys im Code** → Immer `.env.local` verwenden
2. **DSGVO:** Tracking NUR nach Consent laden
3. **Testing:** Mindestens 85% Coverage vor Deployment
4. **Security Headers:** HTTPS, CSP, X-Frame-Options

---

## 🔄 SCHNELLSTART FÜR PARALLELE PROJEKTE

```bash
# Für jedes Projekt in separatem Terminal:
PROJECT="projekt-name" && \
npx create-next-app@latest $PROJECT \
  --typescript --tailwind --eslint \
  --app --src-dir --turbopack && \
cd $PROJECT && code .
```

---

**Version:** 2.0.0  
**Features:** DSGVO, Edge Runtime, NanoBanana Creatives, Campaign Automation  
**Test Coverage:** ≥85% | **PageSpeed:** ≥95 Desktop, ≥90 Mobile
