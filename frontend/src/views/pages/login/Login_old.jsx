import './Login.css'
import logo from '../../../assets/images/logos/usindh-logo.png'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../actions/AuthAction.js'
import Alert from '../../../components/Alert.js'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { getRecentAnnouncement } from '../../../api/AnnouncementRequest.js'
import { Link } from 'react-router-dom'
import logoWhite from '../../../assets/images/logos/usindh-logo-white.png'
import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import { CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'
import HtmlRenderer from '../../../components/HTMLRenderer.jsx'
import Modal from '../../../components/Modal.jsx'
import { formatDate } from '../../../helper.js'

const Login = () => {
    const [visible, setVisible] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const theme = useSelector(state => state.ui.theme)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [announcements, setAnnouncements] = useState([])

    const handleView = (announcement) => {
        setSelectedAnnouncement(announcement);
        setVisible(true);
    };

    const handleCloseModal = () => {
        setVisible(false);
        setSelectedAnnouncement(null);
    };

    const fetchAnnouncements = async () => {
        try {
            const response = await getRecentAnnouncement()
            setAnnouncements(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAnnouncements()
    }, [])

    const initialValues = {
        cnic_no: '',
        password: '',
    }

    const validations = Yup.object({
        cnic_no: Yup.string().required('CNIC No. is required!'),
        password: Yup.string().required('Password is required!'),
    })

    const handleSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
        setSubmitting(false)
        setLoading(true)
        const response = await dispatch(login(values))
        if (response.success) {
            //   Alert({status: true, text: response.data.message || 'logged in'})
        }
        else {
            Alert({ status: false, text: response.error.error_message || 'login failed' })
        }
        resetForm({ values: values })
        setLoading(false)
    }

    // console.log(announcements)

    return (
        <div>
            <div style={{ minHeight: '100vh', zIndex: 1 }} className="container-fluid p-2 overflow-hidden">
                <div className="row">
                    <div className="col-12 col-sm-6 h-100 p-2 order-2 order-sm-1">
                        <div className="h-100 d-block m-auto overflow-hidden">
                            <h5 className='fw-bolder mx-3 p-2'>Recent Announcements</h5>
                            <div className='px-3' style={{ minHeight: '88vh', maxHeight: '88vh', overflowY: 'scroll' }}>
                                <CTable striped hover bordered style={{ tableLayout: 'fixed' }}>
                                    <CTableHead className="bg-danger" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                                        <CTableRow>
                                            <CTableHeaderCell className="col-1 bg-primary text-white fw-bold text-center">#</CTableHeaderCell>
                                            <CTableHeaderCell className="bg-primary text-white fw-bold">Announcement</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>

                                    <CTableBody className='w-100' style={{ maxHeight: '18rem', overflowY: 'auto' }}>
                                        {
                                            announcements.length < 1 ? (
                                                <CTableRow>
                                                    <CTableHeaderCell colSpan={2} className='text-center'>No announcements available at the moment!</CTableHeaderCell>
                                                </CTableRow>
                                            ) : (
                                                announcements.map((item, index) => (
                                                    <CTableRow key={item.ANNOUNCEMENT_ID}>
                                                        <CTableHeaderCell scope="row" className="text-center align-middle">
                                                            <div className="d-flex justify-content-center align-items-center fw-bold" style={{ height: '100%' }}>
                                                                {index + 1}
                                                            </div>
                                                        </CTableHeaderCell>
                                                        <CTableDataCell
                                                        style={{cursor: 'pointer'}}
                                                        onClick={() => handleView(item)}>
                                                            <div
                                                                className='scrollable-title fw-bold'
                                                            >
                                                                {item.ANNOUNCEMENT_TITLE}
                                                            </div>
                                                        </CTableDataCell>
                                                        {/* <CTableDataCell className='text-center align-middle'>
                                                            <CIcon
                                                                className='text-warning'
                                                                icon={cibDrone}
                                                                size="md"
                                                                onClick={() => handleView(item)}
                                                                style={{ cursor: 'pointer' }}
                                                            />
                                                        </CTableDataCell> */}
                                                    </CTableRow>
                                                ))
                                            )
                                        }
                                    </CTableBody>
                                </CTable>

                                {/* Dynamic Modal for Selected Announcement */}
                                {selectedAnnouncement && (
                                    <Modal
                                        setVisible={setVisible}
                                        visible={visible}
                                        size={'lg'}
                                        position='center'
                                        onClose={handleCloseModal}
                                    >
                                        <CCard className="shadow shadow-lg my-5 border-0">
                                            <CCardBody>
                                                <CCardTitle className='fw-bolder h3'>
                                                    {selectedAnnouncement.ANNOUNCEMENT_TITLE ?? 'NA'}
                                                </CCardTitle>
                                                <CCardText>
                                                    <span className="fw-bold">Position: </span>
                                                    {selectedAnnouncement.POSITION_NAME ?? 'NA'} <br />
                                                    <span className="fw-bold">Department: </span>
                                                    {selectedAnnouncement?.department.DEPT_NAME ?? 'NA'}
                                                </CCardText>

                                                <div>
                                                    {
                                                        selectedAnnouncement?.qualification_requirements?.length > 0 &&
                                                        <h6 className='fw-bold'>Required Qualifications:</h6>
                                                    }
                                                    <ul>
                                                        {
                                                            selectedAnnouncement.qualification_requirements.length > 0 &&
                                                            selectedAnnouncement.qualification_requirements.map(require => {
                                                                return (
                                                                    <li key={require.REQ_ID}>
                                                                        {require.degree.DEGREE_TITLE} - {require.IS_REQUIRED == 1 ? 'Required' : 'Preferred'}
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>

                                                <div>
                                                    <h6 className="">
                                                        <span className="fw-bold">
                                                            Required Age:
                                                        </span> {selectedAnnouncement.AGE_FROM ?? 'NA'} to {selectedAnnouncement.AGE_TO ?? 'NA'} years
                                                    </h6>
                                                </div>

                                                <div className="border-bottom border-1 mb-2 border-secondary-subtle"></div>

                                                {/* Description */}
                                                <div className='lead'>
                                                    <HtmlRenderer htmlContent={selectedAnnouncement.DESCRIPTION || ''} />
                                                </div>

                                                {/* Dates */}
                                                <div className="d-flex flex-wrap justify-content-between mt-3">
                                                    <CCardText className='text-muted fw-bold'>
                                                        Posted: {formatDate(selectedAnnouncement.START_DATE)}
                                                    </CCardText>
                                                    <CCardText className='text-muted fw-bold'>
                                                        Last date to apply: {formatDate(selectedAnnouncement.END_DATE)}
                                                    </CCardText>
                                                </div>
                                                <div className="fw-bold text-danger text-center">
                                                    You need to be logged in to apply!
                                                </div>
                                            </CCardBody>
                                        </CCard>
                                    </Modal>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 order-1 order-1 order-sm-2">
                        <div className="row">
                            <div className="col-12 col-lg-8 mx-auto">
                                <div className="col-10 mx-auto">
                                    <div className="d-flex align-items-center flex-wrap mt-5">
                                        <img src={theme == 'dark' ? logoWhite : logo} width='150' className='' alt="Usindh Logo" />
                                    </div>
                                    <h2 className='fw-bolder my-4 border-bottom border-bottom-2 border-success pb-3 text-center'>University of Sindh Careers</h2>
                                    <h3 className='fw-bold mt-5 mb-4'>Login</h3>
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validations}
                                        onSubmit={handleSubmit}
                                    >
                                        <Form>
                                            <div className="form-group my-2">
                                                <label className='form-label fw-bold' htmlFor="cnic_no">
                                                    CNIC No.
                                                </label>
                                                <Field type="text" className="form-control border-0 border-bottom border-3 rounded-0" placeholder='41304******' name='cnic_no' id='cnic_no'
                                                    onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 13)}
                                                />
                                                <div className="small text-danger">
                                                    <ErrorMessage name='cnic_no' />
                                                </div>
                                            </div>
                                            <div className="form-group my-2">
                                                <label className='form-label fw-bold' htmlFor="password">
                                                    Password
                                                </label>
                                                <Field type="password" className="form-control border-0 border-bottom border-3 rounded-0" placeholder='********' name='password' id='password' />
                                                <div className="small text-danger">
                                                    <ErrorMessage name='password' />
                                                </div>
                                            </div>
                                            <button className="btn btn-primary btn-sm bg-primary shadow shadow-sm rounded-pill p-3 px-5 mt-4" type='submit' disabled={loading}>
                                                {loading ? 'Logging in...' : 'Login'}
                                            </button>
                                            <div className="d-flex justify-content-between flex-wrap mt-3 py-2">
                                                <p className='small'>Don't have an account? &nbsp;
                                                    <Link to='/register' className='text-decoration-none'>Register</Link>
                                                </p>
                                                <p className="small">
                                                    <Link to='/forgot-password' className='text-decoration-none'>Forgot Password?</Link>
                                                </p>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login