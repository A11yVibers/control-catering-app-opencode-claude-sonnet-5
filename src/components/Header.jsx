import { NavLink } from 'react-router-dom'
import { BUSINESS } from '../data/businessInfo'
import { useCart } from '../context/CartContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const { itemCount } = useCart()

  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <NavLink to="/" className="brand">
          <span className="brand__mark" aria-hidden="true">🍲</span>
          <span className="brand__name">{BUSINESS.name}</span>
        </NavLink>
        <nav className="site-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 'site-nav__link' + (isActive ? ' is-active' : '')}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/cart" className="cart-link" aria-label={`View cart, ${itemCount} item${itemCount === 1 ? '' : 's'}`}>
          <span aria-hidden="true">🛒</span>
          <span className="cart-link__label">Cart</span>
          {itemCount > 0 && <span className="cart-link__badge">{itemCount}</span>}
        </NavLink>
      </div>
    </header>
  )
}
