import { prisma } from '@/lib/db'
import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { ExperienceSection } from '@/components/sections/Experience'
import { EducationSection } from '@/components/sections/Education'
import { Certificates } from '@/components/sections/Certificates'
import { Languages } from '@/components/sections/Languages'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

export default async function HomePage() {
  // Fetch all data in parallel
  const [profile, skills, experiences, educations, certificates, languages] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 1 } }),
    prisma.skill.findMany({ orderBy: { order: 'asc' } }),
    prisma.experience.findMany({ orderBy: { order: 'asc' } }),
    prisma.education.findMany({ orderBy: { order: 'asc' } }),
    prisma.certificate.findMany({ orderBy: { order: 'asc' } }),
    prisma.language.findMany({ orderBy: { order: 'asc' } }),
  ])

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Profile Found</h1>
          <p className="text-gray-600">Please run the database seed script.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills skills={skills} />
        <ExperienceSection experiences={experiences} />
        <EducationSection educations={educations} />
        <Certificates certificates={certificates} />
        <Languages languages={languages} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  )
}