import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Profile } from '@prisma/client'

interface HeroProps {
  profile: Profile
}

export function Hero({ profile }: HeroProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Profile Photo */}
          <div className="mb-6 h-40 w-40 overflow-hidden rounded-full bg-gray-200 ring-4 ring-white shadow-lg">
            {profile.photo ? (
              <Image
                src={profile.photo}
                alt={profile.name}
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-gray-400">
                {profile.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Name & Title */}
          <h1 className="mb-2 text-4xl font-bold text-gray-900 md:text-5xl">
            {profile.name}
          </h1>
          <p className="mb-4 text-xl text-blue-600 font-medium">
            {profile.jobTitle}
          </p>

          {/* Contact Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1 hover:text-blue-600"
              >
                <Mail className="h-4 w-4" />
                {profile.email}
              </a>
            )}
            {profile.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {profile.phone}
              </span>
            )}
            {profile.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}