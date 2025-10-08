import { CButton, CCard, CCardBody, CCardTitle, CCardHeader, CCol, CRow, CSpinner } from "@coreui/react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import * as API from '../../api/ApplicationRequest.js'
import Alert from "../../components/Alert.js"
import { useSelector } from "react-redux"
import { cilPen } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import axios from "axios";
import { useEffect, useMemo, useState } from "react"
import { getQualification } from '../../api/QualificationRequest.js'
import { getExperience } from "../../api/ExperienceRequest.js"
import { formatDate } from "../../helper.js"

const ApplicationConfirm = () => {
    const location = useLocation()
    const { announcement } = location.state || {}
    const navigate = useNavigate()
    const auth = useSelector((state) => state.auth.authData)

    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)

    const [qualifications, setQualification] = useState([]);
    const [experiences, setExperience] = useState([]);

    useEffect(() => {
        if (!announcement) {
            // If no announcement data is passed, redirect to announcements page
            navigate('/announcements');
        }
    }, [])

    // Fetch data from API
    async function fetchQualData() {
        setFetching(true)
        const response = await getQualification(auth.user.USER_ID);
        // console.log(response.data.data);
        setQualification(response.data.data);
        setFetching(false)
    }

    useEffect(() => {
        fetchQualData()
    }, [])

    // Fetch data from API
    async function fetchExpData() {
        setFetching(true)
        const response = await getExperience(auth.user.USER_ID);
        // console.log(response.data.data);
        setExperience(response.data.data);
        setFetching(false)
    }

    useEffect(() => {
        fetchExpData()
    }, [])

    const [userDetails, setUserDetails] = useState({})
    const handleApply = async () => {
        setLoading(true)
        // Logic to handle application confirmation
        // For example, submitting the application data to the server
        const payload = {
            announcement_id: announcement.ANNOUNCEMENT_ID,
            user_id: auth.user.USER_ID,
            profile_image: auth.user.PROFILE_IMAGE,
            apply_date: new Date().toISOString().split('T')[0], // Format date as YYYY-MM-DD
            first_name: auth.user.FIRST_NAME,
            last_name: auth.user.LAST_NAME,
            fname: auth.user.FNAME,
            cnic_no: auth.user.CNIC_NO,
            mobile_no: auth.user.MOBILE_NO,
            email: auth.user.EMAIL,
            gender: auth.user.GENDER,
            marital_status: auth.user.MARITAL_STATUS,
            religion: auth.user.RELIGION,
            date_of_birth: new Date(auth.user.DATE_OF_BIRTH),
            place_of_birth: auth.user.PLACE_OF_BIRTH,
            home_address: auth.user.HOME_ADDRESS,
            permanent_address: auth.user.PERMANENT_ADDRESS,
            country_id: auth.user.COUNTRY_ID,
            province_id: auth.user.PROVINCE_ID,
            district_id: auth.user.DISTRICT_ID,
        };
        const formData = new FormData();
        formData.append('payload', JSON.stringify(payload));
        formData.append('application_qualification', JSON.stringify(filteredQualifications));
        formData.append('application_experience', JSON.stringify(experiences));

        try {
            const response = await API.createApplication(formData)
            if (response.status === 200) {
                console.log(response)
                navigate('/dashboard')
                if (response.data?.redirect_url) {
                    window.location.href = response.data.redirect_url
                }
                else {
                    Alert({
                        status: true,
                        text: 'Application submitted successfully'
                    })
                }
            }
        } catch (error) {
            console.error(error);
            Alert({
                status: false,
                text: error.response?.data?.error_message || "Error submitting application"
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        const getUserDetail = async (countryId, provinceId = null, districtId = null) => {
            setFetching(true)
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + 'user/get-user-detail/' + countryId + '/' + provinceId + '/' + districtId);
                // console.log(response);
                setUserDetails(prevDetails => ({
                    ...prevDetails,
                    country: response.data?.data?.country[0]?.COUNTRY_NAME || '',
                    province: response.data?.data?.province[0]?.PROVINCE_NAME || '',
                    district: response.data?.data?.district[0]?.DISTRICT_NAME || '',
                    // city: response.data?.data?.city[0]?.CITY_NAME || '',
                }));
            } catch (error) {
                console.error("Error fetching user details:", error);
                return;
            }
            setFetching(false)
        }
        getUserDetail(
            auth.user.COUNTRY_ID,
            auth.user.DOMICILE_PROVINCE || null,
            auth.user.DISTRICT_ID || null,
        );
    }, [])


    const filterQualifications = (qualifications, requirements) => {
        if (!qualifications || !requirements) return [];
        return qualifications.filter(qualification =>
            requirements.some(req => req.DEGREE_ID === qualification.degree.DEGREE_ID)
        );
    }
    const filteredQualifications = useMemo(() => {
        return filterQualifications(qualifications, announcement?.qualification_requirements);
    }, [qualifications, announcement?.qualification_requirements]);

    // console.log(filterQualifications);

    return (
        <div>

            <CCard className="shadow shadow-lg my-5 border-0">
                <div className="text-center">
                    <h1 className="display-4">Review Application</h1>
                </div>
                <CCardBody>
                    <p>
                        Please review your application details before submitting.
                        Ensure all information is correct and complete to avoid any issues with your application. <br />
                        You will not be able to edit your application after submission.
                        <span className=""> If you have any questions, please contact us at <a href="mailto:careers@usindh.edu.pk" className="text-decoration-none">careers@usindh.edu.pk</a>.</span>
                        <br />
                        <br />
                    </p>
                    {
                        fetching ? <CSpinner className='align-slef-start my-3' color='primary' /> :
                            <div className="card shadow shadow-sm my-3 w-100 p-0 my-2">
                                <CCardHeader className='fw-bolder d-flex align-items-center'>
                                    <CCardTitle className="h5 my-2">
                                        Basic Information
                                    </CCardTitle>
                                    <div className="ms-auto">
                                        <CButton variant='success' color='success' className='btn btn-outline-success btn-sm mx-1'
                                            onClick={() => navigate('/user-profile', {
                                                state: {
                                                    return_url: '/confirm-application',
                                                    announcement: announcement
                                                }
                                            })}
                                        >
                                            <CIcon icon={cilPen} size="md" />
                                        </CButton>
                                    </div>
                                </CCardHeader>

                                <div className="d-flex flex-column gap-2 p-3">
                                    <CRow className='mx-2'>
                                        <CCol sm={12}>
                                            <CRow>
                                                <CCol md={3}>
                                                    <img
                                                        src={import.meta.env.VITE_ASSET_URL + auth.user.PROFILE_IMAGE}
                                                        alt="User Image"
                                                        className="img-thumbnail"
                                                        style={{
                                                            width: "16rem",
                                                            height: "16rem"
                                                        }}
                                                    />
                                                </CCol>
                                                <CCol md={9}>
                                                    <CRow>
                                                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                                                            Name
                                                        </CCol>
                                                        <CCol sm={10} className="border-bottom border-1 fw-bold p-2 ">
                                                            {auth.user.FIRST_NAME || ''}
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                                                            Surname
                                                        </CCol>
                                                        <CCol sm={10} className="border-bottom border-1 fw-bold p-2 ">
                                                            {auth.user.LAST_NAME || ''}
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                                                            Email
                                                        </CCol>
                                                        <CCol sm={10} className="border-bottom border-1 fw-bold p-2 ">
                                                            {auth.user.EMAIL || ''}
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                                                            CNIC No.
                                                        </CCol>
                                                        <CCol sm={10} className="border-bottom border-1 fw-bold p-2 ">
                                                            {auth.user.CNIC_NO || ''}
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                                                           Father's Name
                                                        </CCol>
                                                        <CCol sm={10} className="border-bottom border-1 fw-bold p-2 ">
                                                            {auth.user.FNAME || ''}
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                                                            Mobile No.
                                                        </CCol>
                                                        <CCol sm={10} className="border-bottom border-1 fw-bold p-2 ">
                                                            {auth.user.MOBILE_NO || ''}
                                                        </CCol>
                                                    </CRow>

                                                </CCol>
                                            </CRow>
                                        </CCol>
                                    </CRow>
                                    <CRow className='mx-2'>
                                        <CCol sm={2} className="border-bottom border-1 p-2">
                                            Date of Birth
                                        </CCol>
                                        <CCol sm={4} className="border-bottom border-1 p-2 fw-bold">
                                            {formatDate(auth.user.DATE_OF_BIRTH) || ''}
                                        </CCol>
                                        <CCol sm={2} className="border-bottom border-1 p-2">
                                            Place of Birth
                                        </CCol>
                                        <CCol sm={4} className="border-bottom border-1 p-2 fw-bold">
                                            {auth.user.PLACE_OF_BIRTH || ''}
                                        </CCol>
                                    </CRow>
                                    <CRow className='mx-2'>
                                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                                            Gender
                                        </CCol>
                                        <CCol sm={4} className="border-bottom border-1 p-2 fw-bold">
                                            {auth.user.GENDER == 'M' ? 'MALE' : auth.user.GENDER == 'F' ? 'FEMALE' : ''}
                                        </CCol>
                                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                                            RELIGION
                                        </CCol>
                                        <CCol sm={4} className="border-bottom border-1 p-2 fw-bold">
                                            {auth.user.RELIGION || ''}
                                        </CCol>
                                    </CRow>
                                    <CRow className='mx-2'>
                                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                                            MARITAL STATUS
                                        </CCol>
                                        <CCol sm={4} className="border-bottom border-1 p-2 fw-bold">
                                            {
                                                auth.user.MARITAL_STATUS == 1 ? 'SINGLE' :
                                                    auth.user.MARITAL_STATUS == 2 ? 'MARRIED' :
                                                        auth.user.MARITAL_STATUS == 3 ? 'WIDOWED' : 'DIVORCED'
                                            }
                                        </CCol>
                                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                                            COUNTRY
                                        </CCol>
                                        <CCol sm={4} className="border-bottom border-1 p-2 fw-bold">
                                            {userDetails.country || ''}
                                        </CCol>
                                    </CRow>
                                    <CRow className='mx-2'>
                                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                                            DOMICILE PROVINCE
                                        </CCol>
                                        <CCol sm={4} className="border-bottom border-1 p-2 fw-bold">
                                            {userDetails.province || ''}
                                        </CCol>
                                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                                            DOMICILE DISTRICT
                                        </CCol>
                                        <CCol sm={4} className="border-bottom border-1 p-2 fw-bold">
                                            {userDetails.district || ''}
                                        </CCol>
                                    </CRow>
                                    <CRow className='mx-2'>
                                        <CCol sm={2} className="border-bottom border-1 p-2">
                                            PERMANENT ADDRESS
                                        </CCol>
                                        <CCol sm={10} className="border-bottom border-1 p-2 fw-bold">
                                            {auth.user.PERMANENT_ADDRESS || ''}
                                        </CCol>
                                    </CRow>
                                    <CRow className='mx-2'>
                                        <CCol sm={2} className="border-bottom border-1 p-2">
                                            HOME ADDRESS
                                        </CCol>
                                        <CCol sm={10} className="border-bottom border-1 p-2 fw-bold">
                                            {auth.user.HOME_ADDRESS || ''}
                                        </CCol>
                                    </CRow>
                                </div>
                            </div>
                    }

                    <div className="card shadow shadow-sm my-3 w-100 p-0 my-2">
                        <CCardHeader className='fw-bolder d-flex align-items-center'>
                            <CCardTitle className="h5 my-2">
                                Qualifications
                            </CCardTitle>
                        </CCardHeader>

                        {
                            fetching ? <CSpinner className='align-slef-start my-3' color='primary' /> :
                                filteredQualifications.map((qualification, index) => (
                                    <div key={index}>
                                        <CCardHeader className='fw-bolder d-flex align-items-center'>
                                            {qualification.degree.DEGREE_TITLE || 'Qualification ' + (index + 1)}
                                            <div className="ms-auto">
                                                <CButton variant='success' color='success' className='btn btn-outline-success btn-sm mx-1'
                                                    onClick={() => navigate('/qualification-edit', {
                                                        state: {
                                                            prevQual: qualification,
                                                            return_url: '/confirm-application',
                                                            announcement: announcement
                                                        }
                                                    })
                                                    }
                                                >
                                                    <CIcon icon={cilPen} size="md" />
                                                </CButton>
                                            </div>
                                        </CCardHeader>

                                        <div className="d-flex flex-column gap-2 p-3">
                                            <CRow className=''>
                                                <CCol sm={3}>
                                                    Board/University Name
                                                </CCol>
                                                <CCol sm={9} className="fw-bold">
                                                    {qualification.organization.INSTITUTE_NAME}
                                                </CCol>
                                            </CRow>

                                            <CRow className='border-top'>
                                                <CCol sm={3}>Discipline</CCol>
                                                <CCol sm={9} className="fw-bold">{qualification.discipline.DISCIPLINE_NAME}</CCol>
                                            </CRow>

                                            <CRow className='border-top'>
                                                <CCol sm={3}>Major Subject</CCol>
                                                <CCol sm={9} className="fw-bold">{qualification.MAJOR || '-'}</CCol>
                                            </CRow>

                                            <CRow className='border-top'>
                                                <CCol sm={3}>Roll No.</CCol>
                                                <CCol sm={3} className="fw-bold">{qualification.ROLL_NO || '-'}</CCol>
                                                <CCol sm={3}>
                                                    {qualification.GRADING_AS == 'G' ? 'Grade' : 'CGPA'}
                                                </CCol>
                                                <CCol sm={3} className="fw-bold">{qualification.GRADE || qualification.CGPA || '-'}</CCol>
                                            </CRow>

                                            <CRow className='border-top'>
                                                <CCol sm={3}>Obtained Marks</CCol>
                                                <CCol sm={3} className="fw-bold">{qualification.OBTAINED_MARKS || '-'}</CCol>
                                                <CCol sm={3}>Total Marks</CCol>
                                                <CCol sm={3} className="fw-bold">{qualification.TOTAL_MARKS || '-'}</CCol>
                                            </CRow>

                                            <CRow className='border-top'>
                                                <CCol sm={3}>Passing Year</CCol>
                                                <CCol sm={3} className="fw-bold">{qualification.PASSING_YEAR || '-'}</CCol>
                                                <CCol sm={3}>Result Declaration Date</CCol>
                                                <CCol sm={3} className="fw-bold">{formatDate(qualification.RESULT_DATE) || '-'}</CCol>
                                            </CRow>
                                        </div>

                                    </div>
                                )
                                )
                        }
                    </div>

                    {
                        experiences.length > 0 &&

                        <div className="card shadow shadow-sm my-3 w-100 p-0 my-2">
                            <CCardHeader className='fw-bolder d-flex align-items-center'>
                                <CCardTitle className="h5 my-2">
                                    Experience
                                </CCardTitle>
                            </CCardHeader>
                            {
                                fetching ? <CSpinner className='align-slef-start my-3' color='primary' /> :
                                    experiences.map((exp, index) => (
                                        <div key={index}>
                                            <div className="card w-100 p-0" key={exp.EXPERIANCE_ID}>
                                                <CCardHeader className='fw-bolder d-flex'>
                                                    {exp.ORGANIZATION_NAME}
                                                    <div className="ms-auto">
                                                        <CButton variant='success' color='success' className='btn btn-outline-success btn-sm mx-1'
                                                            onClick={() => {
                                                                navigate('/experience-edit', {
                                                                    state: {
                                                                        prevExp: exp,
                                                                        return_url: '/confirm-application',
                                                                        announcement: announcement
                                                                    }
                                                                })
                                                            }
                                                            }
                                                        >
                                                            <CIcon icon={cilPen} size="md" />
                                                        </CButton>
                                                    </div>
                                                </CCardHeader>

                                                <div className="d-flex flex-column gap-2 p-3 small">
                                                    <CRow className=''>
                                                        <CCol sm={3} className="">
                                                            Employment Type
                                                        </CCol>
                                                        <CCol sm={9} className="fw-bold">
                                                            {exp.EMP_TYPE}
                                                        </CCol>
                                                    </CRow>
                                                    <CRow className='border-top'>
                                                        <CCol sm={3} className="">
                                                            Job Description
                                                        </CCol>
                                                        <CCol sm={9} className="fw-bold">
                                                            {exp.JOB_DESCRIPTION}
                                                        </CCol>
                                                    </CRow>
                                                    <CRow className='border-top'>
                                                        <CCol sm={3} className="">
                                                            Salary
                                                        </CCol>
                                                        <CCol sm={9} className="fw-bold">
                                                            {exp.SALARY ?? '-'}
                                                        </CCol>
                                                    </CRow>
                                                    <CRow className='border-top'>
                                                        <CCol sm={3} className="">
                                                            Employer Contact No.
                                                        </CCol>
                                                        <CCol sm={9} className="fw-bold">
                                                            {exp.CONTACT_NO}
                                                        </CCol>
                                                    </CRow>

                                                    <CRow className='border-top'>
                                                        <CCol sm={3} className="">Start Date</CCol>
                                                        <CCol sm={3} className='fw-bold'>{formatDate(exp.START_DATE) || '-'}</CCol>
                                                        <CCol sm={3} className="">End Date</CCol>
                                                        <CCol sm={3} className='fw-bold'>{exp.IS_JOB_CONTINUE === 'Y' ? 'Currently Working' : formatDate(exp.END_DATE) || '-'}</CCol>
                                                    </CRow>

                                                    {
                                                        exp.IS_JOB_CONTINUE !== 'Y' &&
                                                        <CRow className='border-top'>
                                                            <CCol sm={3} className="">Reason for leaving</CCol>

                                                            <CCol sm={9} className="fw-bold">
                                                                {exp.REASON_FOR_LEAVING || '-'}
                                                            </CCol>
                                                        </CRow>
                                                    }
                                                    <CRow className='border-top'>
                                                        <CCol sm={3} className="">Address</CCol>

                                                        <CCol sm={9} className="fw-bold">
                                                            {exp.ADDRESS || '-'}
                                                        </CCol>
                                                    </CRow>

                                                </div>


                                            </div>
                                        </div>
                                    ))
                            }
                        </div>
                    }

                    <div className="rounded-0">
                        <p className="fw-bold">
                            <strong>Note:</strong> Once you clicked on apply button, it will be considered final.
                        </p>
                    </div>
                </CCardBody>

                <div className="d-flex align-items-center justify-content-center gap-2 my-2">
                    <CButton color="primary" className="rounded-2 p-2 fs-5 shadow shadow-sm px-3 mt-3"
                        onClick={() => {
                            handleApply();
                        }
                        }
                        disabled={loading}
                    >
                        {
                            loading ? 'Applying...' : 'Apply Now'
                        }
                    </CButton>
                    <Link to="/announcements">
                        <CButton color="danger" className="rounded-2 p-2 fs-5 shadow shadow-sm px-3 mt-3">
                            Cancel
                        </CButton>
                    </Link>

                    {/* <h2 className="display-6">Thank you for your interest in joining our team!</h2>
                <p className="lead">We appreciate your application and will review it shortly.</p> */}
                </div>
            </CCard>
        </div>
    )
}

export default ApplicationConfirm