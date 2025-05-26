import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilArrowRight, cilChartPie } from '@coreui/icons'
import { CBadge, CButton, CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'
import { useNavigate } from 'react-router-dom'


export const ApplicationCard = ({application}) => {
    const navigate = useNavigate()

    return (
        <div className='w-100 my-3'>
            <CCard className="shadow shadow-sm">
                <CCardBody>
                    <CBadge color="success" className='p-1 px-3 rounded-5 my-2 shadow shadow-sm'>Applied</CBadge>
                    <CCardTitle>
                        {application.announcement.POSITION_NAME}
                    </CCardTitle>
                    <CCardText>
                        Applied on - {application.APPLY_DATE}
                    </CCardText>

                    <div className="d-flex justify-content-end">
                        <CButton className='rounded-pill px-3' color="secondary"
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
                </CCardBody>
            </CCard>
        </div>
    )
}

export default ApplicationCard