// hooks/useTokenExpiryHandler.js
import { useEffect } from 'react'
// import jwtDecode from 'jwt-decode'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../actions/AuthAction'
import { useNavigate } from 'react-router-dom'

const useTokenExpiryHandler = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(state => state.auth?.token)

  useEffect(() => {
    if (!token) return

    try {
      const decoded = jwtDecode(token)
      const currentTime = Date.now() / 1000 // seconds

      if (decoded.exp && decoded.exp < currentTime) {
        console.warn('Token expired. Logging out...')
        dispatch(logOut(token)) // clear redux and localStorage
        navigate('/login')
      }
    } catch (err) {
      console.error('Invalid token. Logging out...')
      dispatch(logOut(token))
      navigate('/login')
    }
  }, [token, dispatch, navigate])
}

export default useTokenExpiryHandler
