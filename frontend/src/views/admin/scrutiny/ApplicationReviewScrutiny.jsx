import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ApplicationReview from '../applications/ApplicationReview'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import FormControl from '../../../components/FormControl'
import { CButton } from '@coreui/react'
import { addScrutinyApplication, getApplicationStatuses } from '../../../api/ApplicationRequest'
import { mapOptions } from '../../../helper'
import Alert from '../../../components/Alert'

const ApplicationReviewScrutiny = () => {
    const location = useLocation()
    const { prevData, announcement } = location.state || {}
    const [statuses, setStatuses] = useState([])
    const navigate = useNavigate()

    const fetchStatuses = async () => {
        try {
            const response = await getApplicationStatuses()
            // console.log(response)
            setStatuses(response.data || [])
        } catch (error) {
            console.log(error)
        }
    }

    const statusOptions = useMemo(() => {
        return mapOptions(statuses, 'APPLICATION_STATUS_ID', 'STATUS')
    }, [statuses])

    useEffect(() => {
        fetchStatuses()
    }, [])

    const handleSubmit = async (values) => {
        try {
            const response = await addScrutinyApplication(values)
            console.log(response)
            Alert({ status: true, text: response.data?.message || 'Application added successfully...' })
            navigate('/admin/scrutiny/applications')
        } catch (error) {
            console.log(error)
            Alert({ status: false, text: error.response.data?.error_message || 'Something went wrong!' })
        }
    }

    return (
        <div>
            <ApplicationReview prevData={prevData} announcement={announcement} />

            <div className="card shadow shadow-sm rounded-0 my-2 p-3">
                <Formik
                    initialValues={{
                        user_id: prevData.USER_ID,
                        announcement_id: prevData.ANNOUNCEMENT_ID,
                        application_id: prevData.APPLICATION_ID,
                        application_status_id: '',
                        remarks: ''
                    }}
                    validationSchema={Yup.object().shape({
                        application_status_id: Yup.string().required('Required!')
                    })}
                    onSubmit={handleSubmit}
                >
                    {
                        ({ }) => (
                            <Form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <FormControl
                                            control='select'
                                            label='Status'
                                            name='application_status_id'
                                            options={statusOptions}
                                            required={true}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FormControl
                                            control='input'
                                            label='Remarks'
                                            name='remarks'
                                        />
                                    </div>
                                </div>
                                <div className="">
                                    <CButton
                                        variant='primary'
                                        className='btn btn-primary btn-sm bg-primary shadow shadow-sm rounded-pill p-3 px-4 my-2'
                                        type='submit'
                                    >
                                        Save
                                    </CButton>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}

export default React.memo(ApplicationReviewScrutiny)