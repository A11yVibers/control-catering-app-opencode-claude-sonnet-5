import { ORDER_RULES } from '../data/business'

/** Formats a Date as YYYY-MM-DD (local time, safe for <input type="date">). */
export function toISODate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function addDays(date, days) {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + days)
  return copy
}

export function startOfToday() {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return now
}

/** Earliest selectable pickup date, as an ISO string. */
export function getMinPickupDate() {
  return toISODate(addDays(startOfToday(), ORDER_RULES.minLeadDays))
}

/** Latest selectable pickup date, as an ISO string. */
export function getMaxPickupDate() {
  return toISODate(addDays(startOfToday(), ORDER_RULES.maxLeadDays))
}

export function isDateWithinOrderWindow(isoDate) {
  if (!isoDate) return false
  return isoDate >= getMinPickupDate() && isoDate <= getMaxPickupDate()
}

const WEEKDAY_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTH_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** Formats an ISO date string ("2026-09-01") as "Tuesday, September 1, 2026". */
export function formatFriendlyDate(isoDate) {
  if (!isoDate) return ''
  const d = new Date(`${isoDate}T00:00:00`)
  return `${WEEKDAY_LONG[d.getDay()]}, ${MONTH_LONG[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

export function getWeekdayName(isoDate) {
  const d = new Date(`${isoDate}T00:00:00`)
  return WEEKDAY_LONG[d.getDay()]
}
