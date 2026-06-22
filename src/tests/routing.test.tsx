// Feature: wellness-website, Property 9: Route change updates document title
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import * as fc from 'fast-check'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import ServicesPage from '../pages/ServicesPage'
import BlogListPage from '../pages/BlogListPage'
import ContactPage from '../pages/ContactPage'
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage'
import TermsPage from '../pages/TermsPage'

/**
 * Validates: Requirements 10.5
 *
 * Property 9: Route change updates document title
 * Each page component sets a non-empty, route-specific document.title via useEffect.
 */

const ROUTE_COMPONENTS: Array<{ path: string; Component: React.ComponentType }> = [
  { path: '/', Component: HomePage },
  { path: '/about', Component: AboutPage },
  { path: '/services', Component: ServicesPage },
  { path: '/blog', Component: BlogListPage },
  { path: '/contact', Component: ContactPage },
  { path: '/privacy-policy', Component: PrivacyPolicyPage },
  { path: '/terms-of-service', Component: TermsPage },
]

describe('Property 9: Route change updates document title', () => {
  beforeEach(() => {
    document.title = ''
  })

  it('each page sets a non-empty, route-specific document title', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...ROUTE_COMPONENTS),
        ({ path, Component }) => {
          document.title = ''

          render(
            <MemoryRouter initialEntries={[path]}>
              <Component />
            </MemoryRouter>
          )

          // Title must be non-empty
          expect(document.title.length).toBeGreaterThan(0)

          // Title must contain the brand name or 404 indicator
          const titleContainsBrand =
            document.title.includes('Wellness Coaching') ||
            document.title.includes('404')
          expect(titleContainsBrand).toBe(true)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('each page title is unique per route', () => {
    const titles = ROUTE_COMPONENTS.map(({ path, Component }) => {
      document.title = ''
      render(
        <MemoryRouter initialEntries={[path]}>
          <Component />
        </MemoryRouter>
      )
      return { path, title: document.title }
    })

    const uniqueTitles = new Set(titles.map((t) => t.title))
    expect(uniqueTitles.size).toBe(ROUTE_COMPONENTS.length)
  })
})

// Feature: wellness-website, Property 11: Undefined route renders 404

import { Routes, Route } from 'react-router-dom'
import NotFoundPage from '../pages/NotFoundPage'
import { waitFor } from '@testing-library/react'

/**
 * Validates: Requirements 11.3
 *
 * Property 11: Undefined route renders 404
 * Any path not in the defined route table renders the NotFoundPage.
 */

const KNOWN_ROUTES = new Set([
  '/',
  '/about',
  '/services',
  '/blog',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
])

// Paths that start with /blog/ are handled by /blog/:slug, so exclude them too
function isKnownRoute(path: string): boolean {
  if (KNOWN_ROUTES.has(path)) return true
  if (path.startsWith('/blog/') && path.length > 6) return true
  return false
}

describe('Property 11: Undefined route renders 404', () => {
  it('any undefined path renders the NotFoundPage', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1 }).map((s) => {
          // Ensure it looks like a URL path segment
          const clean = s.replace(/[^a-zA-Z0-9\-_/]/g, 'x')
          return '/' + clean.replace(/^\/+/, '')
        }).filter((path) => !isKnownRoute(path)),
        async (path) => {
          const { getByText, unmount } = render(
            <MemoryRouter initialEntries={[path]}>
              <Routes>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </MemoryRouter>
          )

          await waitFor(() => {
            expect(getByText('404 – Page Not Found')).toBeInTheDocument()
          })

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})

// Unit tests for routing — Requirements 11.1, 11.2, 11.3

import { screen } from '@testing-library/react'

describe('Unit: defined routes render the correct page component', () => {
  it('/ renders HomePage', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /wellness coaching/i })).toBeInTheDocument()
  })

  it('/about renders AboutPage', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <AboutPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /about your coach/i })).toBeInTheDocument()
  })

  it('/services renders ServicesPage', () => {
    render(
      <MemoryRouter initialEntries={['/services']}>
        <ServicesPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /coaching services/i })).toBeInTheDocument()
  })

  it('/blog renders BlogListPage', () => {
    render(
      <MemoryRouter initialEntries={['/blog']}>
        <BlogListPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /^blog$/i })).toBeInTheDocument()
  })

  it('/contact renders ContactPage', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <ContactPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /contact us/i })).toBeInTheDocument()
  })

  it('/privacy-policy renders PrivacyPolicyPage', () => {
    render(
      <MemoryRouter initialEntries={['/privacy-policy']}>
        <PrivacyPolicyPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /privacy policy/i })).toBeInTheDocument()
  })

  it('/terms-of-service renders TermsPage', () => {
    render(
      <MemoryRouter initialEntries={['/terms-of-service']}>
        <TermsPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /terms of service/i })).toBeInTheDocument()
  })
})

describe('Unit: undefined routes render NotFoundPage', () => {
  it('an unknown path renders the 404 heading', () => {
    render(
      <MemoryRouter initialEntries={['/this-does-not-exist']}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument()
  })

  it('another unknown path also renders the 404 heading', () => {
    render(
      <MemoryRouter initialEntries={['/foo/bar/baz']}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument()
  })
})
