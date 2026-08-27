import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { DISH_BY_ID, DAY_NAMES, getMenuForDayOfWeek } from '../data/menu'
import { formatCurrency } from '../utils/currency'
import QuantityStepper from '../components/QuantityStepper'
import NutritionTable from '../components/NutritionTable'
import { useCart } from '../context/CartContext'

function daysAvailable(dishId) {
  return DAY_NAMES.filter((_, i) => {
    const menu = getMenuForDayOfWeek(i)
    return [...menu.protein, ...menu.vegetarian, ...menu.side].some((d) => d.id === dishId)
  })
}

export default function ItemDetail() {
  const { dishId } = useParams()
  const navigate = useNavigate()
  const dish = DISH_BY_ID[dishId]
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  if (!dish) {
    return (
      <div className="container item-detail item-detail--missing">
        <h1>Item not found</h1>
        <p>We couldn't find that menu item.</p>
        <Link to="/menu" className="btn btn--primary">
          Back to menu
        </Link>
      </div>
    )
  }

  const availableDays = daysAvailable(dish.id)

  function handleAdd() {
    addItem(dish.id, qty)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1400)
  }

  return (
    <div className="container item-detail">
      <button type="button" className="link-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="item-detail__grid">
        <img src={dish.image} alt={dish.name} className="item-detail__image" />

        <div className="item-detail__content">
          <p className="item-detail__category">{dish.category}</p>
          <h1>{dish.name}</h1>
          <p className="item-detail__price">{formatCurrency(dish.price)} / serving</p>
          <p className="item-detail__description">{dish.description}</p>

          <div className="item-detail__available">
            Available on: {availableDays.join(', ')}
          </div>

          <div className="item-detail__ingredients">
            <h3>Ingredients</h3>
            <ul>
              {dish.ingredients.map((ing) => (
                <li key={ing}>{ing}</li>
              ))}
            </ul>
          </div>

          <div className="item-detail__actions">
            <QuantityStepper value={qty} min={1} max={30} onChange={setQty} size="lg" />
            <button type="button" className="btn btn--primary btn--lg" onClick={handleAdd}>
              {justAdded ? 'Added to cart ✓' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>

      <div className="item-detail__nutrition">
        <NutritionTable nutrition={dish.nutrition} />
      </div>
    </div>
  )
}
