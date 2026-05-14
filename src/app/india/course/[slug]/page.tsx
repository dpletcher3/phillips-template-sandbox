import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { courseQuery, allCourseSlugsQuery } from '@/lib/queries'
import IndiaCourseClient, { type SanityCourse } from '@/components/templates-india/course/IndiaCourseClient'

export const revalidate = 30

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allCourseSlugsQuery).catch(() => [])
  return slugs.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const course = await client.fetch<SanityCourse | null>(courseQuery, { slug: params.slug }).catch(() => null)
  return {
    title: course?.title ? `${course.title} | Phillips Template Sandbox` : 'Course | Phillips Template Sandbox',
    description: course?.description?.slice(0, 160) || 'Phillips Corporation course (india family)',
  }
}

export default async function IndiaCoursePage({ params }: { params: { slug: string } }) {
  const course = await client.fetch<SanityCourse | null>(courseQuery, { slug: params.slug }).catch(() => null)
  if (!course) {
    return (
      <main style={{ padding: 48, fontFamily: 'system-ui, sans-serif' }}>
        <h1>Course not found</h1>
        <p>No Sanity course document matched slug <code>{params.slug}</code>.</p>
      </main>
    )
  }
  return <IndiaCourseClient course={course} />
}
