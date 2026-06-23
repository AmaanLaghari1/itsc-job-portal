import React, { useState } from 'react'
import AlertForm from './AlertForm'
import * as Yup from 'yup'
import { addNoticeAlertMsg } from '../../../../api/AnnouncementRequest'
import Alert from '../../../../components/Alert';
import { useNavigate } from 'react-router-dom';

const AlertAdd = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const initialValues = {
        msg_content: '',
        remarks: '',
        is_active: ''
    }

    const validationRules = Yup.object().shape({
        msg_content: Yup.string().required('Required!')
    })

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const response = await addNoticeAlertMsg(values)
            console.log(response)

            Alert({
                status: true,
                text: 'Alert added successfully...'
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

export default AlertAdd