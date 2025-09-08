import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ExperienceCard from './ExperienceCard'
import * as API from '../../api/ExperienceRequest.js'
import { useSelector } from 'react-redux'
import { CSpinner } from '@coreui/react'

const Experience = () => {
    const auth = useSelector(state => state.auth.authData)
    const [fetching, setFetching] = useState(false)

    const [experience, setExperience] = useState([]);
    
    // Fetch data from API
    async function fetchData(){
        setFetching(true)
        const response = await API.getExperience(auth.user.USER_ID);
        console.log(response.data.data);
        setExperience(response.data.data);
        setFetching(false)
      }

      // Delete handler to update state
    const handleDelete = (id) => {
        setExperience(prev => prev.filter(exp => exp.EXPERIANCE_ID !== id));
    }
      
    useEffect(() => {
    fetchData()
    }, [])

  return (
    <div>
        <h1>Experience</h1>
        <Link to={import.meta.env.VITE_BASE_URL+'experience-add'}>
            <button className='btn btn-success text-light'>
                Add New <CIcon icon={cilPlus} />
            </button>
        </Link>
        <hr />
        <div className="d-flex justify-content-center align-items-center flex-column flex-wrap">
            {
                fetching ? <CSpinner className='align-self-start' color="primary" /> :
                <ExperienceCard experience={experience} onDelete={handleDelete} /> ||
                <p className="text-center fst-italic my-5">
                    No experience added yet!
                </p>
            }
        </div>
    </div>
  )
}

export default Experience