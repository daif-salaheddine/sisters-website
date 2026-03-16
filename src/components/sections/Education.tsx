'use client'

import { useEffect, useRef, useState } from 'react'
import { Education } from '@prisma/client'
import { formatDateRange } from '@/lib/utils'

interface EducationSectionProps {
  educations: Education[]
}

export function EducationSection({ educations }: EducationSectionProps) {
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

  const sorted = [...educations].sort((a, b) => a.order - b.order)

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-24 md:py-32 bg-cream-200 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 zellige-pattern opacity-30" />

      <div className="relative container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gold-500 tracking-widest uppercase text-sm mb-4">
            Academic Background
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink-900">Education</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {sorted.map((edu, index) => (
            <div
              key={edu.id}
              className={`relative pl-10 md:pl-12 pb-12 last:pb-0 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Timeline Line */}
              {index !== sorted.length - 1 && (
                <div className="absolute left-[7px] md:left-[9px] top-6 h-full w-px bg-gradient-to-b from-gold-400 via-terracotta-400 to-transparent" />
              )}

              {/* Timeline Dot */}
              <div className="absolute left-0 top-1.5 w-4 h-4 md:w-5 md:h-5 rounded-full bg-cream-200 border-2 border-gold-500 shadow-sm" />

              {/* Content Card */}
              <div className="group bg-cream-100/80 hover:bg-cream-100 border border-sand-200 hover:border-gold-400/40 rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-ink-900 mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-terracotta-500 font-medium">
                      {edu.field} <span className="text-ink-400">•</span> {edu.school}
                    </p>
                  </div>
                  <span className="text-sm text-ink-500 bg-cream-200 px-4 py-1.5 rounded-full border border-sand-200 font-light">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </span>
                </div>

                {/* Description */}
                {edu.description && (
                  <p className="text-ink-600 leading-relaxed font-light">
                    {edu.description}
                  </p>
                )}
              </div>
            </div>
          ))}

          {sorted.length === 0 && (
            <p className="text-center text-ink-500 font-light">No education added yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}