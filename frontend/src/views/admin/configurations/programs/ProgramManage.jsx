import { useEffect, useMemo, useState } from "react";
import { getDegreeProgram } from "../../../../api/QualificationRequest";
import { mapOptions } from "../../../../helper";
import CustomSelect from "../../../../components/CustomSelect";
import { Field, Form, Formik } from "formik";
import DynamicDataTable from "../../../../components/data_table/DynamicDataTable";
import Modal from "../../../../components/Modal";
import { useSelector } from "react-redux";
import FormControl from "../../../../components/FormControl";
import { CButton } from "@coreui/react";
import { createDiscipline, updateDiscipline, getDisciplineByProgramId, setDisciplineStatus } from "../../../../api/ProgramRequest";
import Alert from "../../../../components/Alert";
import * as Yup from 'yup'

const ProgramManage = () => {
    const [programs, setPrograms] = useState([]);
    const [disciplines, setDisciplines] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [selectedProgramId, setSelectedProgramId] = useState(null);
    const [visible, setVisible] = useState(false);
    const currentRole = useSelector(state => state.roles.selectedRole);


    const handleView = (item) => {
        setVisible(true);
        setSelectedRowData(item);  // Edit mode
    };

    const handleCloseModal = () => {
        setVisible(false);
        setSelectedRowData(null); // Reset when closing modal
    };

    const fetchPrograms = async () => {
        try {
            const response = await getDegreeProgram();
            setPrograms(response.data.options);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    const programOptions = useMemo(() =>
        mapOptions(programs, 'DEGREE_ID', 'DEGREE_TITLE'), [programs]);

    const handleProgramChange = async (selectedOption, setFieldValue) => {
        setFieldValue('degree_id', selectedOption?.key || '');
        try {
            const response = await getDisciplineByProgramId(selectedOption?.key);
            setDisciplines(response.data.data);
            setSelectedProgramId(selectedOption?.key)
        } catch (error) {
            console.log(error);
        }
    };

    const handleFormSubmit = async (values, { setSubmitting }) => {
        try {
            if (selectedRowData) {
                // PUT request to update
                const response = await updateDiscipline(values, selectedRowData.DISCIPLINE_ID);
                setDisciplines(prevDisciplines =>
                    prevDisciplines.map(discipline =>
                        discipline.DISCIPLINE_ID === selectedRowData.DISCIPLINE_ID
                            ? { ...discipline, DISCIPLINE_NAME: values.discipline_name }
                            : discipline
                    )
                );
                Alert({ status: true, text: response?.data?.message || 'Discipline updated successfully...' })
            } else {
                // POST request to create new
                const response = await createDiscipline(values);
                console.log(response)
                setDisciplines(prevDisciplines => [
                    ...prevDisciplines,
                    { DISCIPLINE_ID: response.data.data.DISCIPLINE_ID, DISCIPLINE_NAME: values.discipline_name }
                ]);
                Alert({ status: true, text: response?.data?.message || 'Discipline added successfully...' })
            }
            setSubmitting(false);
            handleCloseModal();
            fetchPrograms();  // Refetch data after submit
        } catch (error) {
            // console.log(error)
            Alert({ status: false, text: error.response?.data?.error_message })
            setSubmitting(false);
        }
    };

    const columns = [
        {
            name: "ID",
            selector: (row) => row.DISCIPLINE_ID,
            sortable: true,
            width: "80px",
        },
        {
            name: "Discipline Name",
            selector: (row) => row.DISCIPLINE_NAME,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                currentRole === 1 || currentRole === 2 ?
                    <div className="d-flex align-items-center flex-wrap gap-1">
                        <button className="btn btn-outline-success btn-sm" onClick={() => { handleView(row); }}>
                            Edit
                        </button>
                    </div>
                    : '-'
            ),
            ignoreRowClick: true,
            width: "80px",
        },
        {
            name: "Active",
            cell: (row) => <>
                <Formik
                    initialValues={{
                        active: row.ACTIVE
                    }}
                    onSubmit={async (values) => {
                        try {
                            const response = await setDisciplineStatus(values, row.DISCIPLINE_ID)
                            // console.log(response)
                        } catch (error) {
                            console.log(error)
                        }
                    }}
                >
                    {({ values, setFieldValue, submitForm }) => (
                        <Form>
                            <div className="form-check form-switch">
                                <Field
                                    className="form-check-input"
                                    name="active"
                                    type="checkbox"
                                    role="switch"
                                    id="active"
                                    checked={row.ACTIVE == 1 ? true : false}
                                    onChange={(e) => {
                                        const value = e.target.checked ? 1 : 0;
                                        setFieldValue('active', value);
                                        submitForm();
                                    }}
                                />
                                <label className="form-check-label" htmlFor="active">
                                </label>
                            </div>
                        </Form>
                    )}
                </Formik>

            </>,
            sortable: true,
            width: "100px",
        },
    ];

    return (
        <div>
            <div className="row mb-3">
                <Formik
                    initialValues={{ degree_id: '' }}
                    onSubmit={() => { }}
                >
                    {({ values, setFieldValue }) =>
                        <Form>
                            <CustomSelect
                                className="form-control form-control-sm bg-primary text-light"
                                label="Select Program"
                                name="degree_id"
                                options={programOptions}
                                onChange={(selectedOption) => {
                                    handleProgramChange(selectedOption, setFieldValue);
                                }}
                                required={true}
                            />
                        </Form>
                    }
                </Formik>
            </div>

            <button className="btn btn-primary btn-sm" onClick={() => { handleView(null); }}>
                Add New +
            </button>

            <DynamicDataTable
                title="Disciplines"
                columns={columns}
                data={disciplines}
            />

            <Modal
                setVisible={setVisible}
                visible={visible}
                size={'md'}
                position='center'
                onClose={handleCloseModal}
            >
                <Formik
                    initialValues={{
                        degree_id: selectedProgramId || '',
                        discipline_id: selectedRowData ? selectedRowData.DISCIPLINE_ID : '',
                        discipline_name: selectedRowData ? selectedRowData.DISCIPLINE_NAME : '',
                    }}
                    validationSchema={Yup.object({
                        discipline_name: Yup.string().required('Discipline is required!')
                    })}
                    onSubmit={handleFormSubmit}
                >
                    {({ setFieldValue, isSubmitting }) =>
                        <Form>
                            <h3>{selectedRowData ? 'Edit Discipline' : 'Add Discipline'}</h3>
                            {
                                selectedRowData ? "" :
                                    <div className="form-group my-2">
                                        <FormControl
                                            control='select'
                                            label='Program'
                                            name='degree_id'
                                            options={programOptions}
                                            disabled
                                        />
                                    </div>
                            }
                            <div className="form-group my-2">
                                <FormControl
                                    control='input'
                                    name='discipline_name'
                                    label='Discipline Name'
                                    onInput={(e) => {
                                        e.target.value = e.target.value.toUpperCase();
                                    }}
                                    required={true}
                                />
                            </div>
                            <CButton
                                variant="success"
                                className="text-light"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </CButton>
                        </Form>
                    }
                </Formik>
            </Modal>
        </div>
    );
};

export default ProgramManage;
