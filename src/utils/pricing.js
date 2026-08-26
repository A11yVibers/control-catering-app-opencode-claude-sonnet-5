// Pricing helpers. All prices are stored in USD as numbers (dollars).

export const MIN_PORTION = 6
export const MAX_PORTION = 30
export const SALES_TAX_RATE = 0.0825 // 8.25% — shown as an estimate on the invoice

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function clampPortion(qty) {
  const n = Math.round(Number(qty) || MIN_PORTION)
  return Math.min(MAX_PORTION, Math.max(MIN_PORTION, n))
}

export function lineTotal(item) {
  return item.pricePerPerson * item.qty
}

export function calculateTotals(items) {
  const subtotal = items.reduce((sum, item) => sum + lineTotal(item), 0)
  const tax = subtotal * SALES_TAX_RATE
  const total = subtotal + tax
  return { subtotal, tax, total }
}
