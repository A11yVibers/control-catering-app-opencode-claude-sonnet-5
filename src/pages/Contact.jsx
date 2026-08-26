import { useRef, useState } from 'react'
import usePageTitle from '../hooks/usePageTitle.js'
import VisuallyHidden from '../components/VisuallyHidden.jsx'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const BUSINESS_EMAIL = 'hello@homesteadtablecatering.example'

export default function Contact() {
  usePageTitle('Contact')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const firstErrorRef = useRef(null)

  function validate() {
    const errs = {}
    if (!name.trim()) errs.name = 'Enter your name.'
    if (!email.trim()) {
      errs.email = 'Enter your email address.'
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      errs.email = 'Enter a valid email address, like name@example.com.'
    }
    if (!message.trim()) errs.message = 'Enter a message.'
    return errs
  }

  function handleSubmit(event) {
    event.preventDefault()
    const errs = validate()
    setErrors(errs)
    setSubmitted(false)
    if (Object.keys(errs).length > 0) {
      if (firstErrorRef.current) firstErrorRef.current.focus()
      return
    }

    const subject = encodeURIComponent(`Website message from ${name.trim()}`)
    const body = encodeURIComponent(
      `${message.trim()}\n\n— ${name.trim()} (${email.trim()})`
    )
    window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <div className="page page--contact container">
      <h1>Contact us</h1>

      <section aria-labelledby="reach-us-heading">
        <h2 id="reach-us-heading">Ways to reach us</h2>
        <ul className="contact-methods">
          <li>
            Phone: <a href="tel:+15555550142">(555) 555-0142</a>
          </li>
          <li>
            Email: <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>
          </li>
          <li>
            Facebook:{' '}
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              Homestead Table Catering
              <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
            </a>
          </li>
          <li>
            Instagram:{' '}
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              @homesteadtablecatering
              <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
            </a>
          </li>
        </ul>
      </section>

      <section aria-labelledby="contact-form-heading">
        <h2 id="contact-form-heading">Send a message</h2>
        <p>
          Filling out this form opens your email application with your message ready to
          send to us — this site does not send messages on its own.
        </p>

        {submitted && (
          <p role="status" className="form-success">
            Your email application should now be open with your message ready to send.
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={errors.name ? 'true' : undefined}
              aria-describedby={errors.name ? 'error-contact-name' : undefined}
              ref={errors.name ? firstErrorRef : null}
            />
            {errors.name && (
              <p id="error-contact-name" className="field-error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="contact-email">Email address</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={errors.email ? 'true' : undefined}
              aria-describedby={errors.email ? 'error-contact-email' : undefined}
              ref={!errors.name && errors.email ? firstErrorRef : null}
            />
            {errors.email && (
              <p id="error-contact-email" className="field-error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-invalid={errors.message ? 'true' : undefined}
              aria-describedby={errors.message ? 'error-contact-message' : undefined}
              ref={!errors.name && !errors.email && errors.message ? firstErrorRef : null}
            />
            {errors.message && (
              <p id="error-contact-message" className="field-error">
                {errors.message}
              </p>
            )}
          </div>

          <button type="submit" className="button button--primary">
            Send message
          </button>
        </form>
      </section>
    </div>
  )
}
