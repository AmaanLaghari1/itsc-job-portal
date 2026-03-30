import { Form, Formik } from 'formik'
import FormControl from '../../components/FormControl'
import Alert from '../../components/Alert'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, uploadImage } from '../../actions/UserAction'
import axios from 'axios'
import CustomSelect from '../../components/CustomSelect'
import { CButton, CTab, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import * as API from '../../api/UserRequest'
import React, { use, useEffect } from 'react'

const ResearchAndPublicationAdd = ({ user_id }) => {
    const [loading, setLoading] = React.useState(false);
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
        research_journal_link: Yup.string().when('upload_type', {
            is: (upload_type) => upload_type === 1,
            then: (schema) => schema.required('Journal Link is required')
        }),
        research_journal_file: Yup.mixed().when('upload_type', {
            is: (upload_type) => upload_type === 2,
            then: (schema) => schema.required('Journal File is required')
        })
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

    const [researchPublications, setResearchPublications] = React.useState([]);

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

    return (
        <div>
            <h3>Research & Publications </h3>
            <p>
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
                        <CTable bordered className='mt-4'>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell className='fw-bold'>#</CTableHeaderCell>
                                    <CTableHeaderCell className='fw-bold'>Research Paper Title</CTableHeaderCell>
                                    <CTableHeaderCell className='fw-bold'>Research Journal Name</CTableHeaderCell>
                                    <CTableHeaderCell className='fw-bold'>Journal Category</CTableHeaderCell>
                                    <CTableHeaderCell className='fw-bold'>Online Publication Link</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {researchPublications.map((pub, i) => (
                                    <CTableRow key={pub.RESEARCH_PUBLICATION_ID}>
                                        <CTableDataCell>{i + 1}</CTableDataCell>
                                        <CTableDataCell>{pub.RESEARCH_TITLE}</CTableDataCell>
                                        <CTableDataCell>{pub.RESEARCH_JOURNAL}</CTableDataCell>
                                        <CTableDataCell>{pub.RESEARCH_JOURNAL_EDITION}</CTableDataCell>
                                        <CTableDataCell>
                                            <a href={pub.RESEARCH_JOURNAL_LINK} target="_blank" rel="noopener noreferrer">View Publication</a>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </div>
                )
            }

        </div>
    )
}

export default ResearchAndPublicationAdd