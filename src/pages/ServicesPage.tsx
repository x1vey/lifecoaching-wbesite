import { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import ServicesSection from '../components/ServicesSection'
import FAQSection from '../components/FAQSection'
import ContactSection from '../components/ContactSection'
import { services } from '../data/services'

export default function ServicesPage() {
  useEffect(() => {
    document.title = 'Services | Wellness Coaching'
  }, [])

  return (
    <>
      <header>
        <HeroSection
          headline="Healing modalities for your well-being."
          backgroundImage="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=1600&fit=crop"
        />
      </header>
      
      <main className="flex-1">
        <section id="services-list">
          <ServicesSection services={services} />
        </section>

        <section id="faqs">
          <FAQSection />
        </section>

        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </>
  )
}
