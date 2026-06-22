import { useEffect } from 'react'
import ContactSection from '../components/ContactSection'

export default function ContactPage() {
  useEffect(() => {
    document.title = 'Contact | Wellness Coaching'
  }, [])

  return (
    <main className="flex-1 pt-16">
      <h1 className="sr-only">Contact Us</h1>
      <ContactSection />
    </main>
  )
}
