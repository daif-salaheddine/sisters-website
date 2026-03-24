import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { languageSchema } from '@/lib/validations'

// GET - Fetch all languages
export async function GET() {
  try {
    const languages = await prisma.language.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(languages)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch languages' },
      { status: 500 }
    )
  }
}

// POST - Create new language
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = languageSchema.parse(body)

    // Get max order value
    const maxOrder = await prisma.language.aggregate({
      _max: { order: true },
    })

    const language = await prisma.language.create({
      data: {
        name: validatedData.name,
        level: validatedData.level,
        order: (maxOrder._max.order ?? -1) + 1,
      },
    })

    return NextResponse.json(language)
  } catch (error) {
    console.error('POST language error:', error)
    return NextResponse.json(
      { error: 'Failed to create language' },
      { status: 500 }
    )
  }
}