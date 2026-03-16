'use client'

import { useEffect, useRef, useState } from 'react'
import { Experience } from '@prisma/client'
import { formatDateRange } from '@/lib/utils'

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const sorted = [...experiences].sort((a, b) => a.order - b.order)

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 md:py-32 bg-cream-100 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gold-500 tracking-widest uppercase text-sm mb-4">
            Career Journey
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink-900">Work Experience</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {sorted.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative pl-10 md:pl-12 pb-12 last:pb-0 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Timeline Line */}
              {index !== sorted.length - 1 && (
                <div className="absolute left-[7px] md:left-[9px] top-6 h-full w-px bg-gradient-to-b from-terracotta-400 via-gold-400 to-transparent" />
              )}

              {/* Timeline Dot */}
              <div className="absolute left-0 top-1.5 w-4 h-4 md:w-5 md:h-5 rounded-full bg-cream-100 border-2 border-terracotta-500 shadow-sm" />

              {/* Content Card */}
              <div className="group bg-cream-200/50 hover:bg-cream-100 border border-sand-200 hover:border-gold-400/40 rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-ink-900 mb-1">
                      {exp.position}
                    </h3>
                    <p className="text-terracotta-500 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-ink-500 bg-cream-100 px-4 py-1.5 rounded-full border border-sand-200 font-light">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-ink-600 leading-relaxed whitespace-pre-line font-light">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}

          {sorted.length === 0 && (
            <p className="text-center text-ink-500 font-light">No experience added yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}