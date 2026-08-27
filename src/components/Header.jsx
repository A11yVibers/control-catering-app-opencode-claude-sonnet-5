import { NavLink } from 'react-router-dom'
import { BUSINESS } from '../data/business'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const { totalServings } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="site-header__bar container">
        <NavLink to="/" className="site-header__brand" onClick={() => setOpen(false)}>
          <span className="site-header__brand-mark" aria-hidden="true">
            🍲
          </span>
          <span className="site-header__brand-name">{BUSINESS.name}</span>
        </NavLink>

        <button
          type="button"
          className="site-header__toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-header__nav ${open ? 'is-open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `site-header__link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/cart"
            className={({ isActive }) => `site-header__cart ${isActive ? 'is-active' : ''}`}
            onClick={() => setOpen(false)}
          >
            Cart
            {totalServings > 0 && <span className="site-header__cart-badge">{totalServings}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
