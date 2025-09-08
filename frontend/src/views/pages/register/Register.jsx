import "../login/Login.css"
import thumbnail from '../../../assets/images/login/register_thumbnail.png'
import logo from '../../../assets/images/logos/usindh-logo.png'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../../../components/Alert.js'
import { register } from '../../../actions/AuthAction.js'
import { useState } from 'react'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import logoWhite from '../../../assets/images/logos/usindh-logo-white.png'

const Register = () => {
    const theme = useSelector(state => state.ui.theme)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)    

    const initialValues = {
        first_name: '',
        fname: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        cnic_no: '',
        mobile_no: ''
    }

    const validations = Yup.object({
        first_name: Yup.string().required('Name is required!'),
        fname: Yup.string().required("Father's Name is required!"),
        cnic_no: Yup.number().min(1111111111111, 'CNIC No. must contain only 13 digits!').required('CNIC is required!'),
        mobile_no: Yup.number().min(11111111111, 'Mobile No. must contain only 11 digits!').required('Mobile No. is required!'),
        email: Yup.string().email('Invalid email format').required('Email is required!'),
        password: Yup.string().min(8, 'Password is too short!').required('Password is required!'),
        password_confirmation: Yup.string().required('Password Confirmation is required!').oneOf([Yup.ref('password'), null], 'Passwords must match!'),
    })

    const handleSubmit = async (values, {setSubmitting, resetForm, setFieldError}) => {
        setSubmitting(false)
        setLoading(true)
        const response = await dispatch(register(values))
        if(response.success){
            navigate('/verify-email', { state: { email: values.email } });
        }
        else {
            Alert({status: false, text: response.error.error_message || 'Some error occured.'})
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
                    <div className="col-6 d-none d-lg-block align-content-center">
                        <img src={thumbnail} alt="" className="w-100 h-75" />
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="col-12 mx-auto">
                            <img src={theme == 'dark' ? logoWhite : logo} width='200' className='mt-2' alt="Usindh Logo" />
                            <h3 className='fw-bold mt-4 mb-3'>Create Account</h3>
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
                                                e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
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
                                                e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
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
                                                e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
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
                                                <Field type="text" className="form-control form-control-sm border-0 border-bottom border-3 rounded-0" placeholder='***@gmail.com' name='email' id='email' />
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
                                                <Field type="password" className="form-control form-control-sm border-0 border-bottom border-3 rounded-0" placeholder='********' name='password' id='password' />
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
                                                <Field type="password" className="form-control form-control-sm border-0 border-bottom border-3 rounded-0" placeholder='********' name='password_confirmation' id='password_confirmation' />
                                                <div className="small text-danger">
                                                    <ErrorMessage name='password_confirmation' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center flex-wrap mt-2 py-2">
                                        <button className="btn btn-primary btn-sm bg-primary shadow shadow-sm rounded-pill p-3 px-5" type='submit' disabled={loading}>
                                            { loading ? 'Registering...' : 'Register' }
                                        </button>
                                        <p className='small mt-auto'>Already have an account? &nbsp;  
                                            <Link to='/login' className='text-decoration-none'>Login</Link>
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

export default Register