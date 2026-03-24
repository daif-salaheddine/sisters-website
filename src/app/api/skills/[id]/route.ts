import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { skillSchema } from '@/lib/validations'

// GET - Fetch single skill
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const skill = await prisma.skill.findUnique({
      where: { id: parseInt(id) },
    })
    return NextResponse.json(skill)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

// PUT - Update skill
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
    const validatedData = skillSchema.partial().parse(body)

    const updateData: {
      name?: string
      level?: number
      category?: string
    } = {}

    if (validatedData.name !== undefined) updateData.name = validatedData.name
    if (validatedData.level !== undefined) updateData.level = validatedData.level
    if (validatedData.category !== undefined) updateData.category = validatedData.category

    const skill = await prisma.skill.update({
      where: { id: parseInt(id) },
      data: updateData,
    })

    return NextResponse.json(skill)
  } catch (error) {
    console.error('PUT skill error:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

// DELETE - Delete skill
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
    await prisma.skill.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}