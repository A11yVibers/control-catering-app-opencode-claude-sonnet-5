import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/currency'
import QuantityStepper from '../components/QuantityStepper'
import GuestCountControl from '../components/GuestCountControl'
import PickupDatePicker from '../components/PickupDatePicker'
import { isDateWithinOrderWindow, formatFriendlyDate } from '../utils/date'

export default function Cart() {
  const navigate = useNavigate()
  const {
    detailedItems,
    updateQuantity,
    removeItem,
    subtotal,
    tax,
    total,
    pickupDate,
    setPickupDate,
    guestCount,
    setGuestCount,
    lastRemovedNotice,
    clearNotice,
  } = useCart()

  const dateValid = isDateWithinOrderWindow(pickupDate)
  const canCheckout = detailedItems.length > 0 && dateValid

  if (detailedItems.length === 0) {
    return (
      <div className="container cart-page cart-page--empty">
        <h1>Your cart</h1>
        <p>Your cart is empty. Browse the weekly menu to add homemade dishes.</p>
        <Link to="/menu" className="btn btn--primary">
          View the menu
        </Link>
      </div>
    )
  }

  return (
    <div className="container cart-page">
      <h1>Your cart</h1>

      {lastRemovedNotice && (
        <div className="notice notice--warning">
          <p>{lastRemovedNotice}</p>
          <button type="button" className="notice__dismiss" onClick={clearNotice} aria-label="Dismiss notice">
            ×
          </button>
        </div>
      )}

      <div className="cart-page__grid">
        <div className="cart-page__items">
          {detailedItems.map(({ dish, quantity, lineTotal }) => (
            <div key={dish.id} className="cart-row">
              <img src={dish.image} alt={dish.name} className="cart-row__image" />
              <div className="cart-row__info">
                <Link to={`/menu/item/${dish.id}`} className="cart-row__name">
                  {dish.name}
                </Link>
                <p className="cart-row__unit-price">{formatCurrency(dish.price)} / serving</p>
              </div>
              <QuantityStepper value={quantity} min={1} max={30} onChange={(n) => updateQuantity(dish.id, n)} />
              <div className="cart-row__total">{formatCurrency(lineTotal)}</div>
              <button
                type="button"
                className="cart-row__remove"
                onClick={() => removeItem(dish.id)}
                aria-label={`Remove ${dish.name} from cart`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <aside className="cart-page__summary">
          <div className="summary-card">
            <h2>Order details</h2>
            <PickupDatePicker value={pickupDate} onChange={setPickupDate} id="cart-pickup-date" />
            {!dateValid && (
              <p className="field-error">Please choose a pickup date 2–14 days from today.</p>
            )}
            <GuestCountControl value={guestCount} onChange={setGuestCount} />

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

            <button
              type="button"
              className="btn btn--primary btn--lg btn--full"
              disabled={!canCheckout}
              onClick={() => navigate('/checkout')}
            >
              Proceed to checkout
            </button>
            {pickupDate && dateValid && (
              <p className="summary-card__pickup-note">Pickup: {formatFriendlyDate(pickupDate)}</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
