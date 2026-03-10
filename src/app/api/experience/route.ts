import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

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

    const data = await request.json()

    // Get max order
    const maxOrder = await prisma.experience.count()

    const experience = await prisma.experience.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        order: maxOrder,
      },
    })

    return NextResponse.json(experience)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    )
  }
}