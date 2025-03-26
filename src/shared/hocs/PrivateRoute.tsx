import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'

export const PrivateRoute = () => {
  const { user } = useAuth()
  const location = useLocation()

  return user ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
}
