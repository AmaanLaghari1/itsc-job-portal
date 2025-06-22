import { CSpinner } from '@coreui/react'
import * as API from '../../api/AnnouncementRequest.js'
import { useEffect, useState } from 'react'
import AnnouncementCard from './AnnouncementCard.jsx'

const Announcement = () => {
    // const [fetching, setFetching] = useState(false)
    const [announcements, setAnnouncements] = useState([]);

    // Fetch data from API
    async function fetchData() {
        // setFetching(true)
        const response = await API.getAnnouncement();
        // setFetching(false)
        setAnnouncements(response.data.data);
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <div
                className="border-bottom border-3 border-primary p-2">
                <h3>Announcements</h3>

            </div>
            {
                // fetching ? <CSpinner className='align-self-start my-3' color="primary" /> :
                    <div className='w-100 my-3'>
                        {
                            announcements && announcements.length > 0 ?
                            announcements.map((announcement) => {

                                return (
                                    <AnnouncementCard announcement={announcement} key={announcement.ANNOUNCEMENT_ID} />
                                )
                            })
                        :
                        <p className="text-center fst-italic my-5 py-5">
                            No announcements available at the moment!
                        </p>
                        }
                    </div>
            }
        </div>
    )
}

export default Announcement