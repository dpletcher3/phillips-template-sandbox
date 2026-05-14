import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { caseStudyQuery, allCaseStudySlugsQuery } from '@/lib/queries'
import IndiaCaseStudyClient, { type SanityCaseStudy } from '@/components/templates-india/case-study/IndiaCaseStudyClient'

export const revalidate = 30

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allCaseStudySlugsQuery).catch(() => [])
  return slugs.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cs = await client.fetch<SanityCaseStudy | null>(caseStudyQuery, { slug: params.slug }).catch(() => null)
  return {
    title: cs?.title ? `${cs.title} | Phillips Template Sandbox` : 'Case study | Phillips Template Sandbox',
    description: cs?.summary || 'Phillips Corporation case study (india family)',
  }
}

export default async function IndiaCaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = await client.fetch<SanityCaseStudy | null>(caseStudyQuery, { slug: params.slug }).catch(() => null)
  if (!caseStudy) {
    return (
      <main style={{ padding: 48, fontFamily: 'system-ui, sans-serif' }}>
        <h1>Case study not found</h1>
        <p>No Sanity caseStudy document matched slug <code>{params.slug}</code>.</p>
      </main>
    )
  }
  return <IndiaCaseStudyClient caseStudy={caseStudy} />
}
