import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { educationSchema } from '@/lib/validations'

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

    const body = await request.json()
    const validatedData = educationSchema.parse(body)

    // Get max order value
    const maxOrder = await prisma.education.aggregate({
      _max: { order: true },
    })

    const education = await prisma.education.create({
      data: {
        school: validatedData.school,
        degree: validatedData.degree,
        field: validatedData.field,
        location: validatedData.location ?? null,
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        current: validatedData.current ?? false,
        description: validatedData.description ?? null,
        order: (maxOrder._max.order ?? -1) + 1,
      },
    })

    return NextResponse.json(education)
  } catch (error) {
    console.error('POST education error:', error)
    return NextResponse.json(
      { error: 'Failed to create education' },
      { status: 500 }
    )
  }
}