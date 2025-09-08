import { useEffect, useState } from 'react'
import ApplicationForm from './ApplicationForm'
import { useLocation, useNavigate } from 'react-router-dom'
import * as API from '../../../api/ApplicationRequest'
import Alert from '../../../components/Alert'
import * as Yup from 'yup'
import ApplicationConfirm from '../../dashboard/ApplicationConfirm'
import ApplicationReview from './ApplicationReview'

const ApplicationEdit = () => {
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const {prevData, announcement} = location.state || {}
    useEffect(function(){
      if(!prevData){
        navigate('/admin/applications')
      }
    }, [])

    const initialValues = {
        announcement_id: prevData.ANNOUNCEMENT_ID?? '',
        apply_date: prevData.APPLY_DATE?? '',
        paid_date: prevData.PAID_DATE??'',
        paid_amount: prevData.PAID_AMOUNT??'',
        active: prevData.ACTIVE??0,
        application_status: prevData.APPLICATION_STATUS??1,
        remarks: prevData.REMARKS??'',
    }

    const validationRules = Yup.object({})

    const submitHandler = async (values, {setSubmitting}) => {
        setLoading(true)
        setSubmitting(false)
        values.apply_date = new Date(values.apply_date).toISOString().split('T')[0];
        values.paid_date = values.paid_date ? new Date(values.paid_date).toISOString().split('T')[0] : null;
        try {
            const response = await API.updateApplication(values, prevData.APPLICATION_ID)
            Alert({
                status: true,
                text: response.data?.message || 'Application updated successfully'
            })
            navigate('/admin/applications')
        } catch (error) {
            console.log(error)
            Alert({
                status: false,
                text: error?.data?.message || 'Application update failed'
            })
        }
        setLoading(false)
    }
  return (
    <div>
        {/* <ApplicationConfirm /> */}
        <ApplicationReview prevData={prevData} announcement={announcement} />
        <ApplicationForm 
        initialValues={initialValues}
        validationRules={validationRules}
        handleSubmit={submitHandler} 
        loading={loading} 
        />
    </div>
  )
}

export default ApplicationEdit