import { render, screen } from '@testing-library/react'
import type { Testimonial } from '../types'
import TestimonialsSection from './TestimonialsSection'

const mockTestimonials: Testimonial[] = [
  { id: '1', quote: 'Life-changing experience!', clientName: 'Alice' },
  { id: '2', quote: 'Highly recommend.', clientName: 'Bob', avatarUrl: '/bob.jpg', avatarAlt: 'Bob avatar' },
  { id: '3', quote: 'Wonderful coach.', clientName: 'Carol' },
]

describe('TestimonialsSection', () => {
  it('renders the section heading', () => {
    render(<TestimonialsSection testimonials={mockTestimonials} />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('renders a card for each testimonial', () => {
    render(<TestimonialsSection testimonials={mockTestimonials} />)
    expect(screen.getByText('Life-changing experience!')).toBeInTheDocument()
    expect(screen.getByText('Highly recommend.')).toBeInTheDocument()
    expect(screen.getByText('Wonderful coach.')).toBeInTheDocument()
  })

  it('renders client names', () => {
    render(<TestimonialsSection testimonials={mockTestimonials} />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('Carol')).toBeInTheDocument()
  })

  it('has id="testimonials" for anchor navigation', () => {
    const { container } = render(<TestimonialsSection testimonials={mockTestimonials} />)
    expect(container.querySelector('#testimonials')).not.toBeNull()
  })

  it('renders an empty state without crashing', () => {
    render(<TestimonialsSection testimonials={[]} />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('maps avatarUrl to avatar prop correctly', () => {
    render(<TestimonialsSection testimonials={mockTestimonials} />)
    const img = screen.getByAltText('Bob avatar') as HTMLImageElement
    expect(img.src).toContain('bob.jpg')
  })
})
