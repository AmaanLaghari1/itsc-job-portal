import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownItemPlain,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CButton,
} from '@coreui/react'
import {
  cilUser,
  cilArrowThickFromRight
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/user-icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../actions/AuthAction'
import MyModal from '../MyModal'

const AppHeaderDropdown = () => {
  const auth = useSelector((state) => state.auth?.authData)
  const dispatch = useDispatch()
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <img style={{width: '2.5rem', height: '2.5rem'}} className='rounded-circle' src={auth.user.PROFILE_IMAGE ? import.meta.env.VITE_BACKEND_URL+auth.user.PROFILE_IMAGE : avatar8} />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItemPlain href="#">
            <Link to={import.meta.env.VITE_BASE_URL+'user-profile'} className='text-decoration-none'>
              <CIcon icon={cilUser} className="me-2" />
              Profile
            </Link>
        </CDropdownItemPlain>
        <CDropdownDivider />
          <CDropdownItemPlain>
          <CButton variant='danger' size='sm' onClick={
              () => {
                dispatch(logOut(auth.token))
              }
            }>
            <CIcon icon={cilArrowThickFromRight} className="me-2" />
              LOGOUT
          </CButton>
          {/* <button className='btn btn-warning btn-sm' role='button' data-bs-toggle="modal" data-bs-target='#logout-modal'>
            <CIcon icon={cilArrowThickFromRight} className="me-2" />
              LOGOUT
          </button> */}
          </CDropdownItemPlain>
      </CDropdownMenu>
      <MyModal id='logout-modal' className='z-5 bg-dark'>
        <p className="lead fw-bold">
          Are you sure to logout?
        </p>
      </MyModal>
    </CDropdown>
  )
}

export default AppHeaderDropdown
