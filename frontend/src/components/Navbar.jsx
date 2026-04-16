import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/dashboard">📋 Task Planner</NavLink>
      </div>

      <div className="navbar-links">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Dashboard
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Tasks
        </NavLink>
        <NavLink to="/categories" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Categories
        </NavLink>
      </div>

      <div className="navbar-user">
        <span className="user-greeting">Hi, {user?.username}</span>
        <button className="btn btn-sm btn-outline" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
