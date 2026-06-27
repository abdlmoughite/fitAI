import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext()

function mapBackendUser(backendUser) {
  const firstname = backendUser.firstname || ''
  const lastname = backendUser.lastname || ''
  const fullName = `${firstname} ${lastname}`.trim() || backendUser.username || 'Utilisateur'
  const initials = [firstname[0], lastname[0]].filter(Boolean).join('').toUpperCase() || '?'
  const roleName = backendUser.role?.roleName || 'client'

  return {
    id: backendUser.id,
    name: fullName,
    email: backendUser.email || backendUser.username,
    role: roleName,
    initials,
    plan: backendUser.plan || 'Starter',
    joinDate: backendUser.joinDate || null,
    stats: {
      totalWorkouts: backendUser.totalWorkouts || 0,
      totalMinutes: backendUser.totalMinutes || 0,
      currentStreak: backendUser.currentStreak || 0,
      bestStreak: backendUser.bestStreak || 0,
    },
    urlImage: backendUser.urlImage || null,
    city: backendUser.city || null,
    tel: backendUser.tel || null,
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('fitai-user')
    const token = localStorage.getItem('fitai-token')
    if (stored && token) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('fitai-user')
        localStorage.removeItem('fitai-token')
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const { accessToken, user: backendUser } = await authService.login(email, password)
    const mappedUser = mapBackendUser(backendUser)
    localStorage.setItem('fitai-token', accessToken)
    localStorage.setItem('fitai-user', JSON.stringify(mappedUser))
    setUser(mappedUser)
    return mappedUser
  }, [])

  const register = useCallback(async (firstname, lastname, email, password) => {
    const { accessToken, user: backendUser } = await authService.register(firstname, lastname, email, password)
    const mappedUser = mapBackendUser(backendUser)
    localStorage.setItem('fitai-token', accessToken)
    localStorage.setItem('fitai-user', JSON.stringify(mappedUser))
    setUser(mappedUser)
    return mappedUser
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('fitai-token')
    localStorage.removeItem('fitai-user')
  }, [])

  const hasRole = useCallback((...roles) => {
    if (!user) return false
    return roles.includes(user.role)
  }, [user])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, hasRole, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
