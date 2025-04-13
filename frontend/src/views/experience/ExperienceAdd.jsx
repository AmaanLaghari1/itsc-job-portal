import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Alert from '../../components/Alert'
import * as API from '../../api/QualificationRequest.js'
import * as Yup from 'yup'
import FormControl from '../../components/FormControl'
import { CButton } from '@coreui/react'

const ExperienceAdd = () => {
    const auth = useSelector(state => state.auth.authData)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const initialValues = {
        user_id: auth.user.USER_ID,
    }

    const validationRules = Yup.object({
        organization_name: Yup.string().required('Organization name required'),
        start_date: Yup.string().required('Start date required')
    })

    const handleSubmit = async (values, {setSubmitting, resetForm}) => {
        setSubmitting(false)
        setLoading(true)
        const formattedValues = {
            ...values,
            start_date: values.start_date ? new Date(values.start_date).toISOString().split('T')[0] : '',
        };

        try {
            const response = await API.createQualification(formattedValues)
            // console.log(response)
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
        <Formik
        initialValues={initialValues}
        validationSchema={validationRules}
        onSubmit={handleSubmit}
        >
            <Form>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <FormControl
                            control='input'
                            type='text'
                            label='Organization Name'
                            name='organization_name'
                            required={true}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <FormControl
                            control='input'
                            type='text'
                            label='Employment Type'
                            name='emp_type'
                            required={true}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group my-2">
                            <FormControl
                            control='input'
                            type='text'
                            label='Contact No.'
                            name='contact_no'
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/\D/g, '');
                            }}
                            required={true}
                            />
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="form-group my-2">
                            <FormControl 
                            control='date' 
                            type='date' 
                            label='Start Date' 
                            name='start_date'
                            required={true}
                            />
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="form-group my-2">
                            <FormControl 
                            control='date' 
                            type='date' 
                            label='End Date' 
                            name='end_date' 
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group my-2">
                            <FormControl 
                            control='input' 
                            as='textarea' 
                            label='Company Address' 
                            name='address' 
                            required={true}
                            />
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center gap-2 my-2">
                    <CButton type='submit' color='primary' className='btn btn-primary bg-primary rounded-pill my-2 p-2 px-4'>
                        { loading ? 'Saving...' : 'Save' }
                    </CButton>
                </div>
            </Form>


        </Formik>
    </div>
  )
}

export default ExperienceAdd