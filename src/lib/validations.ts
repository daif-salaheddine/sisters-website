import { z } from 'zod'

// Profile validation
export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  title: z.string().min(1, 'Title is required').max(100),
  intro: z.string().min(1, 'Intro is required').max(500),
  about: z.string().min(1, 'About is required').max(2000),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
  github: z.string().url('Invalid URL').optional().or(z.literal('')),
})

// Experience validation
export const experienceSchema = z.object({
  company: z.string().min(1, 'Company is required').max(100),
  position: z.string().min(1, 'Position is required').max(100),
  location: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().or(z.literal('')),
  current: z.boolean().default(false),
  description: z.string().min(1, 'Description is required').max(2000),
})

// Education validation
export const educationSchema = z.object({
  school: z.string().min(1, 'School is required').max(100),
  degree: z.string().min(1, 'Degree is required').max(100),
  field: z.string().min(1, 'Field is required').max(100),
  location: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().or(z.literal('')),
  current: z.boolean().default(false),
  description: z.string().optional(),
})

// Certificate validation
export const certificateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  issuer: z.string().min(1, 'Issuer is required').max(100),
  date: z.string().min(1, 'Date is required'),
  url: z.string().url('Invalid URL').optional().or(z.literal('')),
  description: z.string().optional(),
})

// Skill validation
export const skillSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
  level: z.number().min(0).max(100),
  category: z.enum(['technical', 'soft', 'tools', 'other']),
})

// Language validation
export const languageSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
  level: z.enum(['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic']),
})

// Login validation
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Type exports
export type ProfileInput = z.infer<typeof profileSchema>
export type ExperienceInput = z.infer<typeof experienceSchema>
export type EducationInput = z.infer<typeof educationSchema>
export type CertificateInput = z.infer<typeof certificateSchema>
export type SkillInput = z.infer<typeof skillSchema>
export type LanguageInput = z.infer<typeof languageSchema>
export type LoginInput = z.infer<typeof loginSchema>