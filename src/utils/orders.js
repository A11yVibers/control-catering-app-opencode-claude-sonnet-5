const ORDERS_STORAGE_KEY = 'htc_orders_v1'
const LAST_ORDER_KEY = 'htc_last_order_id_v1'

function readAll() {
  try {
    const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeAll(orders) {
  try {
    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
  } catch {
    // Storage may be unavailable (private browsing); the order still
    // exists in memory for the current session/confirmation view.
  }
}

/** Generates a short, human-friendly invoice number, e.g. HTC-240815-4821. */
export function generateInvoiceNumber(date = new Date()) {
  const y = String(date.getFullYear()).slice(2)
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `HTC-${y}${m}${d}-${rand}`
}

/** Persists a completed order/invoice locally and records it as the "last order" for the confirmation page. */
export function saveOrder(order) {
  const orders = readAll()
  orders.push(order)
  writeAll(orders)
  try {
    window.localStorage.setItem(LAST_ORDER_KEY, order.invoiceNumber)
  } catch {
    // ignore
  }
  return order
}

export function getAllOrders() {
  return readAll()
}

export function getOrderByInvoiceNumber(invoiceNumber) {
  return readAll().find((o) => o.invoiceNumber === invoiceNumber) ?? null
}

export function getLastOrder() {
  try {
    const id = window.localStorage.getItem(LAST_ORDER_KEY)
    if (!id) return null
    return getOrderByInvoiceNumber(id)
  } catch {
    return null
  }
}
