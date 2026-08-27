import { Link } from 'react-router-dom'
import { useState } from 'react'
import { formatCurrency } from '../utils/currency'
import QuantityStepper from './QuantityStepper'
import { useCart } from '../context/CartContext'

export default function FoodCard({ dish }) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  function handleAdd() {
    addItem(dish.id, qty)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1400)
  }

  return (
    <article className="food-card">
      <Link to={`/menu/item/${dish.id}`} className="food-card__image-link">
        <img src={dish.image} alt={dish.name} loading="lazy" className="food-card__image" />
      </Link>
      <div className="food-card__body">
        <Link to={`/menu/item/${dish.id}`} className="food-card__name">
          {dish.name}
        </Link>
        <p className="food-card__description">{dish.description}</p>
        <div className="food-card__meta">
          <span className="food-card__price">{formatCurrency(dish.price)} / serving</span>
        </div>
        <div className="food-card__actions">
          <QuantityStepper value={qty} min={1} max={30} onChange={setQty} />
          <button type="button" className="btn btn--primary btn--sm" onClick={handleAdd}>
            {justAdded ? 'Added ✓' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  )
}
