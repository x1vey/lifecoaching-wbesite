import { useEffect } from 'react'
import AboutSection from '../components/AboutSection'

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About | Wellness Coaching'
  }, [])

  return (
    <main className="flex-1 pt-16">
      <AboutSection
        photo="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=480&h=560&fit=crop"
        photoAlt="Wellness coach smiling in a bright studio"
        bio="Hi, I'm Coach Alex — a certified wellness coach with over a decade of experience helping people reclaim their energy, reduce stress, and build lasting healthy habits. My approach is holistic, compassionate, and grounded in evidence-based practices."
        credentials={[
          'Certified Wellness Coach (NASM)',
          'Precision Nutrition Level 2',
          'Mindfulness-Based Stress Reduction (MBSR) Practitioner',
          '10+ years coaching experience',
        ]}
        ctaLabel="Book a Free Consultation"
        ctaHref="/contact"
      />
    </main>
  )
}
