import { Formik, Form, ErrorMessage, Field } from "formik"
import FormControl from "../../../components/FormControl"
import { CButton } from "@coreui/react"
import { useEffect, useState } from "react"
import axios from "axios"

const ApplicationForm = ({initialValues, validationRules, handleSubmit}) => {
  
  return (
    <div>
      <Formik
      initialValues={initialValues}
      validationSchema={validationRules}
      onSubmit={handleSubmit}
    >
      {({values, setFieldValue}) => {
        return (<Form>
        <div className="row">
            <div className="col-sm-6">
                <div className="form-group my-2">
                    <FormControl control='input' name="channel" label='Payment Channel' required={true} />
                </div>
            </div>
            <div className="col-sm-6">
                <div className="form-group my-2">
                    <FormControl control='input' name="paid_amount" label='Paid Amount' required={true} />
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-6">
                <div className="form-group my-2">
                    <label className="form-label" htmlFor="active">
                        Active
                    </label>
                    <Field
                    as='select'
                    id='active'
                    name='active'
                    value={values.active}
                    className='form-control'
                    onChange={(e) => {
                        setFieldValue('active', e.target.value)
                    }}
                    >
                        <option value={1}>Yes</option>
                        <option value={0}>No</option>
                    </Field>
                </div>
            </div>
            
            <div className="col-sm-6">
                <div className="form-group my-2">
                    <label className="form-label" htmlFor="application_status">
                        Application Status
                    </label>
                    <Field
                    as='select'
                    id='application_status'
                    name='application_status'
                    value={values.application_status}
                    className='form-control'
                    onChange={(e) => {
                        setFieldValue('application_status', e.target.value)
                    }}
                    >
                        <option value={1}>Applied</option>
                        <option value={2}>Unpaid</option>
                        <option value={3}>Shortlisted</option>
                        <option value={4}>Selected</option>
                        <option value={5}>Rejected</option>
                    </Field>
                </div>
                
            </div>
        </div>
        <div className="row">
            <div className="col-sm-3">
                <div className="form-group my-2">
                    <FormControl control='date' name="apply_date" label='Apply Date' required={true} />
                </div>
            </div>
            {/* <div className="col-6 col-sm-3">
                <div className="form-group my-2">
                    <FormControl control='date' name="paid_date" label='Paid Date' required={true} maxDateDisabled={true} />
                </div>
            </div> */}
            <div className="col-sm-6">
                <div className="form-group my-2">
                    <FormControl control='input' name="remarks" label='Remarks' required={false} />
                </div>
            </div>
        </div>

          <CButton variant='primary' type="submit" className='btn btn-primary fs-5 mx-auto d-block rounded-0 px-3 my-3'>
            Save
          </CButton>
        </Form>)
      }
      }
    </Formik>
    </div>
  )
}

export default ApplicationForm