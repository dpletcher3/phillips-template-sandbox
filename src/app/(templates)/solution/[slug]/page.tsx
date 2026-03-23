import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { solutionQuery, allSolutionSlugsQuery } from '@/lib/queries'
import { FIVE_AXIS_MOCK } from '@/components/templates/solution/mockData'
import SolutionPageClient from '@/components/templates/solution/SolutionPageClient'

interface SanitySolution {
  name?: string
  offering?: string
  shortDesc?: string
  description?: unknown
  heroImage?: unknown
  relatedBrands?: Array<{
    name?: string
    slug?: { current?: string }
    tagline?: string
    logo?: unknown
  }> | null
  seo?: {
    metaTitle?: string
    metaDescription?: string
  } | null
}

/** Extract plain text from Sanity blockContent (portable text) or pass through strings. */
function toPlainText(value: unknown): string {
  if (typeof value === 'string') return value
  if (!Array.isArray(value)) return ''
  return value
    .filter((b: Record<string, unknown>) => b._type === 'block')
    .map((b: Record<string, unknown>) =>
      Array.isArray(b.children)
        ? b.children.map((c: Record<string, unknown>) => c.text ?? '').join('')
        : ''
    )
    .join('\n\n')
}

function transformSolution(sanity: SanitySolution | null) {
  if (!sanity?.name) return FIVE_AXIS_MOCK

  const description = toPlainText(sanity.description)

  return {
    ...FIVE_AXIS_MOCK,
    name: sanity.name,
    offering: sanity.offering || FIVE_AXIS_MOCK.offering,
    shortDesc: sanity.shortDesc || FIVE_AXIS_MOCK.shortDesc,
    description: description || FIVE_AXIS_MOCK.description,
    relatedBrands: Array.isArray(sanity.relatedBrands) && sanity.relatedBrands.length
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
  const params = (slugs ?? [])
    .filter(s => typeof s.slug === 'string' && s.slug)
    .map(s => ({ slug: s.slug }))
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

  if (!sanitySolution) {
    return (
      <main style={{ background: '#000', color: '#fff', padding: '60px', fontFamily: 'sans-serif', minHeight: '100vh' }}>
        <p style={{ color: '#F9423A' }}>Solution not found</p>
      </main>
    )
  }

  const sol = transformSolution(sanitySolution)

  return <SolutionPageClient sol={sol} />
}
