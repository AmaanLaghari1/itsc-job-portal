import { CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import HtmlRenderer from '../../components/HTMLRenderer.jsx'
import { formatDate } from '../../helper.js'

const AnnouncementDetail = () => {
    const location = useLocation()
    const {announcement} = location.state || {}
    console.log(announcement);
    
    return (
        <div>
            <CCard className="shadow shadow-lg my-5 border-0">
                <CCardBody>
                    {/* <CBadge color="success" className='p-1 px-3 rounded-5 my-2 mb-3 shadow shadow-sm'>Active</CBadge> */}
                    <CCardTitle className='h2 my-3'>Job Title - {announcement.POSITION_NAME}</CCardTitle>
                    <CCardText className='h5'>Department - {announcement.DEPT_NAME}</CCardText>

                    <div>
                        {
                            announcement?.qualification_requirements?.length > 0 &&
                            <h6>Qualifications Requirements</h6>
                        }
                        <ul>
                            {
                                announcement.qualification_requirements.length > 0 && 
                                announcement.qualification_requirements.map(require => {
                                    return (
                                        <li key={require.REQ_ID}>
                                            {require.degree.DEGREE_TITLE} - {require.IS_REQUIRED == 1 ? 'Required' : 'Preferred'}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                    <div className="border-bottom border-1 mb-2 border-secondary-subtle"></div>
                    <div className='lead'>
                        {/* {announcement.DESCRIPTION} */}
                        <HtmlRenderer htmlContent={announcement.DESCRIPTION || ''} />
                    </div>
                    <div className="d-flex flex-wrap justify-content-between">
                        <CCardText className='text-muted fw-bold'>Posted: {formatDate(announcement.START_DATE)}</CCardText>
                        <CCardText className='text-muted fw-bold'>Last date to apply: {formatDate(announcement.END_DATE)}</CCardText>
                    </div>
                </CCardBody>
            </CCard>
        </div>
    )
}

export default AnnouncementDetail