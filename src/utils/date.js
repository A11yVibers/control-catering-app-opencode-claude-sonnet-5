import { MIN_LEAD_DAYS, MAX_LEAD_DAYS } from '../data/menu'

/** Returns a new Date at local midnight for the given Date (strips time). */
export function atMidnight(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

/** Formats a Date as YYYY-MM-DD for use with <input type="date">. */
export function toInputDateString(date) {
  const d = atMidnight(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** Parses a YYYY-MM-DD string (from <input type="date">) into a local Date at midnight. */
export function fromInputDateString(value) {
  if (!value) return null
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return null
  const d = new Date(year, month - 1, day)
  d.setHours(0, 0, 0, 0)
  return d
}

export function getEarliestPickupDate(today = new Date()) {
  return addDays(atMidnight(today), MIN_LEAD_DAYS)
}

export function getLatestPickupDate(today = new Date()) {
  return addDays(atMidnight(today), MAX_LEAD_DAYS)
}

/** Validates that `date` falls within the allowed pickup window. Returns an error string, or null if valid. */
export function validatePickupDate(date, today = new Date()) {
  if (!date) return 'Please choose a pickup date.'
  const min = getEarliestPickupDate(today)
  const max = getLatestPickupDate(today)
  if (date < min) {
    return `Pickup date must be at least ${MIN_LEAD_DAYS} days from today (earliest: ${formatLongDate(min)}).`
  }
  if (date > max) {
    return `Pickup date must be within ${MAX_LEAD_DAYS} days from today (latest: ${formatLongDate(max)}).`
  }
  return null
}

export function formatLongDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatShortDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}
