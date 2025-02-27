import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Formik } from "formik"
import FormControl from '../../../components/FormControl.jsx'
import { setPassword, verifyPasswordToken } from '../../../api/AuthRequest.js'
import * as Yup from 'yup'
import Alert from "../../../components/Alert.js";
import { useEffect } from "react";
import './Login.css'

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const token = searchParams.get('token')
    const cnic = searchParams.get('cnic_no')

    useEffect(() => {
        async function verifyToken(){
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
    useEffect(() => {
        if (!cnic) {
            navigate('/login');
        }
    }, [cnic, navigate]);
    

    const handleSubmit = async (values, {setSubmitting}) => {
        setSubmitting(false)

        const response = await setPassword(values)
        console.log(response)

        if(response.status === 200){
            Alert({status: true, text: response.data.message || "Password changed."})
            navigate('/login')
        }
        else {
            Alert({status: false, text: response.data.error_message || "Password changing failed."})
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-primary min-vh-100 d-flex align-items-center">
            <div className="auth col-10 col-md-5 align-content-center m-auto p-2 bg-white rounded-5" style={{ height: "auto" }}>
            <Formik
                initialValues={{cnic_no: cnic || 4130240497129, password: '', password_confirmation: ''}}
                validationSchema={Yup.object({
                    password: Yup.string().required('New password required!'),
                    password_confirmation: Yup.string().required('Confirm password required!').oneOf([Yup.ref('password'), null], 'Passwords must match!')
                })}
                onSubmit={handleSubmit}
                >
                    <Form className="p-2" method="POST">
                        <h3 className="text-center my-3">Reset your password</h3>
                        <div className="form-group my-2">
                            <FormControl control='input' type='password' name='password' label='New Password' />
                        </div>
                        <div className="form-group my-2">
                            <FormControl control='input' type='password' name='password_confirmation' label='Confirm Password' />
                        </div>

                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
        </div>
    );
}
