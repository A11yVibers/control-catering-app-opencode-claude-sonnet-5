// Fixed pickup windows offered every day the kitchen is open (11:00 AM
// to 6:00 PM). Stored as simple label/value pairs for a native <select>.
export const PICKUP_TIME_SLOTS = [
  { value: '11:00', label: '11:00 AM – 11:30 AM' },
  { value: '11:30', label: '11:30 AM – 12:00 PM' },
  { value: '12:00', label: '12:00 PM – 12:30 PM' },
  { value: '12:30', label: '12:30 PM – 1:00 PM' },
  { value: '13:00', label: '1:00 PM – 1:30 PM' },
  { value: '13:30', label: '1:30 PM – 2:00 PM' },
  { value: '14:00', label: '2:00 PM – 2:30 PM' },
  { value: '14:30', label: '2:30 PM – 3:00 PM' },
  { value: '15:00', label: '3:00 PM – 3:30 PM' },
  { value: '15:30', label: '3:30 PM – 4:00 PM' },
  { value: '16:00', label: '4:00 PM – 4:30 PM' },
  { value: '16:30', label: '4:30 PM – 5:00 PM' },
  { value: '17:00', label: '5:00 PM – 5:30 PM' },
  { value: '17:30', label: '5:30 PM – 6:00 PM' },
]

export const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash at pickup' },
  { value: 'card', label: 'Credit or debit card at pickup' },
  { value: 'check', label: 'Check at pickup' },
]
