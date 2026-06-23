import { CButton } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import AlertAdd from './AlertAdd'
import { deleteNoticeAlertMsg, getAllNoticeAlertMsg } from '../../../../api/AnnouncementRequest'
import DynamicDataTable from '../../../../components/data_table/DynamicDataTable'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import AlertConfirm from '../../../../components/AlertConfirm'

const Alert = () => {
    const [loading, setLoading] = useState([])
    const [notices, setNotice] = useState([])
    const navigate = useNavigate()

    const fetchNotices = async () => {
        try {
            const response = await getAllNoticeAlertMsg()
            // console.log(response)
            setNotice(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchNotices()
    }, [])

    const handleDelete = async (id) => {
        const confirm = await AlertConfirm({title: 'Are you sure?'})

        if(!confirm){
            return
        }
        
        try {
            const response = await deleteNoticeAlertMsg({alert_id: id})
            setNotice(notices.filter(item => item.ALERT_ID != id))
            Alert({
                status: true,
                text: 'Alert deleted successfully...'
            })
        } catch (error) {
            console.log(error)
        }
    }

    const columns = [
        {
            name: "ID",
            selector: (row) => row.ALERT_ID,
            sortable: true,
            width: "80px",
        },
        {
            name: 'Content',
            selector: row => row.CONTENT,
            width: '650px'
        },
        {
            name: 'Active',
            selector: row => row.IS_ACTIVE == 1 ? 'Active' : 'Inactive',
            width: '80px'
        },
        {
            name: 'Remarks',
            selector: row => row.REMARKS
        },
        {
            name: 'Action',
            cell: row => (
                <>
                    <CButton
                    variant='success'
                    size='sm'
                    className='mx-1'
                    onClick={() => {
                        navigate('/admin/announcement/alert/edit', {
                            state: {
                                prevValues: row
                            }
                        })
                    }}
                    >
                        Edit
                    </CButton>
                    <CButton
                    variant='danger'
                    size='sm'
                    onClick={() => {
                        handleDelete(row.ALERT_ID)
                    }}
                    >
                        Delete
                    </CButton>
                </>
            ),
            ignoreRowClick: true,
            width: "200px"
        }
    ]

    return (
        <div>
            <CButton
                variant='primary'
                size='sm'
                onClick={() => {
                    navigate('/admin/announcement/alert/add')
                }}
            >
                Add New <CIcon icon={cilPlus} />
            </CButton>
            <DynamicDataTable
                title="Page Alerts"
                columns={columns}
                data={notices}
            />
        </div>
    )
}

export default Alert