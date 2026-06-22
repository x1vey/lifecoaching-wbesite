import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import DreamyCanvas from './DreamyCanvas'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }

    const handleReveal = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      });
    };

    const intersectionObserver = new IntersectionObserver(handleReveal, observerOptions)
    
    // Function to observe current unobserved elements
    const observeElements = () => {
      document.querySelectorAll('.reveal:not(.active)').forEach((el) => {
        intersectionObserver.observe(el)
      })
    }

    // Initial check
    observeElements()

    // Watch for dynamically added elements (like lazy-loaded routes)
    const mutationObserver = new MutationObserver(() => {
      observeElements()
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      intersectionObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative text-[#e0e0d5]">
      {/* 3D Immersive Background */}
      <DreamyCanvas />
      
      <Nav />
      {/* Ensure main content is above canvas */}
      <main className="flex-grow w-full z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
