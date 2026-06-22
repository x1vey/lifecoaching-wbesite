import { Link } from 'react-router-dom'
import BlogCard from './BlogCard'
import type { BlogPost } from '../types'

interface BlogSectionProps {
  posts: BlogPost[] // most recent 3
}

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section id="blog" className="py-24 bg-brand-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-brand-900 mb-6 tracking-wide">
            From the Blog
          </h2>
          <p className="text-brand-700 text-base sm:text-lg font-light max-w-2xl mx-auto">
            Insights, tips, and stories to support your wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {posts.map((post) => (
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

        <div className="text-center mt-16">
          <Link
            to="/blog"
            className="inline-block px-10 py-3 border border-brand-800 text-brand-800 font-light text-sm tracking-widest uppercase hover:bg-brand-800 hover:text-white transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-800"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  )
}
