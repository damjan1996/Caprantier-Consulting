import PageWrapper from '@/components/ui/PageWrapper'
import Hero from './_components/Hero'
import PrivacySections from './_components/PrivacySections'

/*
 * Ohne Suspense-Grenze: Bis zum 01.10.2026 lagen die Abschnitte in je einem
 * <Suspense>. Next.js lieferte sie dadurch als gestreamtes `<div hidden>` hinter
 * der Fußzeile aus, das erst per JavaScript an seinen Platz kam. Ohne
 * JavaScript waren die Pflichtangaben damit unsichtbar — genau das soll der
 * <noscript>-Block in `src/app/layout.tsx` verhindern (§ 5 DDG „leicht
 * erkennbar“, Art. 12 Abs. 1 DSGVO „leicht zugänglich“). Es gibt hier nichts,
 * worauf zu warten wäre.
 */
export default function DatenschutzPage() {
  return (
    <PageWrapper>
      <Hero />
      <section className="section-padding relative">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-6">
            <PrivacySections />
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
