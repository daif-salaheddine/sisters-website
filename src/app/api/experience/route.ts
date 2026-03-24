import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { experienceSchema } from '@/lib/validations'

// GET - Fetch all experiences
export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(experiences)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    )
  }
}

// POST - Create new experience
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = experienceSchema.parse(body)

    // Get max order value
    const maxOrder = await prisma.experience.aggregate({
      _max: { order: true },
    })

    const experience = await prisma.experience.create({
      data: {
        company: validatedData.company,
        position: validatedData.position,
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        current: validatedData.current ?? false,
        description: validatedData.description,
        order: (maxOrder._max.order ?? -1) + 1,
      },
    })

    return NextResponse.json(experience)
  } catch (error) {
    console.error('POST experience error:', error)
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    )
  }
}