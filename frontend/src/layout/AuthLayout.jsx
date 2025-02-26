import React from 'react'
import login_thumbnail from '../assets/images/login_thumbnail.png'

const AuthLayout = ({children}) => {
  return (
    <div className="container-fluid bg-primary">
        <div className="row p-3">
            <div className="col-md-6 d-none d-md-block align-content-center">
                <img className="d-block mx-auto w-75" src={login_thumbnail} alt="" />
            </div>
            {children}
        </div> 
    </div>
  )
}

export default AuthLayout