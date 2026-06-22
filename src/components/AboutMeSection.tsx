import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const images = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&fit=crop",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&fit=crop"
]

export default function AboutMeSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-24 bg-[#141512] text-[#e0e0d5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left: About Me Text */}
        <div className="reveal space-y-8">
          <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/50">About Me</p>
          <h2 className="font-serif text-5xl md:text-6xl text-white leading-tight mb-8">
            Holding space for <br />
            <span className="italic font-light text-[#8b4f3f]">deep healing.</span>
          </h2>
          <div className="space-y-6">
            <p className="font-light text-xl leading-relaxed text-white/90">
              My journey into sound began with a deep desire to understand the energetic frequencies that connect us all. Drawing from my ancestral roots from North Sulawesi, Indonesia, I discovered the profound healing properties of traditional vocalizations and instruments.
            </p>
            <p className="font-light text-lg leading-relaxed text-white/70">
              Today, I hold safe, sacred spaces for you to disconnect from the noise of modern life and reconnect with your inner peace. Whether through sound baths, meditation, or coaching, I am here to guide you back to your center.
            </p>
            <p className="font-light text-lg leading-relaxed text-white/70">
              Let's embark on this journey together.
            </p>
          </div>
        </div>

        {/* Right: Rotating Images */}
        <div className="relative aspect-[4/5] w-full max-w-md mx-auto md:ml-auto md:mr-0 overflow-hidden custom-border reveal shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
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
  )
}
