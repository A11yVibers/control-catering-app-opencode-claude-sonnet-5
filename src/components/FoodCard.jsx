import { useState } from 'react'
import { Link } from 'react-router-dom'
import QuantityStepper from './QuantityStepper.jsx'
import VisuallyHidden from './VisuallyHidden.jsx'
import { formatCurrency } from '../utils/format.js'
import IMAGES from '../data/images.js'

const CATEGORY_LABELS = {
  protein: 'Protein',
  vegetarian: 'Vegetarian',
  side: 'Side',
}

export default function FoodCard({ item, onAdd }) {
  const [quantity, setQuantity] = useState(1)
  const image = IMAGES[item.id]
  const detailId = `item-${item.id}`
  const stepperId = `qty-${item.id}`

  const handleAdd = () => {
    onAdd(item, quantity)
    setQuantity(1)
  }

  return (
    <li className="food-card">
      <Link to={`/menu/${item.id}`} className="food-card__image-link" aria-hidden="true" tabIndex={-1}>
        <img
          className="food-card__image"
          src={image.src}
          alt=""
          loading="lazy"
          width="500"
          height="333"
        />
      </Link>
      <div className="food-card__body">
        <span className="badge" data-category={item.category}>
          {CATEGORY_LABELS[item.category]}
        </span>
        <h3 className="food-card__name" id={detailId}>
          <Link to={`/menu/${item.id}`} className="food-card__name-link">
            {item.name}
          </Link>
        </h3>
        <p className="food-card__price">
          {formatCurrency(item.pricePerPerson)} <span className="food-card__price-unit">per person</span>
        </p>
        <p className="food-card__desc">{item.description}</p>
        <Link to={`/menu/${item.id}`} className="food-card__details-link">
          View details
          <VisuallyHidden> for {item.name}</VisuallyHidden>
        </Link>

        <div className="food-card__add-row">
          <QuantityStepper
            id={stepperId}
            label="Servings"
            itemName={item.name}
            value={quantity}
            min={1}
            max={30}
            onChange={setQuantity}
          />
          <button type="button" className="button button--primary" onClick={handleAdd}>
            Add to cart
            <VisuallyHidden>
              {' '}
              {quantity} serving{quantity === 1 ? '' : 's'} of {item.name}
            </VisuallyHidden>
          </button>
        </div>
      </div>
    </li>
  )
}
