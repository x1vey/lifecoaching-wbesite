import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'

const HomePage = React.lazy(() => import('./pages/HomePage'))
const AboutPage = React.lazy(() => import('./pages/AboutPage'))
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'))
const BlogListPage = React.lazy(() => import('./pages/BlogListPage'))
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage'))
const ContactPage = React.lazy(() => import('./pages/ContactPage'))
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsPage = React.lazy(() => import('./pages/TermsPage'))
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'))

function LazyPage({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]">Loading…</div>}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LazyPage><HomePage /></LazyPage>} />
        <Route path="/about" element={<LazyPage><AboutPage /></LazyPage>} />
        <Route path="/services" element={<LazyPage><ServicesPage /></LazyPage>} />
        <Route path="/blog" element={<LazyPage><BlogListPage /></LazyPage>} />
        <Route path="/blog/:slug" element={<LazyPage><BlogPostPage /></LazyPage>} />
        <Route path="/contact" element={<LazyPage><ContactPage /></LazyPage>} />
        <Route path="/privacy-policy" element={<LazyPage><PrivacyPolicyPage /></LazyPage>} />
        <Route path="/terms-of-service" element={<LazyPage><TermsPage /></LazyPage>} />
        <Route path="*" element={<LazyPage><NotFoundPage /></LazyPage>} />
      </Route>
    </Routes>
  )
}
