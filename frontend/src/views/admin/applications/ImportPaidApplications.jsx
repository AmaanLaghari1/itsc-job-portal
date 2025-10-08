import { Form, Formik } from "formik"
import { useState } from "react"
import * as Yup from 'yup'
import FormControl from "../../../components/FormControl"
import * as API from "../../../api/ApplicationRequest"
import DynamicDataTable from "../../../components/data_table/DynamicDataTable"
import { CButton } from "@coreui/react"

const ImportPaidApplications = () => {
    const [loading, setLoading] = useState(false)
    const [applications, setApplications] = useState([])
    const [selectedRows, setSelectedRows] = useState([])

    const initialValues = {
        from_date: '',
        to_date: ''
    }

    const validationRules = Yup.object().shape({
        from_date: Yup.string().required('Required!'),
        to_date: Yup.string().required('Required!')
    })

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const response = await API.getPaidApplications(values)
            setApplications(response.data)
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    const handleImportSelected = async () => {
        if (selectedRows.length === 0) return;

        console.log("Importing selected rows:", selectedRows);

        try {
            const formdata = new FormData();
            formdata.append('paid_applications_data', JSON.stringify(selectedRows));

            const response = await API.importPaidApplications(formdata);
            console.log(response);
        } catch (error) {
            console.error("Error importing selected rows:", error);
        }
    };

    const columns = [
        {
            name: "Challan No.",
            selector: row => row.CHALLAN_NO
        },
        {
            name: "Position Applied",
            selector: row => row.PROGRAM,
            width: '300px',
            wrap: true
        },
        {
            name: "Applicant Name",
            selector: row => row.NAME,
            width: '200px'
        },
        {
            name: "Father's Name",
            selector: row => row.FNAME,
            width: '200px'
        },
        {
            name: "CNIC No.",
            selector: row => row.CNIC_NO,
            width: '150px'
        },
        {
            name: "Paid Amount",
            selector: row => "Rs. " + row.PAID_AMOUNT,
            width: '120px'
        },
        {
            name: "Due Amount",
            selector: row => "Rs. " + row.DUE_AMOUNT,
            width: '120px'
        },
        {
            name: "Paid Date",
            selector: row => row.PAID_DATE
        },
    ]

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationRules}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <div className="d-flex gap-2 flex-wrap form-group my-2">
                                    <FormControl
                                        control='date'
                                        name='from_date'
                                        label='From'
                                        required={true}
                                    />
                                    <FormControl
                                        control='date'
                                        name='to_date'
                                        label='To'
                                        required={true}
                                        maxDateDisabled={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <button disabled={loading} type="submit" className="btn btn-primary mb-3">
                            {loading ? 'Fetching...' : 'Fetch Report'}
                        </button>
                    </Form>
                )}
            </Formik>

            {
                applications.length > 0 && (
                    <div className="d-flex gap-2 my-2">
                        <CButton
                            variant="success"
                            disabled={selectedRows.length === 0}
                            onClick={handleImportSelected}
                        >
                            Import Selected ({selectedRows.length})
                        </CButton>
                    </div>
                )
            }

            <DynamicDataTable
                title='Paid Applications Report'
                columns={columns}
                data={applications}
                selectableRows
                onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows)}
            />
        </div>
    )
}

export default ImportPaidApplications
