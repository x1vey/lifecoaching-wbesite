import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy | Wellness Coaching'
  }, [])

  return (
    <main className="flex-1 min-h-screen pt-24 pb-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray">
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: January 1, 2025</p>

        <section aria-labelledby="info-collected">
          <h2 id="info-collected" className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Information We Collect</h2>
          <p className="text-gray-700 leading-relaxed">
            We collect information you provide directly to us, such as your name, email address, and any messages
            you send through our contact form. We do not sell or share your personal information with third parties
            except as described in this policy.
          </p>
        </section>

        <section aria-labelledby="how-we-use">
          <h2 id="how-we-use" className="text-2xl font-semibold text-gray-800 mt-8 mb-3">How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed">
            We use the information we collect to respond to your inquiries, provide coaching services, and send
            you updates about our offerings. You may opt out of marketing communications at any time.
          </p>
        </section>

        <section aria-labelledby="data-security">
          <h2 id="data-security" className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We implement reasonable security measures to protect your personal information. However, no method of
            transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section aria-labelledby="contact-us">
          <h2 id="contact-us" className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have questions about this Privacy Policy, please{' '}
            <Link to="/contact" className="text-brand-600 hover:underline">contact us</Link>.
          </p>
        </section>
      </article>
    </main>
  )
}
