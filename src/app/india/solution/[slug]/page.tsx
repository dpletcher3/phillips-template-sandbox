import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { solutionQuery, allSolutionSlugsQuery } from '@/lib/queries'
import IndiaSolutionClient, { type SanitySolution } from '@/components/templates-india/solution/IndiaSolutionClient'

export const revalidate = 30

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allSolutionSlugsQuery).catch(() => [])
  return slugs.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const solution = await client.fetch<SanitySolution | null>(solutionQuery, { slug: params.slug }).catch(() => null)
  return {
    title: solution?.name ? `${solution.name} | Phillips Template Sandbox` : 'Solution | Phillips Template Sandbox',
    description: solution?.shortDesc || 'Phillips Corporation solution page (india family)',
  }
}

export default async function IndiaSolutionPage({ params }: { params: { slug: string } }) {
  const solution = await client.fetch<SanitySolution | null>(solutionQuery, { slug: params.slug }).catch(() => null)
  if (!solution) {
    return (
      <main style={{ padding: 48, fontFamily: 'system-ui, sans-serif' }}>
        <h1>Solution not found</h1>
        <p>No Sanity Solution document matched slug <code>{params.slug}</code>.</p>
      </main>
    )
  }
  return <IndiaSolutionClient solution={solution} />
}
