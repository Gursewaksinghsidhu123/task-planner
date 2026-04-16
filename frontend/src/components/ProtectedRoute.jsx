import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Wraps any route that requires a logged-in user.
// If there's no token, redirect to /login.
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
