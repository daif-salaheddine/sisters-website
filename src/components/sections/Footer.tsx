import { Profile } from '@prisma/client'

interface FooterProps {
  profile: Profile
}

export function Footer({ profile }: FooterProps) {
  return (
    <footer className="py-8 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}