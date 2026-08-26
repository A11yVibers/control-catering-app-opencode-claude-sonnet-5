import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle.js'
import FoodCard from '../components/FoodCard.jsx'
import PortionMeter from '../components/PortionMeter.jsx'
import { useCart } from '../context/CartContext.jsx'
import { getMenuItemsForDay, CATEGORIES, MIN_LEAD_DAYS, MAX_LEAD_DAYS } from '../data/menu.js'
import {
  getEarliestPickupDate,
  getLatestPickupDate,
  toInputDateString,
  fromInputDateString,
  validatePickupDate,
  formatLongDate,
} from '../utils/date.js'

const CATEGORY_ORDER = ['protein', 'vegetarian', 'side']

export default function Menu() {
  usePageTitle('Menu')
  const { pickupDate, setPickupDate, items, addItem, clearCart, totalPortions } = useCart()
  const [statusMessage, setStatusMessage] = useState('')

  const today = useMemo(() => new Date(), [])
  const minDate = useMemo(() => getEarliestPickupDate(today), [today])
  const maxDate = useMemo(() => getLatestPickupDate(today), [today])

  useEffect(() => {
    if (!pickupDate) {
      setPickupDate(toInputDateString(minDate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectedDate = pickupDate ? fromInputDateString(pickupDate) : null
  const dateError = selectedDate ? validatePickupDate(selectedDate, today) : null
  const dayOfWeek = selectedDate && !dateError ? selectedDate.getDay() : null

  const menuItems = useMemo(
    () => (dayOfWeek !== null ? getMenuItemsForDay(dayOfWeek) : []),
    [dayOfWeek]
  )

  const itemsByCategory = useMemo(() => {
    const grouped = { protein: [], vegetarian: [], side: [] }
    menuItems.forEach((item) => {
      grouped[item.category].push(item)
    })
    return grouped
  }, [menuItems])

  function handleDateChange(event) {
    const newValue = event.target.value
    if (items.length > 0 && newValue !== pickupDate) {
      const confirmed = window.confirm(
        'Changing the pickup date will clear the items already in your cart, since the menu differs by day. Continue?'
      )
      if (!confirmed) {
        return
      }
      clearCart()
    }
    setPickupDate(newValue)
    setStatusMessage('')
  }

  function handleAdd(item, quantity) {
    addItem(item.id, quantity)
    setStatusMessage(
      `Added ${quantity} serving${quantity === 1 ? '' : 's'} of ${item.name} to your cart.`
    )
  }

  return (
    <div className="page page--menu container">
      <h1>Menu</h1>
      <p>
        Select a pickup date to see that day&rsquo;s menu. Orders must be placed at least{' '}
        {MIN_LEAD_DAYS} days and at most {MAX_LEAD_DAYS} days before pickup.
      </p>

      <div className="date-picker-field">
        <label htmlFor="pickup-date">Pickup date</label>
        <input
          id="pickup-date"
          type="date"
          autoComplete="off"
          value={pickupDate ?? ''}
          min={toInputDateString(minDate)}
          max={toInputDateString(maxDate)}
          onChange={handleDateChange}
          aria-describedby="pickup-date-hint pickup-date-error"
        />
        <p id="pickup-date-hint" className="field-hint">
          Earliest: {formatLongDate(minDate)}. Latest: {formatLongDate(maxDate)}.
        </p>
        <p id="pickup-date-error" className="field-error" role="alert">
          {dateError ?? ''}
        </p>
      </div>

      {selectedDate && !dateError && (
        <p className="menu-day-heading">
          Showing the menu for <strong>{formatLongDate(selectedDate)}</strong>
        </p>
      )}

      <div aria-live="polite" className="visually-hidden">
        {statusMessage}
      </div>

      {selectedDate && !dateError && (
        <>
          <PortionMeter totalPortions={totalPortions} />
          <p className="menu-cart-link">
            <Link to="/cart" className="standalone-link">
              Go to cart
              <span className="visually-hidden"> and review your order</span>
            </Link>
          </p>

          {CATEGORY_ORDER.map((category) => (
            <section
              key={category}
              className="menu-category"
              aria-labelledby={`category-heading-${category}`}
            >
              <h2 id={`category-heading-${category}`}>{CATEGORIES[category].plural}</h2>
              <ul className="food-card-grid">
                {itemsByCategory[category].map((item) => (
                  <FoodCard key={item.id} item={item} onAdd={handleAdd} />
                ))}
              </ul>
            </section>
          ))}
        </>
      )}
    </div>
  )
}
