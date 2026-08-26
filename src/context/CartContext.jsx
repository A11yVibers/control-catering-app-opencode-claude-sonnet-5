import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { calculateTotals, clampPortion, MIN_PORTION } from '../utils/pricing'

const CART_KEY = 'homestead-catering:cart'
const CartContext = createContext(null)

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return { orderDate: '', items: [] }
    const parsed = JSON.parse(raw)
    return {
      orderDate: parsed.orderDate || '',
      items: Array.isArray(parsed.items) ? parsed.items : [],
    }
  } catch {
    return { orderDate: '', items: [] }
  }
}

export function CartProvider({ children }) {
  const [orderDate, setOrderDateState] = useState('')
  const [items, setItems] = useState([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = readCart()
    setOrderDate(saved.orderDate)
    setItems(saved.items)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(CART_KEY, JSON.stringify({ orderDate, items }))
    } catch {
      // ignore storage errors
    }
  }, [orderDate, items, hydrated])

  const setOrderDate = useCallback((newDate) => {
    setOrderDateState(newDate)
  }, [])

  const addItem = useCallback((item, qty = MIN_PORTION) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: clampPortion(i.qty + qty) } : i
        )
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          category: item.category,
          pricePerPerson: item.pricePerPerson,
          image: item.image,
          day: item.day,
          qty: clampPortion(qty),
        },
      ]
    })
  }, [])

  const updateQty = useCallback((itemId, qty) => {
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, qty: clampPortion(qty) } : i))
    )
  }, [])

  const removeItem = useCallback((itemId) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setOrderDateState('')
  }, [])

  const changeOrderDate = useCallback((newDate) => {
    setOrderDateState(newDate)
    setItems([])
  }, [])

  const totals = useMemo(() => calculateTotals(items), [items])
  const itemCount = items.length

  const value = useMemo(
    () => ({
      hydrated,
      orderDate,
      items,
      totals,
      itemCount,
      setOrderDate,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      changeOrderDate,
    }),
    [hydrated, orderDate, items, totals, itemCount, setOrderDate, addItem, updateQty, removeItem, clearCart, changeOrderDate]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
