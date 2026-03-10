import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data first
  await prisma.language.deleteMany()
  await prisma.certificate.deleteMany()
  await prisma.education.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.skill.deleteMany()

  // Create default profile
  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Ibtissam',
      jobTitle: 'Professional Title',
      about: 'I am a dedicated professional with expertise in my field. I am passionate about continuous learning and delivering high-quality work.',
      email: 'ibtissam@example.com',
      phone: '+1 234 567 890',
      location: 'City, Country',
    },
  })

  // Create sample skills
  await prisma.skill.createMany({
    data: [
      { name: 'JavaScript', level: 90, category: 'technical', order: 0 },
      { name: 'React', level: 85, category: 'technical', order: 1 },
      { name: 'TypeScript', level: 80, category: 'technical', order: 2 },
      { name: 'Node.js', level: 75, category: 'technical', order: 3 },
      { name: 'Communication', level: 95, category: 'soft', order: 0 },
      { name: 'Team Leadership', level: 85, category: 'soft', order: 1 },
      { name: 'Problem Solving', level: 90, category: 'soft', order: 2 },
      { name: 'Git', level: 85, category: 'tools', order: 0 },
      { name: 'VS Code', level: 90, category: 'tools', order: 1 },
    ],
  })

  // Create sample experience
  await prisma.experience.createMany({
    data: [
      {
        company: 'Company Name',
        position: 'Job Title',
        startDate: new Date('2022-01-01'),
        current: true,
        description: '• Led development of key projects\n• Collaborated with cross-functional teams\n• Improved processes and efficiency',
        order: 0,
      },
      {
        company: 'Previous Company',
        position: 'Previous Role',
        startDate: new Date('2020-01-01'),
        endDate: new Date('2021-12-31'),
        current: false,
        description: '• Developed innovative solutions\n• Managed team projects\n• Delivered results on time',
        order: 1,
      },
    ],
  })

  // Create sample education
  await prisma.education.createMany({
    data: [
      {
        school: 'University Name',
        degree: 'Bachelor',
        field: 'Computer Science',
        startDate: new Date('2016-09-01'),
        endDate: new Date('2020-06-30'),
        description: 'Graduated with honors',
        order: 0,
      },
    ],
  })

  // Create sample languages
  await prisma.language.createMany({
    data: [
      { name: 'Arabic', level: 'Native', order: 0 },
      { name: 'French', level: 'Fluent', order: 1 },
      { name: 'English', level: 'Fluent', order: 2 },
    ],
  })

  console.log('✅ Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })