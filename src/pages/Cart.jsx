import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle.js'
import QuantityStepper from '../components/QuantityStepper.jsx'
import PortionMeter from '../components/PortionMeter.jsx'
import { useCart } from '../context/CartContext.jsx'
import { MIN_PORTIONS, MAX_PORTIONS } from '../data/menu.js'
import { formatCurrency } from '../utils/format.js'
import { fromInputDateString, formatLongDate } from '../utils/date.js'
import IMAGES from '../data/images.js'

export default function Cart() {
  usePageTitle('Cart')
  const navigate = useNavigate()
  const { pickupDate, lines, updateQuantity, removeItem, totalPortions, totalPrice } = useCart()
  const [statusMessage, setStatusMessage] = useState('')
  const [checkoutError, setCheckoutError] = useState('')

  const selectedDate = pickupDate ? fromInputDateString(pickupDate) : null

  function handleRemove(line) {
    removeItem(line.id)
    setStatusMessage(`Removed ${line.food.name} from your cart.`)
  }

  function handleQuantityChange(line, quantity) {
    updateQuantity(line.id, quantity)
  }

  function handleCheckout() {
    if (lines.length === 0) {
      setCheckoutError('Add at least one item to your cart before checking out.')
      return
    }
    if (totalPortions < MIN_PORTIONS || totalPortions > MAX_PORTIONS) {
      setCheckoutError(
        `Your order must serve between ${MIN_PORTIONS} and ${MAX_PORTIONS} people. It currently serves ${totalPortions}.`
      )
      return
    }
    setCheckoutError('')
    navigate('/checkout')
  }

  return (
    <div className="page page--cart container">
      <h1>Your cart</h1>

      <div aria-live="polite" className="visually-hidden">
        {statusMessage}
      </div>

      {selectedDate && (
        <p>
          Pickup date: <strong>{formatLongDate(selectedDate)}</strong>{' '}
          <Link to="/menu">
            Change date
            <span className="visually-hidden"> or add more items</span>
          </Link>
        </p>
      )}

      {lines.length === 0 ? (
        <p>
          Your cart is empty.{' '}
          <Link to="/menu">Browse the menu to add items</Link>.
        </p>
      ) : (
        <>
          <ul className="cart-list">
            {lines.map((line) => {
              const image = IMAGES[line.id]
              return (
                <li key={line.id} className="cart-list__item">
                  <img
                    className="cart-list__image"
                    src={image.src}
                    alt=""
                    width="96"
                    height="64"
                  />
                  <div className="cart-list__details">
                    <h2 className="cart-list__name">
                      <Link to={`/menu/${line.id}`}>{line.food.name}</Link>
                    </h2>
                    <p className="cart-list__price">
                      {formatCurrency(line.food.pricePerPerson)} per person
                    </p>
                  </div>
                  <QuantityStepper
                    id={`cart-qty-${line.id}`}
                    label="Servings"
                    itemName={line.food.name}
                    value={line.quantity}
                    min={1}
                    max={30}
                    onChange={(qty) => handleQuantityChange(line, qty)}
                  />
                  <p className="cart-list__line-total">{formatCurrency(line.lineTotal)}</p>
                  <button
                    type="button"
                    className="button button--text"
                    onClick={() => handleRemove(line)}
                  >
                    Remove
                    <span className="visually-hidden"> {line.food.name} from cart</span>
                  </button>
                </li>
              )
            })}
          </ul>

          <PortionMeter totalPortions={totalPortions} />

          <p className="cart-total">
            Total: <strong>{formatCurrency(totalPrice)}</strong>
          </p>

          <p id="checkout-error" className="field-error" role="alert">
            {checkoutError}
          </p>

          <button type="button" className="button button--primary button--large" onClick={handleCheckout}>
            Proceed to checkout
          </button>
        </>
      )}
    </div>
  )
}
