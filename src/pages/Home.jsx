import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/businessInfo'
import { MIN_LEAD_DAYS, MAX_LEAD_DAYS } from '../utils/dateUtils'
import { MIN_PORTION, MAX_PORTION } from '../utils/pricing'

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero__image-wrap">
          <img
            src={`${BUSINESS.heroImage}?auto=format&fit=crop&w=1200&q=65`}
            alt="A spread of homemade catering dishes on a table"
            className="hero__image"
          />
        </div>
        <div className="container hero__content">
          <h1>Homemade catering, made with care.</h1>
          <p className="hero__lead">
            Fresh, chef-prepared meals for your next gathering — order online, pick a date, and pick
            up ready-to-serve food from our kitchen.
          </p>
          <div className="hero__actions">
            <Link to="/menu" className="btn btn--primary btn--large">
              View This Week&rsquo;s Menu
            </Link>
            <Link to="/about" className="btn btn--ghost btn--large">
              Learn Our Story
            </Link>
          </div>
        </div>
      </section>

      <section className="container section">
        <h2 className="section__title">How catering works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <span className="step-card__number">1</span>
            <h3>Pick your pickup date</h3>
            <p>Choose any date {MIN_LEAD_DAYS}–{MAX_LEAD_DAYS} days out. Each day of the week has its own themed menu.</p>
          </div>
          <div className="step-card">
            <span className="step-card__number">2</span>
            <h3>Build your order</h3>
            <p>Mix proteins, vegetarian mains and sides. Portions range from {MIN_PORTION} to {MAX_PORTION} guests per item.</p>
          </div>
          <div className="step-card">
            <span className="step-card__number">3</span>
            <h3>Checkout &amp; pick up</h3>
            <p>Choose a pickup window, add any special instructions, and get an instant invoice.</p>
          </div>
        </div>
      </section>

      <section className="container section section--themes">
        <h2 className="section__title">A new themed menu every day</h2>
        <div className="theme-grid">
          {[
            ['Monday', 'Comfort Classics'],
            ['Tuesday', 'Italian Favorites'],
            ['Wednesday', 'Mexican Fiesta'],
            ['Thursday', 'Mediterranean Table'],
            ['Friday', 'Asian Flavors'],
            ['Saturday', 'Southern BBQ'],
            ['Sunday', 'Indian Spice'],
          ].map(([day, theme]) => (
            <div className="theme-chip" key={day}>
              <strong>{day}</strong>
              <span>{theme}</span>
            </div>
          ))}
        </div>
        <div className="section__cta">
          <Link to="/menu" className="btn btn--primary">
            Start an Order
          </Link>
        </div>
      </section>
    </div>
  )
}
