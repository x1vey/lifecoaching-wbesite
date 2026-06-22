import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  useEffect(() => {
    document.title = '404 – Page Not Found'
  }, [])

  return (
    <main className="flex-1 pt-24 pb-16 px-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">404 – Page Not Found</h1>
      <p className="mb-6 text-gray-600">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="text-brand-600 underline hover:text-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded"
      >
        Back to Home
      </Link>
    </main>
  )
}
