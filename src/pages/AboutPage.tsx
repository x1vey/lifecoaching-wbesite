import { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import AboutMeSection from '../components/AboutMeSection'
import TestimonialsSection from '../components/TestimonialsSection'
import ContactSection from '../components/ContactSection'
import { testimonials } from '../data/testimonials'

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About | Wellness Coaching'
  }, [])

  return (
    <>
      <header>
        <HeroSection
          headline="Discover the journey to inner peace."
          backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=1600&fit=crop"
        />
      </header>

      <main className="flex-1">
        <section id="about-intro">
          <AboutSection
            photo="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=480&h=560&fit=crop"
            photoAlt="Wellness coach smiling in a bright studio"
            bio="Hi, I'm Coach Alex — a certified wellness coach with over a decade of experience helping people reclaim their energy, reduce stress, and build lasting healthy habits. My approach is holistic, compassionate, and grounded in evidence-based practices."
            ctaLabel="Book a Free Consultation"
            ctaHref="/contact"
          />
        </section>

        <section id="about-me">
          <AboutMeSection />
        </section>

        <section id="testimonials">
          <TestimonialsSection testimonials={testimonials} />
        </section>

        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </>
  )
}
