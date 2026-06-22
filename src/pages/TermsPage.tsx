import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function TermsPage() {
  useEffect(() => {
    document.title = 'Terms of Service | Wellness Coaching'
  }, [])

  return (
    <main className="flex-1 min-h-screen pt-24 pb-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray">
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last updated: January 1, 2025</p>

        <section aria-labelledby="acceptance">
          <h2 id="acceptance" className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing or using our wellness coaching services, you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section aria-labelledby="services-desc">
          <h2 id="services-desc" className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Services</h2>
          <p className="text-gray-700 leading-relaxed">
            We provide wellness coaching services including one-on-one coaching sessions, group programs, and
            educational content. Our services are for informational and motivational purposes and do not constitute
            medical advice.
          </p>
        </section>

        <section aria-labelledby="user-conduct">
          <h2 id="user-conduct" className="text-2xl font-semibold text-gray-800 mt-8 mb-3">User Conduct</h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to use our services only for lawful purposes and in a manner that does not infringe the
            rights of others. You are responsible for maintaining the confidentiality of any account credentials.
          </p>
        </section>

        <section aria-labelledby="limitation">
          <h2 id="limitation" className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, or
            consequential damages arising from your use of our services.
          </p>
        </section>

        <section aria-labelledby="contact-terms">
          <h2 id="contact-terms" className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Contact</h2>
          <p className="text-gray-700 leading-relaxed">
            Questions about these Terms? Please{' '}
            <Link to="/contact" className="text-brand-600 hover:underline">contact us</Link>.
          </p>
        </section>
      </article>
    </main>
  )
}
