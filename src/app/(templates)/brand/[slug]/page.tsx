import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { brandQuery, allBrandSlugsQuery } from '@/lib/queries'
import { HERMLE_MOCK } from '@/components/templates/brand/mockData'
import BrandPageClient from '@/components/templates/brand/BrandPageClient'

interface SanityBrand {
  name?: string
  tagline?: string
  description?: string
  category?: string[]
  heroImage?: unknown
  logo?: unknown
  productLines?: Array<{
    name?: string
    seriesLabel?: string
    models?: string
    description?: string
    image?: unknown
    xTravel?: string
    spindleSpeed?: string
    tableLoad?: string
    axes?: string
    bestFor?: string
    brochureUrl?: string
  }>
  relatedCaseStudies?: Array<{
    title?: string
    slug?: { current?: string }
    customer?: string
    industry?: string
    results?: Array<{ label?: string; value?: string }>
  }>
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

function transformBrand(sanity: SanityBrand | null) {
  if (!sanity?.name) return HERMLE_MOCK

  return {
    ...HERMLE_MOCK,
    name: sanity.name,
    tagline: sanity.tagline || HERMLE_MOCK.tagline,
    description: sanity.description || HERMLE_MOCK.description,
    categories: sanity.category || HERMLE_MOCK.categories,
    productLines: sanity.productLines?.length
      ? sanity.productLines.map(pl => ({
          name: pl.name || '',
          seriesLabel: pl.seriesLabel || '',
          models: pl.models || '',
          description: pl.description || '',
          image: pl.image ? String(pl.image) : null,
          brochureUrl: pl.brochureUrl,
          xTravel: pl.xTravel,
          spindleSpeed: pl.spindleSpeed,
          tableLoad: pl.tableLoad,
          axes: pl.axes,
          bestFor: pl.bestFor,
        }))
      : HERMLE_MOCK.productLines,
    caseStudies: sanity.relatedCaseStudies?.length
      ? sanity.relatedCaseStudies.map(cs => ({
          title: cs.title || '',
          customer: cs.customer || '',
          industry: cs.industry || '',
          summary: cs.results?.map(r => `${r.value} ${r.label}`).join(' · ') || '',
          slug: cs.slug?.current || '',
        }))
      : HERMLE_MOCK.caseStudies,
  }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allBrandSlugsQuery).catch(() => [])
  const params = slugs.map(s => ({ slug: s.slug }))
  // Always include hermle so the mock fallback works
  if (!params.find(p => p.slug === 'hermle')) {
    params.push({ slug: 'hermle' })
  }
  return params
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const brand = await client.fetch<SanityBrand | null>(brandQuery, { slug: params.slug }).catch(() => null)
  return {
    title: brand?.seo?.metaTitle || `${brand?.name || 'Brand'} | Phillips Template Sandbox`,
    description: brand?.seo?.metaDescription || brand?.tagline || 'Phillips Corporation brand page',
  }
}

export default async function BrandPage({ params }: { params: { slug: string } }) {
  const sanityBrand = await client.fetch<SanityBrand | null>(brandQuery, { slug: params.slug }).catch(() => null)
  const brand = transformBrand(sanityBrand)

  return <BrandPageClient brand={brand} />
}
