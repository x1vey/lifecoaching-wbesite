interface TestimonialCardProps {
  quote: string
  clientName: string
  avatar?: string
  avatarAlt?: string
}

export default function TestimonialCard({
  quote,
  clientName,
  avatar,
  avatarAlt,
}: TestimonialCardProps) {
  return (
    <figure className="bg-brand-50 border border-brand-100 p-10 flex flex-col gap-8 h-full reveal group hover:bg-white transition-colors duration-500">
      <blockquote className="text-brand-800 leading-relaxed italic flex-1 font-light text-lg">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <figcaption className="flex items-center gap-5 mt-auto pt-8 border-t border-brand-100">
        {avatar && (
          <div className="relative">
            <img
              src={avatar}
              alt={avatarAlt ?? clientName}
              className="w-10 h-10 rounded-full object-cover shrink-0 grayscale hover:grayscale-0 transition-all duration-500"
              onError={(e) => {
                const img = e.currentTarget
                img.onerror = null
                img.src = `https://placehold.co/40x40?text=${encodeURIComponent(clientName[0] ?? '?')}`
              }}
            />
          </div>
        )}
        <div className="space-y-1">
          <span className="block font-medium text-brand-900 text-[10px] uppercase tracking-super-wide">{clientName}</span>
          <span className="block font-light text-brand-500 text-[9px] uppercase tracking-widest">Verified Client</span>
        </div>
      </figcaption>
    </figure>
  )
}
