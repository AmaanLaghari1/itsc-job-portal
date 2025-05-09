import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Profile = React.lazy(() => import('./views/profile/Profile'))
const Qualification = React.lazy(() => import('./views/qualification/Qualification'))
const QualificationAdd = React.lazy(() => import('./views/qualification/QualificationAdd'))
const QualificationEdit = React.lazy(() => import('./views/qualification/QualificationEdit'))
const Experience = React.lazy(() => import('./views/experience/Experience'))
const ExperienceAdd = React.lazy(() => import('./views/experience/ExperienceAdd'))
const ExperienceEdit = React.lazy(() => import('./views/experience/ExperienceEdit'))
const Users = React.lazy(() => import('./views/users/Users'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/user-profile', name: 'Basic Information', element: Profile },
  { path: '/qualifications', name: 'Qualifications', element: Qualification },
  { path: '/qualification-add', name: 'Add Qualification', element: QualificationAdd },
  { path: '/qualification-edit', name: 'Edit Qualification', element: QualificationEdit },
  { path: '/experience', name: 'Experience', element: Experience },
  { path: '/experience-add', name: 'Add Experience', element: ExperienceAdd },
  { path: '/experience-edit', name: 'Edit Experience', element: ExperienceEdit },
  { path: '/users', name: 'Users', element: Users },
]

export default routes
