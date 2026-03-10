import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET - Fetch all education
export async function GET() {
  try {
    const educations = await prisma.education.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(educations)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch education' },
      { status: 500 }
    )
  }
}

// POST - Create new education
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const maxOrder = await prisma.education.count()

    const education = await prisma.education.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        order: maxOrder,
      },
    })

    return NextResponse.json(education)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create education' },
      { status: 500 }
    )
  }
}