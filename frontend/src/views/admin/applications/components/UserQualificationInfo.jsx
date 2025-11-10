import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import * as API from "../../../../api/ApplicationRequest"
import { getQualification } from "../../../../api/QualificationRequest"
import {
  CButton,
  CTable,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CAccordionItem,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
} from "@coreui/react"
import { getNestedValue } from "../../../../helper"
import { Formik, Form } from "formik"
import Alert from "../../../../components/Alert"

const UserQualificationInfo = () => {
  const [qualifications, setQualifications] = useState([])
  const [userQualifications, setUserQualifications] = useState([])
  const location = useLocation()
  const { prevData } = location.state || {}

  // Fetch qualifications related to the application
  const fetchApplicationData = async (applicationId) => {
    try {
      const response = await API.getUserApplicationQualifications(applicationId)
      setQualifications(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  // Fetch user qualifications (the user’s personal data)
  const fetchUserData = async (userId) => {
    try {
      const response = await getQualification(userId)
      setUserQualifications(response.data.data || [])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (prevData?.APPLICATION_ID && prevData?.USER_ID) {
      fetchApplicationData(prevData.APPLICATION_ID)
      fetchUserData(prevData.USER_ID)
    }
  }, [])

  // Display key = nested path for UI
  // Data key = actual DB column name for payload
  const fields = [
    { id: "INSTITUTE_ID", displayKey: "institute.INSTITUTE_NAME", dataKey: "INSTITUTE_ID", label: "Board/University Name" },
    { id: "DISCIPLINE_ID", displayKey: "discipline.DISCIPLINE_NAME", dataKey: "DISCIPLINE_ID", label: "Discipline" },
    { id: "MAJOR", displayKey: "MAJOR", dataKey: "MAJOR", label: "Major Subject" },
    { id: "ROLL_NO", displayKey: "ROLL_NO", dataKey: "ROLL_NO", label: "Roll No." },
    { id: "OBTAINED_MARKS", displayKey: "OBTAINED_MARKS", dataKey: "OBTAINED_MARKS", label: "Obtained Marks" },
    { id: "TOTAL_MARKS", displayKey: "TOTAL_MARKS", dataKey: "TOTAL_MARKS", label: "Total Marks" },
    { id: "PASSING_YEAR", displayKey: "PASSING_YEAR", dataKey: "PASSING_YEAR", label: "Passing Year" },
    { id: "CGPA", displayKey: "CGPA", dataKey: "CGPA", label: "CGPA" },
    { id: "GRADE", displayKey: "GRADE", dataKey: "GRADE", label: "Grade" },
    { id: "RESULT_DATE", displayKey: "RESULT_DATE", dataKey: "RESULT_DATE", label: "Result Date" },
  ]

  const unmatchingFields = fields.filter(field => userQualifications[field.key] != qualifications[field.key])

  return (
      qualifications.length > 0 &&
    <div>
      <h3 className="bg-primary text-light p-2">Qualifications</h3>

      {qualifications.map((qualification, i) => {
        const matchingUserQual = userQualifications.find(
          (uq) => uq.degree?.DEGREE_ID === qualification.degree?.DEGREE_ID
        )

        return (
          <CAccordion flush key={qualification.QUALIFICATION_ID || i}>
            <CAccordionItem>
              <CAccordionHeader>
                <h5>
                  {qualification.degree?.DEGREE_TITLE}
                </h5>
              </CAccordionHeader>

              <CAccordionBody>
                <div className="table-responsive my-3">
                  <Formik
                    initialValues={{
                      selectedFields: {},
                      selectAll: false,
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                      try {
                        const selectedKeys = Object.entries(values.selectedFields)
                          .filter(([_, isChecked]) => isChecked)
                          .map(([id]) => id)

                        if (selectedKeys.length === 0) {
                          Alert({ status: false, text: "Please select at least one field to update." })
                          return
                        }

                        let payload = selectedKeys.reduce((acc, id) => {
                          const field = fields.find((f) => f.id === id)

                          let value = getNestedValue(matchingUserQual, field.displayKey)

                          if (field.dataKey === "DISCIPLINE_ID") {
                            value = matchingUserQual?.DISCIPLINE_ID ?? matchingUserQual?.discipline?.DISCIPLINE_ID ?? null
                          } else if (field.dataKey === "INSTITUTE_ID") {
                            value = matchingUserQual?.INSTITUTE_ID ?? matchingUserQual?.institute?.INSTITUTE_ID ?? null
                          }

                          if (
                            value === "-" ||
                            value === "" ||
                            value === undefined
                          ) {
                            value = null
                          }

                          acc[field.dataKey] = value
                          return acc
                        }, {})

                        payload = {
                          ...payload,
                          IS_RESULT_DECLARE: qualification.IS_RESULT_DECLARE,
                          USER_ID: qualification.USER_ID,
                          ORGANIZATION_ID: qualification.ORGANIZATION_ID,
                        }

                        // console.log("Updating qualification:", qualification.QUALIFICATION_ID)
                        // console.log("Payload to update:", payload)

                        const response = await API.updateQualification(payload, qualification.QUALIFICATION_ID)

                        if (response.status === 200 || response.data?.success) {
                          Alert({ status: true, text: `Successfully updated ${qualification.degree?.DEGREE_TITLE}` })
                          fetchApplicationData(prevData.APPLICATION_ID)
                        } else {
                          Alert({ status: false, text: "Failed to update qualification. Please try again." })
                        }
                      } catch (error) {
                        console.error("Error updating qualification:", error)
                        Alert({ status: false, text: "Something went wrong while updating." })
                      } finally {
                        setSubmitting(false)
                      }
                    }}
                  >
                    {({ values, setFieldValue }) => (
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
                              // Filter to show only mismatched values
                              .filter((field) => {
                                const appValue = getNestedValue(qualification, field.displayKey)
                                const userValue = matchingUserQual ? getNestedValue(matchingUserQual, field.displayKey) : ""

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
                                  <CTableDataCell>{getNestedValue(qualification, field.displayKey)}</CTableDataCell>
                                  <CTableDataCell>
                                    {matchingUserQual ? getNestedValue(matchingUserQual, field.displayKey) : ""}
                                  </CTableDataCell>
                                </CTableRow>
                              ))
                              .concat(
                                fields.filter((field) => {
                                  const appValue = getNestedValue(qualification, field.displayKey)
                                  const userValue = matchingUserQual ? getNestedValue(matchingUserQual, field.displayKey) : ""
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
                    )}
                  </Formik>
                </div>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        )
      })}
      
    </div>
  )
}

export default UserQualificationInfo
