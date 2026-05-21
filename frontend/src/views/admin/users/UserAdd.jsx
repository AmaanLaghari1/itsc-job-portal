import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import UserForm from './UserForm'
import { createUser } from '../../../api/UserRequest'
import Alert from '../../../components/Alert'

const UserAdd = () => {
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
        mobile_no: Yup.number().max(99999999999, 'Mobile No. must contain only 11 digits!').required('Mobile No. is required!'),
        email: Yup.string().email('Invalid email format').required('Email is required!'),
        password: Yup.string().min(8, 'Password is too short!').required('Password is required!'),
        password_confirmation: Yup.string().required('Password Confirmation is required!').oneOf([Yup.ref('password'), null], 'Passwords must match!'),
    })

    const handleSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
        setSubmitting(false)
        setLoading(true)
        try {
            const response = await createUser(values)
            navigate('/admin/users');
            Alert({ status: true, text: 'User created successfully!' })
        } catch (error) {
            console.log(error)
            Alert({ status: false, text: error?.response?.data?.error_message || 'An error occurred while creating the user.' })
        }
        finally {
            resetForm({ values: values })
            setLoading(false)
        }
    }

  return (
    <div>
        <UserForm
        initialValues={initialValues}
        validations={validations}
        handleSubmit={handleSubmit}
        loading={loading}
        />
    </div>
  )
}

export default UserAdd