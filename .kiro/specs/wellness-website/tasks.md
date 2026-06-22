# Implementation Plan: Wellness Website

## Overview

Incremental implementation of the wellness coaching SPA using React 18, Vite, React Router v6, Tailwind CSS, React Hook Form, Vitest, React Testing Library, and fast-check. Each task builds on the previous, ending with all components wired together into a fully functional site.

## Tasks

- [x] 1. Project setup and core types
  - Scaffold Vite + React + TypeScript project with Tailwind CSS, React Router v6, React Hook Form, Vitest, @testing-library/react, @testing-library/user-event, @testing-library/jest-dom, and fast-check
  - Create `src/test/setup.ts` with jest-dom imports and configure `vitest.config.ts` with jsdom environment
  - Define all shared TypeScript interfaces in `src/types/index.ts`: `BlogPost`, `CoachingService`, `Testimonial`, `ContactFormValues`
  - Create static seed data files: `src/data/services.ts`, `src/data/testimonials.ts`, `src/data/posts.ts` with at least 2 services, 3 testimonials, and 3 blog posts
  - _Requirements: 4.1, 5.1, 6.1, 11.4_

- [ ] 2. Layout shell: Nav and Footer
  - [x] 2.1 Implement `Nav` component (`src/components/Nav.tsx`)
    - Fixed position header with brand logo and links: Home, About, Services, Blog, Contact
    - Internal `isMenuOpen` boolean state; hamburger icon toggles mobile overlay below 768px
    - Use `useLocation` to apply active-link styling
    - Smooth-scroll to section anchors when on `/`; use `<Link>` on other pages
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [x] 2.2 Write unit tests for Nav
    - Renders logo and all nav links
    - Hamburger click toggles mobile menu visibility
    - Active link is highlighted based on current route
    - _Requirements: 1.1, 1.4, 1.5_

  - [x] 2.3 Implement `Footer` component (`src/components/Footer.tsx`)
    - Brand logo, tagline, nav links, social icon links (`target="_blank" rel="noopener noreferrer"`), copyright with `new Date().getFullYear()`, privacy/terms links
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [x] 2.4 Write property test for Footer social links (Property 6)
    - **Property 6: Footer social links open in new tab**
    - **Validates: Requirements 8.2**
    - `// Feature: wellness-website, Property 6: Footer social links open in new tab`

  - [x] 2.5 Write property test for Footer copyright year (Property 7)
    - **Property 7: Footer copyright contains current year**
    - **Validates: Requirements 8.3**
    - `// Feature: wellness-website, Property 7: Footer copyright contains current year`

  - [x] 2.6 Implement `Layout` component (`src/components/Layout.tsx`)
    - Renders `<Nav />`, `<Outlet />`, `<Footer />`
    - _Requirements: 11.1_

- [ ] 3. Router and page scaffolding
  - [x] 3.1 Configure React Router v6 in `src/App.tsx`
    - All routes wrapped in `<Layout>`; each page component loaded via `React.lazy` + `<Suspense>`
    - Routes: `/`, `/about`, `/services`, `/blog`, `/blog/:slug`, `/contact`, `/privacy-policy`, `/terms-of-service`, `*` → NotFoundPage
    - Wrap each lazy import in an `<ErrorBoundary>` with a "Reload page" fallback
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 10.1_

  - [x] 3.2 Create stub page components
    - `src/pages/HomePage.tsx`, `AboutPage.tsx`, `ServicesPage.tsx`, `BlogListPage.tsx`, `BlogPostPage.tsx`, `ContactPage.tsx`, `PrivacyPolicyPage.tsx`, `TermsPage.tsx`, `NotFoundPage.tsx`
    - Each stub sets `document.title` to a page-specific string and renders a placeholder `<main>`
    - `NotFoundPage` sets title to "404 – Page Not Found" and includes a link back to `/`
    - _Requirements: 10.5, 11.3_

  - [x] 3.3 Write property test for route → document title (Property 9)
    - **Property 9: Route change updates document title**
    - **Validates: Requirements 10.5**
    - `// Feature: wellness-website, Property 9: Route change updates document title`

  - [x] 3.4 Write property test for undefined route renders 404 (Property 11)
    - **Property 11: Undefined route renders 404**
    - **Validates: Requirements 11.3**
    - `// Feature: wellness-website, Property 11: Undefined route renders 404`

  - [x] 3.5 Write unit tests for routing
    - All defined routes render the correct page component
    - Undefined routes render `NotFoundPage`
    - _Requirements: 11.1, 11.2, 11.3_

