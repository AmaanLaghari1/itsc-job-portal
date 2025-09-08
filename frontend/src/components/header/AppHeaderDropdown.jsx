import {
  CDropdown,
  CDropdownItemPlain,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownMenu,
  CDropdownToggle,
  CButton,
} from '@coreui/react'

import { cilUser, cilArrowThickFromRight } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import dummyPic from '../../assets/images/avatars/dummy-pic.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../actions/AuthAction'
import MyModal from '../MyModal'

const AppHeaderDropdown = () => {
  const dispatch = useDispatch()

  // ✅ Combined selector to avoid rerenders
  const { authData: auth, token } = useSelector((state) => state.auth)

  // ✅ If user not logged in, don't render dropdown
  if (!auth?.user) return null

  const profileImageSrc = auth.user.PROFILE_IMAGE
    ? (auth.user.PROFILE_IMAGE ? import.meta.env.VITE_ASSET_URL+auth.user.PROFILE_IMAGE : dummyPic)
    : dummyPic

  const handleLogout = () => {
    dispatch(logOut(auth.token))
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <img
          style={{ width: '2.5rem', height: '2.5rem' }}
          className="rounded-circle"
          src={profileImageSrc}
          alt="User Avatar"
        />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
          Account
        </CDropdownHeader>

        <CDropdownItemPlain>
          <Link
            to={`${import.meta.env.VITE_BASE_URL}user-profile`}
            className="text-decoration-none"
          >
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </Link>
        </CDropdownItemPlain>

        <CDropdownDivider />

        <CDropdownItemPlain>
          <CButton variant="danger" size="sm" onClick={handleLogout}>
            <CIcon icon={cilArrowThickFromRight} className="me-2" />
            LOGOUT
          </CButton>
        </CDropdownItemPlain>
      </CDropdownMenu>

      <MyModal id="logout-modal" className="z-5 bg-dark">
        <p className="lead fw-bold">Are you sure to logout?</p>
      </MyModal>
    </CDropdown>
  )
}

export default AppHeaderDropdown
