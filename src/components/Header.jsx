import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const { totalPortions } = useCart()

  return (
    <header className="site-header">
      <div className="site-header__bar container">
        <NavLink to="/" className="brand" aria-label="Homestead Table Catering — go to homepage">
          <span className="brand__mark" aria-hidden="true">
            🍲
          </span>
          <span className="brand__text">Homestead Table Catering</span>
        </NavLink>

        <nav aria-label="Primary" className="primary-nav">
          <ul className="primary-nav__list">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    isActive ? 'primary-nav__link is-active' : 'primary-nav__link'
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? 'primary-nav__link primary-nav__link--cart is-active' : 'primary-nav__link primary-nav__link--cart'
                }
              >
                Cart
                <span className="cart-count" aria-hidden="true">
                  {totalPortions}
                </span>
                <span className="visually-hidden">
                  {totalPortions === 1
                    ? ', 1 serving in cart'
                    : `, ${totalPortions} servings in cart`}
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
