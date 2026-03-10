export interface Language {
  id: number
  name: string
  level: string
  order: number
}

export interface LanguageCreateInput {
  name: string
  level: string
}

export interface LanguageUpdateInput {
  name?: string
  level?: string
  order?: number
}