import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import NutritionTable from '../components/NutritionTable'
import QuantityStepper from '../components/QuantityStepper'
import { findItemById, CATEGORY_LABELS } from '../data/menuData'
import { useCart } from '../context/CartContext'
import { formatCurrency, MIN_PORTION } from '../utils/pricing'

export default function ItemDetail() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const { addItem, items: cartItems } = useCart()
  const item = findItemById(itemId)
  const [qty, setQty] = useState(MIN_PORTION)
  const [added, setAdded] = useState(false)

  if (!item) {
    return (
      <div className="page container">
        <p>Sorry, we couldn&rsquo;t find that menu item.</p>
        <Link to="/menu" className="btn btn--primary">Back to menu</Link>
      </div>
    )
  }

  const inCart = cartItems.find((i) => i.id === item.id)

  const handleAdd = () => {
    addItem(item, qty)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="page container item-detail">
      <Link to="/menu" className="back-link">← Back to menu</Link>
      <div className="item-detail__layout">
        <img
          className="item-detail__image"
          src={`${item.image}?auto=format&fit=crop&w=900&q=65`}
          alt={item.name}
        />
        <div className="item-detail__info">
          <p className="item-detail__category">{CATEGORY_LABELS[item.category]} · {item.day}&rsquo;s Menu</p>
          <h1>{item.name}</h1>
          <p className="item-detail__price">{formatCurrency(item.pricePerPerson)} <span>/ person</span></p>
          <p className="item-detail__description">{item.description}</p>

          <h2 className="item-detail__subheading">Ingredients</h2>
          <ul className="ingredient-list">
            {item.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>

          <div className="item-detail__add">
            <QuantityStepper qty={qty} onChange={setQty} idPrefix={`detail-${item.id}`} />
            <button type="button" className="btn btn--primary" onClick={handleAdd}>
              Add {qty} servings to cart
            </button>
          </div>
          {inCart && <p className="item-detail__in-cart">Already in cart: {inCart.qty} servings.</p>}
          {added && (
            <p className="item-detail__added" role="status" aria-live="polite">
              Added to your cart!
            </p>
          )}
        </div>
      </div>

      <section className="item-detail__nutrition">
        <NutritionTable nutrition={item.nutrition} />
      </section>

      <div className="item-detail__footer-actions">
        <Link to="/menu" className="btn btn--ghost">Continue browsing menu</Link>
        <button type="button" className="btn btn--secondary" onClick={() => navigate('/cart')}>
          Go to cart
        </button>
      </div>
    </div>
  )
}
