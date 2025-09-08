import { Formik, Form, ErrorMessage } from "formik"
import FormControl from "../../../components/FormControl"
import MyEditorFormik from "../../../components/my-editor/MyEditorFormik"
import MultiCheckbox from "../../../components/MultiCheckbox"
import { CButton } from "@coreui/react"
import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import CustomSelect from "../../../components/CustomSelect.jsx";
import { mapOptions } from "../../../helper.js"

const AnnouncementForm = ({initialValues, validationRules, handleSubmit, loading}) => {
    const [programs, setPrograms] = useState([])
    const [departments, setDepartments] = useState([])

    const fetchDept = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}department/get`)
        setDepartments(response.data)
      } catch (error) {
        
      }
    }

    const fetchPrograms = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}qualification/program`)
        setPrograms(response.data.options)
      } catch (e) {
        console.log(e)
      }
    }
    
    useEffect(() => {
      fetchPrograms()
      fetchDept()
    }, [])
  
    const programOptions = programs
    .filter((program) => program.DEGREE_ID != 1 && program.DEGREE_ID != 10)
    .map(program => {
      return {key:program.DEGREE_ID, value: program.DEGREE_TITLE}
    })

    const deptOptions = useMemo(() =>
      mapOptions(departments, 'DEPT_ID', 'DEPT_NAME')
    )
  
  return (
    <div>
      <Formik
      initialValues={initialValues}
      validationSchema={validationRules}
      onSubmit={handleSubmit}
    >
      {({values, setFieldValue}) => {
        return (<Form>

          <div className="form-group my-2">
            <FormControl control='input' type='text' name='announcement_title' label='Announcement Title' required={true} />
          </div>

          <div className="form-group my-2">
            <FormControl control='input' type='text' name='position_name' label='Position' required={true} />
          </div>

          <div className="form-group my-2">
            <CustomSelect
            className="form-control"
            label="Select Department"
            name="dept_id"
            options={deptOptions} // Options should be dynamically loaded if using async
            onChange={(selectedOption) => {
              setFieldValue('dept_id', selectedOption?.key)
            }}
            required={true}
            />
          </div>

          <div className="form-group my-2">
            <MyEditorFormik name="description" label='Description' required={true} />
          </div>


          <div className="row">
            <div className="col-6 col-sm-3">
              <div className="form-group my-2">
                <FormControl control='date' name="start_date" label='Start Date' required={true} />
              </div>
            </div>
            <div className="col-6 col-sm-3">
              <div className="form-group my-2">
                <FormControl control='date' name="end_date" label='End Date' required={true} maxDateDisabled={true} />
              </div>
            </div>
            <div className="col-sm-3">
              <div className="form-group my-2">
                <FormControl control='input' name="application_fee" label='Application Fee' 
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, '')
                }}
                />
              </div>
            </div>
            <div className="col-sm-3">
              <div className="form-group my-2">
                <FormControl control='input' name="ref_no" label='Reference No' 
                required={true}
                />
              </div>
            </div>
          </div>

          <fieldset className='border border-2 p-2 my-2'>
              <legend className='fw-bold'>Age Requirement</legend>
              <div className="row">
                <div className="col-6">
                  <div className="form-group my-2">
                    <FormControl 
                      control='input' 
                      type='text'
                      name="age_from" 
                      label='Min' 
                      required={true}
                      onInput={e => {
                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 2)
                      }}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group my-2">
                    <FormControl 
                      control='input' 
                      type='text'
                      name="age_to" 
                      label='Max' 
                      required={true}
                      onInput={e => {
                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 2)
                      }}
                    />
                  </div>
                </div>
              </div>
          </fieldset>

          <fieldset className='border border-2 p-2 my-2'>
              <legend className='fw-bold'>Qualification Requirement</legend>
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex form-group">
                    <MultiCheckbox
                      className="form-control"
                      label=""
                      name="qualifications"
                      options={programOptions}
                      required={true}
                    />

                  </div>
                </div>

              </div>
          </fieldset>

          <fieldset className='border border-2 p-2 my-2'>
              <legend className='fw-bold'>Experience Requirement</legend>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group my-2">
                    <FormControl 
                    control='input' 
                    type='text'
                    name="experience_years" 
                    label="Years of Experience"
                    onInput={e => {
                      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 2)
                    }}
                    />
                  </div>
                </div>

              </div>
          </fieldset>


          <CButton variant='primary' type="submit" className='btn btn-primary fs-5 mx-auto d-block rounded-0 px-3 my-3'
          disabled={loading}>
            Save
          </CButton>
        </Form>)
      }
      }
    </Formik>
    </div>
  )
}

export default AnnouncementForm