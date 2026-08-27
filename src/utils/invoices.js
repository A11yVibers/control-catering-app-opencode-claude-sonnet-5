const STORAGE_KEY = 'htc_invoices_v1'

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeAll(invoices) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices))
  } catch {
    // localStorage may be unavailable (e.g. private mode) — fail silently,
    // the order confirmation still renders for the current session.
  }
}

function generateOrderId(date) {
  const stamp = date.toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `HTC-${stamp}-${rand}`
}

/**
 * Persists a finalized order as an invoice in localStorage (standing in for
 * the business owner's records) and returns the full invoice object,
 * including its generated id and placement timestamp.
 */
export function createInvoice(order) {
  const now = new Date()
  const invoice = {
    id: generateOrderId(now),
    placedAt: now.toISOString(),
    ...order,
  }
  const all = readAll()
  all.unshift(invoice)
  writeAll(all)
  return invoice
}

export function getInvoice(id) {
  return readAll().find((inv) => inv.id === id) || null
}

export function getAllInvoices() {
  return readAll()
}
