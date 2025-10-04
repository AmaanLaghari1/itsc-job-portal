import React from 'react'

// Protected Components
const AdminDashboard = React.lazy(() => import('./views/admin/dashboard/AdminDashboard'))
const Applications = React.lazy(() => import('./views/admin/applications/Applications'))
const ApplicationEdit = React.lazy(() => import('./views/admin/applications/ApplicationEdit'))
const ApplicationUpdateUser = React.lazy(() => import('./views/admin/applications/ApplicationUpdateUser'))
const AnnouncementEdit = React.lazy(() => import('./views/admin/announcements/AnnouncementEdit'))
const UsersAll = React.lazy(() => import('./views/admin/users/UsersAll'))
const ProgramManage = React.lazy(() => import('./views/admin/programs/ProgramManage'))

// Public Components
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ApplicationConfirm = React.lazy(() => import('./views/dashboard/ApplicationConfirm'))
const Announcement = React.lazy(() => import('./views/announcement/Announcement'))
const AnnouncementAdd = React.lazy(() => import('./views/admin/announcements/AnnouncementAdd'))
const AnnouncementDetail = React.lazy(() => import('./views/announcement/AnnouncementDetail'))
const Profile = React.lazy(() => import('./views/profile/Profile'))
const Qualification = React.lazy(() => import('./views/qualification/Qualification'))
const QualificationAdd = React.lazy(() => import('./views/qualification/QualificationAdd'))
const QualificationEdit = React.lazy(() => import('./views/qualification/QualificationEdit'))
const Experience = React.lazy(() => import('./views/experience/Experience'))
const ExperienceAdd = React.lazy(() => import('./views/experience/ExperienceAdd'))
const ExperienceEdit = React.lazy(() => import('./views/experience/ExperienceEdit'))
const Users = React.lazy(() => import('./views/users/Users'))

const routes = [
  // Protected Routes
  { path: '/', exact: true, name: 'Home' },
  { path: '/admin/dashboard', name: 'All Announcements', element: AdminDashboard },
  { path: '/admin/announcement/add', name: 'Add Announcement', element: AnnouncementAdd },
  { path: '/admin/announcement/edit', name: 'Edit Announcement', element: AnnouncementEdit },
  { path: '/admin/applications', name: 'All Applications', element: Applications },
  { path: '/admin/application/edit', name: 'Dashboard', element: ApplicationEdit },
  { path: '/admin/application/update-user', name: 'Dashboard', element: ApplicationUpdateUser },
  { path: '/admin/users', name: 'All Users', element: UsersAll },
  { path: '/admin/program/manage', name: 'Programs Management', element: ProgramManage },

  // Public routes
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/confirm-application', name: 'Application', element: ApplicationConfirm },
  { path: '/announcements', name: 'Announcement', element: Announcement },
  { path: '/announcement-add', name: 'Add Announcement', element: AnnouncementAdd },
  { path: '/announcement-detail', name: 'Announcement Detail', element: AnnouncementDetail },
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
