
import { useEffect, useState } from "react"
import * as Yup from "yup"
import * as API from "../../../api/UserRequest"
import { useSelector } from "react-redux"
import DesignProjectTable from "./DesignProjectTable"
import DesignProjectForm from "./DesignProjectForm"
import Alert from "../../../components/Alert"

const DesignProject = () => {
    const [loading, setLoading] = useState(false)
    const auth = useSelector(state => state.auth.authData)
    const user_id = auth.user.USER_ID || '';
    const [designProjects, setDesignProjects] = useState([])

    const initialValues = {
        user_id: user_id || '',
        title: "",
        client: "",
        nature: "",
        date: "",
        venue: ""
    }

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        client: Yup.string().required("Client / Sponsor is required"),
        nature: Yup.string().required("Nature of Project / Exhibition is required"),
        date: Yup.date().required("Date is required"),
        venue: Yup.string().required("Venue is required"),
    })

    const onSubmit = async (values) => {
        try {
            const response = await API.addDesignProject(values)
            console.log("Design project added successfully:", response.data)
            getDesignProjects(user_id)
            Alert({
                status: true,
                text: 'Design project added successfully.',
            });
        } catch (error) {
            console.error("Error adding design project:", error)
            Alert({
                status: false,
                text: 'Failed to add design project. Please try again.',
            });
        }
    }

    const getDesignProjects = async (user_id) => {
        try {
            const response = await API.getDesignProjects(user_id);
            // console.log(response);
            setDesignProjects(response.data.data);
        } catch (error) {
            console.log("Failed to fetch design projects -", error);
        }
    }

    useEffect(() => {
        getDesignProjects(user_id);
    }, [])

    return (
        <div>
            <h1>
                Design Projects / Exhibitions
            </h1>
            <p className="text-danger fw-bold">
                (Required for Arts & Design Professors)
            </p>


            <DesignProjectForm initialValues={initialValues} validationSchema={validationSchema} handleSubmit={onSubmit} />   

            <DesignProjectTable designProjects={designProjects} setDesignProjects={setDesignProjects} 
            getDesignProjects={getDesignProjects}
            />
        </div>
    )
}

export default DesignProject