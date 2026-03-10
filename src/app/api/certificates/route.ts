import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET - Fetch all certificates
export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(certificates)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch certificates' },
      { status: 500 }
    )
  }
}

// POST - Create new certificate
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const maxOrder = await prisma.certificate.count()

    const certificate = await prisma.certificate.create({
      data: {
        ...data,
        date: new Date(data.date),
        order: maxOrder,
      },
    })

    return NextResponse.json(certificate)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create certificate' },
      { status: 500 }
    )
  }
}