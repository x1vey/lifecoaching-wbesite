export interface CoachingService {
  id: string
  title: string
  description: string
  benefits: string[]
  ctaLabel: string
  ctaHref: string
}

export interface Testimonial {
  id: string
  quote: string
  clientName: string
  avatarUrl?: string
  avatarAlt?: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImageUrl: string
  coverImageAlt: string
  publishedAt: string // ISO 8601 date string
  author: string
}

export interface ContactFormValues {
  name: string
  email: string
  subject: string
  message: string
}
