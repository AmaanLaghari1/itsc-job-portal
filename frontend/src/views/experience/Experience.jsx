import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ExperienceCard from './ExperienceCard'
import * as API from '../../api/ExperienceRequest.js'
import { useSelector } from 'react-redux'

const Experience = () => {
    const auth = useSelector(state => state.auth.authData)

    const [experience, setExperience] = React.useState([]);
    
    // Fetch data from API
    async function fetchData(){
        const response = await API.getExperience(auth.user.USER_ID);
        console.log(response.data.data);
        setExperience(response.data.data);
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
        <small className='d-block fst-italic'>(Please add your recent experience first)</small>
        <Link to={import.meta.env.VITE_BASE_URL+'experience-add'}>
            <button className='btn btn-warning'>
                Add New <CIcon icon={cilPlus} />
            </button>
        </Link>
        <hr />
        <div className="d-flex justify-content-center align-items-center flex-column flex-wrap">
            {
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