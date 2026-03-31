import { Form, Formik } from 'formik'
import FormControl from '../../components/FormControl'
import Alert from '../../components/Alert.js';
import * as Yup from 'yup'
import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import * as API from '../../api/UserRequest'
import { useState, useEffect, use } from 'react'
import AlertConfirm from '../../components/AlertConfirm.js';
import { cilPen, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import Modal from '../../components/Modal.jsx';
import { useSelector } from 'react-redux';


const ResearchAndPublicationAdd = () => {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selectedPublication, setSelectedPublication] = useState(null);
    const auth = useSelector(state => state.auth.authData)
    const user_id = auth.user.USER_ID || '';

    const handleCloseModal = () => {
        setVisible(false);
        setSelectedPublication(null);
    }

    const initialValues = {
        user_id: user_id,
        research_title: '',
        research_journal: '',
        research_edition: '',
        upload_type: 1,
        research_journal_link: '',
        research_journal_file: ''
    }

    const validationSchema = Yup.object({
        research_title: Yup.string().required('Research Title is required'),
        research_journal: Yup.string().required('Research Journal is required'),
        research_edition: Yup.string().required('Edition is required'),
        upload_type: Yup.string().required('Upload Type is required'),
        research_journal_link: Yup.string().required('Link is required')
    });

    const handleSubmit = async (values) => {
        setLoading(true);
        // console.log(values);
        const formData = new FormData();
        formData.append('user_id', values.user_id);
        formData.append('research_title', values.research_title);
        formData.append('research_journal', values.research_journal);
        formData.append('research_edition', values.research_edition);
        formData.append('upload_type', values.upload_type);
        if (values.upload_type == 1) {
            formData.append('research_journal_link', values.research_journal_link);
        }
        if (values.upload_type == 2) {
            console.log(values.research_journal_file);
            formData.append('research_journal_file', values.research_journal_file);
        }
        try {
            const response = await API.addResearchPublication(formData);
            // console.log("Research Publication Response -", response);
            getResearchPublications(user_id);
            Alert({ status: response.data.status, text: response.data.message || 'Research publication added successfully' })
        } catch (error) {
            console.log("Failed to add research publication -", error);
            Alert({ status: false, text: error.response?.data?.error_message || 'Some error occured' })
        }
        setLoading(false);

    }

    const [researchPublications, setResearchPublications] = useState([]);

    const getResearchPublications = async (user_id) => {
        try {
            const response = await API.getResearchPublications(user_id);
            // console.log("Research Publications -", response);
            setResearchPublications(response.data.data);
        } catch (error) {
            console.log("Failed to fetch research publications -", error);
        }
    }

    useEffect(() => {
        getResearchPublications(user_id);
    }, [])

    const handleDelete = async (id) => {
        const confirmed = await AlertConfirm({
            title: 'Delete item?',
            text: 'This action cannot be undone.',
        });
        if (!confirmed) return;
        try {
            const response = await API.deleteResearchPublication(id);
            // console.log("Delete Research Publication Response -", response);
            getResearchPublications(user_id);
            Alert({ status: response.data.status, text: response.data.message || 'Research publication deleted successfully' })
        } catch (error) {
            console.log("Failed to delete research publication -", error);
            Alert({ status: false, text: error.response?.data?.error_message || 'Some error occured' })
        }
    }

    const handleUpdate = async (values, id) => {
        setLoading(true);

        const formData = new FormData();
        formData.append('research_title', values.research_title);
        formData.append('research_journal', values.research_journal);
        formData.append('research_edition', values.research_edition);
        formData.append('research_journal_link', values.research_journal_link);

        try {
            const response = await API.updateResearchPublication(id, formData);
            getResearchPublications(user_id);

            Alert({
                status: response.data.status,
                text: response.data.message || 'Research publication updated successfully'
            });

            handleCloseModal();
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    const updateValidationSchema = Yup.object({
        research_title: Yup.string().required('Research Title is required'),
        research_journal: Yup.string().required('Research Journal is required'),
        research_edition: Yup.string().required('Edition is required'),
        research_journal_link: Yup.string().required('Link is required')
    });


    return (
        <div>
            <h3>Research & Publications </h3>
            <p className='text-danger fw-bold'>
                (Required For Professor / Associate Professor)
            </p>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => handleSubmit(values)}
            >
                {
                    ({ values, setFieldValue }) => (
                        <Form className='py-3' encType='multipart/form-data'>
                            <div className="row">
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='Research Paper Title' name='research_title' required={true}
                                    />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='Research Journal Name' name='research_journal' required={true}
                                    />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='Journal Category (W, X, Y, etc)' name='research_edition' required={true}
                                    />
                                </div>
                                {/* <div className="col-sm-6 my-2">
                                    <FormControl control='radio' label='Upload Type' name='upload_type' required={true}
                                        options={[
                                            { key: 1, value: 'Link' },
                                            { key: 2, value: 'File' },
                                        ]}
                                        onChange={(e) => {
                                            alert(e.target.value)
                                            setFieldValue('upload_type', parseInt(e.target.value));
                                            setFieldValue('research_journal_link', '');
                                            setFieldValue('research_journal_file', '');
                                        }}
                                    />
                                </div> */}

                                <div className="col-sm-6 my-2">
                                    {values.upload_type == 1 ? (
                                        <FormControl control='input' type='text' label='Online Publication Link' name='research_journal_link' required={true}
                                        />
                                    ) :
                                        (
                                            <FormControl
                                                control='input'
                                                type='file'
                                                label='Upload Journal File'
                                                name='research_journal_file'
                                                required={true}
                                                setFieldValue={setFieldValue}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                            <CButton
                                variant='primary'
                                className='btn btn-primary rounded-pill my-2 p-2 px-4'
                                type='submit'
                                disabled={loading}
                            >
                                {loading ? 'Adding...' : 'Add New'}
                            </CButton>
                        </Form>
                    )

                }
            </Formik>

            {
                researchPublications.length > 0 && (
                    <div className="table-responsive">
                        <CTable bordered striped className='mt-4 table-hover align-middle'>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell className='fw-bold'>#</CTableHeaderCell>
                                    <CTableHeaderCell className='fw-bold'>Research Paper Title</CTableHeaderCell>
                                    <CTableHeaderCell className='fw-bold'>Research Journal Name</CTableHeaderCell>
                                    <CTableHeaderCell className='fw-bold'>Journal Category</CTableHeaderCell>
                                    <CTableHeaderCell className='fw-bold'>Online Publication Link</CTableHeaderCell>
                                    <CTableHeaderCell className='fw-bold'>Action</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {researchPublications.map((pub, i) => (
                                    <CTableRow key={pub.RESEARCH_PUBLICATION_ID}>
                                        <CTableDataCell valign='center'>{i + 1}</CTableDataCell>
                                        <CTableDataCell valign='center'>{pub.RESEARCH_TITLE}</CTableDataCell>
                                        <CTableDataCell valign='center'>{pub.RESEARCH_JOURNAL}</CTableDataCell>
                                        <CTableDataCell valign='center'>{pub.RESEARCH_JOURNAL_EDITION}</CTableDataCell>
                                        <CTableDataCell>
                                            <a href={pub.RESEARCH_JOURNAL_LINK} target="_blank" rel="noopener noreferrer">View Publication</a>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <CButton
                                                variant='success'
                                                className='btn btn-success rounded-pill me-2'
                                                onClick={() => {
                                                    setSelectedPublication(pub);
                                                    setVisible(true);
                                                }}
                                                size='sm'
                                            >
                                                <CIcon icon={cilPen} size="sm" />
                                            </CButton>

                                            <CButton
                                                variant='danger'
                                                className='btn btn-danger'
                                                onClick={() => { handleDelete(pub.RESEARCH_PUBLICATION_ID) }}
                                                size='sm'
                                            >
                                                <CIcon icon={cilTrash} size="sm" />
                                            </CButton>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </div>
                )
            }

            <Modal
                setVisible={setVisible}
                visible={visible}
                size="lg"
                position="center"
                onClose={handleCloseModal}
            >
                <h4>Edit Publication</h4>
                <Formik
                    initialValues={{
                        research_title: selectedPublication?.RESEARCH_TITLE || '',
                        research_journal: selectedPublication?.RESEARCH_JOURNAL || '',
                        research_edition: selectedPublication?.RESEARCH_JOURNAL_EDITION || '',
                        research_journal_link: selectedPublication?.RESEARCH_JOURNAL_LINK || '',
                    }}
                    enableReinitialize={true}
                    validationSchema={updateValidationSchema}
                    onSubmit={
                        (values) => { handleUpdate(values, selectedPublication.RESEARCH_PUBLICATION_ID) }
                    }
                >
                    {({ values, setFieldValue }) => (
                        <Form className='py-3' encType='multipart/form-data'>
                            <div className="row">
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='Research Paper Title' name='research_title' required={true}
                                    />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='Research Journal Name' name='research_journal' required={true}
                                    />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='Journal Edition' name='research_edition' required={true}
                                    />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='Journal Link' name='research_journal_link' required={true}
                                    />
                                </div>

                            </div>
                            <CButton
                                variant='primary'
                                className='btn btn-primary rounded-pill my-2 p-2 px-4'
                                type='submit'
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Update'}
                            </CButton>
                        </Form>
                    )}

                </Formik>


            </Modal>

        </div>
    )
}

export default ResearchAndPublicationAdd