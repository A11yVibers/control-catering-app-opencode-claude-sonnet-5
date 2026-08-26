import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle.js'
import { MIN_PORTIONS, MAX_PORTIONS, MIN_LEAD_DAYS, MAX_LEAD_DAYS } from '../data/menu.js'

export default function Home() {
  usePageTitle('Home')

  return (
    <div className="page page--home">
      <section className="hero container">
        <div className="hero__content">
          <h1>Homemade catering, made for pickup</h1>
          <p className="hero__lead">
            Homestead Table Catering prepares scratch-made proteins, vegetarian dishes and
            sides for your next gathering. Choose a pickup date, build your order from that
            day&rsquo;s menu, and pick everything up fresh and ready to serve.
          </p>
          <p>
            <Link to="/menu" className="button button--primary button--large">
              View the menu and order
            </Link>
          </p>
        </div>
      </section>

      <section className="container section" aria-labelledby="how-it-works-heading">
        <h2 id="how-it-works-heading">How ordering works</h2>
        <ol className="steps-list">
          <li>
            <h3>1. Pick a pickup date</h3>
            <p>
              Choose any date between {MIN_LEAD_DAYS} days and {MAX_LEAD_DAYS} days from today.
              Each day of the week has its own fixed menu, so the dishes you see are exactly
              what will be available for that date.
            </p>
          </li>
          <li>
            <h3>2. Build your order</h3>
            <p>
              Add proteins, vegetarian dishes and sides to your cart. Orders can serve
              between {MIN_PORTIONS} and {MAX_PORTIONS} people in total.
            </p>
          </li>
          <li>
            <h3>3. Check out and pick up</h3>
            <p>
              Share your contact details and preferred pickup time. You&rsquo;ll get an
              invoice you can save, and your food will be ready when you arrive.
            </p>
          </li>
        </ol>
      </section>

      <section className="container section section--highlight" aria-labelledby="menu-preview-heading">
        <h2 id="menu-preview-heading">A different menu every day</h2>
        <p>
          Every day of the week features 10 dishes: five proteins, three vegetarian options
          and two sides — all made from scratch in small batches. Browse the full menu to see
          what&rsquo;s offered on the date you need.
        </p>
        <p>
          <Link to="/menu" className="standalone-link">
            Browse the full menu
            <span className="visually-hidden"> and choose a pickup date</span>
          </Link>
        </p>
      </section>

      <section className="container section" aria-labelledby="learn-more-heading">
        <h2 id="learn-more-heading">Learn more</h2>
        <p>
          Read about our kitchen and story on the{' '}
          <Link to="/about">About page</Link>, or{' '}
          <Link to="/contact">get in touch</Link> with any questions before you order.
        </p>
      </section>
    </div>
  )
}
