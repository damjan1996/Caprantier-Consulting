/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Experimental: Optimize package imports for smaller bundles
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Standalone output nur für Docker-Deployment (nicht für Vercel)
  // Bei Hetzner-Migration: output: 'standalone' wieder aktivieren
  ...(process.env.STANDALONE === 'true' && { output: 'standalone' }),

  // Image Optimization
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 Tage Cache
    // Bewusst keine remotePatterns: alle Bilder liegen unter /public und werden
    // vom eigenen Server ausgeliefert. Ein freigegebener Fremdhost würde die
    // IP-Adresse der Besucher ohne Einwilligung an Dritte übertragen.
  },

  // Performance & Security Headers
  poweredByHeader: false,
  compress: true,

  // Compiler Optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Custom Headers für SEO & Security
  async headers() {
    // Content Security Policy.
    //
    // Die Liste ist bewusst eng: Jeder hier erlaubte Fremdhost ist ein Ziel, an
    // das der Browser die IP-Adresse der Besucher senden darf. Hosts, die erst
    // nach einer Einwilligung geladen werden (Analytics, Calendly), müssen
    // trotzdem gelistet sein — die CSP erlaubt sie, geladen werden sie aber
    // ausschließlich durch TrackingScripts bzw. durch Öffnen des Buchungsfensters.
    //
    // Nicht gelistet und auch nicht nötig:
    // - fonts.googleapis.com / fonts.gstatic.com: next/font liefert Inter beim
    //   Build lokal aus, zur Laufzeit geht kein Request an Google (§ 25 TDDDG).
    // - api.anthropic.com: der Chat läuft serverseitig über /api/chat.
    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com https://www.googletagmanager.com https://www.google-analytics.com https://t.contentsquare.net https://sibautomation.com",
      "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
      // Kein pauschales `https:`/`http:`: Bilder kommen ausschließlich vom
      // eigenen Server, Calendly liefert Avatare im Buchungs-Iframe.
      "img-src 'self' data: blob: https://assets.calendly.com https://*.calendly.com",
      "font-src 'self'",
      "connect-src 'self' https://calendly.com https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.googletagmanager.com https://t.contentsquare.net https://sibautomation.com",
      "frame-src 'self' https://calendly.com",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join('; ')

    return [
      {
        source: '/:path*',
        headers: [
          // HSTS - Enforce HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: cspDirectives,
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        // Cache für statische Assets
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/logo/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache für Fonts
        source: '/:path*.woff2',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

}

module.exports = nextConfig
