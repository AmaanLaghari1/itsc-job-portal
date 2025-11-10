import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getUserApplicationExperience, updateExperience } from "../../../../api/ApplicationRequest"
import { getExperience } from "../../../../api/ExperienceRequest"
import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react"
import { Formik, Form } from "formik"
import { getNestedValue } from "../../../../helper"
import Alert from "../../../../components/Alert"

const UserExperienceInfo = () => {
  const [userExperience, setUserExperience] = useState([])
  const [applicationExperience, setApplicationExperience] = useState([])
  const location = useLocation()
  const { prevData } = location.state || {}

  const fetchApplicationData = async () => {
    try {
      const response = await getUserApplicationExperience(prevData.APPLICATION_ID)
      // console.log(response)
      setApplicationExperience(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUserData = async () => {
    try {
      const response = await getExperience(prevData.USER_ID)
      // console.log(response)
      setUserExperience(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fields = [
    {
      id: 'EMP_TYPE',
      displayKey: 'EMP_TYPE',
      dataKey: 'EMP_TYPE',
      label: 'Employment Type'
    },
    {
      id: 'ORGANIZATION_NAME',
      displayKey: 'ORGANIZATION_NAME',
      dataKey: 'ORGANIZATION_NAME',
      label: 'Organization Name'
    },
    {
      id: 'ADDRESS',
      displayKey: 'ADDRESS',
      dataKey: 'ADDRESS',
      label: 'Address'
    },
    {
      id: 'CONTACT_NO',
      displayKey: 'CONTACT_NO',
      dataKey: 'CONTACT_NO',
      label: 'Contact No.'
    },
    {
      id: 'START_DATE',
      displayKey: 'START_DATE',
      dataKey: 'START_DATE',
      label: 'Start Date'
    },
    {
      id: 'END_DATE',
      displayKey: 'END_DATE',
      dataKey: 'END_DATE',
      label: 'End Date'
    },
    {
      id: 'JOB_DESCRIPTION',
      displayKey: 'JOB_DESCRIPTION',
      dataKey: 'JOB_DESCRIPTION',
      label: 'Job Description'
    },
    {
      id: 'SALARY',
      displayKey: 'SALARY',
      dataKey: 'SALARY',
      label: 'Salary'
    },
    {
      id: 'REASON_FOR_LEAVING',
      displayKey: 'REASON_FOR_LEAVING',
      dataKey: 'REASON_FOR_LEAVING',
      label: 'Reason for leaving'
    },
  ]

  useEffect(() => {
    fetchApplicationData()
    fetchUserData()
  }, [])
  return (
    applicationExperience.length > 0 &&
    <div className="my-2">
      <h3 className="bg-primary text-light p-2">Experience</h3>
      {
        applicationExperience.map((exp, i) => {
          const matchingUserExp = userExperience.find(
            (uq) => uq.USER_ID === exp.USER_ID
          )

          console.log(exp)
          return (
            <div key={exp.EXPERIENCE_ID}>
              <CAccordion flush>
                <CAccordionItem>
                  <CAccordionHeader>
                    <h5>
                      {exp.ORGANIZATION_NAME}
                    </h5>
                  </CAccordionHeader>
                  <CAccordionBody>
                    <Formik
                      initialValues={{
                        selectAll: false,
                        selectedFields: {},
                      }}
                      onSubmit={async (values) => {
                        try {
                          const selectedKeys = Object.entries(values.selectedFields)
                            .filter(([_, isChecked]) => isChecked)
                            .map(([id]) => id)

                          if (selectedKeys.length === 0) {
                            Alert({ status: false, text: "Please select at least one field to update!" })
                          }

                          let payload = selectedKeys.reduce((acc, id) => {
                            const field = fields.find((f) => f.id === id)
                            let value = getNestedValue(matchingUserExp, field.displayKey)

                            acc[field.dataKey] = value
                            return acc
                          }, {})

                          const response = await updateExperience(payload, exp.EXPERIENCE_ID)

                          if (response.status === 200 || response.data?.success) {
                            Alert({ status: true, text: `Successfully updated ${exp.ORGANIZATION_NAME}` })
                            fetchApplicationData(prevData.APPLICATION_ID)
                          } else {
                            Alert({ status: false, text: "Failed to update experience. Please try again." })
                          }
                        } catch (error) {
                          console.log(error)
                        }
                      }}
                    >
                      {
                        ({ values, setFieldValue }) => (
                          <Form>
                            <CTable bordered hover>
                              <CTableHead color="light">
                                <CTableRow>
                                  <CTableHeaderCell
                                    align="center"
                                    className="col-1 bg-primary text-light"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={values.selectAll}
                                      onChange={(e) => {
                                        const isChecked = e.target.checked
                                        setFieldValue("selectAll", isChecked)
                                        const allSelected = {}
                                        fields.forEach((f) => (allSelected[f.id] = isChecked))
                                        setFieldValue("selectedFields", allSelected)
                                      }}
                                    />
                                  </CTableHeaderCell>
                                  <CTableHeaderCell
                                    align="center"
                                    className="col-3 bg-primary text-light"
                                  >
                                    Column
                                  </CTableHeaderCell>
                                  <CTableHeaderCell
                                    align="center"
                                    className="col-4 bg-primary text-light"
                                  >
                                    Application Data
                                  </CTableHeaderCell>
                                  <CTableHeaderCell
                                    align="center"
                                    className="col-4 bg-primary text-light"
                                  >
                                    User Data
                                  </CTableHeaderCell>
                                </CTableRow>
                              </CTableHead>
                              <CTableBody>
                                {fields
                                  .filter((field) => {
                                    const appValue = getNestedValue(exp, field.displayKey)
                                    const userValue = matchingUserExp ? getNestedValue(matchingUserExp, field.displayKey) : ""

                                    // Normalize empty/null/undefined
                                    const normalize = (v) =>
                                      v === null || v === undefined || v === "" || v === "-" ? "" : String(v).trim()

                                    return normalize(appValue) !== normalize(userValue)
                                  })
                                  .map((field) => (
                                    <CTableRow key={field.id}>
                                      <CTableDataCell align="center">
                                        <input
                                          type="checkbox"
                                          checked={values.selectedFields[field.id] || false}
                                          onChange={(e) =>
                                            setFieldValue(`selectedFields.${field.id}`, e.target.checked)
                                          }
                                        />
                                      </CTableDataCell>
                                      <CTableDataCell>{field.label}</CTableDataCell>
                                      <CTableDataCell>
                                        {getNestedValue(applicationExperience[i], field.displayKey)}
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        {matchingUserExp ? getNestedValue(matchingUserExp, field.id) : "-"}
                                      </CTableDataCell>
                                    </CTableRow>
                                  ))
                                  .concat(
                                    fields.filter((field) => {
                                      const appValue = getNestedValue(exp, field.displayKey)
                                      const userValue = matchingUserExp ? getNestedValue(matchingUserExp, field.displayKey) : ""
                                      const normalize = (v) =>
                                        v === null || v === undefined || v === "" || v === "-" ? "" : String(v).trim()
                                      return normalize(appValue) !== normalize(userValue)
                                    }).length === 0
                                      ? [
                                        <CTableRow key="no-diff">
                                          <CTableDataCell colSpan={4} className="text-center text-muted">
                                            Nothing to update!
                                          </CTableDataCell>
                                        </CTableRow>,
                                      ]
                                      : []
                                  )}
                              </CTableBody>
                            </CTable>

                            <div className="mt-2">
                              <CButton type="submit" color="primary">
                                Update
                              </CButton>
                            </div>
                          </Form>
                        )
                      }
                    </Formik>
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            </div>
          )
        })
      }

    </div>
  )
}

export default UserExperienceInfo