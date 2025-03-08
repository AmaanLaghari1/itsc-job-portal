import { Formik, Form } from 'formik';
import FormControl from '../../../components/FormControl.jsx';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logos/usindh-logo.png';
import "../login/Login.css";
import Alert from '../../../components/Alert.js';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../../../actions/AuthAction.js';
import { useEffect, useState } from 'react';
import { resendOtp } from '../../../api/AuthRequest.js';

const TIMER_STORAGE_KEY = "otp_timer";

const VerifyEmail = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};
    const [loading, setLoading] = useState(false)
    
    const [timer, setTimer] = useState(() => {
        const storedTime = localStorage.getItem(TIMER_STORAGE_KEY);
        return storedTime ? Math.max(0, storedTime - Math.floor(Date.now() / 1000)) : 300;
    }); // 5 minutes countdown
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    // Redirect if email is missing
    useEffect(() => {
        if (!email) {
            navigate('/register');
        }
    }, [email, navigate]);

    // Countdown timer effect
    useEffect(() => {
        if (timer > 0) {
            localStorage.setItem(TIMER_STORAGE_KEY, Math.floor(Date.now() / 1000) + timer);
            const interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setIsResendDisabled(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setIsResendDisabled(false);
            localStorage.removeItem(TIMER_STORAGE_KEY);
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
        <div className="bg-primary min-vh-100 d-flex align-items-center">
            <Formik
                initialValues={{
                    email: email,
                    token: ''
                }}
                validationSchema={
                    Yup.object({
                        token: Yup.number().required('Otp is required')
                    })
                }
                onSubmit={handleSubmit}
            >
                <div className="auth col-10 col-md-5 align-content-center m-auto p-2 bg-white rounded-5" style={{ height: "auto" }}>
                    <div className="form-group">
                        <img src={logo} style={{ width: "14rem" }} alt="USindh Logo" />
                        <h3 className="my-3 text-center">Verify Email</h3>
                    </div>
                    <Form className="mx-auto p-3" method='POST' autoComplete='off'>
                        <p className="small fst-italic">Check your spam/junk folder</p>
                        <div className="form-group">
                            <FormControl control='input' type="text" name="token" label="Enter 6 digit code" 
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6);
                            }}
                            />
                        </div>
                        <div className="form-group">
                            <button type='submit' className="btn btn-primary my-2" disabled={loading}>
                                { loading ? 'Verifying...' : 'Verify' }
                            </button>
                            <p className='small'>Didn't get the code? 
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
                </div>
            </Formik>
        </div>
    );
};

export default VerifyEmail;
