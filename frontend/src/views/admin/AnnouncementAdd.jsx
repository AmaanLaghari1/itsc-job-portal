// AnnouncementAdd.jsx
import { Formik, Form } from 'formik';
import MyEditorFormik from '../../components/my-editor/MyEditorFormik';
import FormControl from '../../components/FormControl';
import { CButton } from '@coreui/react';
import * as Yup from 'yup';
import * as API from '../../api/AnnouncementRequest';
import Alert from '../../components/Alert';
import CustomSelect from '../../components/CustomSelect';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import MultiCheckbox from '../../components/MultiCheckbox';

const AnnouncementAdd = () => {

  const [programs, setPrograms] = useState([])

  const fetchPrograms = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}qualification/program`)
      setPrograms(response.data.options)
    } catch (e) {
      console.log(e)
    }
  }
  
  useEffect(() => {
    fetchPrograms()
  }, [])

  const programOptions = programs
  .filter((program) => program.DEGREE_ID != 1 && program.DEGREE_ID != 10)
  .map(program => {
    return {key:program.DEGREE_ID, value: program.DEGREE_TITLE}
  })

  const initialValues = {
    position_name: '',
    dept_name: '',
    description: '',
    start_date: '',
    end_date: '',
    application_fee: '',
    age_from: 18,
    age_to: '',
    qualifications: [],
    // is_required: [],
    experience_years: '',
  }

  const validationSchema = Yup.object().shape({
    position_name: Yup.string()
      .required('Title required'),
    dept_name: Yup.string()
      .required('Department required'),
    start_date: Yup.string()
      .required('Start Date required'),
    end_date: Yup.string()
      .required('End Date required'),
    description: Yup.string()
      .required('Description required')
      .min(100, 'Description too short'),
    age_from: Yup.number()
      .required('Age Limit is required'), // 👈 Optional: remove `.required()` if not mandatory
    age_to: Yup.number()
      .required('Age Limit is required'), // 👈 Optional: remove `.required()` if not mandatory
  });

  const submitHandler = async (values) => {
    values.start_date = new Date(values.start_date).toISOString().split('T')[0];
    values.end_date = new Date(values.end_date).toISOString().split('T')[0];
    // values.experience_years = values.experience_years != '' ? parseInt(values.experience_years) : null;
    const { position_name, dept_name, description, start_date, end_date, application_fee, age_to, age_from, qualifications, experience_years } = values;
    const data = {
      position_name,
      dept_name,
      description,
      start_date,
      end_date,
      application_fee,
      age_to,
      age_from,
      qualifications,
      experience_years,
    };

    // alert(JSON.stringify(data))

    try {
      const response = await API.createAnnouncement(data);
      console.log('Announcement created successfully:', response);
      Alert({ status: true, text: response?.data?.message || 'Announcement created successfully' });
    } catch (error) {
      // Alert({ status: false, text: response?.data?.message || 'Unable to create announcement' });
      console.error('Error creating announcement:', error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      {({values, setFieldValue}) => (
        <Form>
          <h2>Add Announcement</h2>

          <div className="form-group my-2">
            <FormControl control='input' type='text' name='position_name' label='Position Title' required={true} />
          </div>

          <div className="form-group my-2">
            <FormControl control='input' type='text' name='dept_name' label='Department' required={true} />
          </div>

          <div className="form-group my-2">
            <MyEditorFormik name="description" label='Description' required={true} />
          </div>


          <div className="row">
            <div className="col-6 col-sm-3">
              <div className="form-group my-2">
                <FormControl control='date' name="start_date" label='Start Date' required={true} />
              </div>
            </div>
            <div className="col-6 col-sm-3">
              <div className="form-group my-2">
                <FormControl control='date' name="end_date" label='End Date' required={true} />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group my-2">
                <FormControl control='input' name="application_fee" label='Application Fee' 
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, '')
                }}
                />
              </div>
            </div>
          </div>

          <fieldset className='border border-2 p-2 my-2'>
              <legend className='fw-bold'>Age Requirement</legend>
              <div className="row">
                <div className="col-6">
                  <div className="form-group my-2">
                    <FormControl 
                      control='input' 
                      type='text'
                      name="age_from" 
                      label='Min' 
                      required={true}
                      onInput={e => {
                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 2)
                      }}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group my-2">
                    <FormControl 
                      control='input' 
                      type='text'
                      name="age_to" 
                      label='Max' 
                      required={true}
                      onInput={e => {
                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 2)
                      }}
                    />
                  </div>
                </div>
              </div>
          </fieldset>

          <fieldset className='border border-2 p-2 my-2'>
              <legend className='fw-bold'>Qualification Requirement</legend>
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex form-group my-2">
                    {/* <FormControl
                    control='checkbox'
                    className="form-control"
                    label="Level"
                    name="program_id[]"
                    options={programOptions} // Options should be dynamically loaded if using async
                    required={true}
                    /> */}
                    <MultiCheckbox
                      className="form-control"
                      label=""
                      name="qualifications"
                      options={programOptions}
                      required={true}
                    />

                  </div>
                </div>

              </div>
          </fieldset>

          <fieldset className='border border-2 p-2 my-2'>
              <legend className='fw-bold'>Experience Requirement</legend>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group my-2">
                    <FormControl 
                    control='input' 
                    type='text'
                    name="experience_years" 
                    label="Years of Experience"
                    onInput={e => {
                      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 2)
                    }}
                    />
                  </div>
                </div>

              </div>
          </fieldset>


          <CButton variant='primary' type="submit" className='btn btn-primary fs-5 mx-auto d-block rounded-0 px-3 my-3'>
            Save
          </CButton>
        </Form>
      )}
    </Formik>
  );
};

export default AnnouncementAdd;
