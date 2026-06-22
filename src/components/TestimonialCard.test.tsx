// Feature: wellness-website, Property 2: TestimonialCard renders required fields

import { render } from '@testing-library/react'
import * as fc from 'fast-check'
import TestimonialCard from './TestimonialCard'

/**
 * Validates: Requirements 5.1, 5.2
 *
 * Property 2: TestimonialCard renders required fields
 * For any valid testimonial data, the rendered card must display:
 * - the quote text inside a blockquote element
 * - the client name inside a figcaption element
 */
describe('TestimonialCard', () => {
  it('Property 2: renders quote text and client name', () => {
    fc.assert(
      fc.property(
        fc.record({
          quote: fc.string({ minLength: 1 }),
          clientName: fc.string({ minLength: 1 }),
        }),
        (props) => {
          const { container, unmount } = render(<TestimonialCard {...props} />)

          // Quote is rendered inside a blockquote element
          const blockquote = container.querySelector('blockquote')
          expect(blockquote).not.toBeNull()
          expect(blockquote!.textContent).toBe(props.quote)

          // Client name is rendered inside figcaption
          const figcaption = container.querySelector('figcaption')
          expect(figcaption).not.toBeNull()
          expect(figcaption!.textContent).toContain(props.clientName)

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})
