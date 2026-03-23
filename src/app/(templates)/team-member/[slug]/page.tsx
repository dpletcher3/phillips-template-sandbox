import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { teamMemberQuery, allTeamMemberSlugsQuery } from '@/lib/queries'
import { TEAM_MEMBER_MOCK } from '@/components/templates/team-member/mockData'
import TeamMemberPageClient from '@/components/templates/team-member/TeamMemberPageClient'

interface SanityTeamMember {
  name?: string
  title?: string
  photo?: unknown
  bio?: string
  isLeadership?: boolean
  linkedinUrl?: string
  slug?: { current?: string }
  issueLabel?: string
  facts?: Array<{ label?: string; value?: string }>
}

function transformTeamMember(sanity: SanityTeamMember | null) {
  if (!sanity?.name) return TEAM_MEMBER_MOCK

  return {
    ...TEAM_MEMBER_MOCK,
    name: sanity.name,
    title: sanity.title ?? TEAM_MEMBER_MOCK.title,
    isLeadership: sanity.isLeadership ?? TEAM_MEMBER_MOCK.isLeadership,
    issueLabel: sanity.issueLabel ?? TEAM_MEMBER_MOCK.issueLabel,
    bio: sanity.bio ? sanity.bio.split('\n\n').filter(Boolean) : TEAM_MEMBER_MOCK.bio,
    facts: sanity.facts?.length
      ? sanity.facts.map(f => ({ label: f.label ?? '', value: f.value ?? '' }))
      : TEAM_MEMBER_MOCK.facts,
    linkedinUrl: sanity.linkedinUrl ?? TEAM_MEMBER_MOCK.linkedinUrl,
  }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allTeamMemberSlugsQuery).catch(() => [])
  const params = (slugs ?? []).filter(s => s.slug).map(s => ({ slug: s.slug }))
  if (!params.find(p => p.slug === 'dan-pletcher')) {
    params.push({ slug: 'dan-pletcher' })
  }
  return params
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const member = await client.fetch<SanityTeamMember | null>(teamMemberQuery, { slug: params.slug }).catch(() => null)
  return {
    title: `${member?.name || 'Team Member'} | Phillips Template Sandbox`,
    description: member?.bio?.slice(0, 160) || 'Phillips Corporation team member profile',
  }
}

export default async function TeamMemberPage({ params }: { params: { slug: string } }) {
  const sanity = await client.fetch<SanityTeamMember | null>(teamMemberQuery, { slug: params.slug }).catch(() => null)
  const data = transformTeamMember(sanity)
  return <TeamMemberPageClient data={data} />
}
