// import { cilArrowRight, cilChartPie } from '@coreui/icons'
import { CBadge, CButton, CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../../helper'


export const ApplicationCard = ({application}) => {
    const navigate = useNavigate()

    return (
        <div className='w-100 my-3'>
            <CCard className="shadow shadow-sm">
                <CCardBody>
                    <CBadge 
                    color={
                        application.application_status?.APPLICATION_STATUS_ID === 1 ||
                        application.application_status?.APPLICATION_STATUS_ID === 3 ||
                        application.application_status?.APPLICATION_STATUS_ID === 4
                        ? "success" : "danger"
                    } 
                    className='p-1 px-3 rounded-5 my-2 shadow shadow-sm'>
                        {application.application_status?.STATUS}
                    </CBadge>
                    <CCardTitle>
                        {application.announcement.POSITION_NAME}
                    </CCardTitle>
                    <CCardText>
                        {application.announcement.DEPT_NAME}
                    </CCardText>

                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <CCardText className='my-auto'>
                            Applied on: {formatDate(application.APPLY_DATE)}
                        </CCardText>
                        <div className="d-flex flex-wrap gap-2 my-2">
                            <a href={import.meta.env.VITE_BACKEND_URL+"application-pdf/"+application.APPLICATION_ID} className="btn btn-sm btn-success text-light rounded-pill px-3" download='itsc_application'>
                                Download Form
                            </a>
                            <a href={application.APPLICATION_URL} className="btn btn-sm btn-danger text-light rounded-pill px-3" download='itsc_application'>
                                Download Challan
                            </a>
                            <CButton className='rounded-pill px-3' color="secondary" size='sm'
                            onClick={
                                () => {
                                    navigate('/announcement-detail', {
                                        state: {
                                            announcement: application.announcement
                                        }
                                    }
                                    )
                                }
                            }
                            >
                                View Announcement
                            </CButton>
                        </div>
                    </div>
                </CCardBody>
            </CCard>
        </div>
    )
}

export default ApplicationCard