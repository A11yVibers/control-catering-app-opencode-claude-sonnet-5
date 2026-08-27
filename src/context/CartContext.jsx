import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { DISH_BY_ID, isDishAvailableOnDate } from '../data/menu'
import { ORDER_RULES } from '../data/business'

const CartContext = createContext(null)
const STORAGE_KEY = 'htc_cart_v1'

function loadInitialState() {
  const fallback = { pickupDate: null, guestCount: ORDER_RULES.minGuests, items: [] }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return {
      pickupDate: parsed.pickupDate ?? null,
      guestCount: parsed.guestCount ?? ORDER_RULES.minGuests,
      items: Array.isArray(parsed.items) ? parsed.items : [],
    }
  } catch {
    return fallback
  }
}

export function CartProvider({ children }) {
  const [pickupDate, setPickupDateState] = useState(() => loadInitialState().pickupDate)
  const [guestCount, setGuestCountState] = useState(() => loadInitialState().guestCount)
  const [items, setItems] = useState(() => loadInitialState().items)
  const [lastRemovedNotice, setLastRemovedNotice] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ pickupDate, guestCount, items }))
    } catch {
      // ignore persistence errors
    }
  }, [pickupDate, guestCount, items])

  function setPickupDate(nextDate) {
    setPickupDateState(nextDate)
    if (!nextDate) return
    setItems((prev) => {
      const kept = prev.filter((it) => isDishAvailableOnDate(it.dishId, nextDate))
      if (kept.length !== prev.length) {
        const removedNames = prev
          .filter((it) => !kept.some((k) => k.dishId === it.dishId))
          .map((it) => DISH_BY_ID[it.dishId]?.name)
          .filter(Boolean)
        setLastRemovedNotice(
          `${removedNames.join(', ')} ${removedNames.length > 1 ? 'were' : 'was'} removed from your cart because ${
            removedNames.length > 1 ? "they aren't" : "it isn't"
          } on the menu for the new pickup date.`,
        )
      }
      return kept
    })
  }

  function setGuestCount(n) {
    const clamped = Math.min(ORDER_RULES.maxGuests, Math.max(ORDER_RULES.minGuests, Number(n) || ORDER_RULES.minGuests))
    setGuestCountState(clamped)
  }

  function addItem(dishId, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((it) => it.dishId === dishId)
      if (existing) {
        return prev.map((it) => (it.dishId === dishId ? { ...it, quantity: it.quantity + quantity } : it))
      }
      return [...prev, { dishId, quantity }]
    })
  }

  function updateQuantity(dishId, quantity) {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((it) => it.dishId !== dishId)
      return prev.map((it) => (it.dishId === dishId ? { ...it, quantity } : it))
    })
  }

  function removeItem(dishId) {
    setItems((prev) => prev.filter((it) => it.dishId !== dishId))
  }

  function clearCart() {
    setItems([])
  }

  function clearNotice() {
    setLastRemovedNotice(null)
  }

  const detailedItems = useMemo(
    () =>
      items
        .map((it) => {
          const dish = DISH_BY_ID[it.dishId]
          if (!dish) return null
          return { ...it, dish, lineTotal: dish.price * it.quantity }
        })
        .filter(Boolean),
    [items],
  )

  const subtotal = useMemo(() => detailedItems.reduce((sum, it) => sum + it.lineTotal, 0), [detailedItems])
  const tax = useMemo(() => subtotal * ORDER_RULES.taxRate, [subtotal])
  const total = subtotal + tax
  const totalServings = useMemo(() => items.reduce((sum, it) => sum + it.quantity, 0), [items])
  const itemCount = items.length

  const value = {
    pickupDate,
    setPickupDate,
    guestCount,
    setGuestCount,
    items,
    detailedItems,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    tax,
    total,
    totalServings,
    itemCount,
    lastRemovedNotice,
    clearNotice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
