import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ExperienceCard from './ExperienceCard'
import * as API from '../../api/ExperienceRequest.js'
import { useSelector } from 'react-redux'
import { CSpinner } from '@coreui/react'
import ExperienceCategoryTabs, {
    EXPERIENCE_TYPES,
    getExperienceType,
    normalizeExperienceType,
} from './ExperienceCategoryTabs.jsx'

const Experience = () => {
    const auth = useSelector(state => state.auth.authData)
    const [fetching, setFetching] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const activeType = normalizeExperienceType(searchParams.get('type'))

    const [experience, setExperience] = useState([]);
    const filteredExperience = experience.filter(exp => getExperienceType(exp) === activeType)

    // Fetch data from API
    async function fetchData() {
        setFetching(true)
        const response = await API.getExperience(auth.user.USER_ID);
        // console.log(response.data.data);
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
            <ExperienceCategoryTabs
                activeType={activeType}
                onChange={(type) => {
                    setSearchParams(type === EXPERIENCE_TYPES.professional ? {} : { type })
                }}
            />

            <div>
                <Link
                    to={`/experience-add${activeType === EXPERIENCE_TYPES.professional ? '' : `?type=${activeType}`}`}
                    state={{ experience_type: activeType }}
                >
                    <button className='btn btn-success text-light'>
                        Add New <CIcon icon={cilPlus} />
                    </button>
                </Link>
            </div>
            <hr />
            <div className="d-flex justify-content-center align-items-center flex-column flex-wrap">
                {
                    fetching ? <CSpinner className='align-self-start' color="primary" /> :
                    <ExperienceCard
                        experience={filteredExperience}
                        onDelete={handleDelete}
                        activeExperienceType={activeType}
                    />
                }
            </div>

        </div>
    )
}

export default Experience
