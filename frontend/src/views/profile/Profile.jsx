import { Form, Formik } from 'formik'
import React, { useRef, useEffect, useState } from 'react'
import FormControl from '../../components/FormControl'
import Alert from '../../components/Alert'
import * as Yup from 'yup'
import dummyPic from '../../assets/images/avatars/dummy-pic.png'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, uploadImage } from '../../actions/UserAction'
import axios from 'axios'
import CustomSelect from '../../components/CustomSelect'
import './Profile.css'
import { CButton } from '@coreui/react'
import { mapOptions } from '../../helper.js'

const Profile = () => {
    const auth = useSelector(state => state.auth.authData)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState(null); // Image preview state
    const [data, setData] = useState({
        countries: [],
        districts: [],
        provinces: []
    });
    const changePicRef = useRef(null)

    const handleChangePic = () => {
        changePicRef.current.click();
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const [countriesRes, districtsRes, provincesRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}countries`),
                    auth.user.PROVINCE_ID && axios.get(`${import.meta.env.VITE_API_URL}districts/${auth.user.PROVINCE_ID}`),
                    (auth.user.COUNTRY_ID || 160) && axios.get(`${import.meta.env.VITE_API_URL}provinces/${auth.user.COUNTRY_ID || 160}`)
                ]);

                setData({
                    countries: countriesRes.data?.options || [],
                    districts: districtsRes?.data?.options || [],
                    provinces: provincesRes?.data?.options || []
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    const handleCountryChange = async (countryId) => {
        if (!countryId) {
            setData((prevData) => ({ ...prevData, provinces: [] }));
            return;
        }
    
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}provinces/${countryId}`);
            setData((prevData) => ({
                ...prevData,
                provinces: response.data?.options || [],
            }));
        } catch (error) {
            console.error("Error fetching provinces:", error);
        }
    };

    const handleProvinceChange = async (provinceId) => {
        if (!provinceId) {
            setData((prevData) => ({ ...prevData, provinces: [] }));
            return;
        }
    
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}districts/${provinceId}`);
            setData((prevData) => ({
                ...prevData,
                districts: response.data?.options || [],
            }));
        } catch (error) {
            console.error("Error fetching districts:", error);
        }
    };

    const districtOptions = mapOptions(data.districts, "DISTRICT_ID", "DISTRICT_NAME");
    const provinceOptions = mapOptions(data.provinces, "PROVINCE_ID", "PROVINCE_NAME");
    const countryOptions = mapOptions(data.countries, "COUNTRY_ID", "COUNTRY_NAME");

    const initialValues = {
        first_name: auth.user.FIRST_NAME || '',
        last_name: auth.user.LAST_NAME || '',
        fname: auth.user.FNAME || '',
        cnic_no: auth.user.CNIC_NO || '',
        email: auth.user.EMAIL || '',
        mobile_no: auth.user.MOBILE_NO || '',
        home_address: auth.user.HOME_ADDRESS || '',
        permanent_address: auth.user.PERMANENT_ADDRESS || '',
        date_of_birth: auth.user.DATE_OF_BIRTH ? new Date(auth.user.DATE_OF_BIRTH) : '',
        place_of_birth: auth.user.PLACE_OF_BIRTH || '',
        district_id: auth.user.DISTRICT_ID || '',
        province_id: auth.user.PROVINCE_ID || '',
        country_id: auth.user.COUNTRY_ID || 160,
        religion: auth.user.RELIGION || '',
        nationality: auth.user.COUNTRY_ID || '',
        gender: auth.user.GENDER || '',
        marital_status: auth.user.MARITAL_STATUS || '',
        domicile_province: auth.user.PROVINCE_ID || '',
        profile_image: auth.user.PROFILE_IMAGE || null,
    }

    const validations = Yup.object({
        first_name: Yup.string().required('Name is required!'),
        last_name: Yup.string().required('Surname is required!'),
        cnic_no: Yup.string()
        .matches(/^\d{13}$/, 'CNIC No. invalid!')
        .required('CNIC is required!'),
        mobile_no: Yup.string().matches(/^[1-9]\d{9}$/, {message: "Please enter valid number.", excludeEmptyString: false}),
        email: Yup.string().email('Invalid email format').required('Email is required!'),
    });

    const submitHandler = async (values, { setFieldValue, resetForm }) => {
        setLoading(true);
        
        if(values.profile_image &&
            typeof values.profile_image === 'object' &&
            values.profile_image.name !== undefined &&
            values.profile_image !== auth.user.PROFILE_IMAGE
        ) {
            const data = new FormData()
            const filename = Date.now() + values.profile_image.name
            data.append("profile_image", filename)
            data.append("file", values.profile_image)
            
            try {
                const response = await dispatch(uploadImage(data))
                console.log(response)
                values.profile_image = response.path
            } catch (error) {
                console.log(error.response.data.error_message)
            }
        }

    
        try {
            // values.profile_image = filename.name;
            const response = await dispatch(updateUser(values, auth.user.USER_ID));
    
            if (response?.success) {
                Alert({ status: true, text: "Profile Saved." });
                setFieldValue('profile_image', null)
            } else {
                Alert({ status: false, text: "Failed to save profile." });
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            Alert({ status: false, text: "An error occurred." });
        }
    
        setLoading(false);
        resetForm({ values: values });
    };
    
  return (
    <div>
        <div className="d-flex gap-2 align-items-center flex-wrap">
            <div className="profile-img position-relative">
                <img
                    src={preview || (auth.user.PROFILE_IMAGE ? import.meta.env.VITE_BACKEND_URL+auth.user.PROFILE_IMAGE : dummyPic)} // 
                    width={150}
                    height={150}
                    className="rounded-circle border border-2 cursor-pointer"
                    alt="Profile"
                    style={{ objectFit: "cover" }}
                    />
            </div>
            <div className="basic-info">
                <h1>{`${auth.user.FIRST_NAME || ''}`}</h1>
                <p className="lead">
                    {auth.user.EMAIL || ''}
                </p>
                <CButton variant='warning' className='btn btn-warning btn-sm'
                onClick={handleChangePic}
                >
                    Upload Picture
                </CButton>
            </div>
        </div>
        <Formik
        initialValues={initialValues}
        validationSchema={validations}
        onSubmit={submitHandler}>
            {({ setFieldValue }) =>{
                return (
                    <Form encType='multipart/form-data'>
                    <input
                        name='profile_image'
                        accept='image/*'
                        id='contained-button-file'
                        type='file'
                        hidden
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setFieldValue('profile_image', file); // Store file instead of base64
                                setPreview(URL.createObjectURL(file)); // Show image preview
                            }
                        }}                
                        ref={changePicRef}
                    />
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='Name' name='first_name' />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='Surname' name='last_name' />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label="Father's Name" name='fname' />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='CNIC No.' name='cnic_no' disabled
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 13);
                                    }}
                                    />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='Mobile No. (without leading zero)' name='mobile_no'
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                    }}
                                    />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <CustomSelect
                                    className='form-control mt-2' 
                                    options={[
                                        {key: 'islam', value: 'Islam'},
                                        {key: 'christianity', value: 'Christianity'},
                                        {key: 'hinduism', value: 'Hinduism'},
                                        {key: 'sikhism', value: 'Sikhism'},
                                        {key: 'buddhism', value: 'Buddhism'},
                                        {key: 'judaism', value: 'Judaism'}
                                    ]} 
                                    label='Religion' 
                                    name='religion' 
                                    onChange={(selectedOption) => {
                                        setFieldValue('religion', selectedOption?.key || '');
                                    }}
                                    />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='radio' label='Gender' name='gender' 
                                    options={[
                                        {key: 'M', value: 'Male'},
                                        {key: 'F', value: 'Female'},
                                    ]} />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='radio' label='Marital Status' name='marital_status' 
                                    options={[
                                        {key: 1, value: 'Single'},
                                        {key: 2, value: 'Married'},
                                        {key: 3, value: 'Widowed'},
                                        {key: 4, value: 'Divorced'}
                                    ]} />
                                </div>                                
                                <div className="col-sm-3 my-2">
                                    <FormControl control='date' type='date' label='Date of Birth' name='date_of_birth' />
                                </div>
                                <div className="col-sm-3 my-2">
                                    <FormControl className='form-control mt-2' control='input' type='text' label='Place of Birth' name='place_of_birth' />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' as='textarea' label='Present Address' name='home_address' />
                                </div>
                                <fieldset className='border border-2 p-2'>
                                    <legend className='fw-bold'>Domicile Details</legend>
                                    <div className="row">
                                        <div className="col-sm-6 my-2">
                                            <CustomSelect
                                                className='form-control mt-2'
                                                options={countryOptions}
                                                label='Country'
                                                name='country_id'
                                                onChange={(selectedOption) => {
                                                    setFieldValue('country_id', selectedOption?.key || '');
                                                    handleCountryChange(selectedOption?.key); // Fetch provinces dynamically
                                                }}
                                            />
                                        </div>
                                        <div className="col-sm-6 my-2">
                                            <CustomSelect 
                                            className='form-control mt-2' 
                                            options={provinceOptions} 
                                            label='Domicile Province' 
                                            name='province_id' 
                                            onChange={(selectedOption) => {
                                                setFieldValue('province_id', selectedOption?.key || '');
                                                handleProvinceChange(selectedOption?.key); // Fetch provinces dynamically
                                            }}
                                            />
                                        </div>
                                        <div className="col-sm-6 my-2">
                                            <CustomSelect 
                                            className='form-control mt-2' 
                                            options={districtOptions} 
                                            label='Domicile District' 
                                            name='district_id' 
                                            />
                                        </div>
                                        <div className="col-sm-6 my-2">
                                            <FormControl control='input' as='textarea' label='Permanent Address' name='permanent_address' />
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div className="form-group text-center">
                            <button className="btn btn-primary bg-primary rounded-pill my-2 p-2 px-4" type='submit' disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                        </div>
                    </Form>
                )
  }}
        </Formik>
    </div>
  )
}

export default Profile