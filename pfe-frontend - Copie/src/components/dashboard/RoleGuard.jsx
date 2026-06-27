import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function RoleGuard({ children, roles, fallback = '/dashboard' }) {
  const { user, hasRole, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (roles && !hasRole(...(Array.isArray(roles) ? roles : [roles]))) {
    return <Navigate to={fallback} replace />
  }

  return children
}
