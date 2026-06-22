import { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'
import TestimonialsSection from '../components/TestimonialsSection'
import FAQSection from '../components/FAQSection'
import ContactSection from '../components/ContactSection'
import AboutMeSection from '../components/AboutMeSection'
import { services } from '../data/services'
import { testimonials } from '../data/testimonials'

export default function HomePage() {
  useEffect(() => {
    document.title = 'Home | Emora Suara'
  }, [])

  return (
    <>
      <header>
        <HeroSection
          headline="Nurturing peace through sound and meditation."
          backgroundImage="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&h=1600&fit=crop"
        />
      </header>

      <main className="flex-1">
        <section id="about">
          <AboutSection
            photo="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=480&h=560&fit=crop"
            photoAlt="Wellness coach in a serene studio"
            bio="I am deeply passionate about holding safe spaces in sound and conscious silence for relaxation, peace, healing and meditation. My journey into sound goes back to my ancestral roots, through my parents who are from North Sulawesi, Indonesia."
            ctaLabel="Read more"
            ctaHref="https://www.emorasuara.com/story"
          />
        </section>

        <section id="services">
          <ServicesSection services={services} />
        </section>

        <section id="testimonials">
          <TestimonialsSection testimonials={testimonials} />
        </section>

        <section id="faqs">
          <FAQSection />
        </section>

        <section id="author">
          <AboutMeSection />
        </section>

        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </>
  )
}
