import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from '../components/HeroSection'

gsap.registerPlugin(ScrollTrigger)

const founderImages = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&fit=crop",
  "https://images.unsplash.com/photo-1593810450967-f9c42732e630?w=800&fit=crop",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&fit=crop"
]

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const storyImgRef = useRef<HTMLImageElement>(null)
  const storyTextRef = useRef<HTMLDivElement>(null)
  const floatingRef = useRef<HTMLImageElement>(null)
  const valuesRef = useRef<HTMLElement>(null)
  const pullQuoteRef = useRef<HTMLElement>(null)
  const [currentImg, setCurrentImg] = useState(0)

  useEffect(() => {
    document.title = 'About | Emora Suara'
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % founderImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Story image parallax zoom
      gsap.fromTo(storyImgRef.current,
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: '.story-section',
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      )

      // Story text slides up aggressively
      gsap.fromTo(storyTextRef.current,
        { y: 150, opacity: 0 },
        {
          y: -50,
          opacity: 1,
          scrollTrigger: {
            trigger: '.story-section',
            start: "top 70%",
            end: "center center",
            scrub: 1.5,
          }
        }
      )

      // Floating photo parallax
      gsap.to(floatingRef.current, {
        yPercent: -60,
        rotation: 5,
        scrollTrigger: {
          trigger: '.story-section',
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        }
      })

      // Pull quote parallax
      if (pullQuoteRef.current) {
        gsap.fromTo(pullQuoteRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: pullQuoteRef.current,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            }
          }
        )
      }

      // Values cards stagger
      if (valuesRef.current) {
        const cards = valuesRef.current.querySelectorAll('.value-item')
        gsap.fromTo(cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 75%",
              end: "top 30%",
              scrub: 1,
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef}>
      {/* HERO */}
      <header>
        <HeroSection
          headline="The origin of resonance."
          backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=1600&fit=crop"
        />
      </header>

      {/* ORIGIN STORY — mirrors AboutSection's dark overlapping style */}
      <section className="story-section relative min-h-[120vh] bg-[#22211f] text-[#e0e0d5] py-32 overflow-hidden flex items-center z-20">
        {/* Grain Texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}} />

        <div className="max-w-[1600px] mx-auto px-4 w-full h-full relative">
          {/* Massive Primary Image Block */}
          <div className="w-[85%] md:w-[65%] h-[80vh] ml-auto overflow-hidden relative group">
            <img
              ref={storyImgRef}
              src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1200&h=1600&fit=crop"
              alt="Ethereal sound healing atmosphere"
              className="w-full h-full object-cover grayscale opacity-60 mix-blend-luminosity transform scale-110"
            />
          </div>

          {/* Small Disconnected Floating Image */}
          <img
            ref={floatingRef}
            src="https://images.unsplash.com/photo-1608681283626-44474f386921?w=400&h=600&fit=crop"
            alt="Singing bowl close-up"
            className="absolute top-[10%] left-[5%] w-[25vw] md:w-[15vw] aspect-[2/3] object-cover grayscale z-10 border border-[#3b3d32] shadow-2xl"
          />

          {/* Aggressively Overlapping Text */}
          <div ref={storyTextRef} className="absolute top-[30%] md:top-[40%] left-4 md:left-20 w-[95%] md:w-[55%] z-30 mix-blend-difference">
            <h2 className="font-serif text-[12vw] md:text-[9vw] tracking-tighter leading-[0.8] mb-8 text-[#e0e0d5] italic translate-x-[-5vw]">
              The origin
              <br />
              <span className="ml-[20%] text-[#a3a393] not-italic font-medium text-[6vw]">story</span>
            </h2>

            <div className="bg-[#1c1c14]/90 p-8 md:p-14 border border-[#3b3d32] backdrop-blur-md shadow-2xl relative left-[10vw] md:left-[5vw] w-[85%] md:w-full">
              <p className="font-light text-xl md:text-2xl leading-[1.8] text-[#c2c2b8] mb-12">
                Emora Suara was born from a deep reverence for the ancient healing power of sound. Rooted in the ancestral traditions of North Sulawesi, Indonesia, this practice carries the wisdom of generations — translated into a modern experience designed to dissolve the noise of everyday life and return you to stillness.
              </p>
              <a
                href="/services"
                className="inline-flex items-center gap-6 text-[11px] uppercase tracking-[0.3em] font-medium hover:text-white transition-colors group"
              >
                <span className="w-16 h-[1px] bg-[#c2c2b8] group-hover:w-24 group-hover:bg-white transition-all duration-500" />
                Explore experiences
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER — mirrors AboutMeSection with rotating images */}
      <section className="py-24 bg-[#141512] text-[#e0e0d5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left: Founder Text */}
          <div className="reveal space-y-8">
            <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/50">The Guide</p>
            <h2 className="font-serif text-5xl md:text-6xl text-white leading-tight mb-8">
              A life devoted to <br />
              <span className="italic font-light text-[#8b4f3f]">sacred sound.</span>
            </h2>
            <div className="space-y-6">
              <p className="font-light text-xl leading-relaxed text-white/90">
                My journey into sound began with a deep desire to understand the energetic frequencies that connect us all. Drawing from my ancestral roots from North Sulawesi, Indonesia, I discovered the profound healing properties of traditional vocalizations and instruments.
              </p>
              <p className="font-light text-lg leading-relaxed text-white/70">
                After years of training with master practitioners across Southeast Asia and Australia, I created Emora Suara — a space where ancient wisdom meets modern wellbeing. Every session I hold is an invitation to shed what no longer serves you and remember what always has.
              </p>
              <p className="font-light text-lg leading-relaxed text-white/70">
                This is not therapy. This is not performance. This is presence.
              </p>
            </div>
          </div>

          {/* Right: Rotating Images */}
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto md:ml-auto md:mr-0 overflow-hidden custom-border reveal shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImg}
                src={founderImages[currentImg]}
                alt="Portrait"
                className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal transition-all duration-700"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </AnimatePresence>
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* PULL QUOTE — full-width typographic moment */}
      <section ref={pullQuoteRef} className="bg-[#5c6b54] text-[#e0e0d5] py-32 md:py-48 relative overflow-hidden">
        {/* Massive Background Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden whitespace-nowrap select-none">
          <span className="font-serif text-[40vw] leading-none transform -rotate-12 translate-y-20 origin-center text-white mix-blend-overlay">
            RESONATE
          </span>
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <blockquote className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] italic tracking-tight">
            "The body is an instrument. Sound is the tuning fork. Silence is the song."
          </blockquote>
          <p className="mt-12 text-[10px] uppercase tracking-[0.3em] text-white/60">— Emora Suara</p>
        </div>
      </section>

      {/* VALUES — editorial grid with dark aesthetic */}
      <section ref={valuesRef} className="bg-[#22211f] text-[#e0e0d5] py-32 relative overflow-hidden">
        {/* Grain Texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}} />

        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
          <div className="max-w-2xl mb-24 reveal">
            <p className="text-[10px] uppercase tracking-super-wide text-[#a3a393] font-medium mb-6">What We Stand For</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-[#e0e0d5] leading-tight">
              Principles of <span className="italic">resonance</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#3b3d32]">
            {[
              { num: '01', title: 'Sacred Space', desc: 'Every session begins with intention. We create environments where vulnerability is safe and silence speaks louder than words.' },
              { num: '02', title: 'Ancestral Wisdom', desc: 'Our practice draws from centuries of Indonesian sound traditions, honouring the frequencies our ancestors knew could heal.' },
              { num: '03', title: 'Deep Presence', desc: 'We guide you out of the mind and into the body. No performance, no pretence — only the raw experience of being.' },
              { num: '04', title: 'Radical Stillness', desc: 'In a world addicted to noise, we offer the revolutionary act of silence. True transformation happens in the pause.' }
            ].map((value) => (
              <div key={value.num} className="value-item bg-[#22211f] p-10 md:p-16 group hover:bg-[#1c1c14] transition-colors duration-700">
                <span className="font-serif text-6xl md:text-7xl text-[#3b3d32] group-hover:text-[#5c6b54] transition-colors duration-700 block mb-8">
                  {value.num}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl mb-4 group-hover:italic transition-all duration-300">{value.title}</h3>
                <p className="font-light text-lg leading-[1.8] text-[#a3a393] border-l-2 border-[#3b3d32] pl-6">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="bg-[#8b4f3f] text-[#e0e0d5] py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center reveal">
          <h2 className="font-serif text-4xl md:text-6xl mb-8 italic">Begin your journey.</h2>
          <p className="font-light text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Whether you're seeking a private sound bath, a group immersion, or a bespoke corporate wellness experience — we're here.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-6 text-[11px] uppercase tracking-[0.3em] font-medium hover:text-white/70 transition-colors group border border-white/30 px-12 py-5 hover:border-white/60 backdrop-blur-sm"
          >
            <span className="w-8 h-[1px] bg-white group-hover:w-16 transition-all duration-300" />
            Get in touch
          </a>
        </div>
      </section>
    </div>
  )
}
