import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Profile = React.lazy(() => import('./views/profile/Profile'))
const Users = React.lazy(() => import('./views/users/Users'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/user-profile', name: 'Profile', element: Profile },
  { path: '/users', name: 'Users', element: Users },
]

export default routes
