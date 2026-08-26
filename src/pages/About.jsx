import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/businessInfo'

export default function About() {
  return (
    <div className="page">
      <section className="about-hero">
        <img
          src={`${BUSINESS.aboutImage}?auto=format&fit=crop&w=1200&q=65`}
          alt="Homemade dishes being prepared in a home kitchen"
          className="about-hero__image"
        />
        <div className="container about-hero__content">
          <h1>About {BUSINESS.name}</h1>
          <p>Founded in {BUSINESS.founded} by {BUSINESS.ownerName}.</p>
        </div>
      </section>

      <section className="container section about-story">
        <div className="about-story__text">
          <h2>Our Story</h2>
          {BUSINESS.story.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <img
          src={`${BUSINESS.chefImage}?auto=format&fit=crop&w=700&q=65`}
          alt="Chef preparing food"
          className="about-story__image"
        />
      </section>

      <section className="container section">
        <h2 className="section__title">What we care about</h2>
        <div className="values-grid">
          {BUSINESS.values.map((value) => (
            <div className="value-card" key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container section section--cta">
        <h2>Ready to order for your next gathering?</h2>
        <Link to="/menu" className="btn btn--primary btn--large">View the Menu</Link>
      </section>
    </div>
  )
}
