import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle.js'

export default function NotFound() {
  usePageTitle('Page not found')

  return (
    <div className="page container">
      <h1>Page not found</h1>
      <p>We couldn&rsquo;t find the page you were looking for.</p>
      <p>
        <Link to="/">Return to the homepage</Link> or{' '}
        <Link to="/menu">browse the menu</Link>.
      </p>
    </div>
  )
}
