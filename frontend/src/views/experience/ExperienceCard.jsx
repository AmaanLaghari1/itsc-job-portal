import React from 'react'
import { CButton, CCardHeader, CCol, CRow } from '@coreui/react'
import { useSelector } from 'react-redux';
import { cilTrash, cilPen } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useNavigate } from 'react-router-dom';
import * as API from '../../api/ExperienceRequest.js'

const ExperienceCard = ({experience, onDelete}) => {
  const auth = useSelector((state) => state.auth.authData);
  const navigate = useNavigate()

  return (
    experience.length > 0 ? experience.map((exp) => (
      <div className="card w-100 p-0 my-2" key={exp.EXPERIANCE_ID}>
        <CCardHeader className='fw-bolder d-flex'>
          {exp.ORGANIZATION_NAME} 
          <div className="ms-auto">
            <CButton variant='success' color='success' className='btn btn-success btn-sm mx-1'
            onClick={() => {
                navigate('/experience-edit', {
                  state: {
                    prevExp: exp,
                  }
                })
              }
            }
            >
              <CIcon icon={cilPen} size="md" />
            </CButton>
            <CButton variant='danger' color='danger' className='btn btn-danger btn-sm mx-1'
            onClick={async () => {
                const confirmDelete = window.confirm('Are you sure you want to delete this experience?');
                if (confirmDelete) {
                  // Call the delete API here
                  const response = await API.deleteExperience(exp.EXPERIANCE_ID)
                  onDelete(exp.EXPERIANCE_ID)
                  console.log('Experience deleted:', response);
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
              Employment Type
            </CCol>
            <CCol sm={9}>
              {exp.EMP_TYPE}
            </CCol>
          </CRow>
          <CRow className='border-top'>
            <CCol sm={3} className="fw-bold">
              Employer Contact No.
            </CCol>
            <CCol sm={9}>
              {exp.CONTACT_NO}
            </CCol>
          </CRow>

          <CRow className='border-top'>
            <CCol sm={3} className="fw-bold">Start Date</CCol>
            <CCol sm={3}>{exp.START_DATE || '-'}</CCol>
            <CCol sm={3} className="fw-bold">End Date</CCol>
            <CCol sm={3}>{exp.END_DATE || '-'}</CCol>
          </CRow>

        </div>


      </div>
    )) :
    <p className="text-center my-5">Nothing to Show!</p>
  )
}

export default ExperienceCard