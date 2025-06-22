import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Alert from '../../components/Alert'
import * as API from '../../api/ExperienceRequest.js'
import * as Yup from 'yup'
import ExperienceForm from './ExperienceForm.jsx'

const ExperienceAdd = () => {
    const auth = useSelector(state => state.auth.authData)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const initialValues = {
        user_id: auth.user.USER_ID,
        organization_name: '',
        job_description: '',
        start_date: '',
        end_date: '',
        is_job_continue: '',
        emp_type: '',
        salary: '',
        reason_for_leaving: '',
        contact_no: '',
        address: ''
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
            const response = await API.createExperience(formattedValues)
            // console.log(response)
            dispatch({ type: "EXPERIENCE_COMPLETENESS_SUCCESS", payload: response?.data?.experience_completeness });
            Alert({status: true, text: response?.data?.message || 'Experience added successfully'})
            navigate('/experience')
        }
        catch (error) {
            Alert({status: false, text: error.response?.data?.error_message || 'Some error occured'})
            console.log(error)
        }
        setLoading(false)
    }


  return (
    <div>
        <small className='d-block fst-italic my-2'><span className="fw-bold fst-italic">Note:</span> Please add your recent experience first.</small>
        <ExperienceForm 
        initialValues={initialValues}
        validationRules={validationRules}
        handleSubmit={handleSubmit} 
        loading={loading}
        />
    </div>
  )
}

export default ExperienceAdd