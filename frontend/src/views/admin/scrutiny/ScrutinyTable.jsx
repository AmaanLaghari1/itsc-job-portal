import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DynamicDataTable from '../../../components/data_table/DynamicDataTable';
import { addScrutinyApplication, changeScrutinyStatus, getApplicationStatuses, getScrutinyApplications, scrutinyReportDownload } from '../../../api/ApplicationRequest';
import Alert from '../../../components/Alert';
import AlertConfirm from '../../../components/AlertConfirm';
import { CButton } from '@coreui/react';
import Modal from '../../../components/Modal';
import { Form, Formik } from 'formik';
import * as Yup from 'yup'
import { mapOptions } from '../../../helper';
import FormControl from '../../../components/FormControl';
import { cilArrowThickBottom } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const ScrutinyTable = ({ announcement, columns }) => {
    const [applications, setApplications] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [visible, setVisible] = useState(false)
    const [selectedRowData, setSelectedRowData] = useState({})
    const [selectedRows, setSelectedRows] = useState({})
    const [loading, setLoading] = useState(false)

    const handleCloseModal = () => {
        setVisible(false)
    }

    const fetchApplications = useCallback(async () => {
        if (!announcement) return;

        try {
            const response = await getScrutinyApplications({
                announcement_id: announcement,
            });

            // console.log(response);
            setApplications(response?.data || []);
        } catch (error) {
            console.log(error);
        }
    }, [announcement]);

    useEffect(() => {
        fetchApplications();
        fetchStatuses()
    }, [announcement, fetchApplications]);

    const fetchStatuses = async () => {
        try {
            const response = await getApplicationStatuses()
            // console.log(response)
            setStatuses(response.data || [])
        } catch (error) {
            console.log(error)
        }
    }

    const statusOptions = useMemo(() => {
        return mapOptions(statuses, 'APPLICATION_STATUS_ID', 'STATUS')
    }, [statuses])

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const response = await changeScrutinyStatus(values)
            // console.log(response)
            Alert({ status: true, text: response.data?.message || 'Application updated successfully...' })
            fetchApplications({ announcement_id: announcement })
            setVisible(false)
        } catch (error) {
            console.log(error)
            Alert({ status: false, text: error.response.data?.error_message || 'Something went wrong!' })
        }
        finally {
            setLoading(false)
        }
    }

    const columnss = [
        {
            name: "ID",
            selector: (row) => row.ID,
            sortable: true,
            width: "80px",
        },
        {
            name: "Candidate Name",
            selector: row => row.FIRST_NAME + " " + row.LAST_NAME,
            sortable: true
        },
        {
            name: "CNIC No.",
            selector: row => row.CNIC_NO,
            sortable: true
        },
        {
            name: "Application Status",
            selector: (row) =>
                row.APPLICATION_STATUS_ID == 1
                    ? "Applied"
                    : row.APPLICATION_STATUS_ID == 2
                        ? "Unpaid"
                        : row.APPLICATION_STATUS_ID == 3
                            ? "Shortlisted"
                            : row.APPLICATION_STATUS_ID == 4
                                ? "Selected"
                                : "Rejected",
            sortable: true,
            width: "180px",
        },
        {
            name: "Remarks",
            selector: (row) => row.REMARKS,
            sortable: true,
        },
        {
            name: "Actions",
            cell: row => {
                return (
                    <div className='d-flex gap-2'>
                        <CButton
                            variant='primary'
                            onClick={() => {
                                setVisible(true)
                                setSelectedRowData(row)
                            }}
                            size='sm'
                        >
                            Change Status
                        </CButton>
                        <CButton
                            size='sm'
                            variant='danger'
                            onClick={async () => {
                                const confirmed = await AlertConfirm({
                                    title: 'Delete item?',
                                    text: 'This action cannot be undone.',
                                });
                                if (confirmed) {
                                    try {
                                        const response = await deleteApplication(row.APPLICATION_ID);
                                        setApplications(applications.filter(app => app.APPLICATION_ID !== row.APPLICATION_ID));
                                        Alert({ status: true, text: 'Application deleted successfully' })
                                    } catch (error) {
                                        console.log(error)
                                        Alert({ status: false, text: 'Failed to delete application' })
                                    }
                                }
                            }
                            }
                        >
                            Delete
                        </CButton>
                    </div>
                )
            },
            width: "200px"
        }
    ]

    const downloadReport = async (announcementId) => {
        setLoading(true)
        try {
            // Request PDF from backend
            const response = await scrutinyReportDownload({
                announcement_id: announcementId
            });

            // Create PDF blob
            const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

            // Trigger download
            const link = document.createElement("a");
            link.href = fileURL;
            link.download = "applications_scrutiny_report.pdf";
            link.click();
            link.remove();

        } catch (error) {
            console.error(error);
            Alert({
                status: false,
                text: "Failed to download report.",
            });
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="my-2">
            {
                applications.length > 0 &&
                <CButton 
                size='sm'
                variant='secondary'
                onClick={() => { downloadReport(announcement) }}
                disabled={loading}
                >
                    Download Report <CIcon icon={cilArrowThickBottom}  />
                </CButton>
            }
            <DynamicDataTable
                title="Applications Scrutiny"
                columns={columnss}
                data={applications}
            />

            <Modal
                setVisible={setVisible}
                visible={visible}
                size="md"
                position="center"
                onClose={handleCloseModal}
            >
                <h3>Change Status</h3>

                <Formik
                    initialValues={{
                        id: selectedRowData.ID,
                        user_id: selectedRowData.USER_ID,
                        announcement_id: selectedRowData.ANNOUNCEMENT_ID,
                        application_id: selectedRowData.APPLICATION_ID,
                        application_status_id: selectedRowData.APPLICATION_STATUS_ID || '',
                        remarks: selectedRowData.REMARKS || ''
                    }}
                    validationSchema={Yup.object().shape({
                        application_status_id: Yup.string().required('Required!')
                    })}
                    onSubmit={handleSubmit}
                >
                    {
                        ({ }) => (
                            <Form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <FormControl
                                            control='select'
                                            label='Status'
                                            name='application_status_id'
                                            options={statusOptions}
                                            required={true}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FormControl
                                            control='input'
                                            label='Remarks'
                                            name='remarks'
                                        />
                                    </div>
                                </div>
                                <div className="">
                                    <CButton
                                        variant='primary'
                                        className='btn btn-primary btn-sm bg-primary shadow shadow-sm rounded-pill p-3 px-4 my-2'
                                        type='submit'
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving' : 'Save'}
                                    </CButton>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </Modal>
        </div>
    );
};

export default React.memo(ScrutinyTable);