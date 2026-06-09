import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { addExperience, getUserApplicationExperience, updateExperience, deleteExperience } from "../../../../api/ApplicationRequest"
import { getExperience } from "../../../../api/ExperienceRequest"
import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CButton, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react"
import { Formik, Form } from "formik"
import { getNestedValue } from "../../../../helper"
import Alert from "../../../../components/Alert"
import AlertConfirm from "../../../../components/AlertConfirm"

const UserExperienceInfo = () => {
  const [userExperience, setUserExperience] = useState([])
  const [applicationExperience, setApplicationExperience] = useState([])
  const location = useLocation()
  const { prevData } = location.state || {}
  const [loading, setLoading] = useState(false)

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
      id: 'JOB_TITLE',
      displayKey: 'JOB_TITLE',
      dataKey: 'JOB_TITLE',
      label: 'Job Title'
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

  const unmatchedExperiences = userExperience.filter(
    (userExp) =>
      !applicationExperience.some(
        (appExp) => appExp.EXPERIANCE_ID === userExp.EXPERIANCE_ID
      )
  )

  const handleExpDelete = async (expId) => {
    try {
      const confirm = await AlertConfirm({
        title: "Are you sure you want to delete this experience from the application?",
      })
      if (!confirm) {
        return
      }
      setLoading(true)
      const response = await deleteExperience({ exp_id: expId })
      Alert({ status: true, text: `Successfully deleted experience from application` })
    } catch (error) {
      console.log(error)
      Alert({ status: false, text: "Failed to delete experience" })
    } finally {
      setLoading(false)
      fetchApplicationData()
    }
  }

  const handleAddExperience = async (exp, appId) => {
    try {
      const confirm = await AlertConfirm({
        title: "Add this experience to the application?",
      })
      if (!confirm) {
        return
      }
      setLoading(true)

      const payload = exp
      payload.APPLICATION_ID = appId
      const response = await addExperience({ data: payload })
      Alert({ status: true, text: response.data.message || "Experience added successfully..." })
    } catch (error) {
      Alert({ status: false, text: error.response?.data?.error_message || "Failed to add experience. Please try again." })
      console.error("Error adding this experience:", error)
    } finally {
      fetchApplicationData()
      setLoading(false)
    }
  }

  return (
    loading ?
      <CSpinner className='align-slef-start my-3' color='primary' />
      :
      applicationExperience.length > 0 &&
      <div className="my-2">
        <h3 className="bg-primary text-light p-2">Experience</h3>
        {
          applicationExperience.map((exp, i) => {
            const matchingUserExp = userExperience.find(
              (uq) => uq.EXPERIANCE_ID == exp.EXPERIANCE_ID
            )

            return (
              <div key={exp.EXPERIANCE_ID}>
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
                          setLoading(true)
                          try {
                            const selectedKeys = Object.entries(values.selectedFields)
                              .filter(([_, isChecked]) => isChecked)
                              .map(([id]) => id)

                            if (selectedKeys.length === 0) {
                              Alert({ status: false, text: "Please select at least one field to update!" })
                              setLoading(false)
                              return
                            }

                            let payload = selectedKeys.reduce((acc, id) => {
                              const field = fields.find((f) => f.id === id)
                              let value = getNestedValue(matchingUserExp, field.displayKey)

                              acc[field.dataKey] = value
                              return acc
                            }, {})

                            const response = await updateExperience(payload, exp.APPLICATION_EXPERIENCE_ID)

                            if (response.status === 200 || response.data?.success) {
                              Alert({ status: true, text: `Successfully updated ${exp.ORGANIZATION_NAME}` })
                              fetchApplicationData(prevData.APPLICATION_ID)
                            } else {
                              Alert({ status: false, text: "Failed to update experience. Please try again." })
                            }
                          } catch (error) {
                            console.log(error)
                          }
                          setLoading(false)
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
                                <CButton disabled={loading} type="submit" color="primary">
                                  Update
                                </CButton>

                                <CButton
                                  disabled={loading}
                                  variant="danger"
                                  className="ms-2 text-white"
                                  onClick={() => handleExpDelete(exp.APPLICATION_EXPERIENCE_ID)}
                                >
                                  Delete this from application
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

        {/* Unmatched Experiences */}
        {unmatchedExperiences.length > 0 && (
          <div className="p-0 mt-2">
            <CAccordion flush>
              <CAccordionItem style={{
                border: '1px solid #ffc107'
              }}>
                <CAccordionHeader>
                  <h5 className="text-warning fw-bold">
                    Experience not included in this application but present in user's profile
                  </h5>
                </CAccordionHeader>
                <CAccordionBody>
                  {unmatchedExperiences.map((exp) => (
                    <div
                      key={exp.EXPERIANCE_ID}
                      className="border rounded mb-1"
                    >
                      <h5 className="bg-primary text-light p-3">{exp.ORGANIZATION_NAME}</h5>

                      <CTable bordered hover>
                        <CTableBody>
                          {fields.map((field) => (
                            <CTableRow key={field.id}>
                              <CTableDataCell width="30%">
                                <strong>{field.label}</strong>
                              </CTableDataCell>
                              <CTableDataCell>
                                {getNestedValue(exp, field.displayKey) || "-"}
                              </CTableDataCell>
                            </CTableRow>
                          ))}
                          <CTableRow>
                            <CTableDataCell colSpan={2} className="text-end">
                              <CButton
                                className="m-2 btn-primary"
                                onClick={ () => handleAddExperience(exp, prevData.APPLICATION_ID) }
                              >
                                Add to Application
                              </CButton>
                            </CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </div>
                  ))}
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
          </div>
        )}
      </div>
  )
}

export default UserExperienceInfo