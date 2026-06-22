// Feature: wellness-website, Property 3: BlogCard renders all required fields

import { render } from '@testing-library/react'
import * as fc from 'fast-check'
import { MemoryRouter } from 'react-router-dom'
import BlogCard from './BlogCard'

/**
 * Validates: Requirements 6.2, 6.3
 *
 * Property 3: BlogCard renders all required fields
 * For any valid BlogPost data, the rendered card must display:
 * - the title inside an h3 element
 * - the excerpt inside a p element
 * - a "Read More" link with href equal to `/blog/${slug}`
 * - the cover image with the correct alt text
 */
describe('BlogCard', () => {
  it('Property 3: renders title, excerpt, Read More link, and cover image alt', () => {
    fc.assert(
      fc.property(
        fc.record({
          slug: fc.string({ minLength: 1 }).map((s) => s.replace(/[^a-zA-Z0-9-]/g, 'x')),
          coverImage: fc.constant('https://placehold.co/600x400'),
          coverImageAlt: fc.string({ minLength: 1 }),
          title: fc.string({ minLength: 1 }),
          excerpt: fc.string({ minLength: 1 }),
          date: fc.constant('2024-01-01T00:00:00Z'),
        }),
        (props) => {
          const { container, unmount } = render(
            <MemoryRouter>
              <BlogCard {...props} />
            </MemoryRouter>
          )

          // Title is rendered in h3
          const heading = container.querySelector('h3')
          expect(heading).not.toBeNull()
          expect(heading!.textContent).toBe(props.title)

          // Excerpt is rendered in p
          const excerpt = container.querySelector('p')
          expect(excerpt).not.toBeNull()
          expect(excerpt!.textContent).toBe(props.excerpt)

          // "Read More" link has href `/blog/${slug}`
          const readMoreLink = container.querySelector(`a[href="/blog/${props.slug}"]`)
          expect(readMoreLink).not.toBeNull()
          expect(readMoreLink!.textContent).toBe('Read More')

          // Cover image has the correct alt text
          const img = container.querySelector('img')
          expect(img).not.toBeNull()
          expect(img!.getAttribute('alt')).toBe(props.coverImageAlt)

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})
