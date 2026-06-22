import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AboutSectionProps {
  photo: string;
  photoAlt: string;
  bio: string;
  ctaLabel: string;
  ctaHref: string;
}

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection({
  photo,
  photoAlt,
  bio,
  ctaLabel,
  ctaHref,
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const textGroupRef = useRef<HTMLDivElement>(null)
  const floatingPhotoRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main image parallax zoom
      gsap.fromTo(imageRef.current, 
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      )

      // Text block slides up aggressively
      gsap.fromTo(textGroupRef.current,
        { y: 150, opacity: 0 },
        {
          y: -50,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "center center",
            scrub: 1.5,
          }
        }
      )

      // Secondary floating photo parallax
      gsap.to(floatingPhotoRef.current, {
        yPercent: -60,
        rotation: 5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-[120vh] bg-[#22211f] text-[#e0e0d5] py-32 overflow-hidden flex items-center z-20">
      {/* Texture Grain */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}}></div>

      <div className="max-w-[1600px] mx-auto px-4 w-full h-full relative">
        
        {/* Massive Primary Image Block */}
        <div ref={imageWrapperRef} className="w-[85%] md:w-[65%] h-[80vh] ml-auto overflow-hidden relative group">
          <img
            ref={imageRef}
            src={photo}
            alt={photoAlt}
            className="w-full h-full object-cover grayscale opacity-60 mix-blend-luminosity transform scale-110"
          />
        </div>

        {/* Small Disconnected Floating Image */}
        <img
          ref={floatingPhotoRef}
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=600&fit=crop"
          alt="Texture detail"
          className="absolute top-[10%] left-[5%] w-[25vw] md:w-[15vw] aspect-[2/3] object-cover grayscale z-10 border border-[#3b3d32] shadow-2xl"
        />

        {/* Aggressively Overlapping Text */}
        <div ref={textGroupRef} className="absolute top-[30%] md:top-[40%] left-4 md:left-20 w-[95%] md:w-[55%] z-30 mix-blend-difference">
          <h2 className="font-serif text-[12vw] md:text-[9vw] tracking-tighter leading-[0.8] mb-8 text-[#e0e0d5] italic translate-x-[-5vw]">
            Awakening
            <br />
            <span className="ml-[20%] text-[#a3a393] not-italic font-medium text-[6vw]">Wellness</span>
          </h2>
          
          <div className="bg-[#1c1c14]/90 p-8 md:p-14 border border-[#3b3d32] backdrop-blur-md shadow-2xl relative left-[10vw] md:left-[5vw] w-[85%] md:w-full">
            <p className="font-light text-xl md:text-2xl leading-[1.8] text-[#c2c2b8] mb-12">
              {bio}
            </p>
            <a
              href={ctaHref}
              className="inline-flex items-center gap-6 text-[11px] uppercase tracking-[0.3em] font-medium hover:text-white transition-colors group"
            >
              <span className="w-16 h-[1px] bg-[#c2c2b8] group-hover:w-24 group-hover:bg-white transition-all duration-500"></span>
              {ctaLabel}
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

