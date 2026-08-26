// Date helpers for scheduling catering pickups.
// Business rule: orders must be placed at least 2 days and at most 14 days
// (2 weeks) before the requested pickup date.

export const MIN_LEAD_DAYS = 2
export const MAX_LEAD_DAYS = 14

export const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function toISODate(date) {
  const d = startOfDay(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Parses a 'YYYY-MM-DD' string as a local date (avoids UTC off-by-one issues).
export function parseISODate(isoString) {
  const [year, month, day] = isoString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function getMinOrderDate() {
  return startOfDay(addDays(new Date(), MIN_LEAD_DAYS))
}

export function getMaxOrderDate() {
  return startOfDay(addDays(new Date(), MAX_LEAD_DAYS))
}

export function isValidOrderDate(isoString) {
  if (!isoString) return false
  const date = parseISODate(isoString)
  const min = getMinOrderDate()
  const max = getMaxOrderDate()
  return date.getTime() >= min.getTime() && date.getTime() <= max.getTime()
}

export function getDayName(isoString) {
  const date = parseISODate(isoString)
  return DAY_NAMES[date.getDay()]
}

export function formatDisplayDate(isoString, options) {
  if (!isoString) return ''
  const date = parseISODate(isoString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    ...options,
  })
}

export function formatShortDate(isoString) {
  if (!isoString) return ''
  const date = parseISODate(isoString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}
