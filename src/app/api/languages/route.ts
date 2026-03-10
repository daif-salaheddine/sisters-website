import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

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

    const data = await request.json()
    const maxOrder = await prisma.language.count()

    const language = await prisma.language.create({
      data: { ...data, order: maxOrder },
    })

    return NextResponse.json(language)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create language' },
      { status: 500 }
    )
  }
}