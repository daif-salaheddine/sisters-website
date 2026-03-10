import { Education } from '@prisma/client'
import { formatDateRange } from '@/lib/utils'
import { GraduationCap } from 'lucide-react'

interface EducationSectionProps {
  educations: Education[]
}

export function EducationSection({ educations }: EducationSectionProps) {
  const sorted = [...educations].sort((a, b) => a.order - b.order)

  return (
    <section id="education" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-3xl font-bold text-gray-900 text-center">
          Education
        </h2>

        <div className="mx-auto max-w-3xl">
          {sorted.map((edu, index) => (
            <div key={edu.id} className="relative pl-8 pb-8 last:pb-0">
              {/* Timeline line */}
              {index !== sorted.length - 1 && (
                <div className="absolute left-0 top-2 h-full w-0.5 bg-gray-300" />
              )}

              {/* Dot */}
              <div className="absolute left-0 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-green-600 border-4 border-gray-50" />

              {/* Content */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-green-600 font-medium">{edu.school}</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-gray-600 mt-2">{edu.description}</p>
                )}
              </div>
            </div>
          ))}

          {sorted.length === 0 && (
            <p className="text-center text-gray-500">No education added yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}