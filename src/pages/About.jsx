import usePageTitle from '../hooks/usePageTitle.js'
import { FOOD_ITEMS } from '../data/menu.js'
import IMAGES from '../data/images.js'

export default function About() {
  usePageTitle('About')

  return (
    <div className="page page--about container">
      <h1>About Homestead Table Catering</h1>

      <section aria-labelledby="our-story-heading">
        <h2 id="our-story-heading">Our story</h2>
        <p>
          Homestead Table Catering started in a home kitchen with a simple goal: make
          homemade, scratch-cooked food available to neighbors who want a great meal without
          the work of cooking for a crowd. Every dish on our menu is prepared in small
          batches using the same recipes we serve at our own table.
        </p>
        <p>
          We keep our menu simple and predictable — each day of the week has its own fixed
          lineup of ten dishes, so you always know what to expect when you plan ahead and
          place an order for pickup.
        </p>
      </section>

      <section aria-labelledby="how-we-work-heading">
        <h2 id="how-we-work-heading">How we work</h2>
        <ul>
          <li>Orders are placed online for pickup, at least two days and at most two weeks in advance.</li>
          <li>Every order serves between 6 and 30 people, made fresh for your pickup date.</li>
          <li>Food is prepared in small batches and packed for easy transport and serving.</li>
          <li>We don&rsquo;t offer delivery — all orders are picked up at our kitchen.</li>
        </ul>
      </section>

      <section aria-labelledby="image-credits-heading">
        <h2 id="image-credits-heading">Image credits</h2>
        <p>
          Menu photographs are used under free-culture licenses from Wikimedia Commons.
          We&rsquo;re grateful to the following photographers:
        </p>
        <ul className="credits-list">
          {FOOD_ITEMS.map((item) => {
            const image = IMAGES[item.id]
            return (
              <li key={item.id}>
                &ldquo;{item.name}&rdquo; photo by {image.author}, licensed{' '}
                {image.license}, via{' '}
                <a href={image.sourceUrl} target="_blank" rel="noopener noreferrer">
                  Wikimedia Commons
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
                .
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
