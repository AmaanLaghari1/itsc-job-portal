import { Form, Formik } from 'formik'
import { useRef, useEffect, useState } from 'react'
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
import { useLocation, useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { return_url, announcement } = location.state || {}
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

    // console.log(auth.user);

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
        district_id: parseInt(auth.user.DISTRICT_ID) || 0,
        province_id: parseInt(auth.user.PROVINCE_ID) || 0,
        country_id: parseInt(auth.user.COUNTRY_ID) || 160,
        religion: auth.user.RELIGION ? auth.user.RELIGION.toLowerCase() : '',
        nationality: parseInt(auth.user.COUNTRY_ID) || '',
        gender: auth.user.GENDER || '',
        marital_status: auth.user.MARITAL_STATUS || 0,
        domicile_province: auth.user.PROVINCE_ID || 0,
        profile_image: auth.user.PROFILE_IMAGE || null,
    }
    // console.log(auth.user.PROVINCE_ID)

    const validations = Yup.object({
        first_name: Yup.string().required('Name is required!'),
        last_name: Yup.string().required('Surname is required!'),
        cnic_no: Yup.string()
        .matches(/^\d{13}$/, 'CNIC No. invalid!')
        .required('CNIC is required!'),
        // mobile_no: Yup.string().matches(/^[0-9]\d{9}$/, {message: "Please enter valid number.", excludeEmptyString: false}),
        mobile_no: Yup.string().required('Mobile No. required'),
        email: Yup.string().email('Invalid email format').required('Email is required!'),
        date_of_birth: Yup.string().required('Date of birth required'),
        gender: Yup.string().required('Gender is required!'),
        marital_status: Yup.string().required('Marital Status is required!'),
        place_of_birth: Yup.string().required('Place of Birth is required!'),
        religion: Yup.string().required('Religion is required!'),
        country_id: Yup.string().required('Country is required!'),
        province_id: Yup.string().required('Province is required!'),
        district_id: Yup.string().required('District is required!')
    });

    const submitHandler = async (values, { setFieldValue, resetForm }) => {
        setLoading(true);
        values.date_of_birth = values.date_of_birth ? new Date(values.date_of_birth).toISOString().split('T')[0] : null;
        
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
                // console.log(response)
                values.profile_image = response.path
            } catch (error) {
                console.log(error.response.data.error_message)
            }
        }

    
        try {
            // values.profile_image = filename.name;
            const response = await dispatch(updateUser(values, auth.user.USER_ID));
    
            if (response?.success) {
                if(return_url != {}){
                    navigate(return_url, {
                        state: {
                            announcement: announcement
                        }
                    })
                }
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
                    src={preview || (auth.user.PROFILE_IMAGE ? import.meta.env.VITE_ASSET_URL+auth.user.PROFILE_IMAGE : dummyPic)} // 
                    width={150}
                    height={150}
                    className="rounded-circle border border-2 cursor-pointer"
                    alt="Profile"
                    style={{ objectFit: "cover" }}
                    />
            </div>
            <div className="basic-info">
                <h1>{`${auth.user.FIRST_NAME || ''} ${auth.user.LAST_NAME}`}</h1>
                <p className="lead">
                    {auth.user.EMAIL || ''}
                </p>
                <CButton variant='light' className='btn btn-outline-success btn-sm'
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
                                    <FormControl control='input' type='text' label='Name' name='first_name' required={true} />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='Surname' name='last_name' required={true} />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label="Father's Name" name='fname' required={true} />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='CNIC No.' name='cnic_no' disabled
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 13);
                                    }}
                                    />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='Mobile No.' name='mobile_no' required={true}
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 11);
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
                                        {key: 'other', value: 'Other'},
                                    ]} 
                                    label='Religion' 
                                    name='religion'
                                    id='religion'
                                    onChange={(selectedOption) => {
                                        setFieldValue('religion', selectedOption?.key || '');
                                    }}
                                    />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='radio' label='Gender' name='gender' required={true}
                                    options={[
                                        {key: 'M', value: 'Male'},
                                        {key: 'F', value: 'Female'},
                                    ]} />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='radio' label='Marital Status' name='marital_status' required={true}
                                    options={[
                                        {key: 1, value: 'Single'},
                                        {key: 2, value: 'Married'},
                                        {key: 3, value: 'Widowed'},
                                        {key: 4, value: 'Divorced'}
                                    ]} />
                                </div>                                
                                <div className="col-sm-3 my-2">
                                    <FormControl className="form-control mt-2" control='date' type='date' label='Date of Birth' name='date_of_birth' required={true} />
                                </div>
                                <div className="col-sm-3 my-2">
                                    <FormControl className='form-control mt-2' control='input' type='text' label='Place of Birth' name='place_of_birth' required={true} />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' as='textarea' label='Present Address' name='home_address' required={true} />
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
                                                required={true}
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
                                            required={true}
                                            />
                                        </div>
                                        <div className="col-sm-6 my-2">
                                            <CustomSelect 
                                            className='form-control mt-2' 
                                            options={districtOptions} 
                                            label='Domicile District' 
                                            name='district_id'
                                            required={true} 
                                            />
                                        </div>
                                        <div className="col-sm-6 my-2">
                                            <FormControl control='input' as='textarea' label='Permanent Address' name='permanent_address'
                                            required={true}
                                            />
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div className="form-group text-center">
                            <button className="btn btn-primary fs-5 rounded-pill my-2 p-2 px-4" type='submit' disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                        </div>
                    </Form>
                )
  }}
        </Formik>
    </div>
  )
}

export default Profile