// Constants for the CV website

export const SITE_NAME = 'Ibtissam - Portfolio'
export const SITE_DESCRIPTION = 'Professional portfolio and CV website'

export const SKILL_CATEGORIES = [
  { value: 'technical', label: 'Technical Skills' },
  { value: 'soft', label: 'Soft Skills' },
  { value: 'tools', label: 'Tools & Technologies' },
  { value: 'other', label: 'Other' },
] as const

export const LANGUAGE_LEVELS = [
  { value: 'Native', label: 'Native' },
  { value: 'Fluent', label: 'Fluent' },
  { value: 'Advanced', label: 'Advanced' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Basic', label: 'Basic' },
] as const

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'image/jpeg', 'image/png']

export const UPLOAD_DIR = {
  profile: 'public/uploads/profile',
  certificates: 'public/uploads/certificates',
}