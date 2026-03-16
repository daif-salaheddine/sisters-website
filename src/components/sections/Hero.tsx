'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Profile } from '@prisma/client'

interface HeroProps {
  profile: Profile
}

export function Hero({ profile }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-cream-200">
        <div className="absolute inset-0 zellige-pattern opacity-50" />
      </div>

      {/* Decorative Arch */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] border-[1.5px] border-gold-400/30 rounded-t-full border-b-0 pointer-events-none" />
      <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[300px] h-[150px] border-[1px] border-gold-400/20 rounded-t-full border-b-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-24">
        <div className="flex flex-col items-center text-center">
          {/* Profile Photo */}
          <div
            className={`relative mb-10 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Decorative Ring */}
            <div className="absolute -inset-3 rounded-full border border-gold-400/40" />
            <div className="absolute -inset-6 rounded-full border border-gold-400/20" />

            <div className="relative h-44 w-44 overflow-hidden rounded-full bg-sand-200 shadow-xl ring-4 ring-cream-100">
              {profile.photo ? (
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  width={176}
                  height={176}
                  className="h-full w-full object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sand-300 to-sand-400">
                  <span className="font-serif text-5xl text-ink-400">
                    {profile.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Name & Title */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="mb-3 font-serif text-5xl md:text-6xl lg:text-7xl text-ink-900 tracking-tight">
              {profile.name}
            </h1>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-gold-400" />
              <p className="text-lg md:text-xl text-terracotta-500 font-light tracking-widest uppercase">
                {profile.jobTitle}
              </p>
              <div className="h-px w-12 bg-gold-400" />
            </div>
          </div>

          {/* Contact Badges */}
          <div
            className={`flex flex-wrap items-center justify-center gap-6 md:gap-8 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-ink-600 hover:text-terracotta-500 transition-colors group"
              >
                <Mail className="w-4 h-4 text-gold-500 group-hover:text-terracotta-500 transition-colors" />
                <span className="text-sm font-light">{profile.email}</span>
              </a>
            )}
            {profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-2 text-ink-600 hover:text-terracotta-500 transition-colors group"
              >
                <Phone className="w-4 h-4 text-gold-500 group-hover:text-terracotta-500 transition-colors" />
                <span className="text-sm font-light">{profile.phone}</span>
              </a>
            )}
            {profile.location && (
              <span className="flex items-center gap-2 text-ink-600">
                <MapPin className="w-4 h-4 text-gold-500" />
                <span className="text-sm font-light">{profile.location}</span>
              </span>
            )}
          </div>

          {/* Scroll Indicator */}
          <div
            className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-ink-500 tracking-widest uppercase">Scroll</span>
              <div className="w-px h-8 bg-gradient-to-b from-gold-400 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}