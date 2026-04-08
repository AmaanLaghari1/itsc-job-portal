import { Formik, Form } from "formik"
import FormControl from "../../../components/FormControl"
import { CButton } from "@coreui/react"
import { useState } from "react"

const DesignProjectForm = ({ initialValues, validationSchema, handleSubmit }) => {
    const [loading, setLoading] = useState(false)
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    setLoading(true)
                    handleSubmit(values).finally(() => setLoading(false))
                }}
            >
                {({ values }) => (
                    <Form>
                        <div className="row align-content-end">
                            <div className="col-sm-6 my-2">
                                <FormControl
                                    control="input"
                                    type="text"
                                    label="Design Project Title / Exhibition Title"
                                    name="title"
                                    required={true}
                                />
                            </div>
                            <div className="col-sm-6 my-2">
                                <FormControl
                                    control="input"
                                    type="text"
                                    label="Client / Sponsor"
                                    name="client"
                                    required={true}
                                />
                            </div>
                            <div className="col-sm-6 my-2">
                                <FormControl
                                    control="input"
                                    type="text"
                                    label="Nature of Project / Exhibition"
                                    name="nature"
                                    required={true}
                                />
                            </div>
                            <div className="col-sm-6 my-2">
                                <FormControl
                                    control="input"
                                    type="date"
                                    label="Date"
                                    name="date"
                                    required={true}
                                />
                            </div>
                            <div className="col-sm-6 my-2">
                                <FormControl
                                    control="input"
                                    type="text"
                                    label="Venue"
                                    name="venue"
                                    required={true}
                                />
                            </div>
                        </div>
                        <CButton
                            variant='primary'
                            className='btn btn-primary rounded-pill p-2 px-4'
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </CButton>
                    </Form>
                )}
            </Formik>

        </div>
    )
}

export default DesignProjectForm