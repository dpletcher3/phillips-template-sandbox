import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { caseStudyQuery, allCaseStudySlugsQuery } from '@/lib/queries'
import { CASE_STUDY_MOCK } from '@/components/templates/case-study/mockData'
import CaseStudyPageClient from '@/components/templates/case-study/CaseStudyPageClient'

interface SanityCaseStudy {
  title?: string
  slug?: { current?: string }
  customer?: string
  industry?: string
  isFederal?: boolean
  heroImage?: unknown
  summary?: string
  body?: unknown
  relatedBrands?: Array<{ name?: string; slug?: { current?: string }; logo?: unknown }>
  results?: Array<{ label?: string; value?: string }>
  pullQuote?: string
  pullQuoteAttribution?: string
  kickerTags?: string[]
  byline?: string
  seo?: { metaTitle?: string; metaDescription?: string }
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

function transformCaseStudy(sanity: SanityCaseStudy | null) {
  if (!sanity?.title) return CASE_STUDY_MOCK

  const bodyText = toPlainText(sanity.body)
  const paragraphs = bodyText.split('\n\n').filter(Boolean)
  const mid = Math.ceil(paragraphs.length / 2)

  return {
    ...CASE_STUDY_MOCK,
    title: sanity.title,
    subtitle: sanity.customer ?? CASE_STUDY_MOCK.subtitle,
    industry: sanity.industry ?? CASE_STUDY_MOCK.industry,
    customer: sanity.customer ?? CASE_STUDY_MOCK.customer,
    tags: sanity.kickerTags?.length ? sanity.kickerTags : CASE_STUDY_MOCK.tags,
    byline: sanity.byline ?? CASE_STUDY_MOCK.byline,
    lede: sanity.summary ?? CASE_STUDY_MOCK.lede,
    bodyLeft: paragraphs.length ? paragraphs.slice(0, mid).join('\n\n') : CASE_STUDY_MOCK.bodyLeft,
    bodyRight: paragraphs.length ? paragraphs.slice(mid).join('\n\n') : CASE_STUDY_MOCK.bodyRight,
    results: sanity.results?.length
      ? sanity.results.map(r => ({ value: r.value ?? '', label: r.label ?? '' }))
      : CASE_STUDY_MOCK.results,
    pullQuote: sanity.pullQuote ?? CASE_STUDY_MOCK.pullQuote,
    pullAuthor: sanity.pullQuoteAttribution ?? CASE_STUDY_MOCK.pullAuthor,
  }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allCaseStudySlugsQuery).catch(() => [])
  const params = (slugs ?? []).filter(s => s.slug).map(s => ({ slug: s.slug }))
  if (!params.find(p => p.slug === 'navair-frc-east')) {
    params.push({ slug: 'navair-frc-east' })
  }
  return params
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cs = await client.fetch<SanityCaseStudy | null>(caseStudyQuery, { slug: params.slug }).catch(() => null)
  return {
    title: cs?.seo?.metaTitle || `${cs?.title || 'Case Study'} | Phillips Template Sandbox`,
    description: cs?.seo?.metaDescription || cs?.summary || 'Phillips Corporation case study',
  }
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const sanity = await client.fetch<SanityCaseStudy | null>(caseStudyQuery, { slug: params.slug }).catch(() => null)
  const data = transformCaseStudy(sanity)
  return <CaseStudyPageClient data={data} />
}
