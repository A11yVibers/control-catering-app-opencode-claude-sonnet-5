import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/business'
import { commonsImage, IMAGE_CREDITS } from '../data/images'

export default function About() {
  return (
    <div className="container about-page">
      <h1>About {BUSINESS.name}</h1>
      <div className="about-page__grid">
        <img
          src={commonsImage('Roast chicken.jpg')}
          alt="A homemade roast chicken, the kind of scratch-made meal Home Table is known for"
          className="about-page__image"
        />
        <div className="about-page__story">
          {BUSINESS.story.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          <p className="about-page__signature">— {BUSINESS.ownerName}, Founder</p>
        </div>
      </div>

      <div className="about-page__details">
        <div>
          <h2>Hours</h2>
          <ul className="hours-list">
            {BUSINESS.hours.map((h) => (
              <li key={h.days}>
                <span>{h.days}</span>
                <span>{h.hours}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Pickup location</h2>
          <p>{BUSINESS.pickupAddress}</p>
          <p>Pickup window: {BUSINESS.pickupWindow.start} – {BUSINESS.pickupWindow.end}</p>
        </div>
      </div>

      <div className="about-page__cta">
        <Link to="/menu" className="btn btn--primary btn--lg">
          See this week's menu
        </Link>
      </div>

      <details className="photo-credits">
        <summary>Photo credits</summary>
        <ul>
          {IMAGE_CREDITS.map((c) => (
            <li key={c.file}>
              {c.dish}: photo by {c.author} via{' '}
              <a href={`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(c.file)}`} target="_blank" rel="noreferrer noopener">
                Wikimedia Commons
              </a>{' '}
              ({c.license})
            </li>
          ))}
        </ul>
      </details>
    </div>
  )
}
