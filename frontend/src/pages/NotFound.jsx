import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', margin: '0' }}>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/dashboard" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
