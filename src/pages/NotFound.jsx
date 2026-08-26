import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page container empty-state">
      <h1>Page not found</h1>
      <p>The page you&rsquo;re looking for doesn&rsquo;t exist.</p>
      <Link to="/" className="btn btn--primary">Back to home</Link>
    </div>
  )
}
