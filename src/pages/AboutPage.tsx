import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from '../components/HeroSection'

gsap.registerPlugin(ScrollTrigger)

const VALUES = [
  { title: "Radical Ownership", desc: "You are the architect of your own reality." },
  { title: "Relentless Growth", desc: "Stagnation is the enemy. We push boundaries daily." },
  { title: "Deep Presence", desc: "Master your attention to master your life." },
  { title: "Unapologetic Power", desc: "Embrace your strength without diminishing others." }
]

export default function AboutPage() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Animate Philosophy Text
    gsap.from('.phil-text', {
      scrollTrigger: {
        trigger: '.phil-trigger',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    })

    // Animate Founder Image
    gsap.from('.founder-img', {
      scrollTrigger: {
        trigger: '.founder-trigger',
        start: 'top 75%',
      },
      scale: 1.1,
      opacity: 0,
      duration: 1.5,
      ease: 'power2.out'
    })

    // Animate Founder Text
    gsap.from('.founder-text', {
      scrollTrigger: {
        trigger: '.founder-trigger',
        start: 'top 60%',
      },
      x: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
    })

    // Animate Values
    gsap.from('.value-card', {
      scrollTrigger: {
        trigger: '.values-trigger',
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.2)'
    })
  }, { scope: container })

  return (
    <div ref={container} className="bg-brand-50 text-brand-900">
      <header>
        <HeroSection
          headline="Forge your legacy."
          backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=1600&fit=crop"
        />
      </header>

      <main className="flex-1">
        {/* PHILOSOPHY SECTION */}
        <section className="phil-trigger min-h-screen flex items-center justify-center px-6 py-24 bg-brand-900 text-brand-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="phil-text text-xs uppercase tracking-super-wide text-brand-300 mb-8">Our Philosophy</h2>
            <p className="phil-text text-4xl md:text-6xl font-serif leading-tight">
              We don't believe in quick fixes or surface-level motivation.
            </p>
            <p className="phil-text text-2xl md:text-4xl font-serif leading-tight mt-6 text-brand-300">
              We build unbreakable foundations for men who demand more from themselves.
            </p>
          </div>
        </section>

        {/* FOUNDER SECTION */}
        <section className="founder-trigger py-24 px-6 lg:px-20 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="overflow-hidden rounded-2xl aspect-[3/4]">
              <img 
                src="https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=800&h=1200&fit=crop" 
                alt="Founder looking focused in a dark moody setting"
                className="founder-img w-full h-full object-cover"
              />
            </div>
            <div className="space-y-8">
              <h2 className="founder-text text-xs uppercase tracking-super-wide text-brand-500">The Architect</h2>
              <h3 className="founder-text text-5xl font-serif leading-none">Meet Alexander.</h3>
              <div className="founder-text text-lg text-brand-700 leading-relaxed space-y-6">
                <p>
                  After a decade navigating high-stakes corporate environments, Alexander realized that success without physical and mental mastery is just a well-dressed cage.
                </p>
                <p>
                  He stripped away the noise, trained with elite performance psychologists, and developed a system designed specifically for the modern man. A system that doesn't just manage stress—it converts it into fuel.
                </p>
                <p>
                  Emora Suara was born from the belief that every man has a dormant apex version of himself waiting to be unlocked. Alexander's mission is to give you the keys.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES SECTION */}
        <section className="values-trigger bg-brand-100 py-32 px-6 lg:px-20">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-center text-xs uppercase tracking-super-wide text-brand-500 mb-16">The Code We Live By</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {VALUES.map((value, idx) => (
                <div key={idx} className="value-card bg-brand-50 p-8 rounded-xl border border-brand-200">
                  <span className="text-3xl text-brand-300 font-serif mb-4 block">0{idx + 1}</span>
                  <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                  <p className="text-brand-600 text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
