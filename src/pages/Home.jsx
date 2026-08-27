import { Link } from 'react-router-dom'
import { BUSINESS, ORDER_RULES } from '../data/business'
import { CATEGORIES, DISHES } from '../data/menu'

const FEATURED_IDS = ['grilled-chicken-breast', 'eggplant-parmesan', 'mac-and-cheese']

export default function Home() {
  const featured = FEATURED_IDS.map((id) => DISHES.find((d) => d.id === id)).filter(Boolean)

  return (
    <div className="home">
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="hero__eyebrow">Homemade catering, made to order</p>
            <h1>{BUSINESS.tagline}</h1>
            <p className="hero__lede">
              Order a rotating weekly menu of scratch-made proteins, vegetarian mains, and sides — prepared fresh
              and ready for pickup on the date you need it.
            </p>
            <div className="hero__actions">
              <Link to="/menu" className="btn btn--primary btn--lg">
                View this week's menu
              </Link>
              <Link to="/about" className="btn btn--ghost btn--lg">
                Our story
              </Link>
            </div>
            <p className="hero__note">
              Orders open {ORDER_RULES.minLeadDays}–{ORDER_RULES.maxLeadDays} days ahead · Serves {ORDER_RULES.minGuests}–{ORDER_RULES.maxGuests} guests
            </p>
          </div>
          <div className="hero__image">
            <img src={featured[0]?.image} alt={featured[0]?.name} />
          </div>
        </div>
      </section>

      <section className="how-it-works container">
        <h2>How pickup ordering works</h2>
        <ol className="steps">
          <li>
            <span className="steps__num">1</span>
            <h3>Pick your date</h3>
            <p>Choose a pickup date 2 days to 2 weeks out. Each day of the week has its own fixed menu.</p>
          </li>
          <li>
            <span className="steps__num">2</span>
            <h3>Build your order</h3>
            <p>Browse proteins, vegetarian mains, and sides, and add servings for your group of 6–30 guests.</p>
          </li>
          <li>
            <span className="steps__num">3</span>
            <h3>Pick up &amp; enjoy</h3>
            <p>Check out with your contact info and pickup time, then swing by to grab your homemade meal.</p>
          </li>
        </ol>
      </section>

      <section className="category-teaser container">
        <h2>What's on the menu</h2>
        <div className="category-teaser__grid">
          {CATEGORIES.map((c) => (
            <div key={c.id} className="category-teaser__card">
              <h3>{c.label}</h3>
              <p>{c.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="featured container">
        <h2>A few weekly favorites</h2>
        <div className="featured__grid">
          {featured.map((dish) => (
            <Link key={dish.id} to={`/menu/item/${dish.id}`} className="featured__card">
              <img src={dish.image} alt={dish.name} loading="lazy" />
              <div>
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <h2>Ready to order for your next gathering?</h2>
          <Link to="/menu" className="btn btn--primary btn--lg">
            Browse the menu
          </Link>
        </div>
      </section>
    </div>
  )
}
