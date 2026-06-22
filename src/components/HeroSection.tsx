import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface HeroSectionProps {
  headline: string
  backgroundImage: string
}

export default function HeroSection({
  headline,
  backgroundImage,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const floatingImg1Ref = useRef<HTMLImageElement>(null)
  const floatingImg2Ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background slow parallax
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      })

      // Text massive parallax (moves faster)
      gsap.to(textRef.current, {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        }
      })

      // Floating images varying parallax
      gsap.to(floatingImg1Ref.current, {
        y: -150,
        rotation: 10,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      })

      gsap.to(floatingImg2Ref.current, {
        y: 100,
        rotation: -5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center bg-transparent overflow-hidden">
      {/* Absolute Full Cover Image with initial scale-down animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgRef}
          src={backgroundImage}
          alt="Atmospheric sound bath environment"
          className="w-full h-[120%] object-cover opacity-60 relative -top-[10%]"
        />
        {/* Aggressive color overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent mix-blend-multiply pointer-events-none" />
      </div>

      {/* Floating Image 1 - Top Right Breakout */}
      <img 
        ref={floatingImg1Ref}
        src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=800&fit=crop"
        alt="floating texture"
        className="absolute top-[15%] right-[-5%] w-[35vw] md:w-[25vw] aspect-[3/4] object-cover opacity-80 z-20 mix-blend-overlay grayscale custom-border shadow-2xl"
      />

      {/* Floating Image 2 - Mid Left Overlap */}
      <img 
        ref={floatingImg2Ref}
        src="https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=500&h=500&fit=crop"
        alt="singing bowl close up"
        className="absolute bottom-[30%] left-[5%] w-[30vw] md:w-[20vw] aspect-square object-cover z-20 opacity-90 sepia-[0.3]"
      />

      <div className="relative z-30 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 pt-32 pb-24 h-full flex flex-col justify-end pointer-events-none">
        {/* Disruptive typography placement */}
        <div ref={textRef} className="max-w-5xl mix-blend-difference mt-auto relative -bottom-10 md:-bottom-20 -left-8 md:-left-16 pointer-events-auto">
          <h1 className="font-serif text-[15vw] leading-[0.75] text-[#e0e0d5] tracking-tighter mix-blend-exclusion">
            <span className="block hover:text-brand-300 transition-colors duration-700">Nurturing</span>
            <span className="block ml-[15vw] italic font-light">peace</span>
            <span className="block mt-4 hover:italic transition-all duration-700">through sound.</span>
          </h1>
          <span className="sr-only">{headline}</span>
        </div>
      </div>
    </section>
  )
}
