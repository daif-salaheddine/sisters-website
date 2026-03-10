export interface Education {
  id: number
  school: string
  degree: string
  field: string
  location: string | null
  startDate: Date
  endDate: Date | null
  current: boolean
  description: string | null
  order: number
}

export interface EducationCreateInput {
  school: string
  degree: string
  field: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  description?: string
}

export interface EducationUpdateInput {
  school?: string
  degree?: string
  field?: string
  location?: string
  startDate?: string
  endDate?: string
  current?: boolean
  description?: string
  order?: number
}