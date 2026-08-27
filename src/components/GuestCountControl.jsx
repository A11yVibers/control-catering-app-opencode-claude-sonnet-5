import { ORDER_RULES } from '../data/business'
import QuantityStepper from './QuantityStepper'

export default function GuestCountControl({ value, onChange, label = 'Party size' }) {
  return (
    <div className="guest-count">
      <div className="guest-count__label-row">
        <label className="guest-count__label" htmlFor="guest-count-input">
          {label}
        </label>
        <span className="guest-count__hint">
          {ORDER_RULES.minGuests}–{ORDER_RULES.maxGuests} guests
        </span>
      </div>
      <div id="guest-count-input">
        <QuantityStepper value={value} min={ORDER_RULES.minGuests} max={ORDER_RULES.maxGuests} onChange={onChange} size="lg" />
      </div>
    </div>
  )
}
