export interface Experience {
  id: number
  company: string
  position: string
  location: string | null
  startDate: Date
  endDate: Date | null
  current: boolean
  description: string
  order: number
}

export interface ExperienceCreateInput {
  company: string
  position: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
}

export interface ExperienceUpdateInput {
  company?: string
  position?: string
  location?: string
  startDate?: string
  endDate?: string
  current?: boolean
  description?: string
  order?: number
}