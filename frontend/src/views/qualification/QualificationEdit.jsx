import * as API from '../../api/QualificationRequest.js'
import Alert from '../../components/Alert'
import { useDispatch, useSelector } from 'react-redux'
import QualificationForm from './QualificationForm.jsx'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const QualificationEdit = () => {
    const auth = useSelector(state => state.auth.authData)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const {prevQual} = location.state || {}
    const dispatch = useDispatch()

    const handleSubmit = async (values, {setSubmitting, resetForm}) => {
        setSubmitting(false)
        setLoading(true)
        const formattedValues = {
            ...values,
            // start_date: values.start_date ? new Date(values.start_date).toISOString().split('T')[0] : '',
            // end_date: values.end_date ? new Date(values.end_date).toISOString().split('T')[0] : '',
            result_date: values.result_date ? new Date(values.result_date).toISOString().split('T')[0] : '',
            institute_id: values.organization_id || 0,
            cgpa: values.cgpa == '' ? 0 : values.cgpa,
            out_of: values.out_of == '' ? 0 : values.out_of
        };

        try {
            const response = await API.updateQualification(formattedValues, prevQual.QUALIFICATION_ID)
            dispatch({ type: "QUALIFICATION_COMPLETENESS_SUCCESS", payload: response?.data?.qualification_completeness });
            Alert({status: true, text: response?.data?.message || 'Qualification updated successfully'})
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
        degree_program: prevQual?.degree.DEGREE_ID || '',
        organization_id: prevQual?.ORGANIZATION_ID || '',
        institute_id: '',
        discipline_id: prevQual?.DISCIPLINE_ID || '',
        // start_date: prevQual?.START_DATE || '',
        // end_date: prevQual?.END_DATE || '',
        obtained_marks: prevQual?.OBTAINED_MARKS || '',
        total_marks: prevQual.TOTAL_MARKS || '',
        major: prevQual.MAJOR || '',
        passing_year: prevQual.PASSING_YEAR || '',
        roll_no: prevQual.ROLL_NO || '',
        is_result_declare: prevQual.IS_RESULT_DECLARE || '',
        grading_as: prevQual.GRADING_AS || '',
        result_date: prevQual.RESULT_DATE || '',
        grade: prevQual.GRADE || '',
        cgpa: prevQual.CGPA || '',
        out_of: prevQual.OUT_OF || '',
    }

    const validationRules = Yup.object({
        // institute_id: Yup.string().required('Institute required'),
        discipline_id: Yup.string().required('Discipline required'),
        organization_id: Yup.string().required('Organization required'),
        // start_date: Yup.string().required('Start date required'),
        // end_date: Yup.string().required('End date required'),
        roll_no: Yup.string().required('Roll No./Seat No. required'),
        is_result_declare: Yup.string().required(), // make sure this exists in form values
        obtained_marks: Yup.string().when('is_result_declare', (is_result_declare, schema) => {
            return is_result_declare == 'Y'
            ? schema.required('Obtained marks required')
            : schema;
        }),
        total_marks: Yup.string().when('is_result_declare', (is_result_declare, schema) => {
            return is_result_declare == 'Y'
            ? schema.required('Total marks required')
            : schema;
        }),
    });   
    
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