- [x] 4. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Card and leaf components
  - [x] 5.1 Implement `CoachingCard` component (`src/components/CoachingCard.tsx`)
    - Renders title, description, benefits list, and CTA link; accepts `variant: 'primary' | 'secondary'` for visual differentiation
    - _Requirements: 4.2, 4.4_

  - [x] 5.2 Write property test for CoachingCard (Property 1)
    - **Property 1: CoachingCard renders all required fields**
    - **Validates: Requirements 4.1, 4.2**
    - `// Feature: wellness-website, Property 1: CoachingCard renders all required fields`
    - Use `fc.record` to generate arbitrary `CoachingService` objects; run 100 iterations

  - [x] 5.3 Implement `TestimonialCard` component (`src/components/TestimonialCard.tsx`)
    - Renders quote, client name, and optional avatar image with alt text
    - _Requirements: 5.2_

  - [x] 5.4 Write property test for TestimonialCard (Property 2)
    - **Property 2: TestimonialCard renders required fields**
    - **Validates: Requirements 5.1, 5.2**
    - `// Feature: wellness-website, Property 2: TestimonialCard renders required fields`
    - Use `fc.record` to generate arbitrary `Testimonial` objects; run 100 iterations

  - [x] 5.5 Implement `BlogCard` component (`src/components/BlogCard.tsx`)
    - Renders cover image (with alt), title, excerpt, ISO date formatted for display, and a "Read More" `<Link>` to `/blog/{slug}`
    - _Requirements: 6.2, 6.3_

  - [x] 5.6 Write property test for BlogCard (Property 3)
    - **Property 3: BlogCard renders all required fields**
    - **Validates: Requirements 6.2, 6.3**
    - `// Feature: wellness-website, Property 3: BlogCard renders all required fields`
    - Use `fc.record` to generate arbitrary `BlogPost` objects; assert "Read More" href equals `/blog/${post.slug}`; run 100 iterations

- [ ] 6. Section components
  - [x] 6.1 Implement `HeroSection` (`src/components/HeroSection.tsx`)
    - Full-viewport-height background image with overlay, headline, tagline, and primary CTA that scrolls to `#services`
    - Brand name in a styled `<h1>`
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 6.2 Implement `AboutSection` (`src/components/AboutSection.tsx`)
    - Coach photo with non-empty alt text, bio text, credentials list, secondary CTA link
    - Proper heading hierarchy (`<h2>`)
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [x] 6.3 Implement `ServicesSection` (`src/components/ServicesSection.tsx`)
    - Renders a `<CoachingCard>` for each `CoachingService`; stacks vertically on mobile, side-by-side on desktop
    - _Requirements: 4.1, 4.3, 4.5_

  - [x] 6.4 Implement `TestimonialsSection` (`src/components/TestimonialsSection.tsx`)
    - Section heading, renders `<TestimonialCard>` for each testimonial; horizontal scroll / carousel on mobile
    - _Requirements: 5.1, 5.3, 5.4_

  - [x] 6.5 Implement `BlogSection` (`src/components/BlogSection.tsx`)
    - Renders the three most recent `<BlogCard>` components in a grid
    - _Requirements: 6.1_

  - [x] 6.6 Implement `ContactForm` (`src/components/ContactForm.tsx`)
    - React Hook Form with fields: name, email (format validation), subject, message — all required
    - On valid submit: POST to form service, show success message; on service error: show generic error without clearing fields
    - Inline field-level error messages on invalid submit
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [x] 6.7 Write property test for form missing required fields (Property 4)
    - **Property 4: Form validation rejects missing required fields**
    - **Validates: Requirements 7.3**
    - `// Feature: wellness-website, Property 4: Form validation rejects missing required fields`
    - Use `fc.subarray` over required field names to generate subsets left empty; assert no success state and error messages present; run 100 iterations

  - [x] 6.8 Write property test for form invalid email (Property 5)
    - **Property 5: Form validation rejects invalid email**
    - **Validates: Requirements 7.4**
    - `// Feature: wellness-website, Property 5: Form validation rejects invalid email`
    - Use `fc.string` filtered to exclude valid email patterns; assert email error shown and form not submitted; run 100 iterations

  - [x] 6.9 Write unit tests for ContactForm
    - Valid submission shows success confirmation
    - Missing fields show inline errors
    - Invalid email shows email error
    - _Requirements: 7.2, 7.3, 7.4_

  - [x] 6.10 Implement `ContactSection` (`src/components/ContactSection.tsx`)
    - Composes `<ContactForm>`, booking CTA linking to external scheduler, and social media links
    - _Requirements: 7.5, 7.6_

