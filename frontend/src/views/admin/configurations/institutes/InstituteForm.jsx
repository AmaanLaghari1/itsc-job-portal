import { Formik, Form, Field } from "formik"
import FormControl from "../../../../components/FormControl.jsx"
import { CButton } from "@coreui/react"
import { useEffect, useMemo, useState } from "react"
import CustomSelect from "../../../../components/CustomSelect.jsx"
import { mapOptions } from "../../../../helper.js"
import * as API from '../../../../api/InstituteRequest.js'
import { useLocation } from "react-router-dom"

const InstituteForm = ({ initialValues, validationRules, handleSubmit, loading }) => {
  const [instTypes, setInstTypes] = useState([])
  const location = useLocation()
  const { institutes } = location.state || {}
  // console.log(institutes)

  const fetchInstituteType = async () => {
    try {
      const response = await API.getInstituteType()
      setInstTypes(response.data)
    } catch (error) {

    }
  }

  const instTypeOptions = useMemo(() =>
    mapOptions(instTypes, 'INSTITUTE_TYPE_ID', 'TYPE_NAME')
  )

  const orgOptions = useMemo(() =>
    mapOptions(institutes, 'INSTITUTE_ID', 'INSTITUTE_NAME')
  )

  useEffect(() => {
    fetchInstituteType()
  }, [])

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationRules}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <div className="form-group my-2">
                <FormControl
                  control='select'
                  name='is_inst'
                  label='Is Institute?'
                  options={[
                    {
                      key: 'Y',
                      value: 'Yes'
                    },
                    {
                      key: 'N',
                      value: 'No'
                    }
                  ]}
                  required={true}
                />
              </div>
              <div className="form-group my-2">
                <FormControl
                  control='select'
                  name='institute_type_id'
                  label='Institute Type'
                  options={instTypeOptions}
                  required={true}
                />
              </div>
              <div className="form-group my-2">
                <CustomSelect
                  control='select'
                  name='parent_id'
                  label='Parent Institute'
                  options={[{ key: '0', value: 'None' }, ...orgOptions]}
                  required={true}
                />
              </div>
              <div className="form-group my-2">
                <FormControl
                  control='input'
                  name='institute_name'
                  label='Institute Name'
                  onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                  }}
                  required={true}
                />
              </div>
              <div className="form-group my-2">
                <FormControl
                  control='input'
                  name='mobile'
                  label='Mobile No.'
                  onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 11)}
                />
              </div>

              <div className="form-group my-2">
                <FormControl
                  control='input'
                  name='landline'
                  label='Landline No.'
                  onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 11)}
                />
              </div>

              <div className="form-group my-2">
                <FormControl
                  control='input'
                  name='address'
                  label='Address'
                  onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                  }}
                />
              </div>

              <div className="form-group my-2">
                <FormControl
                  control='input'
                  name='remarks'
                  label='Remarks'
                  onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                  }}
                />
              </div>

              <div className="form-group my-2">
                <Field
                  className='form-check form-check-input d-inline'
                  type="checkbox"
                  name="active"
                  onChange={e => setFieldValue('active', e.target.checked ? 1 : 0)}
                />
                <label htmlFor="" className="form-check-label mx-1 fw-bold fs-4">Active</label>
              </div>


              <CButton variant='primary' type="submit" className='btn btn-primary fs-5 mx-auto d-block rounded-0 px-3 my-3'
                disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </CButton>
            </Form>
          )
        }
        }
      </Formik>
    </div>
  )
}

export default InstituteForm