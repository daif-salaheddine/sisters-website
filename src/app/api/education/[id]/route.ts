import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { educationSchema } from '@/lib/validations'

// GET - Fetch single education
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const education = await prisma.education.findUnique({
      where: { id: parseInt(id) },
    })
    return NextResponse.json(education)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

// PUT - Update education
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
    const validatedData = educationSchema.partial().parse(body)

    const updateData: {
      school?: string
      degree?: string
      field?: string
      location?: string | null
      startDate?: Date
      endDate?: Date | null
      current?: boolean
      description?: string | null
    } = {}

    if (validatedData.school !== undefined) updateData.school = validatedData.school
    if (validatedData.degree !== undefined) updateData.degree = validatedData.degree
    if (validatedData.field !== undefined) updateData.field = validatedData.field
    if (validatedData.location !== undefined) updateData.location = validatedData.location ?? null
    if (validatedData.startDate !== undefined) updateData.startDate = new Date(validatedData.startDate)
    if (validatedData.endDate !== undefined) updateData.endDate = validatedData.endDate ? new Date(validatedData.endDate) : null
    if (validatedData.current !== undefined) updateData.current = validatedData.current
    if (validatedData.description !== undefined) updateData.description = validatedData.description ?? null

    const education = await prisma.education.update({
      where: { id: parseInt(id) },
      data: updateData,
    })

    return NextResponse.json(education)
  } catch (error) {
    console.error('PUT education error:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

// DELETE - Delete education
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
    await prisma.education.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}