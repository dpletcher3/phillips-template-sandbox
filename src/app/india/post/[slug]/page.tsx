import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { postQuery, allPostSlugsQuery } from '@/lib/queries'
import IndiaPostClient, { type SanityPost } from '@/components/templates-india/post/IndiaPostClient'

export const revalidate = 30

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allPostSlugsQuery).catch(() => [])
  return slugs.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await client.fetch<SanityPost | null>(postQuery, { slug: params.slug }).catch(() => null)
  return {
    title: post?.title ? `${post.title} | Phillips Template Sandbox` : 'Post | Phillips Template Sandbox',
    description: post?.excerpt || 'Phillips Corporation blog post (india family)',
  }
}

export default async function IndiaPostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch<SanityPost | null>(postQuery, { slug: params.slug }).catch(() => null)
  if (!post) {
    return (
      <main style={{ padding: 48, fontFamily: 'system-ui, sans-serif' }}>
        <h1>Post not found</h1>
        <p>No Sanity post document matched slug <code>{params.slug}</code>.</p>
      </main>
    )
  }
  return <IndiaPostClient post={post} />
}
