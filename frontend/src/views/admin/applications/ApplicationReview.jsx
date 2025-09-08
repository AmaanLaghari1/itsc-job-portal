import { CButton, CCard, CCardBody, CCardTitle, CCardHeader, CCol, CRow } from "@coreui/react"
import { useLocation, useNavigate } from "react-router-dom"
import { formatDate } from "../../../helper"
import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import { getQualification } from "../../../api/QualificationRequest"
import { getExperience } from "../../../api/ExperienceRequest"

const ApplicationReview = ({ prevData, announcement }) => {
    const [fetching, setFetching] = useState(false)
    const [userDetails, setUserDetails] = useState({})
    const [qualifications, setQualification] = useState([]);
    const [experiences, setExperience] = useState([]);

    const getUserDetail = async (countryId, provinceId = null, districtId = null) => {
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
    }

    async function fetchQualData() {
        setFetching(true)
        const response = await getQualification(prevData.USER_ID);
        // console.log(response.data.data);
        setQualification(response.data.data);
        setFetching(false)
    }

    async function fetchExpData() {
        setFetching(true)
        const response = await getExperience(prevData.USER_ID);
        // console.log(response.data.data);
        setExperience(response.data.data);
        setFetching(false)
    }

    useEffect(() => {
        getUserDetail(
            prevData.COUNTRY_ID,
            prevData.PROVINCE_ID || null,
            prevData.DISTRICT_ID || null,
        );
        fetchQualData()
        fetchExpData()
    }, [])

    const filterRequiredQualifications = (qualifications, requirements) => {
        if (!qualifications || !requirements) return [];
        return qualifications.filter(qualification =>
            requirements.some(req => req.DEGREE_ID === qualification.degree.DEGREE_ID)
        );
    }

    const requiredQualifications = useMemo(() => {
        return filterRequiredQualifications(qualifications, announcement[0]?.qualification_requirements);
    }, [qualifications, announcement[0]?.qualification_requirements]);

    // console.log(announcement)
    // console.log(requiredQualifications)

    return (
        <div>
            <div className="card shadow shadow-sm my-3 w-100 p-0 my-2">
                <CCardHeader className='fw-bolder d-flex align-items-center'>
                    <CCardTitle className="h5 my-2">
                        Basic Information
                    </CCardTitle>

                </CCardHeader>

                <div className="d-flex flex-column gap-2 p-3">
                    <CRow className='mx-2'>
                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                            Name
                        </CCol>
                        <CCol sm={4} className="border-bottom border-1 fw-bold p-2 ">
                            {prevData.FIRST_NAME || ''}
                        </CCol>
                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                            Surname
                        </CCol>
                        <CCol sm={4} className="border-bottom border-1  p-2 fw-bold">
                            {prevData.LAST_NAME || ''}
                        </CCol>
                    </CRow>
                    <CRow className='mx-2'>
                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                            Email
                        </CCol>
                        <CCol sm={4} className="border-bottom border-1 p-2 fw-bold">
                            {prevData.EMAIL || ''}
                        </CCol>
                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                            CNIC No.
                        </CCol>
                        <CCol sm={4} className="border-bottom border-1 p-2 fw-bold">
                            {prevData.CNIC_NO || ''}
                        </CCol>
                    </CRow>
                    <CRow className='mx-2'>
                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                            Father's Name
                        </CCol>
                        <CCol sm={4} className="border-bottom border-1 p-2 fw-bold">
                            {prevData.FNAME || ''}
                        </CCol>
                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                            Mobile No.
                        </CCol>
                        <CCol sm={4} className="border-bottom border-1 p-2 fw-bold">
                            {prevData.MOBILE_NO || ''}
                        </CCol>
                    </CRow>
                    <CRow className='mx-2'>
                        <CCol sm={2} className="border-bottom border-1 p-2">
                            Date of Birth
                        </CCol>
                        <CCol sm={4} className="border-bottom border-1 p-2 fw-bold">
                            {formatDate(prevData.DATE_OF_BIRTH) || ''}
                        </CCol>
                        <CCol sm={2} className="border-bottom border-1 p-2">
                            Place of Birth
                        </CCol>
                        <CCol sm={4} className="border-bottom border-1 p-2 fw-bold">
                            {prevData.PLACE_OF_BIRTH || ''}
                        </CCol>
                    </CRow>
                    <CRow className='mx-2'>
                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                            Gender
                        </CCol>
                        <CCol sm={4} className="border-bottom border-1 p-2 fw-bold">
                            {prevData.GENDER == 'M' ? 'MALE' : prevData.GENDER == 'F' ? 'FEMALE' : ''}
                        </CCol>
                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                            RELIGION
                        </CCol>
                        <CCol sm={4} className="border-bottom border-1 p-2 fw-bold">
                            {prevData.RELIGION || ''}
                        </CCol>
                    </CRow>
                    <CRow className='mx-2'>
                        <CCol sm={2} className="border-bottom border-1 p-2 ">
                            MARITAL STATUS
                        </CCol>
                        <CCol sm={4} className="border-bottom border-1 p-2 fw-bold">
                            {
                                prevData.MARITAL_STATUS == 1 ? 'SINGLE' :
                                    prevData.MARITAL_STATUS == 2 ? 'MARRIED' :
                                        prevData.MARITAL_STATUS == 3 ? 'WIDOWED' : 'DIVORCED'
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
                            {prevData.PERMANENT_ADDRESS || ''}
                        </CCol>
                    </CRow>
                    <CRow className='mx-2'>
                        <CCol sm={2} className="border-bottom border-1 p-2">
                            HOME ADDRESS
                        </CCol>
                        <CCol sm={10} className="border-bottom border-1 p-2 fw-bold">
                            {prevData.HOME_ADDRESS || ''}
                        </CCol>
                    </CRow>
                </div>
            </div>

            <div className="card shadow shadow-sm my-3 w-100 p-0 my-2">
                <CCardHeader className='fw-bolder d-flex align-items-center'>
                    <CCardTitle className="h5 my-2">
                        Qualifications
                    </CCardTitle>
                </CCardHeader>

                {
                    requiredQualifications.map((qualification, index) => (
                        <div key={index}>
                            <CCardHeader className='fw-bolder d-flex align-items-center'>
                                {qualification.degree.DEGREE_TITLE || 'Qualification ' + (index + 1)}

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
                    experiences.map((exp, index) => (
                        <div key={index}>
                            <div className="card w-100 p-0" key={exp.EXPERIANCE_ID}>
                                <CCardHeader className='fw-bolder d-flex'>
                                    {exp.ORGANIZATION_NAME}
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
                                            {exp.SALARY??'-'}
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

        </div>
    )
}

export default ApplicationReview