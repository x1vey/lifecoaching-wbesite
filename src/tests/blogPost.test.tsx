// Feature: wellness-website, Property 10: Unknown blog slug renders 404
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import * as fc from 'fast-check'
import BlogPostPage from '../pages/BlogPostPage'
import NotFoundPage from '../pages/NotFoundPage'

/**
 * Validates: Requirements 6.6
 *
 * Property 10: Unknown blog slug renders 404
 * Navigating to /blog/{slug} where slug is not in the posts data
 * renders the NotFoundPage (404 – Page Not Found).
 */

const KNOWN_SLUGS = new Set([
  '5-morning-habits-for-a-healthier-you',
  'understanding-stress-and-your-body',
  'the-truth-about-nutrition-myths',
])

// Generate URL-safe slug strings (alphanumeric + hyphens/underscores only)
const slugArb = fc
  .stringOf(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789-_'.split('')), {
    minLength: 1,
  })
  .filter((s) => !KNOWN_SLUGS.has(s))

describe('Property 10: Unknown blog slug renders 404', () => {
  it('any unknown slug at /blog/:slug renders the 404 page', () => {
    fc.assert(
      fc.property(slugArb, (slug) => {
        const { unmount } = render(
          <MemoryRouter initialEntries={[`/blog/${slug}`]}>
            <Routes>
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/404" element={<NotFoundPage />} />
            </Routes>
          </MemoryRouter>
        )

        expect(screen.getByText('404 – Page Not Found')).toBeInTheDocument()

        unmount()
      }),
      { numRuns: 100 }
    )
  })
})

// Unit tests for BlogPostPage — Requirements 6.5, 6.6

describe('BlogPostPage unit tests', () => {
  it('known slug renders post content', () => {
    render(
      <MemoryRouter initialEntries={['/blog/5-morning-habits-for-a-healthier-you']}>
        <Routes>
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('5 Morning Habits for a Healthier You')).toBeInTheDocument()
  })

  it('unknown slug redirects to 404', () => {
    render(
      <MemoryRouter initialEntries={['/blog/nonexistent-slug']}>
        <Routes>
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/404" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('404 – Page Not Found')).toBeInTheDocument()
  })
})
