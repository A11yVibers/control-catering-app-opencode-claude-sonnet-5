import { calculateTotals } from './pricing'

const INVOICES_KEY = 'homestead-catering:invoices'

function readInvoices() {
  try {
    const raw = localStorage.getItem(INVOICES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeInvoices(invoices) {
  try {
    localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices))
  } catch {
    // Storage may be unavailable (e.g. private browsing quota) — fail silently.
  }
}

function generateInvoiceNumber() {
  const now = new Date()
  const stamp = now.toISOString().replace(/[-:TZ.]/g, '').slice(0, 12)
  const rand = Math.floor(Math.random() * 900 + 100)
  return `HK-${stamp}-${rand}`
}

export function createInvoice({ orderDate, items, customer, pickup, payment, specialInstructions }) {
  const totals = calculateTotals(items)
  const invoice = {
    id: generateInvoiceNumber(),
    createdAt: new Date().toISOString(),
    orderDate,
    items: items.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      pricePerPerson: item.pricePerPerson,
      qty: item.qty,
      lineTotal: item.pricePerPerson * item.qty,
    })),
    totals,
    customer,
    pickup,
    payment,
    specialInstructions: specialInstructions || '',
  }
  const invoices = readInvoices()
  invoices.unshift(invoice)
  writeInvoices(invoices)
  return invoice
}

export function getInvoices() {
  return readInvoices()
}

export function getInvoiceById(id) {
  return readInvoices().find((invoice) => invoice.id === id) || null
}
