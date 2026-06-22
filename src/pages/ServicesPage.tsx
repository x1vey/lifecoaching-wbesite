import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from '../components/HeroSection'
import { services } from '../data/services'

gsap.registerPlugin(ScrollTrigger)

const PROCESS_STEPS = [
  { step: '01', title: 'Arrival & Grounding', desc: 'Settle into the space, disconnect from the outside world, and set your intentions for the session.' },
  { step: '02', title: 'Sonic Immersion', desc: 'Lie back as the resonant frequencies of singing bowls and gongs wash over you, shifting your brainwaves into deep relaxation.' },
  { step: '03', title: 'Integration', desc: 'Slowly return to waking consciousness, carrying the profound stillness and clarity into your daily life.' }
]

export default function ServicesPage() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Animate Service Blocks
    const serviceBlocks = gsap.utils.toArray('.service-block')
    serviceBlocks.forEach((block: any, i) => {
      const isEven = i % 2 === 0
      
      gsap.from(block.querySelector('.service-img'), {
        scrollTrigger: {
          trigger: block,
          start: 'top 75%',
        },
        x: isEven ? -50 : 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      })

      gsap.from(block.querySelector('.service-text'), {
        scrollTrigger: {
          trigger: block,
          start: 'top 75%',
        },
        x: isEven ? 50 : -50,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: 'power3.out'
      })
    })

    // Animate Process Steps
    gsap.from('.process-step', {
      scrollTrigger: {
        trigger: '.process-trigger',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: 'power2.out'
    })
  }, { scope: container })

  return (
    <div ref={container} className="bg-brand-50 text-brand-900 overflow-x-hidden">
      <header>
        <HeroSection
          headline="Immerse in profound stillness."
          backgroundImage="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1200&h=1600&fit=crop"
        />
      </header>

      <main className="flex-1">
        {/* SERVICES VERTICAL STACK */}
        <section className="py-24 px-6 lg:px-20 max-w-[1440px] mx-auto space-y-32">
          {services.map((service, idx) => {
            const isEven = idx % 2 === 0
            // Provide contextually relevant images based on the index/topic
            const images = [
              "https://images.unsplash.com/photo-1608681283626-44474f386921?w=800&h=800&fit=crop", // singing bowl
              "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=800&fit=crop", // meditation / peace
              "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=800&fit=crop"  // relaxation/mat
            ]

            return (
              <div key={service.id} className={`service-block grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                
                {/* Image Side */}
                <div className={`overflow-hidden rounded-2xl aspect-square ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <img 
                    src={images[idx % images.length]} 
                    alt={service.title}
                    className="service-img w-full h-full object-cover"
                  />
                </div>

                {/* Text Side */}
                <div className={`service-text space-y-8 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <h2 className="text-4xl md:text-5xl font-serif leading-tight">{service.title}</h2>
                  <p className="text-lg text-brand-700 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {service.benefits.length > 0 && (
                    <ul className="space-y-4">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <span className="text-brand-400 mt-1">✦</span>
                          <span className="text-brand-800">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="pt-4">
                    <a 
                      href={service.ctaHref} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-8 py-4 bg-brand-900 text-brand-50 uppercase tracking-widest text-xs hover:bg-brand-700 transition-colors"
                    >
                      {service.ctaLabel}
                    </a>
                  </div>
                </div>

              </div>
            )
          })}
        </section>

        {/* OUR PROCESS SECTION */}
        <section className="process-trigger bg-brand-900 text-brand-50 py-32 px-6 lg:px-20 mt-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-xs uppercase tracking-super-wide text-brand-400 mb-6">The Journey</h2>
              <p className="text-4xl md:text-5xl font-serif">A typical session experience.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-brand-700 z-0" />

              {PROCESS_STEPS.map((step, idx) => (
                <div key={idx} className="process-step relative z-10 bg-brand-900 pt-4">
                  <span className="text-5xl font-serif text-brand-400 block mb-6">{step.step}</span>
                  <h3 className="text-2xl font-medium mb-4">{step.title}</h3>
                  <p className="text-brand-300 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
