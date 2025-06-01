import { z } from 'zod'

// Contact form validation schemas
export const contactFormSchema = z.object({
  projectType: z.enum(['new-project', 'question', 'coffee-chat', 'general-inquiry']),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  
  // Conditional fields based on project type
  budget: z.string().optional(),
  timeline: z.string().optional(),
  projectDetails: z.string().optional(),
  
  // Honeypot field for spam protection
  website: z.string().max(0, 'This field should be empty').optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
})

export type NewsletterData = z.infer<typeof newsletterSchema>

// Project inquiry schema
export const projectInquirySchema = z.object({
  projectType: z.enum([
    'web-application',
    'mobile-app',
    'e-commerce',
    'api-development',
    'consultation',
    'other'
  ]),
  budget: z.enum([
    'under-10k',
    '10k-25k',
    '25k-50k',
    '50k-100k',
    'over-100k',
    'not-sure'
  ]),
  timeline: z.enum([
    'asap',
    '1-3-months',
    '3-6-months',
    '6-12-months',
    'flexible'
  ]),
  description: z.string().min(50, 'Please provide more details about your project'),
  features: z.array(z.string()).optional(),
  hasDesign: z.boolean().optional(),
  hasContent: z.boolean().optional(),
})

export type ProjectInquiryData = z.infer<typeof projectInquirySchema>

// Theme validation
export const themeNameSchema = z.enum([
  'neon-tokyo',
  'mushroom-kingdom-rain',
  'blade-runner',
  'vintage-film-noir',
  'crystalline-cave',
  'martian-sunset',
  'poison-dart-frog',
  'egyptian-gold',
  'neon-jellyfish',
  'retro-synthwave',
  'autumn-forest-fire',
  'cosmic-nebula',
  'cherry-blossom',
  'arctic-lights',
  'volcanic-lightning',
  'butterfly-wing',
  'ocean-trench',
  'solar-flare',
  'forest-spirits',
  'holographic-chrome'
])

// General validation utilities
export const validationUtils = {
  // Email validation with common patterns
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  // Phone number validation (basic)
  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/\s|-|\(|\)/g, ''))
  },

  // URL validation
  isValidURL: (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },

  // Strong password validation
  isStrongPassword: (password: string): boolean => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/
    return password.length >= 8 && strongRegex.test(password)
  },

  // Sanitize string input
  sanitizeString: (input: string): string => {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .substring(0, 1000) // Limit length
  },

  // Validate file upload
  isValidFileType: (file: File, allowedTypes: string[]): boolean => {
    return allowedTypes.includes(file.type)
  },

  isValidFileSize: (file: File, maxSizeInMB: number): boolean => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024
    return file.size <= maxSizeInBytes
  },

  // Rate limiting validation
  isRateLimited: (lastSubmission: Date, cooldownMinutes: number): boolean => {
    const now = new Date()
    const timeDiff = now.getTime() - lastSubmission.getTime()
    const cooldownMs = cooldownMinutes * 60 * 1000
    return timeDiff < cooldownMs
  },
}

// Form field validation messages
export const validationMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be no more than ${max} characters`,
  phone: 'Please enter a valid phone number',
  url: 'Please enter a valid URL',
  password: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
  fileType: 'File type not allowed',
  fileSize: (maxMB: number) => `File size must be less than ${maxMB}MB`,
  rateLimited: (minutes: number) => `Please wait ${minutes} minutes before submitting again`,
} as const

// Custom validation hooks for forms
export const createFieldValidator = (schema: z.ZodSchema) => {
  return (value: unknown) => {
    try {
      schema.parse(value)
      return { isValid: true, error: null }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { isValid: false, error: error.errors[0].message }
      }
      return { isValid: false, error: 'Validation failed' }
    }
  }
}