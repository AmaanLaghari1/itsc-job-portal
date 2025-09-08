import {
  CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell,
  CTableRow
} from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Formik, Field } from 'formik'
import { useSelector } from 'react-redux'
import { updateUserApplicationData } from '../../../api/ApplicationRequest'
import Alert from '../../../components/Alert';
import { useEffect, useState } from 'react'
import { getUserById } from '../../../api/UserRequest'

const ApplicationUpdateUser = () => {
  const auth = useSelector(state => state.auth.authData)
  const [userData, setUserData] = useState()
  const location = useLocation()
  const navigate = useNavigate()
  const [disabled, setDisabled] = useState(true)
  const { prevData } = location.state || {}

  const getUserData = async (id) => {
    try {
      const response = await getUserById(id)
      setUserData(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {getUserData(prevData.USER_ID)}, [])


  // Example static user data
  const user = {
    EMAIL: userData?.EMAIL??'',
    FIRST_NAME: userData?.FIRST_NAME??'',
    LAST_NAME: userData?.LAST_NAME??'',
    FNAME: userData?.FNAME??'',
    CNIC_NO: userData?.CNIC_NO??'',
    DATE_OF_BIRTH: userData?.DATE_OF_BIRTH??'',
    PLACE_OF_BIRTH: userData?.PLACE_OF_BIRTH??'',
    MOBILE_NO: userData?.MOBILE_NO??'',
    GENDER: userData?.GENDER??'',
    RELIGION: userData?.RELIGION??'',
    MARITAL_STATUS: userData?.MARITAL_STATUS??'',
    COUNTRY_ID: userData?.COUNTRY_ID??'',
    PROVINCE_ID: userData?.PROVINCE_ID??'',
    DISTRICT_ID: userData?.DISTRICT_ID??'',
    HOME_ADDRESS: userData?.HOME_ADDRESS??'',
    PERMANENT_ADDRESS: userData?.PERMANENT_ADDRESS??''
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
  ]

  return (
    <Formik
      initialValues={{
        selectedFields: {},
        selectAll: false,
      }}
      onSubmit={async (values) => {
        let selectedUserData = {}

        Object.keys(values.selectedFields).forEach((fieldKey) => {
          if (values.selectedFields[fieldKey]) {
            selectedUserData[fieldKey] = userData[fieldKey]
          }
        })

        try {
          const response = await updateUserApplicationData(selectedUserData, prevData.APPLICATION_ID)
          // console.log(response)
          Alert({ status: true, text: response?.data?.message || 'Application created successfully' });
          navigate('/admin/applications')
        } catch (error) {
          console.log(error)
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="table-responsive">
            <CTable>
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
                {fields.map((field) => (
                  <CTableRow key={field.key}>
                    <CTableDataCell align="center">
                      <Field
                        type="checkbox"
                        name={`selectedFields.${field.key}`}
                        checked={values.selectedFields[field.key] || false}
                        onChange={(e) => {
                          setFieldValue(`selectedFields.${field.key}`, e.target.checked)

                          // If any row unchecked → uncheck Select All
                          if (!e.target.checked) {
                            setFieldValue("selectAll", false)
                          } else {
                            // If all rows checked → check Select All
                            const allChecked = fields.every(
                              (f) =>
                                f.key === field.key
                                  ? e.target.checked
                                  : values.selectedFields[f.key]
                            )
                            setFieldValue("selectAll", allChecked)
                          }
                        }}
                      />
                    </CTableDataCell>
                    <CTableDataCell>{field.label}</CTableDataCell>
                    <CTableDataCell>{prevData[field.key]}</CTableDataCell>
                    <CTableDataCell>{user[field.key]}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>

          <button disabled={!Object.values(values.selectedFields).some(v => v)}
          className="btn btn-primary my-3 mt-1" type="submit">
            Update
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default ApplicationUpdateUser
