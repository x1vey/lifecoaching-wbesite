import { useEffect, useState } from 'react'
import HeroSection from '../components/HeroSection'
import BlogCard from '../components/BlogCard'
import { posts } from '../data/posts'

const POSTS_PER_PAGE = 6

export default function BlogListPage() {
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    document.title = 'Journal | Emora Suara'
  }, [])

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const visiblePosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  return (
    <div>
      <header>
        <HeroSection
          headline="Words from the stillness."
          backgroundImage="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=1600&fit=crop"
        />
      </header>

      {/* INTRO */}
      <section className="bg-[#141512] text-[#e0e0d5] py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}} />
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
          <div className="max-w-2xl reveal">
            <p className="text-[10px] uppercase tracking-super-wide text-[#a3a393] font-medium mb-6">The Journal</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-[#e0e0d5] leading-tight mb-6">
              Reflections on <span className="italic">sound & self</span>.
            </h2>
            <p className="font-light text-xl text-white/70 leading-relaxed">
              Explorations in healing, presence, and the ancient art of listening.
            </p>
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <main className="bg-[#22211f] text-[#e0e0d5] py-24 px-4 relative z-20 min-h-[60vh]">
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}} />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post) => (
              <BlogCard
                key={post.id}
                slug={post.slug}
                coverImage={post.coverImageUrl}
                coverImageAlt={post.coverImageAlt}
                title={post.title}
                excerpt={post.excerpt}
                date={post.publishedAt}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              aria-label="Blog pagination"
              className="flex items-center justify-center gap-4 mt-16"
            >
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-medium text-[#a3a393] hover:text-[#e0e0d5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors group"
                aria-label="Previous page"
              >
                <span className="w-8 h-[1px] bg-[#a3a393] group-hover:w-12 transition-all duration-300" />
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  aria-current={page === currentPage ? 'page' : undefined}
                  className={`font-serif text-2xl transition-colors ${
                    page === currentPage
                      ? 'text-[#e0e0d5]'
                      : 'text-[#3b3d32] hover:text-[#a3a393]'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-medium text-[#a3a393] hover:text-[#e0e0d5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors group"
                aria-label="Next page"
              >
                Next
                <span className="w-8 h-[1px] bg-[#a3a393] group-hover:w-12 transition-all duration-300" />
              </button>
            </nav>
          )}
        </div>
      </main>

      {/* SUBSCRIBE CTA — dark editorial */}
      <section className="bg-[#5c6b54] text-[#e0e0d5] py-32 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden whitespace-nowrap select-none">
          <span className="font-serif text-[35vw] leading-none text-white mix-blend-overlay">LISTEN</span>
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10 reveal">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-8">Stay Connected</p>
          <h2 className="font-serif text-4xl md:text-6xl mb-8 italic">Stay in the resonance.</h2>
          <p className="font-light text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Receive reflections on sound healing, upcoming events, and invitations to immersive experiences.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              required
              className="flex-1 bg-transparent border-b border-white/30 py-3 text-[#e0e0d5] focus:outline-none focus:border-white transition-colors placeholder:text-white/40"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:text-white/70 transition-colors group border border-white/30 px-8 py-4 hover:border-white/60 backdrop-blur-sm whitespace-nowrap"
            >
              <span className="w-4 h-[1px] bg-white group-hover:w-8 transition-all duration-300" />
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
