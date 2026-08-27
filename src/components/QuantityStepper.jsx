export default function QuantityStepper({ value, min = 0, max = 99, onChange, size = 'md' }) {
  function clamp(n) {
    return Math.min(max, Math.max(min, n))
  }
  return (
    <div className={`qty-stepper qty-stepper--${size}`}>
      <button
        type="button"
        className="qty-stepper__btn"
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="qty-stepper__value" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="qty-stepper__btn"
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
