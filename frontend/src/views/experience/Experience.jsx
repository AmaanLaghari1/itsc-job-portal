import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ExperienceCard from './ExperienceCard'
import * as API from '../../api/QualificationRequest.js'
import { useSelector } from 'react-redux'

const Experience = () => {
    const auth = useSelector(state => state.auth.authData)

    const [experience, setExperience] = React.useState([]);
    
    // Fetch data from API
    async function fetchQualData(){
        const response = await API.getQualification(auth.user.USER_ID);
        console.log(response.data.data);
        setExperience(response.data.data);
      }
      
      useEffect(() => {
        
    
        fetchQualData()
      }, [])

  return (
    <div>
        <h1>Experience</h1>
        <Link to={import.meta.env.VITE_BASE_URL+'experience-add'}>
            <button className='btn btn-warning'>
                Add New <CIcon icon={cilPlus} />
            </button>
        </Link>
        <hr />
        <div className="d-flex justify-content-center align-items-center flex-column flex-wrap">
            {
                // <ExperienceCard qualification={experience} /> ||
                <p className="text-center fst-italic my-5">
                    No experience added yet!
                </p>
            }
        </div>
    </div>
  )
}

export default Experience