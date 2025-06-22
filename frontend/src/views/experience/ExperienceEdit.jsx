import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Alert from '../../components/Alert'
import * as API from '../../api/ExperienceRequest.js'
import * as Yup from 'yup'
import ExperienceForm from './ExperienceForm.jsx'

const ExperienceEdit = () => {
    const auth = useSelector(state => state.auth.authData)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { prevExp, return_url, announcement } = location.state || {}
    const dispatch = useDispatch()

    const initialValues = {
        user_id: auth.user.USER_ID || prevExp.USER_ID,
        organization_name: prevExp?.ORGANIZATION_NAME || '',
        job_description: prevExp?.JOB_DESCRIPTION || '',
        start_date: prevExp?.START_DATE || '',
        end_date: prevExp?.END_DATE || '',
        is_job_continue: prevExp?.IS_JOB_CONTINUE || '',
        emp_type: prevExp?.EMP_TYPE.toLowerCase() || '',
        salary: prevExp?.SALARY || '',
        reason_for_leaving: prevExp?.REASON_FOR_LEAVING || '',
        contact_no: prevExp?.CONTACT_NO || '',
        address: prevExp?.ADDRESS || ''
    }

    const validationRules = Yup.object({
        organization_name: Yup.string().required('Organization name required'),
        job_description: Yup.string().required('Job description required'),
        emp_type: Yup.string().required('Employment type required'),
        // contact_no: Yup.string().required('Contact No. required'),
        address: Yup.string().required('Address required'),
        start_date: Yup.date().required('Start date required'),
        end_date: Yup.date().min(
            Yup.ref('start_date'),
            "end date can't be before start date"
        )
    })

    const handleSubmit = async (values, {setSubmitting, resetForm}) => {
        setSubmitting(false)
        setLoading(true)
        const formattedValues = {
            ...values,
            start_date: values.start_date ? new Date(values.start_date).toISOString().split('T')[0] : '',
            end_date: values.end_date ? new Date(values.end_date).toISOString().split('T')[0] : '',
        };

        try {
            const response = await API.updateExperience(formattedValues, prevExp.EXPERIANCE_ID)
            dispatch({ type: "EXPERIENCE_COMPLETENESS_SUCCESS", payload: response?.data?.experience_completeness });
            Alert({status: true, text: response?.data?.message || 'Experience updated successfully'})
            if(return_url){
                navigate(return_url, {
                    state: {
                        announcement: announcement
                    }
                })
                return
            }
            navigate('/experience')
        }
        catch (error) {
            Alert({status: false, text: error.response?.data?.error_message || 'Some error occured'})
        }
        setLoading(false)
    }


  return (
    <div>
        <ExperienceForm 
        initialValues={initialValues}
        validationRules={validationRules}
        handleSubmit={handleSubmit} 
        loading={loading}
        />
    </div>
  )
}

export default ExperienceEdit