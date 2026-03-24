import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { profileSchema } from '@/lib/validations'

// GET - Fetch profile
export async function GET() {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: 1 },
    })

    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

// PUT - Update profile
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = profileSchema.parse(body)

    const profile = await prisma.profile.upsert({
      where: { id: 1 },
      update: {
        name: validatedData.name,
        photo: validatedData.photo ?? null,
        jobTitle: validatedData.jobTitle,
        about: validatedData.about,
        email: validatedData.email,
        phone: validatedData.phone ?? null,
        location: validatedData.location ?? null,
      },
      create: {
        id: 1,
        name: validatedData.name,
        photo: validatedData.photo ?? null,
        jobTitle: validatedData.jobTitle,
        about: validatedData.about,
        email: validatedData.email,
        phone: validatedData.phone ?? null,
        location: validatedData.location ?? null,
      },
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error('PUT profile error:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}