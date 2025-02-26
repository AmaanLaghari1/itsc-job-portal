import { Formik, Form } from 'formik'
import FormControl from '../../../components/FormControl.jsx'
import * as Yup from 'yup'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import './Login.css'
import logo from '../../../assets/images/logos/usindh-logo.png'
import AuthLayout from '../../../layout/AuthLayout.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../actions/AuthAction.js'
import Alert from '../../../components/Alert.js'
import { useState } from 'react'

function Login() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const initialValues = {
      cnic_no: '',
      password: '',
  }

  const validations = Yup.object({
      cnic_no: Yup.number().required('CNIC No. is required!'),
      password: Yup.string().required('Password is required!'),
  })

  const handleSubmit = async (values, {setSubmitting, resetForm, setFieldError}) => {
      setSubmitting(false)
      setLoading(true)
      const response = await dispatch(login(values))
      if(response.success){
          Alert({status: true, text: response.data.message || 'logged in'})
      }
      else {
          Alert({status: false, text: response.error.error_message || 'login failed'})
      }
      resetForm({values: values})
      setLoading(false)
  }

  return (
    <AuthLayout>
        <Formik className="bg-primary p-0"
        initialValues={initialValues}
        validationSchema={validations}
        onSubmit={handleSubmit}>
        <div className="auth col-md-6 align-content-center section-height p-4 bg-white rounded-5">


            <Form className="col-10 col-md-8 mx-auto" method='POST'>     

                <div className="form-group">
                <div className="navbar-brand">
                    <img src={logo} style={{width: "14rem"}} alt="" />
                </div>
                <h5 className="my-4">Login Account</h5>
                    <FormControl control='input' type="text" name="cnic_no" label="CNIC No."
                    onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 13)} />
                </div>
                <div className="form-group">
                    <FormControl control='input' type="password" name="password" label="Password" />
                </div>
                <div className="form-group my-2">
                    <button disabled={loading} type='submit' className="btn btn-primary w-100">
                      { loading ? 'Logging in...' : 'Login' }
                    </button>
                    <p className='small'>Don't have an account? 
                      <Link to='/register' className='text-decoration-none'>Register</Link>
                    </p>
                </div>
            </Form>
            
        </div>
        </Formik>
    </AuthLayout>
  )
}

export default Login
