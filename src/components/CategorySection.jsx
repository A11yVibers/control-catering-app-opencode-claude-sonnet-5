import FoodCard from './FoodCard'

export default function CategorySection({ title, blurb, dishes }) {
  return (
    <section className="category-section">
      <div className="category-section__heading">
        <h2>{title}</h2>
        {blurb && <p>{blurb}</p>}
      </div>
      <div className="food-grid">
        {dishes.map((dish) => (
          <FoodCard key={dish.id} dish={dish} />
        ))}
      </div>
    </section>
  )
}
