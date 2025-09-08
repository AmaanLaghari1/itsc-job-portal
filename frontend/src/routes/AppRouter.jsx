import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import DynamicRoutesLoader from './DynamicRoutesLoader'
import { CSpinner } from '@coreui/react'

export default function AppRouter() {
  const [routes, setRoutes] = useState([])

  return (
    <>
      <DynamicRoutesLoader onRoutesReady={setRoutes} />
      <React.Suspense fallback={<div><CSpinner className='align-slef-start my-3' color='primary' /></div>}>
<Routes>
  {routes.map((r, i) => {
    if (!r.element) return null
    return (
      <Route
        key={i}
        path={r.path}  // now normalized: "dashboard", "applications"
        element={React.createElement(r.element)}
      />
    )
  })}
  {/* fallback: redirect to dashboard */}
  <Route path="/" element={<Navigate to="dashboard" replace />} />
</Routes>

      </React.Suspense>
    </>
  )
}
