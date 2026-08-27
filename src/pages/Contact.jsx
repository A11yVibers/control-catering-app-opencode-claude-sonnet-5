import { useState } from 'react'
import { BUSINESS } from '../data/business'

const initialForm = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Please enter a valid email address.'
    if (!form.message.trim()) errs.message = 'Please enter a message.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    const subject = encodeURIComponent(`Message from ${form.name} via website`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `${BUSINESS.emailHref}?subject=${subject}&body=${body}`
    setSent(true)
    setForm(initialForm)
  }

  return (
    <div className="container contact-page">
      <h1>Contact Us</h1>
      <p className="contact-page__intro">
        Questions about an order, a special request, or just want to say hi? Reach out any way that's easiest for
        you.
      </p>

      <div className="contact-page__grid">
        <div className="contact-page__details">
          <h2>Reach us directly</h2>
          <ul className="contact-list">
            <li>
              <span className="contact-list__label">Phone</span>
              <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>
            </li>
            <li>
              <span className="contact-list__label">Email</span>
              <a href={BUSINESS.emailHref}>{BUSINESS.email}</a>
            </li>
            <li>
              <span className="contact-list__label">Location</span>
              <span>{BUSINESS.address}</span>
            </li>
          </ul>

          <h2>Follow along</h2>
          <ul className="contact-list">
            {BUSINESS.social.map((s) => (
              <li key={s.id}>
                <span className="contact-list__label">{s.label}</span>
                <a href={s.href} target="_blank" rel="noreferrer noopener">
                  {s.handle}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <h2>Send a message</h2>
          <label className="field">
            <span>Name</span>
            <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </label>
          <label className="field">
            <span>Email</span>
            <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </label>
          <label className="field">
            <span>Message</span>
            <textarea rows={5} value={form.message} onChange={(e) => update('message', e.target.value)} />
            {errors.message && <span className="field-error">{errors.message}</span>}
          </label>
          <button type="submit" className="btn btn--primary btn--lg btn--full">
            Send message
          </button>
          <p className="contact-form__note">
            Sending opens your email app with the message pre-filled to {BUSINESS.email}.
          </p>
          {sent && <p className="contact-form__success">Your email app should now be open — thanks for reaching out!</p>}
        </form>
      </div>
    </div>
  )
}
