// AnnouncementAdd.jsx
import * as Yup from 'yup';
import * as API from '../../../api/AnnouncementRequest';
import Alert from '../../../components/Alert';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import AnnouncementForm from './AnnouncementForm';
import { useSelector } from 'react-redux';

const AnnouncementAdd = () => {
  const [loading, setLoading] = useState(false)
  const userRole = useSelector(state => state.roles.selectedRole)

  const initialValues = {
    announcement_title: '',
    position_name: '',
    dept_id: '',
    description: '',
    start_date: '',
    end_date: '',
    application_fee: '',
    age_from: 18,
    age_to: '',
    qualifications: [],
    // is_required: [],
    experience_years: '',
    ref_no: '',
    access_id: userRole
  }

  const validationSchema = Yup.object().shape({
    announcement_title: Yup.string()
      .required('Title required')
      .max(255, 'Title is too long'),
    position_name: Yup.string()
      .required('Position Name required'),
    ref_no: Yup.string()
      .required('Reference No required'),
    dept_id: Yup.string()
      .required('Department required'),
    qualifications: Yup.array().min(1, 'Select at least 1').of(Yup.object().required()).required(),
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
    setLoading(true)
    values.start_date = new Date(values.start_date).toISOString().split('T')[0];
    values.end_date = new Date(values.end_date).toISOString().split('T')[0];
    // values.experience_years = values.experience_years != '' ? parseInt(values.experience_years) : null;

    // alert(JSON.stringify(values))
    // return 
    try {
      const response = await API.createAnnouncement(values);
      // console.log('Announcement created successfully:', response);
      Alert({ status: true, text: response?.data?.message || 'Announcement created successfully' });
    } catch (error) {
      // Alert({ status: false, text: response?.data?.message || 'Unable to create announcement' });
      console.error('Error creating announcement:', error);
    }
    setLoading(false)
  };

  return (
    <div>
        <AnnouncementForm
        initialValues={initialValues}
        validationRules={validationSchema}
        handleSubmit={submitHandler} 
        loading={loading} 
        />
    </div>
  );
};

export default AnnouncementAdd;
