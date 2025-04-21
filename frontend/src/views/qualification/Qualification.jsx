import React, { useEffect, useMemo, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { useSelector } from 'react-redux'
import QualificationCard from './QualificationCard.jsx'
import * as API from '../../api/QualificationRequest.js'
import { Link } from 'react-router-dom'

const Qualification = () => {
    const auth = useSelector(state => state.auth.authData)

    const [qualification, setQualification] = React.useState([]);
    
    // Fetch data from API
    async function fetchQualData(){
        const response = await API.getQualification(auth.user.USER_ID);
        console.log(response.data.data);
        setQualification(response.data.data);
      }
      
      useEffect(() => {
        
    
        fetchQualData()
      }, [])

      const handleDelete = (qualId) => {
        setQualification((prev) => prev.filter((qual) => qual.QUALIFICATION_ID !== qualId));
      }

  return (
    <div>
        <h1>Qualifications</h1>
        <small className='d-block fst-italic'>(Please add your recent qualification first)</small>
        <Link to={import.meta.env.VITE_BASE_URL+'qualification-add'}>
            <button className='btn btn-warning'>
                Add New <CIcon icon={cilPlus} />
            </button>
        </Link>
        <hr />
        <div className="d-flex justify-content-center align-items-center flex-column flex-wrap">

            {
                <QualificationCard onDelete={handleDelete} qualification={qualification} /> ||
                <p className="text-center fst-italic my-5">
                    No qualifications added yet!
                </p>
            }
        </div>
    </div>
  )
}

export default Qualification