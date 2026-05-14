import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { teamMemberQuery, allTeamMemberSlugsQuery } from '@/lib/queries'
import IndiaTeamMemberClient, { type SanityTeamMember } from '@/components/templates-india/team-member/IndiaTeamMemberClient'

export const revalidate = 30

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allTeamMemberSlugsQuery).catch(() => [])
  return slugs.filter(s => s.slug).map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const member = await client.fetch<SanityTeamMember | null>(teamMemberQuery, { slug: params.slug }).catch(() => null)
  return {
    title: `${member?.name || 'Team member'} | Phillips Template Sandbox`,
    description: member?.bio?.slice(0, 160) || 'Phillips Corporation team member profile (india family)',
  }
}

export default async function IndiaTeamMemberPage({ params }: { params: { slug: string } }) {
  const member = await client.fetch<SanityTeamMember | null>(teamMemberQuery, { slug: params.slug }).catch(() => null)
  if (!member) {
    return (
      <main style={{ padding: 48, fontFamily: 'system-ui, sans-serif' }}>
        <h1>Team member not found</h1>
        <p>No Sanity teamMember document matched slug <code>{params.slug}</code>.</p>
      </main>
    )
  }
  return <IndiaTeamMemberClient teamMember={member} />
}
