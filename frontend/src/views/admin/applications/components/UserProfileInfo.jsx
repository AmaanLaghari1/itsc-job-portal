import { Form, Formik, Field } from "formik"
import Alert from "../../../../components/Alert"
import { useLocation, useNavigate } from "react-router-dom"
import {
    CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell,
    CTableRow,
    CAccordionItem,
    CAccordion,
    CAccordionBody,
    CAccordionHeader,
    CSpinner,
} from '@coreui/react'
import { useEffect, useState } from "react"
import { getUserById } from "../../../../api/UserRequest"
import { getApplication, getApplicationById, updateUserApplicationData } from "../../../../api/ApplicationRequest"

const UserProfileInfo = () => {
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const { prevData } = location.state || {}
    const [applicationData, setApplicationData] = useState(prevData || {})

    const getUserData = async (id) => {
        try {
            const response = await getUserById(id)
            setUserData(response.data.data)
        } catch (error) {
            // console.log(error)
        }
    }

    const fetchApplicationData = async (id) => {
        try {
            const response = await getApplicationById(id)
            setApplicationData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchApplicationData(prevData.APPLICATION_ID)
        if (applicationData?.USER_ID) getUserData(applicationData.USER_ID);
        setLoading(false)
    }, []);


    // Example static user data
    const user = {
        EMAIL: userData?.EMAIL ?? '',
        FIRST_NAME: userData?.FIRST_NAME ?? '',
        LAST_NAME: userData?.LAST_NAME ?? '',
        FNAME: userData?.FNAME ?? '',
        CNIC_NO: userData?.CNIC_NO ?? '',
        DATE_OF_BIRTH: userData?.DATE_OF_BIRTH ?? '',
        PLACE_OF_BIRTH: userData?.PLACE_OF_BIRTH ?? '',
        MOBILE_NO: userData?.MOBILE_NO ?? '',
        GENDER: userData?.GENDER ?? '',
        RELIGION: userData?.RELIGION ?? '',
        MARITAL_STATUS: userData?.MARITAL_STATUS ?? '',
        COUNTRY_ID: userData?.COUNTRY_ID ?? '',
        PROVINCE_ID: userData?.PROVINCE_ID ?? '',
        DISTRICT_ID: userData?.DISTRICT_ID ?? '',
        HOME_ADDRESS: userData?.HOME_ADDRESS ?? '',
        PERMANENT_ADDRESS: userData?.PERMANENT_ADDRESS ?? '',
        PROFILE_IMAGE: userData?.PROFILE_IMAGE ?? ''
    }

    // console.log(userData)
    const fields = [
        { key: "EMAIL", label: "Email" },
        { key: "FIRST_NAME", label: "Firstname" },
        { key: "LAST_NAME", label: "Lastname" },
        { key: "FNAME", label: "Father's Name" },
        { key: "CNIC_NO", label: "CNIC No." },
        { key: "DATE_OF_BIRTH", label: "Date of Birth" },
        { key: "PLACE_OF_BIRTH", label: "Place of Birth" },
        { key: "MOBILE_NO", label: "Mobile No." },
        { key: "GENDER", label: "Gender" },
        { key: "RELIGION", label: "Religion" },
        { key: "MARITAL_STATUS", label: "Marital Status" },
        { key: "COUNTRY_ID", label: "Country ID" },
        { key: "PROVINCE_ID", label: "Province ID" },
        { key: "DISTRICT_ID", label: "District ID" },
        { key: "HOME_ADDRESS", label: "Home Address" },
        { key: "PERMANENT_ADDRESS", label: "Permanent Address" },
        { key: "PROFILE_IMAGE", label: "Profile Picture" },
    ]

    const unmatchingFields = fields.filter(field => user[field.key] != applicationData[field.key])

    return (
        <div className="my-2">
            <div className={`position-relative`}>
                {/* Blur effect overlay */}
                {loading ?
                    <CSpinner className='align-slef-start my-3' color='primary' />
                    :
                    (
                        <div>
                            <h3 className="bg-primary text-light p-2">Basic Information</h3>
                            <CAccordion flush>
                                <CAccordionItem>
                                    <CAccordionHeader>
                                        <h5>PROFILE</h5>
                                    </CAccordionHeader>
                                    <CAccordionBody>
                                        <Formik
                                            initialValues={{
                                                selectedFields: {},
                                                selectAll: false,
                                            }}
                                            onSubmit={async (values) => {
                                                setLoading(true)
                                                let selectedUserData = {}

                                                Object.keys(values.selectedFields).forEach((fieldKey) => {
                                                    if (values.selectedFields[fieldKey]) {
                                                        selectedUserData[fieldKey] = userData[fieldKey]
                                                    }
                                                })

                                                if (Object.keys(selectedUserData).length === 0) {
                                                    Alert({ status: false, text: "Please select at least one field to update!" });
                                                    setLoading(false);
                                                    return;
                                                }

                                                try {
                                                    const response = await updateUserApplicationData(selectedUserData, applicationData.APPLICATION_ID)
                                                    // console.log(response)
                                                    Alert({ status: true, text: response?.data?.message || 'Application created successfully' });
                                                    // navigate('/admin/applications')
                                                    setApplicationData(prev => ({
                                                        ...prev,
                                                        ...selectedUserData
                                                    }));
                                                } catch (error) {
                                                    console.log(error)
                                                }
                                                setLoading(false)
                                            }}
                                        >
                                            {({ values, setFieldValue }) => (
                                                <Form>
                                                    <div className="table-responsive">
                                                        <CTable bordered hover>
                                                            <CTableHead>
                                                                <CTableRow>
                                                                    <CTableHeaderCell align="center" className="col-1 bg-primary text-light">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={values.selectAll}
                                                                            onChange={(e) => {
                                                                                const isChecked = e.target.checked
                                                                                setFieldValue("selectAll", isChecked)

                                                                                // Set all fields at once
                                                                                fields.forEach((field) => {
                                                                                    setFieldValue(`selectedFields.${field.key}`, isChecked)
                                                                                })
                                                                            }}
                                                                        />
                                                                        {/* <label className="ms-1"></label> */}
                                                                    </CTableHeaderCell>
                                                                    <CTableHeaderCell align="center" className="col-3 bg-primary text-light">
                                                                        Column
                                                                    </CTableHeaderCell>
                                                                    <CTableHeaderCell align="center" className="col-4 bg-primary text-light">
                                                                        Application Data
                                                                    </CTableHeaderCell>
                                                                    <CTableHeaderCell align="center" className="col-4 bg-primary text-light">
                                                                        User Data
                                                                    </CTableHeaderCell>
                                                                </CTableRow>
                                                            </CTableHead>
                                                            <CTableBody>
                                                                {(() => {

                                                                    if (unmatchingFields.length === 0) {
                                                                        return (
                                                                            <CTableRow>
                                                                                <CTableDataCell colSpan={4} className="text-center text-muted">
                                                                                    Nothing to update
                                                                                </CTableDataCell>
                                                                            </CTableRow>
                                                                        );
                                                                    }

                                                                    return unmatchingFields.map((field) => (
                                                                        <CTableRow key={field.key}>
                                                                            <CTableDataCell align="center">
                                                                                <Field
                                                                                    type="checkbox"
                                                                                    name={`selectedFields.${field.key}`}
                                                                                    checked={values.selectedFields[field.key] || false}
                                                                                    onChange={(e) => {
                                                                                        const checked = e.target.checked;
                                                                                        setFieldValue(`selectedFields.${field.key}`, checked);

                                                                                        // Handle "Select All" toggle safely AFTER event
                                                                                        if (!checked) {
                                                                                            setFieldValue("selectAll", false);
                                                                                        } else {
                                                                                            const allChecked = unmatchingFields.every(
                                                                                                (f) =>
                                                                                                    f.key === field.key
                                                                                                        ? checked
                                                                                                        : values.selectedFields[f.key]
                                                                                            );
                                                                                            setFieldValue("selectAll", allChecked);
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            </CTableDataCell>
                                                                            <CTableDataCell>{field.label}</CTableDataCell>
                                                                            <CTableDataCell>{applicationData[field.key]}</CTableDataCell>
                                                                            <CTableDataCell>{user[field.key]}</CTableDataCell>
                                                                        </CTableRow>
                                                                    ));
                                                                })()}
                                                            </CTableBody>

                                                        </CTable>
                                                    </div>
                                                    <button
                                                        disabled={loading}
                                                        className="btn btn-primary my-3 mt-1"
                                                        type="submit"
                                                    >
                                                        {
                                                            loading ?
                                                                'Updating...' :
                                                                'Update'
                                                        }
                                                    </button>

                                                </Form>
                                            )}
                                        </Formik>
                                    </CAccordionBody>
                                </CAccordionItem>
                            </CAccordion>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default UserProfileInfo