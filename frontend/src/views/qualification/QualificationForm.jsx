import React, { useState, useEffect, useMemo } from 'react'
import { Formik, Form, Field } from 'formik'
import FormControl from '../../components/FormControl'
import { CButton } from '@coreui/react'
import axios from 'axios'
import { mapOptions } from '../../helper.js'
import CustomSelect from '../../components/CustomSelect.jsx'
import { useSelector } from 'react-redux'

const QualificationForm = ({initialValues, validationRules, handleSubmit, loading}) => {
    const auth = useSelector(state => state.auth.authData)

    const [dropdownData, setDropdownData] = useState({
        programs: [],
        institutes: [],
        disciplines: []
    })

    async function fetchData(){
        try {
            const [programFetchResponse, instituteFetchResponse, disciplineFetchResponse] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}qualification/program`),
                axios.get(`${import.meta.env.VITE_API_URL}qualification/institute`),
                // axios.get(`${import.meta.env.VITE_API_URL}qualification/discipline`)
            ])

            setDropdownData({
                programs: programFetchResponse?.data.options || [],
                institutes: instituteFetchResponse?.data.options || [],
                disciplines: disciplineFetchResponse?.data.options || []
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const organizations = useMemo(() => {
        return dropdownData.institutes.map((institute) => {
            return institute
        }
    )})
    .filter((institute) => institute.IS_INST == 'Y')

    const institutes = useMemo(() => {
        return dropdownData.institutes.map((institute) => {
            return institute
        }
    )})
    .filter((institute) => institute.IS_INST == 'N')

    const instituteOptions = useMemo(() =>
        mapOptions(institutes, 'INSTITUTE_ID', 'INSTITUTE_NAME')
    )

    const orgOptions = useMemo(() =>
        mapOptions(organizations, 'INSTITUTE_ID', 'INSTITUTE_NAME')
    )

    const programs = useMemo(() => {
        return dropdownData.programs.map(program => program)
    })

    const programOptions = useMemo(() =>
        mapOptions(programs, 'DEGREE_ID', 'DEGREE_TITLE')
    )

    const disciplineOptions = useMemo(() =>
        mapOptions(dropdownData.disciplines, 'DISCIPLINE_ID', 'DISCIPLINE_NAME')
    )

    const handleDegreeProgamChange = async (programId) => {
        if (!programId) {
            setDropdownData((prevData) => ({ ...prevData, disciplines: [] }));
            return;
        }
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}qualification/discipline/${programId}`)
            setDropdownData((prevData) => ({
                ...prevData,
                disciplines: response.data?.options || [],
            }));
        } catch (error) {
            
        }
    }
    
    const handleInstituteChange = async (inputValue) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}qualification/institute?search=${inputValue}`)
            setDropdownData((prev) => {return {
                ...prev,
                institutes: response?.data?.options || []
            }})
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationRules}
    onSubmit={handleSubmit}
    >
    {
    ({setFieldValue, values}) => {
    return <Form>
        <div className="row">
            
            <div className="col-md-12">
                <div className="form-group my-2">
                <CustomSelect
                className="form-control"
                label="Level"
                name="degree_program"
                options={programOptions} // Options should be dynamically loaded if using async
                onChange={(selectedOption) => {
                    setFieldValue('degree_program', selectedOption?.key || '')
                    handleDegreeProgamChange(selectedOption.key || '')
                }}
                required={true}
                />

                </div>
            </div>
 
            <div className="col-md-6">
                <div className="form-group my-2">
                    <CustomSelect
                    className="form-control"
                    label="Discipline"
                    name="discipline_id"
                    options={disciplineOptions} // Options should be dynamically loaded if using async
                    onChange={(selectedOption) => {
                        setFieldValue('discipline_id', selectedOption?.key || '')
                    }}
                    required={true}
                    />
                </div>
            </div>           
            <div className="col-md-6">
                <div className="form-group my-2">
                <CustomSelect
                className="form-control"
                label="University/Board"
                name="organization_id"
                options={orgOptions} // Options should be dynamically loaded if using async
                onChange={(selectedOption) => {
                    setFieldValue('organization_id', selectedOption?.key || '')
                }}
                required={true}
                />

                </div>
            </div>
            
            <div className="col-md-6">
                <div className="form-group my-2">
                    <CustomSelect
                    className='form-control'
                    label='Institute'
                    name='institute_id'
                    options={instituteOptions}
                    onChange={
                        (selectedOption) => {
                            setFieldValue('institute_id', selectedOption?.key || '')
                        }
                    }
                    onSearchChange={handleInstituteChange} // Fetch results on search input
                    required={true}
                    />
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group my-2">
                    <FormControl 
                    control='input' 
                    type='text' 
                    label='Major Subject' 
                    name='major'
                    />
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group my-2">
                    <FormControl 
                    control='input' 
                    type='text' 
                    label='Obtained Marks' 
                    name='obtained_marks'
                    onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5);
                    }}
                    required={true}
                    />
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group my-2">
                    <FormControl 
                    control='input' 
                    type='text' 
                    label='Total Marks' 
                    name='total_marks'
                    onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5);
                    }}
                    required={true}
                    />
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group my-2">
                    <FormControl 
                    control='input' 
                    type='text' 
                    label='Passing Year' 
                    name='passing_year'
                    onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
                    }}
                    required={true}
                    />
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group my-2">
                    <FormControl 
                    control='input' 
                    type='text' 
                    label='Roll No./Seat No.' 
                    name='roll_no'
                    required={true}
                    />
                </div>
            </div>
            <div className="col-6 col-md-3">
                <div className="form-group my-2">
                    <FormControl 
                    control='date' 
                    type='date' 
                    label='Start Date' 
                    name='start_date' 
                    />
                </div>
            </div>
            <div className="col-6 col-md-3">
                <div className="form-group my-2">
                    <FormControl 
                    control='date' 
                    type='date' 
                    label='End Date' 
                    name='end_date' 
                    />
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group my-2">
                    {/* <CustomSelect
                    className="form-control"
                    label="Is Result Declared?"
                    name="is_result_declare"
                    options={[
                        {key: 'Y', value: 'Yes'},
                        {key: 'N', value: 'No'},
                    ]}
                    onChange={(selectedOption) => {
                        setFieldValue('is_result_declare', selectedOption?.key || '')
                    }}
                    /> */}
                    <label htmlFor="is_result_decare">Is Result Declared?</label>
                    <Field
                    as='select'
                    id='is_result_decare'
                    name='is_result_declare'
                    className='form-control'
                    onChange={(e) => {
                        setFieldValue('is_result_declare', e.target.value)
                    }
                    }
                    >
                        <option value=''>Select...</option>
                        <option value='Y'>Yes</option>
                        <option value='N'>No</option>
                    </Field>
                </div>
            </div>
            <div className="col-md-3">
                <div className="form-group my-2">
                    {/* <CustomSelect
                    className={"form-control"}
                    label="Grading As"
                    name="grading_as"
                    options={[
                        {key: 'C', value: 'CGPA'},
                        {key: 'G', value: 'GRADE'},
                    ]}
                    onChange={(selectedOption) => {
                        setFieldValue('grading_as', selectedOption?.key || '')
                    }}
                    /> */}

                    <label htmlFor="grading_as">Grading As</label>
                    <Field
                    as='select'
                    id='grading_as'
                    name='grading_as'
                    className='form-control'
                    onChange={(e) => {
                        setFieldValue('grading_as', e.target.value)
                    }
                    }
                    disabled={values.is_result_declare !== 'Y' ? true : false}
                    >
                        <option value=''>Select...</option>
                        <option value='C'>CGPA</option>
                        <option value='G'>GRADE</option>
                    </Field>
                </div>
            </div>
            <div className="col-6 col-md-3">
                <div className="form-group my-2">
                    <FormControl 
                    control='date' 
                    type='date' 
                    label='Result Date' 
                    name='result_date' 
                    disabled={values.is_result_declare !== 'Y' ? true : false}
                    />
                </div>
            </div>
            <div className="col-6 col-md-3">
                <div className="form-group my-2">
                    <FormControl 
                    control='input' 
                    type='text' 
                    label='Grade' 
                    name='grade' 
                    disabled={values.is_result_declare !== 'Y' ? true : false}
                    />
                </div>
            </div>
            <div className="col-6 col-md-3">
                <div className="form-group my-2">
                    <FormControl 
                    control='input' 
                    type='text' 
                    label='CGPA' 
                    name='cgpa' 
                    disabled={values.is_result_declare !== 'Y' ? true : false}
                    />
                </div>
            </div>
            
            
        </div>
        <div className="d-flex justify-content-center gap-2 my-2">
            <CButton type='submit' color='primary' className='btn btn-primary bg-primary rounded-pill my-2 p-2 px-4'>
                { loading ? 'Saving...' : 'Save' }
            </CButton>
        </div>
    </Form>
    }}
    </Formik>  
  )
}

export default QualificationForm