import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { experienceSchema } from '@/lib/validations'

// GET - Fetch single experience
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const experience = await prisma.experience.findUnique({
      where: { id: parseInt(id) },
    })

    if (!experience) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json(experience)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

// PUT - Update experience
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const validatedData = experienceSchema.partial().parse(body)

    const updateData: {
      company?: string
      position?: string
      startDate?: Date
      endDate?: Date | null
      current?: boolean
      description?: string
    } = {}

    if (validatedData.company !== undefined) updateData.company = validatedData.company
    if (validatedData.position !== undefined) updateData.position = validatedData.position
    if (validatedData.startDate !== undefined) updateData.startDate = new Date(validatedData.startDate)
    if (validatedData.endDate !== undefined) updateData.endDate = validatedData.endDate ? new Date(validatedData.endDate) : null
    if (validatedData.current !== undefined) updateData.current = validatedData.current
    if (validatedData.description !== undefined) updateData.description = validatedData.description

    const experience = await prisma.experience.update({
      where: { id: parseInt(id) },
      data: updateData,
    })

    return NextResponse.json(experience)
  } catch (error) {
    console.error('PUT experience error:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

// DELETE - Delete experience
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await prisma.experience.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}