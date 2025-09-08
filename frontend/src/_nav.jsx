import CIcon from '@coreui/icons-react'
import {
  cilEducation,
  cilSpeedometer,
  cilUser,
  cilSettings,
  cilBullhorn
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'
import { roundOff } from './helper'
import { useSelector } from 'react-redux'

const _nav = data => {
  const auth = useSelector(state => state.auth)
  const currentRole = useSelector(state => state.roles.selectedRole)
  // console.log(auth)
    if(currentRole == 4){
      return [
          {
            component: CNavItem,
            name: 'My Applications',
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
              color: data.completeness.profile == 100 ? 'success' :'danger',
              text: roundOff(data.completeness.profile)+'%',
            },
          },
          {
            component: CNavItem,
            name: 'Qualifications',
            to: '/qualifications',
            icon: <CIcon icon={cilEducation} customClassName="nav-icon" />,
            badge: {
              color: data.completeness.qualification == 100 ? 'success' :'danger',
              text: roundOff(data.completeness.qualification)+'%',
            },
          },
          {
            component: CNavItem,
            name: 'Experience',
            to: '/experience',
            icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
            badge: {
              color: data.completeness.experience == 100 ? 'success' :'danger',
              text: roundOff(data.completeness.experience)+'%',
            },
          }
      ]
    } else if(currentRole == 3 || currentRole == 2 || currentRole == 1) {
      return [
        {
          component: CNavItem,
          name: 'All Announcements',
          to: '/admin/dashboard',
          icon: <CIcon icon={cilBullhorn} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'All Applications',
          to: '/admin/applications',
          icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'All Users',
          to: '/admin/users',
          icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        },
      ]
    }
}

export default _nav
