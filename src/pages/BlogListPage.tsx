import { useEffect, useState } from 'react'
import HeroSection from '../components/HeroSection'
import BlogCard from '../components/BlogCard'
import { posts } from '../data/posts'

const POSTS_PER_PAGE = 6

export default function BlogListPage() {
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    document.title = 'Blog | Wellness Coaching'
  }, [])

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const visiblePosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  return (
    <div className="bg-brand-50 min-h-screen">
      <header>
        <HeroSection
          headline="Insights, stories, and mindful reflections."
          backgroundImage="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=1600&fit=crop"
        />
      </header>

      <main className="flex-1 min-h-screen bg-brand-50 py-24 px-4 relative z-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-serif font-light text-brand-900 mb-4">Blog</h1>
          <p className="text-brand-700 mb-12 text-lg font-light">
            Insights, tips, and stories to support your wellness journey.
          </p>

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
              className="flex items-center justify-center gap-2 mt-12"
            >
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-brand-300 text-brand-800 font-light hover:bg-brand-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
                aria-label="Previous page"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  aria-current={page === currentPage ? 'page' : undefined}
                  className={`px-4 py-2 rounded-lg border font-light transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 ${
                    page === currentPage
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'border-brand-300 text-brand-800 hover:bg-brand-100'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-brand-300 text-brand-800 font-light hover:bg-brand-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
                aria-label="Next page"
              >
                Next
              </button>
            </nav>
          )}
        </div>
      </main>

      {/* SUBSCRIBE CTA */}
      <section className="bg-brand-900 text-brand-50 py-32 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif">Stay in the flow.</h2>
          <p className="text-brand-300 text-lg">
            Receive exclusive insights on sound healing, upcoming events, and mindful living directly to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 mt-8 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              required
              className="flex-1 bg-transparent border-b border-brand-500 py-3 focus:outline-none focus:border-brand-50 transition-colors placeholder:text-brand-500"
            />
            <button 
              type="submit"
              className="px-8 py-3 bg-brand-50 text-brand-900 uppercase tracking-widest text-xs hover:bg-brand-200 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
