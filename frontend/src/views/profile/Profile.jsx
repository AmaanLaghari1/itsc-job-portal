import { Form, Formik } from 'formik'
import React from 'react'
import FormControl from '../../components/FormControl'
import Alert from '../../components/Alert'
import * as Yup from 'yup'
import dummyPic from '../../assets/images/avatars/2.jpg'
import { useSelector } from 'react-redux'

const Profile = () => {
    const auth = useSelector(state => state.auth.authData)
    console.log(auth)

    const initialValues = {
        name: auth.user.FIRST_NAME || '-',
        surname: auth.user.LAST_NAME || '-',
        cnic_no: auth.user.CNIC_NO || '-',
        email: auth.user.EMAIL || '-',
        phone: auth.user.PHONE || '-',
    }

    const validations = Yup.object({
        name: Yup.string().required('Name is required!'),
        surname: Yup.string().required('Surname is required!'),
        cnic_no: Yup.number()
            .min(1111111111111, 'CNIC No. invalid!')
            .required('CNIC is required!'),
        phone: Yup.number()
            .min(1111111111, 'Phone No. invalid!'),
        email: Yup.string().email('Invalid email format').required('Email is required!'),
    });

    const submitHandler = (values, {setSubmitting, resetForm}) => {
        setSubmitting(false)
        Alert({status: true, text: 'Profile Saved.'})
        resetForm({values: values})
    }
  return (
    <div>
        <div className="d-flex gap-2 align-items-center flex-wrap">
            <div className="profile-img">
                <img src={dummyPic} width={150} height={150} className='rounded-circle' alt="" />
            </div>
            <div className="basic-info">
                <h1>{`${auth.user.FIRST_NAME || ''}  ${auth.user.LAST_NAME || ''}`}</h1>
                <p className="lead">
                    {auth.user.EMAIL || ''}
                </p>
            </div>
        </div>
        <Formik
        initialValues={initialValues}
        validationSchema={validations}
        onSubmit={submitHandler}>
            <Form method='POST'>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6 my-2">
                            <FormControl control='input' type='text' label='Name' name='name' />
                        </div>
                        <div className="col-sm-6 my-2">
                            <FormControl control='input' type='text' label='Surname' name='surname' />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6 my-2">
                            <FormControl control='input' type='text' label='CNIC No.' name='cnic_no' disabled
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 13);
                            }}
                            />
                        </div>
                        <div className="col-sm-6 my-2">
                            <FormControl control='input' type='email' label='Email' name='email' disabled />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6 my-2">
                            <FormControl control='input' type='text' label='Phone No.' name='phone'
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                            }}
                            />
                        </div>
                        <div className="col-sm-6 my-2">
                            <FormControl control='input' type='file' name='profile_picture' label='Change Profile Picture' />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-12 my-2">
                            <FormControl control='textarea' name='address' label='Current Address' />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary my-2 rounded-0 px-3" type='submit'>Save</button>
                </div>
            </Form>
        </Formik>
    </div>
  )
}

export default Profile