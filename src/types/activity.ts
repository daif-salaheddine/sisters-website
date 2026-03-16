export interface Activity {
  id: number
  title: string
  description: string
  imageUrl: string
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface ActivityCreateInput {
  title: string
  description: string
  image?: string
}

export interface ActivityUpdateInput {
  title?: string
  description?: string
  imageUrl?: string
  order?: number
}