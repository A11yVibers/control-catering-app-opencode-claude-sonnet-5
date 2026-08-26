import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle.js'
import QuantityStepper from '../components/QuantityStepper.jsx'
import NutritionTable from '../components/NutritionTable.jsx'
import { useCart } from '../context/CartContext.jsx'
import { FOOD_ITEMS_BY_ID } from '../data/menu.js'
import { formatCurrency } from '../utils/format.js'
import { toInputDateString, getEarliestPickupDate } from '../utils/date.js'
import IMAGES from '../data/images.js'
import NotFound from './NotFound.jsx'

const CATEGORY_LABELS = {
  protein: 'Protein',
  vegetarian: 'Vegetarian',
  side: 'Side',
}

export default function ItemDetail() {
  const { itemId } = useParams()
  const item = FOOD_ITEMS_BY_ID[itemId]

  usePageTitle(item ? item.name : 'Item not found')

  const { pickupDate, setPickupDate, addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [statusMessage, setStatusMessage] = useState('')

  if (!item) {
    return <NotFound />
  }

  const image = IMAGES[item.id]

  function handleAdd() {
    if (!pickupDate) {
      setPickupDate(toInputDateString(getEarliestPickupDate()))
    }
    addItem(item.id, quantity)
    setStatusMessage(
      `Added ${quantity} serving${quantity === 1 ? '' : 's'} of ${item.name} to your cart.`
    )
  }

  return (
    <div className="page page--item-detail container">
      <p className="breadcrumb">
        <Link to="/menu" className="standalone-link">← Back to menu</Link>
      </p>

      <article className="item-detail">
        <figure className="item-detail__figure">
          <img
            className="item-detail__image"
            src={image.src}
            alt={`Prepared plate of ${item.name.toLowerCase()}, ready to serve`}
            width="500"
            height="333"
          />
          <figcaption className="item-detail__credit">
            Photo: {image.author} via{' '}
            <a href={image.sourceUrl} target="_blank" rel="noopener noreferrer">
              Wikimedia Commons
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>{' '}
            ({image.license})
          </figcaption>
        </figure>

        <div className="item-detail__body">
          <span className="badge" data-category={item.category}>
            {CATEGORY_LABELS[item.category]}
          </span>
          <h1>{item.name}</h1>
          <p className="item-detail__price">
            {formatCurrency(item.pricePerPerson)} per person
          </p>
          <p>{item.description}</p>

          <h2>Ingredients</h2>
          <ul>
            {item.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>

          <div className="item-detail__add-row">
            <QuantityStepper
              id={`detail-qty-${item.id}`}
              label="Servings"
              itemName={item.name}
              value={quantity}
              min={1}
              max={30}
              onChange={setQuantity}
            />
            <button type="button" className="button button--primary" onClick={handleAdd}>
              Add to cart
              <span className="visually-hidden">
                {' '}
                {quantity} serving{quantity === 1 ? '' : 's'} of {item.name}
              </span>
            </button>
          </div>
          <div aria-live="polite" className="visually-hidden">
            {statusMessage}
          </div>
          <p>
            <Link to="/cart" className="standalone-link">
              Go to cart
              <span className="visually-hidden"> and review your order</span>
            </Link>
          </p>

          <h2>Nutrition facts</h2>
          <NutritionTable item={item} />
        </div>
      </article>
    </div>
  )
}
