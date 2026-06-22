import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from '../components/HeroSection'
import { services } from '../data/services'

gsap.registerPlugin(ScrollTrigger)

const SERVICE_IMAGES = [
  "https://images.unsplash.com/photo-1608681283626-44474f386921?w=1200&h=1600&fit=crop",
  "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1200&h=1600&fit=crop",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=1600&fit=crop"
]

const colorPalette = [
  'bg-[#5c6b54]',
  'bg-[#8b4f3f]',
  'bg-[#4a586e]'
]

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.title = 'Experiences | Emora Suara'
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each service block
      const blocks = gsap.utils.toArray('.svc-block') as HTMLElement[]
      blocks.forEach((block) => {
        const img = block.querySelector('.svc-img')
        const text = block.querySelector('.svc-text')
        const floating = block.querySelector('.svc-float')

        if (img) {
          gsap.fromTo(img,
            { scale: 1.2 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: block,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            }
          )
        }

        if (text) {
          gsap.fromTo(text,
            { y: 120, opacity: 0 },
            {
              y: -30,
              opacity: 1,
              scrollTrigger: {
                trigger: block,
                start: "top 70%",
                end: "center center",
                scrub: 1.5,
              }
            }
          )
        }

        if (floating) {
          gsap.to(floating, {
            yPercent: -50,
            rotation: 4,
            scrollTrigger: {
              trigger: block,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            }
          })
        }
      })

      // Process steps stagger
      const steps = gsap.utils.toArray('.process-step') as HTMLElement[]
      gsap.fromTo(steps,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.process-section',
            start: "top 75%",
            end: "top 30%",
            scrub: 1,
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef}>
      {/* HERO */}
      <header>
        <HeroSection
          headline="Immerse in profound stillness."
          backgroundImage="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&h=1600&fit=crop"
        />
      </header>

      {/* INTRO TEXT BAND */}
      <section className="bg-[#141512] text-[#e0e0d5] py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}} />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 reveal">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-8">Our Offerings</p>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] italic tracking-tight mb-8">
            Sound is the oldest medicine.
          </h2>
          <p className="font-light text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Each experience is designed to guide you from the chaos of the conscious mind into the profound quiet of deep awareness. No two sessions are alike — because no two bodies carry the same tension.
          </p>
        </div>
      </section>

      {/* DETAILED SERVICE BLOCKS — each one mirrors the AboutSection layout */}
      {services.map((service, idx) => {
        const isEven = idx % 2 === 0

        return (
          <section key={service.id} className={`svc-block relative min-h-[120vh] ${colorPalette[idx % colorPalette.length]} text-[#e0e0d5] py-32 overflow-hidden flex items-center z-20`}>
            {/* Grain */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}} />

            {/* Massive Background Typography */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden whitespace-nowrap select-none">
              <span className="font-serif text-[40vw] leading-none transform -rotate-12 translate-y-20 origin-center text-white mix-blend-overlay">
                {(service.title.split(' ')[0] || '').toUpperCase()}
              </span>
            </div>

            <div className="max-w-[1600px] mx-auto px-4 w-full h-full relative">
              {/* Massive Image */}
              <div className={`w-[85%] md:w-[60%] h-[75vh] overflow-hidden relative ${isEven ? 'ml-auto' : 'mr-auto'}`}>
                <img
                  src={SERVICE_IMAGES[idx % SERVICE_IMAGES.length]}
                  alt={service.title}
                  className="svc-img w-full h-full object-cover grayscale opacity-60 mix-blend-luminosity transform scale-110"
                />
              </div>

              {/* Floating Accent Image */}
              <img
                src="https://images.unsplash.com/photo-1608681283626-44474f386921?w=400&h=500&fit=crop"
                alt="Sound healing texture"
                className={`svc-float absolute top-[12%] ${isEven ? 'left-[3%]' : 'right-[3%]'} w-[22vw] md:w-[13vw] aspect-[2/3] object-cover grayscale z-10 border border-white/20 shadow-2xl`}
              />

              {/* Overlapping Text Block */}
              <div className={`svc-text absolute top-[25%] md:top-[35%] ${isEven ? 'left-4 md:left-16' : 'right-4 md:right-16'} w-[95%] md:w-[55%] z-30 mix-blend-difference`}>
                <h3 className={`font-serif text-[10vw] md:text-[7vw] tracking-tighter leading-[0.8] mb-8 text-[#e0e0d5] italic ${isEven ? 'translate-x-[-3vw]' : 'translate-x-[3vw] text-right'}`}>
                  {service.title}
                </h3>

                <div className={`bg-black/40 p-8 md:p-14 border border-white/10 backdrop-blur-md shadow-2xl ${isEven ? 'relative left-[8vw] md:left-[5vw]' : 'relative right-[8vw] md:right-[5vw]'} w-[85%] md:w-full`}>
                  <p className="font-light text-lg md:text-xl leading-[1.8] text-white/80 mb-8 border-l-2 border-white/20 pl-6">
                    {service.description}
                  </p>

                  {service.benefits.length > 0 && (
                    <ul className="space-y-3 mb-8">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-4 text-white/70 font-light">
                          <span className="w-4 h-[1px] bg-white/40" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  )}

                  <a
                    href={service.ctaHref}
                    target={service.ctaHref.includes('http') ? "_blank" : "_self"}
                    rel="noreferrer"
                    className="inline-flex items-center gap-6 text-[11px] uppercase tracking-[0.3em] font-medium hover:text-white transition-colors group"
                  >
                    <span className="w-8 h-[1px] bg-white group-hover:w-16 transition-all duration-300" />
                    {service.ctaLabel}
                  </a>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* OUR PROCESS — dark editorial timeline */}
      <section className="process-section bg-[#141512] text-[#e0e0d5] py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}} />

        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
          <div className="max-w-2xl mb-24 reveal text-right ml-auto">
            <p className="text-[10px] uppercase tracking-super-wide text-[#a3a393] font-medium mb-6">The Journey</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-[#e0e0d5] leading-tight">
              A typical <span className="italic">session</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#3b3d32]">
            {[
              { num: '01', title: 'Arrival & Grounding', desc: 'You enter the space. You leave the world behind. We begin with breathwork to anchor you in the present moment, setting intentions for what lies ahead.' },
              { num: '02', title: 'Sonic Immersion', desc: 'Lie back as the resonant frequencies of singing bowls, gongs, and voice wash over you. Your brainwaves slow from beta into theta — the threshold of deep healing.' },
              { num: '03', title: 'Integration & Return', desc: 'Slowly, gently, you are guided back. The silence that follows is not empty — it is full. You carry this stillness with you into the world outside.' }
            ].map((step) => (
              <div key={step.num} className="process-step bg-[#141512] p-10 md:p-16 group hover:bg-[#1c1c14] transition-colors duration-700">
                <span className="font-serif text-6xl md:text-7xl text-[#3b3d32] group-hover:text-[#8b4f3f] transition-colors duration-700 block mb-8">
                  {step.num}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl mb-4 group-hover:italic transition-all duration-300">{step.title}</h3>
                <p className="font-light text-lg leading-[1.8] text-[#a3a393] border-l-2 border-[#3b3d32] pl-6">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="bg-[#5c6b54] text-[#e0e0d5] py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden whitespace-nowrap select-none">
          <span className="font-serif text-[35vw] leading-none text-white mix-blend-overlay">BOOK</span>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center reveal relative z-10">
          <h2 className="font-serif text-4xl md:text-6xl mb-8 italic">Ready to surrender to sound?</h2>
          <p className="font-light text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Browse upcoming sound events or enquire about a private, bespoke session tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://events.humanitix.com/host/emora-suara-sound"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-6 text-[11px] uppercase tracking-[0.3em] font-medium hover:text-white/70 transition-colors group border border-white/30 px-12 py-5 hover:border-white/60 backdrop-blur-sm"
            >
              <span className="w-8 h-[1px] bg-white group-hover:w-16 transition-all duration-300" />
              Upcoming Events
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-6 text-[11px] uppercase tracking-[0.3em] font-medium hover:text-white/70 transition-colors group border border-white/30 px-12 py-5 hover:border-white/60 backdrop-blur-sm"
            >
              <span className="w-8 h-[1px] bg-white group-hover:w-16 transition-all duration-300" />
              Private Enquiry
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
