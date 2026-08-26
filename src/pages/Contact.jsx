import { useState } from 'react'
import { BUSINESS } from '../data/businessInfo'

const MESSAGES_KEY = 'homestead-catering:messages'

function saveMessage(message) {
  try {
    const raw = localStorage.getItem(MESSAGES_KEY)
    const messages = raw ? JSON.parse(raw) : []
    messages.unshift({ ...message, id: Date.now(), createdAt: new Date().toISOString() })
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages))
  } catch {
    // ignore storage errors
  }
}

const initialForm = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) newErrors.email = 'Please enter a valid email address.'
    if (!form.message.trim()) newErrors.message = 'Please enter a message.'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    saveMessage(form)
    setSubmitted(true)
    setForm(initialForm)
  }

  return (
    <div className="page container">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>Questions about your order, ingredients, or a large event? Reach out any of the ways below.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <h2>Get in touch</h2>
          <ul className="contact-info__list">
            <li>
              <span className="contact-info__label">Phone</span>
              <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>
            </li>
            <li>
              <span className="contact-info__label">Email</span>
              <a href={BUSINESS.emailHref}>{BUSINESS.email}</a>
            </li>
            <li>
              <span className="contact-info__label">Pickup address</span>
              <span>{BUSINESS.address}</span>
            </li>
          </ul>

          <h3>Follow us</h3>
          <div className="social-links social-links--large">
            <a href={BUSINESS.social.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={BUSINESS.social.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a href={BUSINESS.social.yelp} target="_blank" rel="noreferrer">Yelp</a>
          </div>

          <h3>Pickup hours</h3>
          <ul className="hours-list">
            {BUSINESS.pickupHours.map((h) => (
              <li key={h.day}><span>{h.day}</span><span>{h.hours}</span></li>
            ))}
          </ul>
        </div>

        <div className="contact-form-wrap">
          <h2>Send a message</h2>
          {submitted && (
            <p className="form-success" role="status" aria-live="polite">
              Thanks for reaching out! Your message has been recorded — we&rsquo;ll get back to you soon.
            </p>
          )}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>
            <div className="form-row">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>
            <div className="form-row">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                rows={5}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                aria-invalid={!!errors.message}
              />
              {errors.message && <p className="form-error">{errors.message}</p>}
            </div>
            <button type="submit" className="btn btn--primary">Send Message</button>
            <p className="form-hint">
              This form saves your message on this device only, since this site runs without a server.
              For a faster response, please call or email us directly.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
