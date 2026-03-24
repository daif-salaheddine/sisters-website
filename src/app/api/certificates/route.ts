import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { certificateSchema } from '@/lib/validations'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET /api/certificates - List all certificates
export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(certificates)
  } catch (error) {
    console.error('GET certificates error:', error)
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 })
  }
}

// POST /api/certificates - Create a new certificate
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = certificateSchema.parse(body)

    // Get the max order value to append new certificate at the end
    const maxOrder = await prisma.certificate.aggregate({
      _max: { order: true },
    })

    const certificate = await prisma.certificate.create({
      data: {
        title: validatedData.title,
        issuer: validatedData.issuer,
        date: new Date(validatedData.date),
        fileUrl: validatedData.fileUrl ?? null,
        order: (maxOrder._max.order ?? -1) + 1,
      },
    })

    return NextResponse.json(certificate)
  } catch (error) {
    console.error('POST certificate error:', error)
    return NextResponse.json({ error: 'Failed to create certificate' }, { status: 500 })
  }
}