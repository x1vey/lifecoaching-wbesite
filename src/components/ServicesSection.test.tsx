import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ServicesSection from './ServicesSection'
import type { CoachingService } from '../types'

const mockServices: CoachingService[] = [
  {
    id: '1',
    title: 'One-on-One Coaching',
    description: 'Personalized sessions tailored to your goals.',
    benefits: ['Accountability', 'Custom plan'],
    ctaLabel: 'Get Started',
    ctaHref: '/contact',
    variant: 'primary',
  },
  {
    id: '2',
    title: 'Group Coaching',
    description: 'Grow alongside a supportive community.',
    benefits: ['Community support', 'Shared insights'],
    ctaLabel: 'Join Now',
    ctaHref: '/contact',
    variant: 'secondary',
  },
]

function renderSection(services = mockServices) {
  return render(
    <MemoryRouter>
      <ServicesSection services={services} />
    </MemoryRouter>
  )
}

describe('ServicesSection', () => {
  it('renders the section with id="services"', () => {
    const { container } = renderSection()
    const section = container.querySelector('section#services')
    expect(section).not.toBeNull()
  })

  it('renders an h2 heading', () => {
    renderSection()
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('renders a CoachingCard for each service', () => {
    renderSection()
    expect(screen.getByText('One-on-One Coaching')).toBeInTheDocument()
    expect(screen.getByText('Group Coaching')).toBeInTheDocument()
  })

  it('renders nothing when services array is empty', () => {
    const { container } = renderSection([])
    const cards = container.querySelectorAll('article')
    expect(cards.length).toBe(0)
  })

  it('applies a 2-column grid class for desktop layout', () => {
    const { container } = renderSection()
    const grid = container.querySelector('.md\\:grid-cols-2')
    expect(grid).not.toBeNull()
  })
})
