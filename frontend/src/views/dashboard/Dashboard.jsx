import React from 'react'
import ApplicationCard from './ApplicationCard'
import * as API from '../../api/ApplicationRequest.js'
import { useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const [fetching, setFetching] = useState(false)
    const [applications, setApplications] = useState([]);
    const auth = useSelector((state) => state.auth.authData)

    // Fetch data from API
    async function fetchData(){
        setFetching(true)
        try {
          const response = await API.getApplication(auth.user.USER_ID);
          // console.log(response.data.data);
          setApplications(response.data.data);
        } catch (error) {
            console.log(error);
        }
        setFetching(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

  return (
    <div>
      <div
      // style={{background: "#8083ff"}} 
      className="border-bottom border-3 border-primary p-2">
        <h3>Applications</h3>
      </div>
      <div className="d-flex flex-wrap">
        {
          fetching ? <CSpinner className='align-slef-start my-3' color='primary' /> :
          applications.length > 0 ? applications.map(application => <ApplicationCard key={application.APPLICATION_ID} application={application} />) : <div className="d-flex justify-content-center w-100">
            <div className="fst-italic my-5 py-5">
                You have no application applied! <Link to='/announcements' className='text-decoration-none'>Apply Now</Link>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Dashboard