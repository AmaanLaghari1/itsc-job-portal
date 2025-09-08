import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logos/usindh-logo.png';
import "../login/Login.css";
import Alert from '../../../components/Alert.js';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../../../actions/AuthAction.js';
import { useEffect, useState } from 'react';
import { resendOtp } from '../../../api/AuthRequest.js';
import gaurd from '../../../assets/images/login/gaurd.png'
import logoWhite from '../../../assets/images/logos/usindh-logo-white.png'

const TIMER_STORAGE_KEY = "otp_timer";

const VerifyEmail = () => {
    const theme = useSelector(state => state.ui.theme)
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};
    const [loading, setLoading] = useState(false)

    // Redirect if email is missing
    useEffect(() => {
        if (!email) {
            navigate('/register');
        }
    }, [email, navigate]);

    const [isResendDisabled, setIsResendDisabled] = useState(true);
    
    const [timer, setTimer] = useState(() => {
        const storedTime = localStorage.getItem(TIMER_STORAGE_KEY);
        const currentTime = Math.floor(Date.now() / 1000);
        if (storedTime && storedTime > currentTime) {
            return storedTime - currentTime;
        } else {
            localStorage.setItem(TIMER_STORAGE_KEY, currentTime + 300);
            return 300;
        }
    });

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setIsResendDisabled(false);
                        localStorage.removeItem(TIMER_STORAGE_KEY);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(false);
        setLoading(true)
        const response = await dispatch(verifyEmail(values));
        if (response.success) {
            Alert({ status: true, text: response.data.message });
        } else {
            Alert({ status: false, text: response?.error.message });
        }
        setLoading(false)
    };
    
    const handleResend = async () => {
        const response = await resendOtp({email: email})
        if (response.status == 200) {
            setTimer(300)
            setIsResendDisabled(true)
            Alert({ status: true, text: response.data.message });
        } else {
            Alert({ status: false, text: response?.data.message });
        }
        console.log(response);
    }

  return (
    <div>
        <div style={{minHeight: '100vh', zIndex: 1}} className="d-flex align-items-center position-relative w-100 p-2">
            <div className="col-12 col-sm-5 position-absolute top-0 h-100 d-none d-lg-block p-2">
                <div className="bg-secondary h-100 rounded-5 d-block m-auto"></div>
            </div>

            <div className="container position-relative z-1">
                <div className="row">
                    <div className="col-7 d-none d-lg-flex ali justify-content-end">
                        <img src={gaurd} alt="" className="w-75" />
                    </div>
                    <div className="col-12 col-lg-5">
                        <div className="col-10 mx-auto">
                            <img src={theme == 'dark' ? logoWhite : logo} width='200' className='mt-3' alt="Usindh Logo" />
                            <Formik
                            initialValues={{
                                email: email,
                                token: ''
                            }}
                            validationSchema={
                                Yup.object({
                                    token: Yup.number().required('Code required!')
                                })
                            }
                            onSubmit={handleSubmit}
                            >
                                <Form method='POST' autoComplete='off'>
                                    <h3 className='fw-bold mt-4 mb-4'>Verify Email</h3>
                                    <div className="alert p-0">
                                        <p className='small fw-bold'>An OTP code has been sent to your email.</p>
                                        <p className='small'>Please check your email and follow the instructions. 
                                            If you don't receive an email, please check your spam folder.
                                        </p>
                                    </div>
                                    <div className="form-group my-2">
                                        <label className='form-label' htmlFor="token">
                                            Enter 6 digit code
                                        </label>
                                        <span className="text-danger fw-bold">*</span>
                                        <Field type="text" className="form-control form-control-sm border-0 border-bottom border-3 rounded-0" placeholder='41****' name='token' id='token' 
                                        onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6)}
                                        />
                                        <div className="small text-danger">
                                            <ErrorMessage name='token' />
                                        </div>
                                    </div>
                                    <div className="form-group mt-4">
                                        <button type='submit' className="btn btn-primary btn-sm bg-primary shadow shadow-sm rounded-pill p-3 px-5" disabled={loading}>
                                            { loading ? 'Verifying...' : 'Verify' }
                                        </button>
                                        <p className='small mt-3'>Didn't get the code? 
                                            <button 
                                                className='btn btn-link p-0 text-decoration-none' 
                                                disabled={isResendDisabled}
                                                onClick={handleResend}
                                                type='button'
                                            >
                                                {isResendDisabled ? `Resend in ${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}` : 'Resend'}
                                            </button>
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

export default VerifyEmail