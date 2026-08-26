import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { FOOD_ITEMS_BY_ID } from '../data/menu'

const STORAGE_KEY = 'htc_cart_v1'

const CartContext = createContext(null)

function loadInitialState() {
  if (typeof window === 'undefined') {
    return { pickupDate: null, items: [] }
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { pickupDate: null, items: [] }
    const parsed = JSON.parse(raw)
    return {
      pickupDate: parsed.pickupDate ?? null,
      items: Array.isArray(parsed.items) ? parsed.items : [],
    }
  } catch {
    return { pickupDate: null, items: [] }
  }
}

export function CartProvider({ children }) {
  const [pickupDate, setPickupDateState] = useState(() => loadInitialState().pickupDate)
  const [items, setItems] = useState(() => loadInitialState().items)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ pickupDate, items }))
    } catch {
      // Ignore storage errors (e.g. private browsing quota) — cart still
      // works for the current session via in-memory state.
    }
  }, [pickupDate, items])

  const setPickupDate = useCallback((next) => {
    setPickupDateState(next)
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const addItem = useCallback((itemId, quantity) => {
    setItems((prev) => {
      const existing = prev.find((line) => line.id === itemId)
      if (existing) {
        return prev.map((line) =>
          line.id === itemId ? { ...line, quantity: line.quantity + quantity } : line
        )
      }
      return [...prev, { id: itemId, quantity }]
    })
  }, [])

  const updateQuantity = useCallback((itemId, quantity) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((line) => line.id !== itemId)
      }
      return prev.map((line) => (line.id === itemId ? { ...line, quantity } : line))
    })
  }, [])

  const removeItem = useCallback((itemId) => {
    setItems((prev) => prev.filter((line) => line.id !== itemId))
  }, [])

  const lines = useMemo(
    () =>
      items
        .map((line) => {
          const food = FOOD_ITEMS_BY_ID[line.id]
          if (!food) return null
          return {
            ...line,
            food,
            lineTotal: food.pricePerPerson * line.quantity,
          }
        })
        .filter(Boolean),
    [items]
  )

  const totalPortions = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines]
  )

  const totalPrice = useMemo(
    () => lines.reduce((sum, line) => sum + line.lineTotal, 0),
    [lines]
  )

  const value = useMemo(
    () => ({
      pickupDate,
      setPickupDate,
      items,
      lines,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      totalPortions,
      totalPrice,
    }),
    [pickupDate, setPickupDate, items, lines, addItem, updateQuantity, removeItem, clearCart, totalPortions, totalPrice]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}
