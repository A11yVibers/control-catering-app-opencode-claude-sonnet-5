import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/businessInfo'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__col">
          <h3 className="site-footer__heading">{BUSINESS.name}</h3>
          <p>{BUSINESS.tagline}</p>
          <p>{BUSINESS.address}</p>
        </div>
        <div className="site-footer__col">
          <h3 className="site-footer__heading">Contact</h3>
          <p><a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a></p>
          <p><a href={BUSINESS.emailHref}>{BUSINESS.email}</a></p>
          <div className="social-links">
            <a href={BUSINESS.social.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={BUSINESS.social.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a href={BUSINESS.social.yelp} target="_blank" rel="noreferrer">Yelp</a>
          </div>
        </div>
        <div className="site-footer__col">
          <h3 className="site-footer__heading">Pickup Hours</h3>
          <ul className="hours-list">
            {BUSINESS.pickupHours.map((h) => (
              <li key={h.day}><span>{h.day}</span><span>{h.hours}</span></li>
            ))}
          </ul>
        </div>
        <div className="site-footer__col">
          <h3 className="site-footer__heading">Quick Links</h3>
          <p><Link to="/menu">Order Catering</Link></p>
          <p><Link to="/contact">Contact Us</Link></p>
          <p><Link to="/records">Order Records</Link></p>
        </div>
      </div>
      <div className="site-footer__bottom">
        <p>© {year} {BUSINESS.name}. All rights reserved.</p>
        <p>This is a demo site — no real orders or payments are processed.</p>
      </div>
    </footer>
  )
}
