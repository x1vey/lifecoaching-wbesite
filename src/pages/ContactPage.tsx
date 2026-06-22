import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import HeroSection from '../components/HeroSection'

export default function ContactPage() {
  const container = useRef<HTMLDivElement>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useGSAP(() => {
    gsap.from('.contact-fade', {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power2.out',
      delay: 0.5
    })
  }, { scope: container })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <div ref={container} className="bg-brand-50 text-brand-900 min-h-screen">
      <header>
        <HeroSection
          headline="Connect with your center."
          backgroundImage="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&h=1600&fit=crop"
        />
      </header>

      <main className="max-w-[1440px] mx-auto px-6 py-24 lg:px-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left Column: Contact Details */}
          <div className="space-y-12">
            <div>
              <h2 className="contact-fade text-xs uppercase tracking-super-wide text-brand-500 mb-6">Reach Out</h2>
              <h1 className="contact-fade text-5xl md:text-7xl font-serif leading-tight">Let's create <br/>space for you.</h1>
            </div>

            <div className="contact-fade space-y-8 text-brand-700">
              <div>
                <h3 className="uppercase tracking-widest text-xs font-semibold text-brand-900 mb-2">Studio Location</h3>
                <p>123 Wellness Avenue<br/>Los Angeles, CA 90210</p>
              </div>
              
              <div>
                <h3 className="uppercase tracking-widest text-xs font-semibold text-brand-900 mb-2">Direct Contact</h3>
                <p>hello@emorasuara.com<br/>+1 (555) 123-4567</p>
              </div>

              <div>
                <h3 className="uppercase tracking-widest text-xs font-semibold text-brand-900 mb-2">Studio Hours</h3>
                <p>Monday – Friday: 9am – 6pm<br/>Saturday: 10am – 4pm (Sound Baths)</p>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Form */}
          <div className="contact-fade bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-brand-100">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center">
                  <span className="text-brand-900 text-2xl">✦</span>
                </div>
                <h3 className="text-3xl font-serif">Message Received</h3>
                <p className="text-brand-600">We will be in touch with you shortly to schedule your session.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-brand-500">Your Name</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    className="w-full bg-transparent border-b border-brand-200 py-3 focus:outline-none focus:border-brand-900 transition-colors placeholder:text-brand-300"
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-brand-500">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    className="w-full bg-transparent border-b border-brand-200 py-3 focus:outline-none focus:border-brand-900 transition-colors placeholder:text-brand-300"
                    placeholder="jane@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="text-xs uppercase tracking-widest text-brand-500">Interested In</label>
                  <select 
                    id="service"
                    className="w-full bg-transparent border-b border-brand-200 py-3 focus:outline-none focus:border-brand-900 transition-colors text-brand-900"
                  >
                    <option value="private">Private Sound Bath</option>
                    <option value="group">Group Session</option>
                    <option value="corporate">Corporate Wellness</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest text-brand-500">Your Message</label>
                  <textarea 
                    id="message"
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-brand-200 py-3 focus:outline-none focus:border-brand-900 transition-colors placeholder:text-brand-300 resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-900 text-brand-50 py-4 uppercase tracking-widest text-xs hover:bg-brand-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>
      </main>

      {/* Visit Us Image Full Width */}
      <div className="w-full h-96 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1528315729739-44e2759e9508?w=1600&h=600&fit=crop" 
          alt="Peaceful wellness studio interior"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
