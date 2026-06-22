import { useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { posts } from '../data/posts'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = posts.find((p) => p.slug === slug)

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Emora Suara`
    }
  }, [post])

  if (!post) {
    return <Navigate to="/404" replace />
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen">
      {/* Dark header band */}
      <div className="bg-[#141512] pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}} />
        <div className="max-w-3xl mx-auto relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#a3a393] hover:text-[#e0e0d5] transition-colors group mb-12 block"
          >
            <span className="w-8 h-[1px] bg-[#a3a393] group-hover:w-12 transition-all duration-300" />
            Back to Journal
          </Link>

          <h1 className="font-serif text-4xl md:text-6xl text-[#e0e0d5] leading-tight mb-6 italic">{post.title}</h1>
          <div className="flex items-center gap-4 text-[#a3a393] text-sm">
            <span className="text-[10px] uppercase tracking-[0.3em]">{post.author}</span>
            <span className="w-4 h-[1px] bg-[#3b3d32]" />
            <time dateTime={post.publishedAt} className="text-[10px] uppercase tracking-[0.3em]">{formattedDate}</time>
          </div>
        </div>
      </div>

      {/* Cover image full bleed */}
      <div className="w-full h-[50vh] overflow-hidden relative">
        <img
          src={post.coverImageUrl}
          alt={post.coverImageAlt}
          className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-70"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).src =
              'https://placehold.co/800x450?text=Image+not+available'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#22211f] via-transparent to-[#141512]/50" />
      </div>

      {/* Article body */}
      <article className="bg-[#22211f] text-[#e0e0d5] py-20 px-6 relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="font-light text-lg md:text-xl leading-[2] text-[#c2c2b8] whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </article>

      {/* Footer nav */}
      <div className="bg-[#141512] py-16 px-6 border-t border-[#3b3d32]">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#a3a393] hover:text-[#e0e0d5] transition-colors group"
          >
            <span className="w-8 h-[1px] bg-[#a3a393] group-hover:w-12 transition-all duration-300" />
            Back to Journal
          </Link>
        </div>
      </div>
    </div>
  )
}
