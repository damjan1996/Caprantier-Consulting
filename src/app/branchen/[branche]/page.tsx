import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle, MapPin, Target } from 'lucide-react'
import { PageWrapper, Breadcrumbs, SectionCard } from '@/components/ui'
import FadeIn from '@/components/ui/FadeIn'
import DecorativeParticles from '@/components/ui/DecorativeParticles'
import { getIndustryBySlug, getAllIndustrySlugs, type IndustryPage } from '@/lib/industries'
import { getCityBySlug } from '@/lib/cities'
import { getBlogPostBySlug } from '@/lib/blog'
import { businessInfo } from '@/lib/local-seo'
import { generateBreadcrumbSchema, generateBlogFAQSchema } from '@/lib/schemas'

const CTA = dynamic(() => import('@/components/sections/CTA'), {
  loading: () => <div className="section-padding" />,
})

interface Props {
  params: Promise<{ branche: string }>
}

export async function generateStaticParams() {
  return getAllIndustrySlugs().map((branche) => ({ branche }))
}

/**
 * JSON-LD der Branchenseite.
 *
 * Bewusst `Service` mit `audience` statt eines zweiten `LocalBusiness`:
 * Die Organisation ist bereits über `@id` im Layout ausgezeichnet, und ein
 * zweiter Datensatz mit denselben NAP-Angaben würde die Konsistenz gefährden,
 * die Abschnitt 3 des Auftrags "Sichtbarkeit" ausdrücklich schützt.
 */
function generateIndustryJsonLd(industry: IndustryPage) {
  const url = `${businessInfo.website}/branchen/${industry.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    serviceType: 'B2B Vertriebsagentur',
    name: industry.headline,
    description: industry.metaDescription,
    url,
    provider: {
      '@type': 'Organization',
      '@id': `${businessInfo.website}/#organization`,
      name: businessInfo.name,
      url: businessInfo.website,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Deutschland',
    },
    audience: {
      '@type': 'BusinessAudience',
      name: industry.shortTitle,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: industry.headline,
      itemListElement: industry.approach.map((schritt) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: schritt.title,
          description: schritt.text,
        },
      })),
    },
  }
}

export default async function BranchePage({ params }: Props) {
  const { branche } = await params
  const industry = getIndustryBySlug(branche)

  if (!industry) {
    notFound()
  }

  const serviceSchema = generateIndustryJsonLd(industry)
  const faqSchema = generateBlogFAQSchema(industry.faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: businessInfo.website },
    { name: 'Branchen', url: `${businessInfo.website}/branchen` },
    { name: industry.shortTitle, url: `${businessInfo.website}/branchen/${industry.slug}` },
  ])

  const beitraege = industry.relatedPosts
    .map((slug) => getBlogPostBySlug(slug))
    .filter((post) => post !== undefined)

  const staedte = industry.relatedCities
    .map((slug) => getCityBySlug(slug))
    .filter((city) => city !== undefined)

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 relative">
        <DecorativeParticles preset="minimal" />
        <div className="container-custom">
          <FadeIn className="max-w-3xl">
            <Breadcrumbs
              items={[{ label: 'Branchen', href: '/branchen' }, { label: industry.shortTitle }]}
              className="mb-6"
            />
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary mb-6">
              <Target className="h-4 w-4 mr-2 text-primary" />
              {industry.kicker}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.15]">
              {industry.headline}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">{industry.intro}</p>
            <div className="flex flex-col sm:flex-row gap-3 pt-8">
              <Link href="/kontakt" className="btn-primary inline-flex items-center justify-center gap-2">
                Erstgespräch vereinbaren
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/leistungen"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border bg-white text-foreground transition-colors hover:bg-muted"
              >
                Leistungen und Preise
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Ausgangslage */}
      <section className="section-padding">
        <div className="container-custom">
          <FadeIn className="max-w-3xl mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-[1.15]">
              Warum Akquise hier anders läuft
            </h2>
            <p className="text-muted-foreground">
              Vier Punkte, die in dieser Branche über das Ergebnis entscheiden – und die kein
              allgemeiner Vertriebsratgeber abbildet.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {industry.painPoints.map((punkt, index) => (
              <FadeIn key={punkt.title} delay={index * 0.1}>
                <SectionCard className="h-full">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{punkt.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{punkt.text}</p>
                </SectionCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Vorgehen */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <FadeIn className="max-w-3xl mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-[1.15]">
              So läuft die Zusammenarbeit
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {industry.approach.map((schritt, index) => (
              <FadeIn key={schritt.title} delay={index * 0.1}>
                <div className="flex gap-4 h-full p-6 rounded-2xl border border-border bg-white">
                  <div className="h-9 w-9 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{schritt.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{schritt.text}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Qualifizierung */}
      <section className="section-padding">
        <div className="container-custom">
          <FadeIn className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-[1.15]">
              Was wir klären, bevor ein Termin in Ihren Kalender geht
            </h2>
            <p className="text-muted-foreground mb-8">
              Ein Termin ohne diese Antworten kostet Sie eine Stunde und bringt keinen Auftrag.
            </p>
            <ul className="space-y-3">
              {industry.qualification.map((frage) => (
                <li key={frage} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{frage}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <FadeIn className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 leading-[1.15]">
              Häufige Fragen
            </h2>
            <div className="space-y-4">
              {industry.faqs.map((faq) => (
                <div key={faq.question} className="p-5 rounded-xl border border-border bg-white">
                  <h3 className="text-base font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Vertiefung und regionale Verlinkung */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10">
            <FadeIn>
              <h2 className="text-xl font-bold text-foreground mb-5">Zum Weiterlesen</h2>
              <div className="space-y-3">
                {beitraege.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block p-5 rounded-xl border border-border bg-white transition-colors hover:bg-muted hover:border-primary/30"
                  >
                    <span className="text-xs text-primary font-medium">{post.category}</span>
                    <h3 className="text-base font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {post.description}
                    </p>
                  </Link>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="text-xl font-bold text-foreground mb-5">Regional</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Wir arbeiten deutschlandweit. Für diese Standorte gibt es eigene Übersichten:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {staedte.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/kaltakquise/${city.slug}`}
                    className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-white transition-colors hover:bg-muted hover:border-primary/30"
                  >
                    <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      Kaltakquise {city.name}
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/branchen"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-6"
              >
                Alle Branchenlösungen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="section-padding" />}>
        <CTA />
      </Suspense>
    </PageWrapper>
  )
}
