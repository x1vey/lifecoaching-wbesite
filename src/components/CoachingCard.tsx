import { Link } from 'react-router-dom'

interface CoachingCardProps {
  title: string
  description: string
  benefits: string[]
  ctaLabel: string
  ctaHref: string
}

export default function CoachingCard({
  title,
  description,
  benefits,
  ctaLabel,
  ctaHref,
}: CoachingCardProps) {
  const isExternal = ctaHref.startsWith('http')
  const cardClass = `group p-8 border border-brand-100 bg-white/50 backdrop-blur-sm transition-all duration-500 hover:bg-white hover:shadow-xl hover:-translate-y-2 reveal`
  const titleClass = 'text-2xl font-serif text-brand-900 tracking-tight'
  const descClass = 'text-brand-700 font-light leading-relaxed'
  const bulletClass = 'text-brand-600 font-light text-sm'
  const ctaClass = 'inline-flex items-center gap-4 text-[10px] uppercase tracking-super-wide text-brand-900 font-medium group/btn pt-4'

  return (
    <article className={cardClass}>
      <div className="space-y-6 flex flex-col h-full">
        <h3 className={titleClass}>{title}</h3>
        <p className={descClass}>{description}</p>

        {benefits.length > 0 && (
          <ul className="space-y-3 pt-4 border-t border-brand-100" aria-label="Benefits">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="w-1 h-1 rounded-full bg-brand-300 mt-2 shrink-0" />
                <span className={bulletClass}>{benefit}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto">
          {isExternal ? (
            <a
              href={ctaHref}
              className={ctaClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{ctaLabel}</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          ) : (
            <Link to={ctaHref} className={ctaClass}>
              <span>{ctaLabel}</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
