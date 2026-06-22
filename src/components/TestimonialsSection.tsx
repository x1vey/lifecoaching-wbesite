import type { Testimonial } from '../types'
import TestimonialCard from './TestimonialCard'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="pt-16 pb-32 bg-brand-50 border-t border-brand-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
        <div className="max-w-2xl mb-24 reveal text-right ml-auto">
          <p className="text-[10px] uppercase tracking-super-wide text-brand-600 font-medium mb-6">Testimonials</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-brand-900 leading-tight">
            Voices of <span className="italic">resonance</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div key={t.id} style={{ transitionDelay: `${index * 0.1}s` }}>
              <TestimonialCard
                quote={t.quote}
                clientName={t.clientName}
                avatar={t.avatarUrl}
                avatarAlt={t.avatarAlt}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
