import { Form, Formik } from "formik"
import FormControl from '../../../components/FormControl.jsx'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { resetPassword } from "../../../api/AuthRequest.js"
import Alert from "../../../components/Alert.js"
import { useState } from "react"
import logo from '../../../assets/images/logos/usindh-logo.png'
import './Login.css'

const ForgotPassword = () => {
    const navigate = useNavigate()
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
        <div className="bg-primary min-vh-100 d-flex align-items-center">
            <div className="auth col-10 col-md-5 align-content-center m-auto p-2 bg-white rounded-5" style={{ height: "auto" }}>
                { !linkSent ? 
                    <Formik
                    initialValues={{cnic_no: ''}}
                    validationSchema={Yup.object({cnic_no: Yup.number().required('CNIC No. required!').min(1111111111111, 'Must contain only 13 digits!')})}
                    onSubmit={handleSubmit}
                    >
                        <Form className="p-2" method="POST">
                            <div className="navbar-brand">
                                <Link to='login'>
                                    <img src={logo} style={{width: "14rem"}} alt="" />
                                </Link>
                            </div>
                            <h4 className="text-center my-3">Enter your CNIC No. to reset your password</h4>
                            <div className="form-group my-2">
                                <FormControl control='input' type='text' name='cnic_no' label='CNIC No. (without dashes)'
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 13);
                                }}
                                />
                            </div>

                            <div className="form-group text-center">
                                <button disabled={loading} type="submit" className="btn btn-primary">
                                    { loading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        <a href="" className="btn-link text-decoration-none">Try something else</a>
                        </Form>
                    </Formik>
                    :
                    <div>
                        <div className="navbar-brand">
                                <Link to='login'>
                                    <img src={logo} style={{width: "14rem"}} alt="" />
                                </Link>
                            </div>
                    <p align='justify' className="lead fw-bolder fst-italic px-4 my-3">
                        We have sent you a link to reset your password. Kindly check your email address.
                    </p>
                    </div>
                }
            </div>
        </div>
    )
}

export default ForgotPassword