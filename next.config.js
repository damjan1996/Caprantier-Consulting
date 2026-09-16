const { blogRedirects } = require('./config/blog-redirects')

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
    //
    // Auch die YouTube-Vorschaubilder sind kein Grund, das zu ändern: Sie
    // laufen über /api/youtube/thumbnail/[id] und kommen damit ebenfalls vom
    // eigenen Server. i.ytimg.com gehört deshalb nicht hierher.
  },

  // Performance & Security Headers
  poweredByHeader: false,
  compress: true,

  // Compiler Optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  /**
   * Dauerhafte Umleitungen der zusammengeführten Blogbeiträge.
   *
   * Am 10.09.2026 wurden 52 dünne Fachbeiträge auf 13 belastbare
   * zusammengeführt. Die 43 entfallenen Adressen dürfen nicht mit 404
   * antworten: Jede von ihnen kann verlinkt, gebookmarkt oder in einem Index
   * gespeichert sein. Sie zeigen deshalb per 301 auf den Beitrag, der ihr
   * Thema aufgenommen hat -- gezielt und nicht pauschal auf `/blog`, weil
   * Google eine Sammelumleitung auf eine Übersichtsseite wie einen Soft-404
   * behandelt und den Wert der alten Adresse dann gerade nicht überträgt.
   *
   * Die Zuordnung steht in `config/blog-redirects.js`,
   * `scripts/check-blog-redirects.mjs` prüft sie bei jedem `pnpm verify`.
   *
   * `statusCode: 301` statt `permanent: true`: Next.js setzt bei `permanent`
   * eine **308**. Die ist semantisch ebenfalls dauerhaft und wird von Google
   * wie eine 301 behandelt -- der Unterschied liegt darin, dass 308 die
   * HTTP-Methode erhält, was bei reinen GET-Adressen ohne Belang ist. Der
   * Auftrag verlangt aber ausdrücklich 301, und einige ältere Crawler und
   * Prüfwerkzeuge kennen 308 bis heute nicht. Für eine Domain, deren Problem
   * fehlende Indexierung ist, ist die konservative Wahl die richtige.
   */
  async redirects() {
    return blogRedirects.map(({ from, to }) => ({
      source: `/blog/${from}`,
      destination: `/blog/${to}`,
      statusCode: 301,
    }))
  },

  /**
   * Sicherheits- und Cache-Header.
   *
   * Bewusst die einzige Stelle im Projekt, an der Sicherheits-Header gesetzt
   * werden. Zuvor standen dieselben Header zusaetzlich in vercel.json — mit
   * widerspruechlichen Werten (X-Frame-Options: SAMEORIGIN hier, DENY dort).
   * Zwei Quellen fuer denselben Header sind nicht pruefbar, deshalb haelt
   * vercel.json jetzt nur noch Region und Cron-Zeitplan.
   */
  async headers() {
    // Content Security Policy.
    //
    // Die Liste ist bewusst eng: Jeder hier erlaubte Fremdhost ist ein Ziel, an
    // das der Browser die IP-Adresse der Besucher senden darf. Hosts, die erst
    // nach einer Einwilligung geladen werden (Analytics, Calendly), müssen
    // trotzdem gelistet sein — die CSP erlaubt sie, geladen werden sie aber
    // ausschließlich durch TrackingScripts bzw. durch die Zwischenkarte vor
    // dem Buchungsfenster.
    //
    // Nicht gelistet und auch nicht nötig:
    // - fonts.googleapis.com / fonts.gstatic.com: next/font liefert Inter beim
    //   Build lokal aus, zur Laufzeit geht kein Request an Google (§ 25 TDDDG).
    // - api.anthropic.com: der KI-Chat ist am 16.09.2026 entfallen.
    // - t.contentsquare.net: Hotjar wurde ersatzlos entfernt.

    // 'unsafe-eval' braucht ausschließlich der Entwicklungsserver (React
    // Refresh). Im Produktionsbuild ist es eine offene Tür für XSS und deshalb
    // nicht gesetzt.
    const isDev = process.env.NODE_ENV === 'development'
    const scriptSrc = [
      "'self'",
      // TODO: durch eine Nonce ersetzen. Dafür muss eine Middleware pro Antwort
      // eine Nonce erzeugen und an next/script durchreichen — das erzwingt
      // dynamisches Rendering und wird deshalb getrennt umgesetzt.
      "'unsafe-inline'",
      ...(isDev ? ["'unsafe-eval'"] : []),
      'https://assets.calendly.com',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://sibautomation.com',
    ].join(' ')

    const cspDirectives = [
      "default-src 'self'",
      `script-src ${scriptSrc}`,
      "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
      // Kein pauschales `https:`/`http:`: Bilder kommen ausschließlich vom
      // eigenen Server, Calendly liefert Avatare im Buchungs-Iframe.
      "img-src 'self' data: blob: https://assets.calendly.com https://*.calendly.com",
      "font-src 'self'",
      "connect-src 'self' https://calendly.com https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.googletagmanager.com https://sibautomation.com",
      // youtube-nocookie.com wird ausschließlich vom Video-Player geladen,
      // und der entsteht erst nach einer Einwilligung. Die CSP muss den Host
      // trotzdem kennen, sonst blockiert der Browser das Fenster danach.
      "frame-src 'self' https://calendly.com https://www.youtube-nocookie.com",
      // Niemand darf diese Seite einbetten. Deckungsgleich mit
      // X-Frame-Options: DENY weiter unten — beide Angaben müssen dasselbe
      // sagen, sonst entscheidet der Browser je nach Version anders.
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      'upgrade-insecure-requests',
    ].join('; ')

    const cacheForever = [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ]

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: cspDirectives,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          // X-XSS-Protection ist bewusst nicht gesetzt: Der Filter existiert in
          // keinem aktuellen Browser mehr und konnte selbst Lücken aufreißen.
          // Die Aufgabe übernimmt die CSP.
          //
          // X-DNS-Prefetch-Control stand auf "on". Da die Seite keine
          // Fremdhosts mehr vorab auflösen soll, bleibt es beim
          // Standardverhalten des Browsers.
        ],
      },
      { source: '/images/:path*', headers: cacheForever },
      { source: '/logo/:path*', headers: cacheForever },
      { source: '/:path*.woff2', headers: cacheForever },
    ]
  },

}

module.exports = nextConfig
