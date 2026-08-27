import { useEffect } from 'react'
import PickupDatePicker from '../components/PickupDatePicker'
import GuestCountControl from '../components/GuestCountControl'
import CategorySection from '../components/CategorySection'
import { CATEGORIES, getMenuForDate } from '../data/menu'
import { getMinPickupDate, getWeekdayName } from '../utils/date'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function Menu() {
  const { pickupDate, setPickupDate, guestCount, setGuestCount, lastRemovedNotice, clearNotice, totalServings } = useCart()

  useEffect(() => {
    if (!pickupDate) {
      setPickupDate(getMinPickupDate())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const menu = pickupDate ? getMenuForDate(pickupDate) : null

  return (
    <div className="menu-page container">
      <div className="menu-page__header">
        <h1>Weekly Menu</h1>
        <p>Every day of the week has its own fixed menu of 10 homemade dishes. Choose your pickup date to see what's available.</p>
      </div>

      <div className="menu-page__controls">
        <PickupDatePicker value={pickupDate} onChange={setPickupDate} />
        <GuestCountControl value={guestCount} onChange={setGuestCount} />
      </div>

      {lastRemovedNotice && (
        <div className="notice notice--warning">
          <p>{lastRemovedNotice}</p>
          <button type="button" className="notice__dismiss" onClick={clearNotice} aria-label="Dismiss notice">
            ×
          </button>
        </div>
      )}

      {pickupDate && (
        <p className="menu-page__day-label">
          Showing the <strong>{getWeekdayName(pickupDate)}</strong> menu
        </p>
      )}

      {menu && (
        <>
          <CategorySection
            title={CATEGORIES[0].label}
            blurb={CATEGORIES[0].blurb}
            dishes={menu.protein}
          />
          <CategorySection
            title={CATEGORIES[1].label}
            blurb={CATEGORIES[1].blurb}
            dishes={menu.vegetarian}
          />
          <CategorySection
            title={CATEGORIES[2].label}
            blurb={CATEGORIES[2].blurb}
            dishes={menu.side}
          />
        </>
      )}

      {totalServings > 0 && (
        <div className="menu-page__cart-bar">
          <span>
            {totalServings} serving{totalServings === 1 ? '' : 's'} in cart
          </span>
          <Link to="/cart" className="btn btn--primary btn--sm">
            View cart
          </Link>
        </div>
      )}
    </div>
  )
}
