import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { BUSINESS } from '../data/businessInfo'
import { formatCurrency } from '../utils/pricing'
import { formatDisplayDate } from '../utils/dateUtils'
import { createInvoice } from '../utils/invoice'

const initialForm = {
  fullName: '',
  phone: '',
  email: '',
  pickupWindow: BUSINESS.pickupWindows[0],
  paymentMethod: 'card',
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvv: '',
  specialInstructions: '',
}

function formatCardNumberInput(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiryInput(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

function validate(form) {
  const errors = {}
  if (!form.fullName.trim()) errors.fullName = 'Please enter your full name.'
  if (!/^[\d\s()+-]{7,}$/.test(form.phone.trim())) errors.phone = 'Please enter a valid phone number.'
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = 'Please enter a valid email address.'

  if (form.paymentMethod === 'card') {
    const digits = form.cardNumber.replace(/\D/g, '')
    if (digits.length < 15 || digits.length > 16) errors.cardNumber = 'Enter a valid 15–16 digit card number.'
    if (!form.cardName.trim()) errors.cardName = 'Enter the name on the card.'
    if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) errors.cardExpiry = 'Use MM/YY format.'
    else {
      const [mm, yy] = form.cardExpiry.split('/').map(Number)
      if (mm < 1 || mm > 12) errors.cardExpiry = 'Enter a valid month.'
    }
    if (!/^\d{3,4}$/.test(form.cardCvv)) errors.cardCvv = 'Enter a valid CVV.'
  }
  return errors
}

export default function Checkout() {
  const { orderDate, items, totals, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  if (items.length === 0) {
    return (
      <div className="page container">
        <p>Your cart is empty, so there&rsquo;s nothing to check out yet.</p>
        <Link to="/menu" className="btn btn--primary">Browse the Menu</Link>
      </div>
    )
  }

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)

    const payment =
      form.paymentMethod === 'card'
        ? {
            method: 'Credit / Debit Card',
            cardName: form.cardName.trim(),
            cardLast4: form.cardNumber.replace(/\D/g, '').slice(-4),
          }
        : { method: 'Cash at Pickup' }

    const invoice = createInvoice({
      orderDate,
      items,
      customer: {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
      },
      pickup: {
        date: orderDate,
        window: form.pickupWindow,
        location: BUSINESS.address,
      },
      payment,
      specialInstructions: form.specialInstructions.trim(),
    })

    clearCart()
    navigate(`/confirmation/${invoice.id}`)
  }

  return (
    <div className="page container">
      <div className="page-header">
        <h1>Checkout</h1>
        <p>Pickup on <strong>{formatDisplayDate(orderDate)}</strong>. No payment is actually processed — this is a demo checkout.</p>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <fieldset className="form-section">
            <legend>Contact information</legend>
            <div className="form-row">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                type="text"
                value={form.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              />
              {errors.fullName && <p id="fullName-error" className="form-error">{errors.fullName}</p>}
            </div>
            <div className="form-row form-row--split">
              <div>
                <label htmlFor="phone">Phone number</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(555) 555-1234"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && <p id="phone-error" className="form-error">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <p id="email-error" className="form-error">{errors.email}</p>}
              </div>
            </div>
          </fieldset>

          <fieldset className="form-section">
            <legend>Pickup details</legend>
            <div className="form-row">
              <label htmlFor="pickupWindow">Pickup time window</label>
              <select
                id="pickupWindow"
                value={form.pickupWindow}
                onChange={(e) => update('pickupWindow', e.target.value)}
              >
                {BUSINESS.pickupWindows.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>
            <p className="form-hint">Pickup location: {BUSINESS.address}</p>
          </fieldset>

          <fieldset className="form-section">
            <legend>Payment method</legend>
            <div className="radio-row">
              <label className="radio-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={form.paymentMethod === 'card'}
                  onChange={() => update('paymentMethod', 'card')}
                />
                Credit / Debit Card
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={form.paymentMethod === 'cash'}
                  onChange={() => update('paymentMethod', 'cash')}
                />
                Cash at Pickup
              </label>
            </div>

            {form.paymentMethod === 'card' && (
              <div className="card-fields">
                <div className="form-row">
                  <label htmlFor="cardName">Name on card</label>
                  <input
                    id="cardName"
                    type="text"
                    value={form.cardName}
                    onChange={(e) => update('cardName', e.target.value)}
                    aria-invalid={!!errors.cardName}
                    aria-describedby={errors.cardName ? 'cardName-error' : undefined}
                  />
                  {errors.cardName && <p id="cardName-error" className="form-error">{errors.cardName}</p>}
                </div>
                <div className="form-row">
                  <label htmlFor="cardNumber">Card number</label>
                  <input
                    id="cardNumber"
                    type="text"
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    value={form.cardNumber}
                    onChange={(e) => update('cardNumber', formatCardNumberInput(e.target.value))}
                    aria-invalid={!!errors.cardNumber}
                    aria-describedby={errors.cardNumber ? 'cardNumber-error' : undefined}
                  />
                  {errors.cardNumber && <p id="cardNumber-error" className="form-error">{errors.cardNumber}</p>}
                </div>
                <div className="form-row form-row--split">
                  <div>
                    <label htmlFor="cardExpiry">Expiry (MM/YY)</label>
                    <input
                      id="cardExpiry"
                      type="text"
                      inputMode="numeric"
                      placeholder="MM/YY"
                      value={form.cardExpiry}
                      onChange={(e) => update('cardExpiry', formatExpiryInput(e.target.value))}
                      aria-invalid={!!errors.cardExpiry}
                      aria-describedby={errors.cardExpiry ? 'cardExpiry-error' : undefined}
                    />
                    {errors.cardExpiry && <p id="cardExpiry-error" className="form-error">{errors.cardExpiry}</p>}
                  </div>
                  <div>
                    <label htmlFor="cardCvv">CVV</label>
                    <input
                      id="cardCvv"
                      type="text"
                      inputMode="numeric"
                      placeholder="123"
                      value={form.cardCvv}
                      onChange={(e) => update('cardCvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                      aria-invalid={!!errors.cardCvv}
                      aria-describedby={errors.cardCvv ? 'cardCvv-error' : undefined}
                    />
                    {errors.cardCvv && <p id="cardCvv-error" className="form-error">{errors.cardCvv}</p>}
                  </div>
                </div>
                <p className="form-hint">
                  This is a demo store — card details are never sent anywhere or charged. Only the last 4 digits are kept with your invoice.
                </p>
              </div>
            )}
          </fieldset>

          <fieldset className="form-section">
            <legend>Special instructions</legend>
            <div className="form-row">
              <label htmlFor="specialInstructions">Anything we should know? (allergies, packaging preferences, etc.)</label>
              <textarea
                id="specialInstructions"
                rows={4}
                value={form.specialInstructions}
                onChange={(e) => update('specialInstructions', e.target.value)}
              />
            </div>
          </fieldset>

          <button type="submit" className="btn btn--primary btn--large" disabled={submitting}>
            Place Order
          </button>
        </form>

        <aside className="order-summary-panel">
          <h2>Order Summary</h2>
          <p className="order-summary-panel__date">{formatDisplayDate(orderDate)}</p>
          <ul className="order-summary-panel__list">
            {items.map((item) => (
              <li key={item.id}>
                <span>{item.name} × {item.qty}</span>
                <span>{formatCurrency(item.pricePerPerson * item.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="order-summary-panel__totals">
            <div><span>Subtotal</span><span>{formatCurrency(totals.subtotal)}</span></div>
            <div><span>Estimated tax</span><span>{formatCurrency(totals.tax)}</span></div>
            <div className="order-summary-panel__grand-total"><span>Total</span><span>{formatCurrency(totals.total)}</span></div>
          </div>
        </aside>
      </div>
    </div>
  )
}
