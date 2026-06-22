import { useEffect } from 'react'
import ServicesSection from '../components/ServicesSection'
import { services } from '../data/services'

export default function ServicesPage() {
  useEffect(() => {
    document.title = 'Services | Wellness Coaching'
  }, [])

  return (
    <main className="flex-1 pt-16">
      <ServicesSection services={services} />
    </main>
  )
}
