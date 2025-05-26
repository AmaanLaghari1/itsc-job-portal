import { CButton, CCard, CCardBody, CCardText, CCardTitle, CSpinner } from '@coreui/react'
import { cilArrowRight } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import * as API from '../../api/AnnouncementRequest.js'
import { createApplication } from '../../api/ApplicationRequest.js'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertConfirm from '../../components/AlertConfirm.js'
import Alert from '../../components/Alert.js'
import { useSelector } from 'react-redux'

const Announcement = () => {
    const [fetching, setFetching] = useState(false)
    const [announcements, setAnnouncements] = useState([]);
    const navigate = useNavigate()
    const auth = useSelector((state) => state.auth.authData)

    // Fetch data from API
    async function fetchData() {
        setFetching(true)
        const response = await API.getAnnouncement();
        setFetching(false)
        setAnnouncements(response.data.data);
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleApply = async (announcement) => {
        const confirmed = await AlertConfirm({
            title: 'Apply for this announcement?',
            text: 'Please review your application details carefully before applying.',
            confirmBtnText: 'Apply',
        });

        if (confirmed) {
            const formData = new FormData();
            formData.append('announcement_id', announcement.ANNOUNCEMENT_ID);
            formData.append('user_id', auth.user.USER_ID);
            formData.append('apply_date', new Date().toISOString().split('T')[0]);
            try {
                const response = await createApplication(formData)
                if (response.status == 200) {
                    Alert({
                        status: true,
                        text: 'Application submitted successfully'
                    })
                }
            } catch (error) {
                Alert({
                    status: false,
                    text: "Error submitting application"
                })
            }
        }
    }

    const parser = new DOMParser();

    return (
        <div>
            <div
                // style={{background: "#8083ff"}} 
                className="border-bottom border-3 border-primary p-2">
                <h3>Announcements</h3>

            </div>
            {
                fetching ? <CSpinner className='align-self-start my-3' color="primary" /> :
                    <div className='w-100 my-3'>
                        {
                            announcements.map((announcement) => {
                                const html = parser.parseFromString(announcement.DESCRIPTION, 'text/html');

                                return (
                                    <div key={announcement.ANNOUNCEMENT_ID}>
                                        <CCard className="shadow shadow-sm my-3">
                                            <CCardBody>
                                                {/* <CBadge color="success" className='p-1 px-3 rounded-5 my-2 mb-3 shadow shadow-sm'>Active</CBadge> */}
                                                <CCardTitle>Job Title - {announcement.POSITION_NAME || ''}</CCardTitle>
                                                <CCardText>Department - {announcement.DEPT_NAME || ''}</CCardText>

                                                <div className="border-bottom border-1 mb-2 border-secondary-subtle"></div>
                                                {/* <div>
                                                    Description - 
                                                    <HtmlRenderer htmlContent={truncateLongTxt(announcement.DESCRIPTION)} />
                                                    {truncateLongTxt(announcement.DESCRIPTION||'') || 'NA'}
                                                </div> */}
                                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                    <div className="d-flex flex-column">
                                                        <CCardText>Posted - {announcement.START_DATE || ''}</CCardText>
                                                        <CCardText className='text-danger'>Last date to apply - {announcement.END_DATE || ''}</CCardText>
                                                    </div>

                                                    <div className="d-flex justify-content-end">
                                                        <CButton color="secondary" className='rounded-5 shadow shadow-sm mx-1 px-3 mt-3'
                                                            onClick={() => {
                                                                navigate('/announcement-detail', {
                                                                    state: {
                                                                        announcement: announcement,
                                                                    }
                                                                })
                                                            }
                                                            }>
                                                            View Details
                                                        </CButton>
                                                        <CButton color="primary" className='rounded-5 shadow shadow-sm px-3 mt-3'
                                                            onClick={
                                                                () => { handleApply(announcement) }
                                                            }
                                                        >
                                                            Apply Now <CIcon icon={cilArrowRight} />
                                                        </CButton>
                                                    </div>
                                                </div>
                                            </CCardBody>
                                        </CCard>
                                    </div>
                                )
                            })
                        }
                    </div>
                    ||
                    <p className="text-center fst-italic my-5">
                        No announcements available at the moment!
                    </p>
            }
        </div>
    )
}

export default Announcement