import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CSpinner } from '@coreui/react'

// Component mapping (link Laravel COMPONENT name to React.lazy import)
const componentMap = {
  AdminDashboard: React.lazy(() => import('../views/admin/dashboard/AdminDashboard')),
  Applications: React.lazy(() => import('../views/admin/applications/Applications')),
  ApplicationEdit: React.lazy(() => import('../views/admin/applications/ApplicationEdit')),
  ApplicationUpdateUser: React.lazy(() => import('../views/admin/applications/ApplicationUpdateUser')),
  ApplicationUsers: React.lazy(() => import('../views/admin/applications/ApplicationUsers')),
  Dashboard: React.lazy(() => import('../views/dashboard/Dashboard')),
  ApplicationConfirm: React.lazy(() => import('../views/dashboard/ApplicationConfirm')),
  Announcement: React.lazy(() => import('../views/announcement/Announcement')),
  AnnouncementEdit: React.lazy(() => import('../views/admin/announcements/AnnouncementEdit')),
  AnnouncementAdd: React.lazy(() => import('../views/admin/announcements/AnnouncementAdd')),
  AnnouncementDetail: React.lazy(() => import('../views/announcement/AnnouncementDetail')),
  Profile: React.lazy(() => import('../views/profile/Profile')),
  Qualification: React.lazy(() => import('../views/qualification/Qualification')),
  QualificationAdd: React.lazy(() => import('../views/qualification/QualificationAdd')),
  QualificationEdit: React.lazy(() => import('../views/qualification/QualificationEdit')),
  Experience: React.lazy(() => import('../views/experience/Experience')),
  ExperienceAdd: React.lazy(() => import('../views/experience/ExperienceAdd')),
  ExperienceEdit: React.lazy(() => import('../views/experience/ExperienceEdit')),
  Users: React.lazy(() => import('../views/users/Users')),
}

// const normalizePath = (path) => {
//   if (!path) return ''
//   // strip leading slash
//   let newPath = path.startsWith('/') ? path.slice(1) : path

//   // if it starts with "admin/", drop that part because DefaultLayout is already under /admin/*
//   if (newPath.startsWith('admin/')) {
//     newPath = newPath.replace('admin/', '')
//   }

//   return newPath
// }

const normalizePath = (path) => path || ''


export default function DynamicRoutesLoader({ onRoutesReady }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + 'routes/get')
      .then(response => {
        const dynamicRoutes = response.data.map(route => ({
          path: normalizePath(route.PATH), // ✅ Fix
          name: route.NAME,
          icon: route.ICON,
          element: componentMap[route.COMPONENT] || null
        }))
        
        onRoutesReady(dynamicRoutes)
        // console.log(response)
      })
      .finally(() => setLoading(false))
  }, [])



  if (loading) return <div>
    <CSpinner className='align-slef-start my-3' color='primary' />
  </div>
  return null
}
