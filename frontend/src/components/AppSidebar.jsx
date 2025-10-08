import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import logoWhite from '../assets/images/logos/usindh-logo-white.png'
import logo from '../assets/images/logos/usindh-logo.png'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'
import { switchRole } from '../actions/AuthAction.js'

// sidebar nav config
import navigation from '../_nav.jsx'
import RoleSwitcher from './RoleSwitcher.jsx'

const AppSidebar = () => {
  const dispatch = useDispatch()  
  const unfoldable = useSelector((state) => state.ui.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.ui.sidebarShow)
  const theme = useSelector((state) => state.ui.theme)
  const profile = useSelector((state) => state.profile)
  const currentRole = useSelector(state => state.ui.role)

  const handleRoleChange = (e) => {
    dispatch(switchRole(e.target.value))
  }
  return (
    <CSidebar
      className="border-end"
      colorScheme="light"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-botto border-light">
        <CSidebarBrand to="/">
          <img className="sidebar-brand-full" src={theme === 'dark' ? logoWhite : logo} height={52} />
          <img className="sidebar-brand-narrow" src={theme === 'dark' ? logoWhite : logo} height={52} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />

      </CSidebarHeader>
      {/* <div className="small px-3 p-1">
        <label htmlFor="role" className="form-label fw-bolder text-primary mb-0">Switch Role</label>
        <select name="role" id="role" className="form-control form-control-sm bg-primary text-light border-0 mt-0 w-75 form-select"
        value={currentRole}
        onChange={handleRoleChange}
        >
          <option value="1">Super Admin</option>
          <option value="2">Admin</option>
          <option value="3">Operator</option>
          <option value="4">Primary</option>
        </select>
      </div> */}
      <RoleSwitcher />
      <AppSidebarNav items={navigation(profile)} />
      {/* <CSidebarFooter className="border-to border-light d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
