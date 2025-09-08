import React, { Suspense, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import PrivateRoute from './routes/PrivateRoute.jsx'
import { getDashboardPath } from './helper.js'

// Lazy imports
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout.jsx'))
const Login = React.lazy(() => import('./views/pages/login/Login.jsx'))
const ForgotPassword = React.lazy(() => import('./views/pages/login/ForgotPassword.jsx'))
const ResetPassword = React.lazy(() => import('./views/pages/login/ResetPassword.jsx'))
const Register = React.lazy(() => import('./views/pages/register/Register.jsx'))
const VerifyEmail = React.lazy(() => import('./views/pages/register/VerifyEmail.jsx'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404.jsx'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500.jsx'))

const App = () => {
  const { setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.ui.theme)
  const auth = useSelector((state) => state.auth)
  const token = auth?.token
  const currentRole = useSelector(state => state.roles.selectedRole)
  // console.log(currentRole)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme')?.match(/^[A-Za-z0-9\s]+/)[0]
    setColorMode(theme || storedTheme || 'light')
  }, []) // eslint-disable-line


  return (
    <Suspense fallback={<div className="pt-3 text-center"><CSpinner color="primary" variant="grow" /></div>}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={token ? <Navigate to={getDashboardPath(currentRole)} replace /> : <Login />} />
        <Route path="/register" element={token ? <Navigate to={getDashboardPath(currentRole)} replace /> : <Register />} />
        <Route path="/verify-email" element={token ? <Navigate to={getDashboardPath(currentRole)} replace /> : <VerifyEmail />} />
        <Route path="/forgot-password" element={token ? <Navigate to={getDashboardPath(currentRole)} replace /> : <ForgotPassword />} />
        <Route path="/reset-password" element={token ? <Navigate to={getDashboardPath(currentRole)} replace /> : <ResetPassword />} />

        {/* Root redirect */}
        <Route path="/" element={<Navigate to={getDashboardPath(currentRole)} replace />} />

        {/* Error Page */}
        <Route path="/404" element={<Page404 />} />
        <Route path="/*" element={
          <PrivateRoute>
            <DefaultLayout />
          </PrivateRoute>
        } />
      </Routes>
    </Suspense>

  )
}

export default App
