import React, { useEffect } from 'react'
import { CCardHeader, CCol, CRow } from '@coreui/react'
import { getQualification } from '../../api/QualificationRequest';
import { useSelector } from 'react-redux';

const QualificationCard = ({qualification}) => {
  const auth = useSelector((state) => state.auth.authData);

  return (
    qualification.length > 0 ? qualification.map((qual) => (
      <div className="card w-100 p-0 my-2" key={qual.QUALIFICATION_ID}>
        <CCardHeader className='fw-bolder'>
          MATRIC
        </CCardHeader>

        <div className="d-flex flex-column gap-2 p-3">
          <CRow className=''>
            <CCol sm={3} className="fw-bold">
              {qual.institute.IS_INST === 'Y' ? 'University' : 'Board'}
            </CCol>
            <CCol sm={9}>
              {qual.institute.INSTITUTE_NAME}
            </CCol>
          </CRow>

          <CRow className='border-top'>
            <CCol sm={3} className="fw-bold">Discipline</CCol>
            <CCol sm={9}>{qual.discipline.DISCIPLINE_NAME}</CCol>
          </CRow>

          <CRow className='border-top'>
            <CCol sm={3} className="fw-bold">Major Subject</CCol>
            <CCol sm={9}>{qual.MAJOR || '-'}</CCol>
          </CRow>

          <CRow className='border-top'>
            <CCol sm={3} className="fw-bold">Roll No.</CCol>
            <CCol sm={3}>{qual.ROLL_NO || '-'}</CCol>
            <CCol sm={3} className="fw-bold">Grade</CCol>
            <CCol sm={3}>{qual.GRADE || qual.CGPA || '-'}</CCol>
          </CRow>

          <CRow className='border-top'>
            <CCol sm={3} className="fw-bold">Start Date</CCol>
            <CCol sm={3}>{qual.START_DATE || '-'}</CCol>
            <CCol sm={3} className="fw-bold">End Date</CCol>
            <CCol sm={3}>{qual.END_DATE || '-'}</CCol>
          </CRow>

          <CRow className='border-top'>
            <CCol sm={3} className="fw-bold">Obtained Marks</CCol>
            <CCol sm={3}>{qual.OBTAINED_MARKS || '-'}</CCol>
            <CCol sm={3} className="fw-bold">Total Marks</CCol>
            <CCol sm={3}>{qual.TOTAL_MARKS || '-'}</CCol>
          </CRow>

          <CRow className='border-top'>
            <CCol sm={3} className="fw-bold">Passing Year</CCol>
            <CCol sm={3}>{qual.PASSING_YEAR || '-'}</CCol>
            <CCol sm={3} className="fw-bold">Result Declaration Date</CCol>
            <CCol sm={3}>{qual.RESULT_DATE || '-'}</CCol>
          </CRow>
        </div>


      </div>
    )) :
    <p className="text-center my-5">Nothing to Show!</p>
  )
}

export default QualificationCard