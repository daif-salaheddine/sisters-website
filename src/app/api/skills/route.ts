import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { skillSchema } from '@/lib/validations'

// GET - Fetch all skills
export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(skills)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    )
  }
}

// POST - Create new skill
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = skillSchema.parse(body)

    // Get max order value
    const maxOrder = await prisma.skill.aggregate({
      _max: { order: true },
    })

    const skill = await prisma.skill.create({
      data: {
        name: validatedData.name,
        level: validatedData.level,
        category: validatedData.category,
        order: (maxOrder._max.order ?? -1) + 1,
      },
    })

    return NextResponse.json(skill)
  } catch (error) {
    console.error('POST skill error:', error)
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    )
  }
}