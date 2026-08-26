import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/pricing'

export default function FoodCard({ item, inCart, onAdd }) {
  return (
    <article className="food-card">
      <Link to={`/menu/item/${item.id}`} className="food-card__image-link">
        <img
          className="food-card__image"
          src={`${item.image}?auto=format&fit=crop&w=480&q=60`}
          alt={item.name}
          loading="lazy"
          width="480"
          height="320"
        />
      </Link>
      <div className="food-card__body">
        <Link to={`/menu/item/${item.id}`} className="food-card__name">
          {item.name}
        </Link>
        <p className="food-card__description">{item.description}</p>
        <div className="food-card__meta">
          <span className="food-card__price">{formatCurrency(item.pricePerPerson)} <span className="food-card__unit">/ person</span></span>
          {inCart ? (
            <span className="food-card__in-cart">✓ In cart ({inCart.qty})</span>
          ) : (
            <button type="button" className="btn btn--small" onClick={onAdd}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
