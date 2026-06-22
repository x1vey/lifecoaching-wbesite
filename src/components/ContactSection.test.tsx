import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ContactSection from './ContactSection'

// ContactForm makes a fetch call on submit; mock to avoid network in unit tests
vi.mock('./ContactForm', () => ({
  default: () => <div data-testid="contact-form">ContactForm</div>,
}))

describe('ContactSection', () => {
  it('renders with id="contact" for anchor navigation', () => {
    const { container } = render(<ContactSection />)
    expect(container.querySelector('#contact')).not.toBeNull()
  })

  it('renders the section heading', () => {
    render(<ContactSection />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('renders the ContactForm', () => {
    render(<ContactSection />)
    expect(screen.getByTestId('contact-form')).toBeInTheDocument()
  })

  it('renders the booking CTA linking to Calendly with correct attributes', () => {
    render(<ContactSection />)
    const bookingLink = screen.getByRole('link', { name: /book a discovery call/i })
    expect(bookingLink).toHaveAttribute('href', 'https://calendly.com/placeholder')
    expect(bookingLink).toHaveAttribute('target', '_blank')
    expect(bookingLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders Instagram, Facebook, and LinkedIn social links with correct attributes', () => {
    render(<ContactSection />)
    const socialLabels = ['Instagram', 'Facebook', 'LinkedIn']
    for (const label of socialLabels) {
      const link = screen.getByRole('link', { name: label })
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })
})
