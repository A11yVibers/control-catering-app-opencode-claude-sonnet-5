import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle.js'
import { useCart } from '../context/CartContext.jsx'
import { MIN_PORTIONS, MAX_PORTIONS } from '../data/menu.js'
import { PICKUP_TIME_SLOTS, PAYMENT_METHODS } from '../data/pickupTimes.js'
import { formatCurrency } from '../utils/format.js'
import { fromInputDateString, formatLongDate } from '../utils/date.js'
import { generateInvoiceNumber, saveOrder } from '../utils/orders.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[0-9()+\-.\s]{7,20}$/

export default function Checkout() {
  usePageTitle('Checkout')
  const navigate = useNavigate()
  const { pickupDate, lines, totalPortions, totalPrice, clearCart, setPickupDate } = useCart()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [instructions, setInstructions] = useState('')
  const [errors, setErrors] = useState({})
  const summaryRef = useRef(null)

  const selectedDate = pickupDate ? fromInputDateString(pickupDate) : null

  useEffect(() => {
    if (Object.keys(errors).length > 0 && summaryRef.current) {
      summaryRef.current.focus()
    }
  }, [errors])

  if (lines.length === 0) {
    return (
      <div className="page container">
        <h1>Checkout</h1>
        <p>
          Your cart is empty, so there is nothing to check out.{' '}
          <Link to="/menu">Browse the menu</Link> to add items first.
        </p>
      </div>
    )
  }

  function validate() {
    const errs = {}
    if (!fullName.trim()) errs.fullName = 'Enter your full name.'
    if (!email.trim()) {
      errs.email = 'Enter your email address.'
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      errs.email = 'Enter a valid email address, like name@example.com.'
    }
    if (!phone.trim()) {
      errs.phone = 'Enter your phone number.'
    } else if (!PHONE_PATTERN.test(phone.trim())) {
      errs.phone = 'Enter a valid phone number.'
    }
    if (!pickupTime) errs.pickupTime = 'Choose a pickup time window.'
    if (!paymentMethod) errs.paymentMethod = 'Choose a payment method.'
    if (totalPortions < MIN_PORTIONS || totalPortions > MAX_PORTIONS) {
      errs.portions = `Your order must serve between ${MIN_PORTIONS} and ${MAX_PORTIONS} people. It currently serves ${totalPortions}. Return to your cart to adjust quantities.`
    }
    return errs
  }

  function handleSubmit(event) {
    event.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      return
    }

    const timeSlot = PICKUP_TIME_SLOTS.find((slot) => slot.value === pickupTime)
    const paymentLabel = PAYMENT_METHODS.find((m) => m.value === paymentMethod)?.label ?? paymentMethod

    const order = {
      invoiceNumber: generateInvoiceNumber(),
      placedAt: new Date().toISOString(),
      pickupDate,
      pickupTimeLabel: timeSlot ? timeSlot.label : '',
      customer: { fullName: fullName.trim(), email: email.trim(), phone: phone.trim() },
      paymentMethodLabel: paymentLabel,
      instructions: instructions.trim(),
      lines: lines.map((line) => ({
        id: line.id,
        name: line.food.name,
        quantity: line.quantity,
        pricePerPerson: line.food.pricePerPerson,
        lineTotal: line.lineTotal,
      })),
      totalPortions,
      totalPrice,
    }

    saveOrder(order)
    clearCart()
    setPickupDate(null)
    navigate('/order-confirmation', { state: { invoiceNumber: order.invoiceNumber } })
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <div className="page page--checkout container">
      <h1>Checkout</h1>

      {selectedDate && (
        <p>
          Pickup date: <strong>{formatLongDate(selectedDate)}</strong>{' '}
          <Link to="/menu">Change date</Link>
        </p>
      )}

      {hasErrors && (
        <div
          className="error-summary"
          role="alert"
          tabIndex={-1}
          ref={summaryRef}
          aria-labelledby="error-summary-heading"
        >
          <h2 id="error-summary-heading">There is a problem with your order</h2>
          <ul>
            {Object.entries(errors).map(([key, message]) => (
              <li key={key}>
                {key === 'portions' ? (
                  message
                ) : (
                  <a href={`#field-${key}`}>{message}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <fieldset className="form-section">
          <legend>Contact information</legend>

          <div className="form-field">
            <label htmlFor="field-fullName">Full name</label>
            <input
              id="field-fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              aria-invalid={errors.fullName ? 'true' : undefined}
              aria-describedby={errors.fullName ? 'error-fullName' : undefined}
            />
            {errors.fullName && (
              <p id="error-fullName" className="field-error">
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="field-email">Email address</label>
            <input
              id="field-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={errors.email ? 'true' : undefined}
              aria-describedby={errors.email ? 'error-email' : undefined}
            />
            {errors.email && (
              <p id="error-email" className="field-error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="field-phone">Phone number</label>
            <input
              id="field-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={errors.phone ? 'true' : undefined}
              aria-describedby={errors.phone ? 'error-phone' : undefined}
            />
            {errors.phone && (
              <p id="error-phone" className="field-error">
                {errors.phone}
              </p>
            )}
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Pickup</legend>
          <div className="form-field">
            <label htmlFor="field-pickupTime">Pickup time window</label>
            <select
              id="field-pickupTime"
              name="pickupTime"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              aria-invalid={errors.pickupTime ? 'true' : undefined}
              aria-describedby={errors.pickupTime ? 'error-pickupTime' : undefined}
            >
              <option value="">Choose a time</option>
              {PICKUP_TIME_SLOTS.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
            {errors.pickupTime && (
              <p id="error-pickupTime" className="field-error">
                {errors.pickupTime}
              </p>
            )}
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Payment method</legend>
          <div
            role="radiogroup"
            aria-describedby={errors.paymentMethod ? 'error-paymentMethod' : undefined}
          >
            {PAYMENT_METHODS.map((method) => (
              <div className="radio-field" key={method.value}>
                <input
                  id={`payment-${method.value}`}
                  type="radio"
                  name="paymentMethod"
                  value={method.value}
                  checked={paymentMethod === method.value}
                  onChange={() => setPaymentMethod(method.value)}
                />
                <label htmlFor={`payment-${method.value}`}>{method.label}</label>
              </div>
            ))}
          </div>
          <p>No payment is collected online — you will pay in person when you pick up your order.</p>
          {errors.paymentMethod && (
            <p id="error-paymentMethod" className="field-error">
              {errors.paymentMethod}
            </p>
          )}
        </fieldset>

        <fieldset className="form-section">
          <legend>Special instructions</legend>
          <div className="form-field">
            <label htmlFor="field-instructions">
              Allergies, substitutions or other notes (optional)
            </label>
            <textarea
              id="field-instructions"
              name="instructions"
              rows={4}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
        </fieldset>

        <section className="order-review" aria-labelledby="order-review-heading">
          <h2 id="order-review-heading">Order summary</h2>
          <ul className="order-review__list">
            {lines.map((line) => (
              <li key={line.id}>
                <span>
                  {line.quantity} × {line.food.name}
                </span>
                <span>{formatCurrency(line.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <p>Total servings: {totalPortions}</p>
          <p className="order-review__total">
            Total: <strong>{formatCurrency(totalPrice)}</strong>
          </p>
          {errors.portions && <p className="field-error">{errors.portions}</p>}
        </section>

        <button type="submit" className="button button--primary button--large">
          Place order
        </button>
      </form>
    </div>
  )
}
