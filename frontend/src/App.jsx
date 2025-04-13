import React, { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// We use those styles to show code examples, you should remove them in your application.
// import './scss/examples.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const ForgotPassword = React.lazy(() => import('./views/pages/login/ForgotPassword'))
const ResetPassword = React.lazy(() => import('./views/pages/login/ResetPassword'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const VerifyEmail = React.lazy(() => import('./views/pages/register/VerifyEmail'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.ui.theme)

  const auth = useSelector((state) => state.auth)
  let token = null || auth?.token

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }
    else {
      setColorMode(storedTheme || 'light')
    }
    // else {
    //   setColorMode(storedTheme || 'light')
    // }
    // if (isColorModeSet()) {
    //   return
    // }
    
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/login" name="Login Page" element={token != null ? <Navigate to='/dashboard' /> : <Login />} />
          <Route exact path="/register" name="Register Page" element={token != null ? <Navigate to='/dashboard' /> : <Register />} />
          <Route exact path="/verify-email" name="Register Page" element={token != null ? <Navigate to='/dashboard' /> : <VerifyEmail />} />
          <Route exact path="/forgot-password" name="Password Forget Page" element={token != null ? <Navigate to='/dashboard' /> : <ForgotPassword />} />
          <Route exact path="/reset-password" name="Password Reset Page" element={token != null ? <Navigate to='/dashboard' /> : <ResetPassword />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="/*" name="Dashboard" element={token != null ? <DefaultLayout /> : <Navigate to='/login' />} />
          {/* <Route path="*" name="Home" element={<Page404 />} /> */}
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
