import { Formik, Form } from 'formik'
import FormControl from '../../../components/FormControl'
import * as Yup from 'yup'
import { useState } from 'react'
import { assignUserRole, removeUserRole } from '../../../api/UtilRequest'
import Alert from '../../../components/Alert'
import { CBadge } from '@coreui/react'
import AlertConfirm from '../../../components/AlertConfirm'
import { getRoleNameById } from '../../../helper'

const AssignRole = ({ user, onRoleUpdate }) => {
    const [loading, setLoading] = useState(false)
    const [userRoles, setUserRoles] = useState(user.user_roles)

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const response = await assignUserRole(values)
            const assignedRole = {
                R_R_ID: response.data.role.R_R_ID, // or whatever ID returned
                role: {
                    ROLE_ID: parseInt(values.role_id),
                    ROLE_NAME: getRoleNameById(values.role_id), // Helper function below
                }
            };

            setUserRoles([...userRoles, assignedRole]);
            Alert({ status: true, text: 'Role assigned successfully...' })
            onRoleUpdate()
        } catch (error) {
            Alert({ status: false, text: error.response.data?.error_message || 'Some error occurred!' })
        }
        setLoading(false)
    }

    const validationSchema = Yup.object({
        role_id: Yup.string().required('Role is required!')
            // .test('role-validation', 'This role is already assigned!', function (value) {
            //     // Access the user object from the context
            //     const validRoles = [1, 2, 3, 4] // Valid role IDs
            //     const hasValidRole = user?.user_roles?.some(role => validRoles.includes(role.ROLE_ID))

            //     return hasValidRole // Return true if the user has a valid role, otherwise false
            // })
    })

    const handleDelete = async (id) => {
        try {
            const confirmed = await AlertConfirm({
                title: 'Delete role?',
                text: 'This action cannot be undone.',
            });
            if(confirmed){
                const response = await removeUserRole(id)
                setUserRoles(userRoles.filter(role => role.R_R_ID !== id));
                Alert({status: true, text: 'Role removed successfully...'})
                onRoleUpdate()
            }
        } catch (error) {
            Alert({status: false, text: 'Unable to remove this role!'})
        }
    }

    return (
        <div>
            <Formik
                initialValues={{
                    role_id: '',
                    user_id: user.USER_ID
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <div>
                            Existing Roles: {
                                userRoles.length > 0 ? 
                                userRoles.map(item => 
                                    (
                                        <CBadge key={item.R_R_ID} color='warning' className='position-relative text-black p-1 mx-2'>
                                            {item.role.ROLE_NAME}
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger btn fw-bolder"
                                            onClick={() => {
                                                handleDelete(item.R_R_ID)
                                            }}
                                            >
                                                X
                                            </span>
                                        </CBadge>
                                    )
                                )
                                : 'No role assigned yet.'
                            }
                        </div>
                        <FormControl
                            control="select"
                            name="role_id"
                            id="role_id"
                            label="Assign New"
                            required={true}
                            options={[
                                { key: 1, value: "Super Admin" },
                                { key: 2, value: "Admin" },
                                { key: 3, value: "Operator" },
                                { key: 4, value: "Primary" },
                            ]}
                        />

                        <button className="btn btn-primary my-3" type="submit" disabled={loading}>
                            {loading ? 'Saving' : 'Save'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AssignRole
