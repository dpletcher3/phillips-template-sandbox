import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { brandProductLinesQuery, allBrandSlugsQuery } from '@/lib/queries'

export const revalidate = 30
import { PRODUCT_LINES_MOCK } from '@/components/templates/product-lines/mockData'
import AppealingProductLinesClient from '@/components/templates-appealing/product-lines/AppealingProductLinesClient'

interface SanityBrandProductLines {
  name?: string
  slug?: { current?: string }
  tagline?: string
  logo?: unknown
  productLines?: Array<{
    name?: string
    seriesLabel?: string
    models?: string
    description?: string
    image?: unknown
    brochureUrl?: string
    xTravel?: string
    spindleSpeed?: string
    tableLoad?: string
    axes?: string
    bestFor?: string
    tagline?: string
    type?: string
    keySpecs?: Array<{ value?: string; label?: string }>
    modelDetails?: Array<{ name?: string; travel?: string; spindle?: string }>
  }>
}

function transformProductLines(sanity: SanityBrandProductLines | null) {
  if (!sanity?.name || !sanity.productLines?.length) return PRODUCT_LINES_MOCK

  return {
    brandName: sanity.name,
    series: sanity.productLines.map(pl => ({
      name: pl.name ?? '',
      tagline: pl.tagline ?? pl.seriesLabel ?? '',
      description: pl.description ?? '',
      models: pl.modelDetails?.length
        ? pl.modelDetails.map(m => ({
            name: m.name ?? '',
            travel: m.travel ?? '',
            spindle: m.spindle ?? '',
          }))
        : (pl.models ?? '').split('·').map(m => ({ name: m.trim(), travel: pl.xTravel ?? '', spindle: pl.spindleSpeed ?? '' })),
      type: pl.type ?? '',
      xTravel: pl.xTravel ?? '',
      spindleSpeed: pl.spindleSpeed ?? '',
      tableLoad: pl.tableLoad ?? '',
      bestFor: pl.bestFor ?? '',
      keySpecs: pl.keySpecs?.length
        ? pl.keySpecs.map(ks => ({ value: ks.value ?? '', label: ks.label ?? '' }))
        : undefined,
    })),
  }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allBrandSlugsQuery).catch(() => [])
  const params = (slugs ?? []).filter(s => s.slug).map(s => ({ slug: s.slug }))
  if (!params.find(p => p.slug === 'haas')) {
    params.push({ slug: 'haas' })
  }
  return params
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const brand = await client.fetch<SanityBrandProductLines | null>(brandProductLinesQuery, { slug: params.slug }).catch(() => null)
  return {
    title: `${brand?.name || 'Product Lines'} | Phillips Template Sandbox`,
    description: `${brand?.name || ''} product lines and specifications`,
  }
}

export default async function AppealingProductLinesPage({ params }: { params: { slug: string } }) {
  const sanity = await client.fetch<SanityBrandProductLines | null>(brandProductLinesQuery, { slug: params.slug }).catch(() => null)
  const data = transformProductLines(sanity)
  return <AppealingProductLinesClient data={data} />
}
