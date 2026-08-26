export default function QuantityStepper({
  id,
  label,
  itemName,
  value,
  min = 0,
  max = 99,
  step = 1,
  onChange,
}) {
  const decrease = () => {
    onChange(Math.max(min, value - step))
  }

  const increase = () => {
    onChange(Math.min(max, value + step))
  }

  const handleInputChange = (event) => {
    const raw = event.target.value
    if (raw === '') {
      onChange(min)
      return
    }
    const parsed = Number.parseInt(raw, 10)
    if (Number.isNaN(parsed)) return
    onChange(Math.min(max, Math.max(min, parsed)))
  }

  return (
    <div className="quantity-stepper">
      <label htmlFor={id} className="quantity-stepper__label">
        {label}
      </label>
      <div className="quantity-stepper__controls">
        <button
          type="button"
          className="quantity-stepper__button"
          onClick={decrease}
          disabled={value <= min}
          aria-label={`Decrease servings of ${itemName}`}
        >
          <span aria-hidden="true">−</span>
        </button>
        <input
          id={id}
          className="quantity-stepper__input"
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleInputChange}
          aria-describedby={`${id}-hint`}
        />
        <button
          type="button"
          className="quantity-stepper__button"
          onClick={increase}
          disabled={value >= max}
          aria-label={`Increase servings of ${itemName}`}
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>
      <span id={`${id}-hint`} className="visually-hidden">
        Minimum {min}, maximum {max} servings
      </span>
    </div>
  )
}
