import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Alert from '../../components/Alert'
import * as API from '../../api/ExperienceRequest.js'
import * as Yup from 'yup'
import ExperienceForm from './ExperienceForm.jsx'
import { normalizeDate } from '../../helper.js'
import { EXPERIENCE_TYPES, normalizeExperienceType } from './ExperienceCategoryTabs.jsx'

const ExperienceAdd = () => {
    const auth = useSelector(state => state.auth.authData)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const [experienceType, setExperienceType] = useState(
        normalizeExperienceType(location.state?.experience_type || searchParams.get('type')),
    )
    const dispatch = useDispatch()

    const initialValues = {
        user_id: auth.user.USER_ID,
        experience_type: experienceType,
        organization_name: '',
        job_description: '',
        job_title: '',
        start_date: '',
        end_date: '',
        is_job_continue: '',
        emp_type: '',
        salary: '',
        reason_for_leaving: '',
        contact_no: '',
        address: '',
        is_additional: experienceType === EXPERIENCE_TYPES.additional ? 1 : 0
    }

    const validationRules = Yup.object({
        organization_name: Yup.string().required('Organization name required'),
        job_title: Yup.string().required('Job title required'),
        // job_description: Yup.string().required('Job description required'),
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
            experience_type: experienceType,
            start_date: normalizeDate(values.start_date),
            end_date: normalizeDate(values.end_date),
        }

        try {
            const response = await API.createExperience(formattedValues)
            // console.log(response)
            dispatch({ type: "EXPERIENCE_COMPLETENESS_SUCCESS", payload: response?.data?.experience_completeness });
            resetForm()
            Alert({status: true, text: response?.data?.message || 'Experience added successfully'})
            navigate(experienceType === EXPERIENCE_TYPES.professional ? '/experience' : `/experience?type=${experienceType}`)
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
        showExperienceTabs={true}
        activeExperienceType={experienceType}
        onExperienceTypeChange={(type) => {
            setExperienceType(type)
            setSearchParams(type === EXPERIENCE_TYPES.professional ? {} : { type })
        }}
        />
    </div>
  )
}

export default ExperienceAdd
