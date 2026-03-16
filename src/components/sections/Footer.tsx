'use client'

import { Profile } from '@prisma/client'

interface FooterProps {
  profile: Profile
}

export function Footer({ profile }: FooterProps) {
  return (
    <footer className="relative py-12 bg-ink-900 overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 zellige-pattern" />
      </div>

      <div className="relative container mx-auto px-6 lg:px-12">
        <div className="text-center">
          {/* Logo/Name */}
          <h3 className="font-serif text-2xl text-cream-100 mb-4 tracking-wide">
            {profile.name}
          </h3>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-gold-400/50" />
            <div className="w-2 h-2 rounded-full bg-terracotta-500" />
            <div className="w-8 h-px bg-gold-400/50" />
          </div>

          {/* Tagline */}
          <p className="text-cream-100/60 font-light mb-8">
            {profile.jobTitle}
          </p>

          {/* Copyright */}
          <p className="text-cream-100/40 text-sm font-light">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>

          {/* Credit */}
          <p className="text-cream-100/30 text-xs mt-4 font-light">
            Crafted with elegance
          </p>
        </div>
      </div>
    </footer>
  )
}