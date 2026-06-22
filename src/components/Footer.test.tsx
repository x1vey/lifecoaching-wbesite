import { render } from '@testing-library/react'
import * as fc from 'fast-check'
import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer'

// Feature: wellness-website, Property 6: Footer social links open in new tab

/**
 * Validates: Requirements 8.2
 *
 * Property 6: Footer social links open in new tab
 * Every anchor element with an external href (https://) must have
 * target="_blank" and rel="noopener noreferrer".
 */
describe('Footer', () => {
  it('Property 6: all external social links have target="_blank" and rel="noopener noreferrer"', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container, unmount } = render(
          <MemoryRouter>
            <Footer />
          </MemoryRouter>
        )

        const allAnchors = Array.from(container.querySelectorAll('a'))
        const externalLinks = allAnchors.filter((a) =>
          (a.getAttribute('href') ?? '').startsWith('https://')
        )

        expect(externalLinks.length).toBeGreaterThan(0)

        for (const link of externalLinks) {
          expect(link).toHaveAttribute('target', '_blank')
          expect(link).toHaveAttribute('rel', 'noopener noreferrer')
        }

        unmount()
      }),
      { numRuns: 100 }
    )
  })
})

// Feature: wellness-website, Property 7: Footer copyright contains current year

/**
 * Validates: Requirements 8.3
 *
 * Property 7: Footer copyright contains current year
 * The copyright text must contain the current calendar year as a four-digit number.
 */
describe('Footer copyright year', () => {
  it('Property 7: copyright text contains the current calendar year', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container, unmount } = render(
          <MemoryRouter>
            <Footer />
          </MemoryRouter>
        )

        const currentYear = new Date().getFullYear().toString()
        const footerText = container.textContent ?? ''

        expect(footerText).toContain(currentYear)

        unmount()
      }),
      { numRuns: 100 }
    )
  })
})
