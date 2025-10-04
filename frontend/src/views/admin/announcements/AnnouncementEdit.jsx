import * as API from '../../../api/AnnouncementRequest.js'
import Alert from '../../../components/Alert'
import { useDispatch, useSelector } from 'react-redux'
import AnnouncementForm from './AnnouncementForm.jsx'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const AnnouncementEdit = () => {
   const auth = useSelector(state => state.auth.authData)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const {prevData} = location.state || {}
    useEffect(function(){
      if(!prevData){
        navigate('/admin/dashboard')
      }
    }, [])
    const dispatch = useDispatch()

  const submitHandler = async (values, {setSubmitting}) => {
    setLoading(true)
    setSubmitting(false)
    values.start_date = new Date(values.start_date).toISOString().split('T')[0];
    values.end_date = new Date(values.end_date).toISOString().split('T')[0];
    // values.experience_years = values.experience_years != '' ? parseInt(values.experience_years) : null;

    // alert(JSON.stringify(values, true))
    // return 
    try {
      const response = await API.updateAnnouncement(values, prevData.ANNOUNCEMENT_ID);
      // console.log('Announcement updated successfully:', response);
      Alert({ status: true, text: response?.data?.message || 'Announcement updated successfully' });
      navigate('/admin/dashboard')
    } catch (error) {
      // Alert({ status: false, text: response?.data?.message || 'Unable to create announcement' });
      console.error('Error creating announcement:', error);
    }
    setLoading(false)
}

    const initialValues = {
        announcement_title: prevData.ANNOUNCEMENT_TITLE??'',
        position_name: prevData.POSITION_NAME??'',
        dept_id: prevData.department.DEPT_ID??'',
        description: prevData.DESCRIPTION??'',
        start_date: prevData.START_DATE??'',
        end_date: prevData.END_DATE??'',
        application_fee: prevData.APPLICATION_FEE??'',
        age_from: prevData.AGE_FROM??18,
        age_to: prevData.AGE_TO??'',
        qual_req_data: prevData.qualification_requirements,
        qualifications: prevData.qualification_requirements.map(q => ({
    key: q.DEGREE_ID,
    required: String(q.IS_REQUIRED) // ensure string type "1" or "0"
  }))??[],
        // is_required: [],
        experience_years: prevData.EXPERIENCE_YEARS??'',
        ref_no: prevData.REF_NO??'', 
        active: prevData.ACTIVE       
    }

    const validationRules = Yup.object({
        announcement_title: Yup.string()
        .required('Title required')
        .max(255, 'Title is too long'),
        position_name: Yup.string()
        .required('Position Name required'),
        ref_no: Yup.string()
        .required('Reference No required'),
        dept_id: Yup.string()
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
    
  return (
    <div>
        <AnnouncementForm 
        initialValues={initialValues}
        validationRules={validationRules}
        handleSubmit={submitHandler} 
        loading={loading} 
        />
    </div>
  )
}

export default AnnouncementEdit