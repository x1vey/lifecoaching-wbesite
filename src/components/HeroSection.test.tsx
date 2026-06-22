import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import HeroSection from './HeroSection'

const defaultProps = {
  headline: 'Transform Your Life',
  tagline: 'Personalized coaching for mind, body, and spirit.',
  ctaLabel: 'Explore Services',
  backgroundImage: '/hero.jpg',
}

describe('HeroSection', () => {
  it('renders the brand name in h1', () => {
    render(<HeroSection {...defaultProps} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Wellness Coaching')
  })

  it('renders the headline', () => {
    render(<HeroSection {...defaultProps} />)
    expect(screen.getByText('Transform Your Life')).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<HeroSection {...defaultProps} />)
    expect(screen.getByText('Personalized coaching for mind, body, and spirit.')).toBeInTheDocument()
  })

  it('renders the CTA button with correct label', () => {
    render(<HeroSection {...defaultProps} />)
    expect(screen.getByRole('button', { name: 'Explore Services' })).toBeInTheDocument()
  })

  it('applies background image via inline style', () => {
    render(<HeroSection {...defaultProps} />)
    const section = screen.getByRole('region', { name: 'Hero' })
    expect(section).toHaveStyle({ backgroundImage: 'url(/hero.jpg)' })
  })

  it('CTA button calls scrollIntoView on #services', async () => {
    const scrollIntoView = vi.fn()
    const querySelector = vi.spyOn(document, 'querySelector').mockReturnValue({
      scrollIntoView,
    } as unknown as Element)

    render(<HeroSection {...defaultProps} />)
    await userEvent.click(screen.getByRole('button', { name: 'Explore Services' }))

    expect(querySelector).toHaveBeenCalledWith('#services')
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

    querySelector.mockRestore()
  })

  it('does not throw when #services element is absent', async () => {
    vi.spyOn(document, 'querySelector').mockReturnValue(null)
    render(<HeroSection {...defaultProps} />)
    await expect(
      userEvent.click(screen.getByRole('button', { name: 'Explore Services' }))
    ).resolves.not.toThrow()
    vi.restoreAllMocks()
  })
})
