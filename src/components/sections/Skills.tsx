'use client'

import { useEffect, useRef, useState } from 'react'
import { Skill } from '@prisma/client'
import { ProgressBar } from '@/components/ui/ProgressBar'

interface SkillsProps {
  skills: Skill[]
}

export function Skills({ skills }: SkillsProps) {
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

  const categories = {
    technical: skills.filter(s => s.category === 'technical'),
    soft: skills.filter(s => s.category === 'soft'),
    tools: skills.filter(s => s.category === 'tools'),
  }

  return (
    <section
      ref={sectionRef}
      id="skills"
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
            Expertise
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink-900">Skills & Abilities</h2>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Technical Skills */}
          {categories.technical.length > 0 && (
            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="font-serif text-2xl text-ink-800 mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-terracotta-500" />
                Technical Skills
              </h3>
              <div className="space-y-6">
                {categories.technical
                  .sort((a, b) => a.order - b.order)
                  .map(skill => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-2">
                        <span className="text-ink-700 font-medium">{skill.name}</span>
                        <span className="text-ink-500 text-sm font-light">{skill.level}%</span>
                      </div>
                      <ProgressBar value={skill.level} />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Soft Skills */}
          {categories.soft.length > 0 && (
            <div
              className={`transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="font-serif text-2xl text-ink-800 mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-gold-500" />
                Soft Skills
              </h3>
              <div className="space-y-6">
                {categories.soft
                  .sort((a, b) => a.order - b.order)
                  .map(skill => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-2">
                        <span className="text-ink-700 font-medium">{skill.name}</span>
                        <span className="text-ink-500 text-sm font-light">{skill.level}%</span>
                      </div>
                      <ProgressBar value={skill.level} />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Tools & Technologies */}
          {categories.tools.length > 0 && (
            <div
              className={`md:col-span-2 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="font-serif text-2xl text-ink-800 mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-gold-500" />
                Tools & Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {categories.tools
                  .sort((a, b) => a.order - b.order)
                  .map((skill, index) => (
                    <span
                      key={skill.id}
                      className="px-5 py-2.5 bg-cream-100 text-ink-700 text-sm font-medium border border-sand-300 rounded-full hover:border-terracotta-400 hover:text-terracotta-600 transition-all cursor-default"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {skill.name}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}