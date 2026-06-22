import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { ContactFormValues } from '../types'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function submitToFormService(data: ContactFormValues): Promise<void> {
  const response = await fetch('https://formspree.io/f/placeholder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Form submission failed')
  }
}

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>()

  async function onSubmit(data: ContactFormValues) {
    setSubmitStatus('idle')
    try {
      await submitToFormService(data)
      setSubmitStatus('success')
    } catch {
      setSubmitStatus('error')
    }
  }

  if (submitStatus === 'success') {
    return (
      <div
        role="alert"
        className="rounded-lg bg-green-50 border border-green-200 p-6 text-center"
      >
        <p className="text-green-800 font-semibold text-lg">Message sent!</p>
        <p className="text-green-700 mt-1">
          Thank you for reaching out. We'll get back to you soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {submitStatus === 'error' && (
        <div role="alert" className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-light text-brand-800 mb-1">
          Name <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={`w-full border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-600 ${
            errors.name ? 'border-red-400 focus:ring-red-400' : 'border-brand-300'
          }`}
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-light text-brand-800 mb-1">
          Email <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={`w-full border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-600 ${
            errors.email ? 'border-red-400 focus:ring-red-400' : 'border-brand-300'
          }`}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: EMAIL_PATTERN, message: 'Please enter a valid email address' },
          })}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-light text-brand-800 mb-1">
          Subject <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="subject"
          type="text"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          className={`w-full border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-600 ${
            errors.subject ? 'border-red-400 focus:ring-red-400' : 'border-brand-300'
          }`}
          {...register('subject', { required: 'Subject is required' })}
        />
        {errors.subject && (
          <p id="subject-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-light text-brand-800 mb-1">
          Message <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`w-full border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-600 resize-y ${
            errors.message ? 'border-red-400 focus:ring-red-400' : 'border-brand-300'
          }`}
          {...register('message', { required: 'Message is required' })}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1 text-xs text-red-600">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-light px-6 py-3 text-sm tracking-wider uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
