import { Profile } from '@prisma/client'

interface AboutProps {
  profile: Profile
}

export function About({ profile }: AboutProps) {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold text-gray-900 text-center">
          About Me
        </h2>
        <div className="mx-auto max-w-3xl">
          <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
            {profile.about}
          </p>
        </div>
      </div>
    </section>
  )
}