import React, { useState, useEffect, useMemo } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import FormControl from '../../components/FormControl'
import { CButton } from '@coreui/react'
import axios from 'axios'
import { mapOptions } from '../../helper.js'
import CustomSelect from '../../components/CustomSelect.jsx'
import YearSelect from '../../components/YearSelect.jsx'

const QualificationForm = ({initialValues, validationRules, handleSubmit, loading}) => {
    const [dropdownData, setDropdownData] = useState({
        programs: [],
        institutes: [],
        disciplines: []
    })

    async function fetchData(){
        try {
            // let institueFetch = null
            const [programFetchResponse, instituteFetchResponse, disciplineFetchResponse] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}qualification/program`),
                axios.get(`${import.meta.env.VITE_API_URL}qualification/institute`),
                axios.get(`${import.meta.env.VITE_API_URL}qualification/discipline`)
            ])
            
            setDropdownData({
                programs: programFetchResponse?.data.options || [],
                institutes: instituteFetchResponse?.data.options || [],
                disciplines: disciplineFetchResponse?.data.options || []
            })
        } catch (error) {
            // console.log(error)
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

    const orgOptions = useMemo(() =>
        mapOptions(organizations, 'INSTITUTE_ID', 'INSTITUTE_NAME')
    )

    const programs = useMemo(() => {
        return dropdownData.programs.map(program => program)
    })
    .filter((program) => program.DEGREE_ID != 1 && program.DEGREE_ID != 10)

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
            // console.log(error)
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
                label="Qualification Level"
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
                    label='Roll No./Seat No.' 
                    name='roll_no'
                    required={true}
                    />
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group my-2">
                    
                    <label htmlFor="is_result_decare">Is Result Declared?<span className="text-danger">*</span></label>
                    <Field
                    as='select'
                    id='is_result_decare'
                    name='is_result_declare'
                    className='form-control'
                    onChange={(e) => {
                        setFieldValue('is_result_declare', e.target.value)
                        if(e.target.value !== 'Y') {
                            setFieldValue('obtained_marks', '')
                            setFieldValue('total_marks', '')
                            setFieldValue('passing_year', '')
                            setFieldValue('result_date', '')
                            setFieldValue('grading_as', '')
                            setFieldValue('result_date', '')
                            setFieldValue('grade', '')
                            setFieldValue('cgpa', '')
                        }
                    }
                    }
                    >
                        <option value='Y'>Yes</option>
                        <option value='N'>No</option>
                    </Field>
                    <div className="text-danger small">
                        <ErrorMessage name="is_result_declare" />
                    </div>
                </div>
            </div>

            <div id="result-details" className={`row ${values.is_result_declare !== 'Y' ? 'd-none' : ''}`}>
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
                    <div className={`form-group my-2 ${values.is_result_declare !== 'Y' ? 'd-none' : ''}`}>
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
                        <YearSelect name='passing_year' label="Passing Year" value={values.passing_year} />
                    </div>
                </div>
                <div className="col-6 col-md-6">
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

                <div className="col-md-3">
                    <div className="form-group my-2">
                        <label htmlFor="grading_as">Grading As<span className="text-danger">*</span></label>
                        <Field
                        as='select'
                        id='grading_as'
                        name='grading_as'
                        className='form-control'
                        onChange={(e) => {
                            setFieldValue('grading_as', e.target.value)
                            if(e.target.value === 'G') {
                                setFieldValue('grade', '')
                            }
                            if(e.target.value === 'C') {
                                setFieldValue('cgpa', '')
                            }
                            if(e.target.value === '') {
                                setFieldValue('cgpa', '')
                                setFieldValue('grade', '')
                            }
                        }
                        }
                        // disabled={values.is_result_declare !== 'Y' ? true : false}
                        >
                            <option value=''>Select...</option>
                            <option value='C'>CGPA</option>
                            <option value='G'>GRADE</option>
                        </Field>
                        <div className="text-danger small">
                            <ErrorMessage name="grading_as" />
                        </div>
                    </div>
                </div>
                <div className={`col-6 col-md-3 ${values.grading_as !== 'G' ? 'd-none' : ''}`}>
                    <div className="form-group my-2">
                        <FormControl
                        control='select'
                        className="form-control"
                        label="Grade"
                        name="grade"
                        required={true}
                        options={[
                            {key: 'A+', value: 'A+'},
                            {key: 'A', value: 'A'},
                            {key: 'B+', value: 'B+'},
                            {key: 'B', value: 'B'},
                            {key: 'C+', value: 'C+'},
                            {key: 'C', value: 'C'},
                            {key: 'D+', value: 'D+'},
                            {key: 'D', value: 'D'},
                        ]}
                        />
                    </div>
                </div>
                <div className={`col-6 col-md-3 ${values.grading_as !== 'C' ? 'd-none' : ''}`}>
                    <div className="form-group my-2">
                        <FormControl 
                        control='input' 
                        type='text' 
                        label='CGPA' 
                        name='cgpa' 
                        required={true}
                        disabled={values.grading_as !== 'C' ? true : false}
                        />
                    </div>
                </div>
            </div>
            
            
        </div>
        <div className="d-flex justify-content-center gap-2 my-2">
            <CButton type='submit' color='primary' className='btn btn-primary fs-5 rounded-pill my-2 p-2 px-4'
            disabled={loading}
            >
                { loading ? 'Saving...' : 'Save' }
            </CButton>
        </div>
    </Form>
    }}
    </Formik>  
  )
}

export default QualificationForm