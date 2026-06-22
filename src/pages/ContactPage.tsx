import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from '../components/HeroSection'

gsap.registerPlugin(ScrollTrigger)

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const formSectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const floatingRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    document.title = 'Contact | Emora Suara'
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax zoom
      if (imgRef.current) {
        gsap.fromTo(imgRef.current,
          { scale: 1.2 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: formSectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        )
      }

      // Text slides up
      if (textRef.current) {
        gsap.fromTo(textRef.current,
          { y: 120, opacity: 0 },
          {
            y: -30,
            opacity: 1,
            scrollTrigger: {
              trigger: formSectionRef.current,
              start: "top 70%",
              end: "center center",
              scrub: 1.5,
            }
          }
        )
      }

      // Floating photo
      if (floatingRef.current) {
        gsap.to(floatingRef.current, {
          yPercent: -50,
          rotation: -4,
          scrollTrigger: {
            trigger: formSectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          }
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <div ref={containerRef}>
      {/* HERO */}
      <header>
        <HeroSection
          headline="Begin the conversation."
          backgroundImage="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&h=1600&fit=crop"
        />
      </header>

      {/* CONTACT SECTION — mirrors AboutSection's dark overlapping layout */}
      <section ref={formSectionRef} className="relative min-h-[120vh] bg-[#22211f] text-[#e0e0d5] py-32 overflow-hidden flex items-center z-20">
        {/* Grain */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}} />

        <div className="max-w-[1600px] mx-auto px-4 w-full h-full relative">
          {/* Massive Image Block */}
          <div className="w-[85%] md:w-[55%] h-[75vh] mr-auto overflow-hidden relative">
            <img
              ref={imgRef}
              src="https://images.unsplash.com/photo-1528315729739-44e2759e9508?w=1200&h=1600&fit=crop"
              alt="Tranquil wellness space"
              className="w-full h-full object-cover grayscale opacity-60 mix-blend-luminosity transform scale-110"
            />
          </div>

          {/* Floating Accent */}
          <img
            ref={floatingRef}
            src="https://images.unsplash.com/photo-1608681283626-44474f386921?w=400&h=600&fit=crop"
            alt="Singing bowl detail"
            className="absolute top-[8%] right-[5%] w-[22vw] md:w-[13vw] aspect-[2/3] object-cover grayscale z-10 border border-[#3b3d32] shadow-2xl"
          />

          {/* Overlapping Text + Form */}
          <div ref={textRef} className="absolute top-[20%] md:top-[30%] right-4 md:right-16 w-[95%] md:w-[55%] z-30">
            <h2 className="font-serif text-[10vw] md:text-[7vw] tracking-tighter leading-[0.8] mb-8 text-[#e0e0d5] italic text-right mix-blend-difference">
              Let's
              <br />
              <span className="ml-[15%] text-[#a3a393] not-italic font-medium text-[5vw]">connect</span>
            </h2>

            <div className="bg-[#1c1c14]/90 p-8 md:p-14 border border-[#3b3d32] backdrop-blur-md shadow-2xl relative right-[5vw] md:right-[3vw] w-[90%] md:w-full">
              {isSubmitted ? (
                <div className="py-16 text-center space-y-6">
                  <span className="font-serif text-6xl text-[#5c6b54] block">✦</span>
                  <h3 className="font-serif text-3xl md:text-4xl italic">Message received.</h3>
                  <p className="font-light text-lg text-[#a3a393]">We will reach out to you shortly to begin your journey.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] uppercase tracking-[0.3em] text-[#a3a393]">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full bg-transparent border-b border-[#3b3d32] py-3 text-[#e0e0d5] focus:outline-none focus:border-[#e0e0d5] transition-colors placeholder:text-[#555]"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] uppercase tracking-[0.3em] text-[#a3a393]">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full bg-transparent border-b border-[#3b3d32] py-3 text-[#e0e0d5] focus:outline-none focus:border-[#e0e0d5] transition-colors placeholder:text-[#555]"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="interest" className="text-[10px] uppercase tracking-[0.3em] text-[#a3a393]">Interested In</label>
                    <select
                      id="interest"
                      className="w-full bg-transparent border-b border-[#3b3d32] py-3 text-[#e0e0d5] focus:outline-none focus:border-[#e0e0d5] transition-colors"
                    >
                      <option value="private" className="bg-[#1c1c14]">Private Sound Bath</option>
                      <option value="group" className="bg-[#1c1c14]">Group Session</option>
                      <option value="corporate" className="bg-[#1c1c14]">Corporate Wellness</option>
                      <option value="other" className="bg-[#1c1c14]">Other Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] uppercase tracking-[0.3em] text-[#a3a393]">Your Message</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      className="w-full bg-transparent border-b border-[#3b3d32] py-3 text-[#e0e0d5] focus:outline-none focus:border-[#e0e0d5] transition-colors placeholder:text-[#555] resize-none"
                      placeholder="Tell us what you're looking for..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-6 text-[11px] uppercase tracking-[0.3em] font-medium hover:text-white transition-colors group pt-4"
                  >
                    <span className="w-16 h-[1px] bg-[#c2c2b8] group-hover:w-24 group-hover:bg-white transition-all duration-500" />
                    Send message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS SECTION — dark editorial grid */}
      <section className="bg-[#141512] text-[#e0e0d5] py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}} />

        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#3b3d32]">
            {[
              { title: 'Studio', lines: ['Sydney, Australia', 'Available for private bookings', 'and corporate events'] },
              { title: 'Direct', lines: ['hello@emorasuara.com', '+61 4XX XXX XXX', 'Enquiries welcome anytime'] },
              { title: 'Sessions', lines: ['Group: Saturdays 10am', 'Private: By appointment', 'Corporate: On request'] }
            ].map((item) => (
              <div key={item.title} className="bg-[#141512] p-10 md:p-16 group hover:bg-[#1c1c14] transition-colors duration-700 reveal">
                <span className="font-serif text-4xl md:text-5xl text-[#3b3d32] group-hover:text-[#5c6b54] transition-colors duration-700 block mb-8 italic">
                  {item.title}
                </span>
                <div className="space-y-2 font-light text-lg text-[#a3a393]">
                  {item.lines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-WIDTH ATMOSPHERE IMAGE */}
      <section className="w-full h-[60vh] overflow-hidden relative">
        <img
          src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&h=800&fit=crop"
          alt="Peaceful dawn meditation atmosphere"
          className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141512] via-transparent to-transparent" />
      </section>
    </div>
  )
}
