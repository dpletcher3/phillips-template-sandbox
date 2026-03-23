import { Metadata } from 'next'
import { client } from '../../../../../sanity/lib/client'
import { courseQuery, allCourseSlugsQuery } from '@/lib/queries'

export const revalidate = 30
import { COURSE_MOCK } from '@/components/templates/course/mockData'
import AppealingCourseClient from '@/components/templates-appealing/course/AppealingCourseClient'

interface SanityCourse {
  title?: string
  slug?: { current?: string }
  track?: string
  audience?: string
  duration?: string
  description?: string
  relatedBrands?: Array<{ name?: string; slug?: { current?: string }; logo?: unknown }>
  trackLabel?: string
  levelLabel?: string
  modules?: Array<{ number?: number; name?: string; duration?: string }>
  prerequisites?: string[]
  machineLabel?: string
  seo?: { metaTitle?: string; metaDescription?: string }
}

function transformCourse(sanity: SanityCourse | null) {
  if (!sanity?.title) return COURSE_MOCK

  return {
    ...COURSE_MOCK,
    track: sanity.trackLabel ?? sanity.track ?? COURSE_MOCK.track,
    level: sanity.levelLabel ?? COURSE_MOCK.level,
    title: sanity.title,
    description: sanity.description ?? COURSE_MOCK.description,
    duration: sanity.duration ?? COURSE_MOCK.duration,
    machines: sanity.machineLabel ? [sanity.machineLabel] : COURSE_MOCK.machines,
    modules: sanity.modules?.length
      ? sanity.modules.map((m, i) => ({
          number: m.number ?? i + 1,
          title: m.name ?? '',
          description: m.duration ?? '',
        }))
      : COURSE_MOCK.modules,
    prerequisites: sanity.prerequisites?.length ? sanity.prerequisites : COURSE_MOCK.prerequisites,
  }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allCourseSlugsQuery).catch(() => [])
  const params = (slugs ?? []).filter(s => s.slug).map(s => ({ slug: s.slug }))
  if (!params.find(p => p.slug === '5-axis-programming-setup')) {
    params.push({ slug: '5-axis-programming-setup' })
  }
  return params
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const course = await client.fetch<SanityCourse | null>(courseQuery, { slug: params.slug }).catch(() => null)
  return {
    title: course?.seo?.metaTitle || `${course?.title || 'Course'} | Phillips Template Sandbox`,
    description: course?.seo?.metaDescription || course?.description || 'Phillips Corporation training course',
  }
}

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const sanity = await client.fetch<SanityCourse | null>(courseQuery, { slug: params.slug }).catch(() => null)
  const data = transformCourse(sanity)
  return <AppealingCourseClient data={data} />
}
