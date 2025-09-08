import React from 'react'
import { Formik, Form, Field } from 'formik'
import FormControl from '../../components/FormControl'
import { CButton } from '@coreui/react'
import { useSelector } from 'react-redux'
import CustomSelect from '../../components/CustomSelect'

const ExperienceForm = ({handleSubmit, initialValues, validationRules, loading}) => {

  return (
        <Formik
        initialValues={initialValues}
        validationSchema={validationRules}
        onSubmit={handleSubmit}
        >
            {
                ({ setFieldValue, values }) => {
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
                                        <CustomSelect
                                        className="form-control"
                                        label="Employment Type"
                                        placeholder="Select Employment Type"
                                        name="emp_type"
                                        options={[
                                            { key: 'internship', value: 'Internship' },
                                            { key: 'part time', value: 'Part Time' },
                                            { key: 'full time', value: 'Full Time' },
                                            { key: 'freelance', value: 'Freelance' },
                                            { key: 'contract', value: 'Contract' },
                                            { key: 'temporary', value: 'Temporary' },
                                            { key: 'volunteer', value: 'Volunteer' },
                                            { key: 'apprenticeship', value: 'Apprenticeship' },
                                        ]}
                                        onChange={(selectedOption) => {
                                            setFieldValue('emp_type', selectedOption?.key || '')
                                        }}
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
                                        label='Organization Address' 
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
                                        label='Organization Contact No.'
                                        name='contact_no'
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/\D/g, '');
                                        }}
                                        // required={true}
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
                                                    setFieldValue('end_date', '')
                                                    setFieldValue('reason_for_leaving', '')
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
                                        disabled={values.is_job_continue === 'Y' ? true : false}
                                        min={initialValues.start_date ? initialValues.start_date : ''}
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
                                        disabled={values.is_job_continue === 'Y' ? true : false}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center gap-2 my-2">
                                <CButton type='submit' color='primary' disabled={loading} className='btn btn-primary fs-5 rounded-pill my-2 p-2 px-4'>
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