import React, { useState } from 'react'
import AlertForm from './AlertForm'
import * as Yup from 'yup'
import { addNoticeAlertMsg, updateNoticeAlertMsg } from '../../../../api/AnnouncementRequest'
import Alert from '../../../../components/Alert';
import { useLocation, useNavigate } from 'react-router-dom';

const AlertEdit = () => {
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const {prevValues} = location.state || {}
    const navigate = useNavigate()

    const initialValues = {
        alert_id: prevValues.ALERT_ID,
        msg_content: prevValues.CONTENT || '',
        remarks: prevValues.REMARKS || '',
        is_active: prevValues.IS_ACTIVE || ''
    }

    const validationRules = Yup.object().shape({
        msg_content: Yup.string().required('Required!')
    })

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const response = await updateNoticeAlertMsg(values)
            console.log(response)

            Alert({
                status: true,
                text: 'Alert updated successfully...'
            })
            navigate('/admin/announcement/alerts')
        } catch (error) {
            console.log(error)
            Alert({
                status: false,
                text: 'Something went wrong'
            })
        }
        finally {
            setLoading(false)
        }
    }

  return (
    <div>
        <h3>Add New Alert Message</h3>

        <AlertForm
            initialValues={initialValues}
            validationRules={validationRules}
            handleSubmit={handleSubmit}
            loading={loading}
        />
    </div>
  )
}

export default AlertEdit