- [x] 7. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Meaningful image alt text validation
  - [x] 8.1 Audit all section components to ensure every meaningful `<img>` has a non-empty `alt` prop enforced at the TypeScript interface level (required `string`, not `string | undefined`)
    - Update `HeroSectionProps`, `AboutSectionProps`, `BlogCardProps`, `TestimonialCardProps` as needed
    - Add `onError` handler to all `<img>` elements to swap in a placeholder on load failure
    - _Requirements: 3.4, 10.2_

  - [x] 8.2 Write property test for meaningful images alt text (Property 8)
    - **Property 8: All meaningful images have non-empty alt text**
    - **Validates: Requirements 3.4, 10.2**
    - `// Feature: wellness-website, Property 8: All meaningful images have non-empty alt text`
    - For each section component, generate arbitrary prop data with `fc.record`, render, query all `img` elements, assert each has a non-empty `alt` attribute; run 100 iterations

- [ ] 9. Page composition
  - [x] 9.1 Implement `HomePage` (`src/pages/HomePage.tsx`)
    - Compose `HeroSection`, `AboutSection`, `ServicesSection`, `TestimonialsSection`, `BlogSection`, `ContactSection` with section `id` anchors matching Nav links
    - Set `document.title` to brand name
    - Use semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`
    - _Requirements: 2.1–2.4, 3.1–3.4, 4.1–4.5, 5.1–5.4, 6.1, 7.1–7.6, 10.3_

  - [x] 9.2 Implement `AboutPage` (`src/pages/AboutPage.tsx`)
    - Full about/brand story using `AboutSection`; set `document.title`
    - _Requirements: 3.1–3.4, 10.5_

  - [x] 9.3 Implement `ServicesPage` (`src/pages/ServicesPage.tsx`)
    - Full services detail using `ServicesSection`; set `document.title`
    - _Requirements: 4.1–4.5, 10.5_

  - [x] 9.4 Implement `BlogListPage` (`src/pages/BlogListPage.tsx`)
    - Renders all `BlogCard` components in a paginated grid (client-side pagination); set `document.title`
    - _Requirements: 6.4, 10.5_

  - [x] 9.5 Implement `BlogPostPage` (`src/pages/BlogPostPage.tsx`)
    - Read `:slug` param, find matching post from data; render full content
    - If slug not found, render `<Navigate to="/404" replace />`
    - Set `document.title` to post title
    - _Requirements: 6.5, 6.6, 10.5_

  - [x] 9.6 Write property test for unknown blog slug renders 404 (Property 10)
    - **Property 10: Unknown blog slug renders 404**
    - **Validates: Requirements 6.6**
    - `// Feature: wellness-website, Property 10: Unknown blog slug renders 404`
    - Generate slug strings not present in the posts data with `fc.string`; navigate to `/blog/{slug}`; assert `NotFoundPage` renders; run 100 iterations

  - [x] 9.7 Write unit tests for BlogPostPage
    - Known slug renders post content
    - Unknown slug redirects to 404
    - _Requirements: 6.5, 6.6_

  - [x] 9.8 Implement `ContactPage` (`src/pages/ContactPage.tsx`)
    - Renders `ContactSection`; set `document.title`
    - _Requirements: 7.1–7.6, 10.5_

  - [x] 9.9 Implement `PrivacyPolicyPage` and `TermsPage` (`src/pages/`)
    - Static content pages; set `document.title` for each
    - _Requirements: 8.4, 10.5, 11.2_

- [ ] 10. Responsive design and accessibility pass
  - [x] 10.1 Apply mobile-first Tailwind CSS across all components
    - Single-column layouts below 768px; breakpoints at `md` (768px) and `lg` (1024px)
    - No horizontal overflow at any viewport width from 320px to 2560px
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [x] 10.2 Keyboard navigation and focus indicators
    - Ensure all interactive elements (`<button>`, `<a>`, form inputs) are reachable via Tab and have visible `:focus-visible` styles
    - _Requirements: 10.4_

  - [x] 10.3 Semantic HTML audit
    - Verify `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>` are used correctly across all pages
    - _Requirements: 10.3_

- [x] 11. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use fast-check with a minimum of 100 iterations per run
- Unit tests use Vitest + React Testing Library
- Checkpoints ensure incremental validation before moving to the next phase
