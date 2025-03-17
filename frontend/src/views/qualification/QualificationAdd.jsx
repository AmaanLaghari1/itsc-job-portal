import * as API from '../../api/QualificationRequest.js'
import Alert from '../../components/Alert'
import { useSelector } from 'react-redux'
import QualificationForm from './QualificationForm.jsx'
import { useState } from 'react'

const QualificationAdd = () => {
    const auth = useSelector(state => state.auth.authData)
    const [loading, setLoading] = useState(false)

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
            // console.log(response)
            Alert({status: true, text: response?.data?.message || 'Qualification added successfully'})
        }
        catch (error) {
            Alert({status: false, text: error.response?.data?.error_message || 'Some error occured'})
            console.log(error)
        }
        setLoading(false)
    }
    
  return (
    <div>
        <QualificationForm handleSubmit={handleSubmit} loading={loading} />
    </div>
  )
}

export default QualificationAdd