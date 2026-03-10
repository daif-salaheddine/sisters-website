export interface Profile {
  id: number
  name: string
  title: string
  intro: string
  about: string
  email: string
  phone: string | null
  location: string | null
  website: string | null
  linkedin: string | null
  github: string | null
  photo: string | null
}

export interface ProfileUpdateInput {
  name?: string
  title?: string
  intro?: string
  about?: string
  email?: string
  phone?: string
  location?: string
  website?: string
  linkedin?: string
  github?: string
  photo?: string
}