import { useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { posts } from '../data/posts'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = posts.find((p) => p.slug === slug)

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Wellness Coaching`
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
    <main className="flex-1 min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-800 mb-8 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded"
        >
          ← Back to Blog
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
              <span>By {post.author}</span>
              <span>·</span>
              <time dateTime={post.publishedAt}>{formattedDate}</time>
            </div>
            <img
              src={post.coverImageUrl}
              alt={post.coverImageAlt}
              className="w-full rounded-xl object-cover max-h-96"
              onError={(e) => {
                ;(e.currentTarget as HTMLImageElement).src =
                  'https://placehold.co/800x450?text=Image+not+available'
              }}
            />
          </header>

          <div className="prose prose-gray max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed text-base">
              {post.content}
            </pre>
          </div>
        </article>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </main>
  )
}
