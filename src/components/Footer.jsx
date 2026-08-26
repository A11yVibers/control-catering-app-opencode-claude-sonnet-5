import { NavLink } from 'react-router-dom'
import VisuallyHidden from './VisuallyHidden.jsx'

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/',
    icon: '📘',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/',
    icon: '📷',
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <section aria-labelledby="footer-about-heading">
          <h2 id="footer-about-heading" className="site-footer__heading">
            Homestead Table Catering
          </h2>
          <p>Homemade catering for pickup, made fresh to order.</p>
          <p>
            123 Maple Street, Millbrook, ST 00000
            <br />
            <a href="tel:+15555550142">(555) 555-0142</a>
          </p>
        </section>

        <nav aria-labelledby="footer-nav-heading">
          <h2 id="footer-nav-heading" className="site-footer__heading">
            Site map
          </h2>
          <ul className="site-footer__list">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/menu">Menu</NavLink>
            </li>
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </nav>

        <section aria-labelledby="footer-hours-heading">
          <h2 id="footer-hours-heading" className="site-footer__heading">
            Pickup hours
          </h2>
          <ul className="site-footer__list">
            <li>Every day: 11:00 AM – 6:00 PM</li>
          </ul>
        </section>

        <section aria-labelledby="footer-social-heading">
          <h2 id="footer-social-heading" className="site-footer__heading">
            Follow us
          </h2>
          <ul className="site-footer__social">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  <span aria-hidden="true">{social.icon}</span> {social.label}
                  <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <p className="site-footer__copyright">
        © {year} Homestead Table Catering. All rights reserved.
      </p>
    </footer>
  )
}
