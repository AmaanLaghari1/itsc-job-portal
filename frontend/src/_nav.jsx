import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilUser,
  cilUserPlus,
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      badge: {
        color: 'info',
        text: 'NEW',
      },
    },
    {
      component: CNavItem,
      name: 'Basic Information',
      to: '/user-profile',
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      badge: {
        color: 'warning',
        text: '20%',
      },
    },
    {
      component: CNavItem,
      name: 'Users',
      to: '/users',
      icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    },
]

export default _nav
