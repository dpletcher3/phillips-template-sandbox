import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { solutionQuery, allSolutionSlugsQuery } from '@/lib/queries'
import { FIVE_AXIS_MOCK } from '@/components/templates/solution/mockData'
import SolutionPageClient from '@/components/templates/solution/SolutionPageClient'

interface SanitySolution {
  name?: string
  offering?: string
  shortDesc?: string
  description?: string
  heroImage?: unknown
  relatedBrands?: Array<{
    name?: string
    slug?: { current?: string }
    tagline?: string
    logo?: unknown
  }>
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

function transformSolution(sanity: SanitySolution | null) {
  if (!sanity?.name) return FIVE_AXIS_MOCK

  return {
    ...FIVE_AXIS_MOCK,
    name: sanity.name,
    offering: sanity.offering || FIVE_AXIS_MOCK.offering,
    shortDesc: sanity.shortDesc || FIVE_AXIS_MOCK.shortDesc,
    description: sanity.description || FIVE_AXIS_MOCK.description,
    relatedBrands: sanity.relatedBrands?.length
      ? sanity.relatedBrands.map(b => ({
          name: b.name || '',
          slug: b.slug?.current || '',
          description: b.tagline || '',
        }))
      : FIVE_AXIS_MOCK.relatedBrands,
  }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allSolutionSlugsQuery).catch(() => [])
  const params = slugs.map(s => ({ slug: s.slug }))
  // Always include the mock fallback slug
  if (!params.find(p => p.slug === '5-axis-machining-centers')) {
    params.push({ slug: '5-axis-machining-centers' })
  }
  return params
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const solution = await client.fetch<SanitySolution | null>(solutionQuery, { slug: params.slug }).catch(() => null)
  return {
    title: solution?.seo?.metaTitle || `${solution?.name || 'Solution'} | Phillips Template Sandbox`,
    description: solution?.seo?.metaDescription || solution?.shortDesc || 'Phillips Corporation solution page',
  }
}

export default async function SolutionPage({ params }: { params: { slug: string } }) {
  const sanitySolution = await client.fetch<SanitySolution | null>(solutionQuery, { slug: params.slug }).catch(() => null)
  const sol = transformSolution(sanitySolution)

  return <SolutionPageClient sol={sol} />
}
