function parseTimeToMinutes(label) {
  const [time, meridiem] = label.split(' ')
  let [h, m] = time.split(':').map(Number)
  if (meridiem === 'PM' && h !== 12) h += 12
  if (meridiem === 'AM' && h === 12) h = 0
  return h * 60 + m
}

function minutesToLabel(mins) {
  let h = Math.floor(mins / 60)
  const m = mins % 60
  const meridiem = h >= 12 ? 'PM' : 'AM'
  h = h % 12
  if (h === 0) h = 12
  return `${h}:${String(m).padStart(2, '0')} ${meridiem}`
}

/** Builds a list of pickup time slot labels in 30-minute increments between two "H:MM AM/PM" bounds. */
export function buildTimeSlots(startLabel, endLabel, stepMinutes = 30) {
  const start = parseTimeToMinutes(startLabel)
  const end = parseTimeToMinutes(endLabel)
  const slots = []
  for (let t = start; t <= end; t += stepMinutes) {
    slots.push(minutesToLabel(t))
  }
  return slots
}
