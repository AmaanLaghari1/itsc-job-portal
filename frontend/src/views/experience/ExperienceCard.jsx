import { CButton, CCardHeader, CCol, CRow } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { cilTrash, cilPen } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useNavigate } from 'react-router-dom';
import * as API from '../../api/ExperienceRequest.js'
import AlertConfirm from '../../components/AlertConfirm.js';
import Alert from '../../components/Alert.js';
import { formatDate } from '../../helper.js';

const ExperienceCard = ({experience, onDelete}) => {
  const auth = useSelector((state) => state.auth.authData);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    experience.length > 0 ? experience.map((exp) => (
      <div className="card w-100 p-0 my-2" key={exp.EXPERIANCE_ID}>
        <CCardHeader className='fw-bolder d-flex'>
          {exp.ORGANIZATION_NAME} 
          <div className="ms-auto">
            <CButton variant='success' color='success' className='btn btn-outline-success btn-sm mx-1'
            onClick={() => {
                navigate('/experience-edit', {
                  state: {
                    prevExp: exp
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
                    const response = await API.deleteExperience(exp.EXPERIANCE_ID)
                    onDelete(exp.EXPERIANCE_ID)
                    dispatch({ type: "EXPERIENCE_COMPLETENESS_SUCCESS", payload: response?.data?.experience_completeness });
                    Alert({status: true, text: response?.data?.message || 'Experience deleted successfully'})
              }
            }
          }
            >
              <CIcon icon={cilTrash} size="md" />
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
              {exp.SALARY}
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

            <CCol sm={9}>
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
    )) :
    <p className="text-center my-5">Nothing to Show!</p>
  )
}

export default ExperienceCard