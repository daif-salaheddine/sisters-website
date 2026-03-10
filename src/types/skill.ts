export interface Skill {
  id: number
  name: string
  level: number
  category: string
  order: number
}

export interface SkillCreateInput {
  name: string
  level: number
  category: string
}

export interface SkillUpdateInput {
  name?: string
  level?: number
  category?: string
  order?: number
}