// Feature: wellness-website, Property 4: Form validation rejects missing required fields
import { describe, it } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import * as fc from 'fast-check'
import ContactForm from './ContactForm'

/**
 * Property 4: Form validation rejects missing required fields
 * Validates: Requirements 7.3
 */
describe('ContactForm – Property 4: Form validation rejects missing required fields', () => {
  const VALID_VALUES: Record<string, string> = {
    name: 'Jane Doe',
    email: 'test@example.com',
    subject: 'Hello',
    message: 'This is a test message.',
  }

  const REQUIRED_FIELDS = ['name', 'email', 'subject', 'message'] as const
  type FieldName = (typeof REQUIRED_FIELDS)[number]

  const ERROR_IDS: Record<FieldName, string> = {
    name: 'name-error',
    email: 'email-error',
    subject: 'subject-error',
    message: 'message-error',
  }

  it(
    'shows errors and no success message when required fields are left empty',
    async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.subarray([...REQUIRED_FIELDS] as FieldName[], { minLength: 1 }),
          async (emptyFields) => {
            const { unmount } = render(<ContactForm />)

            // Fill only the fields NOT in the empty subset
            for (const field of REQUIRED_FIELDS) {
              if (!emptyFields.includes(field)) {
                const el =
                  field === 'message'
                    ? screen.getByRole('textbox', { name: /message/i })
                    : screen.getByRole('textbox', { name: new RegExp(field, 'i') })
                fireEvent.change(el, { target: { value: VALID_VALUES[field] } })
              }
            }

            // Submit the form
            await act(async () => {
              fireEvent.click(screen.getByRole('button', { name: /send message/i }))
            })

            // Assert no success message
            const alerts = screen.queryAllByRole('alert')
            const successShown = alerts.some((el) =>
              el.textContent?.includes('Message sent!')
            )
            expect(successShown).toBe(false)

            // Assert each empty field has an error message
            for (const field of emptyFields) {
              const errorEl = document.getElementById(ERROR_IDS[field])
              expect(errorEl).not.toBeNull()
              expect(errorEl!.textContent?.trim().length).toBeGreaterThan(0)
            }

            unmount()
          }
        ),
        { numRuns: 100 }
      )
    },
    30000
  )
})

// Feature: wellness-website, Property 5: Form validation rejects invalid email

/**
 * Property 5: Form validation rejects invalid email
 * Validates: Requirements 7.4
 */
describe('ContactForm – Property 5: Form validation rejects invalid email', () => {
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  it(
    'shows email error and no success message for invalid email strings',
    async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string({ minLength: 1 }).filter((s) => !EMAIL_PATTERN.test(s)),
          async (invalidEmail) => {
            const { unmount } = render(<ContactForm />)

            // Fill all fields with valid values except email
            fireEvent.change(screen.getByRole('textbox', { name: /name/i }), {
              target: { value: 'Jane Doe' },
            })
            fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
              target: { value: invalidEmail },
            })
            fireEvent.change(screen.getByRole('textbox', { name: /subject/i }), {
              target: { value: 'Hello' },
            })
            fireEvent.change(screen.getByRole('textbox', { name: /message/i }), {
              target: { value: 'Test message' },
            })

            // Submit the form
            await act(async () => {
              fireEvent.click(screen.getByRole('button', { name: /send message/i }))
            })

            // Assert email error is shown
            const emailError = document.getElementById('email-error')
            expect(emailError).not.toBeNull()
            expect(emailError!.textContent?.trim().length).toBeGreaterThan(0)

            // Assert no success message is shown
            const alerts = screen.queryAllByRole('alert')
            const successShown = alerts.some((el) =>
              el.textContent?.includes('Message sent!')
            )
            expect(successShown).toBe(false)

            unmount()
          }
        ),
        { numRuns: 100 }
      )
    },
    30000
  )
})

// Unit tests for ContactForm
// Requirements: 7.2, 7.3, 7.4
describe('ContactForm – unit tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('shows success confirmation after valid submission', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))

    render(<ContactForm />)

    fireEvent.change(screen.getByRole('textbox', { name: /name/i }), {
      target: { value: 'Jane Doe' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'jane@example.com' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: /subject/i }), {
      target: { value: 'Hello' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: /message/i }), {
      target: { value: 'This is a test message.' },
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    })

    expect(screen.getByRole('alert')).toHaveTextContent('Message sent!')
  })

  it('shows inline errors for all missing required fields', async () => {
    render(<ContactForm />)

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    })

    expect(document.getElementById('name-error')).not.toBeNull()
    expect(document.getElementById('email-error')).not.toBeNull()
    expect(document.getElementById('subject-error')).not.toBeNull()
    expect(document.getElementById('message-error')).not.toBeNull()
  })

  it('shows email error for invalid email format', async () => {
    render(<ContactForm />)

    fireEvent.change(screen.getByRole('textbox', { name: /name/i }), {
      target: { value: 'Jane Doe' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'notanemail' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: /subject/i }), {
      target: { value: 'Hello' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: /message/i }), {
      target: { value: 'Test message' },
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    })

    const emailError = document.getElementById('email-error')
    expect(emailError).not.toBeNull()
    expect(emailError!.textContent?.trim().length).toBeGreaterThan(0)
    expect(screen.queryByText('Message sent!')).toBeNull()
  })
})
