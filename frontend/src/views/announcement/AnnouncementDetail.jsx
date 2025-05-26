import { CButton, CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowRight } from '@coreui/icons'
import * as API from '../../api/ApplicationRequest.js'
import { useLocation, useNavigate } from 'react-router-dom'
import AlertConfirm from '../../components/AlertConfirm.js'
import Alert from '../../components/Alert.js'
import { useSelector } from 'react-redux'
import HtmlRenderer from '../../components/HTMLRenderer.jsx'

const AnnouncementDetail = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {announcement} = location.state || {}
    const auth = useSelector((state) => state.auth.authData)

    const handleApply = async (announcement) => {
        const confirmed = await AlertConfirm({
            title: 'Apply for this announcement?',
            text: 'Please review your application details carefully before applying.',
            confirmBtnText: 'Apply',
            cancelBtnText: 'Cancel',
        });

        if (confirmed) {
            const formData = new FormData();
            formData.append('announcement_id', announcement.ANNOUNCEMENT_ID);
            formData.append('user_id', auth.user.USER_ID);
            formData.append('apply_date', new Date().toISOString().split('T')[0]);
            try {
                const response = await API.createApplication(formData)
                if (response.status == 200) {
                    Alert({
                        status: true,
                        text: 'Application submitted successfully'
                    })
                }
            } catch (error) {
                console.log(error);
                Alert({
                    status: false,
                    text: error.response?.data?.error_message || "Error submitting application"
                })
            }
        }
    }

    return (
        <div>
            <CCard className="shadow shadow-lg my-5 border-0">
                <CCardBody>
                    {/* <CBadge color="success" className='p-1 px-3 rounded-5 my-2 mb-3 shadow shadow-sm'>Active</CBadge> */}
                    <CCardTitle className='h2 my-3'>Job Title - {announcement.POSITION_NAME}</CCardTitle>
                    <CCardText className='h5'>Department - {announcement.DEPT_NAME}</CCardText>

                    <div className="border-bottom border-1 mb-2 border-secondary-subtle"></div>
                    <div className='lead'>
                        {/* {announcement.DESCRIPTION} */}
                        <HtmlRenderer htmlContent={announcement.DESCRIPTION || ''} />
                    </div>
                    <div className="d-flex flex-column">
                        <CCardText>Posted - {announcement.START_DATE}</CCardText>
                        <CCardText className='text-danger'>Last date to apply - {announcement.END_DATE}</CCardText>
                    </div>

                    <div className="text-center my-3">
                        <CButton color="primary" className='rounded-5 fs-5 shadow shadow-sm px-3 mt-3'
                        onClick={
                            () => {
                                handleApply(announcement)
                            }
                        }
                        >
                            Apply Now 
                        </CButton>
                    </div>
                </CCardBody>
            </CCard>
        </div>
    )
}

export default AnnouncementDetail