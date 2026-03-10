import { Skill } from '@prisma/client'
import { ProgressBar } from '@/components/ui/ProgressBar'

interface SkillsProps {
  skills: Skill[]
}

export function Skills({ skills }: SkillsProps) {
  const categories = {
    technical: skills.filter(s => s.category === 'technical'),
    soft: skills.filter(s => s.category === 'soft'),
    tools: skills.filter(s => s.category === 'tools'),
  }

  return (
    <section id="skills" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-3xl font-bold text-gray-900 text-center">
          Skills
        </h2>

        <div className="mx-auto max-w-4xl grid md:grid-cols-2 gap-8">
          {/* Technical Skills */}
          {categories.technical.length > 0 && (
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Technical Skills
              </h3>
              <div className="space-y-4">
                {categories.technical
                  .sort((a, b) => a.order - b.order)
                  .map(skill => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <ProgressBar value={skill.level} />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Soft Skills */}
          {categories.soft.length > 0 && (
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Soft Skills
              </h3>
              <div className="space-y-4">
                {categories.soft
                  .sort((a, b) => a.order - b.order)
                  .map(skill => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <ProgressBar value={skill.level} />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Tools */}
          {categories.tools.length > 0 && (
            <div className="md:col-span-2">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Tools & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.tools
                  .sort((a, b) => a.order - b.order)
                  .map(skill => (
                    <span
                      key={skill.id}
                      className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200"
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