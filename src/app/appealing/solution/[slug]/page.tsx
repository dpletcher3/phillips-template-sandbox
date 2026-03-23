import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { solutionQuery, allSolutionSlugsQuery } from '@/lib/queries'

export const revalidate = 30
import { FIVE_AXIS_MOCK } from '@/components/templates/solution/mockData'
import AppealingSolutionClient from '@/components/templates-appealing/solution/AppealingSolutionClient'

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
  bgNumber?: string
  typePills?: string[]
  specStripe?: Array<{ label?: string; value?: string }>
  specBars?: Array<{ label?: string; value?: number; max?: number; unit?: string; note?: string }>
  specSectionTitle?: string
  specSectionBody?: string
  ctaTitle?: string
  ctaSubtitle?: string
  ctaDescription?: string
  ctaPrimaryLabel?: string
  ctaSecondaryLabel?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
  } | null
}

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
    offeringNumber: sanity.bgNumber ?? FIVE_AXIS_MOCK.offeringNumber,
    shortDesc: sanity.shortDesc || FIVE_AXIS_MOCK.shortDesc,
    description: description || FIVE_AXIS_MOCK.description,
    typePills: sanity.typePills?.length ? sanity.typePills : FIVE_AXIS_MOCK.typePills,
    specNumbers: sanity.specStripe?.length
      ? sanity.specStripe.map(s => ({ value: s.value ?? '', label: s.label ?? '' }))
      : FIVE_AXIS_MOCK.specNumbers,
    specs: sanity.specBars?.length
      ? sanity.specBars.map(s => ({
          label: s.label ?? '',
          value: s.value ?? 0,
          max: s.max ?? 100,
          unit: s.unit ?? '',
          note: s.note,
        }))
      : FIVE_AXIS_MOCK.specs,
    specsHeading: sanity.specSectionTitle ?? FIVE_AXIS_MOCK.specsHeading,
    specsDescription: sanity.specSectionBody ?? FIVE_AXIS_MOCK.specsDescription,
    ctaHeading: sanity.ctaTitle ?? FIVE_AXIS_MOCK.ctaHeading,
    ctaAccent: sanity.ctaSubtitle ?? FIVE_AXIS_MOCK.ctaAccent,
    ctaDescription: sanity.ctaDescription ?? FIVE_AXIS_MOCK.ctaDescription,
    ctaPrimaryLabel: sanity.ctaPrimaryLabel ?? 'Request a Quote',
    ctaSecondaryLabel: sanity.ctaSecondaryLabel ?? 'Schedule a Test Cut',
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
  const sol = transformSolution(sanitySolution)

  return <AppealingSolutionClient sol={sol} />
}
