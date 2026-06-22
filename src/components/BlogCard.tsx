import { Link } from 'react-router-dom'

interface BlogCardProps {
  slug: string
  coverImage: string
  coverImageAlt: string
  title: string
  excerpt: string
  date: string // ISO 8601
}

export default function BlogCard({
  slug,
  coverImage,
  coverImageAlt,
  title,
  excerpt,
  date,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="bg-white flex flex-col h-full group">
      <div className="aspect-[4/5] w-full overflow-hidden mb-6">
        <img
          src={coverImage}
          alt={coverImageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.currentTarget
            target.src = 'https://placehold.co/600x400?text=Image+Not+Found'
          }}
        />
      </div>
      <div className="flex flex-col gap-3 flex-1">
        <time dateTime={date} className="text-xs text-brand-600 tracking-wider uppercase">
          {formattedDate}
        </time>
        <h3 className="text-xl sm:text-2xl font-serif font-light text-brand-900 line-clamp-2 leading-snug">{title}</h3>
        <p className="text-brand-700 leading-relaxed flex-1 line-clamp-3 font-light text-sm">{excerpt}</p>
        <Link
          to={`/blog/${slug}`}
          className="inline-block mt-4 self-start text-brand-800 font-light text-sm tracking-wider uppercase hover:text-brand-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-800"
        >
          Read More →
        </Link>
      </div>
    </article>
  )
}
