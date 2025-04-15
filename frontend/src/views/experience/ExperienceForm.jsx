import React from 'react'
import { Formik, Form, Field } from 'formik'
import FormControl from '../../components/FormControl'
import { CButton } from '@coreui/react'
import { useSelector } from 'react-redux'

const ExperienceForm = ({handleSubmit, initialValues, validationRules, loading}) => {
    const auth = useSelector(state => state.auth.authData)
    const options = [
        {key: 'Y', value: 'Currently Employed'},
    ]

  return (
        <Formik
        initialValues={initialValues}
        validationSchema={validationRules}
        onSubmit={handleSubmit}
        >
            {
                ({ setFieldValue }) => {
                    return (
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
                                <div className="col-6">
                                    <div className="form-group my-2">
                                        <FormControl 
                                        control='input' 
                                        as='textarea' 
                                        label='Job Description' 
                                        name='job_description' 
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
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
                                <div className="col-md-6">
                                    <div className="form-group my-2">
                                        <FormControl
                                        control='input'
                                        type='text'
                                        label='Contact No. (without leading zero)'
                                        name='contact_no'
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/\D/g, '');
                                        }}
                                        required={true}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group my-2">
                                        <FormControl 
                                        control='input' 
                                        type='text'
                                        label='Salary (PKR)' 
                                        name='salary' 
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/\D/g, '');
                                        }}
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
                                        <Field className=''
                                        type='checkbox' 
                                        id='is_job_continue'
                                        name='is_job_continue'
                                        onChange={
                                            (e) => {
                                                if (e.target.checked) {
                                                    setFieldValue('is_job_continue', 'Y')
                                                } else {
                                                    setFieldValue('is_job_continue', '')
                                                }
                                            }
                                        }
                                        />
                                        <label htmlFor="is_job_continue" className='mx-1'> Currently Working</label>
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
                                <div className="col-md-6">
                                    <div className="form-group my-2">
                                        <FormControl 
                                        control='input' 
                                        type='text'
                                        label='Reason for Leaving' 
                                        name='reason_for_leaving'
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
                    )
                }
            }


        </Formik>  
    )
}

export default ExperienceForm