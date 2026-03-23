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

    // Revalidate the specific path based on document type
    switch (_type) {
      case 'brand':
        revalidatePath(`/brand/${slug?.current}`)
        revalidatePath(`/product-lines/${slug?.current}`)
        break
      case 'solution':
        revalidatePath(`/solution/${slug?.current}`)
        break
      case 'caseStudy':
        revalidatePath(`/case-study/${slug?.current}`)
        break
      case 'post':
        revalidatePath(`/post/${slug?.current}`)
        break
      case 'guide':
        revalidatePath(`/guide/${slug?.current}`)
        break
      case 'webinar':
        revalidatePath(`/webinar/${slug?.current}`)
        break
      case 'course':
        revalidatePath(`/course/${slug?.current}`)
        break
      case 'teamMember':
        revalidatePath(`/team-member/${slug?.current}`)
        break
      case 'location':
        revalidatePath(`/location/${slug?.current}`)
        break
      case 'personaPage':
        revalidatePath(`/persona/${body.persona}`)
        break
      case 'classEvent':
        revalidatePath('/class-calendar')
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
