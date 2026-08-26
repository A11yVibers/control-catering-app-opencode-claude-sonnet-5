import { Link, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { useCart } from '../context/CartContext'
import QuantityStepper from '../components/QuantityStepper'
import { CATEGORY_LABELS } from '../data/menuData'
import { formatCurrency, MIN_PORTION, MAX_PORTION } from '../utils/pricing'
import {
  formatDisplayDate,
  getMinOrderDate,
  getMaxOrderDate,
  toISODate,
  addDays,
  DAY_NAMES,
} from '../utils/dateUtils'

export default function Cart() {
  const { orderDate, items, totals, updateQty, removeItem, changeOrderDate, setOrderDate } = useCart()
  const navigate = useNavigate()

  const requiredDay = items[0]?.day

  const validDateOptions = useMemo(() => {
    if (!requiredDay) return []
    const min = getMinOrderDate()
    const max = getMaxOrderDate()
    const options = []
    for (let d = new Date(min); d.getTime() <= max.getTime(); d = addDays(d, 1)) {
      if (DAY_NAMES[d.getDay()] === requiredDay) {
        options.push(toISODate(d))
      }
    }
    return options
  }, [requiredDay])

  const handlePickDate = (iso) => {
    setOrderDate(iso)
  }

  const isEmpty = items.length === 0

  return (
    <div className="page container">
      <div className="page-header">
        <h1>Your Cart</h1>
        <p>Review your items, adjust servings, and remove anything you don&rsquo;t need.</p>
      </div>

      {isEmpty ? (
        <div className="empty-state">
          <p>Your cart is empty.</p>
          <Link to="/menu" className="btn btn--primary">Browse the Menu</Link>
        </div>
      ) : (
        <>
          <div className="cart-order-date">
            {orderDate ? (
              <p>
                Pickup date: <strong>{formatDisplayDate(orderDate)}</strong>{' '}
                <Link to="/menu" className="link-inline">change</Link>
              </p>
            ) : (
              <div className="cart-order-date__missing">
                <p>
                  Please choose a pickup date for your <strong>{requiredDay}</strong> order:
                </p>
                <div className="date-chip-row">
                  {validDateOptions.map((iso) => (
                    <button
                      key={iso}
                      type="button"
                      className="date-chip"
                      onClick={() => handlePickDate(iso)}
                    >
                      {formatDisplayDate(iso, { weekday: 'short', month: 'short', day: 'numeric', year: undefined })}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <table className="cart-table" aria-label="Items in your cart">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Category</th>
                <th scope="col">Price / person</th>
                <th scope="col">Servings</th>
                <th scope="col">Line total</th>
                <th scope="col"><span className="sr-only">Remove</span></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Link to={`/menu/item/${item.id}`} className="cart-table__item-name">
                      {item.name}
                    </Link>
                  </td>
                  <td>{CATEGORY_LABELS[item.category]}</td>
                  <td>{formatCurrency(item.pricePerPerson)}</td>
                  <td>
                    <QuantityStepper
                      qty={item.qty}
                      onChange={(qty) => updateQty(item.id, qty)}
                      idPrefix={`cart-${item.id}`}
                    />
                  </td>
                  <td>{formatCurrency(item.pricePerPerson * item.qty)}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn--text btn--danger"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="cart-hint">
            Each item&rsquo;s servings must be between {MIN_PORTION} and {MAX_PORTION} guests.
          </p>

          <div className="cart-summary">
            <div className="cart-summary__row">
              <span>Subtotal</span>
              <span>{formatCurrency(totals.subtotal)}</span>
            </div>
            <div className="cart-summary__row">
              <span>Estimated tax</span>
              <span>{formatCurrency(totals.tax)}</span>
            </div>
            <div className="cart-summary__row cart-summary__row--total">
              <span>Total</span>
              <span>{formatCurrency(totals.total)}</span>
            </div>
          </div>

          <div className="cart-actions">
            <Link to="/menu" className="btn btn--ghost">Add more items</Link>
            <button
              type="button"
              className="btn btn--primary btn--large"
              disabled={!orderDate}
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
          {!orderDate && (
            <p className="cart-hint cart-hint--warning">
              Choose a pickup date above before checking out.
            </p>
          )}
        </>
      )}
    </div>
  )
}
