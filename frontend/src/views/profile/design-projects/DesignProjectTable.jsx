import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import * as API from '../../../api/UserRequest'
import AlertConfirm from '../../../components/AlertConfirm.js';
import CIcon from '@coreui/icons-react';
import { cilPen, cilTrash } from '@coreui/icons';
import Alert from '../../../components/Alert';
import Modal from '../../../components/Modal';
import { useState } from 'react';
import DesignProjectUpdate from './DesignProjectUpdate.jsx';
import { formatDate } from '../../../helper.js';


const DesignProjectTable = ({ designProjects, setDesignProjects, getDesignProjects }) => {
    const [visible, setVisible] = useState(false)
    const [selectedProject, setSelectedProject] = useState(null)

    const handleCloseModal = () => {
        setVisible(false)
    }

    const handleDelete = async (id) => {
        const confirmed = await AlertConfirm({
            title: 'Delete item?',
            text: 'This action cannot be undone.',
        });
        if (!confirmed) return;
        try {
            const response = await API.deleteDesignProject(id)
            // console.log("Design project deleted:", response)
            setDesignProjects(designProjects.filter(project => project.PROJECT_ID !== id))
        } catch (error) {
            Alert({
                title: 'Error',
                text: 'Failed to delete design project. Please try again.',
                icon: 'error',
            });
            console.error("Error deleting design project:", error)
        }
    }

    return (
        <div className='py-3'>
            <CTable color='success' hover striped bordered responsive align='middle'>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell className="small">
                            #
                        </CTableHeaderCell>
                        <CTableHeaderCell className="small">
                            Title
                        </CTableHeaderCell>
                        <CTableHeaderCell className="small">
                            Client / Sponsor
                        </CTableHeaderCell>
                        <CTableHeaderCell className="small">
                            Nature of Project / Exhibition
                        </CTableHeaderCell>
                        <CTableHeaderCell className="small">
                            Date
                        </CTableHeaderCell>
                        <CTableHeaderCell className="small">
                            Venue
                        </CTableHeaderCell>
                        <CTableHeaderCell className="small">
                            Actions
                        </CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {
                        designProjects.length > 0 ? (
                            designProjects.map((project, index) => (
                                <CTableRow key={project.PROJECT_ID}>
                                    <CTableDataCell className="small">
                                        {index + 1}
                                    </CTableDataCell>
                                    <CTableDataCell className="small">
                                        {project.TITLE ?? '-'}
                                    </CTableDataCell>
                                    <CTableDataCell className="small">
                                        {project.CLIENT ?? '-'}
                                    </CTableDataCell>
                                    <CTableDataCell className="small">
                                        {project.NATURE_OF_PROJECT ?? '-'}
                                    </CTableDataCell>
                                    <CTableDataCell className="small">
                                        {formatDate(project.DATE) ?? '-'}
                                    </CTableDataCell>
                                    <CTableDataCell className="small">
                                        {project.VENUE ?? '-'}
                                    </CTableDataCell>
                                    <CTableDataCell className="small">
                                        <CButton className='text-light m-1' color="success" size="sm"
                                        onClick={() => {
                                            setVisible(true)
                                            setSelectedProject(project)    
                                        }}
                                        >
                                            <CIcon icon={cilPen} />
                                        </CButton>
                                        <CButton className='text-light m-1' color="danger" size="sm" onClick={() => handleDelete(project.PROJECT_ID)}>
                                            <CIcon icon={cilTrash} />
                                        </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            ))
                        ) : (
                            <CTableRow>
                                <CTableDataCell colSpan="7" className="text-center">
                                    No design projects found.
                                </CTableDataCell>
                            </CTableRow>
                        )
                    }
                </CTableBody>
            </CTable>

            <Modal
                setVisible={setVisible}
                visible={visible}
                size="lg"
                position="center"
                onClose={handleCloseModal}
            >
                <DesignProjectUpdate previousData={selectedProject} onUpdate={getDesignProjects} handleCloseModal={handleCloseModal} />
            </Modal>
        </div>
    )
}

export default DesignProjectTable