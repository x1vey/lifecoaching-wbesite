import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Nav from './Nav'

function renderNav(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Nav />
    </MemoryRouter>
  )
}

describe('Nav', () => {
  describe('Renders logo and all nav links', () => {
    it('renders the brand logo text', () => {
      renderNav()
      expect(screen.getByText('Wellness Coaching')).toBeInTheDocument()
    })

    it('renders a link to the home page from the logo', () => {
      renderNav()
      const logoLink = screen.getByRole('link', { name: /wellness coaching/i })
      expect(logoLink).toHaveAttribute('href', '/')
    })

    it('renders all five nav links', () => {
      renderNav()
      const expectedLinks = ['Home', 'About', 'Services', 'Blog', 'Contact']
      // Desktop links (hidden on mobile via CSS, but still in DOM)
      const allLinks = screen.getAllByRole('link')
      const linkTexts = allLinks.map((l) => l.textContent?.trim()).filter(Boolean)
      for (const label of expectedLinks) {
        expect(linkTexts).toContain(label)
      }
    })
  })

  describe('Hamburger toggles mobile menu visibility', () => {
    it('mobile menu is hidden by default', () => {
      renderNav()
      expect(screen.queryByRole('list', { hidden: false })).not.toBeNull()
      // The mobile overlay div should not be present
      expect(screen.queryByTestId('mobile-menu')).toBeNull()
      // The mobile-menu id element should not exist
      expect(document.getElementById('mobile-menu')).toBeNull()
    })

    it('hamburger button has aria-expanded=false initially', () => {
      renderNav()
      const hamburger = screen.getByRole('button', { name: /open menu/i })
      expect(hamburger).toHaveAttribute('aria-expanded', 'false')
    })

    it('clicking hamburger opens the mobile menu', async () => {
      const user = userEvent.setup()
      renderNav()
      const hamburger = screen.getByRole('button', { name: /open menu/i })
      await user.click(hamburger)
      expect(document.getElementById('mobile-menu')).toBeInTheDocument()
    })

    it('hamburger aria-expanded becomes true when menu is open', async () => {
      const user = userEvent.setup()
      renderNav()
      const hamburger = screen.getByRole('button', { name: /open menu/i })
      await user.click(hamburger)
      expect(hamburger).toHaveAttribute('aria-expanded', 'true')
    })

    it('clicking hamburger again closes the mobile menu', async () => {
      const user = userEvent.setup()
      renderNav()
      const hamburger = screen.getByRole('button', { name: /open menu/i })
      await user.click(hamburger)
      expect(document.getElementById('mobile-menu')).toBeInTheDocument()
      // Button label changes to "Close menu"
      const closeBtn = screen.getByRole('button', { name: /close menu/i })
      await user.click(closeBtn)
      expect(document.getElementById('mobile-menu')).toBeNull()
    })
  })

  describe('Active link is highlighted based on current route', () => {
    it('Home link is active when on /', () => {
      renderNav()
      // Desktop nav links — grab all links with text "Home"
      const homeLinks = screen.getAllByRole('link', { name: 'Home' })
      // At least one should have the active class (text-brand-600)
      const activeHome = homeLinks.find((l) =>
        l.className.includes('text-brand-600')
      )
      expect(activeHome).toBeDefined()
    })

    it('About link is active when on /about', () => {
      renderNav('/about')
      const aboutLinks = screen.getAllByRole('link', { name: 'About' })
      const activeAbout = aboutLinks.find((l) =>
        l.className.includes('text-brand-600')
      )
      expect(activeAbout).toBeDefined()
    })

    it('Services link is active when on /services', () => {
      renderNav('/services')
      const servicesLinks = screen.getAllByRole('link', { name: 'Services' })
      const activeServices = servicesLinks.find((l) =>
        l.className.includes('text-brand-600')
      )
      expect(activeServices).toBeDefined()
    })

    it('Home link is NOT active when on /about', () => {
      renderNav('/about')
      const homeLinks = screen.getAllByRole('link', { name: 'Home' })
      // Inactive links should have text-brand-800, not text-brand-600 (without hover prefix)
      const inactiveHome = homeLinks.find((l) =>
        l.className.includes('text-brand-800')
      )
      expect(inactiveHome).toBeDefined()
    })
  })
})
