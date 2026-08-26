import { useEffect, useMemo, useState } from 'react'
import OrderDatePicker from '../components/OrderDatePicker'
import FoodCard from '../components/FoodCard'
import { useCart } from '../context/CartContext'
import { getMenuForDay, groupByCategory, CATEGORY_LABELS } from '../data/menuData'
import { getDayName, formatDisplayDate, toISODate, getMinOrderDate, isValidOrderDate } from '../utils/dateUtils'
import { MIN_PORTION } from '../utils/pricing'

export default function Menu() {
  const { orderDate, items: cartItems, setOrderDate, changeOrderDate, addItem } = useCart()
  const [selectedDate, setSelectedDate] = useState('')
  const [pendingDate, setPendingDate] = useState(null)
  const [justAddedId, setJustAddedId] = useState(null)

  useEffect(() => {
    const initial = orderDate && isValidOrderDate(orderDate) ? orderDate : toISODate(getMinOrderDate())
    setSelectedDate(initial)
    if (!orderDate) setOrderDate(initial)
  }, [orderDate, setOrderDate])

  const dayName = selectedDate ? getDayName(selectedDate) : ''
  const menu = dayName ? getMenuForDay(dayName) : null
  const groups = useMemo(() => (menu ? groupByCategory(menu.items) : []), [menu])

  const handleDateChange = (newDate) => {
    if (!newDate) return
    if (cartItems.length > 0 && newDate !== orderDate) {
      setPendingDate(newDate)
      return
    }
    setSelectedDate(newDate)
    setOrderDate(newDate)
  }

  const confirmDateChange = () => {
    if (!pendingDate) return
    setSelectedDate(pendingDate)
    changeOrderDate(pendingDate)
    setPendingDate(null)
  }

  const cancelDateChange = () => setPendingDate(null)

  const handleAdd = (item) => {
    addItem({ ...item, day: dayName }, MIN_PORTION)
    setJustAddedId(item.id)
    window.clearTimeout(handleAdd._t)
    handleAdd._t = window.setTimeout(() => setJustAddedId(null), 1500)
  }

  const findInCart = (id) => cartItems.find((i) => i.id === id)

  return (
    <div className="page container">
      <div className="page-header">
        <h1>This Week&rsquo;s Menu</h1>
        <p>Choose a pickup date to see that day&rsquo;s menu. Each day features a unique lineup of 5 protein, 3 vegetarian and 2 side dishes.</p>
      </div>

      <div className="menu-controls">
        <OrderDatePicker value={selectedDate} onChange={handleDateChange} />
        {selectedDate && menu && (
          <div className="menu-controls__summary">
            <p className="menu-controls__date">{formatDisplayDate(selectedDate)}</p>
            <p className="menu-controls__theme">
              <strong>{menu.theme}</strong> — {menu.subtitle}
            </p>
          </div>
        )}
      </div>

      {pendingDate && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="date-change-title">
          <div className="modal">
            <h2 id="date-change-title">Change pickup date?</h2>
            <p>
              Your cart has items from a different day&rsquo;s menu. Changing the pickup date will clear
              your current cart so the menu matches your new date.
            </p>
            <div className="modal__actions">
              <button type="button" className="btn btn--ghost" onClick={cancelDateChange}>
                Keep current date
              </button>
              <button type="button" className="btn btn--primary" onClick={confirmDateChange}>
                Change date &amp; clear cart
              </button>
            </div>
          </div>
        </div>
      )}

      {menu &&
        groups.map((group) => (
          <section key={group.category} className="menu-section" aria-labelledby={`heading-${group.category}`}>
            <h2 id={`heading-${group.category}`} className="menu-section__title">
              {CATEGORY_LABELS[group.category]}
            </h2>
            <div className="food-grid">
              {group.items.map((item) => (
                <div key={item.id} className="food-grid__item">
                  <FoodCard
                    item={item}
                    inCart={findInCart(item.id)}
                    onAdd={() => handleAdd(item)}
                  />
                  {justAddedId === item.id && (
                    <p className="food-card__toast" role="status" aria-live="polite">
                      Added to cart!
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
    </div>
  )
}
