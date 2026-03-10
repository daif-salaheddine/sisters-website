import { Language } from '@prisma/client'
import { Globe } from 'lucide-react'

interface LanguagesProps {
  languages: Language[]
}

const levelColors: Record<string, string> = {
  Native: 'bg-green-100 text-green-800',
  Fluent: 'bg-blue-100 text-blue-800',
  Advanced: 'bg-purple-100 text-purple-800',
  Intermediate: 'bg-yellow-100 text-yellow-800',
  Basic: 'bg-gray-100 text-gray-800',
}

export function Languages({ languages }: LanguagesProps) {
  const sorted = [...languages].sort((a, b) => a.order - b.order)

  return (
    <section id="languages" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-3xl font-bold text-gray-900 text-center">
          Languages
        </h2>

        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap justify-center gap-4">
            {sorted.map(lang => (
              <div
                key={lang.id}
                className="flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-sm"
              >
                <Globe className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{lang.name}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      levelColors[lang.level] || 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {lang.level}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {sorted.length === 0 && (
            <p className="text-center text-gray-500">No languages added yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}