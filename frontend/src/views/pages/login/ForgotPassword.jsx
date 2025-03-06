import React from 'react'
import './Login_2.css'
import lock_thumbnail from '../../../assets/images/login/password-lock.png'
import logo from '../../../assets/images/logos/usindh-logo.png'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../actions/AuthAction.js'
import Alert from '../../../components/Alert.js'
import { useState } from 'react'
import * as Yup from 'yup'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const initialValues = {
        cnic_no: '',
        password: '',
    }

    const validations = Yup.object({
        cnic_no: Yup.string().required('CNIC No. is required!'),
        password: Yup.string().required('Password is required!'),
    })

    const handleSubmit = async (values, {setSubmitting, resetForm, setFieldError}) => {
        setSubmitting(false)
        setLoading(true)
        const response = await dispatch(login(values))
        if(response.success){
            //   Alert({status: true, text: response.data.message || 'logged in'})
        }
        else {
            Alert({status: false, text: response.error.error_message || 'login failed'})
        }
        resetForm({values: values})
        setLoading(false)
    }

  return (
    <div>
        <div style={{minHeight: '100vh', zIndex: 1}} className="d-flex align-items-center position-relative w-100 p-2">
            <div className="col-12 col-sm-5 position-absolute top-0 h-100 d-none d-lg-block p-2">
                <div className="bg-secondary h-100 rounded-5 d-block m-auto"></div>
            </div>

            <div className="container position-relative z-1">
                <div className="row">
                    <div className="col-7 d-none d-lg-flex justify-content-end">
                        <img src={lock_thumbnail} alt="" className="w-75 d-block ms-auto" />
                    </div>
                    <div className="col-12 col-lg-5">
                        <div className="col-10 mx-auto">
                            <img src={logo} width='200' className='mt-3' alt="Usindh Logo" />
                            <h3 className='fw-bold mt-5 mb-4'>Forgot Your Password?</h3>
                            <Formik
                            initialValues={initialValues}
                            validationSchema={validations}
                            onSubmit={handleSubmit}
                            >
                                <Form>
                                    <div className="form-group my-2">
                                        <label className='form-label' htmlFor="cnic_no">
                                            Enter CNIC No.<span className="text-danger fw-bold">*</span>
                                        </label>
                                        <Field type="text" className="form-control border-0 border-bottom border-3 rounded-0" placeholder='41304******' name='cnic_no' id='cnic_no' 
                                        onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 13)}
                                        />
                                        <div className="small text-danger">
                                            <ErrorMessage name='cnic_no' />
                                        </div>
                                    </div>
                                    <button className="btn btn-primary btn-sm bg-primary shadow shadow-sm rounded-pill p-3 px-5 mt-4" type='submit' disabled={loading}>
                                        { loading ? 'Submitting...' : 'Submit' }
                                    </button>
                                    <div className="d-flex justify-content-between flex-wrap mt-3 py-2">
                                        <p className='small'>Remembered? &nbsp;  
                                            <Link to='/login' className='text-decoration-none'>Back to Login</Link>
                                        </p>
                                        <p className="small">
                                            <Link to='/forgot-password' className='text-decoration-none'>Try something else</Link>
                                        </p>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword