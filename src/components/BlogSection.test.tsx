import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { BlogPost } from '../types'
import BlogSection from './BlogSection'

const mockPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'post-one',
    title: 'First Post',
    excerpt: 'Excerpt one',
    content: 'Content one',
    coverImageUrl: '/img1.jpg',
    coverImageAlt: 'Image one',
    publishedAt: '2024-01-15T00:00:00Z',
    author: 'Jane',
  },
  {
    id: '2',
    slug: 'post-two',
    title: 'Second Post',
    excerpt: 'Excerpt two',
    content: 'Content two',
    coverImageUrl: '/img2.jpg',
    coverImageAlt: 'Image two',
    publishedAt: '2024-02-20T00:00:00Z',
    author: 'Jane',
  },
  {
    id: '3',
    slug: 'post-three',
    title: 'Third Post',
    excerpt: 'Excerpt three',
    content: 'Content three',
    coverImageUrl: '/img3.jpg',
    coverImageAlt: 'Image three',
    publishedAt: '2024-03-10T00:00:00Z',
    author: 'Jane',
  },
]

const renderSection = (posts = mockPosts) =>
  render(
    <MemoryRouter>
      <BlogSection posts={posts} />
    </MemoryRouter>
  )

describe('BlogSection', () => {
  it('renders the section heading', () => {
    renderSection()
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('has id="blog" for anchor navigation', () => {
    const { container } = renderSection()
    expect(container.querySelector('#blog')).not.toBeNull()
  })

  it('renders a BlogCard for each post', () => {
    renderSection()
    expect(screen.getByText('First Post')).toBeInTheDocument()
    expect(screen.getByText('Second Post')).toBeInTheDocument()
    expect(screen.getByText('Third Post')).toBeInTheDocument()
  })

  it('renders excerpts for each post', () => {
    renderSection()
    expect(screen.getByText('Excerpt one')).toBeInTheDocument()
    expect(screen.getByText('Excerpt two')).toBeInTheDocument()
    expect(screen.getByText('Excerpt three')).toBeInTheDocument()
  })

  it('renders "View All Posts" link to /blog', () => {
    renderSection()
    const link = screen.getByRole('link', { name: /view all posts/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/blog')
  })

  it('maps coverImageUrl to BlogCard coverImage correctly', () => {
    renderSection()
    const img = screen.getByAltText('Image one') as HTMLImageElement
    expect(img.src).toContain('img1.jpg')
  })

  it('renders without crashing when posts array is empty', () => {
    renderSection([])
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })
})
