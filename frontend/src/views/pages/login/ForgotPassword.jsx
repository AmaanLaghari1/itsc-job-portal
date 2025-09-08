import './Login.css'
import lock_thumbnail from '../../../assets/images/login/password-lock.png'
import chat_thumbnail from '../../../assets/images/login/chat_thumbnail.png'
import logo from '../../../assets/images/logos/usindh-logo.png'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { resetPassword } from "../../../api/AuthRequest.js"
import Alert from "../../../components/Alert.js"
import { useState } from "react"
import logoWhite from '../../../assets/images/logos/usindh-logo-white.png'
import { useSelector } from 'react-redux'

const ForgotPassword = () => {
    const theme = useSelector(state => state.ui.theme)
    const [linkSent, setLinkSent] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (values, {setSubmitting}) => {
        setSubmitting(false)
        setLoading(true)
        try {
            const response = await resetPassword(values)
            // console.log(response)
            if(response.status === 200){
                setLinkSent(true)
            }
        } catch (error) {
            Alert({status: false, text: "CNIC No. does'nt exist"})
        }
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
                        <img src={linkSent ? chat_thumbnail : lock_thumbnail} alt="" className="w-75 d-block ms-auto" />
                    </div>
                    <div className="col-12 col-lg-5">
                        <div className="col-10 mx-auto">
                            <img src={theme == 'dark' ? logoWhite : logo} width='200' className='mt-3' alt="Usindh Logo" />
                            <h3 className='fw-bold mt-5 mb-4'>{!linkSent ? 'Forgot Your Password?' : 'Email Sent!' }</h3>
                            {
                                linkSent ? 
                                <div className="alert p-0">
                                    <p className='small fw-bold'>Password reset link has been sent to your email.</p>
                                    <p className='small'>Please check your email and follow the instructions. 
                                        If you don't receive an email, please check your spam folder.
                                    </p>
                                    <Link to='/login' className='text-decoration-none'>Back to Login</Link>
                                </div>
                                :
                                <Formik
                                initialValues={{cnic_no: ''}}
                                validationSchema={Yup.object({cnic_no: Yup.number().required('CNIC No. required!').min(1111111111111, 'Must contain only 13 digits!')})}
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
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword