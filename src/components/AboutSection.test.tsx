import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import AboutSection from './AboutSection'

const defaultProps = {
  photo: '/coach.jpg',
  photoAlt: 'Coach Jane Doe smiling',
  bio: 'Jane has 10 years of experience in holistic wellness coaching.',
  credentials: ['Certified Life Coach (ICF)', 'Yoga Instructor (RYT-200)', 'Nutrition Specialist'],
  ctaLabel: 'Work With Me',
  ctaHref: '/contact',
}

function renderAbout(props = defaultProps) {
  return render(
    <MemoryRouter>
      <AboutSection {...props} />
    </MemoryRouter>
  )
}

describe('AboutSection', () => {
  it('renders an h2 heading', () => {
    renderAbout()
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('renders the coach photo with correct alt text', () => {
    renderAbout()
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('alt', 'Coach Jane Doe smiling')
    expect(img).toHaveAttribute('src', '/coach.jpg')
  })

  it('renders the bio text', () => {
    renderAbout()
    expect(screen.getByText(defaultProps.bio)).toBeInTheDocument()
  })

  it('renders all credentials', () => {
    renderAbout()
    for (const cred of defaultProps.credentials) {
      expect(screen.getByText(cred)).toBeInTheDocument()
    }
  })

  it('renders the CTA link with correct label and href', () => {
    renderAbout()
    const link = screen.getByRole('link', { name: 'Work With Me' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/contact')
  })

  it('has id="about" for anchor navigation', () => {
    renderAbout()
    expect(document.getElementById('about')).toBeInTheDocument()
  })

  it('renders with an empty credentials list without crashing', () => {
    renderAbout({ ...defaultProps, credentials: [] })
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })
})
