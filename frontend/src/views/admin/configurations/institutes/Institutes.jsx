import { useEffect, useState } from "react"
import * as API from '../../../../api/InstituteRequest'
import DynamicDataTable from "../../../../components/data_table/DynamicDataTable"
import { Field, Form, Formik } from "formik"
import { CButton } from "@coreui/react"
import { useNavigate } from "react-router-dom"

const Institutes = () => {
    const [institutes, setInstitutes] = useState([])
    const [parentInstitutes, setParentInstitutes] = useState([])
    const navigate = useNavigate()

    const fetchInstitutes = async () => {
    try {
        const response = await API.getInstitute();
        const data = response.data;

        // Set full institute list
        setInstitutes(data);

        // Extract valid parent institute records
        const parentIds = new Set(
            data.filter(item => item.PARENT_ID !== 0)
                .map(item => item.PARENT_ID)
        );

        // Match those IDs to actual institute records
        const parentInstituteRecords = data.filter(inst => parentIds.has(inst.INSTITUTE_ID));

        setParentInstitutes(parentInstituteRecords);

    } catch (error) {
        console.log(error);
    }
}


    useEffect(() => {
        fetchInstitutes()
    }, [])

    const columns = [
        {
            name: 'ID',
            selector: row => row.INSTITUTE_ID,
            sortable: true,
            width: "100px"
        },
        {
            name: 'Institute Name',
            selector: row => row.INSTITUTE_NAME,
            wrap: true,
            width: "600px"
        },
        {
            name: 'Address',
            selector: row => row.ADDRESS ?? '-',
        },
        {
            name: 'Mobile',
            selector: row => row.MOBILE ?? '-',
        },
        {
            name: 'Landline',
            selector: row => row.LANDLINE ?? '-',
        },
        // {
        //     name: 'Active',
        //     cell: row => <Formik
        //         initialValues={{
        //             active: row.ACTIVE
        //         }}
        //         onSubmit={async (values) => {
        //             try {
        //                 // const response = await setDisciplineStatus(values, row.DISCIPLINE_ID)
        //                 // console.log(response)
        //             } catch (error) {
        //                 console.log(error)
        //             }
        //         }}
        //     >
        //         {({ values, setFieldValue, submitForm }) => (
        //             <Form>
        //                 <div className="form-check form-switch">
        //                     <Field
        //                         className="form-check-input"
        //                         name="active"
        //                         type="checkbox"
        //                         role="switch"
        //                         id="active"
        //                         checked={row.ACTIVE == 1 ? true : false}
        //                         onChange={(e) => {
        //                             const value = e.target.checked ? 1 : 0;
        //                             setFieldValue('active', value);
        //                             submitForm();
        //                         }}
        //                     />
        //                     <label className="form-check-label" htmlFor="active">
        //                     </label>
        //                 </div>
        //             </Form>
        //         )}
        //     </Formik>,
        // },
        {
            name: 'Action',
            cell: row => (
                <>
                    <CButton className="btn btn-sm btn-outline-success"
                    onClick={() => {
                        navigate('/admin/institute/edit', {
                            state: {
                                prevValues: row,
                                institutes: parentInstitutes
                            }
                        })
                    }}
                    >
                        Edit
                    </CButton>
                </>
            )
        }
    ]

    return (
        <div>
            <CButton className="btn btn-primary btn-sm"
                onClick={() => navigate('/admin/institute/add', {
                    state: {
                        institutes: parentInstitutes
                    }
                })}
            >
                Add New +
            </CButton>

            <DynamicDataTable
                title='Institutes'
                columns={columns}
                data={institutes}
            />
        </div>
    )
}

export default Institutes