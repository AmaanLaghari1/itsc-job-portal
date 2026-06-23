import React, { useEffect, useState, useMemo } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import Alert from '../../../components/Alert'
import CustomSelect from '../../../components/CustomSelect'

import {
    removeAssignedAnnouncement,
    getAssignedAnnouncements,
    assignAnnouncement,
    getAnnouncement
} from '../../../api/AnnouncementRequest'

import { mapOptions } from '../../../helper'
import { useLocation } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import DynamicDataTable from '../../../components/data_table/DynamicDataTable'
import { CButton } from '@coreui/react'

const AssignAnnouncement = () => {
    const [loading, setLoading] = useState(false)
    const [announcements, setAnnouncements] = useState([])
    const [assignedAnnouncements, setAssignedAnnouncements] = useState([])
    const location = useLocation()
    const user = location?.state?.user || {}
    const [selectableRows, setSelectedRows] = useState([])

    const initialValues = {
        announcement_id: '',
        user_id: user?.USER_ID || ''
    }

    const validationSchema = Yup.object({
        announcement_id: Yup.string().required('Announcement is required!')
    })

    const handleSubmit = async (values) => {
        setLoading(true)

        try {
            await assignAnnouncement(values)

            Alert({
                status: true,
                text: 'Announcement assigned successfully...'
            })
        } catch (error) {
            // console.log(error)
            Alert({
                status: false,
                text:
                    error?.response?.data?.error_message ||
                    error?.message ||
                    'Some error occurred!'
            })
        } finally {
            setLoading(false)
        }
    }

    const fetchAnnouncements = async () => {
        try {
            const response = await getAnnouncement()
            setAnnouncements(response?.data.data || [])
        } catch (error) {
            Alert({
                status: false,
                text: 'Failed to fetch announcements!'
            })
        }
    }

    useEffect(() => {
        fetchAnnouncements()
        getAssignedAnnouncementsList()
    }, [])

    const announcementOptions = useMemo(
        () =>
            mapOptions(
                announcements,
                'ANNOUNCEMENT_ID',
                'ANNOUNCEMENT_TITLE'
            ),
        [announcements]
    )

    const handleAssignAnnouncements = async () => {
        // alert(JSON.stringify(selectableRows, null, 2))
        if (selectableRows.length === 0) {
            Alert({
                status: false,
                text: 'Please select at least one announcement to assign!'
            })
            return
        }
        setLoading(true)

        try {
            const response = await assignAnnouncement({announcement_ids: selectableRows.map(row => row.ANNOUNCEMENT_ID), user_id: user.USER_ID})

            Alert({
                status: true,
                text: 'Announcements assigned successfully...'
            })

            // Refresh the announcements list after assignment
            fetchAnnouncements()
            getAssignedAnnouncementsList()

            // Clear selected rows            
            setSelectedRows([])

        } catch (error) {
            console.log(error)
            Alert({
                status: false,
                text:
                    error?.response?.data?.error_message ||
                    error?.message ||
                    'Some error occurred!'
            })
        } finally {
            setLoading(false)
        }
    }

    const getAssignedAnnouncementsList = async () => {
        try {
            const response = await getAssignedAnnouncements({user_id: user.USER_ID})
            // console.log('Assigned Announcements:', response?.data)
            setAssignedAnnouncements(response?.data || [])
        } catch (error) {
            console.log(error)
            Alert({
                status: false,
                text: 'Failed to fetch assigned announcements!'
            })
        }
    }

    const handleRemoveAnnouncements = async () => {
        if (selectableRows.length === 0) {
            Alert({
                status: false,
                text: 'Please select at least one announcement to remove!'
            })
            return
        }
        setLoading(true)

        try {
            const response = await removeAssignedAnnouncement({announcement_ids: selectableRows.map(row => row.ANNOUNCEMENT_ID), user_id: user.USER_ID})

            Alert({
                status: true,
                text: response?.data?.message || 'Announcements removed successfully...'
            })

            // Refresh the assigned announcements list after removal
            getAssignedAnnouncementsList()

            // Clear selected rows            
            setSelectedRows([])

        } catch (error) {
            console.log(error)
            Alert({
                status: false,
                text:
                    error?.response?.data?.error_message ||
                    error?.message ||
                    'Some error occurred!'
            })
        } finally {
            setLoading(false)
        }
    }

    if (!user?.USER_ID) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h3></h3>

            {/* 
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {() => (
                    <Form>
                        <CustomSelect
                            label="Select Announcement"
                            name="announcement_id"
                            options={announcementOptions}
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary btn-sm bg-primary shadow shadow-sm rounded-pill p-3 px-4 my-2"
                        >
                            {loading ? 'Assigning...' : 'Assign'}
                        </button>
                    </Form>
                )}
            </Formik> 
            */}

            <div className="row">
                <div className="col-lg-6">
                    <DynamicDataTable
                        title={`All Announcements`}
                        columns={[
                            { name: 'ID', selector: (row) => row.ANNOUNCEMENT_ID, width: '70px', sortable: true },
                            { name: 'Title', selector: (row) => row.ANNOUNCEMENT_TITLE, sortable: true }
                        ]}
                        data={announcements}
                        selectableRows
                        onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows)}
                    />
                    <CButton
                        color="primary"
                        disabled={loading}
                        className="btn btn-primary btn-sm bg-primary shadow shadow-sm rounded-pill p-3 px-4 my-2"
                        onClick={() => { handleAssignAnnouncements() }}
                    >
                        Assign
                    </CButton>
                </div>

                <div className="col-lg-6">
                    <DynamicDataTable
                        title={`Assigned Announcements to ${user?.FIRST_NAME || 'User'}`}
                        columns={[
                            { name: 'ID', selector: (row) => row.ANNOUNCEMENT_ID, width: '70px', sortable: true },
                            { name: 'Title', selector: (row) => row.ANNOUNCEMENT_TITLE, sortable: true }
                        ]}
                        data={assignedAnnouncements}
                        selectableRows
                        onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows)}
                    />
                    <div className="mt-auto">
                        <CButton
                            color="danger"
                            disabled={loading}
                            className="btn btn-danger btn-sm bg-danger shadow shadow-sm rounded-pill p-3 px-4 my-2 "
                            onClick={() => { handleRemoveAnnouncements() }}
                        >
                            Unassign
                        </CButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssignAnnouncement