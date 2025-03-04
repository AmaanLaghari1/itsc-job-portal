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

const Profile = () => {
    const auth = useSelector(state => state.auth.authData)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState(null); // Image preview state
    const [data, setData] = useState({
        cities: [],
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
                const [citiesRes, countriesRes, districtsRes, provincesRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}cities`),
                    axios.get(`${import.meta.env.VITE_API_URL}countries`),
                    axios.get(`${import.meta.env.VITE_API_URL}districts`),
                    axios.get(`${import.meta.env.VITE_API_URL}provinces`)
                ]);

                setData({
                    cities: citiesRes.data?.options || [],
                    countries: countriesRes.data?.options || [],
                    districts: districtsRes.data?.options || [],
                    provinces: provincesRes.data?.options || []
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    // Generic function to map options
    const mapOptions = (items, idKey, nameKey) =>
        items.map(item => ({ key: item[idKey], value: item[nameKey] }));

    const cityOptions = mapOptions(data.cities, "CITY_ID", "CITY_NAME");
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
        phone: auth.user.PHONE || '',
        home_address: auth.user.HOME_ADDRESS || '',
        permanent_address: auth.user.PERMANENT_ADDRESS || '',
        date_of_birth: new Date(auth.user.DATE_OF_BIRTH) || '',
        place_of_birth: auth.user.PLACE_OF_BIRTH || '',
        city_id: auth.user.CITY_ID || '',
        district_id: auth.user.DISTRICT_ID || '',
        province_id: auth.user.PROVINCE_ID || '',
        country_id: auth.user.COUNTRY_ID || '',
        religion: auth.user.RELIGION || '',
        nationality: auth.user.NATIONALITY || '',
        gender: auth.user.GENDER || '',
        marital_status: auth.user.MARITAL_STATUS || '',
        domicile_province: auth.user.DOMICILE_PROVINCE || '',
        district: auth.user.DISTRICT || '',
        profile_image: null,
    }
// console.log(auth.user.DOMICILE_PROVINCE);
    const validations = Yup.object({
        first_name: Yup.string().required('Name is required!'),
        last_name: Yup.string().required('Surname is required!'),
        cnic_no: Yup.string()
        .matches(/^\d{13}$/, 'CNIC No. invalid!')
        .required('CNIC is required!'),
        mobile_no: Yup.string().matches(/^[1-9]\d{9}$/, {message: "Please enter valid number.", excludeEmptyString: false}),
        phone: Yup.string().matches(/^[1-9]\d{9}$/, {message: "Please enter valid number.", excludeEmptyString: false}),
        email: Yup.string().email('Invalid email format').required('Email is required!'),
    });

    const submitHandler = async (values, { setFieldValue, resetForm }) => {
        setLoading(true);
        
        if(values.profile_image){
            const data = new FormData()
            const filename = Date.now() + values.profile_image.name
            data.append("profile_image", filename)
            data.append("file", values.profile_image)
            
            try {
                const response = await dispatch(uploadImage(data))
                console.log(response)
                values.profile_image = response.path
            } catch (error) {
                console.log(error)
            }
        }

    
        try {
            // values.profile_image = filename.name;
            const response = await dispatch(updateUser(values, auth.user.USER_ID));
    
            if (response?.success) {
                Alert({ status: true, text: "Profile Saved." });
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
                    src={preview || (auth.user.PROFILE_IMAGE !== null ? import.meta.env.VITE_BACKEND_URL+auth.user.PROFILE_IMAGE : dummyPic)} // 
                    width={150}
                    height={150}
                    className="rounded-circle border border-2 cursor-pointer"
                    alt="Profile"
                    style={{ objectFit: "cover" }}
                    onClick={handleChangePic}
                />
                {/* <CButton variant='dark' className='change-pic-btn btn btn-light btn-sm position-absolute top-50 start-50 translate-middle cursor-pointer mt-2'
                >Change Picture</CButton> */}
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
                            {/* <FormControl ref={changePicRef} className='d-none' control='input' type="file" name='profile_image' onChange={handleFileInput} /> */}
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
                                    <FormControl control='input' type='text' label='Mobile No. (non-zero digits)' name='mobile_no'
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                    }}
                                    />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='Telephone No. (non-zero digits)' name='phone'
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                    }}
                                    />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='Permanent Address' name='permanent_address' />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='Present Address' name='home_address' />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='radio' label='Gender' name='gender' 
                                    options={[
                                        {key: 'M', value: 'Male'},
                                        {key: 'F', value: 'Female'},
                                    ]} />
                                </div>
                                <div className="col-sm-3 my-2">
                                    <FormControl control='date' type='date' label='Date of Birth' name='date_of_birth' />
                                </div>
                                <div className="col-sm-3 my-2">
                                    <FormControl className='form-control mt-2' control='input' type='text' label='Place of Birth' name='place_of_birth' />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <CustomSelect className='form-control mt-2' options={cityOptions} label='City' name='city_id' />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <CustomSelect className='form-control mt-2' options={districtOptions} label='District' name='district_id' />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <CustomSelect className='form-control mt-2' options={provinceOptions} label='Province' name='province_id' />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <CustomSelect className='form-control mt-2' options={countryOptions} label='Country' name='country_id' />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' className='form-control mt-2' label='Domicile District' name='district' />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' className='form-control mt-2' label='Domicile Province' name='domicile_province' />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl className='form-control mt-2' control='input' type='text' label='Religion' name='religion' />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl className='form-control mt-2' control='input' type='text' label='Nationality' name='nationality' />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='radio' label='Marital Status' name='marital_status' 
                                    options={[
                                        {key: 1, value: 'Single'},
                                        {key: 2, value: 'Married'},
                                        {key: 3, value: 'Widowed'}
                                    ]} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group text-center">
                            <button className="btn btn-primary btn-lg my-2 rounded-0 px-3" type='submit' disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                        </div>
                    </Form>
                )
  }}
        </Formik>
    </div>
  )
}

export default Profile