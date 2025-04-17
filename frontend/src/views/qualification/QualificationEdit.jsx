import * as API from '../../api/QualificationRequest.js'
import Alert from '../../components/Alert'
import { useSelector } from 'react-redux'
import QualificationForm from './QualificationForm.jsx'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const QualificationEdit = () => {
    const auth = useSelector(state => state.auth.authData)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const {prevQaul} = location.state || {}
    console.log(prevQaul);


    const handleSubmit = async (values, {setSubmitting, resetForm}) => {
        setSubmitting(false)
        setLoading(true)
        const formattedValues = {
            ...values,
            start_date: values.start_date ? new Date(values.start_date).toISOString().split('T')[0] : '',
            end_date: values.end_date ? new Date(values.end_date).toISOString().split('T')[0] : '',
            result_date: values.result_date??values.end_date ? new Date(values.result_date).toISOString().split('T')[0] : '',
        };

        try {
            const response = await API.createQualification(formattedValues)
            Alert({status: true, text: response?.data?.message || 'Qualification added successfully'})
            navigate('/qualifications')
        }
        catch (error) {
            Alert({status: false, text: error.response?.data?.error_message || 'Some error occured'})
            console.log(error)
        }
        setLoading(false)
    }

        const initialValues = {
            user_id: auth.user.USER_ID,
            degree_program: prevQaul?.DEGREE_PROGRAM || '',
            organization_id: prevQaul?.ORGANIZATION_id || '',
            organization_id: '',
            institute_id: '',
            discipline_id: '',
            start_date: prevQaul?.START_DATE || '',
            end_date: '',
            obtained_marks: '',
            total_marks: '',
            major: '',
            passing_year: '',
            roll_no: '',
            is_result_declare: '',
            grading_as: '',
            result_date: '',
            grade: '',
            cgpa: '',
            out_of: '',
        }
    
        const validationRules = Yup.object({
            institute_id: Yup.string().required('Institute required'),
            discipline_id: Yup.string().required('Discipline required'),
            organization_id: Yup.string().required('Organization required'),
            start_date: Yup.string().required('Start date required'),
            end_date: Yup.string().required('End date required'),
            obtained_marks: Yup.string().required('Obtained marks required'),
            total_marks: Yup.string().required('Obtained marks required'),
            roll_no: Yup.string().required('Roll No./Seat No. required'),
        })
    
    
  return (
    <div>
        <QualificationForm 
        initialValues={initialValues}
        validationRules={validationRules}
        handleSubmit={handleSubmit} 
        loading={loading} 
        />
    </div>
  )
}

export default QualificationEdit