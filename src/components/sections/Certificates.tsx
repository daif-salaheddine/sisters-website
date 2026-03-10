import { Certificate } from '@prisma/client'
import { formatDate } from '@/lib/utils'
import { Award, ExternalLink } from 'lucide-react'

interface CertificatesProps {
  certificates: Certificate[]
}

export function Certificates({ certificates }: CertificatesProps) {
  const sorted = [...certificates].sort((a, b) => a.order - b.order)

  return (
    <section id="certificates" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-3xl font-bold text-gray-900 text-center">
          Certificates
        </h2>

        <div className="mx-auto max-w-4xl grid md:grid-cols-2 gap-6">
          {sorted.map(cert => (
            <div
              key={cert.id}
              className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{cert.title}</h3>
                <p className="text-sm text-gray-600">{cert.issuer}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(cert.date)}
                </p>
                {cert.fileUrl && (
                  <a
                    href={cert.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 hover:underline"
                  >
                    View Certificate <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}

          {sorted.length === 0 && (
            <p className="col-span-2 text-center text-gray-500">
              No certificates added yet.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}