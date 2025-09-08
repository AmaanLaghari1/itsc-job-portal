import { CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'
import { useLocation } from 'react-router-dom'
import HtmlRenderer from '../../components/HTMLRenderer.jsx'
import { formatDate } from '../../helper.js'

const AnnouncementDetail = () => {
    const location = useLocation()
    const {announcement} = location.state || {}
    
    return (
        <div>
            <CCard className="shadow shadow-lg my-5 border-0">
                <CCardBody>
                    <CCardTitle className='fw-bolder h3'>
                        {announcement.ANNOUNCEMENT_TITLE??'NA'}
                    </CCardTitle>
                    <CCardText>
                        <span className="fw-bold">Position: </span>
                        {announcement.POSITION_NAME??'NA'} <br />
                        <span className="fw-bold">Department: </span>
                        {announcement?.department.DEPT_NAME??'NA'}
                    </CCardText>
                    <CCardText>
                    </CCardText>

                    <div>
                        {
                            announcement?.qualification_requirements?.length > 0 &&
                            <h6 className='fw-bold'>Required Qualifications:</h6>
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

                    <div>
                        <h6 className="">
                            <span className="fw-bold">
                                Required Age: 
                            </span> {announcement.AGE_FROM??'NA'} to {announcement.AGE_TO??'NA'} years
                        </h6>
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