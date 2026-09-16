import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getIndustryBySlug, getAllIndustrySlugs } from '@/lib/industries'
import { businessInfo } from '@/lib/local-seo'

interface Props {
  params: Promise<{ branche: string }>
}

export async function generateStaticParams() {
  return getAllIndustrySlugs().map((branche) => ({ branche }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { branche } = await params
  const industry = getIndustryBySlug(branche)

  if (!industry) {
    notFound()
  }

  const url = `${businessInfo.website}/branchen/${industry.slug}`

  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    keywords: industry.keywords,
    openGraph: {
      title: industry.metaTitle,
      description: industry.metaDescription,
      url,
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `Carpantier Consulting – ${industry.shortTitle}`,
        },
      ],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default function BranchenLayout({ children }: { children: React.ReactNode }) {
  return children
}
