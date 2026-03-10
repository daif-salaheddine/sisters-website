import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Briefcase, GraduationCap, Award, Globe, Wrench } from 'lucide-react'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/admin/login')
  }

  // Get counts
  const [experiences, educations, skills, certificates, languages] = await Promise.all([
    prisma.experience.count(),
    prisma.education.count(),
    prisma.skill.count(),
    prisma.certificate.count(),
    prisma.language.count(),
  ])

  const cards = [
    { label: 'Experience', count: experiences, href: '/admin/experience', icon: Briefcase },
    { label: 'Education', count: educations, href: '/admin/education', icon: GraduationCap },
    { label: 'Skills', count: skills, href: '/admin/skills', icon: Wrench },
    { label: 'Certificates', count: certificates, href: '/admin/certificates', icon: Award },
    { label: 'Languages', count: languages, href: '/admin/languages', icon: Globe },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.href}
              href={card.href}
              className="bg-white p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{card.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.count}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/profile"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            View Website
          </Link>
        </div>
      </div>
    </div>
  )
}