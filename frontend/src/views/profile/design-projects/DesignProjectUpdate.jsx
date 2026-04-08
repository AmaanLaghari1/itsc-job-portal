import { useState } from "react"
import DesignProjectForm from "./DesignProjectForm"
import * as Yup from "yup"
import * as API from "../../../api/UserRequest"
import { normalizeDate } from "../../../helper"
import Alert from "../../../components/Alert"

const DesignProjectUpdate = ({previousData, onUpdate, handleCloseModal}) => {
    const [loading, setLoading] = useState(false)

    const initialValues = {
        user_id: previousData?.USER_ID || '',
        title: previousData?.TITLE || "",
        client: previousData?.CLIENT || "",
        nature: previousData?.NATURE_OF_PROJECT || "",
        date: previousData?.DATE ? normalizeDate(previousData.DATE) : "",
        venue: previousData?.VENUE || ""
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        client: Yup.string().required("Client / Sponsor is required"),
        nature: Yup.string().required("Nature of Project / Exhibition is required"),
        date: Yup.date().required("Date is required"),
        venue: Yup.string().required("Venue is required")
    })

    const onSubmit = async (values) => {
        setLoading(true)
        try {
            // API call to update design project
            const response = await API.updateDesignProject(previousData.PROJECT_ID, values)
            // console.log("Design project updated successfully:", values)
            onUpdate(previousData.USER_ID)
            handleCloseModal()
            Alert({
                status: true,
                text: 'Design project updated successfully.',
            });
        } catch (error) {
            console.error("Error updating design project:", error)
            Alert({
                status: false,
                text: 'Failed to update design project. Please try again.',
            });
        }
        setLoading(false)
    }

  return (
    <div>
        <h3>Edit Project</h3>
        <DesignProjectForm initialValues={initialValues} validationSchema={validationSchema} handleSubmit={onSubmit} loading={loading} />
    </div>
  )
}

export default DesignProjectUpdate