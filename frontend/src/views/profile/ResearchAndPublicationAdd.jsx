import { Field, Form, Formik } from 'formik'
import FormControl from '../../components/FormControl'
import Alert from '../../components/Alert.js';
import * as Yup from 'yup'
import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import * as API from '../../api/UserRequest'
import { useState, useEffect } from 'react'
import AlertConfirm from '../../components/AlertConfirm.js';
import { cilPen, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import Modal from '../../components/Modal.jsx';
import { useSelector } from 'react-redux';
import CustomSelect from '../../components/CustomSelect.jsx';

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
        research_journal_file: '',
        author_no: '',
        issn_no: '',
        publication_year: '',
        corresponding_author: false
    }

    const validationSchema = Yup.object({
        research_title: Yup.string().required('Research Title is required'),
        research_journal: Yup.string().required('Research Journal is required'),
        research_edition: Yup.string().required('Edition is required'),
        upload_type: Yup.string().required('Upload Type is required'),
        // research_journal_link: Yup.string().required('Link is required'),
        author_no: Yup.string().required('Author Number required'),
        issn_no: Yup.string().required('ISSN No. is required'),
        publication_year: Yup.string().required('Year is required')
    });

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
        // console.log(values);
        const formData = new FormData();
        formData.append('user_id', values.user_id);
        formData.append('research_title', values.research_title);
        formData.append('research_journal', values.research_journal);
        formData.append('research_edition', values.research_edition);
        formData.append('upload_type', values.upload_type);
        formData.append('issn_no', values.issn_no);
        formData.append('publication_year', values.publication_year);
        formData.append('corresponding_author', values.corresponding_author ? '1' : '0');
        formData.append(
            'author_no',
            Array.isArray(values.author_no)
                ? values.author_no.filter((v) => v !== '').join(',')
                : values.author_no || ''
        );

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
        resetForm();
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
            setResearchPublications(researchPublications.filter(pub => pub.RESEARCH_PUBLICATION_ID !== id));
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
        formData.append('issn_no', values.issn_no);
        formData.append('publication_year', values.publication_year);
        formData.append('corresponding_author', values.corresponding_author ? '1' : '0');
        formData.append(
            'author_no',
            Array.isArray(values.author_no)
                ? values.author_no.filter((v) => v !== '').join(',')
                : values.author_no || ''
        );

        try {
            const response = await API.updateResearchPublication(id, formData);
            getResearchPublications(user_id);

            Alert({
                status: true,
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
        // research_journal_link: Yup.string().required('Link is required'),
        author_no: Yup.string().required('Author Number required'),
        issn_no: Yup.string().required('ISSN No. is required'),
        publication_year: Yup.string().required('Year is required')
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
                onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
            >
                {
                    ({ values, setFieldValue }) => (
                        <Form className='py-3'>
                            <div className="row">
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='Research Paper Title / Book Chapter Title' name='research_title' required={true}
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
                                        <FormControl
                                            control='input'
                                            type='text'
                                            label='Online Publication Link (if any)'
                                            name='research_journal_link'
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

                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='ISSN No.' name='issn_no' required={true}
                                    />
                                </div>

                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='Publication Year' name='publication_year' required={true}
                                    />
                                </div>

                                <div className="col-sm-6 my-2">
                                    <CustomSelect
                                        className="form-control"
                                        label='Author Number'
                                        name='author_no'
                                        // isMulti={true}
                                        options={[
                                            { key: 1, value: '1' },
                                            { key: 2, value: '2' },
                                            { key: 3, value: '3' },
                                            { key: 4, value: '4' },
                                            { key: 5, value: '5' },
                                            { key: 6, value: '6' },
                                            { key: 7, value: '7' },
                                            { key: 8, value: '8' },
                                            { key: 9, value: '9' },
                                            { key: 10, value: '10' },
                                        ]}
                                        required={true}
                                    />
                                </div>

                                {/* Corresponding Author Switch */}
                                <div className="col-sm-6 my-2 d-flex flex-wrap align-items-center">
                                    <div className='m-0 w-100'>
                                        <label className="form-check-label fw-bold" htmlFor="active">
                                            Corresponding Author?
                                        </label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <Field
                                            className="form-check-input"
                                            name="corresponding_author"
                                            type="checkbox"
                                            role="switch"
                                            id="active"
                                            checked={values.corresponding_author == 1 ? true : false}
                                            onChange={(e) => {
                                                const value = e.target.checked ? 1 : 0;
                                                setFieldValue('corresponding_author', value);
                                            }}
                                        />
                                        {
                                            values.corresponding_author == 1 ? (
                                                <span className=''>Yes</span>
                                            ) : (
                                                <span className=''>No</span>
                                            )
                                        }

                                    </div>
                                </div>

                                <div className="col-sm-6 my-2 align-self-end">
                                    <CButton
                                        variant='primary'
                                        className='btn btn-primary rounded-pill my-2 p-2 px-4'
                                        type='submit'
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </CButton>
                                </div>
                            </div>
                        </Form>
                    )
                }
            </Formik>

            {
                // researchPublications.length > 0 && (
                    <div className="table-responsive">
                        <CTable color='success' small hover striped bordered responsive align='middle'>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell className='fw-bold small text-center'>#</CTableHeaderCell>
                                    <CTableHeaderCell className='fw-bold small text-center'>Research Paper Title / Book Chapter Title</CTableHeaderCell>
                                    <CTableHeaderCell className='fw-bold small text-center'>Research Journal Name</CTableHeaderCell>
                                    <CTableHeaderCell className='fw-bold small text-center'>Journal Category</CTableHeaderCell>
                                    <CTableHeaderCell className='fw-bold small text-center'>Author No</CTableHeaderCell>
                                    <CTableHeaderCell className='fw-bold small text-center'>ISSN No.</CTableHeaderCell>
                                    <CTableHeaderCell className='fw-bold small text-center'>Source Link</CTableHeaderCell>
                                    <CTableHeaderCell className='fw-bold small text-center'>Publication Year</CTableHeaderCell>
                                    <CTableHeaderCell className='fw-bold small text-center'>Corresponding Author</CTableHeaderCell>
                                    <CTableHeaderCell className='fw-bold small text-center'>Action</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {
                                    researchPublications.length > 0 ? (

                                        researchPublications.map((pub, i) => (
                                            <CTableRow key={pub.RESEARCH_PUBLICATION_ID}>
                                                <CTableDataCell className='small'>{i + 1}</CTableDataCell>
                                                <CTableDataCell
                                                    className='text-wrap small'
                                                >
                                                    {/* <div className='small' style={{minWidth: '400px'}}> */}
                                                    {pub.RESEARCH_TITLE}
                                                    {/* </div> */}
                                                </CTableDataCell>
                                                <CTableDataCell className='text-wrap small'>
                                                    {pub.RESEARCH_JOURNAL}
                                                </CTableDataCell>
                                                <CTableDataCell className='small text-center'>{pub.RESEARCH_JOURNAL_EDITION}</CTableDataCell>
                                                <CTableDataCell className='small text-center'>{pub.AUTHOR_NO ?? '-'}</CTableDataCell>
                                                <CTableDataCell className='small text-center'>{pub.ISSN_NO ?? '-'}</CTableDataCell>
                                                <CTableDataCell className='small text-center'>
                                                    {
                                                        pub.RESEARCH_JOURNAL_LINK ? (
                                                            <a href={pub.RESEARCH_JOURNAL_LINK} target="_blank" rel="noopener noreferrer">View</a>
                                                        ) : 'N/A'
                                                    }
                                                </CTableDataCell>
                                                <CTableDataCell className='small text-center'>{pub.PUBLICATION_YEAR ?? 'N/A'}</CTableDataCell>
                                                <CTableDataCell className='small text-center'>
                                                    {pub?.CORRESPONDING_AUTHOR ? (
                                                        <span className='badge bg-success'>Yes</span>
                                                    ) : (
                                                        <span className='badge bg-danger'>No</span>
                                                    )}
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    <div className="d-flex">
                                                        <CButton
                                                            variant='success'
                                                            className='btn btn-success text-light rounded-pill m-1'
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
                                                            className='btn btn-danger text-light m-1'
                                                            onClick={() => { handleDelete(pub.RESEARCH_PUBLICATION_ID) }}
                                                            size='sm'
                                                        >
                                                            <CIcon icon={cilTrash} size="sm" />
                                                        </CButton>
                                                    </div>
                                                </CTableDataCell>
                                            </CTableRow>
                                        ))

                                    )
                                        :
                                        (
                                            <CTableRow>
                                                <CTableDataCell colSpan="10" className="text-center">
                                                    No research publications found.
                                                </CTableDataCell>
                                            </CTableRow>
                                        )
                                }

                            </CTableBody>
                        </CTable>
                    </div>
                // )
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
                        author_no: selectedPublication?.AUTHOR_NO
                            ? selectedPublication.AUTHOR_NO[0]
                            : '',
                        issn_no: selectedPublication?.ISSN_NO || '',
                        publication_year: selectedPublication?.PUBLICATION_YEAR || '',
                        corresponding_author: selectedPublication?.CORRESPONDING_AUTHOR || false
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
                                    <FormControl control='input' type='text' label='Research Paper Title / Book Chapter Title' name='research_title' required={true}
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
                                <div className="col-sm-6 my-2">
                                    <FormControl
                                        control='input'
                                        type='text'
                                        label='Online Publication Link (if any)'
                                        name='research_journal_link'
                                    />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='ISSN No.' name='issn_no' required={true}
                                    />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <FormControl control='input' type='text' label='Publication Year' name='publication_year' required={true}
                                    />
                                </div>
                                <div className="col-sm-6 my-2">
                                    <CustomSelect
                                        className="form-control"
                                        label='Author Number'
                                        name='author_no'
                                        // isMulti={true}
                                        options={[
                                            { key: 1, value: '1' },
                                            { key: 2, value: '2' },
                                            { key: 3, value: '3' },
                                            { key: 4, value: '4' },
                                            { key: 5, value: '5' },
                                            { key: 6, value: '6' },
                                            { key: 7, value: '7' },
                                            { key: 8, value: '8' },
                                            { key: 9, value: '9' },
                                            { key: 10, value: '10' },
                                        ]}
                                        required={true}
                                    />
                                </div>

                                {/* Corresponding Author Switch */}
                                <div className="col-sm-6 my-2 d-flex flex-wrap align-items-center">
                                    <div className='m-0 w-100'>
                                        <label className="form-check-label fw-bold" htmlFor="active">
                                            Corresponding Author?
                                        </label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <Field
                                            className="form-check-input"
                                            name="corresponding_author"
                                            type="checkbox"
                                            role="switch"
                                            id="active"
                                            checked={values.corresponding_author == 1 ? true : false}
                                            onChange={(e) => {
                                                const value = e.target.checked ? 1 : 0;
                                                setFieldValue('corresponding_author', value);
                                            }}
                                        />
                                        {
                                            values.corresponding_author == 1 ? (
                                                <span className='fw-bold'>Yes</span>
                                            ) : (
                                                <span className='fw-bold'>No</span>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="col-sm-6 align-self-end">
                                    <CButton
                                        variant='primary'
                                        className='btn btn-primary rounded-pill my-2 p-2 px-4'
                                        type='submit'
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </CButton>
                                </div>
                            </div>
                        </Form>
                    )}

                </Formik>


            </Modal>

        </div>
    )
}

export default ResearchAndPublicationAdd