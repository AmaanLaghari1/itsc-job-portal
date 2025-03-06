import { Formik, Form } from 'formik'
import FormControl from '../../../components/FormControl.jsx'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../../layout/AuthLayout.jsx'
import logo from '../../../assets/images/logos/usindh-logo.png'
import "../login/Login.css"
import Alert from '../../../components/Alert.js'
import { useDispatch } from 'react-redux'
import { register } from '../../../actions/AuthAction.js'
import { useState } from 'react'

function Signup() {
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
        first_name: Yup.string().required('Fullname is required!'),
        fname: Yup.string().required("Father's Name is required!"),
        last_name: Yup.string().required('Surname is required!'),
        cnic_no: Yup.number().min(1111111111111, 'CNIC No. must contain only 13 digits!').required('CNIC is required!'),
        email: Yup.string().required('Email is required!'),
        password: Yup.string().min(8, 'Password is too short!').required('Password is required!'),
        password_confirmation: Yup.string().required('Password Confirmation is required!').oneOf([Yup.ref('password'), null], 'Passwords must match!'),
    })

    const handleSubmit = async (values, {setSubmitting, resetForm, setFieldError}) => {
        setSubmitting(false)
        setLoading(true)
        const response = await dispatch(register(values))
        if(response.success){
            navigate('/verify-email', { state: { email: values.email } });
            Alert({status: true, text: response.data.message})
        }
        else {
            Alert({status: false, text: response.error.error_message || 'Some error occured.'})
        }
        resetForm({values: values})
        setLoading(false)
    }

  return (
    <AuthLayout>
        <Formik className="container-fluid"
        initialValues={initialValues}
        validationSchema={validations}
        onSubmit={handleSubmit}>
            <div className="auth col-md-6 align-content-center min-vh-100 p-2 bg-white rounded-5" style={{height: "auto"}}>
                <div className="form-group">
                    <div className="navbar-brand">
                        <img src={logo} style={{width: "14rem"}} alt="" />
                    </div>
                    <h5 className="my-3">Create Account</h5>
                </div>

                    <Form className="" method='POST' autoComplete='off'>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-6">
                                    <FormControl control='input' type="text" name="first_name" label="Fullname" required={true} />
                                </div>
                                <div className="col-6">
                                    <FormControl control='input' type="text" name="last_name" label="Surname" required={true} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-6">
                                    <FormControl control='input' type="text" name="fname" label="Father's Name" required={true} />
                                </div>
                                <div className="col-6">
                                    <FormControl control='input' type="text" name="cnic_no" label="CNIC No." required={true}
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 13);
                                    }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-6">
                                    <FormControl control='input' type="text" name="email" label="Email" required={true} />
                                </div>
                                <div className="col-6">
                                    <FormControl control='input' type="tel" name="mobile_no" label="Mobile No." 
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                    }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-6">
                                    <FormControl control='input' type="password" name="password" label="Password" required={true} />
                                </div>
                                <div className="col-6">
                                    <FormControl control='input' type="password" name="password_confirmation" label="Confirm Password" required={true} />
                                </div>
                            </div>
                        
                        </div>

                        <div className="form-group">
                            <button disabled={loading} type='submit' className="btn btn-primary w-100 my-2">
                                {loading ? 'Registering...' : 'Register'}
                            </button>
                            <p className='small'>Already have an account? <Link to='/login' className='text-decoration-none'>Login</Link></p>
                        </div>
                    </Form>
                    
                </div>
        </Formik>
    </AuthLayout>
  )
}

export default Signup
