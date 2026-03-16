'use client'

import { useEffect, useRef, useState } from 'react'
import { Profile } from '@prisma/client'

interface AboutProps {
  profile: Profile
}

export function About({ profile }: AboutProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 bg-cream-100 overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      {/* Decorative Corner Elements */}
      <div className="absolute top-12 left-12 w-24 h-24 border-l border-t border-gold-400/20" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-r border-b border-gold-400/20" />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-gold-500 tracking-widest uppercase text-sm mb-4">Introduction</p>
            <h2 className="font-serif text-4xl md:text-5xl text-ink-900">About Me</h2>
          </div>

          {/* Content */}
          <div
            className={`relative transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Decorative Quote */}
            <div className="absolute -left-4 top-0 text-6xl text-gold-400/30 font-serif">
              "
            </div>

            <div className="relative pl-8 py-4">
              <p className="text-lg md:text-xl text-ink-700 leading-relaxed font-light whitespace-pre-line">
                {profile.about}
              </p>
            </div>
          </div>

          {/* Decorative Line */}
          <div
            className={`mt-16 flex justify-center transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gold-400" />
              <div className="w-2 h-2 rounded-full bg-terracotta-400" />
              <div className="w-2 h-2 rounded-full bg-gold-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}