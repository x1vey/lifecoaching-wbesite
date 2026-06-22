// Feature: wellness-website, Property 1: CoachingCard renders all required fields

import { render } from '@testing-library/react'
import * as fc from 'fast-check'
import { MemoryRouter } from 'react-router-dom'
import CoachingCard from './CoachingCard'

/**
 * Validates: Requirements 4.1, 4.2
 *
 * Property 1: CoachingCard renders all required fields
 * For any valid CoachingService data, the rendered card must display:
 * - the title
 * - the description
 * - at least one benefit item
 * - a CTA link
 */
describe('CoachingCard', () => {
  it('Property 1: renders title, description, at least one benefit, and a CTA link', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: fc.string({ minLength: 1 }),
          description: fc.string({ minLength: 1 }),
          benefits: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
          ctaLabel: fc.string({ minLength: 1 }),
          ctaHref: fc.constant('/contact'),
          variant: fc.constantFrom('primary' as const, 'secondary' as const),
        }),
        (props) => {
          const { container, unmount } = render(
            <MemoryRouter>
              <CoachingCard {...props} />
            </MemoryRouter>
          )

          // Title is rendered in h3
          const heading = container.querySelector('h3')
          expect(heading).not.toBeNull()
          expect(heading!.textContent).toBe(props.title)

          // Description is rendered in p
          const desc = container.querySelector('p')
          expect(desc).not.toBeNull()
          expect(desc!.textContent).toBe(props.description)

          // At least one benefit item is rendered
          const benefitsList = container.querySelector('[aria-label="Benefits"]')
          expect(benefitsList).not.toBeNull()
          const benefitItems = benefitsList!.querySelectorAll('li')
          expect(benefitItems.length).toBeGreaterThanOrEqual(1)

          // CTA link is rendered with correct href
          const ctaLink = container.querySelector(`a[href="${props.ctaHref}"]`)
          expect(ctaLink).not.toBeNull()
          expect(ctaLink!.textContent).toBe(props.ctaLabel)

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})
