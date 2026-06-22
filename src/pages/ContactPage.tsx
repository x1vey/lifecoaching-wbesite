import { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import ContactSection from '../components/ContactSection'
import FAQSection from '../components/FAQSection'

export default function ContactPage() {
  useEffect(() => {
    document.title = 'Contact | Wellness Coaching'
  }, [])

  return (
    <>
      <header>
        <HeroSection
          headline="Reach out to begin your transformation."
          backgroundImage="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1200&h=1600&fit=crop"
        />
      </header>

      <main className="flex-1">
        <section id="contact-form">
          <ContactSection />
        </section>

        <section id="faqs">
          <FAQSection />
        </section>
      </main>
    </>
  )
}
