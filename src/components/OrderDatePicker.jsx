import { toISODate, getMinOrderDate, getMaxOrderDate, MIN_LEAD_DAYS, MAX_LEAD_DAYS } from '../utils/dateUtils'

export default function OrderDatePicker({ value, onChange, id = 'order-date' }) {
  const min = toISODate(getMinOrderDate())
  const max = toISODate(getMaxOrderDate())

  return (
    <div className="date-picker">
      <label htmlFor={id} className="date-picker__label">
        Pickup date
      </label>
      <input
        id={id}
        type="date"
        className="date-picker__input"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="date-picker__hint">
        Orders must be placed at least {MIN_LEAD_DAYS} days and up to {MAX_LEAD_DAYS} days in advance.
      </p>
    </div>
  )
}
