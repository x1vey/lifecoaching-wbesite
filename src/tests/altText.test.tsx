// Feature: wellness-website, Property 8: All meaningful images have non-empty alt text

import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import * as fc from 'fast-check'
import AboutSection from '../components/AboutSection'
import BlogCard from '../components/BlogCard'
import TestimonialCard from '../components/TestimonialCard'

/**
 * Validates: Requirements 3.4, 10.2
 *
 * Property 8: All meaningful images have non-empty alt text
 * For each section component, any rendered <img> element must have a non-empty alt attribute.
 */

describe('Property 8: All meaningful images have non-empty alt text', () => {
  it('AboutSection: every img has a non-empty alt attribute', () => {
    fc.assert(
      fc.property(
        fc.record({
          photo: fc.constant('/test.jpg'),
          photoAlt: fc.string({ minLength: 1 }),
          bio: fc.string({ minLength: 1 }),
          credentials: fc.array(fc.string()),
          ctaLabel: fc.string({ minLength: 1 }),
          ctaHref: fc.constant('/contact'),
        }),
        (props) => {
          const { container, unmount } = render(
            <MemoryRouter>
              <AboutSection {...props} />
            </MemoryRouter>
          )

          const images = container.querySelectorAll('img')
          images.forEach((img) => {
            const alt = img.getAttribute('alt')
            expect(alt).not.toBeNull()
            expect(alt!.length).toBeGreaterThan(0)
          })

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })

  it('BlogCard: every img has a non-empty alt attribute', () => {
    fc.assert(
      fc.property(
        fc.record({
          slug: fc.constant('test'),
          coverImage: fc.constant('/test.jpg'),
          coverImageAlt: fc.string({ minLength: 1 }),
          title: fc.string({ minLength: 1 }),
          excerpt: fc.string({ minLength: 1 }),
          date: fc.constant('2024-01-01'),
        }),
        (props) => {
          const { container, unmount } = render(
            <MemoryRouter>
              <BlogCard {...props} />
            </MemoryRouter>
          )

          const images = container.querySelectorAll('img')
          images.forEach((img) => {
            const alt = img.getAttribute('alt')
            expect(alt).not.toBeNull()
            expect(alt!.length).toBeGreaterThan(0)
          })

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })

  it('TestimonialCard: every img has a non-empty alt attribute when avatar is provided', () => {
    fc.assert(
      fc.property(
        fc.record({
          quote: fc.string({ minLength: 1 }),
          clientName: fc.string({ minLength: 1 }),
          avatar: fc.constant('/avatar.jpg'),
          avatarAlt: fc.string({ minLength: 1 }),
        }),
        (props) => {
          const { container, unmount } = render(
            <TestimonialCard {...props} />
          )

          const images = container.querySelectorAll('img')
          images.forEach((img) => {
            const alt = img.getAttribute('alt')
            expect(alt).not.toBeNull()
            expect(alt!.length).toBeGreaterThan(0)
          })

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})
