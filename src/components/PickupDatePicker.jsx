import { getMinPickupDate, getMaxPickupDate, formatFriendlyDate } from '../utils/date'

export default function PickupDatePicker({ value, onChange, id = 'pickup-date' }) {
  const min = getMinPickupDate()
  const max = getMaxPickupDate()

  return (
    <div className="date-picker">
      <label className="date-picker__label" htmlFor={id}>
        Pickup date
      </label>
      <input
        id={id}
        type="date"
        className="date-picker__input"
        min={min}
        max={max}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="date-picker__hint">
        Orders must be placed at least 2 days and at most 2 weeks in advance.
        {value ? ` You're ordering for ${formatFriendlyDate(value)}.` : ''}
      </p>
    </div>
  )
}
