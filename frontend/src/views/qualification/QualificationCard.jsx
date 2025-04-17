import React from 'react'
import { CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import { useSelector } from 'react-redux';
import CIcon from '@coreui/icons-react';
import { cilPen, cilTrash } from '@coreui/icons';
import AlertConfirm from '../../components/AlertConfirm.js';
import { useNavigate } from 'react-router-dom';

const QualificationCard = ({qualification}) => {
  const auth = useSelector((state) => state.auth.authData);
  const navigate = useNavigate()

  return (
    qualification.length > 0 ? qualification.map((qual) => (
      <div className="card w-100 p-0 my-2" key={qual.QUALIFICATION_ID}>
        <CCardHeader className='fw-bolder d-flex'>
          {qual.degree.DEGREE_TITLE}
          <div className="ms-auto">
          <CButton variant='success' color='success' className='btn btn-outline-success btn-sm mx-1'
            onClick={() => {
                navigate('/qualification-edit', {
                  state: {
                    prevQual: qual,
                  }
                })
              }
            }
            >
              <CIcon icon={cilPen} size="md" />
            </CButton>
            <CButton variant='danger' color='danger' className='btn btn-outline-danger btn-sm mx-1'
            onClick={async () => {
                const confirmed = await AlertConfirm({
                  title: 'Delete item?',
                  text: 'This action cannot be undone.',
                });
                
                if (confirmed) {
                    const response = await API.deleteExperience(qual.QUALIFICATION_ID)
                    onDelete(qual.QUALIFICATION_ID)
                    Alert({status: true, text: response?.data?.message || 'Experience deleted successfully'})
              }
            }
          }
            >
              <CIcon icon={cilTrash} size="md" />
            </CButton>
          </div>
        </CCardHeader>

        <div className="d-flex flex-column gap-2 p-3">
          <CRow className=''>
            <CCol sm={3} className="fw-bold">
              Board/University Name
            </CCol>
            <CCol sm={9}>
              {qual.organization.INSTITUTE_NAME}
            </CCol>
          </CRow>
          <CRow className='border-top'>
            <CCol sm={3} className="fw-bold">
              Institute Name
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