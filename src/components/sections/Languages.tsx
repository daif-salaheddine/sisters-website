'use client'

import { useEffect, useRef, useState } from 'react'
import { Language } from '@prisma/client'
import { Globe } from 'lucide-react'

interface LanguagesProps {
  languages: Language[]
}

const levelStyles: Record<string, { bg: string; text: string; border: string }> = {
  Native: { bg: 'bg-terracotta-500', text: 'text-white', border: 'border-terracotta-500' },
  Fluent: { bg: 'bg-gold-500', text: 'text-ink-900', border: 'border-gold-500' },
  Advanced: { bg: 'bg-cream-100', text: 'text-ink-700', border: 'border-gold-400' },
  Intermediate: { bg: 'bg-sand-200', text: 'text-ink-700', border: 'border-sand-400' },
  Basic: { bg: 'bg-cream-200', text: 'text-ink-600', border: 'border-sand-300' },
}

export function Languages({ languages }: LanguagesProps) {
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

  const sorted = [...languages].sort((a, b) => a.order - b.order)

  return (
    <section
      ref={sectionRef}
      id="languages"
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
            Communication
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink-900">Languages</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {sorted.map((lang, index) => {
              const styles = levelStyles[lang.level] || levelStyles.Basic
              return (
                <div
                  key={lang.id}
                  className={`group transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative bg-cream-100/90 hover:bg-cream-100 border border-sand-200 hover:border-gold-400/50 rounded-xl px-6 py-5 transition-all duration-300 hover:shadow-lg min-w-[180px]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-terracotta-400 to-terracotta-500 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-serif text-lg text-ink-900">{lang.name}</span>
                    </div>
                    <span
                      className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${styles.bg} ${styles.text}`}
                    >
                      {lang.level}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {sorted.length === 0 && (
            <p className="text-center text-ink-500 font-light">No languages added yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}