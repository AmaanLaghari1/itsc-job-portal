import React, { use } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilEducation,
  cilSpeedometer,
  cilUser,
  cilSettings,
  cilBullhorn
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = data => [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Announcements',
      to: '/announcements',
      icon: <CIcon icon={cilBullhorn} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Basic Information',
      to: '/user-profile',
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      badge: {
        color: data.completeness.profile > 80 ? 'success' :'danger',
        text: data.completeness.profile+'%',
      },
    },
    {
      component: CNavItem,
      name: 'Qualifications',
      to: '/qualifications',
      icon: <CIcon icon={cilEducation} customClassName="nav-icon" />,
      badge: {
        color: data.completeness.qualification >= 60 ? 'success' :'danger',
        text: data.completeness.qualification+'%',
      },
    },
    {
      component: CNavItem,
      name: 'Experience',
      to: '/experience',
      icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
      badge: {
        color: data.completeness.experience >= 60 ? 'success' :'danger',
        text: data.completeness.experience+'%',
      },
    },
    // {
    //   component: CNavItem,
    //   name: 'Users',
    //   to: '/users',
    //   icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    // },
]

export default _nav
