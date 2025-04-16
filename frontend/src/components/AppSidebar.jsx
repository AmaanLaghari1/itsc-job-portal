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

// sidebar nav config
import navigation from '../_nav.jsx'

const AppSidebar = () => {
  const dispatch = useDispatch()  
  const unfoldable = useSelector((state) => state.ui.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.ui.sidebarShow)
  const theme = useSelector((state) => state.ui.theme)
  const auth = useSelector((state) => state.auth)
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
      <AppSidebarNav items={navigation(auth)} />
      <CSidebarFooter className="border-to border-light d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
