import { Formik, Form, Field } from 'formik'
import React from 'react'
import MyEditorFormik from '../../../../components/my-editor/MyEditorFormik'
import FormControl from '../../../../components/FormControl'
import { CButton } from '@coreui/react'

const AlertForm = ({ initialValues, validationRules, handleSubmit, loading }) => {
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationRules}
                onSubmit={handleSubmit}
            >
                {({setFieldValue}) => (
                    <Form>
                        <div className="form-group my-2">
                            {/* <MyEditorFormik name="msg_content" label='Content' required={true} /> */}
                            <FormControl
                                control='textarea'
                                name='msg_content'
                                label='Content Code'
                                required={true}
                            />
                        </div>
                        <div className="form-group col-sm-6 my-2">
                            <FormControl
                                control='input'
                                label='Remarks'
                                name='remarks'
                            />
                        </div>

                        <div className="form-group my-2">
                            <Field
                                className='form-check form-check-input d-inline'
                                type="checkbox"
                                name="is_active"
                                // value={1} // The value will be 1 if checked
                                onChange={e => setFieldValue('is_active', e.target.checked ? 1 : 0)} // Custom value handling
                            />
                            <label htmlFor="active" className="form-check-label mx-1 fw-bold fs-4">Active</label>
                        </div>

                        <CButton variant='primary' type="submit" className='btn btn-primary fs-5 mx-auto d-block rounded-0 px-3 my-3'
                            disabled={loading}>
                            {loading ? 'Saving...' : 'Save'}
                        </CButton>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AlertForm