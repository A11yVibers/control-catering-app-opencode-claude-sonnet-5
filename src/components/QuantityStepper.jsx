import { MIN_PORTION, MAX_PORTION } from '../utils/pricing'

export default function QuantityStepper({ qty, onChange, idPrefix = 'qty' }) {
  const decrease = () => onChange(Math.max(MIN_PORTION, qty - 1))
  const increase = () => onChange(Math.min(MAX_PORTION, qty + 1))

  const handleInput = (e) => {
    const value = Number(e.target.value)
    if (Number.isNaN(value)) return
    onChange(value)
  }

  const handleBlur = (e) => {
    const value = Number(e.target.value)
    const clamped = Math.min(MAX_PORTION, Math.max(MIN_PORTION, Number.isNaN(value) ? MIN_PORTION : value))
    onChange(clamped)
  }

  return (
    <div className="stepper" role="group" aria-label="Number of servings">
      <button
        type="button"
        className="stepper__btn"
        onClick={decrease}
        disabled={qty <= MIN_PORTION}
        aria-label="Decrease servings"
      >
        −
      </button>
      <input
        id={`${idPrefix}-input`}
        className="stepper__input"
        type="number"
        min={MIN_PORTION}
        max={MAX_PORTION}
        value={qty}
        onChange={handleInput}
        onBlur={handleBlur}
        aria-label="Servings"
      />
      <button
        type="button"
        className="stepper__btn"
        onClick={increase}
        disabled={qty >= MAX_PORTION}
        aria-label="Increase servings"
      >
        +
      </button>
    </div>
  )
}
