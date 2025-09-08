import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RoleProtectedRoute = ({ element: Element, path }) => {
  const auth = useSelector((state) => state.auth?.authData)
  const userRole = useSelector(state => state.roles.selectedRole)
  const location = useLocation()

  // Not logged in?
  if (!auth || !userRole) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  const isAdminRole = [1, 2, 3].includes(userRole)
  const isPrimaryRole = userRole === 4

  const isAdminRoute = path?.startsWith('/admin')
  const isPrimaryRoute = !isAdminRoute // treat anything not /admin as primary route

  // Prevent primary user from accessing admin routes
  if (isAdminRoute && isPrimaryRole) {
    return <Navigate to="/dashboard" replace />
  }

  // Prevent admin user from accessing primary routes
  if (isPrimaryRoute && isAdminRole) {
    return <Navigate to="/admin/dashboard" replace />
  }

  return <Element />
}

export default RoleProtectedRoute
