import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Experiences', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  function isActive(href: string) {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  const linkClass = (href: string) =>
    `text-[10px] uppercase tracking-super-wide transition-all duration-500 hover:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-900 ${
      isActive(href) ? 'text-brand-900 font-medium' : 'text-brand-800 font-light'
    }`

  const mobileLinkClass = (href: string) =>
    `block px-6 py-4 text-xs uppercase tracking-widest transition-colors hover:bg-brand-100 ${
      isActive(href) ? 'text-brand-900 font-medium' : 'text-brand-800 font-light'
    }`

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-50/80 backdrop-blur-md border-b border-brand-100">
      <nav className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20">
          {/* Brand logo */}
          <Link
            to="/"
            className="text-brand-900 font-serif lowercase text-2xl tracking-tight hover:opacity-70 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          >
            emora suara
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-12" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  to={href}
                  className={linkClass(href)}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger button */}
          <button
            type="button"
            className="md:hidden p-2 text-brand-900 hover:opacity-50 transition-opacity"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile overlay menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden bg-brand-50"
          >
            <ul role="list" className="py-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className={mobileLinkClass(href)}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
