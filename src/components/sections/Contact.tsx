import { Profile } from '@prisma/client'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

interface ContactProps {
  profile: Profile
}

export function Contact({ profile }: ContactProps) {
  return (
    <section id="contact" className="py-16 bg-blue-600">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold text-white text-center">
          Get In Touch
        </h2>

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-blue-100 mb-8">
            Feel free to reach out for collaborations or just a friendly hello!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors"
              >
                <Mail className="w-5 h-5" />
                {profile.email}
              </a>
            )}
            {profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors"
              >
                <Phone className="w-5 h-5" />
                {profile.phone}
              </a>
            )}
            {profile.location && (
              <span className="flex items-center gap-2 text-white">
                <MapPin className="w-5 h-5" />
                {profile.location}
              </span>
            )}
          </div>

          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            <Send className="w-5 h-5" />
            Send Message
          </a>
        </div>
      </div>
    </section>
  )
}