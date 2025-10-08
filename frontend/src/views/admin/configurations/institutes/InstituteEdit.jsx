import * as Yup from 'yup'
import * as API from '../../../../api/InstituteRequest'
import { useState } from 'react'
import InstituteForm from './InstituteForm'
import { useLocation, useNavigate } from 'react-router-dom'
import Alert from '../../../../components/Alert'

const InstituteEdit = () => {
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const {prevValues} = location.state || {}
    const navigate = useNavigate()

    const initialValues = {
        is_inst: prevValues.IS_INST??'',
        institute_name: prevValues.INSTITUTE_NAME??'',
        address: prevValues.ADDRESS??'',
        mobile: prevValues.MOBILE??'',
        landline: prevValues.LANDLINE??'',
        remarks: prevValues.REMARKS??'',
        institute_type_id: prevValues.INSTITUTE_TYPE_ID??'',
        parent_id: prevValues.PARENT_ID??'',
        active: prevValues.ACTIVE??0
    }

    const validationRules = Yup.object().shape({
        institute_type_id: Yup.string().required('Institute Type is required!'),
        institute_name: Yup.string().required('Institute Name is required!')
    })

    const handleSubmit = async (values, {resetForm}) => {
      setLoading(true)
      try {
        const response = await API.updateInstitute(values, prevValues.INSTITUTE_ID)
        // console.log(response)
        navigate('/admin/institute')
        Alert({status: true, text: response.data.message})
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
      resetForm(values)
    }

  return (
    <div>
        <InstituteForm
        initialValues={initialValues}
        validationRules={validationRules}
        handleSubmit={handleSubmit}
        loading={loading}
        />
    </div>
  )
}

export default InstituteEdit