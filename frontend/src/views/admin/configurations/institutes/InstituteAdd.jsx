import * as Yup from 'yup'
import * as API from '../../../../api/InstituteRequest'
import { useState } from 'react'
import InstituteForm from './InstituteForm'

const InstituteAdd = () => {
    const [loading, setLoading] = useState(false)

    const initialValues = {
        is_inst: '',
        institute_name: '',
        address: '',
        mobile: '',
        landline: '',
        remarks: '',
        institute_type_id: '',
        parent_id: '',
        active: 0
    }

    const validationRules = Yup.object().shape({
        institute_type_id: Yup.string().required('Institute Type is required!'),
        institute_name: Yup.string().required('Institute Name is required!')
    })

    const handleSubmit = async (values, {resetForm}) => {
      setLoading(true)
      try {
        const response = await API.createInstitute(values)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
      resetForm()
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

export default InstituteAdd