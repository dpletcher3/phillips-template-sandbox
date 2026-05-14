import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { brandProductLinesQuery, allBrandSlugsQuery } from '@/lib/queries'
import IndiaProductLinesClient, {
  type SanityBrandProductLines,
} from '@/components/templates-india/product-lines/IndiaProductLinesClient'

export const revalidate = 30

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allBrandSlugsQuery).catch(() => [])
  return slugs.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const brand = await client
    .fetch<SanityBrandProductLines | null>(brandProductLinesQuery, { slug: params.slug })
    .catch(() => null)
  return {
    title: brand?.name
      ? `${brand.name} product lines | Phillips Template Sandbox`
      : 'Product lines | Phillips Template Sandbox',
    description: brand?.tagline || 'Phillips Corporation product lines (india family)',
  }
}

export default async function IndiaProductLinesPage({ params }: { params: { slug: string } }) {
  const brand = await client
    .fetch<SanityBrandProductLines | null>(brandProductLinesQuery, { slug: params.slug })
    .catch(() => null)
  if (!brand) {
    return (
      <main style={{ padding: 48, fontFamily: 'system-ui, sans-serif' }}>
        <h1>Brand not found</h1>
        <p>No Sanity Brand document matched slug <code>{params.slug}</code>.</p>
      </main>
    )
  }
  return <IndiaProductLinesClient brand={brand} />
}
