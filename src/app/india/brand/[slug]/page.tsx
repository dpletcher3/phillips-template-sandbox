import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { brandQuery, allBrandSlugsQuery } from '@/lib/queries'
import IndiaBrandClient, { type SanityBrand } from '@/components/templates-india/brand/IndiaBrandClient'

export const revalidate = 30

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allBrandSlugsQuery).catch(() => [])
  return slugs.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const brand = await client.fetch<SanityBrand | null>(brandQuery, { slug: params.slug }).catch(() => null)
  return {
    title: brand?.name ? `${brand.name} | Phillips Template Sandbox` : 'Brand | Phillips Template Sandbox',
    description: brand?.tagline || brand?.description || 'Phillips Corporation brand page (india family)',
  }
}

export default async function IndiaBrandPage({ params }: { params: { slug: string } }) {
  const brand = await client.fetch<SanityBrand | null>(brandQuery, { slug: params.slug }).catch(() => null)
  if (!brand) {
    return (
      <main style={{ padding: 48, fontFamily: 'system-ui, sans-serif' }}>
        <h1>Brand not found</h1>
        <p>No Sanity Brand document matched slug <code>{params.slug}</code>.</p>
      </main>
    )
  }
  return <IndiaBrandClient brand={brand} />
}
