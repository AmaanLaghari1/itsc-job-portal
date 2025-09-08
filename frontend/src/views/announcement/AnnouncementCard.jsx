import { useSelector } from "react-redux";
import * as API from '../../api/ApplicationRequest.js'
import { useEffect, useRef, useState } from 'react'
import { CButton, CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'
import { cilArrowRight, cilBan } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../helper.js";

const AnnouncementCard = ({announcement}) => {
const auth = useSelector((state) => state.auth.authData);
  const [isEligible, setIsEligible] = useState(false);
  const hasFetched = useRef(false); // <- flag to control single API call
  const [restrictTxt, setRestrictText] = useState('')
  const navigate = useNavigate()

    const checkEligibility = async (formData) => {
        try {
            const response = await API.applicationRequirement(formData);
            // console.log(response);
            setIsEligible(true)
        } catch (error) {
            // console.log(error);
            setRestrictText(error.response?.data.error_message)
            setIsEligible(false);
        }
    };

    useEffect(() => {
        if (hasFetched.current) return;

        const formData = new FormData();
        formData.append('announcement_id', announcement.ANNOUNCEMENT_ID);
        formData.append('user_id', auth.user.USER_ID);

        checkEligibility(formData);
        hasFetched.current = true;
    }, [announcement, auth]);

    const parser = new DOMParser();

    return (
        // const html = parser.parseFromString(announcement.DESCRIPTION, 'text/html');

        <CCard className="shadow shadow-sm my-3" key={announcement.ANNOUNCEMENT_ID}>
            <CCardBody>
                <CCardTitle className='fw-bolder'>
                    {announcement.ANNOUNCEMENT_TITLE??'NA'}
                </CCardTitle>
                <div>
                    <span className="fw-bold">Position: </span>
                    {announcement.POSITION_NAME??'NA'}
                </div>
                <div>
                    <span className="fw-bold">Department: </span>
                    {announcement?.department.DEPT_NAME??'NA'}
                </div>

                <div className="border-bottom border-1 mb-2 border-secondary-subtle"></div>
                {/* <div>
                    Description - 
                    <HtmlRenderer htmlContent={truncateLongTxt(announcement.DESCRIPTION)} />
                    {truncateLongTxt(announcement.DESCRIPTION||'') || 'NA'}
                </div> */}
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <div className="d-flex flex-column">
                        <CCardText className="mb-0 text-muted small">Posted: {formatDate(announcement.START_DATE) || ''}</CCardText>
                        <CCardText className='text-muted small mt-0'>Last date to apply: {formatDate(announcement.END_DATE) || ''}</CCardText>
                    </div>

                    <div className="d-flex justify-content-end">
                        <CButton color="secondary" className='btn-sm rounded-5 shadow shadow-sm mx-1 px-3 mt-3'
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

                        {
                            isEligible &&
                            <CButton color="primary" className='btn-sm rounded-5 shadow shadow-sm px-3 mt-3'
                                onClick={
                                    () => { navigate('/confirm-application', {
                                        state: {
                                        announcement: announcement,
                                    }
                                    })
                                }
                                }
                            >
                                Apply Now <CIcon icon={cilArrowRight} />
                            </CButton>
                        }
                    </div>
                </div>
                    {
                        restrictTxt && 
                        <strong className="fw-bold text-danger">
                            <CIcon icon={cilBan} /> {restrictTxt}
                        </strong>
                    }
            </CCardBody>
        </CCard>
    )
}

export default AnnouncementCard