export interface Certificate {
  id: number
  name: string
  issuer: string
  date: Date
  file: string | null
  url: string | null
  description: string | null
  order: number
}

export interface CertificateCreateInput {
  name: string
  issuer: string
  date: string
  file?: string
  url?: string
  description?: string
}

export interface CertificateUpdateInput {
  name?: string
  issuer?: string
  date?: string
  file?: string
  url?: string
  description?: string
  order?: number
}