import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { CoachingService } from '../types'

gsap.registerPlugin(ScrollTrigger)

interface ServicesSectionProps {
  services: CoachingService[]
}

const colorPalette = [
  'bg-[#5c6b54]', // Olive Green
  'bg-[#8b4f3f]', // Rust Red/Brown
  'bg-[#4a586e]'  // Slate Blue
]

export default function ServicesSection({ services }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.horizontal-panel') as HTMLElement[]
      
      if (panels.length === 0 || !wrapperRef.current) return

      // Pin the section and scroll the wrapper horizontally
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          // Scroll distance matches exactly the horizontal distance moved
          end: () => "+=" + (window.innerWidth * (panels.length - 1)),
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#111] z-30">
      
      {/* Absolute Section Title */}
      <h2 className="absolute top-12 left-6 md:left-12 z-50 text-white mix-blend-difference font-serif text-3xl md:text-5xl italic opacity-80 pointer-events-none">
        Experiences
      </h2>

      {/* Horizontal Scroll Wrapper */}
      <div ref={wrapperRef} className="flex h-full w-[300vw]"> 
        {services.map((service, index) => (
          <div 
            key={service.id} 
            className={`horizontal-panel flex-shrink-0 w-screen h-full relative flex items-center justify-center overflow-hidden ${colorPalette[index % colorPalette.length]} text-[#e0e0d5]`}
          >
             {/* Massive Background Typography */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden whitespace-nowrap select-none">
              <span className="font-serif text-[40vw] leading-none transform -rotate-12 translate-y-20 origin-center text-white mix-blend-overlay">
                {(service.title.split(' ')[0] || service.title).toUpperCase()}
              </span>
            </div>

            {/* Bleeding Background Pattern/Image */}
            {index === 0 && (
               <div className="absolute top-0 right-0 w-[50vw] h-full bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200')] bg-cover bg-center mix-blend-multiply opacity-50 grayscale custom-border translate-x-10" />
            )}
            {index === 1 && (
               <div className="absolute bottom-0 left-[-10vw] w-[60vw] h-[80vh] bg-[url('https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5')] bg-cover bg-center mix-blend-overlay opacity-40" />
            )}
            {index === 2 && (
               <div className="absolute top-[-20vh] right-[10vw] w-[70vw] h-[100vh] rounded-full blur-3xl bg-[url('https://images.unsplash.com/photo-1581451000632-4ded0b29ce45')] bg-cover bg-center mix-blend-screen opacity-20" />
            )}

            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-20 grid md:grid-cols-2 gap-12 md:gap-24 items-center">
              <div className="order-2 md:order-1 flex justify-center mt-12 md:mt-0">
                 {/* Disconnected Visual Block per panel */}
                 <div className="w-[60%] md:w-[80%] aspect-square border border-white/20 p-4 transform -rotate-2 bg-black/10 backdrop-blur-sm shadow-2xl">
                    <div className="w-full h-full border border-white/10 flex items-center justify-center overflow-hidden relative group">
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <span className="font-serif text-white/50 text-7xl md:text-9xl italic group-hover:scale-110 transition-transform duration-1000">0{index + 1}</span>
                    </div>
                 </div>
              </div>

              <div className="order-1 md:order-2 self-center bg-black/20 backdrop-blur-md p-6 md:p-12 border border-white/10 shadow-2xl">
                <h3 className="font-serif text-4xl md:text-6xl lg:text-[6vw] leading-[0.9] text-[#e0e0d5] mb-6 md:mb-8 hover:italic transition-all duration-300">
                  {service.title}
                </h3>
                <p className="font-light text-lg md:text-xl leading-[1.8] text-white/80 max-w-md border-l-2 border-white/20 pl-6 mb-6 md:mb-8">
                  {service.description}
                </p>
                <div className="pt-2 md:pt-4">
                  <a
                    href={service.ctaHref}
                    target={service.ctaHref.includes('http') ? "_blank" : "_self"}
                    rel="noreferrer"
                    className="inline-flex items-center gap-4 md:gap-6 text-[10px] md:text-xs uppercase tracking-super-wide font-medium hover:text-white/70 transition-colors group"
                  >
                    <span className="w-8 h-[1px] bg-white group-hover:w-16 transition-all duration-300"></span>
                    {service.ctaLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
