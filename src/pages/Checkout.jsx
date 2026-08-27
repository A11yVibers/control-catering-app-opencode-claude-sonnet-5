import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/currency'
import { formatFriendlyDate, isDateWithinOrderWindow } from '../utils/date'
import { buildTimeSlots } from '../utils/time'
import { BUSINESS } from '../data/business'
import { createInvoice } from '../utils/invoices'

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit or Debit Card' },
  { id: 'cash', label: 'Cash at Pickup' },
]

const initialForm = {
  fullName: '',
  phone: '',
  email: '',
  pickupTime: '',
  paymentMethod: 'card',
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
  specialInstructions: '',
}

function formatCardPreview(digits) {
  return digits
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()
}

export default function Checkout() {
  const navigate = useNavigate()
  const { detailedItems, subtotal, tax, total, pickupDate, guestCount, clearCart } = useCart()
  const timeSlots = useMemo(() => buildTimeSlots(BUSINESS.pickupWindow.start, BUSINESS.pickupWindow.end), [])
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  const dateValid = isDateWithinOrderWindow(pickupDate)

  if (detailedItems.length === 0 || !dateValid) {
    return (
      <div className="container checkout-page checkout-page--blocked">
        <h1>Checkout unavailable</h1>
        <p>
          {detailedItems.length === 0
            ? 'Your cart is empty, so there is nothing to check out yet.'
            : 'Your pickup date needs to be updated before you can check out.'}
        </p>
        <Link to="/cart" className="btn btn--primary">
          Return to cart
        </Link>
      </div>
    )
  }

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validate() {
    const errs = {}
    if (!form.fullName.trim()) errs.fullName = 'Please enter your full name.'
    if (!/^[\d\s()+-]{7,}$/.test(form.phone.trim())) errs.phone = 'Please enter a valid phone number.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Please enter a valid email address.'
    if (!form.pickupTime) errs.pickupTime = 'Please choose a pickup time.'
    if (form.paymentMethod === 'card') {
      const digits = form.cardNumber.replace(/\D/g, '')
      if (digits.length !== 16) errs.cardNumber = 'Card number must be 16 digits.'
      if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry.trim())) errs.cardExpiry = 'Use MM/YY format.'
      if (!/^\d{3,4}$/.test(form.cardCvc.trim())) errs.cardCvc = 'CVC must be 3–4 digits.'
      if (!form.cardName.trim()) errs.cardName = 'Please enter the name on the card.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    const digits = form.cardNumber.replace(/\D/g, '')
    const order = {
      pickupDate,
      pickupTime: form.pickupTime,
      guestCount,
      customer: {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
      },
      payment:
        form.paymentMethod === 'card'
          ? { method: 'Credit/Debit Card', cardLast4: digits.slice(-4) }
          : { method: 'Cash at Pickup' },
      specialInstructions: form.specialInstructions.trim(),
      items: detailedItems.map(({ dish, quantity, lineTotal }) => ({
        id: dish.id,
        name: dish.name,
        category: dish.category,
        unitPrice: dish.price,
        quantity,
        lineTotal,
      })),
      subtotal,
      tax,
      total,
      pickupAddress: BUSINESS.pickupAddress,
    }

    const invoice = createInvoice(order)
    clearCart()
    navigate(`/invoice/${invoice.id}`)
  }

  return (
    <div className="container checkout-page">
      <h1>Checkout</h1>
      <form className="checkout-page__grid" onSubmit={handleSubmit} noValidate>
        <div className="checkout-page__fields">
          <section className="form-section">
            <h2>Pickup</h2>
            <p className="form-section__readonly">
              {formatFriendlyDate(pickupDate)} · {BUSINESS.pickupAddress}
              <Link to="/cart" className="form-section__change-link">
                Change date
              </Link>
            </p>
            <label className="field">
              <span>Pickup time</span>
              <select value={form.pickupTime} onChange={(e) => update('pickupTime', e.target.value)}>
                <option value="">Select a time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {errors.pickupTime && <span className="field-error">{errors.pickupTime}</span>}
            </label>
          </section>

          <section className="form-section">
            <h2>Contact information</h2>
            <label className="field">
              <span>Full name</span>
              <input type="text" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} autoComplete="name" />
              {errors.fullName && <span className="field-error">{errors.fullName}</span>}
            </label>
            <div className="field-row">
              <label className="field">
                <span>Phone</span>
                <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} autoComplete="tel" />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </label>
              <label className="field">
                <span>Email</span>
                <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} autoComplete="email" />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </label>
            </div>
          </section>

          <section className="form-section">
            <h2>Payment method</h2>
            <div className="payment-options">
              {PAYMENT_METHODS.map((m) => (
                <label key={m.id} className={`payment-option ${form.paymentMethod === m.id ? 'is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={m.id}
                    checked={form.paymentMethod === m.id}
                    onChange={() => update('paymentMethod', m.id)}
                  />
                  {m.label}
                </label>
              ))}
            </div>

            {form.paymentMethod === 'card' && (
              <div className="card-fields">
                <p className="card-fields__notice">
                  Demo checkout — no real payment is processed or transmitted anywhere.
                </p>
                <label className="field">
                  <span>Name on card</span>
                  <input type="text" value={form.cardName} onChange={(e) => update('cardName', e.target.value)} autoComplete="cc-name" />
                  {errors.cardName && <span className="field-error">{errors.cardName}</span>}
                </label>
                <label className="field">
                  <span>Card number</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0000 0000 0000 0000"
                    value={formatCardPreview(form.cardNumber)}
                    onChange={(e) => update('cardNumber', e.target.value)}
                    autoComplete="cc-number"
                    maxLength={19}
                  />
                  {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
                </label>
                <div className="field-row">
                  <label className="field">
                    <span>Expiry (MM/YY)</span>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={form.cardExpiry}
                      onChange={(e) => update('cardExpiry', e.target.value)}
                      autoComplete="cc-exp"
                      maxLength={5}
                    />
                    {errors.cardExpiry && <span className="field-error">{errors.cardExpiry}</span>}
                  </label>
                  <label className="field">
                    <span>CVC</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={form.cardCvc}
                      onChange={(e) => update('cardCvc', e.target.value)}
                      autoComplete="cc-csc"
                      maxLength={4}
                    />
                    {errors.cardCvc && <span className="field-error">{errors.cardCvc}</span>}
                  </label>
                </div>
              </div>
            )}
          </section>

          <section className="form-section">
            <h2>Special instructions</h2>
            <label className="field">
              <span>Allergies, substitutions, or notes for pickup (optional)</span>
              <textarea
                rows={4}
                value={form.specialInstructions}
                onChange={(e) => update('specialInstructions', e.target.value)}
              />
            </label>
          </section>
        </div>

        <aside className="checkout-page__summary">
          <div className="summary-card">
            <h2>Order summary</h2>
            <p className="summary-card__pickup-note">
              {formatFriendlyDate(pickupDate)} · Serving {guestCount} guests
            </p>
            <ul className="summary-card__items">
              {detailedItems.map(({ dish, quantity, lineTotal }) => (
                <li key={dish.id}>
                  <span>
                    {dish.name} × {quantity}
                  </span>
                  <span>{formatCurrency(lineTotal)}</span>
                </li>
              ))}
            </ul>
            <div className="summary-card__totals">
              <div className="summary-card__row">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="summary-card__row">
                <span>Tax</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="summary-card__row summary-card__row--total">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
            <button type="submit" className="btn btn--primary btn--lg btn--full">
              Place order
            </button>
          </div>
        </aside>
      </form>
    </div>
  )
}
