import { Link } from 'react-router-dom'
import { BUSINESS } from '../data/business'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <p className="site-footer__brand">{BUSINESS.name}</p>
          <p className="site-footer__tagline">{BUSINESS.tagline}</p>
        </div>
        <div>
          <p className="site-footer__heading">Visit</p>
          <p>{BUSINESS.address}</p>
          <p>
            <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>
          </p>
        </div>
        <div>
          <p className="site-footer__heading">Explore</p>
          <ul className="site-footer__links">
            <li>
              <Link to="/menu">Weekly Menu</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="site-footer__heading">Follow along</p>
          <ul className="site-footer__links">
            {BUSINESS.social.map((s) => (
              <li key={s.id}>
                <a href={s.href} target="_blank" rel="noreferrer noopener">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="site-footer__copyright">
        © {new Date().getFullYear()} {BUSINESS.name}. Homemade with care.
      </p>
    </footer>
  )
}
