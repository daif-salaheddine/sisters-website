import { Experience } from '@prisma/client'
import { formatDateRange } from '@/lib/utils'
import { Briefcase } from 'lucide-react'

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const sorted = [...experiences].sort((a, b) => a.order - b.order)

  return (
    <section id="experience" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-3xl font-bold text-gray-900 text-center">
          Work Experience
        </h2>

        <div className="mx-auto max-w-3xl">
          {sorted.map((exp, index) => (
            <div key={exp.id} className="relative pl-8 pb-8 last:pb-0">
              {/* Timeline line */}
              {index !== sorted.length - 1 && (
                <div className="absolute left-0 top-2 h-full w-0.5 bg-gray-200" />
              )}

              {/* Dot */}
              <div className="absolute left-0 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600 border-4 border-white" />

              {/* Content */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="text-gray-600 whitespace-pre-line mt-3">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}

          {sorted.length === 0 && (
            <p className="text-center text-gray-500">No experience added yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}