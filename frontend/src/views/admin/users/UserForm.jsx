import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'

const UserForm = ({initialValues, validations, handleSubmit, loading}) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validations}
            onSubmit={handleSubmit}
        >
            <Form>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group my-2">
                            <label className='form-label fw-bold' htmlFor="first_name">
                                Name
                            </label>
                            <span> (as per matriculation record)</span>
                            <span className="text-danger fw-bold">*</span>
                            <Field type="text" className="form-control form-control-sm border-0 border-bottom border-3 rounded-0" placeholder='' name='first_name' id='first_name'
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
                                }}
                            />
                            <div className="small text-danger">
                                <ErrorMessage name='first_name' />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group my-2">
                            <label className='form-label fw-bold' htmlFor="last_name">
                                Surname
                            </label>
                            <span className=""> (optional)</span>
                            <Field type="text" className="form-control form-control-sm border-0 border-bottom border-3 rounded-0" placeholder='' name='last_name' id='last_name'
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
                                }}
                            />
                            <div className="small text-danger">
                                <ErrorMessage name='last_name' />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group my-2">
                            <label className='form-label fw-bold' htmlFor="fname">
                                Father's Name
                            </label>
                            <span className="text-danger fw-bold">*</span>
                            <Field type="text" className="form-control form-control-sm border-0 border-bottom border-3 rounded-0" placeholder='' name='fname' id='fname'
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
                                }}
                            />
                            <div className="small text-danger">
                                <ErrorMessage name='fname' />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group my-2">
                            <label className='form-label fw-bold' htmlFor="cnic_no">
                                CNIC No.
                            </label>
                            <span> (without dashes)</span>
                            <span className="text-danger fw-bold">*</span>
                            <Field type="text" className="form-control form-control-sm border-0 border-bottom border-3 rounded-0" placeholder='41304******' name='cnic_no' id='cnic_no'
                                onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 13)}
                            />
                            <div className="small text-danger">
                                <ErrorMessage name='cnic_no' />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group my-2">
                            <label className='form-label fw-bold' htmlFor="email">
                                Email
                            </label>
                            <span className="text-danger fw-bold">*</span>
                            <Field type="text" className="form-control form-control-sm border-0 border-bottom border-3 rounded-0" placeholder='***@gmail.com' name='email' id='email' autoComplete='email' />
                            <div className="small text-danger">
                                <ErrorMessage name='email' />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group my-2">
                            <label className='form-label fw-bold' htmlFor="mobile_no">
                                Mobile No.
                            </label>
                            <span className="text-danger fw-bold">*</span>
                            <Field type="text" className="form-control form-control-sm border-0 border-bottom border-3 rounded-0" placeholder='333241****' name='mobile_no' id='mobile_no'
                                onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 11)}
                            />
                            <div className="small text-danger">
                                <ErrorMessage name='mobile_no' />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group my-2">
                            <label className='form-label fw-bold' htmlFor="password">
                                Password
                            </label>
                            <span className="text-danger fw-bold">*</span>
                            <Field type="password" className="form-control form-control-sm border-0 border-bottom border-3 rounded-0" placeholder='********' name='password' id='password' autoComplete='new-password' />
                            {/* <CIcon icon={cilEyedropper} className="position-absolute" style={{ right: '15px', top: '38px' }} /> */}
                            <div className="small text-danger">
                                <ErrorMessage name='password' />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group my-2">
                            <label className='form-label fw-bold' htmlFor="password_confirmation">
                                Confirm Password
                            </label>
                            <span className="text-danger fw-bold">*</span>
                            <Field type="password" className="form-control form-control-sm border-0 border-bottom border-3 rounded-0" placeholder='********' name='password_confirmation' id='password_confirmation' autoComplete='new-password' />
                            <div className="small text-danger">
                                <ErrorMessage name='password_confirmation' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center flex-wrap mt-2 py-2">
                    <button className="btn btn-primary btn-sm bg-primary shadow shadow-sm rounded-pill p-3 px-5" type='submit' disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </div>
            </Form>
        </Formik>
    )
}

export default UserForm