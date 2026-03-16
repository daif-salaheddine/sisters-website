'use client'

import { useEffect, useRef, useState } from 'react'
import { Certificate } from '@prisma/client'
import { formatDate } from '@/lib/utils'
import { Award, ExternalLink } from 'lucide-react'

interface CertificatesProps {
  certificates: Certificate[]
}

export function Certificates({ certificates }: CertificatesProps) {
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

  const sorted = [...certificates].sort((a, b) => a.order - b.order)

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="relative py-24 md:py-32 bg-cream-100 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gold-500 tracking-widest uppercase text-sm mb-4">
            Recognition
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink-900">Certificates</h2>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
          {sorted.map((cert, index) => (
            <div
              key={cert.id}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative bg-cream-200/50 hover:bg-cream-100 border border-sand-200 hover:border-gold-400/40 rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-xl">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold-400/10 to-transparent transform rotate-45 translate-x-12 -translate-y-12" />
                </div>

                {/* Content */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-terracotta-400 to-terracotta-500 rounded-xl flex items-center justify-center shadow-sm">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg text-ink-900 mb-1 group-hover:text-terracotta-600 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-ink-600 font-medium text-sm">{cert.issuer}</p>
                    <p className="text-ink-400 text-sm mt-2 font-light">
                      {formatDate(cert.date)}
                    </p>
                    {cert.fileUrl && (
                      <a
                        href={cert.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-3 text-sm text-gold-600 hover:text-terracotta-500 transition-colors font-medium"
                      >
                        View Certificate <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {sorted.length === 0 && (
            <div className="md:col-span-2 text-center py-12">
              <p className="text-ink-500 font-light">No certificates added yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}