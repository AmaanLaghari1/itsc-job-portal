import './Login.css'
import reset_thumbnail from '../../../assets/images/login/gaurd.png'
import logo from '../../../assets/images/logos/usindh-logo.png'
import { useNavigate, useSearchParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { setPassword, verifyPasswordToken } from '../../../api/AuthRequest.js'
import * as Yup from 'yup'
import Alert from "../../../components/Alert.js";
import { useEffect, useState } from "react";
import logoWhite from '../../../assets/images/logos/usindh-logo-white.png'
import { useSelector } from 'react-redux';

const ResetPassword = () => {
    const theme = useSelector(state => state.ui.theme)
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const token = searchParams.get('token')
    // const cnic = searchParams.get('cnic_no')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function verifyToken(token){
            try {
                const response = await verifyPasswordToken(token)
                // console.log(response)
            } catch (error) {
                Alert({status: false, text: error?.data?.message || "Token invalid or expired."})
                navigate('/login');
            }
        }
        verifyToken(token)
    }, [])


    // Redirect if email is missing
    // useEffect(() => {
    //     if (!cnic) {
    //         navigate('/login');
    //     }
    // }, [cnic, navigate]);
    

    const handleSubmit = async (values, {setSubmitting}) => {
        setSubmitting(false)
        setLoading(true)

        const response = await setPassword(values)

        if(response.status === 200){
            Alert({status: true, text: response.data.message || "Password changed."})
            navigate('/login')
        }
        else {
            Alert({status: false, text: response.data.error_message || "Password changing failed."})
        }
        setLoading(false)
    };

    return (
    <div>
        <div style={{minHeight: '100vh', zIndex: 1}} className="d-flex align-items-center position-relative w-100 p-2">
            <div className="col-12 col-sm-5 position-absolute top-0 h-100 d-none d-lg-block p-2">
                <div className="bg-secondary h-100 rounded-5 d-block m-auto"></div>
            </div>

            <div className="container position-relative z-1">
                <div className="row">
                    <div className="col-7 d-none d-lg-flex justify-content-end">
                        <img src={reset_thumbnail} alt="" className="w-75 d-block ms-auto" />
                    </div>
                    <div className="col-12 col-lg-5">
                        <div className="col-10 mx-auto">
                            <img src={theme == 'dark' ? logoWhite : logo} width='200' className='mt-3' alt="Usindh Logo" />
                            <h3 className='fw-bold mt-5 mb-4'>Reset Your Password</h3>
                            <Formik
                            initialValues={{forget_password: token || '', password: '', password_confirmation: ''}}
                            validationSchema={Yup.object({
                                password: Yup.string().required('New password required!'),
                                password_confirmation: Yup.string().required('Confirm password required!').oneOf([Yup.ref('password'), null], 'Passwords must match!')
                            })}
                            onSubmit={handleSubmit}
                            >
                                <Form>
                                    <div className="form-group my-2">
                                        <label className='form-label' htmlFor="cnic_no">
                                            New Password<span className="text-danger fw-bold">*</span>
                                        </label>
                                        <Field type="password" className="form-control border-0 border-bottom border-3 rounded-0" placeholder='********' name='password' id='password' />
                                        <div className="small text-danger">
                                            <ErrorMessage name='password' />
                                        </div>
                                    </div>
                                    <div className="form-group my-2">
                                        <label className='form-label' htmlFor="cnic_no">
                                            Confirm Password<span className="text-danger fw-bold">*</span>
                                        </label>
                                        <Field type="password" className="form-control border-0 border-bottom border-3 rounded-0" placeholder='********' name='password_confirmation' id='password_confirmation'
                                        />
                                        <div className="small text-danger">
                                            <ErrorMessage name='password_confirmation' />
                                        </div>
                                    </div>
                                    <button className="btn btn-primary btn-sm bg-primary shadow shadow-sm rounded-pill p-3 px-5 mt-4" type='submit' disabled={loading}>
                                        { loading ? 'Resetting...' : 'Reset' }
                                    </button>
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

export default ResetPassword