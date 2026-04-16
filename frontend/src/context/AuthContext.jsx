import { createContext, useContext, useState, useEffect } from 'react'
import { loginUser, registerUser } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // On first load, restore session from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('token')
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser))
      setToken(savedToken)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const res = await loginUser({ email, password })
    const { user, token } = res.data
    setUser(user)
    setToken(token)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    return user
  }

  const register = async (username, email, password) => {
    const res = await registerUser({ username, email, password })
    const { user, token } = res.data
    setUser(user)
    setToken(token)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    return user
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
