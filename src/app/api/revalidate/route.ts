import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { _type, slug } = body

    // Revalidate all three variants for each document type
    const prefixes = ['/ec', '/simple', '/appealing']

    switch (_type) {
      case 'brand':
        for (const p of prefixes) {
          revalidatePath(`${p}/brand/${slug?.current}`)
          revalidatePath(`${p}/product-lines/${slug?.current}`)
        }
        break
      case 'solution':
        for (const p of prefixes) revalidatePath(`${p}/solution/${slug?.current}`)
        break
      case 'caseStudy':
        for (const p of prefixes) revalidatePath(`${p}/case-study/${slug?.current}`)
        break
      case 'post':
        for (const p of prefixes) revalidatePath(`${p}/post/${slug?.current}`)
        break
      case 'guide':
        for (const p of prefixes) revalidatePath(`${p}/guide/${slug?.current}`)
        break
      case 'webinar':
        for (const p of prefixes) revalidatePath(`${p}/webinar/${slug?.current}`)
        break
      case 'course':
        for (const p of prefixes) revalidatePath(`${p}/course/${slug?.current}`)
        break
      case 'teamMember':
        for (const p of prefixes) revalidatePath(`${p}/team-member/${slug?.current}`)
        break
      case 'location':
        for (const p of prefixes) revalidatePath(`${p}/location/${slug?.current}`)
        break
      case 'personaPage':
        for (const p of prefixes) revalidatePath(`${p}/persona/${body.persona}`)
        break
      case 'classEvent':
        for (const p of prefixes) revalidatePath(`${p}/class-calendar`)
        break
      default:
        // Revalidate everything as fallback
        revalidatePath('/', 'layout')
    }

    return NextResponse.json({ revalidated: true, type: _type })
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    )
  }
}
